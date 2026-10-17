import React from 'react';
import { Link } from 'react-router-dom';
import { useJourney } from '../state/JourneyContext';
import { Clock, FileCheck, WifiOff, CheckCircle2, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const BeforeYouStart: React.FC = () => {
  const { t } = useJourney();

  return (
    <main id="main-content" tabIndex={-1} style={{ outline: 'none', padding: 'var(--space-10) 0' }}>
      <div className="container container-narrow" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span className="badge badge-source">{t.beforeYouStart.stepBadge}</span>
            <span className="badge badge-demo">{t.beforeYouStart.badgeDemo}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
            {t.beforeYouStart.heading}
          </h1>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-ink-muted)' }}>
            {t.beforeYouStart.subheading}
          </p>
        </div>

        {/* Quick Facts Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          <div className="paper-card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <Clock size={24} color="var(--color-forest)" />
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>{t.beforeYouStart.expectedTimeLabel}</div>
              <div style={{ fontWeight: 700, fontSize: 'var(--text-base)' }}>{t.beforeYouStart.expectedTimeValue}</div>
            </div>
          </div>

          <div className="paper-card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <FileCheck size={24} color="var(--color-forest)" />
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>{t.beforeYouStart.docsNeededLabel}</div>
              <div style={{ fontWeight: 700, fontSize: 'var(--text-base)' }}>{t.beforeYouStart.docsNeededValue}</div>
            </div>
          </div>

          <div className="paper-card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <WifiOff size={24} color="var(--color-forest)" />
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>{t.beforeYouStart.offlineSafeLabel}</div>
              <div style={{ fontWeight: 700, fontSize: 'var(--text-base)' }}>{t.beforeYouStart.offlineSafeValue}</div>
            </div>
          </div>
        </div>

        {/* Required Document Groups */}
        <div className="paper-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>
            {t.beforeYouStart.docsHeading}
          </h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', paddingLeft: 'var(--space-4)', color: 'var(--color-ink)' }}>
            <li>
              <strong>1. Identity Verification:</strong> School ID card, Aadhaar document, or government photo ID.
            </li>
            <li>
              <strong>2. Family Income Certificate:</strong> Current fiscal year revenue certificate issued by the Tehsildar or SDM office.
            </li>
            <li>
              <strong>3. School Bonafide Certificate:</strong> Signed letter from your Headmaster or College Principal confirming active admission.
            </li>
            <li>
              <strong>4. Student Bank Account Proof:</strong> Passbook front page showing your full name, Account Number, and 11-digit IFSC code.
            </li>
          </ul>
        </div>

        {/* What PaperBridge Does vs Does Not Do */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {/* What it DOES */}
          <div
            className="paper-card"
            style={{
              backgroundColor: 'var(--color-forest-light)',
              borderColor: 'rgba(23, 107, 77, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-forest-dark)' }}>
              <CheckCircle2 size={20} />
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>What PaperBridge Does</h2>
            </div>
            <ul style={{ paddingLeft: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-ink)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <li>Explains official questions in short, clear words.</li>
              <li>Always keeps the exact official source clause inspectable.</li>
              <li>Allows "I am not sure" as a valid answer with zero penalty.</li>
              <li>Prepares a consent-controlled packet for a trusted helper or teacher.</li>
            </ul>
          </div>

          {/* What it DOES NOT DO */}
          <div
            className="paper-card"
            style={{
              backgroundColor: 'var(--color-crimson-light)',
              borderColor: 'rgba(163, 58, 50, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-crimson)' }}>
              <XCircle size={20} />
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>What PaperBridge Does Not Do</h2>
            </div>
            <ul style={{ paddingLeft: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-ink)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <li>Does NOT submit your application to the government portal.</li>
              <li>Does NOT decide your legal eligibility or grant amount.</li>
              <li>Does NOT transmit uploaded demo documents to remote cloud servers.</li>
              <li>Does NOT replace the official portal's submission step.</li>
            </ul>
          </div>
        </div>

        {/* Privacy Note */}
        <div
          style={{
            padding: 'var(--space-4)',
            backgroundColor: 'var(--color-paper-elevated)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-rule)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'var(--space-3)',
          }}
        >
          <ShieldCheck size={20} color="var(--color-forest)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', margin: 0, lineHeight: 1.5 }}>
            <strong>Local-First Guarantee:</strong> {t.beforeYouStart.privacyPromise1} {t.beforeYouStart.privacyPromise2}
          </p>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 'var(--space-4)' }}>
          <Link to="/eligibility" className="btn btn-primary" style={{ padding: 'var(--space-3) var(--space-6)' }}>
            <span>{t.beforeYouStart.startEligibilityCta}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
};
