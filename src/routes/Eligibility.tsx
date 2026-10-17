import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useJourney } from '../state/JourneyContext';
import { ELIGIBILITY_QUESTIONS } from '../content/scheme';
import { ArrowLeft, ArrowRight, AlertCircle, RotateCcw } from 'lucide-react';

export const Eligibility: React.FC = () => {
  const { state, setEligibilityAnswer } = useJourney();
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentQ = ELIGIBILITY_QUESTIONS[currentStepIndex];
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
              QUESTION {currentQ.step} OF {currentQ.totalSteps}
            </span>
            <span style={{ color: 'var(--color-rule)' }}>•</span>
            <span className="badge badge-demo">Eligibility Triage</span>
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
                This Specific Grant May Not Fit Your Current Situation
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
                Recommended Supportive Next Steps:
              </strong>
              <ul style={{ paddingLeft: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)' }}>
                <li>Explore the National Merit-cum-Means Portal for higher income bands (up to ₹8 Lakhs).</li>
                <li>Consult with your college grievance or student-welfare cell for emergency institutional waivers.</li>
                <li>You can also change your answer if you selected an option by mistake.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEligibilityAnswer(currentQ.id, '')}
              >
                <RotateCcw size={16} />
                <span>Re-answer This Question</span>
              </button>

              <Link to="/documents" className="btn btn-text">
                <span>Explore Document Prep Anyway</span>
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
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-ink-muted)', marginTop: 'var(--space-2)' }}>
                {currentQ.helper}
              </p>
            </div>

            {/* Closed Options */}
            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend className="visually-hidden" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
                {currentQ.question}
              </legend>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {currentQ.options.map((opt) => {
                  const isChecked = selectedAnswer === opt.value;
                  return (
                    <label
                      htmlFor={`${currentQ.id}_${opt.value}`}
                      key={opt.value}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-3)',
                        padding: 'var(--space-4)',
                        backgroundColor: isChecked ? 'var(--color-forest-light)' : 'var(--color-paper)',
                        border: isChecked ? '2px solid var(--color-forest)' : '1px solid var(--color-rule)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        minHeight: 'var(--touch-target)',
                        transition: 'background-color 0.15s ease, border-color 0.15s ease',
                      }}
                    >
                      <input
                        id={`${currentQ.id}_${opt.value}`}
                        type="radio"
                        name={currentQ.id}
                        value={opt.value}
                        checked={isChecked}
                        onChange={(e) => setEligibilityAnswer(currentQ.id, e.target.value)}
                        style={{ width: '20px', height: '20px', accentColor: 'var(--color-forest)' }}
                      />
                      <span style={{ fontSize: 'var(--text-base)', fontWeight: isChecked ? 600 : 400 }}>
                        {opt.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Navigation Buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 'var(--space-4)',
                borderTop: '1px solid var(--color-rule)',
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
                <span>Back</span>
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
                disabled={!selectedAnswer}
              >
                <span>{isLastQuestion ? 'Review Document Readiness' : 'Next Question'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
