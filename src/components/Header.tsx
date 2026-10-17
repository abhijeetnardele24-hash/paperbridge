import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useJourney } from '../state/JourneyContext';
import type { Locale } from '../types';
import { SlidersHorizontal, Menu, X, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onOpenAccessibility: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAccessibility }) => {
  const { state, setLocale, t } = useJourney();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerCloseBtnRef = useRef<HTMLButtonElement>(null);

  const journeyStages = [
    { path: '/before-you-start', stepNum: 1, label: t.nav.beforeYouStart },
    { path: '/eligibility', stepNum: 2, label: t.nav.eligibility },
    { path: '/documents', stepNum: 3, label: t.nav.documents },
    { path: '/application', stepNum: 4, label: t.nav.application },
    { path: '/review', stepNum: 5, label: t.nav.review },
  ];

  const allNavItems = [
    { path: '/', label: t.nav.home },
    ...journeyStages,
    { path: '/handoff', label: t.nav.handoff },
    { path: '/evidence', label: t.nav.evidence },
  ];

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value as Locale);
  };

  // Scroll locking & keyboard dismissal for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      drawerCloseBtnRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  const closeDrawer = () => {
    setMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  // Determine current active step index (1 to 5)
  const currentStep = journeyStages.find((s) => location.pathname === s.path)?.stepNum || 0;

  return (
    <header
      role="banner"
      style={{
        backgroundColor: 'var(--color-paper-elevated)',
        borderBottom: '1px solid var(--color-rule)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Top Bar */}
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '64px',
          gap: 'var(--space-2)',
          paddingTop: 'var(--space-2)',
          paddingBottom: 'var(--space-2)',
        }}
      >
        {/* Brand & Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', minWidth: 0, flexShrink: 1 }}>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: 'var(--color-ink)',
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--color-ink)',
                whiteSpace: 'nowrap',
              }}
            >
              PaperBridge
            </span>
            <span
              className="header-brand-tagline"
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-ink-muted)',
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {t.brand.tagline}
            </span>
          </Link>

          <span
            className="badge badge-demo header-badge-demo"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}
            title="Demonstration prototype for Hyperbloom October hackathon"
          >
            <ShieldCheck size={12} />
            {t.brand.badge}
          </span>
        </div>

        {/* Desktop Stepper Navigation */}
        <nav
          role="navigation"
          aria-label="Journey Progress"
          className="desktop-stepper"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 'var(--space-1)',
          }}
        >
          {journeyStages.map((stage) => {
            const isActive = location.pathname === stage.path;
            const isCompleted = currentStep > stage.stepNum;
            return (
              <Link
                key={stage.path}
                to={stage.path}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  fontSize: 'var(--text-xs)',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-forest-dark)' : isCompleted ? 'var(--color-forest)' : 'var(--color-ink-muted)',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isActive ? 'var(--color-forest-light)' : 'transparent',
                  border: isActive ? '1px solid rgba(23, 107, 77, 0.3)' : '1px solid transparent',
                  transition: 'background-color 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: isActive ? 'var(--color-forest)' : isCompleted ? 'var(--color-forest-light)' : 'var(--color-rule)',
                    color: isActive ? '#FFFFFF' : isCompleted ? 'var(--color-forest)' : 'var(--color-ink-muted)',
                  }}
                >
                  {isCompleted ? <CheckCircle2 size={12} /> : stage.stepNum}
                </span>
                <span>{stage.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Controls: Language Selector, Accessibility Trigger, Mobile Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexShrink: 0 }}>
          <label htmlFor="language-select" className="visually-hidden" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
            Change Language
          </label>
          <select
            id="language-select"
            value={state.locale}
            onChange={handleLocaleChange}
            aria-label="Select display language"
            style={{
              padding: '4px 8px',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              backgroundColor: 'var(--color-paper)',
              color: 'var(--color-ink)',
              border: '1px solid var(--color-rule)',
              borderRadius: 'var(--radius-md)',
              minHeight: '44px',
              minWidth: '44px',
              cursor: 'pointer',
            }}
          >
            <option value="en">EN</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">मराठी</option>
          </select>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onOpenAccessibility}
            aria-label={t.accessibility.drawerTitle}
            title={t.accessibility.drawerTitle}
            style={{
              padding: '6px 10px',
              minHeight: '44px',
              minWidth: '44px',
              fontSize: 'var(--text-xs)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <SlidersHorizontal size={16} />
            <span className="accessibility-label" style={{ display: 'none' }}>
              {t.nav.accessibility}
            </span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            ref={menuButtonRef}
            type="button"
            className="btn btn-secondary mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            style={{
              padding: '6px',
              minHeight: '44px',
              minWidth: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Drawer Modal Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            backgroundColor: 'rgba(24, 33, 29, 0.6)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeDrawer();
          }}
        >
          <div
            ref={drawerRef}
            style={{
              width: '100%',
              maxWidth: '320px',
              height: '100%',
              backgroundColor: 'var(--color-paper-elevated)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              padding: 'var(--space-4)',
              gap: 'var(--space-4)',
              overflowY: 'auto',
            }}
          >
            {/* Drawer Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--color-rule)' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>
                  PaperBridge
                </span>
                <span className="badge badge-demo" style={{ marginLeft: 'var(--space-2)', fontSize: '10px' }}>
                  {t.brand.badge}
                </span>
              </div>
              <button
                ref={drawerCloseBtnRef}
                type="button"
                className="btn btn-secondary"
                onClick={closeDrawer}
                aria-label="Close menu"
                style={{ minHeight: '44px', minWidth: '44px', padding: '6px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation links */}
            <nav role="navigation" aria-label="Mobile Menu Links" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              {allNavItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeDrawer}
                    style={{
                      padding: '12px 14px',
                      fontSize: 'var(--text-sm)',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--color-forest-dark)' : 'var(--color-ink)',
                      textDecoration: 'none',
                      backgroundColor: isActive ? 'var(--color-forest-light)' : 'transparent',
                      borderRadius: 'var(--radius-md)',
                      minHeight: '44px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom note */}
            <div style={{ marginTop: 'auto', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-rule-subtle)', fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
              <p>{t.brand.tagline}</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 960px) {
          .desktop-stepper {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .accessibility-label {
            display: inline !important;
          }
        }
        @media (max-width: 640px) {
          .header-brand-tagline {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .header-badge-demo {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
