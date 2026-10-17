import React from 'react';
import { Link } from 'react-router-dom';
import { useJourney } from '../state/JourneyContext';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { resetDemo, t } = useJourney();

  const handleReset = () => {
    if (window.confirm(t.nav.resetConfirm)) {
      resetDemo();
    }
  };

  return (
    <footer
      role="contentinfo"
      style={{
        backgroundColor: 'var(--color-paper-elevated)',
        borderTop: '1px solid var(--color-rule)',
        paddingTop: 'var(--space-10)',
        paddingBottom: 'var(--space-10)',
        marginTop: 'auto',
      }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 'var(--space-6)',
          }}
        >
          {/* Col 1: Brand & Purpose */}
          <div style={{ maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>
                PaperBridge
              </span>
              <span className="badge badge-demo">
                <ShieldCheck size={12} />
                Hyperbloom 2026
              </span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', lineHeight: 1.5 }}>
              Public forms that explain themselves. A consent-first, cognitive accessibility interface turning complex scholarship procedures into source-linked decisions without hiding the official wording.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
            <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
              Navigation
            </span>
            <Link to="/before-you-start">Preparation Contract</Link>
            <Link to="/eligibility">Eligibility Triage</Link>
            <Link to="/documents">Document Readiness Board</Link>
            <Link to="/application">One-Decision Application</Link>
            <Link to="/review">Review Map</Link>
            <Link to="/handoff">Helper Handoff</Link>
            <Link to="/evidence">Design Case Study</Link>
          </div>

          {/* Col 3: Boundaries & Reset */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', maxWidth: '300px' }}>
            <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
              Integrity & Reset
            </span>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
              All answers remain in local browser storage. No remote analytics or trackers.
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
              style={{ fontSize: 'var(--text-xs)', padding: '6px 12px', minHeight: '34px', width: 'fit-content' }}
            >
              {t.nav.resetDemo}
            </button>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div
          style={{
            paddingTop: 'var(--space-6)',
            borderTop: '1px solid var(--color-rule-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-3)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-ink-subtle)',
          }}
        >
          <div>
            Built with care for <strong>Hyperbloom October — UI/UX and Web Design</strong> by <strong>Team MetaMask</strong> (Abhijeet Nardele).
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span>WCAG 2.2 AA Target</span>
            <span>•</span>
            <span>Zero Third-Party Trackers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
