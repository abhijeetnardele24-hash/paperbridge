# Technical Architecture & System Specification — PaperBridge

## Executive Overview
PaperBridge is structured as a client-side resilient Single Page Application (SPA) designed to run deterministically on low-resource mobile browsers without backend dependencies, server-side data harvesting, or cloud latency bottlenecks.

---

## 1. High-Level System Architecture & Data Flow

```mermaid
graph TD
    subgraph UI_Routes["Presentation Layer (React 19 + Accessible HTML5)"]
        R0["/ (Landing Page & Signature Preview)"]
        R1["/before-you-start (Preparation Contract)"]
        R2["/eligibility (4-Step Triage)"]
        R3["/documents (Readiness Board)"]
        R4["/application (One-Decision Dual-Layer Form)"]
        R5["/review (Grouped Review Map)"]
        R6["/handoff (Consent-Controlled Helper Share)"]
        R7["/complete (Honest Portal Handoff)"]
        R8["/evidence (Judge Evidence & Case Study)"]
    end

    subgraph Core_State["Domain State Machine (JourneyContext)"]
        SM["Reducer State Machine"]
        ANS["Answers & Uncertain Flags"]
        DOCS["Document Verification Cache"]
        ELIG["Eligibility Triage State"]
        HAND["Selective Handoff Token Engine"]
        A11Y["A11y Preferences (Focus, Speech, Contrast)"]
        LANG["Locale Dictionary (en / hi / mr)"]
    end

    subgraph Client_Persistence["Client-Side Sandbox (Zero Remote Storage)"]
        LS[("localStorage: paperbridge_journey_v1")]
        SS["Web SpeechSynthesis API (Native Voice)"]
        PR["Print Engine (@media print)"]
    end

    subgraph Release_Deploy["Deployment & CI Verification"]
        CI["GitHub Actions Workflow (Lint, Typecheck, Test, Build, Axe)"]
        DEP["Deployxa Static Site Hosting (_redirects, deployxa.json)"]
    end

    R0 --> SM
    R1 --> SM
    R2 --> SM
    R3 --> SM
    R4 --> SM
    R5 --> SM
    R6 --> SM
    R7 --> SM
    R8 --> SM

    SM --> ANS
    SM --> DOCS
    SM --> ELIG
    SM --> HAND
    SM --> A11Y
    SM --> LANG

    SM <-->|Sync & Hydrate| LS
    SM -->|Read Aloud| SS
    HAND -->|Generate Checklist| PR

    SM --> CI
    CI --> DEP
```

---

## 2. Technical Stack & Rationale

| Layer | Selected Technology | Architectural Rationale |
| :--- | :--- | :--- |
| **Framework** | React 19 + TypeScript | Strict type safety, clean component composition, and sub-millisecond DOM reactivity. |
| **Build Tool** | Vite 8 | Lightning-fast HMR and ultra-compact production bundle (<120 kB gzip). |
| **Styling** | Tokenized CSS Architecture | Avoids runtime CSS-in-JS overhead; zero dependency lock-in; immediate support for custom cognitive modes. |
| **Routing** | React Router 7 | Deterministic history management, URL query parameter state synchronization (`?q=`), and smooth scroll resets. |
| **Icons** | Lucide React | Restrained, consistent, accessible SVG iconography with zero visual clutter. |
| **Testing** | Vitest + React Testing Library + Playwright + axe-core | Fast unit reducer coverage combined with real-browser automated accessibility audits. |
| **Deployment** | Deployxa | Static hosting with SPA rewrite rules (`_redirects` and `deployxa.json`). |

---

## 3. Data Structure & State Transitions

The core state model is governed by a strictly typed reducer (`JourneyState`):

```typescript
interface JourneyState {
  locale: 'en' | 'hi' | 'mr';
  currentQuestionId: string;
  eligibilityAnswers: Record<string, string>;
  documents: Record<string, DocumentItem>;
  answers: Record<string, QuestionAnswer>;
  handoff: HandoffState;
  preferences: AccessibilityPreferences;
  lastSaved: string | null;
}
```

### Key State Machine Guards:
1. **Uncertainty Guard:** Marking a question as uncertain automatically flags `isUncertain: true`, stores the optional helper note, and adds the question to the Review Map's *"Needs Checking"* partition.
2. **Review Grouping Invariant:** Questions with non-empty values and `isUncertain === false` enter *"Complete & Ready"*. Empty mandatory questions remain in *"Missing Required Questions"*.
3. **Selective Handoff Engine:** The generated packet filters out any section not explicitly consented to by the user. Identifiers are excluded by default (`includeId === false`).
4. **Token Revocation Invariant:** Once revoked, the handoff token is permanently disabled locally (`isRevoked: true`).

---

## 4. Offline Capability & Performance Budget

- **Offline Shell:** All application routes, fonts, styles, and logic run entirely client-side once loaded.
- **Critical Path Weight:** 
  - Total production JS: ~112 kB gzipped.
  - Total production CSS: ~1.8 kB gzipped.
  - Zero external blocking scripts or telemetry beacons.
- **First Contentful Paint (FCP):** < 0.4s on representative 3G throttling.
