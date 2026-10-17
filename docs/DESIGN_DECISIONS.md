# Design Decisions & Architectural Rationales — PaperBridge

## Overview
Every interaction in PaperBridge was designed to eliminate procedural anxiety, cognitive fatigue, and administrative drop-off. This document records the architectural and design decisions, alternatives considered, accessibility impacts, and test verification methods.

---

### Decision 1: The Signature Dual-Layer Interaction (Plain Meaning ↔ Statutory Official Wording)

- **Problem Observed:** In existing statutory portals (e.g., National Scholarship Portal, state bursaries), forms present dense legalistic phrasing (e.g., *"Gross aggregate annual income of the paternal guardian from all statutory sources including agricultural rents under Clause 4(b)"*). Simplified civic tools frequently attempt to summarize this away completely using black-box AI chatbots. However, applicants and community operators distrust such summaries because when submitting official declarations, they fear they might be signing something subtly different from what the chatbot told them.
- **Design Hypothesis:** Presenting plain language and statutory official wording as two synchronized, inspectable layers of the *same* card gives applicants immediate comprehension while preserving 100% legal authority and trust.
- **Chosen Pattern:** 
  - Desktop: Side-by-side or tabbed card displaying the simplified question, evidence hints, and answer inputs alongside the verbatim official statutory clause and section reference.
  - Mobile: Accessible tabbed segment toggle (`[What this means] | [Official wording]`) that preserves focus, input state, and validation errors without page reload.
  - Source Line: A visual connecting rule showing that the plain guidance directly derives from statutory section citations.
- **Rejected Alternative:** 
  - Hover tooltips: Inaccessible on touchscreens, hidden from screen readers, fail WCAG 1.4.13 (Content on Hover or Focus).
  - Collapsible accordion below the question: Displaces input controls downward, causing cognitive disorientation.
  - AI conversational chatbot: Non-deterministic, introduces hallucination risks, slow over low-bandwidth mobile connections, and cannot be cited in legal declarations.
- **Accessibility Impact:** Satisfies WCAG 3.1.5 (Reading Level), WCAG 2.1.1 (Keyboard), and COGA Objective 1 (Help users understand what things are and how to use them).
- **How It Is Tested:** 
  - Unit tests in `src/test/PlainOfficialCard.test.tsx` verify layer switching, keyboard toggle, and source citation preservation.
  - E2E tests verify layer switching on viewports from 320px to 1920px.

---

### Decision 2: Uncertainty as a First-Class State (Zero Penalty for "I am not sure")

- **Problem Observed:** Traditional government web forms enforce binary validation: either an applicant answers a mandatory question or form submission is blocked. When a student does not know whether their father's provisional land lease qualifies under the annual income threshold, they are forced to either guess (risking penalty or rejection) or abandon the application entirely.
- **Design Hypothesis:** Treating uncertainty as an honest, acceptable status throughout the entire journey enables users to continue progressing through questions they *do* know, while clustering uncertain items for targeted helper review.
- **Chosen Pattern:** 
  - Dedicated *"I am not sure"* button on every complex question card.
  - Modal reassurance explaining that uncertainty is normal and will never disqualify the application.
  - Contextual evidence guidance (e.g., *"Look at Box 3 on your Tahsildar Income Certificate"*).
  - Optional helper notes to record specific doubts.
  - The Review Map categorizes uncertain answers into a dedicated "Needs Checking" list with direct 1-click return links.
- **Rejected Alternative:** 
  - Allowing blank submission without marking: Leads to incomplete applications being silently rejected by backend portals.
  - Halting progression with an error modal: Induces anxiety and drives drop-off.
- **Accessibility Impact:** Directly implements W3C COGA Objective 4 ("Help users avoid mistakes and recover gracefully").
- **How It Is Tested:** 
  - `src/test/JourneyContext.test.tsx` tests the reducer `SET_UNCERTAIN` transition.
  - E2E Test #4 verifies that marking a question uncertain updates the Review Map counter and allows seamless return navigation.

---

### Decision 3: "One Thing Per Page" Decision Architecture

- **Problem Observed:** Dense single-page forms containing 40+ inputs cause visual paralysis and keyboard focus chaos, particularly on mobile viewports where virtual keyboards occlude 50% of the screen.
- **Design Hypothesis:** Restricting each step to a single decision or tightly coupled question minimizes working memory load, preserves form state automatically, and provides calm step-by-step progress.
- **Chosen Pattern:** 
  - Dedicated route-based question flow (`/application?q=q_name`, etc.) with accessible numbered step pills.
  - Back button that always preserves previous answers.
  - Inline progress announcements via `aria-live` regions.
- **Rejected Alternative:** 
  - Endless scrolling wizard: Loses position on page refresh and causes disorientation when errors occur off-screen.
- **Accessibility Impact:** Aligns with GOV.UK Service Standard and WCAG 2.4.3 (Focus Order).
- **How It Is Tested:** 
  - Automated Axe accessibility audits across all step routes.
  - State persistence test verifying that navigating backwards or refreshing the browser retains all typed data.

---

### Decision 4: Visual System — Calm Notebook Aesthetic vs. Generic Tech SaaS

- **Problem Observed:** Most hackathon submissions look like generic crypto/AI SaaS dashboards (dark purple gradient backgrounds, glowing neon borders, glassmorphic blur overlays, and centered pill badges). For public service forms, this aesthetic feels untrustworthy, unreadable in sunlight, and heavy to render on entry-level mobile devices.
- **Design Hypothesis:** A calm, tactile paper aesthetic inspired by physical civic ledger books (`#F6F2EA` paper background, `#18211D` deep ink, `#176B4D` civic forest, `#B55B0F` saffron attention, `#245B8A` source blue) establishes dignity, clarity, and institutional calm.
- **Chosen Pattern:** 
  - Subdued paper-toned surfaces with subtle 1px structural rules instead of heavy drop shadows or glassy blurs.
  - Typography using Atkinson Hyperlegible (developed by the Braille Institute for maximum character differentiation) and Newsreader serif for restrained civic headings.
  - Touch targets strictly enforcing 44px minimum sizing.
  - All status indicators combining icon + color + clear label (never color alone).
- **Rejected Alternative:** 
  - Neon dark mode / Glassmorphism / Purple gradient blobs: Violates hackathon anti-slop rules, poor contrast ratios in natural light.
- **Accessibility Impact:** Exceeds WCAG 2.2 AA contrast requirements (normal text > 7:1 against background, well above the 4.5:1 requirement).
- **How It Is Tested:** 
  - Axe color contrast automated audits.
  - Manual review across high-contrast and forced-colors modes.

---

### Decision 5: Consent-Controlled Helper Handoff with Time-Limited Local Tokens

- **Problem Observed:** In rural and semi-urban communities, applicants frequently seek assistance from school teachers, cyber cafe operators, or Common Service Centre (CSC) agents. In doing so, students routinely hand over physical documents, passwords, or their entire unlocked phones, creating grave privacy and security vulnerabilities.
- **Design Hypothesis:** Giving students granular, checkbox-level control over what information is shared in a helper packet prevents unnecessary personal data exposure while providing helpers with the exact checklist of missing or uncertain items.
- **Chosen Pattern:** 
  - Interactive sharing checklist with personal identifiers (Aadhaar, Bank details) unselected by default.
  - Local token generation (`PB-2026-XXXXXX`) with 48-hour expiration.
  - Printable summary checklist formatted for black-and-white physical printing.
  - One-click local revocation: clears the active handoff state in the originating browser, but cannot remotely invalidate a packet already copied or opened elsewhere.
- **Rejected Alternative:** 
  - Unauthenticated public share link: Severe privacy violation.
  - PDF export containing full unredacted demographic details: Leaks sensitive personal identifiers.
- **Accessibility Impact:** Clear form controls, standard checkboxes with explicit labels, high-contrast print stylesheet (`@media print`).
- **How It Is Tested:** 
  - `src/test/ReviewAndHandoff.test.tsx` tests selective payload filtering and token revocation.
  - E2E Test #5 tests token creation, revocation, and UI state response.

---

### Decision 6: Client-Side-Only Storage & Non-Impersonation Boundary

- **Problem Observed:** Civic tech projects frequently mislead users by claiming to submit applications directly to government databases, risking unauthorized credential harvesting or legal liability.
- **Design Hypothesis:** PaperBridge explicitly defines its boundary as an *application preparation and cognitive support tool*, not a statutory submission gateway.
- **Chosen Pattern:** 
  - All application state is stored locally in client-side `localStorage`.
  - Zero external tracking, zero analytics beacons, zero cloud database connections.
  - Exact completion wording mandated: *"Your PaperBridge preparation is complete. Continue on the official portal."*
  - Prominent "Fictional Demo" badge and disclosure banner.
- **Rejected Alternative:** 
  - Mock "Submit to Government" button: Deceptive to users and in violation of hackathon rule constraints.
- **Accessibility Impact:** Immediate local state recovery without network latency; zero authentication barriers.
- **How It Is Tested:** 
  - E2E Test #2 asserts the exact completion copy and absence of false submission claims.
