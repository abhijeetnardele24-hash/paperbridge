import React from 'react';
import { Link } from 'react-router-dom';
import { useJourney } from '../state/JourneyContext';
import { CheckCircle2, AlertTriangle, ExternalLink, RotateCcw, Printer, ArrowLeft } from 'lucide-react';

export const Complete: React.FC = () => {
  const { state, counts, resetDemo, t } = useJourney();

  const handleReset = () => {
    if (window.confirm(t.nav.resetConfirm)) {
      resetDemo();
    }
  };

  return (
    <main id="main-content" tabIndex={-1} style={{ outline: 'none', padding: 'var(--space-10) 0' }}>
      <div className="container container-narrow" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        {/* Banner with Exact Mandated Text */}
        <div
          className="paper-card"
          style={{
            backgroundColor: 'var(--color-forest-light)',
            borderColor: 'rgba(23, 107, 77, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            textAlign: 'center',
            alignItems: 'center',
            padding: 'var(--space-8)',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-forest)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircle2 size={32} />
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-forest-dark)', lineHeight: 1.25 }}>
            Your PaperBridge preparation is complete. Continue on the official portal.
          </h1>

          <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-ink-muted)', maxWidth: '580px', margin: 0 }}>
            You have verified your eligibility criteria, inspected required certificates, simplified official clauses, and resolved or marked all uncertain fields.
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => alert('Simulated continuation to official portal. (PaperBridge does not submit applications to government databases).')}
            >
              <span>{t.complete.readyPortalCta}</span>
              <ExternalLink size={16} />
            </button>

            <button type="button" className="btn btn-secondary no-print" onClick={() => window.print()}>
              <Printer size={16} />
              <span>Print Complete Dossier</span>
            </button>
          </div>
        </div>

        {/* Prepared Dossier Summary */}
        <div className="paper-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            {t.complete.checklistTitle}
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-paper)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-rule)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>PREPARED ANSWERS</div>
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-forest)' }}>
                {counts.completed} Questions
              </div>
            </div>

            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-paper)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-rule)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>HELPER VERIFICATIONS</div>
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-saffron)' }}>
                {counts.uncertain} Marked Uncertain
              </div>
            </div>

            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-paper)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-rule)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>DOCUMENTS INSPECTED</div>
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-source-blue)' }}>
                4 Certificates
              </div>
            </div>
          </div>

          {/* Uncertain items list if any */}
          {counts.uncertain > 0 && (
            <div
              style={{
                padding: 'var(--space-4)',
                backgroundColor: 'var(--color-saffron-light)',
                borderRadius: 'var(--radius-sm)',
                borderLeft: '4px solid var(--color-saffron)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-saffron-dark)' }}>
                <AlertTriangle size={18} />
                <strong>Remaining Items for Operator or Teacher Review:</strong>
              </div>
              <ul style={{ paddingLeft: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--color-ink)' }}>
                {Object.entries(state.answers)
                  .filter(([, a]) => a.isUncertain)
                  .map(([qid, a]) => (
                    <li key={qid}>
                      <strong>{qid}:</strong> {a.value || 'Unanswered'} — <em>{a.note}</em>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Buttons: Return & Reset */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <Link to="/review" className="btn btn-secondary">
            <ArrowLeft size={16} />
            <span>Review Full Map</span>
          </Link>

          <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ borderColor: 'var(--color-crimson)', color: 'var(--color-crimson)' }}>
            <RotateCcw size={16} />
            <span>Reset Demo to Start Fresh</span>
          </button>
        </div>
      </div>
    </main>
  );
};
