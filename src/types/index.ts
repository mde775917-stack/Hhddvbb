export interface SiteSettings {
  madrasaName: string;
  englishName: string;
  eiin: string;
  establishedYear: string;
  location: string;
  phone: string;
  email: string;
  facebookUrl: string;
  youtubeUrl: string;
  whatsappNumber: string;
  logoUrl: string;
  primaryCampusImageUrl: string;
  googleMapEmbedUrl: string;
  slogan: string;
  badgeText: string;
  heroSubtitle: string;
  aboutText: string;
  historyText: string;
  missionText: string;
  visionText: string;
  environmentText: string;
}

export interface ProgramItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  iconName: string;
  category: string;
  eligibility?: string;
  duration?: string;
  enabled: boolean;
  order: number;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  order: number;
}

export interface PrincipalInfo {
  name: string;
  designation: string;
  photoUrl: string;
  message: string;
  qualifications?: string;
  phone?: string;
  email?: string;
}

export interface TeacherItem {
  id: string;
  name: string;
  designation: string;
  subject: string;
  qualification?: string;
  biography?: string;
  photoUrl?: string;
  phone?: string;
  email?: string;
  order: number;
}

export interface NoticeItem {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  fileUrl?: string;
  isImportant?: boolean;
  published: boolean;
  createdAt: number;
}

export interface ExamResultSubject {
  subjectName: string;
  marks: number;
  grade: string;
  gpa: number;
}

export interface ExamResultItem {
  id: string;
  studentName: string;
  rollNumber: string;
  regNumber: string;
  className: string;
  examName: string;
  examYear: string;
  gpa: number;
  grade: string;
  finalResult: 'PASSED' | 'FAILED' | 'PROMOTED';
  subjects: ExamResultSubject[];
  publishedDate: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'মাদ্রাসা ক্যাম্পাস' | 'শিক্ষা কার্যক্রম' | 'অনুষ্ঠান' | 'ক্রীড়া' | 'পুরস্কার বিতরণ' | 'অন্যান্য';
  imageUrl: string;
  caption?: string;
  date?: string;
  order: number;
  isPrimaryCampus?: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl?: string;
  publishedDate?: string;
  description?: string;
  order?: number;
}

export interface AdmissionSettings {
  isAdmissionOpen: boolean;
  currentSession: string;
  noticeText: string;
  eligibility: string;
  requiredDocuments: string[];
  feesDescription: string;
  deadlineDate: string;
  instructions: string;
  availableClasses: string[];
}

export interface AdmissionApplication {
  id: string;
  studentNameBangla: string;
  studentNameEnglish: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: 'ছাত্র' | 'ছাত্রী';
  bloodGroup?: string;
  mobileNumber: string;
  emergencyContact?: string;
  presentAddress: string;
  permanentAddress: string;
  desiredClass: string;
  previousInstitution?: string;
  previousExamGpa?: string;
  photoUrl?: string;
  submittedAt: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  notes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject?: string;
  message: string;
  submittedAt: number;
  isRead: boolean;
}
