import React, { useState } from 'react';
import type { DocumentItem } from '../types';
import { useJourney } from '../state/JourneyContext';
import { getLocalizedDocument } from '../content/localizedScheme';
import { CheckCircle2, AlertTriangle, FileQuestion, Upload, Eye, FileText, Trash2, ShieldCheck, Sparkles } from 'lucide-react';

interface DocumentCardProps {
  doc: DocumentItem;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ doc: initialDoc }) => {
  const { state, updateDocumentStatus, t } = useJourney();
  const rawDoc = state.documents[initialDoc.id] || initialDoc;
  const doc = getLocalizedDocument(rawDoc, state.locale);
  const [isInspecting, setIsInspecting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return `${Math.round(bytes / 1024)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const inspectFile = async (file: File) => {
    setIsProcessing(true);

    // 1. File Size Validation (Max 2MB = 2,097,152 bytes)
    const MAX_SIZE = 2 * 1024 * 1024;
    const formattedSize = formatSize(file.size);

    if (file.size > MAX_SIZE) {
      setIsProcessing(false);
      updateDocumentStatus(
        rawDoc.id,
        'needs_attention',
        file.name,
        formattedSize,
        `${t.documents.oversizedError} (Selected: ${formattedSize})`
      );
      return;
    }

    // 2. Type and Extension Validation
    const ext = file.name.split('.').pop()?.toLowerCase();
    const isPdf = file.type === 'application/pdf' || ext === 'pdf';
    const isImage = file.type.startsWith('image/') || ext === 'jpg' || ext === 'jpeg' || ext === 'png';

    if (!isPdf && !isImage) {
      setIsProcessing(false);
      updateDocumentStatus(
        rawDoc.id,
        'needs_attention',
        file.name,
        formattedSize,
        `${t.documents.unsupportedFormatError} (Detected: .${ext || 'unknown'})`
      );
      return;
    }

    // 3. Inspection of PDF or Image
    if (isPdf) {
      try {
        const slice = file.slice(0, 5);
        const buffer = await slice.arrayBuffer();
        const header = new TextDecoder('ascii').decode(buffer);

        if (header.startsWith('%PDF')) {
          updateDocumentStatus(
            rawDoc.id,
            'ready',
            file.name,
            formattedSize,
            `${t.documents.pdfHeaderVerified} (${formattedSize}, ${file.name})`
          );
        } else {
          updateDocumentStatus(
            rawDoc.id,
            'needs_attention',
            file.name,
            formattedSize,
            'Corrupted or non-standard PDF header. Please check that file is a valid PDF export.'
          );
        }
      } catch {
        updateDocumentStatus(
          rawDoc.id,
          'needs_attention',
          file.name,
          formattedSize,
          'Unable to read PDF structure locally.'
        );
      } finally {
        setIsProcessing(false);
      }
    } else if (isImage) {
      try {
        const objectUrl = URL.createObjectURL(file);
        const img = new Image();

        img.onload = () => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;
          URL.revokeObjectURL(objectUrl);

          if (width < 600 || height < 600) {
            updateDocumentStatus(
              rawDoc.id,
              'needs_attention',
              file.name,
              formattedSize,
              `Low resolution (${width}x${height}px) — text may appear blurred when reviewed by case verification officers.`
            );
          } else {
            updateDocumentStatus(
              rawDoc.id,
              'ready',
              file.name,
              formattedSize,
              `${t.documents.resolutionVerified} (${width}x${height}px, ${formattedSize})`
            );
          }
          setIsProcessing(false);
        };

        img.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          updateDocumentStatus(
            rawDoc.id,
            'needs_attention',
            file.name,
            formattedSize,
            'Could not decode image scan. File may be damaged.'
          );
          setIsProcessing(false);
        };

        img.src = objectUrl;
      } catch {
        setIsProcessing(false);
        updateDocumentStatus(
          rawDoc.id,
          'needs_attention',
          file.name,
          formattedSize,
          'Could not inspect image metadata.'
        );
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      inspectFile(file);
    }
  };

  const handleLoadDemoSpecimen = () => {
    updateDocumentStatus(
      rawDoc.id,
      'ready',
      `${rawDoc.category}_specimen_synthetic.pdf`,
      '420 KB',
      `Safe demo specimen loaded: Valid standard synthetic ${doc.name}. Technical format and resolution verified.`
    );
  };

  const handleRemove = () => {
    updateDocumentStatus(rawDoc.id, 'missing', undefined, undefined, undefined);
  };

  const getStatusBadge = () => {
    switch (rawDoc.status) {
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
          rawDoc.status === 'ready'
            ? 'rgba(23, 107, 77, 0.4)'
            : rawDoc.status === 'needs_attention'
            ? 'rgba(181, 91, 15, 0.5)'
            : 'var(--color-rule)',
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
        <div>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-ink-muted)' }}>
            {t.documents.categoryLabel.toUpperCase()}: {rawDoc.category}
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
      {rawDoc.fileName && (
        <div
          style={{
            backgroundColor: rawDoc.status === 'ready' ? 'var(--color-forest-light)' : 'var(--color-saffron-light)',
            padding: 'var(--space-3)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--text-xs)',
            color: rawDoc.status === 'ready' ? 'var(--color-forest-dark)' : 'var(--color-saffron-dark)',
            borderLeft: rawDoc.status === 'ready' ? '3px solid var(--color-forest)' : '3px solid var(--color-saffron)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-1)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>
              <strong>{t.documents.inspectedFileLabel}:</strong> {rawDoc.fileName} ({rawDoc.fileSize})
            </span>
            <button
              type="button"
              onClick={handleRemove}
              className="btn btn-text"
              style={{ padding: '2px 6px', fontSize: 'var(--text-xs)', color: 'var(--color-crimson)', minHeight: 'auto' }}
              title={t.documents.removeFile}
            >
              <Trash2 size={12} />
              <span>{t.documents.removeFile}</span>
            </button>
          </div>
          {rawDoc.feedback && <div>{rawDoc.feedback}</div>}
        </div>
      )}

      {/* Hidden Accessible File Input */}
      <input
        type="file"
        id={`file-input-${rawDoc.id}`}
        accept=".pdf,image/jpeg,image/png"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        data-testid={`file-input-${rawDoc.id}`}
        aria-label={`Upload file for ${doc.name}`}
      />

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          marginTop: 'auto',
          paddingTop: 'var(--space-3)',
          borderTop: '1px solid var(--color-rule-subtle)',
          flexWrap: 'wrap',
        }}
      >
        <label
          htmlFor={`file-input-${rawDoc.id}`}
          className="btn btn-secondary"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              document.getElementById(`file-input-${rawDoc.id}`)?.click();
            }
          }}
          style={{
            fontSize: 'var(--text-sm)',
            flex: 1,
            justifyContent: 'center',
            cursor: 'pointer',
            opacity: isProcessing ? 0.7 : 1,
          }}
        >
          <Upload size={14} />
          <span>{rawDoc.status === 'ready' ? t.documents.replaceFile : t.documents.selectFile}</span>
        </label>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleLoadDemoSpecimen}
          style={{ fontSize: 'var(--text-xs)', gap: '4px' }}
          title={t.documents.loadSafeDemo}
        >
          <Sparkles size={13} color="var(--color-saffron-dark)" />
          <span>{t.documents.loadSafeDemo}</span>
        </button>

        <button
          type="button"
          className="btn btn-text"
          onClick={() => setIsInspecting(!isInspecting)}
          aria-expanded={isInspecting}
          style={{ fontSize: 'var(--text-sm)' }}
        >
          <Eye size={14} />
          <span>{isInspecting ? t.documents.hideSpecimen : t.documents.specimenGuide}</span>
        </button>
      </div>

      {/* Privacy note */}
      <div style={{ fontSize: '11px', color: 'var(--color-ink-subtle)', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <ShieldCheck size={12} color="var(--color-forest)" />
        <span>{t.documents.localInspectionOnly}</span>
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
          <strong>{t.documents.specimenChecklistTitle}</strong>
          <ul style={{ paddingLeft: 'var(--space-4)', marginTop: 'var(--space-1)' }}>
            <li>{t.documents.specimenItem1}</li>
            <li>{t.documents.specimenItem2}</li>
            <li>{t.documents.specimenItem3}</li>
            <li>{t.documents.specimenItem4}</li>
          </ul>
        </div>
      )}
    </div>
  );
};
