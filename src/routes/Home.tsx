import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useJourney } from '../state/JourneyContext';
import { PlainOfficialCard } from '../components/PlainOfficialCard';
import { APPLICATION_QUESTIONS } from '../content/scheme';
import { UncertaintyModal } from '../components/UncertaintyModal';
import { ArrowRight, ShieldCheck, HardDrive, BookOpen, Sparkles } from 'lucide-react';

export const Home: React.FC = () => {
  const { t, markQuestionUncertain } = useJourney();
  const [demoValue, setDemoValue] = useState('Riya Santosh Shinde');
  const [isDemoUncertain, setIsDemoUncertain] = useState(false);
  const [uncertainModalOpen, setUncertainModalOpen] = useState(false);

  const previewQuestion = APPLICATION_QUESTIONS[0]; // Legal name question

  return (
    <main id="main-content" tabIndex={-1} style={{ outline: 'none', paddingBottom: 'var(--space-16)' }}>
      {/* Hero Section */}
      <section
        style={{
          paddingTop: 'var(--space-12)',
          paddingBottom: 'var(--space-12)',
          borderBottom: '1px solid var(--color-rule)',
          backgroundColor: 'var(--color-paper-elevated)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '820px', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span className="badge badge-demo">
                <Sparkles size={12} />
                Hyperbloom October UI/UX
              </span>
              <span className="badge badge-source">Cognitive Accessibility</span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                color: 'var(--color-ink)',
                letterSpacing: '-0.02em',
              }}
            >
              {t.home.title}
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
                color: 'var(--color-ink-muted)',
                lineHeight: 1.6,
                maxWidth: '680px',
              }}
            >
              {t.home.subtitle}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
              <Link to="/before-you-start" className="btn btn-primary" style={{ padding: 'var(--space-3) var(--space-6)' }}>
                <span>{t.home.startCta}</span>
                <ArrowRight size={18} />
              </Link>

              <Link to="/evidence" className="btn btn-secondary" style={{ padding: 'var(--space-3) var(--space-6)' }}>
                <BookOpen size={18} />
                <span>{t.home.storyCta}</span>
              </Link>
            </div>

            {/* Fictional Scheme Notice */}
            <div
              style={{
                marginTop: 'var(--space-4)',
                padding: 'var(--space-3) var(--space-4)',
                backgroundColor: 'var(--color-paper-sunken)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-rule)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-ink-muted)',
              }}
            >
              <strong>Disclosure:</strong> {t.home.fictionalNotice}
            </div>
          </div>
        </div>
      </section>

      {/* Three Honest Promises */}
      <section style={{ padding: 'var(--space-12) 0', borderBottom: '1px solid var(--color-rule)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {/* Promise 1 */}
            <div className="paper-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-forest-light)',
                  color: 'var(--color-forest)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <h2 style={{ fontSize: 'var(--text-lg)', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
                {t.home.promise1Title}
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', margin: 0 }}>
                {t.home.promise1Desc}
              </p>
            </div>

            {/* Promise 2 */}
            <div className="paper-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-saffron-light)',
                  color: 'var(--color-saffron)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <HardDrive size={22} />
              </div>
              <h2 style={{ fontSize: 'var(--text-lg)', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
                {t.home.promise2Title}
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', margin: 0 }}>
                {t.home.promise2Desc}
              </p>
            </div>

            {/* Promise 3 */}
            <div className="paper-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-source-blue-light)',
                  color: 'var(--color-source-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BookOpen size={22} />
              </div>
              <h2 style={{ fontSize: 'var(--text-lg)', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
                {t.home.promise3Title}
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', margin: 0 }}>
                {t.home.promise3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Signature Interaction Preview */}
      <section style={{ padding: 'var(--space-12) 0' }}>
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <span className="badge badge-source" style={{ alignSelf: 'center' }}>
                Signature Interaction Preview
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
                {t.home.previewHeading}
              </h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-ink-muted)' }}>
                {t.home.previewSubheading}
              </p>
            </div>

            {/* Actual Working Component */}
            <PlainOfficialCard
              question={previewQuestion}
              value={demoValue}
              isUncertain={isDemoUncertain}
              onChange={(val) => setDemoValue(val)}
              onOpenUncertainModal={() => setUncertainModalOpen(true)}
            />

            <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
              <Link to="/before-you-start" className="btn btn-primary">
                <span>Continue to Full 5-Step Journey</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Uncertainty Modal for Preview */}
      <UncertaintyModal
        question={previewQuestion}
        isOpen={uncertainModalOpen}
        onClose={() => setUncertainModalOpen(false)}
        onConfirmUncertain={(note) => {
          setIsDemoUncertain(true);
          markQuestionUncertain(previewQuestion.id, note);
        }}
      />
    </main>
  );
};
