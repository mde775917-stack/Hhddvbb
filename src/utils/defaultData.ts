import {
  SiteSettings,
  ProgramItem,
  WhyChooseItem,
  PrincipalInfo,
  NoticeItem,
  GalleryItem,
  AdmissionSettings,
  TeacherItem,
  ExamResultItem,
  VideoItem,
} from '../types';
import { DEFAULT_CAMPUS_IMAGE_URL } from './campusImage';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  madrasaName: 'আছিম পাটুলী ফাজিল (ডিগ্রী) মাদরাসা',
  englishName: 'Achim Patuli Fazil (Degree) Madrasah',
  eiin: '১১১৪৭২',
  establishedYear: '১৯৫২',
  location: 'আছিম পাটুলী, ফুলবাড়ীয়া, ময়মনসিংহ, বাংলাদেশ',
  phone: '01799669733',
  email: '',
  facebookUrl: '',
  youtubeUrl: '',
  whatsappNumber: '01799669733',
  logoUrl: '',
  primaryCampusImageUrl: DEFAULT_CAMPUS_IMAGE_URL,
  googleMapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14488.94823528406!2d90.285495!3d24.582845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3756350c3d9b04f1%3A0x6b1ec646ad19bc76!2z4KaG4Kab4Ka_4KauIOCmq-CngeCmsuCmrOCmvuCnnOCmvOCmvg!5e0!3m2!1sbn!2sbd!4v1710000000000!5m2!1sbn!2sbd',
  slogan: 'জ্ঞান, নৈতিকতা ও ইসলামী শিক্ষার সমন্বয়ে একটি আদর্শ শিক্ষা প্রতিষ্ঠান',
  badgeText: 'ইসলামী ও প্রাতিষ্ঠানিক শিক্ষার সমন্বিত প্রতিষ্ঠান',
  heroSubtitle: 'জ্ঞান, নৈতিকতা ও ইসলামী শিক্ষার সমন্বয়ে একটি আদর্শ শিক্ষা প্রতিষ্ঠান',
  aboutText:
    'আছিম পাটুলী ফাজিল (ডিগ্রী) মাদরাসা ময়মনসিংহ জেলার ফুলবাড়ীয়া উপজেলার আছিম পাটুলী এলাকায় অবস্থিত একটি ইসলামী শিক্ষা প্রতিষ্ঠান। শিক্ষার্থীদের জ্ঞান অর্জনের পাশাপাশি নৈতিকতা, শৃঙ্খলা ও মানবিক মূল্যবোধ গড়ে তোলার প্রতি গুরুত্ব দেওয়া হয়।',
  historyText:
    'অত্র অঞ্চলের দ্বীনি ও আধুনিক শিক্ষার আলোকবর্তিকা হিসেবে প্রতিষ্ঠানটি প্রতিষ্ঠিত হয়ে দীর্ঘ সময় ধরে সততা, প্রজ্ঞা ও নিষ্ঠার সাথে শিক্ষার্থী গড়ে তুলছে।',
  missionText:
    'ইসলামী তাহযীব-তমাদ্দুন ও সুন্নাতে নববীর অনুসরণে যুগোপযোগী শিক্ষাদানের মাধ্যমে শিক্ষার্থীদের চরিত্রবান, আদর্শ নাগরিক ও দক্ষ আলেম হিসেবে গড়ে তোলা।',
  visionText:
    'জ্ঞান, প্রযুক্তি ও নৈতিক শিক্ষার অপূর্ব মেলবন্ধনে প্রতিটি শিক্ষার্থীকে দুনিয়া ও আখেরাতের কল্যাণে প্রতিষ্ঠিত করা।',
  environmentText:
    'কোলাহলমুক্ত সুপরিসর মনোরম ক্যাম্পাস, সবুজ প্রাঙ্গণ ও নিরাপদ ইসলামী অনুশাসনভিত্তিক অনুকূল পাঠদান পরিবেশ।',
};

export const DEFAULT_PROGRAMS: ProgramItem[] = [
  {
    id: 'prog-1',
    title: 'নূরানী শিক্ষা',
    subtitle: 'প্রাথমিক কুরআন ও দ্বীনি শিক্ষা',
    description: 'সহিহ কুরআন তেলাওয়াত, কায়দা, আমপারা ও মৌলিক মাসয়ালা-মাসায়েল পাঠদান।',
    iconName: 'BookOpen',
    category: 'নূরানী',
    eligibility: 'বয়স ৪-৭ বছর',
    duration: '১-২ বছর',
    enabled: true,
    order: 1,
  },
  {
    id: 'prog-2',
    title: 'নাজেরা বিভাগ',
    subtitle: 'কুরআনুল কারীম নির্ভুল পঠন',
    description: 'তাজবীদ অনুযায়ী সম্পূর্ণ আল-কুরআনুল কারীম শুদ্ধ ও সুললিত কণ্ঠে পাঠের প্রশিক্ষণ।',
    iconName: 'Sparkles',
    category: 'নাজেরা',
    eligibility: 'নূরানী উত্তীর্ণ',
    duration: '১ বছর',
    enabled: true,
    order: 2,
  },
  {
    id: 'prog-3',
    title: 'হিফজুল কুরআন',
    subtitle: 'কুরআন মুখস্থকরণ ও হুফফাজ তৈরি',
    description: 'দক্ষ ও অভিজ্ঞ হাফেজ শিক্ষকদের তত্ত্বাবধানে পূর্ণাঙ্গ কুরআনুল কারীম হিফজ সম্পন্নকরণ।',
    iconName: 'Bookmark',
    category: 'হিফজ',
    eligibility: 'নাজেরা সম্পন্ন',
    duration: '২-৩ বছর',
    enabled: true,
    order: 3,
  },
  {
    id: 'prog-4',
    title: 'কিতাব বিভাগ',
    subtitle: 'দারসে নেজামী পাঠক্রম',
    description: 'মৌলিক কিতাব, কাওয়াইদ, আক্বাইদ ও ফিকহের প্রামাণ্য গ্রন্থসমূহের পদ্ধতিগত অধ্যয়ন।',
    iconName: 'Library',
    category: 'কিতাব',
    eligibility: 'হিফজ বা ৫ম শ্রেণি সমমান',
    duration: 'শ্রেণি অনুযায়ী',
    enabled: true,
    order: 4,
  },
  {
    id: 'prog-5',
    title: 'আরবি শিক্ষা',
    subtitle: 'আরবি ভাষা ও সাহিত্যের গভীর চর্চা',
    description: 'আরবি ব্যাকরণ (নাহু-সরফ), কথোপকথন, সাহিত্য ও তরজমা শিক্ষার নিবিড় চর্চা।',
    iconName: 'Languages',
    category: 'আরবি',
    eligibility: 'সকল বিভাগের ছাত্র/ছাত্রী',
    duration: 'চলমান',
    enabled: true,
    order: 5,
  },
  {
    id: 'prog-6',
    title: 'ফাজিল (ডিগ্রী) শিক্ষা',
    subtitle: 'ইসলামী আরবি বিশ্ববিদ্যালয় অধিভুক্ত স্নাতক কোর্স',
    description: 'ইসলামিক স্টাডিজ, তাফসির, হাদিস, আরবি সাহিত্য ও সাধারণ ডিগ্রীর সমন্বিত উচ্চশিক্ষা।',
    iconName: 'GraduationCap',
    category: 'ডিগ্রী',
    eligibility: 'আলিম বা সমমান উত্তীর্ণ',
    duration: '৩ বছর',
    enabled: true,
    order: 6,
  },
  {
    id: 'prog-7',
    title: 'ইসলামী শিক্ষা',
    subtitle: 'আকাইদ ও আদর্শ জীবন বিধান',
    description: 'কুরআন, সুন্নাহ ও ইসলামী ফিকাহভিত্তিক ব্যবহারিক জীবনাচার শিক্ষা।',
    iconName: 'Moon',
    category: 'ইসলামী',
    eligibility: 'উন্মুক্ত',
    duration: 'নিয়মিত',
    enabled: true,
    order: 7,
  },
  {
    id: 'prog-8',
    title: 'সাধারণ শিক্ষা',
    subtitle: 'বাংলা, ইংরেজি, গণিত ও তথ্যপ্রযুক্তি',
    description: 'মাদ্রাসা শিক্ষা বোর্ড নির্ধারিত কারিকুলাম অনুযায়ী জাতীয় মানের সাধারণ বিষয়াবলি।',
    iconName: 'Compass',
    category: 'সাধারণ',
    eligibility: 'ইবতেদায়ী থেকে ফাজিল',
    duration: 'শিক্ষাবর্ষ ভিত্তিক',
    enabled: true,
    order: 8,
  },
];

export const DEFAULT_WHY_CHOOSE: WhyChooseItem[] = [
  {
    id: 'why-1',
    title: 'ইসলামী মূল্যবোধ',
    description: 'সুন্নাতে নববীর আলোকে আমল, আখলাক ও তাকওয়াপূর্ণ জীবনের দীক্ষা দেওয়া হয়।',
    iconName: 'HeartHandshake',
    order: 1,
  },
  {
    id: 'why-2',
    title: 'নৈতিক শিক্ষা',
    description: 'সত্যবাদিতা, পিতা-মাতার আনুগত্য ও দেশপ্রেমসহ মানবিক গুণাবলির বিকাশ।',
    iconName: 'ShieldCheck',
    order: 2,
  },
  {
    id: 'why-3',
    title: 'শৃঙ্খলাপূর্ণ পরিবেশ',
    description: 'একটি সুশৃঙ্খল ও নিয়মানুবর্তী শান্তিপূর্ণ শিক্ষা ও ছাত্রাবাস ব্যবস্থা।',
    iconName: 'Clock',
    order: 3,
  },
  {
    id: 'why-4',
    title: 'অভিজ্ঞ শিক্ষক',
    description: 'বিখ্যাত দ্বীনি প্রতিষ্ঠান ও বিশ্ববিদ্যালয় হতে সনদপ্রাপ্ত নিষ্ঠাবান শিক্ষকমণ্ডলী।',
    iconName: 'Users',
    order: 4,
  },
  {
    id: 'why-5',
    title: 'মানসম্মত শিক্ষা',
    description: 'ধর্মীয় শিক্ষার সাথে জাতীয় শিক্ষাক্রমের আধুনিক বিষয়ের চমৎকার সমন্বয়।',
    iconName: 'Award',
    order: 5,
  },
  {
    id: 'why-6',
    title: 'নিয়মিত মূল্যায়ন',
    description: 'সাপ্তাহিক ও মাসিক পরীক্ষার মাধ্যমে শিক্ষার্থীদের ধারাবাহিক অগ্রগতি পর্যবেক্ষণ।',
    iconName: 'CheckCircle2',
    order: 6,
  },
];

export const DEFAULT_PRINCIPAL_INFO: PrincipalInfo = {
  name: 'মোঃ ইসমাইল হোসেন',
  designation: 'অধ্যক্ষ / প্রতিষ্ঠান প্রধান',
  photoUrl: '',
  message:
    'বিসমিল্লাহির রাহমানির রাহিম। আছিম পাটুলী ফাজিল (ডিগ্রী) মাদরাসার পক্ষ থেকে সবাইকে আন্তরিক সালাম ও মোবারকবাদ। অত্র প্রতিষ্ঠানটি ইসলামী আদর্শ ও সাধারণ শিক্ষার অপূর্ব মেলবন্ধনে সৎ, যোগ্য, চরিত্রবান ও দেশপ্রেমিক ভবিষ্যৎ নাগরিক গড়ার প্রত্যয়ে নিরলস কাজ করে যাচ্ছে। আমাদের লক্ষ্য কেবল প্রাতিষ্ঠানিক ডিগ্রি অর্জন নয়, বরং আত্মার পরিশুদ্ধি ও আল্লাহভীরু আলেম ও আদর্শ মানুষ তৈরি করা। সকল শিক্ষক, অভিভাবক ও শুভানুধ্যায়ীদের প্রতি আমার আন্তরিক কৃতজ্ঞতা রইল।',
  qualifications: 'অধ্যক্ষ / প্রতিষ্ঠান প্রধান',
  phone: '01799669733',
  email: '',
};

export const DEFAULT_NOTICES: NoticeItem[] = [
  {
    id: 'notice-1',
    title: '২০২৬ শিক্ষাবর্ষে সকল বিভাগে ভর্তি চলছে',
    date: '২০২৬-০১-১৫',
    category: 'ভর্তি বিজ্ঞপ্তি',
    description:
      'আছিম পাটুলী ফাজিল (ডিগ্রী) মাদরাসায় নূরানী, নাজেরা, হিফজ, কিতাব ও ফাজিল ক্লাসে নতুন শিক্ষাবর্ষের ভর্তি কার্যক্রম শুরু হয়েছে। আগ্রহী ছাত্র-ছাত্রীদের নির্ধারিত সময়ের মধ্যে ফরম পূরণ করে ভর্তি হতে অনুরোধ করা হচ্ছে।',
    fileUrl: '',
    isImportant: true,
    published: true,
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'notice-2',
    title: 'ইসলামী আরবি বিশ্ববিদ্যালয়ের ফাজিল পরীক্ষার সময়সূচি প্রকাশ',
    date: '২০২৬-০২-০১',
    category: 'পরীক্ষা সংক্রান্ত',
    description:
      'ফাজিল (ডিগ্রী) শিক্ষার্থীদের পরীক্ষার রুটিন ও প্রবেশপত্র বিতরণ সংক্রান্ত বিজ্ঞপ্তি। সংশ্লিষ্ট সকলকে যথাসময়ে অফিস থেকে প্রবেশপত্র সংগ্রহের জন্য বলা হলো।',
    fileUrl: '',
    isImportant: false,
    published: true,
    createdAt: Date.now() - 86400000 * 10,
  },
  {
    id: 'notice-3',
    title: 'অভিভাবক সমাবেশ ও বিশেষ দোয়া মাহফিল',
    date: '২০২৬-০২-১০',
    category: 'সাধারণ নোটিশ',
    description:
      'শিক্ষার্থীদের পড়াশোনার মানোন্নয়ন ও সার্বিক শৃঙ্খলা রক্ষার্থে সম্মানিত অভিভাবকগণের উপস্থিতিতে বিশেষ সমাবেশ অনুষ্ঠিত হবে।',
    fileUrl: '',
    isImportant: false,
    published: true,
    createdAt: Date.now() - 86400000 * 15,
  },
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'আছিম পাটুলী ফাজিল (ডিগ্রী) মাদরাসা মূল ক্যাম্পাস ও অফিসিয়াল সাইনবোর্ড',
    category: 'মাদ্রাসা ক্যাম্পাস',
    imageUrl: DEFAULT_CAMPUS_IMAGE_URL,
    caption: 'আছিম পাটুলী ফাজিল (ডিগ্রী) মাদরাসার মূল প্রবেশ ফটক ও অফিসিয়াল সাইনবোর্ড (স্থাপিত: ১৯৬২ ইং, ডাকঘর: আছিম, উপজেলা: ফুলবাড়ীয়া, জেলা: ময়মনসিংহ)।',
    date: '২০২৬',
    order: 1,
    isPrimaryCampus: true,
  },
];

export const DEFAULT_ADMISSION_SETTINGS: AdmissionSettings = {
  isAdmissionOpen: true,
  currentSession: '২০২৬-২০২৭ শিক্ষাবর্ষ',
  noticeText:
    'আছিম পাটুলী ফাজিল (ডিগ্রী) মাদরাসায় নূরানী, নাজেরা, হিফজ, কিতাব বিভাগ এবং ফাজিল (ডিগ্রী) শ্রেণীতে সীমিত আসনে ভর্তি চলছে। সুশৃঙ্খল পরিবেশ ও সুন্নাহভিত্তিক পাঠদানে আপনার সন্তানকে ভর্তি করাতে এখনই অনলাইনে আবেদন করুন অথবা মাদরাসা কার্যালয়ে যোগাযোগ করুন।',
  eligibility:
    '১. নূরানী ও নাজেরা বিভাগে পূর্ব প্রাতিষ্ঠানিক যোগ্যতার বাধ্যবাধকতা নেই।\n২. কিতাব ও ফাজিল ক্লাসের ক্ষেত্রে পূর্ববর্তী ক্লাসের উত্তীর্ণ সনদ বা সমমানের যোগ্যতা প্রযোজ্য।',
  requiredDocuments: [
    'শিক্ষার্থীর জন্ম নিবন্ধন সনদের ফটোকপি',
    'পিতা ও মাতার জাতীয় পরিচয়পত্রের (NID) ফটোকপি',
    'পাসপোর্ট সাইজের রঙিন ছবি (২ কপি)',
    'পূর্ববর্তী প্রতিষ্ঠানের প্রশংসাপত্র বা ছাড়পত্র (প্রযোজ্য ক্ষেত্রে)',
    'পূর্ববর্তী বোর্ড পরীক্ষার প্রবেশপত্র বা নম্বরপত্র (প্রযোজ্য ক্ষেত্রে)',
  ],
  feesDescription: 'ভর্তি ফি ও মাসিক বেতন প্রশাসনিক অফিস থেকে নির্ধারণপূর্বক সরাসরি জমা নেওয়া হয়।',
  deadlineDate: '২০২৬-০৩-৩০',
  instructions:
    'অনলাইন ফরমটি নির্ভুলভাবে পূরণ করুন। আবেদন সাবমিট করার পর অফিসিয়াল মোবাইল নম্বরে যোগাযোগ করে ভর্তির নিশ্চয়তা গ্রহণ করুন।',
  availableClasses: [
    'নূরানী বিভাগ',
    'নাজেরা বিভাগ',
    'হিফজুল কুরআন বিভাগ',
    'ইবতেদায়ী ১ম - ৫ম শ্রেণি',
    'দাখিল ৬ষ্ঠ - ১০ম শ্রেণি',
    'আলিম শ্রেণি',
    'ফাজিল (ডিগ্রী) ১ম বর্ষ',
    'ফাজিল (ডিগ্রী) ২য় বর্ষ',
    'ফাজিল (ডিগ্রী) ৩য় বর্ষ',
  ],
};

// As instructed: "Do NOT invent teacher names"
export const DEFAULT_TEACHERS: TeacherItem[] = [];

// As instructed: "Do not add fake student results"
export const DEFAULT_RESULTS: ExamResultItem[] = [];

export const DEFAULT_VIDEOS: VideoItem[] = [];
