import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AccessibilityPreferences, DocumentItem, HandoffState, JourneyState, Locale } from '../types';
import { APPLICATION_QUESTIONS, ELIGIBILITY_QUESTIONS, INITIAL_DOCUMENTS } from '../content/scheme';
import { LOCALES } from '../content/locales';

const STORAGE_KEY = 'paperbridge_journey_v1';

const DEFAULT_STATE: JourneyState = {
  locale: 'en',
  eligibilityAnswers: {},
  eligibilityStatus: 'not_started',
  answers: {
    q_legal_name: { value: 'Riya Santosh Shinde', isUncertain: false },
    q_dob: { value: '2008-04-14', isUncertain: false },
    q_annual_income: { value: '140000', isUncertain: false },
    q_institution_name: { value: 'Government Polytechnic College, Pune', isUncertain: false },
    q_stream_class: { value: 'diploma_tech', isUncertain: false },
    q_bank_ifsc: { value: 'SBIN0000455', isUncertain: true, note: 'Passbook stamp was faint; verified first 6 digits only' },
  },
  documents: INITIAL_DOCUMENTS,
  accessibility: {
    focusMode: false,
    readingSupport: false,
    readAloud: false,
    highContrast: false,
  },
  handoff: {
    selectedSections: ['Personal Details', 'Academic Details', 'Family Financial Context'],
    includePersonalIdentifiers: false,
    recipientName: '',
    token: '',
    createdAt: '',
    expiresAt: '',
    isRevoked: false,
  },
};

interface JourneyContextType {
  state: JourneyState;
  t: typeof LOCALES['en'];
  setLocale: (locale: Locale) => void;
  setEligibilityAnswer: (id: string, value: string) => void;
  setQuestionAnswer: (id: string, value: string, isUncertain?: boolean, note?: string) => void;
  markQuestionUncertain: (id: string, note?: string) => void;
  updateDocumentStatus: (
    id: string,
    status: DocumentItem['status'],
    fileName?: string,
    fileSize?: string,
    feedback?: string
  ) => void;
  updateAccessibility: (prefs: Partial<AccessibilityPreferences>) => void;
  createHandoff: (selectedSections: string[], includeIdentifiers: boolean, recipientName: string) => string;
  revokeHandoff: () => void;
  resetDemo: () => void;
  counts: {
    completed: number;
    uncertain: number;
    missing: number;
    total: number;
  };
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export const JourneyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<JourneyState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return DEFAULT_STATE;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [state]);

  // Apply cognitive accessibility modes to DOM
  useEffect(() => {
    document.documentElement.setAttribute('lang', state.locale);
    document.documentElement.setAttribute('data-reading-support', String(state.accessibility.readingSupport));
    document.documentElement.setAttribute('data-high-contrast', String(state.accessibility.highContrast));
  }, [state.locale, state.accessibility]);

  const setLocale = (locale: Locale) => {
    setState((prev) => ({ ...prev, locale }));
  };

  const setEligibilityAnswer = (id: string, value: string) => {
    setState((prev) => {
      const nextAnswers = { ...prev.eligibilityAnswers, [id]: value };
      
      // Compute status
      let hasRejection = false;
      let hasUncertain = false;
      let allAnswered = ELIGIBILITY_QUESTIONS.every((q) => nextAnswers[q.id]);

      for (const q of ELIGIBILITY_QUESTIONS) {
        const selected = q.options.find((o) => o.value === nextAnswers[q.id]);
        if (selected) {
          if (selected.eligible === false) hasRejection = true;
          if (selected.eligible === 'maybe') hasUncertain = true;
        }
      }

      let status: JourneyState['eligibilityStatus'] = 'not_started';
      if (hasRejection) {
        status = 'ineligible';
      } else if (allAnswered) {
        status = hasUncertain ? 'uncertain' : 'passed';
      } else {
        status = 'not_started';
      }

      return {
        ...prev,
        eligibilityAnswers: nextAnswers,
        eligibilityStatus: status,
      };
    });
  };

  const setQuestionAnswer = (id: string, value: string, isUncertain = false, note?: string) => {
    setState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [id]: { value, isUncertain, note },
      },
    }));
  };

  const markQuestionUncertain = (id: string, note = 'Marked by applicant as needing helper verification') => {
    setState((prev) => {
      const existing = prev.answers[id]?.value || '';
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [id]: { value: existing, isUncertain: true, note },
        },
      };
    });
  };

  const updateDocumentStatus = (
    id: string,
    status: DocumentItem['status'],
    fileName?: string,
    fileSize?: string,
    feedback?: string
  ) => {
    setState((prev) => {
      const currentDoc = prev.documents[id];
      if (!currentDoc) return prev;
      return {
        ...prev,
        documents: {
          ...prev.documents,
          [id]: {
            ...currentDoc,
            status,
            fileName: fileName || currentDoc.fileName,
            fileSize: fileSize || currentDoc.fileSize,
            feedback: feedback || currentDoc.feedback,
          },
        },
      };
    });
  };

  const updateAccessibility = (prefs: Partial<AccessibilityPreferences>) => {
    setState((prev) => ({
      ...prev,
      accessibility: {
        ...prev.accessibility,
        ...prefs,
      },
    }));
  };

  const createHandoff = (
    selectedSections: string[],
    includePersonalIdentifiers: boolean,
    recipientName: string
  ): string => {
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const token = `PB-2026-${randomHex}`;
    const now = new Date();
    const expiry = new Date(now.getTime() + 48 * 60 * 60 * 1000);

    const handoffData: HandoffState = {
      selectedSections,
      includePersonalIdentifiers,
      recipientName,
      token,
      createdAt: now.toISOString(),
      expiresAt: expiry.toISOString(),
      isRevoked: false,
    };

    setState((prev) => ({ ...prev, handoff: handoffData }));
    return token;
  };

  const revokeHandoff = () => {
    setState((prev) => ({
      ...prev,
      handoff: {
        ...prev.handoff,
        isRevoked: true,
      },
    }));
  };

  const resetDemo = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Error clearing localStorage', e);
    }
    setState(DEFAULT_STATE);
  };

  // Derive counts
  let completed = 0;
  let uncertain = 0;
  let missing = 0;

  APPLICATION_QUESTIONS.forEach((q) => {
    const a = state.answers[q.id];
    if (!a || !a.value.trim()) {
      missing++;
    } else if (a.isUncertain) {
      uncertain++;
    } else {
      completed++;
    }
  });

  const t = LOCALES[state.locale] || LOCALES.en;

  return (
    <JourneyContext.Provider
      value={{
        state,
        t,
        setLocale,
        setEligibilityAnswer,
        setQuestionAnswer,
        markQuestionUncertain,
        updateDocumentStatus,
        updateAccessibility,
        createHandoff,
        revokeHandoff,
        resetDemo,
        counts: {
          completed,
          uncertain,
          missing,
          total: APPLICATION_QUESTIONS.length,
        },
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
};

// oxlint-disable-next-line react/only-export-components
export const useJourney = () => {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return context;
};
