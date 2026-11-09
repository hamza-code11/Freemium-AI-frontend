// components/dashboard/help/HelpForm.tsx
'use client';

import React, { useState } from 'react';
import {
  User,
  Mail,
  Send,
  Upload,
  Paperclip,
  X,
  MessageSquare,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { supportService } from '@/services/support.service';
import styles from './HelpForm.module.css';

export default function HelpForm({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    description: '',
    attachment: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must not exceed 5MB');
        return;
      }
      setFormData((prev) => ({ ...prev, attachment: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, boolean> = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.subject.trim()) newErrors.subject = true;
    if (!formData.description.trim()) newErrors.description = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fill all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      await supportService.createTicket({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        description: formData.description.trim(),
        attachment: formData.attachment,
      });

      toast.success('Request submitted! We will respond within 3 Days.');

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        description: '',
        attachment: null,
      });

      // Trigger callback to refresh tickets list
      if (onSuccess) onSuccess();
    } catch (err: any) {
      const msg = err.response?.data?.detail;
      toast.error(typeof msg === 'string' ? msg : 'Failed to submit request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>
          <MessageSquare size={18} />
        </div>
        <div>
          <h2 className={styles.cardTitle}>Submit a Request</h2>
          <p className={styles.cardSubtitle}>
            Describe your issue and our team will respond within 3 Days.
          </p>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        
        {/* Name + Email */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>
              <User size={13} /> Full Name <span className={styles.req}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`${styles.input} ${errors.name ? styles.errorField : ''}`}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>
              <Mail size={13} /> Email <span className={styles.req}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`${styles.input} ${errors.email ? styles.errorField : ''}`}
            />
          </div>
        </div>

        {/* Subject */}
        <div className={styles.field}>
          <label className={styles.label}>
            Subject <span className={styles.req}>*</span>
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Brief summary of your issue"
            className={`${styles.input} ${errors.subject ? styles.errorField : ''}`}
          />
        </div>

        {/* Description */}
        <div className={styles.field}>
          <label className={styles.label}>
            Description <span className={styles.req}>*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Explain your issue in detail..."
            rows={5}
            className={`${styles.textarea} ${errors.description ? styles.errorField : ''}`}
          />
        </div>

        {/* Attachment */}
        <div className={styles.field}>
          <label className={styles.label}>
            <Paperclip size={13} /> Attachment <span className={styles.optional}>(Optional)</span>
          </label>
          <div className={styles.fileUpload}>
            <input
              type="file"
              id="help-file"
              onChange={handleFileChange}
              accept="image/*,.pdf,.doc,.docx"
              className={styles.fileInput}
            />
            <label htmlFor="help-file" className={styles.fileLabel}>
              <Upload size={16} />
              <span>
                {formData.attachment
                  ? formData.attachment.name
                  : 'Upload screenshot or document'}
              </span>
            </label>
            {formData.attachment && (
              <button
                type="button"
                className={styles.fileClear}
                onClick={() => setFormData((p) => ({ ...p, attachment: null }))}
              >
                <X size={14} />
              </button>
            )}
          </div>
          <p className={styles.helpText}>JPG, PNG, PDF, DOC up to 5MB</p>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          {submitting ? (
            <>
              <span className={styles.spinner} /> Submitting...
            </>
          ) : (
            <>
              <Send size={15} /> Submit Request
            </>
          )}
        </button>
      </form>
    </div>
  );
}
