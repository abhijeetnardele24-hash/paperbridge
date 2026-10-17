import React, { useState } from 'react';
import type { DocumentItem } from '../types';
import { useJourney } from '../state/JourneyContext';
import { CheckCircle2, AlertTriangle, FileQuestion, Upload, Eye, RefreshCw, FileText } from 'lucide-react';

interface DocumentCardProps {
  doc: DocumentItem;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ doc: initialDoc }) => {
  const { state, updateDocumentStatus, t } = useJourney();
  const doc = state.documents[initialDoc.id] || initialDoc;
  const [isInspecting, setIsInspecting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock upload / inspect scan
  const handleSimulatedUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      updateDocumentStatus(
        doc.id,
        'ready',
        `${doc.category}_sample_synthetic.pdf`,
        '540 KB',
        'Synthetic verification passed: 300 DPI, margins intact, stamp recognized.'
      );
    }, 600);
  };

  const getStatusBadge = () => {
    switch (doc.status) {
      case 'ready':
        return (
          <span className="badge badge-success">
            <CheckCircle2 size={13} />
            {t.documents.statusReady}
          </span>
        );
      case 'needs_attention':
        return (
          <span className="badge badge-warning">
            <AlertTriangle size={13} />
            {t.documents.statusNeedsAttention}
          </span>
        );
      case 'missing':
      default:
        return (
          <span className="badge badge-error">
            <FileQuestion size={13} />
            {t.documents.statusMissing}
          </span>
        );
    }
  };

  return (
    <div
      className="paper-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        borderColor:
          doc.status === 'ready'
            ? 'rgba(23, 107, 77, 0.4)'
            : doc.status === 'needs_attention'
            ? 'rgba(181, 91, 15, 0.5)'
            : 'var(--color-rule)',
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
        <div>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-ink-muted)' }}>
            CATEGORY: {doc.category}
          </span>
          <h3
            style={{
              fontSize: 'var(--text-xl)',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              color: 'var(--color-ink)',
              marginTop: 'var(--space-1)',
            }}
          >
            {doc.name}
          </h3>
        </div>
        {getStatusBadge()}
      </div>

      {/* Description */}
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', margin: 0 }}>
        {doc.description}
      </p>

      {/* Synthetic Document Visual Representation */}
      <div
        style={{
          border: '1px dashed var(--color-rule)',
          backgroundColor: 'var(--color-paper-sunken)',
          padding: 'var(--space-4)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
        }}
      >
        <div
          style={{
            width: '44px',
            height: '56px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-rule)',
            borderRadius: 'var(--radius-sm)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-forest)',
            flexShrink: 0,
          }}
        >
          <FileText size={24} />
        </div>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink)' }}>
          <strong>{t.documents.whatItLooksLike}:</strong> {doc.exampleDescription}
        </div>
      </div>

      {/* Metadata tags */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
        <div>
          <strong>{t.documents.issuedBy}:</strong> {doc.issuer}
        </div>
        <div>
          <strong>{t.documents.acceptedFormats}:</strong> {doc.acceptedFormats}
        </div>
      </div>

      {/* Attached file status or feedback */}
      {doc.fileName && (
        <div
          style={{
            backgroundColor: 'var(--color-forest-light)',
            padding: 'var(--space-3)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-forest-dark)',
            borderLeft: '3px solid var(--color-forest)',
          }}
        >
          <strong>Simulated Attachment:</strong> {doc.fileName} ({doc.fileSize})
          {doc.feedback && <div style={{ marginTop: '2px' }}>{doc.feedback}</div>}
        </div>
      )}

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          marginTop: 'auto',
          paddingTop: 'var(--space-3)',
          borderTop: '1px solid var(--color-rule-subtle)',
          flexWrap: 'wrap',
        }}
      >
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleSimulatedUpload}
          disabled={isProcessing}
          style={{ fontSize: 'var(--text-sm)', flex: 1, justifyContent: 'center' }}
        >
          {isProcessing ? <RefreshCw size={14} className="spin" /> : <Upload size={14} />}
          <span>{doc.status === 'ready' ? 'Re-inspect Sample' : t.documents.mockUpload}</span>
        </button>

        <button
          type="button"
          className="btn btn-text"
          onClick={() => setIsInspecting(!isInspecting)}
          aria-expanded={isInspecting}
          style={{ fontSize: 'var(--text-sm)' }}
        >
          <Eye size={14} />
          <span>{isInspecting ? 'Hide Specimen' : 'Specimen Guide'}</span>
        </button>
      </div>

      {/* Specimen Guide drawer */}
      {isInspecting && (
        <div
          style={{
            padding: 'var(--space-3)',
            backgroundColor: 'var(--color-source-blue-light)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-source-blue)',
            border: '1px solid rgba(36, 91, 138, 0.2)',
          }}
        >
          <strong>Synthetic Specimen Checklist:</strong>
          <ul style={{ paddingLeft: 'var(--space-4)', marginTop: 'var(--space-1)' }}>
            <li>Original government header with department emblem</li>
            <li>Applicant name and father's name matching marksheet</li>
            <li>Revenue barcode or certificate serial identifier</li>
            <li>No cropped edges or low-contrast flash glare</li>
          </ul>
        </div>
      )}
    </div>
  );
};
