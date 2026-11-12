// components/admin/users/UsersTable.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  MoreHorizontal, ChevronLeft, ChevronRight, Ban, CheckCircle2, Loader2,
} from 'lucide-react';
import { useAdminUsers } from '@/hooks/useAdminUsers';
import { UserFilters } from './UsersFilter';
import { getUploadsBaseUrl } from '@/lib/imageUrl';
import UsersTableSkeleton from '@/components/admin/skeletons/UsersSkeleton/UsersTableSkeleton';
import styles from './UsersTable.module.css';

const PAGE_SIZE = 10;

interface Props {
  filters: UserFilters;
  onSelectUser: (id: number) => void;
  onUserStatusChange: () => void;
}

export default function UsersTable({ filters, onSelectUser, onUserStatusChange }: Props) {
  const {
    users, loading, total, totalPages, currentPage, setCurrentPage,
    toggleSuspension,
  } = useAdminUsers(filters, onUserStatusChange); // 🔥 Hook me callback pass

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters.search, filters.status, filters.sort, filters.date_range, filters.custom_from, filters.custom_to, setCurrentPage]);

  const handleToggle = async (userId: number) => {
    setTogglingId(userId);
    await toggleSuspension(userId); // 🔥 Hook already calls onUserStatusChange
    setTogglingId(null);
    setOpenMenuId(null);
    // ❌ onUserStatusChange() — Removed (kyunki hook call kar raha hai)
  };

  const formatDate = (iso: string | null) => {
    if (!iso) return 'N/A';
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getLastActiveText = (iso: string | null) => {
    if (!iso) return 'Never';
    const date = new Date(iso);
    const diffMs = Date.now() - date.getTime();
    const mins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMs / 3600000);
    const days = Math.floor(diffMs / 86400000);
    if (mins < 60) return `${mins} min ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 30) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) return <UsersTableSkeleton />;

  return (
    <div className={styles.tableCard}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined Date</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-tertiary)' }}>
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const avatarSrc = user.image
                  ? `${getUploadsBaseUrl()}/users/${user.image}`
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff`;

                return (
                  <tr
                    key={user.id}
                    onClick={() => onSelectUser(user.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <div className={styles.userCell}>
                        <img src={avatarSrc} alt={user.name} className={styles.avatar} />
                        <div>
                          <div className={styles.name}>{user.name}</div>
                          <div className={styles.email}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.roleBadge} ${user.role === 'admin' ? styles.admin : ''}`}>
                        {user.role === 'admin' ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td>
                      {user.is_suspended ? (
                        <div className={styles.status}>
                          <span className={`${styles.dot} ${styles.dotSuspended}`}></span>
                          Suspended
                        </div>
                      ) : user.is_active ? (
                        <div className={styles.status}>
                          <span className={`${styles.dot} ${styles.dotActive}`}></span>
                          Active
                        </div>
                      ) : (
                        <div className={styles.status}>
                          <span className={`${styles.dot} ${styles.dotInactive}`}></span>
                          Inactive
                        </div>
                      )}
                    </td>
                    <td className={styles.muted}>{formatDate(user.created_at)}</td>
                    <td className={styles.muted}>{getLastActiveText(user.last_active_at)}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div style={{ position: 'relative' }}>
                        <button
                          className={styles.actionBtn}
                          onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                          disabled={togglingId === user.id}
                        >
                          {togglingId === user.id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <MoreHorizontal size={16} />
                          )}
                        </button>

                        {openMenuId === user.id && (
                          <div
                            ref={menuRef}
                            style={{
                              position: 'absolute', top: '100%', right: 0, zIndex: 50,
                              background: 'var(--color-bg-primary)',
                              border: '1px solid var(--color-border)',
                              borderRadius: 'var(--radius-md)',
                              boxShadow: 'var(--shadow-lg)',
                              minWidth: '160px', padding: '4px',
                            }}
                          >
                            <button
                              onClick={() => handleToggle(user.id)}
                              style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                width: '100%', padding: '8px 12px',
                                background: 'transparent', border: 'none',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: 'var(--text-xs)',
                                color: user.is_suspended ? '#10b981' : '#ef4444',
                                cursor: 'pointer', textAlign: 'left',
                              }}
                            >
                              {user.is_suspended ? (
                                <><CheckCircle2 size={14} /> Activate User</>
                              ) : (
                                <><Ban size={14} /> Suspend User</>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {users.length > 0 && (
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>
            Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, total)} of {total} results
          </span>
          <div className={styles.pageControls}>
            <span className={styles.rowsPerPage}>Rows per page: <strong>{PAGE_SIZE}</strong></span>
            <button className={styles.pageArrow} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
              <ChevronLeft size={14} />
            </button>
            <span className={styles.pageNum + ' ' + styles.active}>{currentPage}</span>
            <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>/ {totalPages}</span>
            <button className={styles.pageArrow} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}