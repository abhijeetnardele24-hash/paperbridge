export type Locale = 'en' | 'hi' | 'mr';

export type QuestionType = 'choice' | 'text' | 'date' | 'number' | 'identifier';

export interface QuestionOption {
  value: string;
  label: string;
  helper?: string;
}

export interface Question {
  id: string;
  step: number;
  totalSteps: number;
  section: string;
  field: string;
  plainQuestion: string;
  plainHelper: string;
  officialWording: string;
  officialClause: string;
  whyWeAsk: string;
  evidenceHint: string;
  type: QuestionType;
  options?: QuestionOption[];
  placeholder?: string;
  formatExample?: string;
  required?: boolean;
}

export interface DocumentItem {
  id: string;
  name: string;
  category: 'identity' | 'income' | 'enrolment' | 'bank';
  description: string;
  issuer: string;
  acceptedFormats: string;
  status: 'ready' | 'needs_attention' | 'missing';
  exampleDescription: string;
  fileName?: string;
  fileSize?: string;
  feedback?: string;
}

export interface EligibilityQuestion {
  id: string;
  step: number;
  totalSteps: number;
  question: string;
  officialRef: string;
  helper: string;
  options: Array<{
    value: string;
    label: string;
    eligible: boolean | 'maybe';
    rejectionReason?: string;
  }>;
}

export interface AccessibilityPreferences {
  focusMode: boolean;
  readingSupport: boolean;
  readAloud: boolean;
  highContrast: boolean;
}

export interface HandoffState {
  selectedSections: string[];
  includePersonalIdentifiers: boolean;
  recipientName: string;
  token: string;
  createdAt: string;
  expiresAt: string;
  isRevoked: boolean;
}

export interface JourneyState {
  locale: Locale;
  eligibilityAnswers: Record<string, string>;
  eligibilityStatus: 'not_started' | 'passed' | 'ineligible' | 'uncertain';
  answers: Record<string, { value: string; isUncertain: boolean; note?: string }>;
  documents: Record<string, DocumentItem>;
  accessibility: AccessibilityPreferences;
  handoff: HandoffState;
}
