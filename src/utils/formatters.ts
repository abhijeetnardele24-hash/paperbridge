import type { Locale } from '../types';

export const FIELD_LABELS: Record<string, Record<Locale, string>> = {
  legal_name: {
    en: 'Full Legal Name',
    hi: 'पूर्ण कानूनी नाम',
    mr: 'पूर्ण कायदेशीर नाव',
  },
  date_of_birth: {
    en: 'Date of Birth',
    hi: 'जन्म तिथि',
    mr: 'जन्मतारीख',
  },
  annual_income: {
    en: 'Annual Family Income',
    hi: 'वार्षिक पारिवारिक आय',
    mr: 'वार्षिक कौटुंबिक उत्पन्न',
  },
  institution_name: {
    en: 'Institution Name',
    hi: 'शिक्षण संस्थान का नाम',
    mr: 'शिक्षण संस्थेचे नाव',
  },
  academic_stream: {
    en: 'Academic Course / Stream',
    hi: 'शैक्षणिक शाखा / पाठ्यक्रम',
    mr: 'शैक्षणिक शाखा / अभ्यासक्रम',
  },
  bank_ifsc: {
    en: 'Bank Branch IFSC Code',
    hi: 'बैंक शाखा आईएफएससी कोड',
    mr: 'बँक शाखा आयएफएससी कोड',
  },
};

export const SECTION_LABELS: Record<string, Record<Locale, string>> = {
  'Personal Details': {
    en: 'Personal Details',
    hi: 'व्यक्तिगत विवरण',
    mr: 'वैयक्तिक तपशील',
  },
  'Family Financial Context': {
    en: 'Family Financial Context',
    hi: 'पारिवारिक वित्तीय स्थिति',
    mr: 'कौटुंबिक आर्थिक माहिती',
  },
  'Academic Details': {
    en: 'Academic Details',
    hi: 'शैक्षणिक विवरण',
    mr: 'शैक्षणिक तपशील',
  },
  'Direct Benefit Transfer (DBT)': {
    en: 'Direct Benefit Transfer (DBT)',
    hi: 'प्रत्यक्ष लाभ अंतरण (डीबीटी)',
    mr: 'थेट लाभ हस्तांतरण (डीबीटी)',
  },
};

export const CHOICE_LABELS: Record<string, Record<string, Record<Locale, string>>> = {
  q_stream_class: {
    science: {
      en: 'Class 11 / 12 — Science Stream (PCM / PCB)',
      hi: 'कक्षा 11 / 12 — विज्ञान संकाय (पीसीएम / पीसीबी)',
      mr: 'इयत्ता ११ / १२ — विज्ञान शाखा (पीसीएम / पीसीबी)',
    },
    commerce: {
      en: 'Class 11 / 12 — Commerce Stream',
      hi: 'कक्षा 11 / 12 — वाणिज्य संकाय',
      mr: 'इयत्ता ११ / १२ — वाणिज्य शाखा',
    },
    arts: {
      en: 'Class 11 / 12 — Arts / Humanities',
      hi: 'कक्षा 11 / 12 — कला संकाय / मानविकी',
      mr: 'इयत्ता ११ / १२ — कला / मानविकी शाखा',
    },
    diploma_tech: {
      en: 'Polytechnic Diploma in Engineering / Technology',
      hi: 'पॉलिटेक्निक डिप्लोमा (इंजीनियरिंग / प्रौद्योगिकी)',
      mr: 'अभियांत्रिकी व तंत्रज्ञान पदविका (पॉलिटेक्निक)',
    },
    vocational: {
      en: 'Vocational / ITI Certificate Course',
      hi: 'व्यावसायिक / आईटीआई प्रमाणपत्र पाठ्यक्रम',
      mr: 'व्यावसायिक / आयटीआय प्रमाणपत्र अभ्यासक्रम',
    },
  },
};

export const formatCurrency = (amount: string | number, locale: Locale): string => {
  const numeric = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.]/g, '')) : amount;
  if (isNaN(numeric)) return String(amount || '—');

  const intlLocale = locale === 'hi' ? 'hi-IN' : locale === 'mr' ? 'mr-IN' : 'en-IN';
  try {
    return new Intl.NumberFormat(intlLocale, {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(numeric);
  } catch {
    return `₹${numeric.toLocaleString()}`;
  }
};

export const formatDate = (dateString: string, locale: Locale): string => {
  if (!dateString || !dateString.includes('-')) return dateString || '—';
  const [year, month, day] = dateString.split('-').map(Number);
  if (!year || !month || !day) return dateString;

  const date = new Date(year, month - 1, day);
  if (isNaN(date.getTime())) return dateString;

  const intlLocale = locale === 'hi' ? 'hi-IN' : locale === 'mr' ? 'mr-IN' : 'en-IN';
  try {
    return new Intl.DateTimeFormat(intlLocale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return `${day}/${month}/${year}`;
  }
};

export const getFieldLabel = (fieldKey: string, locale: Locale): string => {
  return FIELD_LABELS[fieldKey]?.[locale] || FIELD_LABELS[fieldKey]?.en || fieldKey.replace(/_/g, ' ');
};

export const getSectionLabel = (sectionKey: string, locale: Locale): string => {
  return SECTION_LABELS[sectionKey]?.[locale] || SECTION_LABELS[sectionKey]?.en || sectionKey;
};

export const getChoiceLabel = (questionId: string, value: string, locale: Locale): string => {
  return CHOICE_LABELS[questionId]?.[value]?.[locale] || CHOICE_LABELS[questionId]?.[value]?.en || value;
};

export const formatFieldValue = (questionId: string, value: string, locale: Locale): string => {
  if (!value || !value.trim()) return '—';
  if (questionId === 'q_annual_income') {
    return formatCurrency(value, locale);
  }
  if (questionId === 'q_dob') {
    return formatDate(value, locale);
  }
  if (questionId === 'q_stream_class') {
    return getChoiceLabel(questionId, value, locale);
  }
  return value;
};
