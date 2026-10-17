import React from 'react';
import { Link } from 'react-router-dom';
import { useJourney } from '../state/JourneyContext';
import { DocumentCard } from '../components/DocumentCard';
import { ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle, FileQuestion, ShieldCheck } from 'lucide-react';

export const Documents: React.FC = () => {
  const { state, t } = useJourney();

  const docList = Object.values(state.documents);
  const readyCount = docList.filter((d) => d.status === 'ready').length;
  const needsAttentionCount = docList.filter((d) => d.status === 'needs_attention').length;
  const missingCount = docList.filter((d) => d.status === 'missing').length;

  return (
    <main id="main-content" tabIndex={-1} style={{ outline: 'none', padding: 'var(--space-10) 0' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        {/* Header & Status Banner */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span className="badge badge-source">{t.documents.stepBadge}</span>
            <span className="badge badge-demo">{t.documents.demoBadge}</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
            {t.documents.heading}
          </h1>

          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-ink-muted)', maxWidth: '780px' }}>
            {t.documents.subheading}
          </p>

          {/* Technical Disclaimer Notice */}
          <div
            role="note"
            aria-label="Technical Scope Disclaimer"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-3)',
              padding: 'var(--space-3) var(--space-4)',
              backgroundColor: 'var(--color-paper-sunken)',
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--color-forest)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-ink)',
              lineHeight: 1.5,
              marginTop: 'var(--space-1)',
            }}
          >
            <ShieldCheck size={18} style={{ color: 'var(--color-forest)', flexShrink: 0, marginTop: '2px' }} />
            <span>{t.documents.technicalDisclaimer}</span>
          </div>

          {/* Readiness Summary Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
              flexWrap: 'wrap',
              padding: 'var(--space-3) var(--space-4)',
              backgroundColor: 'var(--color-paper-elevated)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-rule)',
              marginTop: 'var(--space-2)',
            }}
          >
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>{t.documents.boardStatusLabel}</span>

            <span className="badge badge-success">
              <CheckCircle2 size={13} />
              {readyCount} {t.documents.statusReady}
            </span>

            {needsAttentionCount > 0 && (
              <span className="badge badge-warning">
                <AlertTriangle size={13} />
                {needsAttentionCount} {t.documents.statusNeedsAttention}
              </span>
            )}

            {missingCount > 0 && (
              <span className="badge badge-error">
                <FileQuestion size={13} />
                {missingCount} {t.documents.statusMissing}
              </span>
            )}

            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', marginLeft: 'auto' }}>
              🔒 {t.documents.localInspectionOnly}
            </span>
          </div>
        </div>

        {/* 2x2 Grid of Document Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {docList.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </div>

        {/* Navigation Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 'var(--space-6)',
            borderTop: '1px solid var(--color-rule)',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
          }}
        >
          <Link to="/eligibility" className="btn btn-secondary">
            <ArrowLeft size={16} />
            <span>{t.documents.backToEligibility}</span>
          </Link>

          <Link to="/application" className="btn btn-primary" style={{ padding: 'var(--space-3) var(--space-6)' }}>
            <span>{t.documents.continueToApplication}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
};
