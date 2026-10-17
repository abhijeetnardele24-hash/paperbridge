import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useJourney } from '../state/JourneyContext';
import type { Locale } from '../types';
import { SlidersHorizontal, Menu, X, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenAccessibility: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAccessibility }) => {
  const { state, setLocale, t } = useJourney();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: t.nav.home },
    { path: '/before-you-start', label: t.nav.beforeYouStart },
    { path: '/eligibility', label: t.nav.eligibility },
    { path: '/documents', label: t.nav.documents },
    { path: '/application', label: t.nav.application },
    { path: '/review', label: t.nav.review },
    { path: '/handoff', label: t.nav.handoff },
    { path: '/evidence', label: t.nav.evidence },
  ];

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value as Locale);
  };

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
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '64px',
          gap: 'var(--space-4)',
        }}
      >
        {/* Brand & Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: 'var(--color-ink)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--color-ink)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}
            >
              PaperBridge
            </span>
            <span
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-ink-muted)',
                lineHeight: 1.2,
              }}
            >
              {t.brand.tagline}
            </span>
          </Link>

          <span
            className="badge badge-demo"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            title="Demonstration prototype for Hyperbloom October hackathon"
          >
            <ShieldCheck size={12} />
            {t.brand.badge}
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav
          role="navigation"
          aria-label="Primary Navigation"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  padding: 'var(--space-2) var(--space-3)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-forest)' : 'var(--color-ink-muted)',
                  textDecoration: 'none',
                  borderBottom: isActive ? '2px solid var(--color-forest)' : '2px solid transparent',
                  borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Controls: Language Selector & Accessibility Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <label htmlFor="language-select" className="visually-hidden" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
            Change Language
          </label>
          <select
            id="language-select"
            value={state.locale}
            onChange={handleLocaleChange}
            aria-label="Select display language"
            style={{
              padding: '6px 12px',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              backgroundColor: 'var(--color-paper)',
              color: 'var(--color-ink)',
              border: '1px solid var(--color-rule)',
              borderRadius: 'var(--radius-md)',
              minHeight: '38px',
              cursor: 'pointer',
            }}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">मराठी</option>
          </select>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onOpenAccessibility}
            aria-label={t.accessibility.drawerTitle}
            title={t.accessibility.drawerTitle}
            style={{ padding: '6px 12px', minHeight: '38px', fontSize: 'var(--text-sm)' }}
          >
            <SlidersHorizontal size={16} />
            <span style={{ display: 'none' }} className="accessibility-label">
              {t.nav.accessibility}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="btn btn-secondary mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            style={{ padding: '6px', minHeight: '38px', minWidth: '38px' }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-paper-elevated)',
            borderTop: '1px solid var(--color-rule)',
            padding: 'var(--space-4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
          }}
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: 'var(--space-3)',
                  fontSize: 'var(--text-base)',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-forest)' : 'var(--color-ink)',
                  textDecoration: 'none',
                  backgroundColor: isActive ? 'var(--color-forest-light)' : 'transparent',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .accessibility-label {
            display: inline !important;
          }
        }
      `}</style>
    </header>
  );
};
