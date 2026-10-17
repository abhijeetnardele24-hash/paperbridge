import React, { useEffect, useRef } from 'react';
import { useJourney } from '../state/JourneyContext';
import { X, Eye, BookOpen, Volume2, Contrast, RotateCcw } from 'lucide-react';

interface AccessibilityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilityDrawer: React.FC<AccessibilityDrawerProps> = ({ isOpen, onClose }) => {
  const { state, updateAccessibility, resetDemo, t } = useJourney();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      closeBtnRef.current?.focus();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleReset = () => {
    if (window.confirm(t.nav.resetConfirm)) {
      resetDemo();
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-drawer-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(24, 33, 29, 0.45)',
        backdropFilter: 'blur(2px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={drawerRef}
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100%',
          backgroundColor: 'var(--color-paper-elevated)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid var(--color-rule)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: 'var(--space-4) var(--space-6)',
            borderBottom: '1px solid var(--color-rule)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2
            id="accessibility-drawer-title"
            style={{
              fontSize: 'var(--text-lg)',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
            }}
          >
            {t.accessibility.drawerTitle}
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            aria-label={t.accessibility.close}
            style={{ minHeight: '36px', minWidth: '36px', padding: '6px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Preferences List */}
        <div
          style={{
            padding: 'var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          {/* Focus Mode */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <Eye size={20} color="var(--color-forest)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <label
                  htmlFor="pref-focus"
                  style={{ fontWeight: 600, fontSize: 'var(--text-base)', cursor: 'pointer', display: 'block' }}
                >
                  {t.accessibility.focusMode}
                </label>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', marginTop: '2px' }}>
                  {t.accessibility.focusModeDesc}
                </p>
              </div>
            </div>
            <input
              id="pref-focus"
              type="checkbox"
              checked={state.accessibility.focusMode}
              onChange={(e) => updateAccessibility({ focusMode: e.target.checked })}
              style={{ width: '20px', height: '20px', accentColor: 'var(--color-forest)', cursor: 'pointer' }}
            />
          </div>

          {/* Reading Support */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <BookOpen size={20} color="var(--color-forest)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <label
                  htmlFor="pref-reading"
                  style={{ fontWeight: 600, fontSize: 'var(--text-base)', cursor: 'pointer', display: 'block' }}
                >
                  {t.accessibility.readingSupport}
                </label>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', marginTop: '2px' }}>
                  {t.accessibility.readingSupportDesc}
                </p>
              </div>
            </div>
            <input
              id="pref-reading"
              type="checkbox"
              checked={state.accessibility.readingSupport}
              onChange={(e) => updateAccessibility({ readingSupport: e.target.checked })}
              style={{ width: '20px', height: '20px', accentColor: 'var(--color-forest)', cursor: 'pointer' }}
            />
          </div>

          {/* Read Aloud */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <Volume2 size={20} color="var(--color-forest)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <label
                  htmlFor="pref-speech"
                  style={{ fontWeight: 600, fontSize: 'var(--text-base)', cursor: 'pointer', display: 'block' }}
                >
                  {t.accessibility.readAloud}
                </label>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', marginTop: '2px' }}>
                  {t.accessibility.readAloudDesc}
                </p>
              </div>
            </div>
            <input
              id="pref-speech"
              type="checkbox"
              checked={state.accessibility.readAloud}
              onChange={(e) => updateAccessibility({ readAloud: e.target.checked })}
              style={{ width: '20px', height: '20px', accentColor: 'var(--color-forest)', cursor: 'pointer' }}
            />
          </div>

          {/* High Contrast */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <Contrast size={20} color="var(--color-forest)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <label
                  htmlFor="pref-contrast"
                  style={{ fontWeight: 600, fontSize: 'var(--text-base)', cursor: 'pointer', display: 'block' }}
                >
                  {t.accessibility.highContrast}
                </label>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', marginTop: '2px' }}>
                  {t.accessibility.highContrastDesc}
                </p>
              </div>
            </div>
            <input
              id="pref-contrast"
              type="checkbox"
              checked={state.accessibility.highContrast}
              onChange={(e) => updateAccessibility({ highContrast: e.target.checked })}
              style={{ width: '20px', height: '20px', accentColor: 'var(--color-forest)', cursor: 'pointer' }}
            />
          </div>

          {/* Reset Demo Progress */}
          <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--color-rule)' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
              style={{ width: '100%', justifyContent: 'center', borderColor: 'var(--color-crimson)', color: 'var(--color-crimson)' }}
            >
              <RotateCcw size={16} />
              {t.nav.resetDemo}
            </button>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', marginTop: 'var(--space-2)', textAlign: 'center' }}>
              Clears localStorage and resets synthetic demo state.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
