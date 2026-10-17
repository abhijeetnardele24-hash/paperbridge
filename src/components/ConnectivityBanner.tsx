import React, { useState, useEffect } from 'react';
import { useJourney } from '../state/JourneyContext';
import { Wifi, WifiOff, ShieldCheck, Info } from 'lucide-react';

export const ConnectivityBanner: React.FC = () => {
  const { t } = useJourney();
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div
      role="region"
      aria-label="Connectivity and Offline Status"
      style={{
        backgroundColor: isOnline ? 'var(--color-paper-sunken)' : 'var(--color-saffron-light)',
        borderBottom: isOnline ? '1px solid var(--color-rule-subtle)' : '1px solid var(--color-saffron)',
        padding: 'var(--space-1) var(--space-4)',
        fontSize: 'var(--text-xs)',
        transition: 'all 0.2s ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          {isOnline ? (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: 'var(--color-forest)',
                fontWeight: 600,
              }}
            >
              <Wifi size={13} />
              <span>{t.connectivity.ready}</span>
            </span>
          ) : (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: 'var(--color-saffron-dark)',
                fontWeight: 700,
              }}
            >
              <WifiOff size={13} />
              <span>{t.connectivity.offline}</span>
            </span>
          )}

          <span style={{ color: 'var(--color-ink-muted)' }}>•</span>

          <span style={{ color: 'var(--color-ink-muted)' }}>
            {isOnline ? t.connectivity.readyDesc : t.connectivity.offlineDesc}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginLeft: 'auto' }}>
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="btn btn-text"
            style={{
              padding: '2px 6px',
              fontSize: '11px',
              color: 'var(--color-ink-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              minHeight: 'auto',
            }}
            aria-expanded={showDetails}
          >
            <Info size={11} />
            <span>Official Portal Notice</span>
          </button>
        </div>
      </div>

      {showDetails && (
        <div
          className="container"
          style={{
            padding: 'var(--space-2) 0',
            fontSize: '11px',
            color: 'var(--color-ink)',
            borderTop: '1px dashed var(--color-rule)',
            marginTop: 'var(--space-1)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}
        >
          <ShieldCheck size={13} color="var(--color-forest)" />
          <span>{t.connectivity.portalNote}</span>
        </div>
      )}
    </div>
  );
};
