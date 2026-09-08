import { useState, useEffect, useCallback, createContext, useContext, ReactNode, createElement } from 'react';
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
import {
  fetchSiteSettings,
  fetchPrograms,
  fetchWhyChoose,
  fetchPrincipalInfo,
  fetchTeachers,
  fetchNotices,
  fetchResults,
  fetchGallery,
  fetchVideos,
  fetchAdmissionSettings,
  fetchAdmissionApplications,
  fetchContactMessages,
  saveSiteSettings as apiSaveSettings,
  savePrograms as apiSavePrograms,
  saveWhyChoose as apiSaveWhyChoose,
  savePrincipalInfo as apiSavePrincipal,
  saveTeacher as apiSaveTeacher,
  deleteTeacher as apiDeleteTeacher,
  saveNotice as apiSaveNotice,
  deleteNotice as apiDeleteNotice,
  saveResult as apiSaveResult,
  deleteResult as apiDeleteResult,
  saveGalleryItem as apiSaveGallery,
  deleteGalleryItem as apiDeleteGallery,
  saveVideo as apiSaveVideo,
  deleteVideo as apiDeleteVideo,
  saveAdmissionSettings as apiSaveAdmissionSettings,
  deleteAdmissionApplication as apiDeleteAdmissionApp,
  deleteContactMessage as apiDeleteContactMsg,
  markContactMessageRead as apiMarkContactMsgRead,
} from '../firebase/services';

interface SiteDataContextType {
  settings: SiteSettings;
  programs: ProgramItem[];
  whyChoose: WhyChooseItem[];
  principal: PrincipalInfo;
  teachers: TeacherItem[];
  notices: NoticeItem[];
  results: ExamResultItem[];
  gallery: GalleryItem[];
  videos: VideoItem[];
  admissionSettings: AdmissionSettings;
  applications: AdmissionApplication[];
  messages: ContactMessage[];
  loading: boolean;
  refreshData: () => Promise<void>;
  updateSettings: (newSettings: SiteSettings) => Promise<void>;
  updatePrograms: (newPrograms: ProgramItem[]) => Promise<void>;
  updateWhyChoose: (newItems: WhyChooseItem[]) => Promise<void>;
  updatePrincipal: (newPrincipal: PrincipalInfo) => Promise<void>;
  saveTeacher: (teacher: TeacherItem) => Promise<void>;
  removeTeacher: (id: string) => Promise<void>;
  saveNotice: (notice: NoticeItem) => Promise<void>;
  removeNotice: (id: string) => Promise<void>;
  saveResult: (result: ExamResultItem) => Promise<void>;
  removeResult: (id: string) => Promise<void>;
  saveGalleryItem: (item: GalleryItem) => Promise<void>;
  removeGalleryItem: (id: string) => Promise<void>;
  saveVideo: (video: VideoItem) => Promise<void>;
  removeVideo: (id: string) => Promise<void>;
  updateAdmissionSettings: (settings: AdmissionSettings) => Promise<void>;
  removeAdmissionApp: (id: string) => Promise<void>;
  removeMessage: (id: string) => Promise<void>;
  markMessageRead: (id: string) => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [programs, setPrograms] = useState<ProgramItem[]>(DEFAULT_PROGRAMS);
  const [whyChoose, setWhyChoose] = useState<WhyChooseItem[]>(DEFAULT_WHY_CHOOSE);
  const [principal, setPrincipal] = useState<PrincipalInfo>(DEFAULT_PRINCIPAL_INFO);
  const [teachers, setTeachers] = useState<TeacherItem[]>(DEFAULT_TEACHERS);
  const [notices, setNotices] = useState<NoticeItem[]>(DEFAULT_NOTICES);
  const [results, setResults] = useState<ExamResultItem[]>(DEFAULT_RESULTS);
  const [gallery, setGallery] = useState<GalleryItem[]>(DEFAULT_GALLERY);
  const [videos, setVideos] = useState<VideoItem[]>(DEFAULT_VIDEOS);
  const [admissionSettings, setAdmissionSettings] = useState<AdmissionSettings>(DEFAULT_ADMISSION_SETTINGS);
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadAll = useCallback(async () => {
    try {
      const [
        sData,
        pData,
        wData,
        prData,
        tData,
        nData,
        rData,
        gData,
        vData,
        adSettingsData,
        appsData,
        msgsData,
      ] = await Promise.all([
        fetchSiteSettings(),
        fetchPrograms(),
        fetchWhyChoose(),
        fetchPrincipalInfo(),
        fetchTeachers(),
        fetchNotices(),
        fetchResults(),
        fetchGallery(),
        fetchVideos(),
        fetchAdmissionSettings(),
        fetchAdmissionApplications(),
        fetchContactMessages(),
      ]);

      setSettings(sData);
      setPrograms(pData);
      setWhyChoose(wData);
      setPrincipal(prData);
      setTeachers(tData);
      setNotices(nData);
      setResults(rData);
      setGallery(gData);
      setVideos(vData);
      setAdmissionSettings(adSettingsData);
      setApplications(appsData);
      setMessages(msgsData);
    } catch (err) {
      console.warn('Error loading site data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const updateSettings = async (newSettings: SiteSettings) => {
    setSettings(newSettings);
    await apiSaveSettings(newSettings);
  };

  const updatePrograms = async (newPrograms: ProgramItem[]) => {
    setPrograms(newPrograms);
    await apiSavePrograms(newPrograms);
  };

  const updateWhyChoose = async (newItems: WhyChooseItem[]) => {
    setWhyChoose(newItems);
    await apiSaveWhyChoose(newItems);
  };

  const updatePrincipal = async (newPrincipal: PrincipalInfo) => {
    setPrincipal(newPrincipal);
    await apiSavePrincipal(newPrincipal);
  };

  const saveTeacher = async (teacher: TeacherItem) => {
    setTeachers((prev) => {
      const idx = prev.findIndex((t) => t.id === teacher.id);
      return idx >= 0 ? prev.map((t) => (t.id === teacher.id ? teacher : t)) : [...prev, teacher];
    });
    await apiSaveTeacher(teacher);
  };

  const removeTeacher = async (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    await apiDeleteTeacher(id);
  };

  const saveNotice = async (notice: NoticeItem) => {
    setNotices((prev) => {
      const idx = prev.findIndex((n) => n.id === notice.id);
      return idx >= 0 ? prev.map((n) => (n.id === notice.id ? notice : n)) : [notice, ...prev];
    });
    await apiSaveNotice(notice);
  };

  const removeNotice = async (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    await apiDeleteNotice(id);
  };

  const saveResult = async (result: ExamResultItem) => {
    setResults((prev) => {
      const idx = prev.findIndex((r) => r.id === result.id);
      return idx >= 0 ? prev.map((r) => (r.id === result.id ? result : r)) : [result, ...prev];
    });
    await apiSaveResult(result);
  };

  const removeResult = async (id: string) => {
    setResults((prev) => prev.filter((r) => r.id !== id));
    await apiDeleteResult(id);
  };

  const saveGalleryItem = async (item: GalleryItem) => {
    setGallery((prev) => {
      const idx = prev.findIndex((g) => g.id === item.id);
      return idx >= 0 ? prev.map((g) => (g.id === item.id ? item : g)) : [...prev, item];
    });
    await apiSaveGallery(item);
  };

  const removeGalleryItem = async (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
    await apiDeleteGallery(id);
  };

  const saveVideo = async (video: VideoItem) => {
    setVideos((prev) => {
      const idx = prev.findIndex((v) => v.id === video.id);
      return idx >= 0 ? prev.map((v) => (v.id === video.id ? video : v)) : [video, ...prev];
    });
    await apiSaveVideo(video);
  };

  const removeVideo = async (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
    await apiDeleteVideo(id);
  };

  const updateAdmissionSettings = async (newSettings: AdmissionSettings) => {
    setAdmissionSettings(newSettings);
    await apiSaveAdmissionSettings(newSettings);
  };

  const removeAdmissionApp = async (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    await apiDeleteAdmissionApp(id);
  };

  const removeMessage = async (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    await apiDeleteContactMsg(id);
  };

  const markMessageRead = async (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, isRead: true } : m)));
    await apiMarkContactMsgRead(id);
  };

  return createElement(
    SiteDataContext.Provider,
    {
      value: {
        settings,
        programs,
        whyChoose,
        principal,
        teachers,
        notices,
        results,
        gallery,
        videos,
        admissionSettings,
        applications,
        messages,
        loading,
        refreshData: loadAll,
        updateSettings,
        updatePrograms,
        updateWhyChoose,
        updatePrincipal,
        saveTeacher,
        removeTeacher,
        saveNotice,
        removeNotice,
        saveResult,
        removeResult,
        saveGalleryItem,
        removeGalleryItem,
        saveVideo,
        removeVideo,
        updateAdmissionSettings,
        removeAdmissionApp,
        removeMessage,
        markMessageRead,
      },
    },
    children
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
