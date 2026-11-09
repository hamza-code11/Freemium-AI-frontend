// components/dashboard/history/HistoryViewModal.tsx
'use client';

import React from 'react';
import {
  X, Calendar, Copy, FileText, Megaphone, TrendingUp,
  Target, Users, Palette, Globe, Sparkles, CheckCircle2,
  Briefcase, DollarSign, Clock, Layers, ListChecks, Quote,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { HistoryItem } from '@/services/history.service';
import styles from './HistoryViewModal.module.css';

// ============================================
// HELPERS
// ============================================
const getIconForType = (type: string, size = 22) => {
  if (type === 'content') return <FileText size={size} />;
  if (type === 'campaign') return <Megaphone size={size} />;
  return <TrendingUp size={size} />;
};

const getColorForType = (type: string) => {
  if (type === 'content') return '#3B82F6';
  if (type === 'campaign') return '#8B5CF6';
  return '#10B981';
};

const getTypeLabel = (type: string) => {
  if (type === 'content') return 'Content';
  if (type === 'campaign') return 'Campaign';
  return 'Growth Recommendation';
};

const formatDate = (iso: string | null | undefined) => {
  if (!iso) return 'N/A';
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  } catch {
    return iso;
  }
};

const formatAudience = (audience: any): string => {
  if (!audience) return 'N/A';
  if (Array.isArray(audience)) {
    return audience.map((a) => String(a).replace(/_/g, ' ')).join(', ');
  }
  return String(audience);
};

interface Props {
  item: HistoryItem | null;
  onClose: () => void;
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function HistoryViewModal({ item, onClose }: Props) {
  if (!item) return null;

  const createdAt = new Date(item.created_at);
  const isContent = item.type === 'content';
  const isCampaign = item.type === 'campaign';
  const isRecommendation = item.type === 'recommendation';

  const recs = item.metadata?.recommendations || [];
  const plan = item.metadata?.generated_plan || {};

  // ---------- Copy Handler ----------
  const handleCopy = async () => {
    try {
      let text = '';
      if (isRecommendation) {
        text = recs
          .map((r: any, i: number) => `${i + 1}. ${r.title}\n${r.desc}`)
          .join('\n\n');
      } else if (isCampaign) {
        text = `${item.title}\n\n${plan.strategy || ''}`;
      } else {
        text = item.content || item.preview;
      }
      await navigator.clipboard.writeText(text);
      toast.success('Content copied!');
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* ===== HEADER ===== */}
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.iconWrap} style={{ color: getColorForType(item.type) }}>
              {getIconForType(item.type)}
            </div>
            <div className={styles.headerText}>
              <h2 className={styles.modalTitle}>{item.title}</h2>
              <span className={styles.typeBadge}>{getTypeLabel(item.type)}</span>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* ===== META ROW ===== */}
        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <Calendar size={14} />
            <span>
              {createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              {' • '}
              {createdAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </span>
          </div>
          {item.metadata?.platform && (
            <div className={styles.metaItem}>
              <Globe size={14} />
              <span style={{ textTransform: 'capitalize' }}>{item.metadata.platform}</span>
            </div>
          )}
          {isRecommendation && (
            <div className={styles.metaItem}>
              <Sparkles size={14} />
              <span>{recs.length} Recommendations</span>
            </div>
          )}
        </div>

        {/* ===== BODY ===== */}
        <div className={styles.modalBody}>

          {/* ================= CONTENT ================= */}
          {isContent && (
            <>
              {/* User Input */}
              <div>
                <h3 className={styles.sectionTitle}>Generation Details</h3>
                <div className={styles.contextGrid}>
                  {item.metadata?.platform && (
                    <div className={styles.contextCard}>
                      <Globe size={14} />
                      <div>
                        <span className={styles.contextLabel}>Platform</span>
                        <span className={styles.contextValue} style={{ textTransform: 'capitalize' }}>
                          {item.metadata.platform}
                        </span>
                      </div>
                    </div>
                  )}
                  {item.metadata?.content_type && (
                    <div className={styles.contextCard}>
                      <FileText size={14} />
                      <div>
                        <span className={styles.contextLabel}>Content Type</span>
                        <span className={styles.contextValue} style={{ textTransform: 'capitalize' }}>
                          {item.metadata.content_type}
                        </span>
                      </div>
                    </div>
                  )}
                  {item.metadata?.tone && (
                    <div className={styles.contextCard}>
                      <Palette size={14} />
                      <div>
                        <span className={styles.contextLabel}>Tone</span>
                        <span className={styles.contextValue}>{item.metadata.tone}</span>
                      </div>
                    </div>
                  )}
                  {item.metadata?.language && (
                    <div className={styles.contextCard}>
                      <Globe size={14} />
                      <div>
                        <span className={styles.contextLabel}>Language</span>
                        <span className={styles.contextValue}>{item.metadata.language}</span>
                      </div>
                    </div>
                  )}
                  {item.metadata?.target_audience && item.metadata.target_audience.length > 0 && (
                    <div className={styles.contextCard}>
                      <Users size={14} />
                      <div>
                        <span className={styles.contextLabel}>Target Audience</span>
                        <span className={styles.contextValue}>
                          {formatAudience(item.metadata.target_audience)}
                        </span>
                      </div>
                    </div>
                  )}
                  {item.metadata?.notes && (
                    <div className={styles.contextCard} style={{ gridColumn: '1 / -1' }}>
                      <Sparkles size={14} />
                      <div>
                        <span className={styles.contextLabel}>Instructions</span>
                        <span className={styles.contextValue}>{item.metadata.notes}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Generated Content */}
              <div>
                <h3 className={styles.sectionTitle}>Generated Content</h3>
                <div className={styles.contentBox}>
                  {item.content || item.preview || 'No content available.'}
                </div>
              </div>
            </>
          )}

          {/* ================= CAMPAIGN ================= */}
          {isCampaign && (
            <>
              {/* User Input */}
              <div>
                <h3 className={styles.sectionTitle}>Campaign Details (Your Input)</h3>
                <div className={styles.contextGrid}>
                  {item.metadata?.objective && (
                    <div className={styles.contextCard}>
                      <Target size={14} />
                      <div>
                        <span className={styles.contextLabel}>Objective</span>
                        <span className={styles.contextValue} style={{ textTransform: 'capitalize' }}>
                          {item.metadata.objective}
                        </span>
                      </div>
                    </div>
                  )}
                  {item.metadata?.product_service && (
                    <div className={styles.contextCard}>
                      <Briefcase size={14} />
                      <div>
                        <span className={styles.contextLabel}>Product/Service</span>
                        <span className={styles.contextValue}>{item.metadata.product_service}</span>
                      </div>
                    </div>
                  )}
                  {item.metadata?.target_audience && item.metadata.target_audience.length > 0 && (
                    <div className={styles.contextCard}>
                      <Users size={14} />
                      <div>
                        <span className={styles.contextLabel}>Target Audience</span>
                        <span className={styles.contextValue}>
                          {formatAudience(item.metadata.target_audience)}
                        </span>
                      </div>
                    </div>
                  )}
                  {item.metadata?.channels && item.metadata.channels.length > 0 && (
                    <div className={styles.contextCard}>
                      <Megaphone size={14} />
                      <div>
                        <span className={styles.contextLabel}>Channels</span>
                        <span className={styles.contextValue}>
                          {item.metadata.channels.join(', ')}
                        </span>
                      </div>
                    </div>
                  )}
                  {item.metadata?.budget !== undefined && item.metadata?.budget !== null && (
                    <div className={styles.contextCard}>
                      <DollarSign size={14} />
                      <div>
                        <span className={styles.contextLabel}>Budget</span>
                        <span className={styles.contextValue}>
                          {item.metadata.currency || 'USD'} {item.metadata.budget}
                        </span>
                      </div>
                    </div>
                  )}
                  {(item.metadata?.start_date || item.metadata?.end_date) && (
                    <div className={styles.contextCard}>
                      <Clock size={14} />
                      <div>
                        <span className={styles.contextLabel}>Duration</span>
                        <span className={styles.contextValue}>
                          {formatDate(item.metadata.start_date)} → {formatDate(item.metadata.end_date)}
                        </span>
                      </div>
                    </div>
                  )}
                  {item.metadata?.tone && (
                    <div className={styles.contextCard}>
                      <Palette size={14} />
                      <div>
                        <span className={styles.contextLabel}>Tone</span>
                        <span className={styles.contextValue}>{item.metadata.tone}</span>
                      </div>
                    </div>
                  )}
                  {item.metadata?.notes && (
                    <div className={styles.contextCard} style={{ gridColumn: '1 / -1' }}>
                      <Sparkles size={14} />
                      <div>
                        <span className={styles.contextLabel}>Instructions</span>
                        <span className={styles.contextValue}>{item.metadata.notes}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Plan */}
              <div>
                <h3 className={styles.sectionTitle}>AI Generated Campaign Plan</h3>
                <div className={styles.recsList}>

                  {/* Overview */}
                  {(plan.title || plan.description) && (
                    <div className={styles.recCard}>
                      <div className={styles.recHeader}>
                        <span className={styles.recNumber}>
                          <Sparkles size={12} />
                        </span>
                        <h4 className={styles.recTitle}>{plan.title || 'Campaign Overview'}</h4>
                      </div>
                      {plan.description && <p className={styles.recDesc}>{plan.description}</p>}
                    </div>
                  )}

                  {/* Strategy */}
                  {plan.strategy && (
                    <div className={styles.recCard}>
                      <div className={styles.recHeader}>
                        <span className={styles.recNumber}>
                          <Quote size={12} />
                        </span>
                        <h4 className={styles.recTitle}>Campaign Strategy</h4>
                      </div>
                      <p className={styles.recDesc}>{plan.strategy}</p>
                    </div>
                  )}

                  {/* Weekly Plan */}
                  {plan.weeks && plan.weeks.length > 0 && (
                    <div className={styles.recCard}>
                      <div className={styles.recHeader}>
                        <span className={styles.recNumber}>
                          <Calendar size={12} />
                        </span>
                        <h4 className={styles.recTitle}>Weekly Action Plan</h4>
                      </div>
                      <div className={styles.weeksGrid}>
                        {plan.weeks.map((week: any, i: number) => (
                          <div key={i} className={styles.weekCard}>
                            <span className={styles.weekTitle}>{week.title}</span>
                            <ul className={styles.recBullets}>
                              {week.items?.map((it: string, j: number) => (
                                <li key={j}>{it}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Content Ideas */}
                  {plan.ideas && plan.ideas.length > 0 && (
                    <div className={styles.recCard}>
                      <div className={styles.recHeader}>
                        <span className={styles.recNumber}>
                          <Sparkles size={12} />
                        </span>
                        <h4 className={styles.recTitle}>Content Ideas</h4>
                      </div>
                      <ul className={styles.recBullets}>
                        {plan.ideas.map((idea: string, i: number) => (
                          <li key={i}>{idea}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* KPIs */}
                  {plan.kpis && plan.kpis.length > 0 && (
                    <div className={styles.recCard}>
                      <div className={styles.recHeader}>
                        <span className={styles.recNumber}>
                          <TrendingUp size={12} />
                        </span>
                        <h4 className={styles.recTitle}>Key Performance Indicators</h4>
                      </div>
                      <ul className={styles.recBullets}>
                        {plan.kpis.map((kpi: string, i: number) => (
                          <li key={i}>{kpi}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Budget */}
                  {plan.budget && plan.budget.length > 0 && (
                    <div className={styles.recCard}>
                      <div className={styles.recHeader}>
                        <span className={styles.recNumber}>
                          <DollarSign size={12} />
                        </span>
                        <h4 className={styles.recTitle}>
                          Budget Allocation {plan.total && `(${plan.total})`}
                        </h4>
                      </div>
                      <div className={styles.budgetList}>
                        {plan.budget.map((b: any, i: number) => (
                          <div key={i} className={styles.budgetItem}>
                            <span className={styles.budgetLabel}>{b.label}</span>
                            <span className={styles.budgetValue}>{b.pct}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ================= RECOMMENDATION ================= */}
          {isRecommendation && (
            <>
              {/* User Input */}
              <div>
                <h3 className={styles.sectionTitle}>Business Context (Your Input)</h3>
                <div className={styles.contextGrid}>
                  {item.metadata?.business_goals && (
                    <div className={styles.contextCard}>
                      <Target size={14} />
                      <div>
                        <span className={styles.contextLabel}>Business Goals</span>
                        <span className={styles.contextValue}>{item.metadata.business_goals}</span>
                      </div>
                    </div>
                  )}
                  {item.metadata?.challenges && (
                    <div className={styles.contextCard}>
                      <TrendingUp size={14} />
                      <div>
                        <span className={styles.contextLabel}>Challenges</span>
                        <span className={styles.contextValue}>{item.metadata.challenges}</span>
                      </div>
                    </div>
                  )}
                  {item.metadata?.target_audience && item.metadata.target_audience.length > 0 && (
                    <div className={styles.contextCard}>
                      <Users size={14} />
                      <div>
                        <span className={styles.contextLabel}>Target Audience</span>
                        <span className={styles.contextValue}>
                          {formatAudience(item.metadata.target_audience)}
                        </span>
                      </div>
                    </div>
                  )}
                  {item.metadata?.ai_instruction && (
                    <div className={styles.contextCard}>
                      <Palette size={14} />
                      <div>
                        <span className={styles.contextLabel}>AI Instruction</span>
                        <span className={styles.contextValue}>{item.metadata.ai_instruction}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Recommendations */}
              <div>
                <h3 className={styles.sectionTitle}>
                  AI Recommendations ({recs.length})
                </h3>
                <div className={styles.recsList}>
                  {recs.map((rec: any, idx: number) => (
                    <div key={idx} className={styles.recCard}>
                      <div className={styles.recHeader}>
                        <span className={styles.recNumber}>{idx + 1}</span>
                        <h4 className={styles.recTitle}>{rec.title}</h4>
                      </div>

                      {rec.desc && <p className={styles.recDesc}>{rec.desc}</p>}

                      {rec.bullets && rec.bullets.length > 0 && (
                        <div className={styles.recSection}>
                          <span className={styles.recSectionLabel}>Action Steps</span>
                          <ul className={styles.recBullets}>
                            {rec.bullets.map((b: string, i: number) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {(rec.benefit || rec.why) && (
                        <div className={styles.recMeta}>
                          {rec.benefit && (
                            <div className={styles.recMetaItem}>
                              <span className={styles.recMetaLabel}>Benefit</span>
                              <span className={styles.recMetaValue}>{rec.benefit}</span>
                            </div>
                          )}
                          {rec.why && (
                            <div className={styles.recMetaItem}>
                              <span className={styles.recMetaLabel}>Why it matters</span>
                              <span className={styles.recMetaValue}>{rec.why}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {rec.checklist && rec.checklist.length > 0 && (
                        <div className={styles.recSection}>
                          <span className={styles.recSectionLabel}>Checklist</span>
                          <ul className={styles.recChecklist}>
                            {rec.checklist.map((c: string, i: number) => (
                              <li key={i}>
                                <CheckCircle2 size={12} />
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {(rec.tools?.length > 0 || rec.metrics?.length > 0) && (
                        <div className={styles.recFooter}>
                          {rec.tools?.length > 0 && (
                            <div className={styles.recTags}>
                              <span className={styles.recTagLabel}>Tools:</span>
                              {rec.tools.map((t: string) => (
                                <span key={t} className={styles.recTag}>{t}</span>
                              ))}
                            </div>
                          )}
                          {rec.metrics?.length > 0 && (
                            <div className={styles.recTags}>
                              <span className={styles.recTagLabel}>Metrics:</span>
                              {rec.metrics.map((m: string, i: number) => (
                                <span key={i} className={styles.recTagMetric}>{m}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>

        {/* ===== ACTIONS ===== */}
        <div className={styles.modalActions}>
          <button className={styles.secondaryBtn} onClick={handleCopy}>
            <Copy size={14} /> Copy Content
          </button>
          <button className={styles.primaryBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
