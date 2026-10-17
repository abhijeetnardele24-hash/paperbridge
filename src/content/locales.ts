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
  connectivity: {
    ready: string;
    readyDesc: string;
    offline: string;
    offlineDesc: string;
    portalNote: string;
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
  beforeYouStart: {
    stepBadge: string;
    badgeDemo: string;
    heading: string;
    subheading: string;
    expectedTimeLabel: string;
    expectedTimeValue: string;
    docsNeededLabel: string;
    docsNeededValue: string;
    offlineSafeLabel: string;
    offlineSafeValue: string;
    docsHeading: string;
    privacyHeading: string;
    privacyPromise1: string;
    privacyPromise2: string;
    privacyPromise3: string;
    startEligibilityCta: string;
  };
  eligibility: {
    stepBadge: string;
    triageBadge: string;
    ineligibleHeading: string;
    ineligibleDesc: string;
    ineligibleAlternative: string;
    ineligibleReconsider: string;
    passedBadge: string;
    uncertainBadge: string;
    nextAction: string;
    backAction: string;
    continueToDocuments: string;
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
    stepBadge: string;
    demoBadge: string;
    heading: string;
    subheading: string;
    statusReady: string;
    statusNeedsAttention: string;
    statusMissing: string;
    boardStatusLabel: string;
    selectFile: string;
    dragDropOrClick: string;
    loadSafeDemo: string;
    removeFile: string;
    acceptedFormats: string;
    issuedBy: string;
    whatItLooksLike: string;
    localInspectionOnly: string;
    oversizedError: string;
    unsupportedFormatError: string;
    resolutionVerified: string;
    pdfHeaderVerified: string;
    continueToApplication: string;
    backToEligibility: string;
    technicalDisclaimer: string;
    replaceFile: string;
    categoryLabel: string;
    inspectedFileLabel: string;
    specimenGuide: string;
    hideSpecimen: string;
    specimenChecklistTitle: string;
    specimenItem1: string;
    specimenItem2: string;
    specimenItem3: string;
    specimenItem4: string;
  };
  application: {
    stepBadge: string;
    questionStep: string;
    ofStep: string;
    nextQuestion: string;
    prevQuestion: string;
    reviewAnswers: string;
    requiredNote: string;
    saveNotice: string;
    answeredCount: string;
    uncertainCount: string;
    remainingCount: string;
  };
  review: {
    stepBadge: string;
    demoBadge: string;
    heading: string;
    subheading: string;
    completeSection: string;
    checkSection: string;
    missingSection: string;
    continueToHandoff: string;
    returnToQuestion: string;
    blockingWarning: string;
    editAction: string;
    currentValueLabel: string;
    noteLabel: string;
    missingNotice: string;
    uncertainNotice: string;
    needsChecking: string;
  };
  handoff: {
    stepBadge: string;
    demoBadge: string;
    heading: string;
    subheading: string;
    trustedHelperLabel: string;
    selectSectionsTitle: string;
    selectSectionsDesc: string;
    includeIdCheckbox: string;
    includeIdWarning: string;
    generateTokenAction: string;
    revokeAction: string;
    tokenLabel: string;
    expiresInLabel: string;
    qrDescription: string;
    printableChecklistCta: string;
    demonstrationNotice: string;
    packetActive: string;
    accessRevoked: string;
    openDemoRedemption: string;
    localDemoOnly: string;
  };
  complete: {
    heading: string;
    subheading: string;
    nextStepsTitle: string;
    readyPortalCta: string;
    checklistTitle: string;
    resetDemoCta: string;
    schemeOfficialLinkNote: string;
    printDossier: string;
    preparedAnswersLabel: string;
    helperVerificationsLabel: string;
    documentsInspectedLabel: string;
    remainingItemsTitle: string;
    reviewFullMap: string;
    verificationRequested: string;
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
    connectivity: {
      ready: 'Ready for offline preparation',
      readyDesc: 'All notes, document checks, and review forms run locally on your device.',
      offline: 'Currently offline — Preparation active',
      offlineDesc: 'All local preparation, document inspection, and review run locally without internet.',
      portalNote: 'Official submission portal requires active internet connectivity.',
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
    beforeYouStart: {
      stepBadge: 'Step 1 of 5: Know & Prepare',
      badgeDemo: 'Preparation Contract',
      heading: 'Before You Start: Preparation Contract',
      subheading: 'Understand what to expect, verify required documents, and review our privacy commitments before entering any data.',
      expectedTimeLabel: 'EXPECTED TIME',
      expectedTimeValue: '~12 Minutes',
      docsNeededLabel: 'DOCUMENTS NEEDED',
      docsNeededValue: '4 Key Certificates',
      offlineSafeLabel: 'OFFLINE SAFE',
      offlineSafeValue: '100% Client-Side',
      docsHeading: 'The 4 Documents You Will Need',
      privacyHeading: 'Our Three Privacy & Clarity Promises',
      privacyPromise1: 'Zero cloud tracking or remote data capture during preparation.',
      privacyPromise2: 'Everything you write or attach stays in your browser memory.',
      privacyPromise3: 'Every single simplified question links directly to its official source regulation.',
      startEligibilityCta: 'Continue to Eligibility Check',
    },
    eligibility: {
      stepBadge: 'Step 1: Eligibility Triage',
      triageBadge: 'Eligibility Triage',
      ineligibleHeading: 'This Specific Grant May Not Fit Your Current Situation',
      ineligibleDesc: 'Based on your selected answer, this demonstration scheme requires criteria that are not currently met.',
      ineligibleAlternative: 'Alternative resources and grievance support remain available through your institution or local welfare office.',
      ineligibleReconsider: 'Change this answer to re-evaluate eligibility',
      passedBadge: 'Criteria Met',
      uncertainBadge: 'Needs Review',
      nextAction: 'Next Question',
      backAction: 'Previous Question',
      continueToDocuments: 'Continue to Document Board',
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
      stepBadge: 'Step 2 of 5: Document Readiness',
      demoBadge: 'Client-Side Inspection',
      heading: 'Document Readiness Board',
      subheading: 'Inspect required documents, verify accepted formats, and check technical readiness before answering questions.',
      statusReady: 'Technically Ready',
      statusNeedsAttention: 'Needs Technical Attention',
      statusMissing: 'Not Added',
      boardStatusLabel: 'Current Board Status:',
      selectFile: 'Select File to Inspect',
      dragDropOrClick: 'Select a PDF or image scan (Max 2MB)',
      loadSafeDemo: 'Load safe demo specimen',
      removeFile: 'Remove',
      acceptedFormats: 'Accepted Format',
      issuedBy: 'Issuing Authority',
      whatItLooksLike: 'What this looks like',
      localInspectionOnly: 'Technical inspection runs locally in your browser. No files are uploaded to any server.',
      oversizedError: 'File size exceeds 2MB limit. Please compress before official submission.',
      unsupportedFormatError: 'Unsupported format. Please select a PDF, JPEG, or PNG document.',
      resolutionVerified: 'Resolution verified for legible reading by case verification officers.',
      pdfHeaderVerified: 'Valid PDF document structure confirmed.',
      continueToApplication: 'Continue to Application Flow',
      backToEligibility: 'Back to Eligibility',
      technicalDisclaimer: 'PaperBridge verified the file’s technical format only. It did not verify authenticity, ownership, legal validity, signatures, stamps or scholarship eligibility.',
      replaceFile: 'Replace / Re-inspect',
      categoryLabel: 'Category',
      inspectedFileLabel: 'Inspected File',
      specimenGuide: 'Specimen Guide',
      hideSpecimen: 'Hide Specimen',
      specimenChecklistTitle: 'Synthetic Specimen Checklist:',
      specimenItem1: 'Original government header with department emblem',
      specimenItem2: "Applicant name and father's name matching marksheet",
      specimenItem3: 'Revenue barcode or certificate serial identifier',
      specimenItem4: 'No cropped edges or low-contrast flash glare',
    },
    application: {
      stepBadge: 'Step 3 of 5: Guided Answers',
      questionStep: 'Question',
      ofStep: 'of',
      nextQuestion: 'Next Question',
      prevQuestion: 'Previous Question',
      reviewAnswers: 'Review All Answers',
      requiredNote: 'Required field',
      saveNotice: 'Saved in local storage',
      answeredCount: 'Answered',
      uncertainCount: 'Uncertain',
      remainingCount: 'Remaining',
    },
    review: {
      stepBadge: 'Step 4 of 5: Review Map',
      demoBadge: 'Inspection Gateway',
      heading: 'Review Your Prepared Answers',
      subheading: 'Check completed questions, resolve uncertainties, and ensure no required field is missing before helper handoff.',
      completeSection: 'Complete & Ready',
      checkSection: 'Needs Checking (Uncertain)',
      missingSection: 'Missing Required Questions',
      continueToHandoff: 'Continue to Helper Handoff',
      returnToQuestion: 'Inspect / Change Answer',
      blockingWarning: 'Please complete or mark remaining questions before finalizing handoff.',
      editAction: 'Edit',
      currentValueLabel: 'Current value:',
      noteLabel: 'Note:',
      missingNotice: 'These required questions have not been answered yet. Select any item to go straight to that question.',
      uncertainNotice: 'These answers were marked for helper verification. They will be highlighted in your helper handoff packet.',
      needsChecking: 'Needs checking',
    },
    handoff: {
      stepBadge: 'Step 5 of 5: Safe Handoff',
      demoBadge: 'Local Consent Packet Demonstration',
      heading: 'Consent-Controlled Helper Handoff',
      subheading: 'Choose exactly which sections you wish to share with a trusted teacher, family member, or Common Service Centre helper.',
      trustedHelperLabel: 'Helper Name / CSC Operator ID (Optional)',
      selectSectionsTitle: 'Select sections to include in handoff packet',
      selectSectionsDesc: 'Check each category of information you permit your helper to view:',
      includeIdCheckbox: 'Include National Photo ID / Personal Identifiers',
      includeIdWarning: 'Identifiers are unselected by default for student privacy. Only share if your operator needs to verify identity.',
      generateTokenAction: 'Generate Expiring Handoff Packet',
      revokeAction: 'Revoke Packet Access Now',
      tokenLabel: 'Time-Limited Handoff Token',
      expiresInLabel: 'Expires in 24 hours (Local Demonstration Token)',
      qrDescription: 'Scannable local demonstration QR code containing only consented fields',
      printableChecklistCta: 'Print Physical Checklist & Receipt',
      demonstrationNotice: 'PaperBridge has no backend. Data is stored solely on your device. Client-side revocation invalidates this session token but cannot remotely revoke copied payloads.',
      packetActive: 'Packet Active',
      accessRevoked: 'Access Revoked',
      openDemoRedemption: 'Open Helper Redemption View',
      localDemoOnly: 'Local demonstration boundary: Zero external network transmission.',
    },
    complete: {
      heading: 'Your PaperBridge preparation is complete.',
      subheading: 'You have organized your documents, clarified complex questions, and created your verified preparation packet. Continue on the official portal with confidence.',
      nextStepsTitle: 'What to do next on the official portal',
      readyPortalCta: 'Continue to Official Portal (External Link)',
      checklistTitle: 'Your Prepared Application Summary',
      resetDemoCta: 'Clear and Reset Demo Journey',
      schemeOfficialLinkNote: 'Official portals require an active internet connection and will authenticate through state identity services.',
      printDossier: 'Print Complete Dossier',
      preparedAnswersLabel: 'PREPARED ANSWERS',
      helperVerificationsLabel: 'HELPER VERIFICATIONS',
      documentsInspectedLabel: 'DOCUMENTS INSPECTED',
      remainingItemsTitle: 'Remaining Items for Operator or Teacher Review:',
      reviewFullMap: 'Review Full Map',
      verificationRequested: 'Verification requested',
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
      resetConfirm: 'क्या आप वाकई अपना डेटा रीसेट करना चाहते हैं? इससे सभी स्थानीय उत्तर मिट जाएंगे।',
    },
    connectivity: {
      ready: 'ऑफलाइन तैयारी के लिए तैयार',
      readyDesc: 'सभी नोट्स, दस्तावेज़ जांच और समीक्षा फॉर्म आपके डिवाइस पर स्थानीय रूप से चलते हैं।',
      offline: 'वर्तमान में ऑफलाइन — तैयारी जारी है',
      offlineDesc: 'सभी स्थानीय तैयारी, दस्तावेज़ निरीक्षण और समीक्षा बिना इंटरनेट के काम करते हैं।',
      portalNote: 'अंतिम आधिकारिक पोर्टल पर आवेदन जमा करने के लिए इंटरनेट आवश्यक होगा।',
    },
    home: {
      badge: 'हाइपरब्लूम यूआई/यूएक्स डिज़ाइन सिस्टम',
      title: 'छात्रवृत्ति का ऐसा फॉर्म जिसे जमा करने से पहले आप समझ सकें।',
      subtitle: 'पेपरब्रिज कठिन सरकारी फॉर्मों को सरल, स्पष्ट और आधिकारिक भाषा के साथ एक-एक करके समझाता है।',
      promise1Title: 'किसी खाते की आवश्यकता नहीं',
      promise1Desc: 'तुरंत शुरू करें। हम कोई ईमेल या पासवर्ड नहीं मांगते।',
      promise2Title: 'उत्तर आपके डिवाइस पर ही रहते हैं',
      promise2Desc: 'सारा डेटा आपके अपने ब्राउज़र में सुरक्षित रहता है। बादलों में कुछ नहीं भेजा जाता।',
      promise3Title: 'आधिकारिक नियम केवल एक टैप दूर हैं',
      promise3Desc: 'जब भी आपको ज़रूरत हो, मूल नियम और सरकारी धारा सीधे देखें।',
      startCta: 'मार्गदर्शित आवेदन शुरू करें',
      storyCta: 'पेपरब्रिज कैसे काम करता है',
      fictionalNotice: 'काल्पनिक प्रदर्शन योजना: "ब्राइटस्टेप्स छात्र सहायता अनुदान" केवल डिज़ाइन मूल्यांकन के लिए बनाया गया है।',
      previewHeading: 'मुख्य विशेषता का अनुभव करें',
      previewSubheading: 'सरल भाषा और आधिकारिक नियमों के बीच टॉगल करें:',
    },
    beforeYouStart: {
      stepBadge: 'चरण 1/5: जानें और तैयारी करें',
      badgeDemo: 'तैयारी अनुबंध',
      heading: 'शुरू करने से पहले: तैयारी अनुबंध',
      subheading: 'कोई भी डेटा दर्ज करने से पहले समझें कि क्या अपेक्षा की जाए, आवश्यक दस्तावेज़ जांचें और हमारी गोपनीयता प्रतिबद्धताओं की समीक्षा करें।',
      expectedTimeLabel: 'अपेक्षित समय',
      expectedTimeValue: '~12 मिनट',
      docsNeededLabel: 'आवश्यक दस्तावेज़',
      docsNeededValue: '4 मुख्य प्रमाणपत्र',
      offlineSafeLabel: 'ऑफलाइन सुरक्षित',
      offlineSafeValue: '100% क्लाइंट-साइड',
      docsHeading: 'वे 4 दस्तावेज़ जिनकी आपको आवश्यकता होगी',
      privacyHeading: 'हमारे तीन गोपनीयता और स्पष्टता वादे',
      privacyPromise1: 'तैयारी के दौरान शून्य क्लाउड ट्रैकिंग या रिमोट डेटा संग्रह।',
      privacyPromise2: 'आप जो कुछ भी लिखते या जोड़ते हैं वह आपके ब्राउज़र की मेमोरी में रहता है।',
      privacyPromise3: 'प्रत्येक सरलीकृत प्रश्न सीधे अपने आधिकारिक स्रोत विनियमन से जुड़ा है।',
      startEligibilityCta: 'पात्रता जांच पर आगे बढ़ें',
    },
    eligibility: {
      stepBadge: 'चरण 1: पात्रता छंटनी',
      triageBadge: 'पात्रता छंटनी',
      ineligibleHeading: 'यह विशिष्ट अनुदान आपकी वर्तमान स्थिति के अनुकूल नहीं हो सकता है',
      ineligibleDesc: 'आपके चुने हुए उत्तर के आधार पर, यह प्रदर्शन योजना ऐसे मानदंड मांगती है जो वर्तमान में पूरे नहीं होते हैं।',
      ineligibleAlternative: 'वैकल्पिक संसाधन और शिकायत सहायता आपके संस्थान या स्थानीय कल्याण कार्यालय के माध्यम से उपलब्ध हैं।',
      ineligibleReconsider: 'पात्रता का पुनर्मूल्यांकन करने के लिए इस उत्तर को बदलें',
      passedBadge: 'मानदंड पूरे हुए',
      uncertainBadge: 'समीक्षा आवश्यक',
      nextAction: 'अगला प्रश्न',
      backAction: 'पिछला प्रश्न',
      continueToDocuments: 'दस्तावेज़ बोर्ड पर जाएं',
    },
    dualView: {
      plainTab: 'सरल अर्थ (आसान भाषा)',
      officialTab: 'अधिकृत नियम (सरकारी धारा)',
      whyWeAsk: 'हम यह क्यों पूछ रहे हैं',
      sourceClause: 'आधिकारिक नियम का संदर्भ',
      howUsed: 'इस उत्तर का उपयोग कैसे होगा',
      evidenceHint: 'यह जानकारी किस दस्तावेज़ में मिलेगी',
      imNotSure: 'मुझे खात्री नहीं है',
      imNotSureModalTitle: 'निश्चय न होना सामान्य बात है, कोई गलती नहीं।',
      imNotSureModalDesc: 'अनुमान लगाने की ज़रूरत नहीं है। हम इस प्रश्न पर निशान लगा देंगे ताकि आपके शिक्षक या मददगार इसे स्पष्ट कर सकें।',
      imNotSureResolvedAction: 'मैं अपना दस्तावेज़ अभी देखूँगा/देखूँगी',
      imNotSureReviewLater: 'अनिश्चित चिह्नित करें और आगे बढ़ें',
      saveIndicator: 'डिवाइस पर सुरक्षित रूप से सहेजा गया',
      offlineIndicator: 'ऑफलाइन सुरक्षित',
    },
    documents: {
      stepBadge: 'चरण 2/5: दस्तावेज़ तैयारी',
      demoBadge: 'क्लाइंट-साइड निरीक्षण',
      heading: 'दस्तावेज़ पूर्वतयारी बोर्ड',
      subheading: 'आवश्यक दस्तावेज़ों की जांच करें, स्वीकृत प्रारूपों की पुष्टि करें, और प्रश्नों के उत्तर देने से पहले तकनीकी तत्परता की जांच करें।',
      statusReady: 'तकनीकी रूप से तैयार',
      statusNeedsAttention: 'तकनीकी ध्यान आवश्यक',
      statusMissing: 'संलग्न नहीं',
      boardStatusLabel: 'वर्तमान बोर्ड स्थिति:',
      selectFile: 'निरीक्षण हेतु फ़ाइल चुनें',
      dragDropOrClick: 'पीडीएफ या फोटो स्कैन चुनें (अधिकतम 2MB)',
      loadSafeDemo: 'सुरक्षित डेमो नमूना लोड करें',
      removeFile: 'हटाएं',
      acceptedFormats: 'स्वीकृत प्रारूप',
      issuedBy: 'जारीकर्ता प्राधिकरण',
      whatItLooksLike: 'यह कैसा दिखता है',
      localInspectionOnly: 'तकनीकी निरीक्षण केवल आपके ब्राउज़र में चलता है। कोई फ़ाइल सर्वर पर अपलोड नहीं होती।',
      oversizedError: 'फ़ाइल का आकार 2MB की सीमा से अधिक है। कृपया आधिकारिक पोर्टल पर जमा करने से पहले कंप्रेस करें।',
      unsupportedFormatError: 'असमर्थित प्रारूप। कृपया पीडीएफ, जेपीईजी या पीएनजी दस्तावेज़ चुनें।',
      resolutionVerified: 'सत्यापन अधिकारियों द्वारा स्पष्ट पठन हेतु रिज़ॉल्यूशन सत्यापित।',
      pdfHeaderVerified: 'मान्य पीडीएफ दस्तावेज़ संरचना की पुष्टि हुई।',
      continueToApplication: 'आवेदन प्रक्रिया पर आगे बढ़ें',
      backToEligibility: 'पात्रता पर वापस जाएं',
      technicalDisclaimer: 'पेपरब्रिज ने केवल फ़ाइल के तकनीकी प्रारूप का सत्यापन किया है। इसने प्रामाणिकता, स्वामित्व, कानूनी वैधता, हस्ताक्षर, मोहर या छात्रवृत्ति पात्रता का सत्यापन नहीं किया है।',
      replaceFile: 'बदलें / पुनः निरीक्षण करें',
      categoryLabel: 'श्रेणी',
      inspectedFileLabel: 'निरीक्षित फ़ाइल',
      specimenGuide: 'नमूना मार्गदर्शिका',
      hideSpecimen: 'नमूना छिपाएं',
      specimenChecklistTitle: 'सिंथेटिक नमूना चेकलिस्ट:',
      specimenItem1: 'विभाग के प्रतीक के साथ मूल सरकारी हेडर',
      specimenItem2: 'अंकतालिका से मेल खाता आवेदक का नाम और पिता का नाम',
      specimenItem3: 'राजस्व बारकोड या प्रमाणपत्र क्रमांक पहचानकर्ता',
      specimenItem4: 'कटे हुए किनारे या धुंधले फ्लैश की चमक नहीं',
    },
    application: {
      stepBadge: 'चरण 3/5: निर्देशित उत्तर',
      questionStep: 'प्रश्न',
      ofStep: 'का',
      nextQuestion: 'अगला प्रश्न',
      prevQuestion: 'पिछला प्रश्न',
      reviewAnswers: 'सभी उत्तरों की समीक्षा करें',
      requiredNote: 'अनिवार्य क्षेत्र',
      saveNotice: 'स्थानीय मेमोरी में सुरक्षित',
      answeredCount: 'उत्तर दिया',
      uncertainCount: 'अनिश्चित',
      remainingCount: 'शेष',
    },
    review: {
      stepBadge: 'चरण 4/5: समीक्षा नक्शा',
      demoBadge: 'निरीक्षण गेटवे',
      heading: 'तैयार उत्तरों की समीक्षा करें',
      subheading: 'मददगार को सौंपने से पहले पूरे किए गए प्रश्नों की जांच करें, अनिश्चितताओं को सुलझाएं और सुनिश्चित करें कि कोई अनिवार्य फ़ील्ड छूटा न हो।',
      completeSection: 'पूर्ण एवं तैयार',
      checkSection: 'जांच आवश्यक (अनिश्चित)',
      missingSection: 'अनुत्तरित अनिवार्य प्रश्न',
      continueToHandoff: 'मददगार हैंडऑफ़ पर आगे बढ़ें',
      returnToQuestion: 'उत्तर बदलें / देखें',
      blockingWarning: 'कृपया हैंडऑफ़ पूरा करने से पहले शेष प्रश्नों के उत्तर दें।',
      editAction: 'संपादित करें',
      currentValueLabel: 'वर्तमान मान:',
      noteLabel: 'टिप्पणी:',
      missingNotice: 'इन अनिवार्य प्रश्नों के उत्तर अभी तक नहीं दिए गए हैं। सीधे उस प्रश्न पर जाने के लिए चुनें।',
      uncertainNotice: 'इन उत्तरों को सत्यापन के लिए चिह्नित किया गया है। आपके हैंडऑफ़ पैकेट में इन्हें हाइलाइट किया जाएगा।',
      needsChecking: 'जांच आवश्यक',
    },
    handoff: {
      stepBadge: 'चरण 5/5: सुरक्षित हैंडऑफ़',
      demoBadge: 'स्थानीय सहमति पैकेट प्रदर्शन',
      heading: 'सहमति-नियंत्रित मददगार हैंडऑफ़',
      subheading: 'चुनें कि आप अपने विश्वसनीय शिक्षक, परिवार के सदस्य या सीएससी ऑपरेटर के साथ कौन-सी जानकारी साझा करना चाहते हैं।',
      trustedHelperLabel: 'मददगार का नाम / सीएससी ऑपरेटर आईडी (ऐच्छिक)',
      selectSectionsTitle: 'हैंडऑफ़ पैकेट में शामिल करने के लिए अनुभाग चुनें',
      selectSectionsDesc: 'प्रत्येक श्रेणी की जानकारी को चिह्नित करें जिसे आप अपने मददगार को देखने की अनुमति देते हैं:',
      includeIdCheckbox: 'राष्ट्रीय फोटो आईडी / व्यक्तिगत पहचानकर्ता शामिल करें',
      includeIdWarning: 'छात्र गोपनीयता के लिए पहचानकर्ताओं को डिफ़ॉल्ट रूप से अचयनित रखा गया है। केवल तभी साझा करें जब ऑपरेटर को पहचान की पुष्टि करनी हो।',
      generateTokenAction: 'समाप्ति योग्य हैंडऑफ़ पैकेट बनाएं',
      revokeAction: 'पैकेट पहुंच तुरंत रद्द करें',
      tokenLabel: 'समय-सीमित हैंडऑफ़ टोकन',
      expiresInLabel: '24 घंटे में समाप्त (स्थानीय प्रदर्शन टोकन)',
      qrDescription: 'स्कैन करने योग्य स्थानीय प्रदर्शन क्यूआर कोड जिसमें केवल अनुमत फ़ील्ड शामिल हैं',
      printableChecklistCta: 'भौतिक चेकलिस्ट और रसीद प्रिंट करें',
      demonstrationNotice: 'पेपरब्रिज का कोई बैकएंड नहीं है। डेटा केवल आपके डिवाइस पर संग्रहीत होता है। स्थानीय रद्दीकरण इस सत्र टोकन को अमान्य करता है किंतु पहले से कॉपी किए गए डेटा को दूरस्थ रूप से मिटा नहीं सकता।',
      packetActive: 'पैकेट सक्रिय है',
      accessRevoked: 'पहुंच रद्द कर दी गई है',
      openDemoRedemption: 'मददगार रिडेम्पशन दृश्य खोलें',
      localDemoOnly: 'स्थानीय प्रदर्शन सीमा: शून्य बाहरी नेटवर्क ट्रांसमिशन।',
    },
    complete: {
      heading: 'आपकी पेपरब्रिज पूर्वतयारी पूर्ण हो चुकी है।',
      subheading: 'आपने अपने दस्तावेज़ व्यवस्थित कर लिए हैं, जटिल प्रश्नों को समझ लिया है और अपना सत्यापित पैकेट तैयार कर लिया है। अब विश्वास के साथ आधिकारिक पोर्टल पर आगे बढ़ें।',
      nextStepsTitle: 'आधिकारिक पोर्टल पर आगे क्या करें',
      readyPortalCta: 'आधिकारिक पोर्टल पर जाएं (बाहरी लिंक)',
      checklistTitle: 'आपके तैयार आवेदन का सारांश',
      resetDemoCta: 'डेमो डेटा मिटाएं और रीसेट करें',
      schemeOfficialLinkNote: 'आधिकारिक पोर्टलों के लिए सक्रिय इंटरनेट कनेक्शन आवश्यक है और वे राज्य पहचान सेवाओं के माध्यम से प्रमाणित करेंगे।',
      printDossier: 'पूर्ण दस्तावेज़ प्रिंट करें',
      preparedAnswersLabel: 'तैयार उत्तर',
      helperVerificationsLabel: 'सहायक सत्यापन',
      documentsInspectedLabel: 'निरीक्षित दस्तावेज़',
      remainingItemsTitle: 'ऑपरेटर या शिक्षक समीक्षा के लिए शेष बिंदु:',
      reviewFullMap: 'पूरा नक्शा देखें',
      verificationRequested: 'सत्यापन का अनुरोध किया गया',
    },
    accessibility: {
      drawerTitle: 'सुलभता एवं प्रदर्शन प्राथमिकताएं',
      focusMode: 'फोकस मोड',
      focusModeDesc: 'मानसिक तनाव कम करने के लिए द्वितीयक व्याख्यात्मक नोट्स को छुपाएं।',
      readingSupport: 'पठन साहाय्य',
      readingSupportDesc: 'पंक्तियों और अक्षरों के बीच अंतर बढ़ाएं और पठनीय चौड़ाई सेट करें।',
      readAloud: 'बोलकर सुनाएं (वाक्)',
      readAloudDesc: 'ब्राउज़र की आवाज़ में सक्रिय प्रश्न पाठ सुनें।',
      highContrast: 'उच्च कंट्रास्ट मोड',
      highContrastDesc: 'धूप में स्पष्टता के लिए शुद्ध काले और सफेद किनारों का उपयोग करता है।',
      close: 'प्राथमिकताएं बंद करें',
    },
  },
  mr: {
    brand: {
      tagline: 'असे शासकीय अर्ज जे स्वतः आपली भाषा समजावून सांगतात.',
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
      accessibility: 'सुलभता व प्रदर्शन',
      resetDemo: 'डेमो रीसेट करा',
      resetConfirm: 'तुम्हाला खात्री आहे का की तुम्ही तुमचा डेटा रीसेट करू इच्छिता? यामुळे सर्व स्थानिक उत्तरे मिटतील.',
    },
    connectivity: {
      ready: 'ऑफलाइन पूर्वतयारीसाठी सज्ज',
      readyDesc: 'सर्व नोंदी, कागदपत्र पडताळणी आणि पुनरावलोकन फॉर्म तुमच्या डिव्हाइसवर स्थानिक पातळीवर चालतात.',
      offline: 'सध्या ऑफलाइन — पूर्वतयारी सुरू आहे',
      offlineDesc: 'सर्व स्थानिक पूर्वतयारी, कागदपत्र तपासणी आणि पुनरावलोकन इंटरनेटशिवाय पूर्णपणे कार्यरत आहे.',
      portalNote: 'अंतिम अधिकृत पोर्टलवर अर्ज सादर करण्यासाठी इंटरनेट आवश्यक असेल.',
    },
    home: {
      badge: 'हायपरब्लूम यूआय/यूएक्स डिझाइन प्रणाली',
      title: 'शिष्यवृत्तीचा असा अर्ज जो सादर करण्यापूर्वी तुम्हाला व्यवस्थित समजेल.',
      subtitle: 'पेपरब्रिज क्लिष्ट शासकीय अर्ज शांत, सोप्या आणि अधिकृत संदर्भ नियमांसह एका वेळी एका निर्णयाद्वारे समजावून सांगते.',
      promise1Title: 'खात्याची गरज नाही',
      promise1Desc: 'लगेच सुरू करा. आम्ही लॉगिन, ईमेल किंवा पासवर्ड मागत नाही.',
      promise2Title: 'उत्तरे तुमच्याच डिव्हाइसवर राहतात',
      promise2Desc: 'सर्व माहिती तुमच्या ब्राउझर मेमरीमध्ये सुरक्षित राहते. क्लाऊडवर काहीही पाठवले जात नाही.',
      promise3Title: 'अधिकृत नियम एका टॅपच्या अंतरावर आहेत',
      promise3Desc: 'जेव्हाही तुम्हाला शंका असेल, मूळ शासकीय नियम आणि कलम थेट तपासा.',
      startCta: 'मार्गदर्शित अर्ज सुरू करा',
      storyCta: 'पेपरब्रिज कसे कार्य करते ते पहा',
      fictionalNotice: 'काल्पनिक प्रात्यक्षिक योजना: "ब्राइटस्टेप्स विद्यार्थी साहाय्य अनुदान" केवळ डिझाइन मूल्यांकनासाठी तयार केले आहे.',
      previewHeading: 'वैशिष्ट्यपूर्ण संवादाचा अनुभव घ्या',
      previewSubheading: 'सोपी भाषा आणि अधिकृत नियम यामध्ये अदलाबदल करा:',
    },
    beforeYouStart: {
      stepBadge: 'पायरी १/५: जाणून घ्या आणि तयार व्हा',
      badgeDemo: 'पूर्वतयारी करार',
      heading: 'सुरू करण्यापूर्वी: पूर्वतयारी करार',
      subheading: 'कोणतीही माहिती भरण्यापूर्वी काय अपेक्षा ठेवायची ते समजून घ्या, आवश्यक कागदपत्रे तपासा आणि आमची गोपनीयता आश्वासने वाचा.',
      expectedTimeLabel: 'अपेक्षित वेळ',
      expectedTimeValue: '~१२ मिनिटे',
      docsNeededLabel: 'आवश्यक कागदपत्रे',
      docsNeededValue: '४ मुख्य प्रमाणपत्रे',
      offlineSafeLabel: 'ऑफलाइन सुरक्षित',
      offlineSafeValue: '१००% डिव्हाइसवर',
      docsHeading: 'तुम्हाला आवश्यक असलेली ४ कागदपत्रे',
      privacyHeading: 'आमची तीन गोपनीयता व पारदर्शकता आश्वासने',
      privacyPromise1: 'तयारीदरम्यान शून्य क्लाउड ट्रॅकिंग किंवा डेटा संकलन.',
      privacyPromise2: 'तुम्ही जे काही लिहिता किंवा जोडता ते तुमच्या ब्राउझरमध्येच राहते.',
      privacyPromise3: 'प्रत्येक सोपा केलेला प्रश्न थेट त्याच्या अधिकृत शासकीय नियमाशी जोडलेला आहे.',
      startEligibilityCta: 'पात्रता पडताळणीकडे पुढे जा',
    },
    eligibility: {
      stepBadge: 'पायरी १: पात्रता वर्गीकरण',
      triageBadge: 'पात्रता वर्गीकरण',
      ineligibleHeading: 'हे विशिष्ट अनुदान तुमच्या सध्याच्या परिस्थितीशी जुळणारे नसू शकते',
      ineligibleDesc: 'तुमच्या निवडलेल्या उत्तरावर आधारित, या योजनेसाठी आवश्यक असणारे निकष सध्या पूर्ण होत नाहीत.',
      ineligibleAlternative: 'पर्यायी शासकीय योजना आणि तक्रार निवारण साहाय्य तुमच्या कॉलेज किंवा स्थानिक समाजकल्याण कार्यालयात उपलब्ध आहे.',
      ineligibleReconsider: 'पात्रतेचे पुनर्मूल्यांकन करण्यासाठी हे उत्तर बदला',
      passedBadge: 'निकष पूर्ण',
      uncertainBadge: 'तपासणी आवश्यक',
      nextAction: 'पुढील प्रश्न',
      backAction: 'मागील प्रश्न',
      continueToDocuments: 'कागदपत्रे फलकावर जा',
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
      imNotSureModalDesc: 'अंदाज लावण्याची गरज नाही. आम्ही हा प्रश्न तपासणीसाठी राखून ठेवू जेणेकरून तुमचे शिक्षक किंवा मदतनीस मदत करू शकतील.',
      imNotSureResolvedAction: 'मी माझे कागदपत्र आता तपासेन',
      imNotSureReviewLater: 'अनिश्चित म्हणून नोंदवा आणि पुढे चला',
      saveIndicator: 'डिव्हाइसवर सुरक्षित जतन केले',
      offlineIndicator: 'ऑफलाइन सुरक्षित',
    },
    documents: {
      stepBadge: 'पायरी २/५: कागदपत्रे पूर्वतयारी',
      demoBadge: 'क्लायंट-साइड तपासणी',
      heading: 'कागदपत्रे पूर्वतयारी फलक',
      subheading: 'आवश्यक कागदपत्रांची तपासणी करा, स्वीकृत स्वरूप तपासा आणि प्रश्न सोडवण्यापूर्वी तांत्रिक सुवाच्यता तपासा.',
      statusReady: 'तांत्रिकदृष्ट्या तयार',
      statusNeedsAttention: 'तांत्रिक लक्ष आवश्यक',
      statusMissing: 'जोडले नाही',
      boardStatusLabel: 'सध्याची फलक स्थिती:',
      selectFile: 'तपासणीसाठी फाईल निवडा',
      dragDropOrClick: 'पीडीएफ किंवा फोटो स्कॅन निवडा (कमाल २ एमबी)',
      loadSafeDemo: 'सुरक्षित नमुना कागदपत्र लोड करा',
      removeFile: 'काढून टाका',
      acceptedFormats: 'स्वीकृत स्वरूप',
      issuedBy: 'देणारे प्राधिकरण',
      whatItLooksLike: 'हे कसे दिसते',
      localInspectionOnly: 'तांत्रिक तपासणी केवळ तुमच्या ब्राउझरमध्ये चालते. कोणतीही फाईल सर्व्हरवर पाठवली जात नाही.',
      oversizedError: 'फाईलचा आकार २ एमबी मर्यादेपेक्षा जास्त आहे. अधिकृत पोर्टलवर देण्यापूर्वी कृपया कॉम्प्रेस करा.',
      unsupportedFormatError: 'असमर्थित स्वरूप. कृपया पीडीएफ, जेपीईजी किंवा पीएनजी कागदपत्र निवडा.',
      resolutionVerified: 'पडताळणी अधिकाऱ्यांसाठी सुवाच्य वाचनासाठी रिझोल्यूशन सत्यापित.',
      pdfHeaderVerified: 'वैध पीडीएफ कागदपत्र रचनेची पुष्टी झाली.',
      continueToApplication: 'अर्ज प्रक्रियेकडे पुढे जा',
      backToEligibility: 'पात्रतेकडे परत जा',
      technicalDisclaimer: 'पेपरब्रिजने केवळ फाईलच्या तांत्रिक स्वरूपाची तपासणी केली आहे. याने कोणतीही सत्यता, मालकी हक्क, कायदेशीर वैधता, स्वाक्षरी, शिक्के किंवा शिष्यवृत्ती पात्रतेची पडताळणी केलेली नाही.',
      replaceFile: 'बदला / पुन्हा तपासा',
      categoryLabel: 'वर्गवारी',
      inspectedFileLabel: 'तपासलेली फाईल',
      specimenGuide: 'नमुना मार्गदर्शिका',
      hideSpecimen: 'नमुना लपवा',
      specimenChecklistTitle: 'सिंथेटिक नमुना चेकलिस्ट:',
      specimenItem1: 'विभागाच्या प्रतीकासह मूळ शासकीय हेडर',
      specimenItem2: 'गुणपत्रिकेशी जुळणारे अर्जदाराचे नाव आणि वडिलांचे नाव',
      specimenItem3: 'महसूल बारकोड किंवा प्रमाणपत्र अनुक्रमांक अभिज्ञापक',
      specimenItem4: 'कापलेल्या कडा किंवा अस्पष्ट फ्लॅशची चमक नाही',
    },
    application: {
      stepBadge: 'पायरी ३/५: मार्गदर्शित उत्तरे',
      questionStep: 'प्रश्न',
      ofStep: 'पैकी',
      nextQuestion: 'पुढील प्रश्न',
      prevQuestion: 'मागील प्रश्न',
      reviewAnswers: 'सर्व उत्तरांचे पुनरावलोकन करा',
      requiredNote: 'आवश्यक माहिती',
      saveNotice: 'स्थानिक मेमरीमध्ये जतन केले',
      answeredCount: 'उत्तरे दिली',
      uncertainCount: 'अनिश्चित',
      remainingCount: 'उर्वरित',
    },
    review: {
      stepBadge: 'पायरी ४/५: पुनरावलोकन नकाशा',
      demoBadge: 'तपासणी प्रवेशद्वार',
      heading: 'तयार उत्तरांचे पुनरावलोकन',
      subheading: 'मदतनीसाकडे सोपवण्यापूर्वी पूर्ण केलेले प्रश्न तपासा, अनिश्चितता सोडवा आणि कोणतीही आवश्यक माहिती सुटलेली नाही याची खात्री करा.',
      completeSection: 'पूर्ण आणि तयार',
      checkSection: 'तपासणी आवश्यक (अनिश्चित)',
      missingSection: 'अपूर्ण राहिलेले प्रश्न',
      continueToHandoff: 'मदतनीस हस्तांतरणाकडे जा',
      returnToQuestion: 'उत्तर बदला / तपासा',
      blockingWarning: 'कृपया हस्तांतरण करण्यापूर्वी उर्वरित प्रश्नांची उत्तरे द्या.',
      editAction: 'बदला',
      currentValueLabel: 'सध्याचे मूल्य:',
      noteLabel: 'नोंद:',
      missingNotice: 'या आवश्यक प्रश्नांची उत्तरे अद्याप दिलेली नाहीत. थेट त्या प्रश्नावर जाण्यासाठी निवडा.',
      uncertainNotice: 'ही उत्तरे पडताळणीसाठी राखून ठेवली आहेत. तुमच्या हस्तांतरण पाकिटात ती ठळकपणे दाखवली जातील.',
      needsChecking: 'तपासणी आवश्यक',
    },
    handoff: {
      stepBadge: 'पायरी ५/५: सुरक्षित हस्तांतरण',
      demoBadge: 'स्थानिक संमती पाकीट प्रात्यक्षिक',
      heading: 'संमती-आधारित मदतनीस हस्तांतरण',
      subheading: 'तुमच्या शिक्षकांसोबत किंवा सेतू केंद्र ऑपरेटरसोबत नेमकी कोणती माहिती शेअर करायची ते निवडा.',
      trustedHelperLabel: 'मदतनीसाचे नाव / सेतू ऑपरेटर आयडी (ऐच्छिक)',
      selectSectionsTitle: 'हस्तांतरण पाकिटात समाविष्ट करायचे विभाग निवडा',
      selectSectionsDesc: 'तुमच्या मदतनीसाला पाहण्याची अनुमती देता त्या माहितीच्या प्रत्येक वर्गाला टिक करा:',
      includeIdCheckbox: 'राष्ट्रीय ओळखपत्र / वैयक्तिक ओळख क्रमांक समाविष्ट करा',
      includeIdWarning: 'विद्यार्थ्यांच्या गोपनीयतेसाठी ओळखपत्र मूळ स्वरूपात बंद ठेवले आहे. ऑपरेटरला ओळखीची पडताळणी करायची असेल तरच शेअर करा.',
      generateTokenAction: 'हस्तांतरण पाकीट तयार करा',
      revokeAction: 'परवानगी त्वरित रद्द करा',
      tokenLabel: 'मुदत-मर्यादित हस्तांतरण टोकन',
      expiresInLabel: '२४ तासांत संपेल (स्थानिक प्रात्यक्षिक टोकन)',
      qrDescription: 'स्कॅन करण्याजोगा स्थानिक क्यूआर कोड ज्यामध्ये केवळ संमत माहिती सामावली आहे',
      printableChecklistCta: 'यादी व पावती मुद्रित (Print) करा',
      demonstrationNotice: 'पेपरब्रिजचा कोणताही बॅकएंड नाही. डेटा केवळ तुमच्या डिव्हाइसवर साठवला जातो. स्थानिक रद्दीकरण या सत्राचे टोकन रद्द करते, पण आधीच कॉपी केलेला डेटा दूरवरून पुसू शकत नाही.',
      packetActive: 'पाकीट सक्रिय आहे',
      accessRevoked: 'परवानगी रद्द केली',
      openDemoRedemption: 'मदतनीस प्रात्यक्षिक दृश्य उघडा',
      localDemoOnly: 'स्थानिक प्रात्यक्षिक मर्यादा: शून्य बाह्य नेटवर्क संप्रेषण.',
    },
    complete: {
      heading: 'तुमची पेपरब्रिज पूर्वतयारी पूर्ण झाली आहे.',
      subheading: 'तुम्ही तुमची कागदपत्रे आणि प्रश्नांची उत्तरे व्यवस्थित समजून घेतली आहेत. आता आत्मविश्वासाने अधिकृत पोर्टलवर पुढे जा.',
      nextStepsTitle: 'अधिकृत पोर्टलवर पुढील पावले',
      readyPortalCta: 'अधिकृत पोर्टलवर जा (बाह्य दुवा)',
      checklistTitle: 'तयार केलेल्या अर्जाचा सारांश',
      resetDemoCta: 'डेमो प्रवास मिटवा आणि रीसेट करा',
      schemeOfficialLinkNote: 'अधिकृत पोर्टलसाठी सक्रिय इंटरनेट आवश्यक आहे आणि ते शासकीय ओळख पडताळणी प्रणालीद्वारे प्रवेश देईल.',
      printDossier: 'संपूर्ण डॉसियर प्रिंट करा',
      preparedAnswersLabel: 'तयार उत्तरे',
      helperVerificationsLabel: 'मदतनीस पडताळणी',
      documentsInspectedLabel: 'तपासलेली कागदपत्रे',
      remainingItemsTitle: 'ऑपरेटर किंवा शिक्षक पुनरावलोकनासाठी उर्वरित बाबी:',
      reviewFullMap: 'संपूर्ण नकाशा पहा',
      verificationRequested: 'पडताळणीची विनंती केली',
    },
    accessibility: {
      drawerTitle: 'सुलभता आणि प्रदर्शन प्राधान्ये',
      focusMode: 'फोकस मोड',
      focusModeDesc: 'मुख्य प्रश्नावर लक्ष केंद्रित करण्यासाठी अतिरिक्त नोंदी लपवा.',
      readingSupport: 'वाचन साहाय्य',
      readingSupportDesc: 'ओळी आणि शब्दांमधील अंतर वाढवा आणि सुवाच्य रुंदी निश्चित करा.',
      readAloud: 'वाचून दाखवा (आवाज)',
      readAloudDesc: 'ब्राउझरच्या आवाजात चालू प्रश्न ऐका.',
      highContrast: 'उच्च कॉन्ट्रास्ट मोड',
      highContrastDesc: 'उन्हात स्पष्ट दिसण्यासाठी काळ्या आणि पांढऱ्या सीमारेषा वापरतो.',
      close: 'बंद करा',
    },
  },
};
