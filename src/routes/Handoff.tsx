import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useJourney } from '../state/JourneyContext';
import { QrCode, Lock, Printer, Trash2, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const Handoff: React.FC = () => {
  const { state, createHandoff, revokeHandoff, t } = useJourney();

  const sectionsAvailable = ['Personal Details', 'Academic Details', 'Family Financial Context', 'Direct Benefit Transfer (DBT)'];

  const [selectedSections, setSelectedSections] = useState<string[]>(
    state.handoff.selectedSections.length > 0
      ? state.handoff.selectedSections
      : ['Personal Details', 'Academic Details']
  );
  const [includeId, setIncludeId] = useState(state.handoff.includePersonalIdentifiers);
  const [helperName, setHelperName] = useState(state.handoff.recipientName || 'Asha Tai (CSC Center / Teacher)');
  const [generatedToken, setGeneratedToken] = useState(state.handoff.token || '');

  const toggleSection = (section: string) => {
    setSelectedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const handleGenerate = () => {
    const token = createHandoff(selectedSections, includeId, helperName);
    setGeneratedToken(token);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main id="main-content" tabIndex={-1} style={{ outline: 'none', padding: 'var(--space-10) 0' }}>
      <div className="container container-narrow" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span className="badge badge-source">Step 5 of 5: Safe Handoff</span>
            <span className="badge badge-demo">Consent Gateway</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
            {t.handoff.heading}
          </h1>

          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-ink-muted)' }}>
            {t.handoff.subheading}
          </p>
        </div>

        {/* Section Sharing Consent Selector */}
        <div className="paper-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div>
            <h2 style={{ fontSize: 'var(--text-lg)', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
              {t.handoff.selectSectionsTitle}
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', marginTop: 'var(--space-1)' }}>
              Check each category of information you permit your helper to view:
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {sectionsAvailable.map((sec) => (
              <label
                key={sec}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3) var(--space-4)',
                  backgroundColor: selectedSections.includes(sec) ? 'var(--color-forest-light)' : 'var(--color-paper)',
                  border: selectedSections.includes(sec) ? '1.5px solid var(--color-forest)' : '1px solid var(--color-rule)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  minHeight: 'var(--touch-target)',
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedSections.includes(sec)}
                  onChange={() => toggleSection(sec)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-forest)' }}
                />
                <span style={{ fontSize: 'var(--text-base)', fontWeight: selectedSections.includes(sec) ? 600 : 400 }}>
                  {sec}
                </span>
              </label>
            ))}
          </div>

          {/* Privacy Toggle: National Identity Document */}
          <div
            style={{
              padding: 'var(--space-4)',
              backgroundColor: includeId ? 'var(--color-saffron-light)' : 'var(--color-paper-sunken)',
              borderRadius: 'var(--radius-md)',
              border: includeId ? '1.5px solid var(--color-saffron)' : '1px solid var(--color-rule)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={includeId}
                onChange={(e) => setIncludeId(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--color-saffron)' }}
              />
              <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink)' }}>
                {t.handoff.includeIdCheckbox}
              </strong>
            </label>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', margin: 0, paddingLeft: 'calc(18px + var(--space-3))' }}>
              {t.handoff.includeIdWarning}
            </p>
          </div>

          {/* Helper Recipient Name */}
          <div>
            <label htmlFor="helper-name" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
              {t.handoff.trustedHelperLabel}:
            </label>
            <input
              id="helper-name"
              type="text"
              value={helperName}
              onChange={(e) => setHelperName(e.target.value)}
              placeholder="e.g. Asha Tai or Headmaster Joshi"
              style={{
                width: '100%',
                padding: 'var(--space-3) var(--space-4)',
                fontSize: 'var(--text-base)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-rule)',
                backgroundColor: 'var(--color-paper)',
              }}
            />
          </div>

          {/* Generate Button */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleGenerate}
            style={{ padding: 'var(--space-3)', justifyContent: 'center' }}
          >
            <Lock size={16} />
            <span>{t.handoff.generateTokenAction}</span>
          </button>
        </div>

        {/* Generated Packet Card */}
        {generatedToken && (
          <div
            className="paper-card"
            style={{
              borderColor: state.handoff.isRevoked ? 'var(--color-crimson)' : 'var(--color-forest)',
              backgroundColor: state.handoff.isRevoked ? 'var(--color-crimson-light)' : 'var(--color-paper-elevated)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-5)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                {state.handoff.isRevoked ? (
                  <span className="badge badge-error">Access Revoked</span>
                ) : (
                  <span className="badge badge-success">
                    <CheckCircle2 size={13} />
                    Packet Active
                  </span>
                )}
                <span className="badge badge-demo">Synthetic Local Token</span>
              </div>

              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
                {state.handoff.isRevoked ? 'Expired' : t.handoff.expiresInLabel}
              </span>
            </div>

            {/* Token & Visual QR representation */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-6)',
                padding: 'var(--space-4)',
                backgroundColor: 'var(--color-paper)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-rule)',
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  width: '90px',
                  height: '90px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-rule)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-ink)',
                }}
                aria-label="Synthetic QR Token Representation"
              >
                <QrCode size={64} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', textTransform: 'uppercase' }}>
                  {t.handoff.tokenLabel}
                </span>
                <span style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-forest)' }}>
                  {state.handoff.token}
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
                  Recipient: <strong>{state.handoff.recipientName || 'Authorized Helper'}</strong>
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
                  Included: {state.handoff.selectedSections.join(', ')}
                </span>
              </div>
            </div>

            {/* Actions: Print and Revoke */}
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-secondary no-print"
                onClick={handlePrint}
                style={{ fontSize: 'var(--text-sm)' }}
              >
                <Printer size={16} />
                <span>{t.handoff.printableChecklistCta}</span>
              </button>

              {!state.handoff.isRevoked && (
                <button
                  type="button"
                  className="btn btn-secondary no-print"
                  onClick={revokeHandoff}
                  style={{ fontSize: 'var(--text-sm)', borderColor: 'var(--color-crimson)', color: 'var(--color-crimson)' }}
                >
                  <Trash2 size={16} />
                  <span>{t.handoff.revokeAction}</span>
                </button>
              )}
            </div>

            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', margin: 0 }}>
              {t.handoff.demonstrationNotice}
            </p>
          </div>
        )}

        {/* Navigation Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--space-4)' }}>
          <Link to="/review" className="btn btn-secondary">
            <ArrowLeft size={16} />
            <span>Back to Review Map</span>
          </Link>

          <Link to="/complete" className="btn btn-primary" style={{ padding: 'var(--space-3) var(--space-6)' }}>
            <span>Finalize & Finish Preparation</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
};
