import React, { useEffect, useRef, useState } from 'react';
import type { Question } from '../types';
import { useJourney } from '../state/JourneyContext';
import { X, ShieldAlert, Sparkles, Check, ArrowRight } from 'lucide-react';

interface UncertaintyModalProps {
  question: Question;
  isOpen: boolean;
  onClose: () => void;
  onConfirmUncertain: (note: string) => void;
}

export const UncertaintyModal: React.FC<UncertaintyModalProps> = ({
  question,
  isOpen,
  onClose,
  onConfirmUncertain,
}) => {
  const { t } = useJourney();
  const [note, setNote] = useState('');
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeBtnRef.current?.focus();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleMarkAndContinue = () => {
    onConfirmUncertain(note.trim() || 'Applicant requested verification with helper or teacher.');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="uncertainty-title"
      aria-describedby="uncertainty-desc"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
        backgroundColor: 'rgba(24, 33, 29, 0.55)',
        backdropFilter: 'blur(2px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="paper-card"
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'var(--color-paper-elevated)',
          border: '1.5px solid var(--color-saffron)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-5)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-saffron-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-saffron)',
                flexShrink: 0,
              }}
            >
              <ShieldAlert size={20} />
            </div>
            <div>
              <h2
                id="uncertainty-title"
                style={{
                  fontSize: 'var(--text-lg)',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {t.dualView.imNotSureModalTitle}
              </h2>
              <span className="badge badge-warning" style={{ marginTop: 'var(--space-1)' }}>
                Zero Penalties for Uncertainty
              </span>
            </div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            aria-label="Close dialog"
            style={{ minHeight: '36px', minWidth: '36px', padding: '6px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Reassurance prose */}
        <p id="uncertainty-desc" style={{ fontSize: 'var(--text-base)', color: 'var(--color-ink-muted)' }}>
          {t.dualView.imNotSureModalDesc}
        </p>

        {/* Evidence resolution hint */}
        <div
          style={{
            padding: 'var(--space-4)',
            backgroundColor: 'var(--color-source-blue-light)',
            borderRadius: 'var(--radius-md)',
            borderLeft: '4px solid var(--color-source-blue)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-source-blue)' }}>
            <Sparkles size={16} />
            <strong style={{ fontSize: 'var(--text-sm)' }}>What document resolves this question:</strong>
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink)', margin: 0 }}>
            {question.evidenceHint}
          </p>
        </div>

        {/* Optional note input */}
        <div>
          <label htmlFor="uncertain-note" style={{ display: 'block', fontWeight: 600, fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>
            Note for your helper (Optional):
          </label>
          <textarea
            id="uncertain-note"
            rows={3}
            placeholder="e.g. My income certificate is from last year; I need to ask Asha if it is still acceptable."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{
              width: '100%',
              padding: 'var(--space-3)',
              fontSize: 'var(--text-sm)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-rule)',
              backgroundColor: 'var(--color-paper)',
              fontFamily: 'inherit',
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleMarkAndContinue}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <ArrowRight size={16} />
            {t.dualView.imNotSureReviewLater}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Check size={16} />
            {t.dualView.imNotSureResolvedAction}
          </button>
        </div>
      </div>
    </div>
  );
};
