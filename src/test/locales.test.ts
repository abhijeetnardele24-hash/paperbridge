import { describe, it, expect } from 'vitest';
import { LOCALES } from '../content/locales';
import { formatCurrency, formatDate, getFieldLabel, getSectionLabel, getChoiceLabel, formatFieldValue } from '../utils/formatters';
import { LOCALIZED_APP_QUESTIONS, LOCALIZED_ELIG_QUESTIONS, LOCALIZED_DOC_ITEMS } from '../content/localizedScheme';

describe('Localization Integrity and Parity Suite', () => {
  const getKeys = (obj: Record<string, unknown>, prefix = ''): string[] => {
    let keys: string[] = [];
    for (const key of Object.keys(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        keys = keys.concat(getKeys(value as Record<string, unknown>, fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    return keys;
  };

  const getNestedValue = (obj: unknown, path: string): unknown => {
    return path.split('.').reduce((acc: unknown, part: string) => {
      if (acc && typeof acc === 'object') {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, obj);
  };

  it('has identical keys in English, Hindi, and Marathi locale dictionaries', () => {
    const enKeys = getKeys(LOCALES.en).sort();
    const hiKeys = getKeys(LOCALES.hi).sort();
    const mrKeys = getKeys(LOCALES.mr).sort();

    expect(hiKeys).toEqual(enKeys);
    expect(mrKeys).toEqual(enKeys);
  });

  it('contains no empty strings or placeholder text in any locale', () => {
    const enKeys = getKeys(LOCALES.en);

    for (const key of enKeys) {
      const enVal = getNestedValue(LOCALES.en, key);
      const hiVal = getNestedValue(LOCALES.hi, key);
      const mrVal = getNestedValue(LOCALES.mr, key);

      expect(typeof enVal).toBe('string');
      expect((enVal as string).trim().length).toBeGreaterThan(0);

      expect(typeof hiVal).toBe('string');
      expect((hiVal as string).trim().length).toBeGreaterThan(0);

      expect(typeof mrVal).toBe('string');
      expect((mrVal as string).trim().length).toBeGreaterThan(0);
    }
  });

  it('provides complete scheme questions and eligibility questions across en, hi, and mr', () => {
    const appQIds = ['q_legal_name', 'q_dob', 'q_annual_income', 'q_institution_name', 'q_stream_class', 'q_bank_ifsc'];
    for (const qId of appQIds) {
      expect(LOCALIZED_APP_QUESTIONS.en[qId].plainQuestion).toBeDefined();
      expect(LOCALIZED_APP_QUESTIONS.hi[qId].plainQuestion).toBeDefined();
      expect(LOCALIZED_APP_QUESTIONS.mr[qId].plainQuestion).toBeDefined();
    }

    const eligQIds = ['el_enrolment', 'el_income', 'el_domicile', 'el_concurrent'];
    for (const qId of eligQIds) {
      expect(LOCALIZED_ELIG_QUESTIONS.en[qId].question).toBeDefined();
      expect(LOCALIZED_ELIG_QUESTIONS.hi[qId].question).toBeDefined();
      expect(LOCALIZED_ELIG_QUESTIONS.mr[qId].question).toBeDefined();
    }

    const docIds = ['doc_identity', 'doc_income', 'doc_enrolment', 'doc_bank'];
    for (const docId of docIds) {
      expect(LOCALIZED_DOC_ITEMS.en[docId].name).toBeDefined();
      expect(LOCALIZED_DOC_ITEMS.hi[docId].name).toBeDefined();
      expect(LOCALIZED_DOC_ITEMS.mr[docId].name).toBeDefined();
    }
  });

  it('translates eligibility questions and documents via localized helper functions', async () => {
    const { ELIGIBILITY_QUESTIONS, INITIAL_DOCUMENTS } = await import('../content/scheme');
    const { getLocalizedEligibilityQuestion, getLocalizedDocument } = await import('../content/localizedScheme');

    const rawEligQ = ELIGIBILITY_QUESTIONS[0];
    const hiEligQ = getLocalizedEligibilityQuestion(rawEligQ, 'hi');
    expect(hiEligQ.question).toContain('कक्षा 11');
    expect(hiEligQ.options[0].label).toContain('नामांकित');

    const mrEligQ = getLocalizedEligibilityQuestion(rawEligQ, 'mr');
    expect(mrEligQ.question).toContain('इयत्ता ११');

    const rawDoc = INITIAL_DOCUMENTS['doc_identity'];
    const hiDoc = getLocalizedDocument(rawDoc, 'hi');
    expect(hiDoc.name).toContain('पहचान');

    const mrDoc = getLocalizedDocument(rawDoc, 'mr');
    expect(mrDoc.name).toContain('ओळख');
  });

  it('formats currency correctly in Indian numbering for each locale', () => {
    const enFormatted = formatCurrency('140000', 'en');
    expect(enFormatted).toContain('1,40,000');

    const hiFormatted = formatCurrency(250000, 'hi');
    expect(hiFormatted).toBeDefined();
    expect(hiFormatted.length).toBeGreaterThan(3);

    const mrFormatted = formatCurrency('0', 'mr');
    expect(mrFormatted).toBeDefined();

    expect(formatCurrency('invalid', 'en')).toBe('invalid');
  });

  it('formats dates in a localized human-readable form', () => {
    const enDate = formatDate('2008-04-14', 'en');
    expect(enDate).toContain('2008');
    expect(enDate.toLowerCase()).toContain('april');

    const hiDate = formatDate('2008-04-14', 'hi');
    expect(hiDate).toBeDefined();

    const mrDate = formatDate('2008-04-14', 'mr');
    expect(mrDate).toBeDefined();

    expect(formatDate('invalid-date', 'en')).toBe('invalid-date');
    expect(formatDate('', 'en')).toBe('—');
  });

  it('translates internal field keys and choices into human-readable labels', () => {
    expect(getFieldLabel('legal_name', 'en')).toBe('Full Legal Name');
    expect(getFieldLabel('legal_name', 'hi')).toBe('पूर्ण कानूनी नाम');
    expect(getFieldLabel('legal_name', 'mr')).toBe('पूर्ण कायदेशीर नाव');

    expect(getSectionLabel('Personal Details', 'hi')).toBe('व्यक्तिगत विवरण');
    expect(getSectionLabel('Personal Details', 'mr')).toBe('वैयक्तिक तपशील');

    expect(getChoiceLabel('q_stream_class', 'diploma_tech', 'en')).toContain('Polytechnic');
    expect(getChoiceLabel('q_stream_class', 'diploma_tech', 'mr')).toContain('पदविका');

    expect(formatFieldValue('q_annual_income', '140000', 'en')).toContain('1,40,000');
    expect(formatFieldValue('q_dob', '2008-04-14', 'en')).toContain('2008');
    expect(formatFieldValue('q_stream_class', 'diploma_tech', 'en')).toContain('Polytechnic');
    expect(formatFieldValue('q_legal_name', 'Riya Shinde', 'en')).toBe('Riya Shinde');
    expect(formatFieldValue('q_legal_name', '', 'en')).toBe('—');
  });
});
