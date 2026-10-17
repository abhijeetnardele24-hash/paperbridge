import React, { useState } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { useJourney } from '../state/JourneyContext';
import { getFieldLabel, formatFieldValue, getSectionLabel } from '../utils/formatters';
import { ShieldCheck, AlertCircle, Clock, CheckCircle2, ArrowLeft, Lock } from 'lucide-react';

interface ConsentedPayload {
  v: number;
  token: string;
  scheme: string;
  createdAt: string;
  expiresAt: string;
  helper: string;
  sections: string[];
  includesIdentifiers: boolean;
  data: Record<string, { field: string; value: string; isUncertain: boolean; note?: string }>;
}

export const HandoffView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { state } = useJourney();

  // Accept token and payload EXCLUSIVELY from location.hash (privacy boundary).
  // Query parameters are strictly rejected to prevent URL leakage to server logs, referrer headers, or browser history.
  const rawHash = location.hash || (typeof window !== 'undefined' ? window.location.hash : '');
  const hash = rawHash.replace(/^#/, '');
  const hashParams = new URLSearchParams(hash);
  const token = hashParams.get('token') || '';
  const rawP = hashParams.get('p') || '';

  let payload: ConsentedPayload | null = null;
  let validationError = '';

  // Check for rejected query-string attempts
  const queryP = searchParams.get('p');
  const queryToken = searchParams.get('token');
  if (queryP || queryToken) {
    validationError = 'Privacy boundary violation: Handoff data must be passed exclusively via URL fragment (#), not query parameters (?). Query parameters are strictly rejected to prevent server log and referrer leakage.';
  } else if (!rawP) {
    validationError = 'No valid handoff payload was supplied in the redemption URL fragment (#). Please generate a packet first.';
  } else if (rawP.length > 20000) {
    validationError = 'Payload exceeds safety size limit (oversized packet rejected).';
  } else {
    try {
      const binary = atob(decodeURIComponent(rawP));
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const jsonStr = new TextDecoder().decode(bytes);
      const parsed = JSON.parse(jsonStr) as Partial<ConsentedPayload>;

      // Schema validation
      if (parsed.v !== 1) {
        validationError = 'Unsupported packet schema version.';
      } else if (!parsed.token || (token && parsed.token !== token)) {
        validationError = 'Token mismatch between packet header and verification signature.';
      } else if (!parsed.createdAt || isNaN(new Date(parsed.createdAt).getTime()) || !parsed.expiresAt || isNaN(new Date(parsed.expiresAt).getTime())) {
        validationError = 'Malformed or invalid timestamp in packet payload.';
      } else if (!Array.isArray(parsed.sections)) {
        validationError = 'Invalid sections manifest.';
      } else if (!parsed.data || typeof parsed.data !== 'object') {
        validationError = 'Invalid packet payload structure.';
      } else if (!parsed.includesIdentifiers) {
        // Verify data minimization: no sensitive identifiers should be present
        const forbiddenKeys = ['q_legal_name', 'q_dob', 'legal_name', 'date_of_birth'];
        const hasForbidden = Object.keys(parsed.data).some((k) => forbiddenKeys.includes(k) || forbiddenKeys.includes(parsed.data?.[k]?.field || ''));
        if (hasForbidden) {
          validationError = 'Packet integrity violation: student excluded personal identifiers, but payload contained identity records.';
        } else {
          payload = parsed as ConsentedPayload;
        }
      } else {
        payload = parsed as ConsentedPayload;
      }
    } catch {
      validationError = 'Could not decode or parse consented packet payload.';
    }
  }

  // Check revocation status against local journey state
  const isLocallyRevoked = Boolean(token && state.handoff.token === token && state.handoff.isRevoked);
  const [isExpired] = useState(() => (payload ? new Date(payload.expiresAt).getTime() < Date.now() : false));

  return (
    <main id="main-content" tabIndex={-1} style={{ outline: 'none', padding: 'var(--space-10) 0' }}>
      <div className="container container-narrow" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-rule)', paddingBottom: 'var(--space-3)' }}>
          <Link to="/handoff" className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: 'var(--text-xs)' }}>
            <ArrowLeft size={14} />
            <span>Return to Handoff Controls</span>
          </Link>
          <span className="badge badge-demo">Local Helper Redemption View</span>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
            Consented Preparation Packet
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)' }}>
            Demonstration view for authorized school counselors, CSC operators, or trusted family helpers.
          </p>
        </div>

        {/* Decode Error or Missing Token */}
        {(!payload || validationError) && (
          <div className="paper-card" style={{ borderColor: 'var(--color-crimson)', backgroundColor: 'var(--color-crimson-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-crimson)' }}>
              <AlertCircle size={20} />
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Invalid Packet Token</h2>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
              {validationError || 'No valid handoff payload was supplied in the redemption URL. Please generate a packet first.'}
            </p>
          </div>
        )}

        {/* Revoked State */}
        {payload && isLocallyRevoked && (
          <div className="paper-card" style={{ borderColor: 'var(--color-crimson)', backgroundColor: 'var(--color-crimson-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-crimson)' }}>
              <AlertCircle size={20} />
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Packet Access Revoked</h2>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
              The student has explicitly revoked access to this handoff token on their local device. No further helper viewing is permitted.
            </p>
          </div>
        )}

        {/* Expired State */}
        {payload && !isLocallyRevoked && isExpired && (
          <div className="paper-card" style={{ borderColor: 'var(--color-saffron)', backgroundColor: 'var(--color-saffron-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-saffron-dark)' }}>
              <Clock size={20} />
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Packet Has Expired</h2>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
              This time-limited local demonstration packet was valid for 24 hours and has now expired.
            </p>
          </div>
        )}

        {/* Active Valid Consented Data View */}
        {payload && !isLocallyRevoked && !isExpired && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Header Card */}
            <div className="paper-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', borderColor: 'var(--color-forest)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <CheckCircle2 size={18} color="var(--color-forest)" />
                  <span style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-forest)' }}>
                    Active Consented Packet
                  </span>
                </div>
                <span className="badge badge-source" style={{ fontFamily: 'var(--font-mono)' }}>
                  Token: {payload.token}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
                <div><strong>Designated Helper:</strong> {payload.helper || 'Open Demonstration'}</div>
                <div><strong>Scheme:</strong> {payload.scheme}</div>
                <div><strong>Created:</strong> {new Date(payload.createdAt).toLocaleTimeString()}</div>
                <div><strong>Expires:</strong> {new Date(payload.expiresAt).toLocaleTimeString()}</div>
              </div>

              {/* Personal Identifier Consent Badge */}
              <div
                style={{
                  padding: 'var(--space-3)',
                  backgroundColor: payload.includesIdentifiers ? 'var(--color-saffron-light)' : 'var(--color-paper)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-xs)',
                  border: '1px solid var(--color-rule)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                }}
              >
                <Lock size={14} color={payload.includesIdentifiers ? 'var(--color-saffron-dark)' : 'var(--color-forest)'} />
                <span>
                  {payload.includesIdentifiers
                    ? 'Student consented to include national identity documents and bank IFSC details.'
                    : 'Personal identity and bank credentials were excluded by student consent for privacy.'}
                </span>
              </div>
            </div>

            {/* Consented Fields by Section */}
            {payload.sections.map((sectionName) => {
              const localizedSectionName = getSectionLabel(sectionName, state.locale);
              const items = Object.entries(payload!.data).filter(([, item]) => {
                if (sectionName === 'Personal Details') return item.field === 'legal_name' || item.field === 'date_of_birth';
                if (sectionName === 'Family Financial Context') return item.field === 'annual_income';
                if (sectionName === 'Academic Details') return item.field === 'institution_name' || item.field === 'academic_stream';
                if (sectionName === 'Direct Benefit Transfer (DBT)') return item.field === 'bank_ifsc';
                return false;
              });

              return (
                <div key={sectionName} className="paper-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <h3 style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-serif)', fontWeight: 700, borderBottom: '1px solid var(--color-rule)', paddingBottom: 'var(--space-2)' }}>
                    {localizedSectionName}
                  </h3>

                  {items.length === 0 ? (
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', fontStyle: 'italic' }}>
                      No fields available in this section or excluded by consent.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      {items.map(([qId, item]) => (
                        <div
                          key={qId}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 'var(--space-2) var(--space-3)',
                            backgroundColor: 'var(--color-paper)',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-rule)',
                            fontSize: 'var(--text-sm)',
                          }}
                        >
                          <div>
                            <span style={{ color: 'var(--color-ink-muted)' }}>{getFieldLabel(item.field, state.locale)}:</span>{' '}
                            <strong>{formatFieldValue(qId, item.value, state.locale)}</strong>
                            {item.isUncertain && (
                              <span className="badge badge-warning" style={{ marginLeft: 'var(--space-2)', fontSize: '10px' }}>
                                Needs Checking: {item.note || 'Marked by student'}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Explicit Security & Demonstration Boundary */}
            <div
              style={{
                padding: 'var(--space-4)',
                backgroundColor: 'var(--color-paper-sunken)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-rule)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-ink-muted)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-forest-dark)', fontWeight: 700 }}>
                <ShieldCheck size={16} />
                <span>Local Demonstration Privacy Boundary</span>
              </div>
              <p style={{ margin: 0 }}>
                • <strong>Zero Remote Transmission:</strong> PaperBridge has no central backend. This data was unpacked locally in your browser exclusively from the URL fragment (#).
              </p>
              <p style={{ margin: 0 }}>
                • <strong>Unencrypted Bearer Fragment:</strong> The payload is URL-encoded (Base64) within the URL fragment for client-side transport, not cryptographically encrypted. Anyone with access to the link or QR packet can inspect the consented fields.
              </p>
              <p style={{ margin: 0 }}>
                • <strong>Local Revocation Boundary:</strong> Local revocation clears the current browser's active handoff state, but cannot remotely invalidate or delete a packet already copied or opened elsewhere. Expiration is checked against the local receiving device clock without server-backed access control.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
