import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useJourney } from '../state/JourneyContext';
import { APPLICATION_QUESTIONS } from '../content/scheme';
import { getSectionLabel } from '../utils/formatters';
import QRCode from 'qrcode';
import { Lock, Printer, Trash2, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Copy, Check, ExternalLink } from 'lucide-react';

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
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [redemptionPath, setRedemptionPath] = useState<string>('');

  const toggleSection = (section: string) => {
    setSelectedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const generateQRCodeForToken = (token: string, sections: string[], withId: boolean, helper: string, createdAtStr: string, expiresAtStr: string) => {
    const consentedData: Record<string, { field: string; value: string; isUncertain: boolean; note?: string }> = {};

    APPLICATION_QUESTIONS.forEach((q) => {
      let isAllowed = false;
      if (sections.includes('Personal Details') && (q.field === 'legal_name' || q.field === 'date_of_birth')) {
        isAllowed = withId;
      } else if (sections.includes('Family Financial Context') && q.field === 'annual_income') {
        isAllowed = true;
      } else if (sections.includes('Academic Details') && (q.field === 'institution_name' || q.field === 'academic_stream')) {
        isAllowed = true;
      } else if (sections.includes('Direct Benefit Transfer (DBT)') && q.field === 'bank_ifsc') {
        isAllowed = withId;
      }

      if (isAllowed) {
        const a = state.answers[q.id];
        if (a && a.value) {
          consentedData[q.id] = {
            field: q.field,
            value: a.value,
            isUncertain: a.isUncertain,
            note: a.note,
          };
        }
      }
    });

    const payload = {
      v: 1,
      token,
      scheme: 'BrightSteps Student Support Grant (Demo)',
      createdAt: createdAtStr,
      expiresAt: expiresAtStr,
      helper,
      sections,
      includesIdentifiers: withId,
      data: consentedData,
    };

    // Safe UTF-8 TextEncoder Base64 encoding without deprecated escape/unescape
    const jsonStr = JSON.stringify(payload);
    const uint8 = new TextEncoder().encode(jsonStr);
    let binary = '';
    for (let i = 0; i < uint8.length; i++) {
      binary += String.fromCharCode(uint8[i]);
    }
    const encoded = encodeURIComponent(btoa(binary));

    // Privacy boundary: Store in URL fragment (#) so payload is never transmitted to hosting server
    const relPath = `/handoff/view#token=${token}&p=${encoded}`;
    setRedemptionPath(relPath);

    const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${relPath}` : relPath;
    QRCode.toDataURL(fullUrl, {
      margin: 1,
      width: 140,
      color: { dark: '#176B4D', light: '#FFFFFF' },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.warn('QR generation error', err));
  };

  // Generate on initial mount if active token already exists in state
  useEffect(() => {
    if (state.handoff.token && !state.handoff.isRevoked) {
      generateQRCodeForToken(
        state.handoff.token,
        state.handoff.selectedSections,
        state.handoff.includePersonalIdentifiers,
        state.handoff.recipientName,
        state.handoff.createdAt,
        state.handoff.expiresAt
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerate = () => {
    const token = createHandoff(selectedSections, includeId, helperName);
    const now = new Date();
    const expires = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    generateQRCodeForToken(token, selectedSections, includeId, helperName, now.toISOString(), expires.toISOString());
  };

  const handleRevoke = () => {
    revokeHandoff();
    setQrDataUrl('');
    setRedemptionPath('');
  };

  const handleCopyToken = () => {
    if (state.handoff.token) {
      navigator.clipboard.writeText(state.handoff.token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
            <span className="badge badge-source">{t.handoff.stepBadge}</span>
            <span className="badge badge-demo">{t.handoff.demoBadge}</span>
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
              {t.handoff.selectSectionsDesc}
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
                  {getSectionLabel(sec, state.locale)}
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
                style={{ width: '18px', height: '18px', accentColor: 'var(--color-saffron-dark)' }}
              />
              <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-ink)' }}>
                {t.handoff.includeIdCheckbox}
              </span>
            </label>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', margin: 0, paddingLeft: '28px' }}>
              {t.handoff.includeIdWarning}
            </p>
          </div>

          {/* Trusted Helper Name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <label htmlFor="helper-name" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              {t.handoff.trustedHelperLabel}
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
        {state.handoff.token && (
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
                  <span className="badge badge-error">{t.handoff.accessRevoked}</span>
                ) : (
                  <span className="badge badge-success">
                    <CheckCircle2 size={13} />
                    {t.handoff.packetActive}
                  </span>
                )}
                <span className="badge badge-demo">{t.handoff.demoBadge}</span>
              </div>

              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
                {state.handoff.isRevoked ? 'Expired / Revoked' : t.handoff.expiresInLabel}
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
              {qrDataUrl && !state.handoff.isRevoked ? (
                <div
                  style={{
                    padding: '8px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-rule)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={qrDataUrl}
                    alt={`Scannable demonstration QR code for token ${state.handoff.token}`}
                    style={{ width: '120px', height: '120px', display: 'block' }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    backgroundColor: 'var(--color-paper-sunken)',
                    border: '1px dashed var(--color-rule)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-ink-muted)',
                    textAlign: 'center',
                    padding: 'var(--space-2)',
                  }}
                >
                  {state.handoff.isRevoked ? 'Revoked' : 'No Token'}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', flex: 1 }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', textTransform: 'uppercase' }}>
                  {t.handoff.tokenLabel}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-forest)' }}>
                    {state.handoff.token}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyToken}
                    className="btn btn-secondary"
                    style={{ padding: '4px 8px', fontSize: 'var(--text-xs)' }}
                    title="Copy token to clipboard"
                  >
                    {copied ? <Check size={14} color="var(--color-forest)" /> : <Copy size={14} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', margin: 0, marginTop: 'var(--space-1)' }}>
                  {t.handoff.qrDescription}
                </p>

                {redemptionPath && !state.handoff.isRevoked && (
                  <div style={{ marginTop: 'var(--space-2)' }}>
                    <Link
                      to={redemptionPath}
                      className="btn btn-secondary"
                      style={{ fontSize: 'var(--text-xs)', padding: '6px 12px', display: 'inline-flex', gap: '6px' }}
                    >
                      <ExternalLink size={13} />
                      <span>{t.handoff.openDemoRedemption}</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Demonstration boundary notice */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
              <ShieldCheck size={16} color="var(--color-forest)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{t.handoff.demonstrationNotice}</span>
            </div>

            {/* Packet Management Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', borderTop: '1px solid var(--color-rule-subtle)', paddingTop: 'var(--space-3)' }}>
              {!state.handoff.isRevoked ? (
                <button
                  type="button"
                  className="btn btn-text"
                  onClick={handleRevoke}
                  style={{ color: 'var(--color-crimson)', fontSize: 'var(--text-sm)' }}
                >
                  <Trash2 size={16} />
                  <span>{t.handoff.revokeAction}</span>
                </button>
              ) : (
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-crimson)', fontWeight: 600 }}>
                  This token was revoked on this device.
                </span>
              )}

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handlePrint}
                style={{ marginLeft: 'auto', fontSize: 'var(--text-sm)' }}
              >
                <Printer size={16} />
                <span>{t.handoff.printableChecklistCta}</span>
              </button>
            </div>
          </div>
        )}

        {/* Navigation Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 'var(--space-6)',
            borderTop: '1px solid var(--color-rule)',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
          }}
        >
          <Link to="/review" className="btn btn-secondary">
            <ArrowLeft size={16} />
            <span>Return to Review Map</span>
          </Link>

          <Link to="/complete" className="btn btn-primary" style={{ padding: 'var(--space-3) var(--space-6)' }}>
            <span>Complete Preparation Journey</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
};
