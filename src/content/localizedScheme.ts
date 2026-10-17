import type { DocumentItem, EligibilityQuestion, Locale, Question } from '../types';

export const LOCALIZED_APP_QUESTIONS: Record<Locale, Record<string, {
  plainQuestion: string;
  plainHelper: string;
  officialWording: string;
  whyWeAsk: string;
  evidenceHint: string;
  placeholder?: string;
  formatExample?: string;
}>> = {
  en: {
    q_legal_name: {
      plainQuestion: 'What is your full legal name?',
      plainHelper: 'Enter your name exactly as written on your Class 10 marksheet or school certificate.',
      officialWording: 'The candidate nomenclature must strictly correspond with the matriculation certificate ledger without colloquial abbreviations or uncertified honorific titles.',
      whyWeAsk: 'The scholarship payment is linked directly to your school record and cannot be processed if spelling differs.',
      evidenceHint: 'Look at Line 1 of your Class 10 marksheet or institutional bonafide letter.',
      placeholder: 'e.g. Riya Santosh Shinde',
      formatExample: 'First Name  Father/Middle Name  Last Name',
    },
    q_dob: {
      plainQuestion: 'What is your date of birth?',
      plainHelper: 'You should be between 16 and 22 years of age as of June 1, 2026.',
      officialWording: 'Verification of chronological nativity pursuant to statutory age criteria (16 to 22 completed solar years at commencement of instructional term).',
      whyWeAsk: 'State grant allocations are age-bracketed to support secondary and diploma completion.',
      evidenceHint: 'Check the Date of Birth printed on your school leaving certificate or identity document.',
      formatExample: 'DD / MM / YYYY',
    },
    q_annual_income: {
      plainQuestion: "What is your family's total annual income in Rupees?",
      plainHelper: 'Enter the exact amount stated on your official Income Certificate from the Tehsildar office.',
      officialWording: 'The aggregate gross pecuniary emoluments accrued by all custodial constituents from agrarian, mercantile, or salaried activities across the preceding fiscal cycle.',
      whyWeAsk: 'Grants are prioritized for students from lower-income households. The official portal checks this against the revenue database.',
      evidenceHint: 'Look at the highlighted box marked "Gross Annual Family Income" on your Tehsildar certificate.',
      placeholder: 'e.g. 140000',
      formatExample: 'Figures only (e.g. 140000 for ₹1,40,000)',
    },
    q_institution_name: {
      plainQuestion: 'Which school, junior college, or polytechnic are you attending?',
      plainHelper: 'Write the complete official name of your current institution.',
      officialWording: 'Designation of the recognized educational establishment conforming to the State Board of Secondary and Higher Secondary Education or Department of Technical Education.',
      whyWeAsk: 'Scholarship fees are calculated based on the official tuition fee structure of your specific college.',
      evidenceHint: 'Check the letterhead stamp on your Bonafide Certificate.',
      placeholder: 'e.g. Government Polytechnic College, Pune',
    },
    q_stream_class: {
      plainQuestion: 'What course or stream are you currently studying?',
      plainHelper: 'Select the primary branch of your higher secondary or technical course.',
      officialWording: 'Classification of curriculum cohort under sanctioned vocational, technical, or general stream frameworks.',
      whyWeAsk: 'Different streams (e.g. Science vs Arts vs Technical Diploma) have different grant allowances for books and lab equipment.',
      evidenceHint: 'Look at your admission receipt or college ID card.',
    },
    q_bank_ifsc: {
      plainQuestion: 'What is the 11-character IFSC Code of your bank branch?',
      plainHelper: 'The IFSC code tells the payment system exactly which bank branch holds your savings account.',
      officialWording: 'Eleven-character alphanumeric code structured as four alpha characters, one zero, and six branch characters representing the recipient financial institution routing node.',
      whyWeAsk: 'Government scholarship funds are deposited directly to your personal bank account via Direct Benefit Transfer.',
      evidenceHint: 'Look at the top or bottom of your bank passbook page 1. It usually starts with 4 letters (e.g. SBIN0001234 or MAHB0000456).',
      placeholder: 'e.g. SBIN0001234',
      formatExample: '4 Letters + 0 + 6 Numbers/Letters',
    },
  },
  hi: {
    q_legal_name: {
      plainQuestion: 'आपका पूरा कानूनी नाम क्या है?',
      plainHelper: 'अपना नाम ठीक वैसे ही लिखें जैसा आपकी 10वीं की अंकतालिका या स्कूल प्रमाणपत्र पर दर्ज है।',
      officialWording: 'उम्मीदवार का नाम बिना किसी संक्षिप्तीकरण या अनधिकृत उपाधि के मैट्रिकुलेशन प्रमाणपत्र से पूर्णतः मेल खाना चाहिए।',
      whyWeAsk: 'छात्रवृत्ति राशि सीधे आपके स्कूल रिकॉर्ड से जुड़ी होती है। स्पेलिंग में अंतर होने पर भुगतान रुक सकता है।',
      evidenceHint: 'अपनी 10वीं की अंकतालिका या कॉलेज बोनाफाइड प्रमाणपत्र की पहली पंक्ति देखें।',
      placeholder: 'उदा. रिया संतोष शिंदे',
      formatExample: 'पहला नाम  पिता/मध्य नाम  उपनाम',
    },
    q_dob: {
      plainQuestion: 'आपकी जन्म तिथि क्या है?',
      plainHelper: '1 जून 2026 तक आपकी आयु 16 से 22 वर्ष के बीच होनी चाहिए।',
      officialWording: 'सत्र प्रारंभ होने पर 16 से 22 वर्ष की वैधानिक आयु मानदंड की पुष्टि।',
      whyWeAsk: 'सरकारी अनुदान माध्यमिक और डिप्लोमा छात्रों के लिए आयु वर्ग के अनुसार निर्धारित किए जाते हैं।',
      evidenceHint: 'अपने स्कूल छोड़ने के प्रमाणपत्र (एलसी) या पहचान पत्र पर मुद्रित जन्म तिथि देखें।',
      formatExample: 'दिन / माह / वर्ष',
    },
    q_annual_income: {
      plainQuestion: 'आपके परिवार की कुल वार्षिक आय (रुपयों में) कितनी है?',
      plainHelper: 'तहसीलदार कार्यालय द्वारा जारी आधिकारिक आय प्रमाणपत्र पर लिखी राशि दर्ज करें।',
      officialWording: 'पूर्ववर्ती वित्तीय वर्ष में सभी अभिभावकों द्वारा कृषि, व्यापार अथवा वेतन से अर्जित सकल आय का योग।',
      whyWeAsk: 'अनुदान कम आय वाले परिवारों के छात्रों को प्राथमिकता देता है। पोर्टल इसे राजस्व डेटाबेस से सत्यापित करता है।',
      evidenceHint: 'अपने तहसीलदार आय प्रमाणपत्र पर "सकल वार्षिक पारिवारिक आय" का बॉक्स देखें।',
      placeholder: 'उदा. 140000',
      formatExample: 'केवल अंक (उदा. ₹1,40,000 के लिए 140000)',
    },
    q_institution_name: {
      plainQuestion: 'आप वर्तमान में किस स्कूल, जूनियर कॉलेज या पॉलिटेक्निक में पढ़ रहे हैं?',
      plainHelper: 'अपने संस्थान का पूरा आधिकारिक नाम लिखें।',
      officialWording: 'माध्यमिक व उच्च माध्यमिक शिक्षा मंडल अथवा तकनीकी शिक्षा विभाग से संबद्ध मान्यता प्राप्त शिक्षण संस्थान का नाम।',
      whyWeAsk: 'छात्रवृत्ति की राशि आपके कॉलेज के आधिकारिक शुल्क ढांचे के आधार पर तय होती है।',
      evidenceHint: 'अपने बोनाफाइड प्रमाणपत्र पर लगी संस्थान की मुहर देखें।',
      placeholder: 'उदा. शासकीय पॉलिटेक्निक कॉलेज, पुणे',
    },
    q_stream_class: {
      plainQuestion: 'आप वर्तमान में किस पाठ्यक्रम या शाखा में पढ़ रहे हैं?',
      plainHelper: 'अपने उच्च माध्यमिक या तकनीकी पाठ्यक्रम की मुख्य शाखा चुनें।',
      officialWording: 'स्वीकृत व्यावसायिक, तकनीकी या सामान्य संकाय के तहत पाठ्यक्रम वर्गीकरण।',
      whyWeAsk: 'अलग-अलग संकायों (जैसे विज्ञान बनाम कला बनाम तकनीकी डिप्लोमा) के लिए किताबों और उपकरणों का अनुदान भिन्न होता है।',
      evidenceHint: 'अपनी प्रवेश रसीद या कॉलेज पहचान पत्र देखें।',
    },
    q_bank_ifsc: {
      plainQuestion: 'आपकी बैंक शाखा का 11 अक्षरों का आईएफएससी (IFSC) कोड क्या है?',
      plainHelper: 'आईएफएससी कोड भुगतान प्रणाली को बताता है कि आपका खाता किस बैंक शाखा में है।',
      officialWording: 'ग्यारह अक्षरों का अल्फान्यूमेरिक कोड (चार अक्षर, एक शून्य, और छह शाखा अक्षर) जो बैंक शाखा की पहचान करता है।',
      whyWeAsk: 'छात्रवृत्ति की राशि प्रत्यक्ष लाभ अंतरण (DBT) के माध्यम से सीधे आपके खाते में जमा की जाती है।',
      evidenceHint: 'अपनी बैंक पासबुक के पहले पृष्ठ पर देखें। यह आमतौर पर 4 अक्षरों से शुरू होता है (उदा. SBIN0001234)।',
      placeholder: 'उदा. SBIN0001234',
      formatExample: '4 अक्षर + 0 + 6 अंक/अक्षर',
    },
  },
  mr: {
    q_legal_name: {
      plainQuestion: 'तुमचे पूर्ण कायदेशीर नाव काय आहे?',
      plainHelper: 'तुमच्या १० वीच्या गुणपत्रिकेवर किंवा शाळा सोडल्याच्या दाखल्यावर आहे तसेच नाव लिहा.',
      officialWording: 'उमेदवाराचे नाव कोणत्याही संक्षेपाशिवाय मॅट्रिक्युलेशन प्रमाणपत्राशी तंतोतंत जुळणे बंधनकारक आहे.',
      whyWeAsk: 'शिष्यवृत्तीचे पैसे थेट तुमच्या शालेय नोंदीशी जोडलेले असतात; स्पेलिंग वेगळे असल्यास प्रक्रिया थांबू शकते.',
      evidenceHint: 'तुमच्या १० वीच्या गुणपत्रिकेची किंवा बोनाफाइड पत्राची पहिली ओळ तपासा.',
      placeholder: 'उदा. रिया संतोष शिंदे',
      formatExample: 'पहिले नाव  वडिलांचे/मधले नाव  आडनाव',
    },
    q_dob: {
      plainQuestion: 'तुमची जन्मतारीख काय आहे?',
      plainHelper: '१ जून २०२६ रोजी तुमचे वय १६ ते २२ वर्षांच्या दरम्यान असावे.',
      officialWording: 'सत्र सुरू होताना १६ ते २२ पूर्ण सौर वर्षे पूर्ण केल्याच्या वैधानिक वयोमर्यादेची पडताळणी.',
      whyWeAsk: 'माध्यमिक आणि तंत्रशिक्षण पूर्ण करणाऱ्या विद्यार्थ्यांना साहाय्य करण्यासाठी ही वयोमर्यादा निश्चित केली आहे.',
      evidenceHint: 'शाळा सोडल्याच्या दाखल्यावर (LC) किंवा आधार कार्डावर छापलेली जन्मतारीख तपासा.',
      formatExample: 'दिवस / महिना / वर्ष',
    },
    q_annual_income: {
      plainQuestion: 'तुमच्या कुटुंबाचे एकूण वार्षिक उत्पन्न (रुपयांमध्ये) किती आहे?',
      plainHelper: 'तहसीलदार कार्यालयाने दिलेल्या अधिकृत उत्पन्न दाखल्यावरील अचूक रक्कम नोंदवा.',
      officialWording: 'मागील आर्थिक वर्षात शेती, व्यापार किंवा वेतनातून सर्व पालकांनी मिळवलेल्या एकूण उत्पन्नाची बेरीज.',
      whyWeAsk: 'कमी उत्पन्न गटातील विद्यार्थ्यांना प्राधान्य देण्यासाठी हा तपशील शासकीय महसूल प्रणालीशी जोडला जातो.',
      evidenceHint: 'तुमच्या तहसीलदार दाखल्यावरील "एकूण वार्षिक उत्पन्न" हा रकाना पहा.',
      placeholder: 'उदा. 140000',
      formatExample: 'केवळ आकडे (उदा. ₹१,४०,००० साठी 140000)',
    },
    q_institution_name: {
      plainQuestion: 'तुम्ही सध्या कोणत्या शाळा, कनिष्ठ महाविद्यालय किंवा पॉलिटेक्निकमध्ये शिकत आहात?',
      plainHelper: 'तुमच्या सध्याच्या शिक्षण संस्थेचे संपूर्ण अधिकृत नाव लिहा.',
      officialWording: 'राज्य माध्यमिक व उच्च माध्यमिक शिक्षण मंडळ किंवा तंत्रशिक्षण संचालनालय मान्यताप्राप्त संस्थेचे नाव.',
      whyWeAsk: 'शिष्यवृत्तीचा दर तुमच्या विशिष्ट महाविद्यालयाच्या अधिकृत शैक्षणिक शुल्क रचनेवर आधारित असतो.',
      evidenceHint: 'तुमच्या बोनाफाइड प्रमाणपत्रावरील संस्थेचा शिक्का पहा.',
      placeholder: 'उदा. शासकीय तंत्रनिकेतन, पुणे',
    },
    q_stream_class: {
      plainQuestion: 'तुम्ही सध्या कोणता अभ्यासक्रम किंवा शाखा शिकत आहात?',
      plainHelper: 'तुमच्या उच्च माध्यमिक किंवा पदविका अभ्यासक्रमाची मुख्य शाखा निवडा.',
      officialWording: 'मंजूर व्यावसायिक, तांत्रिक किंवा सामान्य अभ्यासक्रम रचनेनुसार वर्गीकरण.',
      whyWeAsk: 'वेगवेगळ्या शाखांसाठी (उदा. विज्ञान, कला किंवा अभियांत्रिकी पदविका) पुस्तके व उपकरणांचे अनुदान वेगळे असते.',
      evidenceHint: 'तुमची प्रवेश पावती किंवा कॉलेज ओळखपत्र पहा.',
    },
    q_bank_ifsc: {
      plainQuestion: 'तुमच्या बँक शाखेचा ११ अक्षरी आयएफएससी (IFSC) कोड काय आहे?',
      plainHelper: 'आयएफएससी कोडमुळे पैसे थेट तुमच्या योग्य बँक शाखेत जमा होतात.',
      officialWording: 'अकरा अक्षरी अल्फान्युमेरिक कोड जो संबंधित बँक शाखेचा इलेक्ट्रॉनिक क्लिअरन्स पत्ता दर्शवतो.',
      whyWeAsk: 'शासकीय अनुदानाची रक्कम डायरेक्ट बेनिफिट ट्रान्सफरद्वारे थेट तुमच्या खात्यावर जमा होते.',
      evidenceHint: 'बँक पासबुकच्या पहिल्या पानावर पहा. हा कोड साधारणपणे ४ अक्षरांनी सुरू होतो (उदा. SBIN0001234 किंवा MAHB0000456).',
      placeholder: 'उदा. SBIN0001234',
      formatExample: '४ अक्षरे + ० + ६ आकडे/अक्षरे',
    },
  },
};

export const LOCALIZED_ELIG_QUESTIONS: Record<Locale, Record<string, {
  question: string;
  helper: string;
  options: Record<string, {
    label: string;
    rejectionReason?: string;
  }>;
}>> = {
  en: {
    el_enrolment: {
      question: 'Are you enrolled in Class 11, 12, or an accredited diploma program for 2026–27?',
      helper: 'You must be currently studying in a recognized government or aided school/college.',
      options: {
        yes: { label: 'Yes, I am currently enrolled' },
        not_yet: { label: 'No, but I have received an admission offer' },
        no: { label: 'No, I have discontinued my studies', rejectionReason: 'BrightSteps Grant requires active enrolment in Class 11, 12, or a recognized diploma course.' },
      },
    },
    el_income: {
      question: 'Is your total family annual income ₹2,50,000 or below?',
      helper: 'This is the combined yearly earnings of parents or guardians from all sources.',
      options: {
        yes: { label: 'Yes, family income is ₹2,50,000 or less' },
        unsure: { label: 'I am not sure of the exact amount on the certificate' },
        no: { label: 'No, our family income exceeds ₹2,50,000', rejectionReason: 'The scheme budget is reserved for families with annual income up to ₹2.5 Lakhs.' },
      },
    },
    el_domicile: {
      question: 'Are you an Indian resident residing in Maharashtra or neighbouring districts?',
      helper: 'This demonstration focuses on the Western regional education board area.',
      options: {
        yes: { label: 'Yes, I reside in Maharashtra' },
        other_state: { label: 'I reside in another state of India' },
        no: { label: 'No, living outside India', rejectionReason: 'Grant is restricted to domestic students studying within Indian state jurisdictions.' },
      },
    },
    el_concurrent: {
      question: 'Are you already receiving another full-tuition scholarship for this year?',
      helper: 'Minor books/travel aid is allowed, but double full-tuition claims are not.',
      options: {
        no: { label: 'No, I am not receiving full tuition aid' },
        partial: { label: 'I receive minor travel or book stipend only' },
        yes: { label: 'Yes, I have full tuition covered by another scholarship', rejectionReason: 'Government guidelines prevent dual full-fee scholarship reimbursements.' },
      },
    },
  },
  hi: {
    el_enrolment: {
      question: 'क्या आप वर्ष 2026–27 के लिए कक्षा 11, 12 या किसी मान्यता प्राप्त डिप्लोमा कार्यक्रम में नामांकित हैं?',
      helper: 'आपको किसी मान्यता प्राप्त सरकारी या सहायता प्राप्त स्कूल/कॉलेज में अध्ययनरत होना चाहिए।',
      options: {
        yes: { label: 'हाँ, मैं वर्तमान में नामांकित हूँ' },
        not_yet: { label: 'नहीं, लेकिन मुझे प्रवेश प्रस्ताव मिला है' },
        no: { label: 'नहीं, मैंने पढ़ाई छोड़ दी है', rejectionReason: 'ब्राइटस्टेप्स अनुदान के लिए कक्षा 11, 12 या मान्यता प्राप्त डिप्लोमा में सक्रिय नामांकन आवश्यक है।' },
      },
    },
    el_income: {
      question: 'क्या आपके परिवार की कुल वार्षिक आय ₹2,50,000 या उससे कम है?',
      helper: 'यह सभी स्रोतों से माता-पिता या अभिभावकों की संयुक्त वार्षिक आय है।',
      options: {
        yes: { label: 'हाँ, पारिवारिक आय ₹2,50,000 या कम है' },
        unsure: { label: 'मुझे प्रमाणपत्र पर लिखी सटीक राशि की पुष्टि नहीं है' },
        no: { label: 'नहीं, हमारे परिवार की आय ₹2,50,000 से अधिक है', rejectionReason: 'योजना का बजट ₹2.5 लाख तक की वार्षिक आय वाले परिवारों के लिए आरक्षित है।' },
      },
    },
    el_domicile: {
      question: 'क्या आप महाराष्ट्र या पड़ोसी जिलों में रहने वाले भारतीय निवासी हैं?',
      helper: 'यह प्रदर्शन पश्चिमी क्षेत्रीय शिक्षा बोर्ड क्षेत्र पर केंद्रित है।',
      options: {
        yes: { label: 'हाँ, मैं महाराष्ट्र में रहता हूँ' },
        other_state: { label: 'मैं भारत के किसी अन्य राज्य में रहता हूँ' },
        no: { label: 'नहीं, भारत से बाहर रहता हूँ', rejectionReason: 'अनुदान भारतीय राज्य क्षेत्राधिकार में पढ़ने वाले घरेलू छात्रों तक सीमित है।' },
      },
    },
    el_concurrent: {
      question: 'क्या आप इस वर्ष पहले से ही किसी अन्य पूर्ण-शुल्क छात्रवृत्ति का लाभ ले रहे हैं?',
      helper: 'किताबों या यात्रा के लिए छोटी सहायता की अनुमति है, लेकिन दोहरी पूरी ट्यूशन फीस प्रतिपूर्ति नहीं मिलती।',
      options: {
        no: { label: 'नहीं, मुझे कोई पूर्ण-शुल्क सहायता नहीं मिल रही है' },
        partial: { label: 'मुझे केवल पुस्तकों या यात्रा के लिए आंशिक भत्ता मिलता है' },
        yes: { label: 'हाँ, मुझे किसी अन्य छात्रवृत्ति से पूरी ट्यूशन फीस मिल रही है', rejectionReason: 'सरकारी दिशानिर्देश दोहरी पूर्ण-शुल्क छात्रवृत्ति प्रतिपूर्ति की अनुमति नहीं देते हैं।' },
      },
    },
  },
  mr: {
    el_enrolment: {
      question: 'तुम्ही २०२६–२७ साठी इयत्ता ११ वी, १२ वी किंवा मान्यताप्राप्त पदविका (डिप्लोमा) अभ्यासक्रमात शिकत आहात का?',
      helper: 'तुम्ही मान्यताप्राप्त शासकीय किंवा अनुदानित शाळा/महाविद्यालयात शिकत असणे आवश्यक आहे.',
      options: {
        yes: { label: 'होय, मी सध्या शिकत आहे' },
        not_yet: { label: 'नाही, पण मला प्रवेशाची ऑफर मिळाली आहे' },
        no: { label: 'नाही, मी शिक्षण थांबवले आहे', rejectionReason: 'ब्राइटस्टेप्स अनुदानासाठी इयत्ता ११ वी, १२ वी किंवा मान्यताप्राप्त पदविका अभ्यासक्रमात सक्रिय शिक्षण आवश्यक आहे.' },
      },
    },
    el_income: {
      question: 'तुमच्या कुटुंबाचे एकूण वार्षिक उत्पन्न ₹२,५०,००० किंवा त्यापेक्षा कमी आहे का?',
      helper: 'हे सर्व मार्गांनी मिळणारे आई-वडील किंवा पालकांचे एकत्रित वार्षिक उत्पन्न आहे.',
      options: {
        yes: { label: 'होय, कौटुंबिक उत्पन्न ₹२,५०,००० किंवा कमी आहे' },
        unsure: { label: 'मला दाखल्यावरील अचूक रकमेची खात्री नाही' },
        no: { label: 'नाही, आमचे उत्पन्न ₹२,५०,००० पेक्षा जास्त आहे', rejectionReason: 'योजनेचा निधी ₹२.५ लाखांपर्यंत वार्षिक उत्पन्न असलेल्या कुटुंबांसाठी राखीव आहे.' },
      },
    },
    el_domicile: {
      question: 'तुम्ही महाराष्ट्र किंवा लगतच्या जिल्ह्यातील भारतीय रहिवासी आहात का?',
      helper: 'हे प्रात्यक्षिक पश्चिम विभागीय शिक्षण मंडळाच्या क्षेत्रावर आधारित आहे.',
      options: {
        yes: { label: 'होय, मी महाराष्ट्राचा रहिवासी आहे' },
        other_state: { label: 'मी भारताच्या दुसऱ्या राज्यात राहतो' },
        no: { label: 'नाही, भारताबाहेर राहतो', rejectionReason: 'अनुदान भारतीय राज्य क्षेत्रातील स्थानिक विद्यार्थ्यांसाठी मर्यादित आहे.' },
      },
    },
    el_concurrent: {
      question: 'तुम्हाला या वर्षासाठी इतर कोणतीही संपूर्ण शैक्षणिक शुल्क शिष्यवृत्ती मिळत आहे का?',
      helper: 'पुस्तके किंवा प्रवासासाठी किरकोळ साहाय्य चालते, परंतु दोनदा पूर्ण फी सवलत घेता येत नाही.',
      options: {
        no: { label: 'नाही, मला कोणतीही पूर्ण फी शिष्यवृत्ती मिळत नाही' },
        partial: { label: 'मला केवळ पुस्तके किंवा प्रवासासाठी अल्प भत्ता मिळतो' },
        yes: { label: 'होय, मला दुसऱ्या शिष्यवृत्तीतून पूर्ण फी सवलत मिळते', rejectionReason: 'शासकीय नियमांनुसार एकाच वेळी दोन पूर्ण-शुल्क शिष्यवृत्ती घेता येत नाहीत.' },
      },
    },
  },
};

export const LOCALIZED_DOC_ITEMS: Record<Locale, Record<string, {
  name: string;
  description: string;
  issuer: string;
  acceptedFormats: string;
  exampleDescription: string;
}>> = {
  en: {
    doc_identity: {
      name: 'Identity Verification Card',
      description: 'Any government-approved photo ID with your name and photo clearly legible.',
      issuer: 'UIDAI, State Election Commission, or Head of Recognized Institution',
      acceptedFormats: 'PDF or JPEG/PNG under 2MB',
      exampleDescription: 'Clear rectangle showing photograph, full name, and birth year. No blurred corners.',
    },
    doc_income: {
      name: 'Family Income Certificate',
      description: 'Annual family income certificate issued for the current financial year (2025–26 or 2026–27).',
      issuer: 'Tehsildar, Sub-Divisional Magistrate (SDM), or Competent Revenue Authority',
      acceptedFormats: 'Official revenue document scan (PDF/JPEG)',
      exampleDescription: 'Look for the official revenue seal and the barcoded certificate number at top-right.',
    },
    doc_enrolment: {
      name: 'Current School Bonafide Certificate',
      description: 'Letter signed by your College Principal or School Headmaster confirming active enrolment.',
      issuer: 'Headmaster / Principal of Registered Junior College or Polytechnic',
      acceptedFormats: 'Institutional letterhead with stamp and registration number',
      exampleDescription: 'Contains your Class/Standard, Roll Number, and Principal signature with institutional stamp.',
    },
    doc_bank: {
      name: 'Student Bank Account Proof',
      description: 'First page of student passbook or recent bank statement showing Account Number and IFSC Code.',
      issuer: 'Any Nationalised, Scheduled Commercial, or Post Office Savings Bank',
      acceptedFormats: 'Bank passbook front page or official PDF statement',
      exampleDescription: 'Must display the student name as primary account holder and the 11-character IFSC code.',
    },
  },
  hi: {
    doc_identity: {
      name: 'पहचान सत्यापन पत्र (आईडी)',
      description: 'कोई भी सरकार-मान्य फोटो पहचान पत्र जिसमें आपका नाम और फोटो स्पष्ट दिखाई दे।',
      issuer: 'यूआईडीएआई (आधार), राज्य चुनाव आयोग, या मान्यता प्राप्त संस्थान के प्रमुख',
      acceptedFormats: 'पीडीएफ अथवा जेपीईजी/पीएनजी (2MB से कम)',
      exampleDescription: 'स्पष्ट फोटो, पूरा नाम और जन्म वर्ष दिखाई देना चाहिए। कोने कटे हुए न हों।',
    },
    doc_income: {
      name: 'पारिवारिक आय प्रमाणपत्र',
      description: 'वर्तमान वित्तीय वर्ष (2025–26 या 2026–27) के लिए जारी वार्षिक आय प्रमाणपत्र।',
      issuer: 'तहसीलदार, उप-विभागीय मजिस्ट्रेट (एसडीएम), या सक्षम राजस्व अधिकारी',
      acceptedFormats: 'राजस्व विभाग का आधिकारिक स्कैन (PDF/JPEG)',
      exampleDescription: 'ऊपर दाईं ओर आधिकारिक मुहर और बारकोड वाला प्रमाणपत्र नंबर देखें।',
    },
    doc_enrolment: {
      name: 'कॉलेज/स्कूल बोनाफाइड प्रमाणपत्र',
      description: 'प्राचार्य या मुख्याध्यापक द्वारा हस्ताक्षरित पत्र जो सक्रिय नामांकन की पुष्टि करता हो।',
      issuer: 'पंजीकृत जूनियर कॉलेज या पॉलिटेक्निक के प्राचार्य/मुख्याध्यापक',
      acceptedFormats: 'मुहर और पंजीकरण संख्या वाला आधिकारिक लेटरहेड',
      exampleDescription: 'इसमें आपकी कक्षा, रोल नंबर और प्राचार्य के हस्ताक्षर व मुहर होनी चाहिए।',
    },
    doc_bank: {
      name: 'विद्यार्थी बैंक खाता प्रमाण',
      description: 'पासबुक का पहला पृष्ठ या बैंक विवरण जिसमें खाता संख्या और आईएफएससी कोड स्पष्ट हो।',
      issuer: 'कोई भी राष्ट्रीयकृत, अनुसूचित वाणिज्यिक, या डाकघर बचत बैंक',
      acceptedFormats: 'बैंक पासबुक का पहला पृष्ठ अथवा आधिकारिक पीडीएफ विवरण',
      exampleDescription: 'खाताधारक के रूप में विद्यार्थी का नाम और 11 अक्षरों का आईएफएससी कोड दिखना चाहिए।',
    },
  },
  mr: {
    doc_identity: {
      name: 'ओळख पडताळणी पत्र (आयडी कार्ड)',
      description: 'शासनाने मान्यता दिलेले कोणतेही फोटो ओळखपत्र ज्यावर तुमचे नाव व छायाचित्र स्पष्ट दिसेल.',
      issuer: 'युआयडीएआय (आधार), राज्य निवडणूक आयोग किंवा मान्यताप्राप्त शिक्षण संस्थेचे प्रमुख',
      acceptedFormats: 'पीडीएफ किंवा जेपीईजी/पीएनजी (२ एमबी पेक्षा कमी)',
      exampleDescription: 'स्पष्ट फोटो, पूर्ण नाव आणि जन्माचे वर्ष दिसणारा फोटो दाखवा. कडा कापलेल्या नसाव्यात.',
    },
    doc_income: {
      name: 'कौटुंबिक उत्पन्न दाखला',
      description: 'चालू आर्थिक वर्षासाठी (२०२५–२६ किंवा २०२६–२७) दिलेला अधिकृत वार्षिक उत्पन्न दाखला.',
      issuer: 'तहसीलदार, उपविभागीय दंडाधिकारी (एसडीएम) किंवा सक्षम महसूल अधिकारी',
      acceptedFormats: 'महसूल विभागाचा अधिकृत स्कॅन (PDF/JPEG)',
      exampleDescription: 'उजव्या कोपऱ्यात अधिकृत शिक्का आणि बारकोड असलेला दाखला क्रमांक तपासा.',
    },
    doc_enrolment: {
      name: 'सध्याचे कॉलेज बोनाफाइड प्रमाणपत्र',
      description: 'तुम्ही सध्या शिकत असल्याचे प्रमाणित करणारे प्राचार्य किंवा मुख्याध्यापकांचे स्वाक्षरी केलेले पत्र.',
      issuer: 'नोंदणीकृत कनिष्ठ महाविद्यालय किंवा तंत्रनिकेतनचे प्राचार्य / मुख्याध्यापक',
      acceptedFormats: 'शिक्का आणि नोंदणी क्रमांक असलेले कॉलेजचे लेटरहेड',
      exampleDescription: 'तुमची इयत्ता, हजेरी क्रमांक (Roll No.) आणि प्राचार्यांची स्वाक्षरी व शिक्का असावा.',
    },
    doc_bank: {
      name: 'विद्यार्थी बँक खाते पुरावा',
      description: 'पासबुकचे पहिले पान किंवा बँक स्टेटमेंट ज्यावर बँक खाते क्रमांक आणि आयएफएससी कोड स्पष्ट असेल.',
      issuer: 'कोणतीही राष्ट्रीयीकृत, अनुसूचित व्यावसायिक बँक किंवा पोस्ट ऑफिस बचत बँक',
      acceptedFormats: 'बँक पासबुकचे पहिले पान किंवा अधिकृत पीडीएफ स्टेटमेंट',
      exampleDescription: 'खातेधारक म्हणून विद्यार्थ्याचे नाव आणि ११ अक्षरी आयएफएससी कोड स्पष्ट दिसणे आवश्यक.',
    },
  },
};

export const getLocalizedQuestion = (q: Question, locale: Locale): Question => {
  const loc = LOCALIZED_APP_QUESTIONS[locale]?.[q.id] || LOCALIZED_APP_QUESTIONS.en[q.id];
  if (!loc) return q;
  return {
    ...q,
    plainQuestion: loc.plainQuestion || q.plainQuestion,
    plainHelper: loc.plainHelper || q.plainHelper,
    officialWording: loc.officialWording || q.officialWording,
    whyWeAsk: loc.whyWeAsk || q.whyWeAsk,
    evidenceHint: loc.evidenceHint || q.evidenceHint,
    placeholder: loc.placeholder || q.placeholder,
    formatExample: loc.formatExample || q.formatExample,
  };
};

export const getLocalizedEligibilityQuestion = (q: EligibilityQuestion, locale: Locale): EligibilityQuestion => {
  const loc = LOCALIZED_ELIG_QUESTIONS[locale]?.[q.id] || LOCALIZED_ELIG_QUESTIONS.en[q.id];
  if (!loc) return q;
  return {
    ...q,
    question: loc.question || q.question,
    helper: loc.helper || q.helper,
    options: q.options.map((opt) => {
      const optLoc = loc.options[opt.value];
      return {
        ...opt,
        label: optLoc?.label || opt.label,
        rejectionReason: optLoc?.rejectionReason || opt.rejectionReason,
      };
    }),
  };
};

export const getLocalizedDocument = (doc: DocumentItem, locale: Locale): DocumentItem => {
  const loc = LOCALIZED_DOC_ITEMS[locale]?.[doc.id] || LOCALIZED_DOC_ITEMS.en[doc.id];
  if (!loc) return doc;
  return {
    ...doc,
    name: loc.name || doc.name,
    description: loc.description || doc.description,
    issuer: loc.issuer || doc.issuer,
    acceptedFormats: loc.acceptedFormats || doc.acceptedFormats,
    exampleDescription: loc.exampleDescription || doc.exampleDescription,
  };
};
