import React, { useState } from 'react';
import type { Question } from '../types';
import { useJourney } from '../state/JourneyContext';
import { getLocalizedQuestion } from '../content/localizedScheme';
import { getSectionLabel, getChoiceLabel } from '../utils/formatters';
import { BookOpen, FileText, HelpCircle, CheckCircle2, AlertCircle, ShieldAlert, Sparkles } from 'lucide-react';

interface PlainOfficialCardProps {
  question: Question;
  value: string;
  isUncertain: boolean;
  uncertainNote?: string;
  headingLevel?: 'h1' | 'h2' | 'h3';
  onChange: (val: string) => void;
  onOpenUncertainModal: () => void;
}

export const PlainOfficialCard: React.FC<PlainOfficialCardProps> = ({
  question,
  value,
  isUncertain,
  uncertainNote,
  headingLevel = 'h1',
  onChange,
  onOpenUncertainModal,
}) => {
  const { t, state } = useJourney();
  const q = getLocalizedQuestion(question, state.locale);
  const [activeTab, setActiveTab] = useState<'plain' | 'official'>('plain');
  const [whyOpen, setWhyOpen] = useState(false);
  const [evidenceOpen, setEvidenceOpen] = useState(false);

  // Read Aloud hook
  const handleReadAloud = () => {
    if ('speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined') {
      window.speechSynthesis.cancel();
      const textToRead = activeTab === 'plain'
        ? `${q.plainQuestion}. ${q.plainHelper}`
        : `${q.officialClause}. ${q.officialWording}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = state.locale === 'hi' ? 'hi-IN' : state.locale === 'mr' ? 'mr-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <article
      className="paper-card"
      style={{
        border: isUncertain ? '1.5px solid var(--color-saffron)' : '1px solid var(--color-rule)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
      }}
    >
      {/* Top Header: Step Indicator & Section Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-ink-muted)' }}>
            {t.application.questionStep.toUpperCase()} {q.step} {t.application.ofStep.toUpperCase()} {q.totalSteps}
          </span>
          <span style={{ color: 'var(--color-rule)' }}>•</span>
          <span className="badge badge-demo">{getSectionLabel(q.section, state.locale)}</span>
        </div>

        {/* Status Indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          {isUncertain ? (
            <span className="badge badge-warning" title={uncertainNote}>
              <AlertCircle size={12} />
              Needs Verification
            </span>
          ) : value.trim() ? (
            <span className="badge badge-success">
              <CheckCircle2 size={12} />
              Answered
            </span>
          ) : null}

          {state.accessibility.readAloud && (
            <button
              type="button"
              className="btn btn-text"
              onClick={handleReadAloud}
              aria-label="Read question aloud"
              style={{ padding: '2px 6px', fontSize: 'var(--text-xs)' }}
            >
              🔊 Read Aloud
            </button>
          )}
        </div>
      </div>

      {/* Layer Navigation Pill (Mobile & Desktop Dual Tabs) */}
      <div
        role="tablist"
        aria-label="Question Presentation Layers"
        style={{
          display: 'flex',
          backgroundColor: 'var(--color-paper-sunken)',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-rule-subtle)',
          width: 'fit-content',
        }}
      >
        <button
          type="button"
          role="tab"
          id={`tab-plain-${q.id}`}
          aria-selected={activeTab === 'plain'}
          aria-controls={`panel-plain-${q.id}`}
          onClick={() => setActiveTab('plain')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            padding: 'var(--space-2) var(--space-4)',
            fontSize: 'var(--text-sm)',
            fontWeight: activeTab === 'plain' ? 700 : 500,
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            backgroundColor: activeTab === 'plain' ? 'var(--color-paper-elevated)' : 'transparent',
            color: activeTab === 'plain' ? 'var(--color-forest)' : 'var(--color-ink-muted)',
            boxShadow: activeTab === 'plain' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <BookOpen size={16} />
          <span>{t.dualView.plainTab}</span>
        </button>

        <button
          type="button"
          role="tab"
          id={`tab-official-${q.id}`}
          aria-selected={activeTab === 'official'}
          aria-controls={`panel-official-${q.id}`}
          onClick={() => setActiveTab('official')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            padding: 'var(--space-2) var(--space-4)',
            fontSize: 'var(--text-sm)',
            fontWeight: activeTab === 'official' ? 700 : 500,
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            backgroundColor: activeTab === 'official' ? 'var(--color-paper-elevated)' : 'transparent',
            color: activeTab === 'official' ? 'var(--color-source-blue)' : 'var(--color-ink-muted)',
            boxShadow: activeTab === 'official' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <FileText size={16} />
          <span>{t.dualView.officialTab}</span>
        </button>
      </div>

      {/* Layer Content Viewport */}
      <div style={{ position: 'relative' }}>
        {/* Layer 1: Plain Meaning Panel */}
        <div
          id={`panel-plain-${q.id}`}
          role="tabpanel"
          aria-labelledby={`tab-plain-${q.id}`}
          className={`layer-panel ${activeTab === 'plain' ? 'is-active' : 'is-inactive-mobile'}`}
          style={{
            display: activeTab === 'plain' ? 'flex' : 'none',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}
        >
          <div>
            {React.createElement(
              headingLevel,
              {
                id: `question-title-${q.id}`,
                style: {
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 700,
                  color: 'var(--color-ink)',
                  lineHeight: 1.3,
                  margin: 0,
                },
              },
              q.plainQuestion
            )}

            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-ink-muted)', marginTop: 'var(--space-2)', lineHeight: 1.5 }}>
              {q.plainHelper}
            </p>
          </div>

          {/* Form Input Control */}
          <div style={{ marginTop: 'var(--space-2)' }}>
            <label htmlFor={`input-${q.id}`} className="visually-hidden" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
              {q.plainQuestion}
            </label>

            {q.type === 'choice' && q.options ? (
              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend className="visually-hidden" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
                  {q.plainQuestion}
                </legend>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {q.options.map((opt) => {
                    const localizedOptionLabel = getChoiceLabel(q.id, opt.value, state.locale) || opt.label;
                    return (
                      <label
                        key={opt.value}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-3)',
                          padding: 'var(--space-3) var(--space-4)',
                          backgroundColor: value === opt.value ? 'var(--color-forest-light)' : 'var(--color-paper)',
                          border: value === opt.value ? '1.5px solid var(--color-forest)' : '1px solid var(--color-rule)',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          minHeight: 'var(--touch-target)',
                          transition: 'background-color 0.15s ease',
                        }}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={opt.value}
                          checked={value === opt.value}
                          onChange={(e) => onChange(e.target.value)}
                          style={{ width: '18px', height: '18px', accentColor: 'var(--color-forest)' }}
                        />
                        <span style={{ fontSize: 'var(--text-base)', fontWeight: value === opt.value ? 600 : 400 }}>
                          {localizedOptionLabel}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ) : q.type === 'date' ? (
              <div>
                <input
                  id={`input-${q.id}`}
                  type="date"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  style={{
                    width: '100%',
                    maxWidth: '320px',
                    padding: 'var(--space-3) var(--space-4)',
                    fontSize: 'var(--text-base)',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--color-rule)',
                    backgroundColor: 'var(--color-paper)',
                    minHeight: 'var(--touch-target)',
                  }}
                  aria-describedby={`help-${q.id}`}
                />
                {q.formatExample && (
                  <p id={`help-${q.id}`} style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', marginTop: 'var(--space-1)' }}>
                    Format: {q.formatExample}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <input
                  id={`input-${q.id}`}
                  type={q.type === 'number' ? 'number' : 'text'}
                  value={value}
                  placeholder={q.placeholder}
                  onChange={(e) => onChange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'var(--space-3) var(--space-4)',
                    fontSize: 'var(--text-lg)',
                    fontFamily: q.type === 'identifier' ? 'var(--font-mono)' : 'inherit',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--color-rule)',
                    backgroundColor: 'var(--color-paper)',
                    minHeight: 'var(--touch-target)',
                  }}
                  aria-describedby={`help-${q.id}`}
                />
                {q.formatExample && (
                  <p id={`help-${q.id}`} style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', marginTop: 'var(--space-1)' }}>
                    Format example: <code style={{ fontFamily: 'var(--font-mono)' }}>{q.formatExample}</code>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Layer 2: Official Wording Panel */}
        <div
          id={`panel-official-${q.id}`}
          role="tabpanel"
          aria-labelledby={`tab-official-${q.id}`}
          className={`layer-panel ${activeTab === 'official' ? 'is-active' : 'is-inactive-mobile'}`}
          style={{
            display: activeTab === 'official' ? 'flex' : 'none',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            backgroundColor: 'var(--color-source-blue-light)',
            padding: 'var(--space-5)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(36, 91, 138, 0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span className="badge badge-source">{q.officialClause}</span>
          </div>

          <blockquote
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-lg)',
              lineHeight: 1.5,
              color: 'var(--color-ink)',
              borderLeft: '3px solid var(--color-source-blue)',
              paddingLeft: 'var(--space-4)',
              margin: 0,
              fontStyle: 'italic',
            }}
          >
            "{q.officialWording}"
          </blockquote>

          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)' }}>
            <p>
              <strong>Source Verification:</strong> This clause is extracted directly from the official BrightSteps Grant regulatory ledger. PaperBridge never invents legal terminology or substitutes opaque guesses.
            </p>
          </div>
        </div>
      </div>

      {/* Disclosures: "Why we ask" & "Evidence Hint" (Collapsible for Focus Mode) */}
      {!state.accessibility.focusMode && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
            paddingTop: 'var(--space-3)',
            borderTop: '1px solid var(--color-rule)',
          }}
        >
          {/* Why we ask disclosure */}
          <div>
            <button
              type="button"
              className="btn btn-text"
              onClick={() => setWhyOpen(!whyOpen)}
              aria-expanded={whyOpen}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-2) 0',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-forest)',
                fontWeight: 600,
              }}
            >
              <HelpCircle size={16} />
              <span>{t.dualView.whyWeAsk}</span>
            </button>
            {whyOpen && (
              <div
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  backgroundColor: 'var(--color-forest-light)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-forest-dark)',
                  lineHeight: 1.5,
                  marginTop: 'var(--space-1)',
                }}
              >
                {q.whyWeAsk}
              </div>
            )}
          </div>

          {/* Evidence hint disclosure */}
          <div>
            <button
              type="button"
              className="btn btn-text"
              onClick={() => setEvidenceOpen(!evidenceOpen)}
              aria-expanded={evidenceOpen}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-2) 0',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-source-blue)',
                fontWeight: 600,
              }}
            >
              <Sparkles size={16} />
              <span>{t.dualView.evidenceHint}</span>
            </button>
            {evidenceOpen && (
              <div
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  backgroundColor: 'var(--color-source-blue-light)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-source-blue)',
                  lineHeight: 1.5,
                  marginTop: 'var(--space-1)',
                }}
              >
                {q.evidenceHint}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Uncertainty Action Bar: "I am not sure" */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 'var(--space-3)',
          borderTop: '1px solid var(--color-rule-subtle)',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
        }}
      >
        <button
          type="button"
          className="btn btn-text"
          onClick={onOpenUncertainModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            color: 'var(--color-saffron-dark)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
          }}
        >
          <ShieldAlert size={16} />
          <span>{t.dualView.imNotSure}</span>
        </button>

        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
          🔒 {t.dualView.saveIndicator}
        </span>
      </div>
    </article>
  );
};
