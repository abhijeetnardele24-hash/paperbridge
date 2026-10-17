import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Evidence: React.FC = () => {
  return (
    <main id="main-content" tabIndex={-1} style={{ outline: 'none', padding: 'var(--space-10) 0' }}>
      <div className="container container-narrow" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span className="badge badge-source">Design Evidence & Case Study</span>
            <span className="badge badge-demo">Judge-Ready Verification</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
            PaperBridge: Human-Centered Design Case Study
          </h1>

          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-ink-muted)' }}>
            Public forms that explain themselves. A mobile-first, cognitively accessible interface designed for first-generation scholarship applicants.
          </p>
        </div>

        {/* 1. Problem Statement & Research Foundation */}
        <div className="paper-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            1. Problem Statement & Empirical Research Foundation
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', lineHeight: 1.6 }}>
            In digital public welfare schemes, bureaucratic terminology creates an invisible barrier. Applicants drop out not because they are unqualified, but because complex statutory wording induces high anxiety of making an irreversible error.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-paper)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-forest)' }}>
              <strong>UX4G National Scholarship Portal Case Study:</strong> Documented student friction around confusing dropdown terminology, Aadhaar linkage ambiguity, and vague certificate requirements.
            </div>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-paper)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-source-blue)' }}>
              <strong>GOV.UK Service Manual:</strong> Strongly advises one decision per page, explicit "why we ask" disclosures, and never forcing an applicant to guess.
            </div>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-paper)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-saffron)' }}>
              <strong>W3C Cognitive Accessibility (COGA):</strong> Recommends plain language defaults, dual-layer explanations, clear feedback, and no reliance on color alone.
            </div>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-paper)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-crimson)' }}>
              <strong>OECD Human-Centered Public Service Guidance:</strong> Warns against transferring bureaucratic complexity directly into digital portals.
            </div>
          </div>
        </div>

        {/* 2. Primary Personas */}
        <div className="paper-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            2. Primary Persona & User Journey
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-paper)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-rule)' }}>
              <div className="badge badge-source" style={{ marginBottom: 'var(--space-2)' }}>Primary Persona</div>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700 }}>Riya, 18, First-Generation Applicant</h3>
              <ul style={{ paddingLeft: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', marginTop: 'var(--space-2)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <li>Uses an entry-level Android phone on 3G/4G</li>
                <li>Speaks Marathi at home; intimidated by legal English</li>
                <li>Afraid one spelling discrepancy will reject her aid</li>
                <li>Needs to consult Asha (teacher / CSC operator)</li>
              </ul>
            </div>

            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-paper)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-rule)' }}>
              <div className="badge badge-demo" style={{ marginBottom: 'var(--space-2)' }}>Secondary Persona</div>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700 }}>Asha, Common Service Centre Operator</h3>
              <ul style={{ paddingLeft: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', marginTop: 'var(--space-2)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <li>Assists 30+ rural students per week</li>
                <li>Needs an instant glance at what is missing or uncertain</li>
                <li>Must respect student privacy without taking over credentials</li>
                <li>Uses limited-time QR tokens to verify specific sections</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Before vs After Journey Comparison */}
        <div className="paper-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            3. Before & After Journey Comparison
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-crimson-light)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(163, 58, 50, 0.3)' }}>
              <div style={{ fontWeight: 700, color: 'var(--color-crimson)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>
                Traditional Government Portal
              </div>
              <ul style={{ paddingLeft: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--color-ink)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <li>40-field dense grid on mobile screen</li>
                <li>Opaque statutory legal terminology</li>
                <li>Mandatory answers force guesswork</li>
                <li>Full login and OTP barriers upfront</li>
                <li>Helper must be given full password access</li>
              </ul>
            </div>

            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-forest-light)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(23, 107, 77, 0.3)' }}>
              <div style={{ fontWeight: 700, color: 'var(--color-forest-dark)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>
                PaperBridge Method
              </div>
              <ul style={{ paddingLeft: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--color-ink)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <li>One decision at a time with calm progress</li>
                <li>Dual-layer Plain Meaning ↔ Official Wording</li>
                <li>First-class "I am not sure" with zero penalty</li>
                <li>Zero account required; local client-side state</li>
                <li>Selective, expiring helper handoff packet</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Accessibility Provisions & Quality Gates */}
        <div className="paper-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            4. Accessibility Provisions (WCAG 2.2 AA)
          </h2>
          <ul style={{ paddingLeft: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <li>
              <strong>Keyboard Operability:</strong> Skip links, logical tab ordering, always-visible 2px focus rings with 2px offset.
            </li>
            <li>
              <strong>Touch Targets:</strong> Every button, checkbox, and tab control enforces a minimum 44×44px hit target.
            </li>
            <li>
              <strong>Cognitive Modes:</strong> Focus Mode (collapses secondary notes), Reading Support (1.8 line-height), Read Aloud (native SpeechSynthesis).
            </li>
            <li>
              <strong>Multilingual Foundation:</strong> Complete English, Hindi, and Marathi locale strings with responsive text expansion safety.
            </li>
            <li>
              <strong>Zero False Claims:</strong> Clearly labelled as an independent client-side preparation tool, not a government submission gateway.
            </li>
          </ul>
        </div>

        {/* 5. Production Integration Boundaries */}
        <div className="paper-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            5. What Production Integration Would Require
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', margin: 0, lineHeight: 1.6 }}>
            For real deployment in collaboration with state scholarship boards, PaperBridge would implement: (1) Standardized OpenID Connect authentication with state SSO; (2) End-to-end encrypted helper tokens with WebAuthn signatures; (3) Integration with Digilocker for consent-driven certificate fetching; and (4) Strict DPIA (Data Protection Impact Assessment) under DPDP Act 2023.
          </p>
        </div>

        {/* Navigation Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--space-4)' }}>
          <Link to="/" className="btn btn-secondary">
            <span>Back to Home</span>
          </Link>

          <Link to="/application" className="btn btn-primary">
            <span>Experience the Live Application</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
};
