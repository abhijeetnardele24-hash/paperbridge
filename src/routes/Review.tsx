import React from 'react';
import { Link } from 'react-router-dom';
import { useJourney } from '../state/JourneyContext';
import { APPLICATION_QUESTIONS } from '../content/scheme';
import { CheckCircle2, AlertTriangle, FileQuestion, ArrowRight, ArrowLeft, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const Review: React.FC = () => {
  const { state, t } = useJourney();

  const completedList = APPLICATION_QUESTIONS.filter((q) => {
    const a = state.answers[q.id];
    return a && a.value.trim().length > 0 && !a.isUncertain;
  });

  const uncertainList = APPLICATION_QUESTIONS.filter((q) => {
    const a = state.answers[q.id];
    return a && a.isUncertain;
  });

  const missingList = APPLICATION_QUESTIONS.filter((q) => {
    const a = state.answers[q.id];
    return !a || a.value.trim().length === 0;
  });

  return (
    <main id="main-content" tabIndex={-1} style={{ outline: 'none', padding: 'var(--space-10) 0' }}>
      <div className="container container-narrow" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span className="badge badge-source">Step 4 of 5: Review Map</span>
            <span className="badge badge-demo">Inspection Gateway</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
            {t.review.heading}
          </h1>

          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-ink-muted)' }}>
            {t.review.subheading}
          </p>
        </div>

        {/* 1. Missing Items (Blocking) */}
        {missingList.length > 0 && (
          <div
            className="paper-card"
            style={{
              borderColor: 'rgba(163, 58, 50, 0.4)',
              backgroundColor: 'var(--color-crimson-light)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-crimson)' }}>
              <FileQuestion size={20} />
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>
                {t.review.missingSection} ({missingList.length})
              </h2>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink)', margin: 0 }}>
              These required questions have not been answered yet. Select any item to go straight to that question.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {missingList.map((q) => (
                <Link
                  key={q.id}
                  to={`/application?q=${q.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-3) var(--space-4)',
                    backgroundColor: 'var(--color-paper-elevated)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-rule)',
                    textDecoration: 'none',
                    color: 'var(--color-ink)',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  <span>
                    <strong>Q{q.step}:</strong> {q.plainQuestion}
                  </span>
                  <ArrowUpRight size={16} color="var(--color-crimson)" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 2. Needs Checking (Uncertain) */}
        {uncertainList.length > 0 && (
          <div
            className="paper-card"
            style={{
              borderColor: 'rgba(181, 91, 15, 0.4)',
              backgroundColor: 'var(--color-saffron-light)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-saffron-dark)' }}>
              <AlertTriangle size={20} />
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>
                {t.review.checkSection} ({uncertainList.length})
              </h2>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink)', margin: 0 }}>
              These answers were marked for helper verification. They will be highlighted in your helper handoff packet.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {uncertainList.map((q) => {
                const a = state.answers[q.id];
                return (
                  <Link
                    key={q.id}
                    to={`/application?q=${q.id}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-1)',
                      padding: 'var(--space-3) var(--space-4)',
                      backgroundColor: 'var(--color-paper-elevated)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-rule)',
                      textDecoration: 'none',
                      color: 'var(--color-ink)',
                      fontSize: 'var(--text-sm)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>
                        <strong>Q{q.step}:</strong> {q.plainQuestion}
                      </span>
                      <ArrowUpRight size={16} color="var(--color-saffron)" />
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
                      Current value: <strong>{a.value || 'None'}</strong> • <em>Note: {a.note}</em>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Complete & Ready */}
        <div className="paper-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-forest)' }}>
            <CheckCircle2 size={20} />
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>
              {t.review.completeSection} ({completedList.length})
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {completedList.map((q) => {
              const a = state.answers[q.id];
              return (
                <div
                  key={q.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-3) var(--space-4)',
                    backgroundColor: 'var(--color-paper)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-rule)',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  <div>
                    <span style={{ color: 'var(--color-ink-muted)' }}>Q{q.step}:</span> <strong>{q.field}:</strong>{' '}
                    <span>{a.value}</span>
                  </div>
                  <Link
                    to={`/application?q=${q.id}`}
                    style={{ fontSize: 'var(--text-xs)', color: 'var(--color-forest)', textDecoration: 'none', fontWeight: 600 }}
                  >
                    Edit
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Handoff Preview Summary */}
        <div
          style={{
            padding: 'var(--space-4)',
            backgroundColor: 'var(--color-paper-elevated)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-rule)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-ink-muted)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-forest)' }}>
            <ShieldCheck size={16} />
            <strong>What will be included in the helper packet:</strong>
          </div>
          <p style={{ margin: 0 }}>
            Only sections you explicitly select on the next screen. Personal national identity documents are excluded by default to protect your privacy.
          </p>
        </div>

        {/* Navigation Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--space-4)' }}>
          <Link to="/application" className="btn btn-secondary">
            <ArrowLeft size={16} />
            <span>Back to Questions</span>
          </Link>

          <Link to="/handoff" className="btn btn-primary" style={{ padding: 'var(--space-3) var(--space-6)' }}>
            <span>{t.review.continueToHandoff}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
};
