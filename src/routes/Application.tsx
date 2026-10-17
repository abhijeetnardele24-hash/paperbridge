import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useJourney } from '../state/JourneyContext';
import { APPLICATION_QUESTIONS } from '../content/scheme';
import { PlainOfficialCard } from '../components/PlainOfficialCard';
import { UncertaintyModal } from '../components/UncertaintyModal';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const Application: React.FC = () => {
  const { state, setQuestionAnswer, markQuestionUncertain, counts, t } = useJourney();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Support direct step navigation via query param ?q=q_id or default to 0
  const qParam = searchParams.get('q');
  const matchedIndex = qParam ? APPLICATION_QUESTIONS.findIndex((q) => q.id === qParam) : -1;
  const currentIndex = matchedIndex >= 0 ? matchedIndex : 0;
  const [uncertainModalOpen, setUncertainModalOpen] = useState(false);

  const currentQuestion = APPLICATION_QUESTIONS[currentIndex] || APPLICATION_QUESTIONS[0];
  const currentAnswer = state.answers[currentQuestion.id] || { value: '', isUncertain: false };

  const isLastQuestion = currentIndex === APPLICATION_QUESTIONS.length - 1;

  const handleNext = () => {
    if (isLastQuestion) {
      navigate('/review');
    } else {
      const nextIdx = currentIndex + 1;
      setSearchParams({ q: APPLICATION_QUESTIONS[nextIdx].id });
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setSearchParams({ q: APPLICATION_QUESTIONS[prevIdx].id });
    } else {
      navigate('/documents');
    }
  };

  return (
    <main id="main-content" tabIndex={-1} style={{ outline: 'none', padding: 'var(--space-10) 0' }}>
      <div className="container" style={{ maxWidth: '960px', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* Step Navigation Bar & Progress Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--color-rule)',
            paddingBottom: 'var(--space-3)',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span className="badge badge-source">{t.application.stepBadge}</span>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-ink-muted)' }}>
              {counts.completed} {t.application.answeredCount} • {counts.uncertain} {t.application.uncertainCount} • {counts.missing} {t.application.remainingCount}
            </span>
          </div>

          {/* Stepper links */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {APPLICATION_QUESTIONS.map((q, idx) => {
              const a = state.answers[q.id];
              const isCurrent = idx === currentIndex;
              const hasAnswer = a && a.value.trim().length > 0;
              const isUnc = a && a.isUncertain;

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setSearchParams({ q: q.id })}
                  aria-label={`Jump to question ${idx + 1}: ${q.plainQuestion}`}
                  aria-current={isCurrent ? 'step' : undefined}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-sm)',
                    border: isCurrent ? '2px solid var(--color-forest)' : '1px solid var(--color-rule)',
                    backgroundColor: isCurrent
                      ? 'var(--color-forest)'
                      : isUnc
                      ? 'var(--color-saffron-light)'
                      : hasAnswer
                      ? 'var(--color-forest-light)'
                      : 'var(--color-paper-elevated)',
                    color: isCurrent ? '#FFFFFF' : 'var(--color-ink)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: isCurrent ? 700 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* The Signature Dual-Layer Component */}
        <PlainOfficialCard
          question={currentQuestion}
          value={currentAnswer.value}
          isUncertain={currentAnswer.isUncertain}
          uncertainNote={currentAnswer.note}
          onChange={(val) => setQuestionAnswer(currentQuestion.id, val, false)}
          onOpenUncertainModal={() => setUncertainModalOpen(true)}
        />

        {/* Stepper Control Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 'var(--space-4)',
            borderTop: '1px solid var(--color-rule)',
          }}
        >
          <button type="button" className="btn btn-secondary" onClick={handleBack}>
            <ArrowLeft size={16} />
            <span>{currentIndex === 0 ? t.documents.heading : t.application.prevQuestion}</span>
          </button>

          <button type="button" className="btn btn-primary" onClick={handleNext}>
            <span>{isLastQuestion ? t.application.reviewAnswers : t.application.nextQuestion}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Uncertainty guidance modal */}
      <UncertaintyModal
        question={currentQuestion}
        isOpen={uncertainModalOpen}
        onClose={() => setUncertainModalOpen(false)}
        onConfirmUncertain={(note) => {
          markQuestionUncertain(currentQuestion.id, note);
        }}
      />
    </main>
  );
};
