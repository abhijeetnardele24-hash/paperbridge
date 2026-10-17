import type { DocumentItem, EligibilityQuestion, Question } from '../types';

export const SCHEME_METADATA = {
  name: 'BrightSteps Student Support Grant',
  academicYear: '2026–2027',
  disclaimer: 'Fictional demonstration scheme for Hyperbloom UI/UX evaluation. Not a government portal.',
  officialIssuer: 'BrightSteps Foundation for Accessible Education (Fictional)',
  expectedTimeMinutes: 12,
  offlineCapable: true,
};

export const ELIGIBILITY_QUESTIONS: EligibilityQuestion[] = [
  {
    id: 'el_enrolment',
    step: 1,
    totalSteps: 4,
    question: 'Are you enrolled in Class 11, 12, or an accredited diploma program for 2026–27?',
    officialRef: 'BrightSteps Guidelines § 2.1 (Academic Eligibility)',
    helper: 'You must be currently studying in a recognized government or aided school/college.',
    options: [
      { value: 'yes', label: 'Yes, I am currently enrolled', eligible: true },
      { value: 'not_yet', label: 'No, but I have received an admission offer', eligible: 'maybe' },
      { value: 'no', label: 'No, I have discontinued my studies', eligible: false, rejectionReason: 'BrightSteps Grant requires active enrolment in Class 11, 12, or a recognized diploma course.' }
    ]
  },
  {
    id: 'el_income',
    step: 2,
    totalSteps: 4,
    question: 'Is your total family annual income ₹2,50,000 or below?',
    officialRef: 'BrightSteps Guidelines § 2.2 (Financial Means Ceiling)',
    helper: 'This is the combined yearly earnings of parents or guardians from all sources.',
    options: [
      { value: 'yes', label: 'Yes, family income is ₹2,50,000 or less', eligible: true },
      { value: 'unsure', label: 'I am not sure of the exact amount on the certificate', eligible: 'maybe' },
      { value: 'no', label: 'No, our family income exceeds ₹2,50,000', eligible: false, rejectionReason: 'The scheme budget is reserved for families with annual income up to ₹2.5 Lakhs.' }
    ]
  },
  {
    id: 'el_domicile',
    step: 3,
    totalSteps: 4,
    question: 'Are you an Indian resident residing in Maharashtra or neighbouring districts?',
    officialRef: 'BrightSteps Guidelines § 2.3 (Jurisdiction Rule)',
    helper: 'This demonstration focuses on the Western regional education board area.',
    options: [
      { value: 'yes', label: 'Yes, I reside in Maharashtra', eligible: true },
      { value: 'other_state', label: 'I reside in another state of India', eligible: 'maybe' },
      { value: 'no', label: 'No, living outside India', eligible: false, rejectionReason: 'Grant is restricted to domestic students studying within Indian state jurisdictions.' }
    ]
  },
  {
    id: 'el_concurrent',
    step: 4,
    totalSteps: 4,
    question: 'Are you already receiving another full-tuition scholarship for this year?',
    officialRef: 'BrightSteps Guidelines § 2.4 (Non-Duplication Provision)',
    helper: 'Minor books/travel aid is allowed, but double full-tuition claims are not.',
    options: [
      { value: 'no', label: 'No, I am not receiving full tuition aid', eligible: true },
      { value: 'partial', label: 'I receive minor travel or book stipend only', eligible: true },
      { value: 'yes', label: 'Yes, I have full tuition covered by another scholarship', eligible: false, rejectionReason: 'Government guidelines prevent dual full-fee scholarship reimbursements.' }
    ]
  }
];

export const INITIAL_DOCUMENTS: Record<string, DocumentItem> = {
  doc_identity: {
    id: 'doc_identity',
    name: 'Identity Verification Card',
    category: 'identity',
    description: 'Any government-approved photo ID with your name and photo clearly legible.',
    issuer: 'UIDAI, State Election Commission, or Head of Recognized Institution',
    acceptedFormats: 'Synthetic PDF or JPEG/PNG under 2MB',
    status: 'ready',
    exampleDescription: 'Clear rectangle showing photograph, full name, and birth year. No blurred corners.',
    fileName: 'student_photo_id_synthetic.jpg',
    fileSize: '420 KB',
    feedback: 'Photo verified legible, corners aligned, synthetic sample recognized.'
  },
  doc_income: {
    id: 'doc_income',
    name: 'Family Income Certificate',
    category: 'income',
    description: 'Annual family income certificate issued for the current financial year (2025–26 or 2026–27).',
    issuer: 'Tehsildar, Sub-Divisional Magistrate (SDM), or Competent Revenue Authority',
    acceptedFormats: 'Official revenue document scan (PDF/JPEG)',
    status: 'needs_attention',
    exampleDescription: 'Look for the official revenue seal and the barcoded certificate number at top-right.',
    fileName: 'revenue_income_cert_synthetic.pdf',
    fileSize: '890 KB',
    feedback: 'Issue date is valid. Please double-check that the seal is not cut off at the bottom margin.'
  },
  doc_enrolment: {
    id: 'doc_enrolment',
    name: 'Current School Bonafide Certificate',
    category: 'enrolment',
    description: 'Letter signed by your College Principal or School Headmaster confirming active enrolment.',
    issuer: 'Headmaster / Principal of Registered Junior College or Polytechnic',
    acceptedFormats: 'Institutional letterhead with stamp and registration number',
    status: 'ready',
    exampleDescription: 'Contains your Class/Standard, Roll Number, and Principal signature with institutional stamp.',
    fileName: 'bonafide_letter_synthetic.pdf',
    fileSize: '310 KB',
    feedback: 'College stamp and current academic year (2026-27) clearly visible.'
  },
  doc_bank: {
    id: 'doc_bank',
    name: 'Student Bank Account Proof',
    category: 'bank',
    description: 'First page of student passbook or recent bank statement showing Account Number and IFSC Code.',
    issuer: 'Any Nationalised, Scheduled Commercial, or Post Office Savings Bank',
    acceptedFormats: 'Bank passbook front page or official PDF statement',
    status: 'missing',
    exampleDescription: 'Must display the student name as primary account holder and the 11-character IFSC code.',
    feedback: 'Not yet attached. You will need your bank passbook before submitting to the official portal.'
  }
};

export const APPLICATION_QUESTIONS: Question[] = [
  {
    id: 'q_legal_name',
    step: 1,
    totalSteps: 6,
    section: 'Personal Details',
    field: 'legal_name',
    plainQuestion: 'What is your full legal name?',
    plainHelper: 'Enter your name exactly as written on your Class 10 marksheet or school certificate.',
    officialWording: 'The candidate nomenclature must strictly correspond with the matriculation certificate ledger without colloquial abbreviations or uncertified honorific titles.',
    officialClause: 'BrightSteps Guidelines § 3.1(a) — Nominate Authentication',
    whyWeAsk: 'The scholarship payment is linked directly to your school record and cannot be processed if spelling differs.',
    evidenceHint: 'Look at Line 1 of your Class 10 marksheet or institutional bonafide letter.',
    type: 'text',
    placeholder: 'e.g. Riya Santosh Shinde',
    formatExample: 'First Name  Father/Middle Name  Last Name',
    required: true
  },
  {
    id: 'q_dob',
    step: 2,
    totalSteps: 6,
    section: 'Personal Details',
    field: 'date_of_birth',
    plainQuestion: 'What is your date of birth?',
    plainHelper: 'You should be between 16 and 22 years of age as of June 1, 2026.',
    officialWording: 'Verification of chronological nativity pursuant to statutory age criteria (16 to 22 completed solar years at commencement of instructional term).',
    officialClause: 'BrightSteps Guidelines § 3.1(c) — Statutory Age Verification',
    whyWeAsk: 'State grant allocations are age-bracketed to support secondary and diploma completion.',
    evidenceHint: 'Check the Date of Birth printed on your school leaving certificate or identity document.',
    type: 'date',
    formatExample: 'DD / MM / YYYY',
    required: true
  },
  {
    id: 'q_annual_income',
    step: 3,
    totalSteps: 6,
    section: 'Family Financial Context',
    field: 'annual_income',
    plainQuestion: 'What is your family\'s total annual income in Rupees?',
    plainHelper: 'Enter the exact amount stated on your official Income Certificate from the Tehsildar office.',
    officialWording: 'The aggregate gross pecuniary emoluments accrued by all custodial constituents from agrarian, mercantile, or salaried activities across the preceding fiscal cycle.',
    officialClause: 'BrightSteps Guidelines § 3.2(b) — Pecuniary Means Threshold',
    whyWeAsk: 'Grants are prioritized for students from lower-income households. The official portal checks this against the revenue database.',
    evidenceHint: 'Look at the highlighted box marked "Gross Annual Family Income" on your Tehsildar certificate.',
    type: 'number',
    placeholder: 'e.g. 120000',
    formatExample: 'Figures only (e.g. 120000 for ₹1,20,000)',
    required: true
  },
  {
    id: 'q_institution_name',
    step: 4,
    totalSteps: 6,
    section: 'Academic Details',
    field: 'institution_name',
    plainQuestion: 'Which school, junior college, or polytechnic are you attending?',
    plainHelper: 'Write the complete official name of your current institution.',
    officialWording: 'Designation of the recognized educational establishment conforming to the State Board of Secondary and Higher Secondary Education or Department of Technical Education.',
    officialClause: 'BrightSteps Guidelines § 3.3(a) — Educational Institutional Registry',
    whyWeAsk: 'Scholarship fees are calculated based on the official tuition fee structure of your specific college.',
    evidenceHint: 'Check the letterhead stamp on your Bonafide Certificate.',
    type: 'text',
    placeholder: 'e.g. Government Polytechnic College, Pune',
    required: true
  },
  {
    id: 'q_stream_class',
    step: 5,
    totalSteps: 6,
    section: 'Academic Details',
    field: 'academic_stream',
    plainQuestion: 'What course or stream are you currently studying?',
    plainHelper: 'Select the primary branch of your higher secondary or technical course.',
    officialWording: 'Classification of curriculum cohort under sanctioned vocational, technical, or general stream frameworks.',
    officialClause: 'BrightSteps Guidelines § 3.3(c) — Curricular Stream Category',
    whyWeAsk: 'Different streams (e.g. Science vs Arts vs Technical Diploma) have different grant allowances for books and lab equipment.',
    evidenceHint: 'Look at your admission receipt or college ID card.',
    type: 'choice',
    options: [
      { value: 'science', label: 'Class 11 / 12 — Science Stream (PCM / PCB)' },
      { value: 'commerce', label: 'Class 11 / 12 — Commerce Stream' },
      { value: 'arts', label: 'Class 11 / 12 — Arts / Humanities' },
      { value: 'diploma_tech', label: 'Polytechnic Diploma in Engineering / Technology' },
      { value: 'vocational', label: 'Vocational / ITI Certificate Course' }
    ],
    required: true
  },
  {
    id: 'q_bank_ifsc',
    step: 6,
    totalSteps: 6,
    section: 'Direct Benefit Transfer (DBT)',
    field: 'bank_ifsc',
    plainQuestion: 'What is the 11-character IFSC Code of your bank branch?',
    plainHelper: 'The IFSC code tells the payment system exactly which bank branch holds your savings account.',
    officialWording: 'Eleven-character alphanumeric code structured as four alpha characters, one zero, and six branch characters representing the recipient financial institution routing node.',
    officialClause: 'BrightSteps Guidelines § 3.4(d) — Electronic Fund Clearance Protocol',
    whyWeAsk: 'Government scholarship funds are deposited directly to your personal bank account via Direct Benefit Transfer.',
    evidenceHint: 'Look at the top or bottom of your bank passbook page 1. It usually starts with 4 letters (e.g. SBIN0001234 or MAHB0000456).',
    type: 'identifier',
    placeholder: 'e.g. SBIN0001234',
    formatExample: '4 Letters + 0 + 6 Numbers/Letters',
    required: true
  }
];
