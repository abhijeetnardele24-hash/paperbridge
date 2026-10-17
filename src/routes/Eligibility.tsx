import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useJourney } from '../state/JourneyContext';
import { ELIGIBILITY_QUESTIONS } from '../content/scheme';
import { getLocalizedEligibilityQuestion } from '../content/localizedScheme';
import { ArrowLeft, ArrowRight, AlertCircle, RotateCcw } from 'lucide-react';

export const Eligibility: React.FC = () => {
  const { state, setEligibilityAnswer, t } = useJourney();
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const rawQ = ELIGIBILITY_QUESTIONS[currentStepIndex];
  const currentQ = getLocalizedEligibilityQuestion(rawQ, state.locale);
  const selectedAnswer = state.eligibilityAnswers[currentQ?.id] || '';

  // Check if current answer causes ineligibility
  const selectedOption = currentQ?.options.find((o) => o.value === selectedAnswer);
  const isIneligible = selectedOption?.eligible === false;
  const isLastQuestion = currentStepIndex === ELIGIBILITY_QUESTIONS.length - 1;

  const handleNext = () => {
    if (isLastQuestion) {
      navigate('/documents');
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <main id="main-content" tabIndex={-1} style={{ outline: 'none', padding: 'var(--space-10) 0' }}>
      <div className="container container-narrow" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* Navigation Breadcrumb & Calm Progress */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-rule)', paddingBottom: 'var(--space-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-ink-muted)' }}>
              {t.application.questionStep.toUpperCase()} {currentQ.step} {t.application.ofStep.toUpperCase()} {currentQ.totalSteps}
            </span>
            <span style={{ color: 'var(--color-rule)' }}>•</span>
            <span className="badge badge-demo">{t.eligibility.triageBadge}</span>
          </div>

          <span className="badge badge-source">
            {currentQ.officialRef}
          </span>
        </div>

        {/* Ineligible Explanation Screen (Never a dead end) */}
        {isIneligible ? (
          <div
            className="paper-card"
            style={{
              borderColor: 'var(--color-crimson)',
              backgroundColor: 'var(--color-crimson-light)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-crimson)' }}>
              <AlertCircle size={22} />
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>
                {t.eligibility.ineligibleHeading}
              </h2>
            </div>

            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-ink)', lineHeight: 1.5 }}>
              {selectedOption?.rejectionReason}
            </p>

            <div
              style={{
                padding: 'var(--space-4)',
                backgroundColor: 'var(--color-paper-elevated)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-rule)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
              }}
            >
              <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink)' }}>
                Supportive Next Steps:
              </strong>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', margin: 0 }}>
                {t.eligibility.ineligibleAlternative}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-2)', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEligibilityAnswer(currentQ.id, '')}
              >
                <RotateCcw size={16} />
                <span>{t.eligibility.ineligibleReconsider}</span>
              </button>

              <Link to="/documents" className="btn btn-text">
                <span>{t.eligibility.continueToDocuments}</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Normal Question Card */
          <div className="paper-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div>
              <h1
                style={{
                  fontSize: 'var(--text-2xl)',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: 'var(--color-ink)',
                }}
              >
                {currentQ.question}
              </h1>

              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', marginTop: 'var(--space-2)' }}>
                {currentQ.helper}
              </p>
            </div>

            {/* Answer Choices */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }} role="radiogroup" aria-label={currentQ.question}>
              {currentQ.options.map((opt) => {
                const isChecked = selectedAnswer === opt.value;
                return (
                  <label
                    key={opt.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      border: isChecked ? '2px solid var(--color-forest)' : '1px solid var(--color-rule)',
                      backgroundColor: isChecked ? 'var(--color-forest-light)' : 'var(--color-paper)',
                      cursor: 'pointer',
                      minHeight: 'var(--touch-target)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <input
                      type="radio"
                      name={`eligibility-${currentQ.id}`}
                      value={opt.value}
                      checked={isChecked}
                      onChange={() => setEligibilityAnswer(currentQ.id, opt.value)}
                      style={{
                        width: '20px',
                        height: '20px',
                        accentColor: 'var(--color-forest)',
                      }}
                    />
                    <span style={{ fontSize: 'var(--text-base)', fontWeight: isChecked ? 600 : 400, color: 'var(--color-ink)' }}>
                      {opt.label}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Question Card Footer Navigation */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 'var(--space-4)',
                borderTop: '1px solid var(--color-rule-subtle)',
                marginTop: 'var(--space-2)',
              }}
            >
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleBack}
                disabled={currentStepIndex === 0}
                style={{ visibility: currentStepIndex === 0 ? 'hidden' : 'visible' }}
              >
                <ArrowLeft size={16} />
                <span>{t.eligibility.backAction}</span>
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
                disabled={!selectedAnswer || isIneligible}
                style={{ padding: 'var(--space-3) var(--space-6)' }}
              >
                <span>{isLastQuestion ? t.eligibility.continueToDocuments : t.eligibility.nextAction}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Progress Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-2)' }} aria-hidden="true">
          {ELIGIBILITY_QUESTIONS.map((q, idx) => {
            const isAnswered = Boolean(state.eligibilityAnswers[q.id]);
            const isCurrent = idx === currentStepIndex;
            return (
              <div
                key={q.id}
                style={{
                  width: isCurrent ? '24px' : '8px',
                  height: '8px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: isCurrent
                    ? 'var(--color-forest)'
                    : isAnswered
                    ? 'var(--color-forest-dark)'
                    : 'var(--color-rule)',
                  transition: 'all 0.2s ease',
                }}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};
