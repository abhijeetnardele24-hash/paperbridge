# Devpost Project Submission Copy — PaperBridge

## Project Title
**PaperBridge**

## Tagline / Elevator Pitch
**Public forms that explain themselves — a consent-first, cognitively accessible interface that turns intimidating scholarship applications into a source-linked, one-decision-at-a-time journey without hiding the official wording.**

---

## Inspiration
Every academic admission cycle in India, hundreds of thousands of deserving students miss out on state and national scholarships. The failure mode is rarely lack of genuine eligibility; it is procedural intimidation. 

Statutory application portals are built around the internal structure of government bureaucracies rather than the mental model of an 18-year-old first-generation applicant. An applicant is confronted with 40-field dense grids, penal declarations, and legal jargon such as *"Gross aggregate annual income of the paternal guardian from all statutory sources including agricultural rents under Clause 4(b)"*.

When applicants don't understand what is asked, current digital systems offer two bad options:
1. **Forced Guesswork:** Portals mandate binary choices, turning uncertainty into perjury anxiety or silent disqualification.
2. **Total Surrender of Privacy:** Students hand over their unlocked phones, passwords, and original documents to commercial cyber-café operators just to complete basic forms.

We built PaperBridge to restore sovereignty, clarity, and dignity to public service navigation.

---

## What It Does
PaperBridge does not attempt to replace official government portals or decide legal eligibility. Instead, it acts as an intelligent, dignified **application preparation and cognitive support bridge**:

1. **The Signature Dual-Layer Card (Plain Meaning ↔ Official Statutory Wording):**
   Every complex question features two synchronized, inspectable layers:
   - **What this means:** Simple language, contextual examples, and intuitive input controls.
   - **Official wording:** The exact statutory clause citation, legal reference, and explanation of why the department requires this data.
   - A visual source line confirms that the simplified guidance is directly anchored to law, not invented by a black-box model.
2. **Uncertainty as a First-Class State (Zero Penalties):**
   Applicants can click *"I am not sure"* at any point without being penalized or blocked. The system provides immediate evidence guidance (e.g., *"Look at Box 3 on your Tahsildar Income Certificate"*) and clusters uncertain items on a visual Review Map for helper review.
3. **Document Readiness Board:**
   Interactive synthetic cards guide students through required identity, income, enrolment, and bank documents with clear visual specimen checklists before they type answers.
4. **Consent-Controlled Helper Handoff:**
   Students can share selected sections with teachers or village operators via a time-limited local token (`PB-2026-XXXXXX`) and QR code. Sensitive personal identifiers are unselected by default. The active token can be revoked locally with one click, although revocation cannot recall a payload that a recipient has already copied.
5. **Cognitive Accessibility by Design:**
   Includes dedicated Focus Mode (hides collateral metadata), Reading Support (optimized line length and spacing), Native Read Aloud (browser-based speech synthesis without cloud latency), and High Contrast mode.

---

## How It Was Built
- **Core Architecture:** React 19 + TypeScript + Vite 8 Single Page Application.
- **Styling Architecture:** Custom tokenized CSS design system inspired by tactile physical civic notebooks (`#F6F2EA` paper, `#18211D` deep ink, `#176B4D` civic forest, `#8A4204` saffron attention, `#245B8A` source blue).
- **State Management:** Typed deterministic reducer (`JourneyState`) with local browser persistence (`localStorage: paperbridge_journey_v1`).
- **Multilingual Support:** Complete localization dictionaries for English, हिन्दी (Hindi), and मराठी (Marathi).
- **Accessibility & Quality Testing:**
  - 16 Vitest unit and component tests verifying state reducers, document feedback, and handoff token generation.
  - 9 automated Playwright E2E tests validating keyboard navigation, responsive viewports (320px to 1920px), zero horizontal overflow, and full automated `@axe-core/playwright` WCAG 2.2 AA audits.
- **Deployment:** Deployxa static site hosting with client-side SPA routing (`_redirects` and `deployxa.json`).

---

## Challenges We Overcame
1. **Preserving Legal Authority while Simplifying:** The hardest UX challenge was preventing simplification from becoming misleading. We resolved this through our signature dual-layer card, allowing users to toggle or view both layers side-by-side with statutory clause citations.
2. **Contrast on Warm Paper Palettes:** Public-service interfaces must feel warm and welcoming without sacrificing accessibility. We rigorously calibrated our palette to ensure every text element exceeds WCAG 2.2 AA (achieving > 14:1 for primary text and > 6.6:1 for warning badges).
3. **Responsive Reflow down to 320px:** Ensuring multi-column cards reflow smoothly without horizontal scrolling on budget Android devices required fine-grained CSS grid constraints (`minmax(min(100%, 250px), 1fr)`).

---

## Accomplishments We're Proud Of
- Achieving **0 axe-core accessibility violations** across all 9 primary routes.
- Designing an interaction model where uncertainty is treated as valid information rather than a validation error.
- Delivering a production application shell (491.87 kB main chunk / 140.92 kB gzip) that runs completely offline with self-hosted fonts and zero trackers.

---

## What We Learned
- Accessibility is not an afterthought or a compliance checklist; cognitive accessibility (W3C COGA) fundamentally drives superior interaction design for everyone.
- Civic tools build deeper trust when they maintain clear boundaries: PaperBridge explicitly tells users it is a preparation tool and directs them to the official portal for submission.

---

## What's Next for PaperBridge
- Expanding the fictional scheme framework to support multi-scheme comparison.
- Partnering with educational non-profits and CSC operators to run structured usability field trials with rural student cohorts.

---

## Built With
- `react` (v19)
- `typescript` (v5.6)
- `vite` (v8)
- `react-router-dom` (v7)
- `lucide-react`
- `vitest`
- `@playwright/test`
- `@axe-core/playwright`
- `deployxa`

---

## AI Disclosure
In compliance with hackathon rules: Generative AI coding assistance was utilized during project development for code generation, test scaffolding, and research synthesis. All architecture, user flows, content schemas, visual design tokens, and verification tests were designed, reviewed, and audited to ensure 100% adherence to project standards.

---

## Image Captions & Media Assets
1. **Landing Page:** Hero section featuring the signature dual-layer preview, three honest promises, and language selector.
2. **Document Readiness Board:** Four synthetic document cards with specimen checklists and simulated local inspection feedback.
3. **One-Decision Application:** Step-by-step form interface demonstrating the Plain Meaning ↔ Official Wording layer toggle.
4. **Uncertainty Modal:** Reassuring dialog explaining that uncertainty is normal, providing evidence hints and helper notes.
5. **Review Map:** Tri-partitioned overview grouping items into Complete, Needs Checking, and Missing Required Questions.
6. **Consent-Controlled Helper Handoff:** Selective permission checklist, expiring token generation (`PB-2026-XXXXXX`), and local revocation action.
