import type { Locale } from '../types';

export interface LocaleStrings {
  brand: {
    tagline: string;
    badge: string;
  };
  nav: {
    home: string;
    beforeYouStart: string;
    eligibility: string;
    documents: string;
    application: string;
    review: string;
    handoff: string;
    evidence: string;
    accessibility: string;
    resetDemo: string;
    resetConfirm: string;
  };
  home: {
    badge: string;
    title: string;
    subtitle: string;
    promise1Title: string;
    promise1Desc: string;
    promise2Title: string;
    promise2Desc: string;
    promise3Title: string;
    promise3Desc: string;
    startCta: string;
    storyCta: string;
    fictionalNotice: string;
    previewHeading: string;
    previewSubheading: string;
  };
  dualView: {
    plainTab: string;
    officialTab: string;
    whyWeAsk: string;
    sourceClause: string;
    howUsed: string;
    evidenceHint: string;
    imNotSure: string;
    imNotSureModalTitle: string;
    imNotSureModalDesc: string;
    imNotSureResolvedAction: string;
    imNotSureReviewLater: string;
    saveIndicator: string;
    offlineIndicator: string;
  };
  documents: {
    heading: string;
    subheading: string;
    statusReady: string;
    statusNeedsAttention: string;
    statusMissing: string;
    mockUpload: string;
    whatItLooksLike: string;
    acceptedFormats: string;
    issuedBy: string;
  };
  review: {
    heading: string;
    subheading: string;
    completeSection: string;
    checkSection: string;
    missingSection: string;
    continueToHandoff: string;
    returnToQuestion: string;
    blockingWarning: string;
  };
  handoff: {
    heading: string;
    subheading: string;
    trustedHelperLabel: string;
    selectSectionsTitle: string;
    includeIdCheckbox: string;
    includeIdWarning: string;
    generateTokenAction: string;
    revokeAction: string;
    tokenLabel: string;
    expiresInLabel: string;
    qrDescription: string;
    printableChecklistCta: string;
    demonstrationNotice: string;
  };
  complete: {
    heading: string;
    subheading: string;
    nextStepsTitle: string;
    readyPortalCta: string;
    checklistTitle: string;
  };
  accessibility: {
    drawerTitle: string;
    focusMode: string;
    focusModeDesc: string;
    readingSupport: string;
    readingSupportDesc: string;
    readAloud: string;
    readAloudDesc: string;
    highContrast: string;
    highContrastDesc: string;
    close: string;
  };
}

export const LOCALES: Record<Locale, LocaleStrings> = {
  en: {
    brand: {
      tagline: 'Public forms that explain themselves.',
      badge: 'Fictional Demo',
    },
    nav: {
      home: 'Home',
      beforeYouStart: 'Before You Start',
      eligibility: 'Eligibility Check',
      documents: 'Documents Board',
      application: 'Application Flow',
      review: 'Review Map',
      handoff: 'Helper Handoff',
      evidence: 'Design Case Study',
      accessibility: 'Accessibility & Display',
      resetDemo: 'Reset Demo Data',
      resetConfirm: 'Are you sure you want to clear your demo progress? This resets all local answers.',
    },
    home: {
      badge: 'Hyperbloom UI/UX Design System',
      title: 'A scholarship form you can understand before you submit.',
      subtitle: 'PaperBridge turns intimidating public applications into one calm, source-linked decision at a time — without hiding the official wording.',
      promise1Title: 'No account required',
      promise1Desc: 'Start right away. We do not ask for login, email, or passwords.',
      promise2Title: 'Answers stay on this device',
      promise2Desc: 'All inputs remain in your browser storage. Zero data sent to remote clouds.',
      promise3Title: 'Official wording is one tap away',
      promise3Desc: 'Inspect the exact legal source clause whenever simplified text needs verification.',
      startCta: 'Start Guided Application',
      storyCta: 'See How PaperBridge Works',
      fictionalNotice: 'Demonstration Scheme: "BrightSteps Student Support Grant 2026–27" is an original, synthetic scenario created strictly for Hyperbloom design evaluation.',
      previewHeading: 'Experience the Signature Interaction',
      previewSubheading: 'Toggle between Plain Meaning and Official Wording below:',
    },
    dualView: {
      plainTab: 'What this means (Plain Language)',
      officialTab: 'Official wording (Source Clause)',
      whyWeAsk: 'Why we ask this',
      sourceClause: 'Source Regulatory Clause',
      howUsed: 'How this answer is used',
      evidenceHint: 'Where to find this in your documents',
      imNotSure: 'I am not sure',
      imNotSureModalTitle: 'Uncertainty is a normal state, not an error.',
      imNotSureModalDesc: 'You do not have to guess. We will mark this question for checking and tell your helper or teacher which specific document clarifies it.',
      imNotSureResolvedAction: 'I will check my document now',
      imNotSureReviewLater: 'Mark as uncertain and continue',
      saveIndicator: 'Saved locally on this device',
      offlineIndicator: 'Offline safe',
    },
    documents: {
      heading: 'Document Readiness Board',
      subheading: 'Inspect required documents, verify accepted synthetic formats, and check readiness before answering questions.',
      statusReady: 'Ready & Legible',
      statusNeedsAttention: 'Needs Attention',
      statusMissing: 'Missing Document',
      mockUpload: 'Mock Upload / Check Scan',
      whatItLooksLike: 'What this looks like',
      acceptedFormats: 'Accepted Format',
      issuedBy: 'Issuing Authority',
    },
    review: {
      heading: 'Review Your Prepared Answers',
      subheading: 'Check completed questions, resolve uncertainties, and ensure no required field is missing before helper handoff.',
      completeSection: 'Complete & Ready',
      checkSection: 'Needs Checking (Uncertain)',
      missingSection: 'Missing Required Questions',
      continueToHandoff: 'Continue to Helper Handoff',
      returnToQuestion: 'Inspect / Change Answer',
      blockingWarning: 'Please complete or mark remaining questions before finalizing handoff.',
    },
    handoff: {
      heading: 'Consent-Controlled Helper Handoff',
      subheading: 'Choose exactly which sections you wish to share with a trusted teacher, family member, or Common Service Centre helper.',
      trustedHelperLabel: 'Helper Name / CSC Operator ID (Optional)',
      selectSectionsTitle: 'Select sections to include in handoff packet',
      includeIdCheckbox: 'Include National Photo ID / Personal Identifiers',
      includeIdWarning: 'Identifiers are unselected by default for student privacy. Only share if your operator needs to verify identity.',
      generateTokenAction: 'Generate Expiring Handoff Packet',
      revokeAction: 'Revoke Packet Access Now',
      tokenLabel: 'Time-Limited Handoff Token',
      expiresInLabel: 'Expires in 48 hours (Synthetic Local Token)',
      qrDescription: 'Fictional local QR token for operator tablet scanner',
      printableChecklistCta: 'Print Physical Checklist & Receipt',
      demonstrationNotice: 'This handoff packet is generated entirely inside client-side browser memory. No data is broadcasted to third parties.',
    },
    complete: {
      heading: 'Your PaperBridge preparation is complete.',
      subheading: 'You have organized your documents, clarified complex questions, and created your verified preparation packet. Continue on the official portal with confidence.',
      nextStepsTitle: 'What to do next on the official portal',
      readyPortalCta: 'Continue on Official Portal (Simulated)',
      checklistTitle: 'Your Prepared Application Summary',
    },
    accessibility: {
      drawerTitle: 'Accessibility & Display Preferences',
      focusMode: 'Focus Mode',
      focusModeDesc: 'Collapses secondary explanatory notes to minimize cognitive load.',
      readingSupport: 'Reading Support',
      readingSupportDesc: 'Increases line height, letter spacing, and sets readable text widths.',
      readAloud: 'Read Aloud (Speech)',
      readAloudDesc: 'Speaks active question text using browser speech synthesis.',
      highContrast: 'High Contrast Mode',
      highContrastDesc: 'Uses pure black and white borders for maximum outdoor screen legibility.',
      close: 'Close Preferences',
    },
  },
  hi: {
    brand: {
      tagline: 'ऐसे सरकारी फॉर्म जो खुद अपनी बात समझाएं।',
      badge: 'काल्पनिक डेमो',
    },
    nav: {
      home: 'होम',
      beforeYouStart: 'शुरू करने से पहले',
      eligibility: 'पात्रता जांच',
      documents: 'दस्तावेज़ बोर्ड',
      application: 'आवेदन प्रक्रिया',
      review: 'समीक्षा नक्शा',
      handoff: 'मददगार हैंडऑफ़',
      evidence: 'केस स्टडी',
      accessibility: 'सुलभता एवं प्रदर्शन',
      resetDemo: 'डेमो रीसेट करें',
      resetConfirm: 'क्या आप वाकई अपना डेटा रीसेट करना चाहते हैं?',
    },
    home: {
      badge: 'हाइपरब्लूम यूआई/यूएक्स डिज़ाइन सिस्टम',
      title: 'छात्रवृत्ति का ऐसा फॉर्म जिसे जमा करने से पहले आप समझ सकें।',
      subtitle: 'पेपरब्रिज कठिन सरकारी फॉर्मों को सरल, स्पष्ट और आधिकारिक भाषा के साथ एक-एक करके समझाता है।',
      promise1Title: 'किसी खाते की आवश्यकता नहीं',
      promise1Desc: 'तुरंत शुरू करें। हम कोई ईमेल या पासवर्ड नहीं मांगते।',
      promise2Title: 'उत्तर आपके डिवाइस पर ही रहते हैं',
      promise2Desc: 'सारा डेटा आपके अपने ब्राउज़र में सुरक्षित रहता है।',
      promise3Title: 'आधिकारिक नियम केवल एक टैप दूर हैं',
      promise3Desc: 'जब भी आपको ज़रूरत हो, मूल नियम और सरकारी धारा सीधे देखें।',
      startCta: 'मार्गदर्शित आवेदन शुरू करें',
      storyCta: 'पेपरब्रिज कैसे काम करता है',
      fictionalNotice: 'काल्पनिक प्रदर्शन योजना: "ब्राइटस्टेप्स छात्र सहायता अनुदान" केवल डिज़ाइन मूल्यांकन के लिए बनाया गया है।',
      previewHeading: 'मुख्य विशेषता का अनुभव करें',
      previewSubheading: 'सरल भाषा और आधिकारिक नियमों के बीच टॉगल करें:',
    },
    dualView: {
      plainTab: 'सरल अर्थ (आसान भाषा)',
      officialTab: 'आधिकारिक भाषा (नियम धारा)',
      whyWeAsk: 'हम यह क्यों पूछ रहे हैं',
      sourceClause: 'आधिकारिक नियम संदर्भ',
      howUsed: 'इस उत्तर का उपयोग कैसे होगा',
      evidenceHint: 'यह जानकारी किस दस्तावेज़ में मिलेगी',
      imNotSure: 'मुझे पक्का पता नहीं है',
      imNotSureModalTitle: 'अनिश्चित होना बिल्कुल सामान्य है, यह कोई गलती नहीं है।',
      imNotSureModalDesc: 'आपको अंदाज़ा लगाने की ज़रूरत नहीं है। हम इसे जांच के लिए सुरक्षित रखेंगे।',
      imNotSureResolvedAction: 'मैं अभी अपना दस्तावेज़ जांचूंगा',
      imNotSureReviewLater: 'अनिश्चित चिह्नित करें और आगे बढ़ें',
      saveIndicator: 'स्थानीय रूप से सुरक्षित',
      offlineIndicator: 'ऑफ़लाइन सुरक्षित',
    },
    documents: {
      heading: 'दस्तावेज़ तैयारी बोर्ड',
      subheading: 'आवश्यक दस्तावेज़ों की जांच करें और आवेदन भरने से पहले अपनी तैयारी सुनिश्चित करें।',
      statusReady: 'तैयार और स्पष्ट',
      statusNeedsAttention: 'ध्यान देने योग्य',
      statusMissing: 'दस्तावेज़ उपलब्ध नहीं है',
      mockUpload: 'नमूना अपलोड / स्कैन जांच',
      whatItLooksLike: 'यह कैसा दिखता है',
      acceptedFormats: 'मान्य प्रारूप',
      issuedBy: 'जारीकर्ता प्राधिकरण',
    },
    review: {
      heading: 'अपने उत्तरों की समीक्षा करें',
      subheading: 'पूरे किए गए प्रश्नों की जांच करें और सुनिश्चित करें कि कोई आवश्यक जानकारी छूट न गई हो।',
      completeSection: 'पूर्ण और तैयार',
      checkSection: 'जांच की आवश्यकता (अनिश्चित)',
      missingSection: 'अनुपलब्ध आवश्यक प्रश्न',
      continueToHandoff: 'मददगार हैंडऑफ़ पर आगे बढ़ें',
      returnToQuestion: 'उत्तर बदलें',
      blockingWarning: 'हैंडऑफ़ पूरा करने से पहले कृपया शेष प्रश्न भरें।',
    },
    handoff: {
      heading: 'सहमति-आधारित मददगार हैंडऑफ़',
      subheading: 'चुनें कि आप अपने शिक्षक या सेवा केंद्र संचालक के साथ कौन सी जानकारी साझा करना चाहते हैं।',
      trustedHelperLabel: 'मददगार का नाम / ऑपरेटर आईडी (वैकल्पिक)',
      selectSectionsTitle: 'हैंडऑफ़ पैकेट में शामिल करने वाले अनुभाग चुनें',
      includeIdCheckbox: 'राष्ट्रीय पहचान पत्र शामिल करें',
      includeIdWarning: 'छात्र की गोपनीयता के लिए पहचान पत्र डिफ़ॉल्ट रूप से बंद है।',
      generateTokenAction: 'हैंडऑफ़ टोकन बनाएं',
      revokeAction: 'पहुंच तुरंत रद्द करें',
      tokenLabel: 'समय-सीमित हैंडऑफ़ टोकन',
      expiresInLabel: '48 घंटे में समाप्त होगा',
      qrDescription: 'स्थानीय क्यूआर कोड',
      printableChecklistCta: 'चेकलिस्ट प्रिंट करें',
      demonstrationNotice: 'यह टोकन केवल आपके डिवाइस पर बनता है।',
    },
    complete: {
      heading: 'आपकी पेपरब्रिज तैयारी पूरी हो चुकी है।',
      subheading: 'आपने अपने दस्तावेज़ व्यवस्थित कर लिए हैं और प्रश्नों को समझ लिया है। अब आत्मविश्वास के साथ आधिकारिक पोर्टल पर आगे बढ़ें।',
      nextStepsTitle: 'आधिकारिक पोर्टल पर अगला कदम',
      readyPortalCta: 'आधिकारिक पोर्टल पर जाएं (सिम्युलेटेड)',
      checklistTitle: 'आपके तैयार आवेदन का विवरण',
    },
    accessibility: {
      drawerTitle: 'सुलभता प्राथमिकताएं',
      focusMode: 'फोकस मोड',
      focusModeDesc: 'अनावश्यक नोट्स छुपाएं ताकि मुख्य प्रश्न पर ध्यान रहे।',
      readingSupport: 'पठन सहायता',
      readingSupportDesc: 'अक्षरों और पंक्तियों के बीच का अंतर बढ़ाएं।',
      readAloud: 'बोलकर सुनाएं',
      readAloudDesc: 'ब्राउज़र की आवाज़ में प्रश्न सुनें।',
      highContrast: 'उच्च कंट्रास्ट मोड',
      highContrastDesc: 'स्क्रीन पर अधिक स्पष्टता के लिए।',
      close: 'बंद करें',
    },
  },
  mr: {
    brand: {
      tagline: 'स्वतःचा अर्थ समजावून सांगणारे शासकीय अर्ज.',
      badge: 'काल्पनिक डेमो',
    },
    nav: {
      home: 'मुख्यपृष्ठ',
      beforeYouStart: 'सुरू करण्यापूर्वी',
      eligibility: 'पात्रता पडताळणी',
      documents: 'कागदपत्रे फलक',
      application: 'अर्ज प्रक्रिया',
      review: 'पुनरावलोकन नकाशा',
      handoff: 'मदतनीस हस्तांतरण',
      evidence: 'अभ्यास प्रकरण',
      accessibility: 'सुलभता आणि प्रदर्शन',
      resetDemo: 'डेमो रीसेट करा',
      resetConfirm: 'तुम्हाला तुमची सर्व माहिती रीसेट करायची आहे का?',
    },
    home: {
      badge: 'हायपरब्लूम यूआय/यूएक्स डिझाइन प्रणाली',
      title: 'सादर करण्यापूर्वी तुम्हाला समजेल असा शिष्यवृत्ती अर्ज.',
      subtitle: 'पेपरब्रिज गुंतागुंतीच्या शासकीय अर्जांना अधिकृत भाषेसह एका वेळी एका सोप्या निर्णयात रूपांतरित करतो.',
      promise1Title: 'खात्याची गरज नाही',
      promise1Desc: 'लगेच सुरू करा. आम्ही ईमेल किंवा पासवर्ड मागत नाही.',
      promise2Title: 'उत्तरे तुमच्याच डिव्हाइसवर राहतात',
      promise2Desc: 'सर्व माहिती तुमच्या फोन किंवा संगणकावर सुरक्षित राहते.',
      promise3Title: 'अधिकृत नियम फक्त एका स्पर्शावर',
      promise3Desc: 'सोपी भाषा तपासण्यासाठी मूळ कायदेशीर नियम कधीही पहा.',
      startCta: 'मार्गदर्शित अर्ज सुरू करा',
      storyCta: 'पेपरब्रिज कसे काम करते',
      fictionalNotice: 'काल्पनिक प्रात्यक्षिक योजना: "ब्राइटस्टेप्स विद्यार्थी साहाय्य अनुदान" केवळ डिझाइन मूल्यांकनासाठी तयार केले आहे.',
      previewHeading: 'वैशिष्ट्यपूर्ण संवादाचा अनुभव घ्या',
      previewSubheading: 'सोपी भाषा आणि अधिकृत नियम यामध्ये अदलाबदल करा:',
    },
    dualView: {
      plainTab: 'सोपा अर्थ (सहज भाषा)',
      officialTab: 'अधिकृत भाषा (नियम कलम)',
      whyWeAsk: 'आम्ही हे का विचारत आहोत',
      sourceClause: 'अधिकृत नियमाचा संदर्भ',
      howUsed: 'या उत्तराचा उपयोग कसा होईल',
      evidenceHint: 'ही माहिती कोणत्या कागदपत्रात सापडेल',
      imNotSure: 'मला खात्री नाही',
      imNotSureModalTitle: 'खात्री नसणे अगदी स्वाभाविक आहे, ही चूक नाही.',
      imNotSureModalDesc: 'अंदाज लावण्याची गरज नाही. आम्ही हा प्रश्न तपासणीसाठी राखून ठेवू.',
      imNotSureResolvedAction: 'मी माझे कागदपत्र आता तपासेन',
      imNotSureReviewLater: 'अनिश्चित म्हणून नोंदवा आणि पुढे चला',
      saveIndicator: 'डिव्हाइसवर सुरक्षित जतन केले',
      offlineIndicator: 'ऑफलाइन सुरक्षित',
    },
    documents: {
      heading: 'कागदपत्रे पूर्वतयारी फलक',
      subheading: 'आवश्यक कागदपत्रांची तपासणी करा आणि अर्ज भरण्यापूर्वी खात्री करून घ्या.',
      statusReady: 'तयार आणि सुवाच्य',
      statusNeedsAttention: 'लक्ष देणे आवश्यक',
      statusMissing: 'कागदपत्र उपलब्ध नाही',
      mockUpload: 'नमुना अपलोड / स्कॅन तपासणी',
      whatItLooksLike: 'हे कसे दिसते',
      acceptedFormats: 'स्वीकृत स्वरूप',
      issuedBy: 'देणारे प्राधिकरण',
    },
    review: {
      heading: 'तयार उत्तरांचे पुनरावलोकन',
      subheading: 'पूर्ण केलेले प्रश्न तपासा आणि कोणतीही माहिती बाकी नाही याची खात्री करा.',
      completeSection: 'पूर्ण आणि तयार',
      checkSection: 'तपासणी आवश्यक (अनिश्चित)',
      missingSection: 'अपूर्ण राहिलेले प्रश्न',
      continueToHandoff: 'मदतनीस हस्तांतरणाकडे जा',
      returnToQuestion: 'उत्तर बदला',
      blockingWarning: 'कृपया हस्तांतरण करण्यापूर्वी उर्वरित प्रश्न पूर्ण करा.',
    },
    handoff: {
      heading: 'संमती-आधारित मदतनीस हस्तांतरण',
      subheading: 'तुमच्या शिक्षकांसोबत किंवा सेतू केंद्र ऑपरेटरसोबत नेमकी कोणती माहिती शेअर करायची ते निवडा.',
      trustedHelperLabel: 'मदतनीसाचे नाव / सेतू ऑपरेटर आयडी (ऐच्छिक)',
      selectSectionsTitle: 'हस्तांतरण पाकिटात समाविष्ट करायचे विभाग निवडा',
      includeIdCheckbox: 'राष्ट्रीय ओळखपत्र समाविष्ट करा',
      includeIdWarning: 'विद्यार्थ्यांच्या गोपनीयतेसाठी ओळखपत्र मूळ स्वरूपात बंद ठेवले आहे.',
      generateTokenAction: 'हस्तांतरण पाकीट तयार करा',
      revokeAction: 'परवानगी त्वरित रद्द करा',
      tokenLabel: 'मुदत-मर्यादित हस्तांतरण टोकन',
      expiresInLabel: '४८ तासांत संपेल',
      qrDescription: 'स्थानिक क्यूआर कोड',
      printableChecklistCta: 'यादी मुद्रित (Print) करा',
      demonstrationNotice: 'हे टोकन पूर्णपणे तुमच्या डिव्हाइसवर तयार होते.',
    },
    complete: {
      heading: 'तुमची पेपरब्रिज पूर्वतयारी पूर्ण झाली आहे.',
      subheading: 'तुम्ही तुमची कागदपत्रे आणि प्रश्नांची उत्तरे व्यवस्थित समजून घेतली आहेत. आता आत्मविश्वासाने अधिकृत पोर्टलवर पुढे जा.',
      nextStepsTitle: 'अधिकृत पोर्टलवर पुढील पावले',
      readyPortalCta: 'अधिकृत पोर्टलवर जा (नमुना)',
      checklistTitle: 'तयार केलेल्या अर्जाचा सारांश',
    },
    accessibility: {
      drawerTitle: 'सुलभता आणि प्रदर्शन प्राधान्ये',
      focusMode: 'फोकस मोड',
      focusModeDesc: 'मुख्य प्रश्नावर लक्ष केंद्रित करण्यासाठी अतिरिक्त नोंदी लपवा.',
      readingSupport: 'वाचन साहाय्य',
      readingSupportDesc: 'ओळी आणि शब्दांमधील अंतर वाढवा.',
      readAloud: 'वाचून दाखवा',
      readAloudDesc: 'ब्राउझरच्या आवाजात प्रश्न ऐका.',
      highContrast: 'उच्च कॉन्ट्रास्ट मोड',
      highContrastDesc: 'स्क्रीनवर अधिक स्पष्टतेसाठी.',
      close: 'बंद करा',
    },
  },
};
