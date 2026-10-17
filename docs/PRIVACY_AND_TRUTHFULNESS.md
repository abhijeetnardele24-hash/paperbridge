# Privacy, Safety & Truthfulness Protocol — PaperBridge

## Ethical Boundary Statement
PaperBridge is an independent, student-built prototype created for the **Hyperbloom October — UI/UX and Web Design** hackathon. It is designed to demonstrate cognitive accessibility, dignity, and informed consent in public form design.

It does **not** impersonate any government authority, harvest citizen credentials, or promise statutory benefit awards.

---

## 1. Zero Cloud Data Transmission & Local Sandbox
- **Storage Scope:** All answers, document statuses, uncertainty notes, and preferences reside strictly within client-side browser memory (`localStorage` key: `paperbridge_journey_v1`).
- **Network Boundary:** Zero data packets containing applicant inputs are transmitted across the internet. There are no remote API calls, telemetry beacons, third-party trackers, or analytics scripts.
- **Local Data Reset:** Users can purge all saved answers and preferences at any time via the persistent "Reset Demo Data" button located in the footer and accessibility drawer.

---

## 2. Prohibition on Real Sensitive Identifiers
- **No Real Aadhaar / National ID Numbers:** PaperBridge never requests or stores real 12-digit Indian Aadhaar numbers, PAN cards, or biometric credentials.
- **No Real Bank Accounts:** All financial inputs use synthetic dummy numbers (e.g., IFSC: `SBIN0001234`).
- **Simulated Document Processing:** Upload and inspection buttons on the Document Readiness Board operate entirely locally via mock file-reader simulations. Real identity documents are never uploaded to any remote server or AI processing queue.

---

## 3. Truthful Demonstration Scope
- **Fictional Demonstration Scheme:** The program featured in the prototype—**"BrightSteps Student Support Grant 2026–27"**—is an original, synthetic scenario created strictly for Hyperbloom design evaluation.
- **No Official Legal Eligibility:** Completion of the PaperBridge preparation flow does **not** grant or guarantee scholarship aid. Official legal eligibility can only be determined by authorized statutory bodies.
- **No Direct Government Submission:** PaperBridge explicitly does not submit data to the National Scholarship Portal, state DBT databases, or education ministries. 
- **Exact Completion Mandate:** At the end of the journey, the interface states:
  > *"Your PaperBridge preparation is complete. Continue on the official portal."*

---

## 4. Production Readiness Requirements
If PaperBridge were to transition from a design prototype to a public service deployment, the following institutional prerequisites would be mandatory:
1. **Data Protection & Statutory Compliance:** Full compliance with the Digital Personal Data Protection Act (DPDPA 2023) and GIGW 3.0 standards.
2. **End-to-End Encryption:** Zero-knowledge client-side encryption for any helper handoff packets transmitted over networks.
3. **Formal Institutional Agreements:** Legally binding Memoranda of Understanding (MoU) with state departments of education and Common Service Centres (CSC e-Governance Services India Ltd).
4. **Third-Party Security Audits:** Formal CERT-In empaneled penetration testing and vulnerability assessments.
5. **Ethics Review:** Formal human-subjects ethics review before conducting field trials with vulnerable or first-generation student populations.

---

## 5. Verification Truthfulness & Measured Test Evidence
- All test counts reported in this repository reflect real, automated and reproducible executions:
  - **Vitest Unit & Component Suite:** **46 / 46 tests passing** with strict coverage gates enforced (Statements 86.97%, Branches 78.37%, Functions 86.08%, Lines 88.63%).
  - **Playwright Full E2E Suite:** **27 / 27 tests passing** across `accessibility.spec.ts` (including desktop header bounding-box collision checks at 1024–1920px), `documents.spec.ts`, `journey.spec.ts`, `offline.spec.ts`, and `screenshots.spec.ts`.
  - **Lighthouse 13.5.0 Audit Scores:** **Accessibility: 100/100**, **Best Practices: 100/100**, **Performance: 94/100**, **SEO: 91/100** (evaluated on production preview build).
  - **Zero Third-Party Network Requests:** Verified 0 occurrences of Google Fonts CDN (`fonts.googleapis` / `fonts.gstatic`). WOFF2 fonts are bundled locally via official `@fontsource/atkinson-hyperlegible` and `@fontsource-variable/newsreader` packages.
  - **Offline PWA Cold Navigation:** Service worker precaches 34 assets; cold reload to `/application`, `/documents`, and `/review` offline verified with 0 failed requests and 0 console errors.
  - **URL Fragment Privacy Boundary:** Handoff payloads are accepted exclusively from the URL fragment (`#token=...&p=...`) and strictly rejected from query parameters. The payload is Base64 URL-encoded for client-side transport (not cryptographically encrypted) with zero server transmission.
  - **Local Revocation Scope:** Revoking a handoff token clears the active session record in the local originating browser. It cannot remotely invalidate or delete payloads already transmitted or copied to another device.
  - **Technical Document Inspection Scope:** PaperBridge inspects file format, PDF headers (%PDF), and image dimensions locally. It does not verify legal authenticity, stamps, signatures, or scholarship eligibility.
- No usability test metrics or participant quotes have been fabricated. User testing protocols are documented in `docs/USABILITY_PROTOCOL.md` with live participant trials accurately marked as pending.
