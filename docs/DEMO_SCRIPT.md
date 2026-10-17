# 90-Second Demonstration Video Script — PaperBridge

## Video Specifications
- **Title:** PaperBridge — Public forms that explain themselves
- **Target Duration:** Exactly 90 seconds (1 minute 30 seconds)
- **Voiceover Tone:** Calm, empathetic, articulate, authoritative
- **Visual Style:** Screen capture at 1080p, 60fps, clean cursor without distracting zoom effects, real browser UI

---

### Shot 1: The Problem — Administrative Exclusion (0:00 – 0:10)
- **Visual:** Split-screen or zoom-in showing a typical confusing, dense 40-field statutory scholarship application with tiny text and bureaucratic clauses.
- **Voiceover:**
  > *"Every year, eligible first-generation students lose out on life-changing scholarships—not because they don't qualify, but because official forms read like penal legal documents."*
- **Action:** Mouse hovers over dense legal jargon, highlighting procedural intimidation.

---

### Shot 2: Trust-First Entry & Preparation Contract (0:10 – 0:25)
- **Visual:** Transition to PaperBridge landing page (`/`). The calm notebook aesthetic (`#F6F2EA` paper, deep ink, civic forest) immediately greets the viewer.
- **Voiceover:**
  > *"Meet PaperBridge. A consent-first, cognitively accessible interface that turns intimidating public forms into a one-decision-at-a-time journey. Three promises upfront: No login required, answers stay in local browser storage, and official wording is always one tap away."*
- **Action:** Click *"Start Guided Application"*, showing the Preparation Contract and Document Readiness Board with synthetic sample verification.

---

### Shot 3: The Flagship Plain Meaning ↔ Official Wording Interaction (0:25 – 0:48)
- **Visual:** The One-Decision question screen (`/application`).
- **Voiceover:**
  > *"Here is our signature interaction: every question presents two inspectable layers. On the left: what this question means in plain language, with evidence hints and clear input. On the right or via toggle: the exact statutory clause, section reference, and why the government asks for it."*
- **Action:** Cursor toggles between *"What this means"* and *"Official wording"*. Voiceover plays a short sample of the native Read Aloud feature: *"🔊 Question 1: What is your full legal name?"*

---

### Shot 4: First-Class Uncertainty & Zero Penalties (0:48 – 1:05)
- **Visual:** The applicant encounters Question 2 (Statutory Category) and clicks *"I am not sure"*.
- **Voiceover:**
  > *"What if an applicant doesn't know the exact answer? In traditional forms, they're forced to guess. In PaperBridge, uncertainty is a first-class state with zero penalties. Clicking 'I am not sure' gives contextual evidence tips and safely flags the item."*
- **Action:** Click *"Mark as uncertain and continue"*. Jump to the Review Map (`/review`) showing the item cleanly highlighted under *"Needs Checking"* with a 1-click return link.

---

### Shot 5: Consent-Controlled Helper Handoff (1:05 – 1:20)
- **Visual:** The Helper Handoff screen (`/handoff`).
- **Voiceover:**
  > *"When students need help from a teacher or CSC operator, they shouldn't have to hand over their phone or passwords. PaperBridge generates an expiring, consent-controlled helper packet. Personal identity documents are unselected by default. And students can revoke access with a single click."*
- **Action:** Check desired sections, generate synthetic local token `PB-2026-XXXXXX` with QR code, then click *"Revoke Packet Access Now"* showing immediate local revocation.

---

### Shot 6: Honest Completion & Technical Rigor (1:20 – 1:30)
- **Visual:** The Completion screen (`/complete`) showing the honest mandate: *"Your PaperBridge preparation is complete. Continue on the official portal."* Cut to terminal showing CI suite with green checks for 16 unit tests, 9 Playwright E2E tests, and 0 axe violations.
- **Voiceover:**
  > *"PaperBridge never fakes a government submission—it empowers applicants to arrive at the official portal prepared, confident, and sovereign. Fully tested, WCAG 2.2 AA compliant, and open source."*
- **Closing Card:** 
  - PaperBridge — Public forms that explain themselves.
  - Built for Hyperbloom October 2026 by Team MetaMask (Abhijeet Nardele).
