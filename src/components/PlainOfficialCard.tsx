import React, { useState } from 'react';
import type { Question } from '../types';
import { useJourney } from '../state/JourneyContext';
import { BookOpen, FileText, HelpCircle, CheckCircle2, AlertCircle, ShieldAlert, Sparkles } from 'lucide-react';

interface PlainOfficialCardProps {
  question: Question;
  value: string;
  isUncertain: boolean;
  uncertainNote?: string;
  onChange: (val: string) => void;
  onOpenUncertainModal: () => void;
}

export const PlainOfficialCard: React.FC<PlainOfficialCardProps> = ({
  question,
  value,
  isUncertain,
  uncertainNote,
  onChange,
  onOpenUncertainModal,
}) => {
  const { t, state } = useJourney();
  const [activeTab, setActiveTab] = useState<'plain' | 'official'>('plain');
  const [whyOpen, setWhyOpen] = useState(false);
  const [evidenceOpen, setEvidenceOpen] = useState(false);

  // Read Aloud hook
  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToRead = activeTab === 'plain'
        ? `${question.plainQuestion}. ${question.plainHelper}`
        : `${question.officialClause}. ${question.officialWording}`;
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
            QUESTION {question.step} OF {question.totalSteps}
          </span>
          <span style={{ color: 'var(--color-rule)' }}>•</span>
          <span className="badge badge-demo">{question.section}</span>
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
        aria-label="Question inspection layer"
        style={{
          display: 'flex',
          backgroundColor: 'var(--color-paper-sunken)',
          padding: '3px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-rule)',
        }}
      >
        <button
          role="tab"
          type="button"
          id={`tab-plain-${question.id}`}
          aria-selected={activeTab === 'plain'}
          aria-controls={`panel-plain-${question.id}`}
          onClick={() => setActiveTab('plain')}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-2)',
            padding: 'var(--space-2) var(--space-3)',
            fontSize: 'var(--text-sm)',
            fontWeight: activeTab === 'plain' ? 700 : 500,
            color: activeTab === 'plain' ? 'var(--color-forest-dark)' : 'var(--color-ink-muted)',
            backgroundColor: activeTab === 'plain' ? 'var(--color-paper-elevated)' : 'transparent',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            boxShadow: activeTab === 'plain' ? 'var(--shadow-sm)' : 'none',
            cursor: 'pointer',
          }}
        >
          <FileText size={16} />
          <span>{t.dualView.plainTab}</span>
        </button>

        <button
          role="tab"
          type="button"
          id={`tab-official-${question.id}`}
          aria-selected={activeTab === 'official'}
          aria-controls={`panel-official-${question.id}`}
          onClick={() => setActiveTab('official')}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-2)',
            padding: 'var(--space-2) var(--space-3)',
            fontSize: 'var(--text-sm)',
            fontWeight: activeTab === 'official' ? 700 : 500,
            color: activeTab === 'official' ? 'var(--color-source-blue)' : 'var(--color-ink-muted)',
            backgroundColor: activeTab === 'official' ? 'var(--color-paper-elevated)' : 'transparent',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            boxShadow: activeTab === 'official' ? 'var(--shadow-sm)' : 'none',
            cursor: 'pointer',
          }}
        >
          <BookOpen size={16} />
          <span>{t.dualView.officialTab}</span>
        </button>
      </div>

      {/* Main Content Area - Responsive Desktop Grid / Mobile Tabbed */}
      <div className="dual-layer-container">
        {/* Layer 1: Plain Meaning Panel */}
        <div
          id={`panel-plain-${question.id}`}
          role="tabpanel"
          aria-labelledby={`tab-plain-${question.id}`}
          className={`layer-panel ${activeTab === 'plain' ? 'is-active' : 'is-inactive-mobile'}`}
          style={{
            display: activeTab === 'plain' ? 'flex' : 'none',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 'var(--text-2xl)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                lineHeight: 1.3,
                color: 'var(--color-ink)',
              }}
            >
              {question.plainQuestion}
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-ink-muted)', marginTop: 'var(--space-2)' }}>
              {question.plainHelper}
            </p>
          </div>

          {/* Form Input Control */}
          <div style={{ marginTop: 'var(--space-2)' }}>
            {question.type === 'choice' && question.options ? (
              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend className="visually-hidden" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
                  {question.plainQuestion}
                </legend>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {question.options.map((opt) => (
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
                        name={question.id}
                        value={opt.value}
                        checked={value === opt.value}
                        onChange={(e) => onChange(e.target.value)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-forest)' }}
                      />
                      <span style={{ fontSize: 'var(--text-base)', fontWeight: value === opt.value ? 600 : 400 }}>
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : question.type === 'date' ? (
              <div>
                <input
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
                  aria-describedby={`help-${question.id}`}
                />
                {question.formatExample && (
                  <p id={`help-${question.id}`} style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', marginTop: 'var(--space-1)' }}>
                    Format: {question.formatExample}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <input
                  type={question.type === 'number' ? 'number' : 'text'}
                  value={value}
                  placeholder={question.placeholder}
                  onChange={(e) => onChange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'var(--space-3) var(--space-4)',
                    fontSize: 'var(--text-lg)',
                    fontFamily: question.type === 'identifier' ? 'var(--font-mono)' : 'inherit',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--color-rule)',
                    backgroundColor: 'var(--color-paper)',
                    minHeight: 'var(--touch-target)',
                  }}
                  aria-describedby={`help-${question.id}`}
                />
                {question.formatExample && (
                  <p id={`help-${question.id}`} style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', marginTop: 'var(--space-1)' }}>
                    Format example: <code style={{ fontFamily: 'var(--font-mono)' }}>{question.formatExample}</code>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Layer 2: Official Wording Panel */}
        <div
          id={`panel-official-${question.id}`}
          role="tabpanel"
          aria-labelledby={`tab-official-${question.id}`}
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
            <span className="badge badge-source">{question.officialClause}</span>
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
            "{question.officialWording}"
          </blockquote>

          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)' }}>
            <p>
              <strong>Source Verification:</strong> This clause was extracted directly from the official BrightSteps Grant regulatory ledger. PaperBridge never invents legal terminology or substitutes opaque guesses.
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
              style={{ padding: 0, fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)' }}
            >
              <HelpCircle size={14} />
              <span>{t.dualView.whyWeAsk}</span>
            </button>
            {whyOpen && (
              <div
                style={{
                  marginTop: 'var(--space-2)',
                  padding: 'var(--space-3)',
                  backgroundColor: 'var(--color-paper)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-ink)',
                  borderLeft: '3px solid var(--color-forest)',
                }}
              >
                {question.whyWeAsk}
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
              style={{ padding: 0, fontSize: 'var(--text-sm)', color: 'var(--color-source-blue)' }}
            >
              <Sparkles size={14} />
              <span>{t.dualView.evidenceHint}</span>
            </button>
            {evidenceOpen && (
              <div
                style={{
                  marginTop: 'var(--space-2)',
                  padding: 'var(--space-3)',
                  backgroundColor: 'var(--color-source-blue-light)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-source-blue)',
                  borderLeft: '3px solid var(--color-source-blue)',
                }}
              >
                {question.evidenceHint}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Card Footer: Uncertainty Action & Local Storage Guarantee */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
          paddingTop: 'var(--space-4)',
          borderTop: '1px solid var(--color-rule)',
        }}
      >
        <button
          type="button"
          className="btn btn-uncertain"
          onClick={onOpenUncertainModal}
          style={{ fontSize: 'var(--text-sm)' }}
        >
          <ShieldAlert size={16} />
          {t.dualView.imNotSure}
        </button>

        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-subtle)' }}>
          🔒 {t.dualView.saveIndicator} • {t.dualView.offlineIndicator}
        </span>
      </div>

      {/* Desktop Split View Styling */}
      <style>{`
        @media (min-width: 900px) {
          .dual-layer-container {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: var(--space-6);
            align-items: start;
          }
          .layer-panel {
            display: flex !important;
          }
        }
      `}</style>
    </article>
  );
};
