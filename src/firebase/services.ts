import {
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './config';
import {
  SiteSettings,
  ProgramItem,
  WhyChooseItem,
  PrincipalInfo,
  TeacherItem,
  NoticeItem,
  ExamResultItem,
  GalleryItem,
  VideoItem,
  AdmissionSettings,
  AdmissionApplication,
  ContactMessage,
} from '../types';
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_PROGRAMS,
  DEFAULT_WHY_CHOOSE,
  DEFAULT_PRINCIPAL_INFO,
  DEFAULT_NOTICES,
  DEFAULT_GALLERY,
  DEFAULT_ADMISSION_SETTINGS,
  DEFAULT_TEACHERS,
  DEFAULT_RESULTS,
  DEFAULT_VIDEOS,
} from '../utils/defaultData';

const LOCAL_STORAGE_KEY_PREFIX = 'achim_patuli_madrasah_';

function getLocal<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (err) {
    console.warn('LocalStorage error:', err);
  }
}

// Site Settings
export async function fetchSiteSettings(): Promise<SiteSettings> {
  const local = getLocal<SiteSettings>('settings', DEFAULT_SITE_SETTINGS);
  if (!db) return local;

  try {
    const docRef = doc(db, 'siteSettings', 'main');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as SiteSettings;
      setLocal('settings', data);
      return data;
    }
  } catch (error) {
    console.warn('Firestore settings fetch fallback to local:', error);
  }
  return local;
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  setLocal('settings', settings);
  if (!db) return;
  try {
    const docRef = doc(db, 'siteSettings', 'main');
    await setDoc(docRef, settings, { merge: true });
  } catch (error) {
    console.warn('Firestore settings save warning:', error);
  }
}

// Programs
export async function fetchPrograms(): Promise<ProgramItem[]> {
  const local = getLocal<ProgramItem[]>('programs', DEFAULT_PROGRAMS);
  if (!db) return local;
  try {
    const querySnapshot = await getDocs(collection(db, 'programs'));
    if (!querySnapshot.empty) {
      const items: ProgramItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...(doc.data() as ProgramItem), id: doc.id });
      });
      items.sort((a, b) => a.order - b.order);
      setLocal('programs', items);
      return items;
    }
  } catch (error) {
    console.warn('Firestore programs fetch fallback:', error);
  }
  return local;
}

export async function savePrograms(programs: ProgramItem[]): Promise<void> {
  setLocal('programs', programs);
  if (!db) return;
  try {
    for (const prog of programs) {
      await setDoc(doc(db, 'programs', prog.id), prog, { merge: true });
    }
  } catch (error) {
    console.warn('Firestore programs save warning:', error);
  }
}

export async function deleteProgram(id: string): Promise<void> {
  const current = getLocal<ProgramItem[]>('programs', DEFAULT_PROGRAMS);
  const updated = current.filter((p) => p.id !== id);
  setLocal('programs', updated);
  if (!db) return;
  try {
    await deleteDoc(doc(db, 'programs', id));
  } catch (error) {
    console.warn('Firestore program delete error:', error);
  }
}

// Why Choose Us
export async function fetchWhyChoose(): Promise<WhyChooseItem[]> {
  const local = getLocal<WhyChooseItem[]>('whyChoose', DEFAULT_WHY_CHOOSE);
  if (!db) return local;
  try {
    const querySnapshot = await getDocs(collection(db, 'whyChoose'));
    if (!querySnapshot.empty) {
      const items: WhyChooseItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...(doc.data() as WhyChooseItem), id: doc.id });
      });
      items.sort((a, b) => a.order - b.order);
      setLocal('whyChoose', items);
      return items;
    }
  } catch (error) {
    console.warn('Firestore whyChoose fetch fallback:', error);
  }
  return local;
}

export async function saveWhyChoose(items: WhyChooseItem[]): Promise<void> {
  setLocal('whyChoose', items);
  if (!db) return;
  try {
    for (const item of items) {
      await setDoc(doc(db, 'whyChoose', item.id), item, { merge: true });
    }
  } catch (error) {
    console.warn('Firestore whyChoose save warning:', error);
  }
}

// Principal Info
export async function fetchPrincipalInfo(): Promise<PrincipalInfo> {
  const local = getLocal<PrincipalInfo>('principal', DEFAULT_PRINCIPAL_INFO);
  if (!db) return local;
  try {
    const docRef = doc(db, 'principal', 'main');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as PrincipalInfo;
      setLocal('principal', data);
      return data;
    }
  } catch (error) {
    console.warn('Firestore principal fetch fallback:', error);
  }
  return local;
}

export async function savePrincipalInfo(info: PrincipalInfo): Promise<void> {
  setLocal('principal', info);
  if (!db) return;
  try {
    await setDoc(doc(db, 'principal', 'main'), info, { merge: true });
  } catch (error) {
    console.warn('Firestore principal save warning:', error);
  }
}

// Teachers (No fake teachers created by default)
export async function fetchTeachers(): Promise<TeacherItem[]> {
  const local = getLocal<TeacherItem[]>('teachers', DEFAULT_TEACHERS);
  if (!db) return local;
  try {
    const querySnapshot = await getDocs(collection(db, 'teachers'));
    if (!querySnapshot.empty) {
      const items: TeacherItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...(doc.data() as TeacherItem), id: doc.id });
      });
      items.sort((a, b) => a.order - b.order);
      setLocal('teachers', items);
      return items;
    }
  } catch (error) {
    console.warn('Firestore teachers fetch fallback:', error);
  }
  return local;
}

export async function saveTeacher(teacher: TeacherItem): Promise<void> {
  const current = getLocal<TeacherItem[]>('teachers', DEFAULT_TEACHERS);
  const index = current.findIndex((t) => t.id === teacher.id);
  const updated = index >= 0 ? current.map((t) => (t.id === teacher.id ? teacher : t)) : [...current, teacher];
  setLocal('teachers', updated);
  if (!db) return;
  try {
    await setDoc(doc(db, 'teachers', teacher.id), teacher, { merge: true });
  } catch (error) {
    console.warn('Firestore teacher save warning:', error);
  }
}

export async function deleteTeacher(id: string): Promise<void> {
  const current = getLocal<TeacherItem[]>('teachers', DEFAULT_TEACHERS);
  const updated = current.filter((t) => t.id !== id);
  setLocal('teachers', updated);
  if (!db) return;
  try {
    await deleteDoc(doc(db, 'teachers', id));
  } catch (error) {
    console.warn('Firestore teacher delete warning:', error);
  }
}

// Notices
export async function fetchNotices(): Promise<NoticeItem[]> {
  const local = getLocal<NoticeItem[]>('notices', DEFAULT_NOTICES);
  if (!db) return local;
  try {
    const querySnapshot = await getDocs(collection(db, 'notices'));
    if (!querySnapshot.empty) {
      const items: NoticeItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...(doc.data() as NoticeItem), id: doc.id });
      });
      items.sort((a, b) => b.createdAt - a.createdAt);
      setLocal('notices', items);
      return items;
    }
  } catch (error) {
    console.warn('Firestore notices fetch fallback:', error);
  }
  return local;
}

export async function saveNotice(notice: NoticeItem): Promise<void> {
  const current = getLocal<NoticeItem[]>('notices', DEFAULT_NOTICES);
  const index = current.findIndex((n) => n.id === notice.id);
  const updated = index >= 0 ? current.map((n) => (n.id === notice.id ? notice : n)) : [notice, ...current];
  setLocal('notices', updated);
  if (!db) return;
  try {
    await setDoc(doc(db, 'notices', notice.id), notice, { merge: true });
  } catch (error) {
    console.warn('Firestore notice save warning:', error);
  }
}

export async function deleteNotice(id: string): Promise<void> {
  const current = getLocal<NoticeItem[]>('notices', DEFAULT_NOTICES);
  const updated = current.filter((n) => n.id !== id);
  setLocal('notices', updated);
  if (!db) return;
  try {
    await deleteDoc(doc(db, 'notices', id));
  } catch (error) {
    console.warn('Firestore notice delete warning:', error);
  }
}

// Gallery
export async function fetchGallery(): Promise<GalleryItem[]> {
  const local = getLocal<GalleryItem[]>('gallery', DEFAULT_GALLERY);
  if (!db) return local;
  try {
    const querySnapshot = await getDocs(collection(db, 'gallery'));
    if (!querySnapshot.empty) {
      const items: GalleryItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...(doc.data() as GalleryItem), id: doc.id });
      });
      items.sort((a, b) => a.order - b.order);
      setLocal('gallery', items);
      return items;
    }
  } catch (error) {
    console.warn('Firestore gallery fetch fallback:', error);
  }
  return local;
}

export async function saveGalleryItem(item: GalleryItem): Promise<void> {
  const current = getLocal<GalleryItem[]>('gallery', DEFAULT_GALLERY);
  const index = current.findIndex((g) => g.id === item.id);
  const updated = index >= 0 ? current.map((g) => (g.id === item.id ? item : g)) : [...current, item];
  setLocal('gallery', updated);
  if (!db) return;
  try {
    await setDoc(doc(db, 'gallery', item.id), item, { merge: true });
  } catch (error) {
    console.warn('Firestore gallery save warning:', error);
  }
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const current = getLocal<GalleryItem[]>('gallery', DEFAULT_GALLERY);
  const updated = current.filter((g) => g.id !== id);
  setLocal('gallery', updated);
  if (!db) return;
  try {
    await deleteDoc(doc(db, 'gallery', id));
  } catch (error) {
    console.warn('Firestore gallery delete warning:', error);
  }
}

// Exam Results
export async function fetchResults(): Promise<ExamResultItem[]> {
  const local = getLocal<ExamResultItem[]>('results', DEFAULT_RESULTS);
  if (!db) return local;
  try {
    const querySnapshot = await getDocs(collection(db, 'results'));
    if (!querySnapshot.empty) {
      const items: ExamResultItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...(doc.data() as ExamResultItem), id: doc.id });
      });
      setLocal('results', items);
      return items;
    }
  } catch (error) {
    console.warn('Firestore results fetch fallback:', error);
  }
  return local;
}

export async function saveResult(item: ExamResultItem): Promise<void> {
  const current = getLocal<ExamResultItem[]>('results', DEFAULT_RESULTS);
  const index = current.findIndex((r) => r.id === item.id);
  const updated = index >= 0 ? current.map((r) => (r.id === item.id ? item : r)) : [item, ...current];
  setLocal('results', updated);
  if (!db) return;
  try {
    await setDoc(doc(db, 'results', item.id), item, { merge: true });
  } catch (error) {
    console.warn('Firestore result save warning:', error);
  }
}

export async function deleteResult(id: string): Promise<void> {
  const current = getLocal<ExamResultItem[]>('results', DEFAULT_RESULTS);
  const updated = current.filter((r) => r.id !== id);
  setLocal('results', updated);
  if (!db) return;
  try {
    await deleteDoc(doc(db, 'results', id));
  } catch (error) {
    console.warn('Firestore result delete warning:', error);
  }
}

// Videos
export async function fetchVideos(): Promise<VideoItem[]> {
  const local = getLocal<VideoItem[]>('videos', DEFAULT_VIDEOS);
  if (!db) return local;
  try {
    const querySnapshot = await getDocs(collection(db, 'videos'));
    if (!querySnapshot.empty) {
      const items: VideoItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...(doc.data() as VideoItem), id: doc.id });
      });
      setLocal('videos', items);
      return items;
    }
  } catch (error) {
    console.warn('Firestore videos fetch fallback:', error);
  }
  return local;
}

export async function saveVideo(video: VideoItem): Promise<void> {
  const current = getLocal<VideoItem[]>('videos', DEFAULT_VIDEOS);
  const index = current.findIndex((v) => v.id === video.id);
  const updated = index >= 0 ? current.map((v) => (v.id === video.id ? video : v)) : [video, ...current];
  setLocal('videos', updated);
  if (!db) return;
  try {
    await setDoc(doc(db, 'videos', video.id), video, { merge: true });
  } catch (error) {
    console.warn('Firestore video save warning:', error);
  }
}

export async function deleteVideo(id: string): Promise<void> {
  const current = getLocal<VideoItem[]>('videos', DEFAULT_VIDEOS);
  const updated = current.filter((v) => v.id !== id);
  setLocal('videos', updated);
  if (!db) return;
  try {
    await deleteDoc(doc(db, 'videos', id));
  } catch (error) {
    console.warn('Firestore video delete warning:', error);
  }
}

// Admission Settings
export async function fetchAdmissionSettings(): Promise<AdmissionSettings> {
  const local = getLocal<AdmissionSettings>('admissionSettings', DEFAULT_ADMISSION_SETTINGS);
  if (!db) return local;
  try {
    const docRef = doc(db, 'siteSettings', 'admissions');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as AdmissionSettings;
      setLocal('admissionSettings', data);
      return data;
    }
  } catch (error) {
    console.warn('Firestore admission settings fetch fallback:', error);
  }
  return local;
}

export async function saveAdmissionSettings(settings: AdmissionSettings): Promise<void> {
  setLocal('admissionSettings', settings);
  if (!db) return;
  try {
    await setDoc(doc(db, 'siteSettings', 'admissions'), settings, { merge: true });
  } catch (error) {
    console.warn('Firestore admission settings save warning:', error);
  }
}

// Admission Applications
export async function submitAdmissionApplication(
  appData: Omit<AdmissionApplication, 'id' | 'submittedAt' | 'status'>
): Promise<string> {
  const newApp: AdmissionApplication = {
    ...appData,
    id: 'app-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    submittedAt: Date.now(),
    status: 'PENDING',
  };

  const current = getLocal<AdmissionApplication[]>('admissionApps', []);
  setLocal('admissionApps', [newApp, ...current]);

  if (db) {
    try {
      await addDoc(collection(db, 'admissions'), newApp);
    } catch (error) {
      console.warn('Firestore admission submit warning, stored locally:', error);
    }
  }
  return newApp.id;
}

export async function fetchAdmissionApplications(): Promise<AdmissionApplication[]> {
  const local = getLocal<AdmissionApplication[]>('admissionApps', []);
  if (!db) return local;
  try {
    const querySnapshot = await getDocs(collection(db, 'admissions'));
    if (!querySnapshot.empty) {
      const items: AdmissionApplication[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...(doc.data() as AdmissionApplication), id: doc.id });
      });
      items.sort((a, b) => b.submittedAt - a.submittedAt);
      setLocal('admissionApps', items);
      return items;
    }
  } catch (error) {
    console.warn('Firestore admission applications fetch fallback:', error);
  }
  return local;
}

export async function updateAdmissionApplicationStatus(
  id: string,
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
): Promise<void> {
  const current = getLocal<AdmissionApplication[]>('admissionApps', []);
  const updated = current.map((a) => (a.id === id ? { ...a, status } : a));
  setLocal('admissionApps', updated);
  if (!db) return;
  try {
    await setDoc(doc(db, 'admissions', id), { status }, { merge: true });
  } catch (error) {
    console.warn('Firestore update admission app status warning:', error);
  }
}

export async function deleteAdmissionApplication(id: string): Promise<void> {
  const current = getLocal<AdmissionApplication[]>('admissionApps', []);
  const updated = current.filter((a) => a.id !== id);
  setLocal('admissionApps', updated);
  if (!db) return;
  try {
    await deleteDoc(doc(db, 'admissions', id));
  } catch (error) {
    console.warn('Firestore delete admission app warning:', error);
  }
}

// Contact Messages
export async function submitContactMessage(
  msg: Omit<ContactMessage, 'id' | 'submittedAt' | 'isRead'>
): Promise<string> {
  const newMsg: ContactMessage = {
    ...msg,
    id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    submittedAt: Date.now(),
    isRead: false,
  };

  const current = getLocal<ContactMessage[]>('messages', []);
  setLocal('messages', [newMsg, ...current]);

  if (db) {
    try {
      await addDoc(collection(db, 'messages'), newMsg);
    } catch (error) {
      console.warn('Firestore contact message submit warning:', error);
    }
  }
  return newMsg.id;
}

export async function fetchContactMessages(): Promise<ContactMessage[]> {
  const local = getLocal<ContactMessage[]>('messages', []);
  if (!db) return local;
  try {
    const querySnapshot = await getDocs(collection(db, 'messages'));
    if (!querySnapshot.empty) {
      const items: ContactMessage[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...(doc.data() as ContactMessage), id: doc.id });
      });
      items.sort((a, b) => b.submittedAt - a.submittedAt);
      setLocal('messages', items);
      return items;
    }
  } catch (error) {
    console.warn('Firestore contact messages fetch fallback:', error);
  }
  return local;
}

export async function markContactMessageRead(id: string): Promise<void> {
  const current = getLocal<ContactMessage[]>('messages', []);
  const updated = current.map((m) => (m.id === id ? { ...m, isRead: true } : m));
  setLocal('messages', updated);
  if (!db) return;
  try {
    await setDoc(doc(db, 'messages', id), { isRead: true }, { merge: true });
  } catch (error) {
    console.warn('Firestore mark contact message read warning:', error);
  }
}

export async function deleteContactMessage(id: string): Promise<void> {
  const current = getLocal<ContactMessage[]>('messages', []);
  const updated = current.filter((m) => m.id !== id);
  setLocal('messages', updated);
  if (!db) return;
  try {
    await deleteDoc(doc(db, 'messages', id));
  } catch (error) {
    console.warn('Firestore delete contact message warning:', error);
  }
}

// Storage File Upload helper
export async function uploadFile(file: File, folder: string): Promise<string> {
  if (storage) {
    try {
      const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
      const snap = await uploadBytes(storageRef, file);
      return await getDownloadURL(snap.ref);
    } catch (storageError) {
      console.warn('Firebase storage upload failed, converting to data URI:', storageError);
    }
  }

  // Fallback to base64 Data URL so local images, photos, and documents work reliably!
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
