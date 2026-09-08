import React, { useState } from 'react';
import {
  Users,
  Plus,
  Trash2,
  Edit2,
  Upload,
  User,
  CheckCircle2,
  AlertCircle,
  X,
  Phone,
  Mail,
  GraduationCap,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useSiteData } from '../../hooks/useSiteData';
import { TeacherItem } from '../../types';
import { uploadFile } from '../../firebase/services';

export const AdminTeachers: React.FC = () => {
  const { teachers, saveTeacher, removeTeacher } = useSiteData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<TeacherItem | null>(null);

  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [subject, setSubject] = useState('');
  const [qualification, setQualification] = useState('');
  const [biography, setBiography] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const openAddModal = () => {
    setEditingTeacher(null);
    setName('');
    setDesignation('');
    setSubject('');
    setQualification('');
    setBiography('');
    setPhone('');
    setEmail('');
    setPhotoUrl('');
    setModalOpen(true);
  };

  const openEditModal = (t: TeacherItem) => {
    setEditingTeacher(t);
    setName(t.name);
    setDesignation(t.designation);
    setSubject(t.subject);
    setQualification(t.qualification || '');
    setBiography(t.biography || '');
    setPhone(t.phone || '');
    setEmail(t.email || '');
    setPhotoUrl(t.photoUrl || '');
    setModalOpen(true);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadFile(file, 'teachers');
      setPhotoUrl(url);
    } catch {
      alert('ছবি আপলোড ব্যর্থ হয়েছে।');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !designation) return;

    try {
      const teacherItem: TeacherItem = {
        id: editingTeacher ? editingTeacher.id : 'tch-' + Date.now(),
        name,
        designation,
        subject,
        qualification,
        biography,
        phone,
        email,
        photoUrl,
        order: editingTeacher ? editingTeacher.order : teachers.length + 1,
      };

      await saveTeacher(teacherItem);
      setStatusMsg({
        type: 'success',
        text: editingTeacher ? 'শিক্ষক তথ্য আপডেট করা হয়েছে।' : 'নতুন শিক্ষক যুক্ত করা হয়েছে।',
      });
      setModalOpen(false);
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg({ type: 'error', text: 'তথ্য সংরক্ষণে সমস্যা হয়েছে।' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('আপনি কি এই শিক্ষকের তথ্য মুছে ফেলতে চান?')) return;
    try {
      await removeTeacher(id);
      setStatusMsg({ type: 'success', text: 'শিক্ষক তথ্য মুছে ফেলা হয়েছে।' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg({ type: 'error', text: 'মুছে ফেলা ব্যর্থ হয়েছে।' });
    }
  };

  return (
    <AdminLayout activeTab="teachers">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              শিক্ষক ও স্টাফ ব্যবস্থাপনা
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              মাদরাসার সম্মানিত শিক্ষক ও কর্মচারীদের অনুমোদিত তথ্য যোগ বা সম্পাদনা করুন
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-[#045D38] hover:bg-[#064E3B] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন শিক্ষক যোগ করুন</span>
          </button>
        </div>

        {statusMsg && (
          <div
            className={`p-4 rounded-xl flex items-center gap-2 text-sm font-medium ${
              statusMsg.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {statusMsg.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Teachers List */}
        {teachers.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
            <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h4 className="font-bold text-gray-700 text-base">এখনও কোনো শিক্ষক যুক্ত করা হয়নি</h4>
            <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
              ব্যবহারকারীর শর্ত অনুযায়ী কোনো ভুয়া শিক্ষক ডাটা তৈরি করা হয়নি। প্রতিষ্ঠানের প্রকৃত শিক্ষকদের তথ্য যোগ করতে উপরের বাটনে ক্লিক করুন।
            </p>
            <button
              onClick={openAddModal}
              className="mt-4 px-4 py-2 bg-[#045D38] text-white rounded-xl text-xs font-bold hover:bg-[#064E3B]"
            >
              + শিক্ষক যোগ করুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teachers.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-start gap-4 justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                    {t.photoUrl ? (
                      <img src={t.photoUrl} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-gray-400 m-auto mt-3" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{t.name}</h4>
                    <p className="text-xs text-emerald-700 font-semibold">{t.designation}</p>
                    {t.subject && <p className="text-xs text-gray-500">বিষয়: {t.subject}</p>}
                    {t.phone && <p className="text-[11px] text-gray-500 mt-1">ফোন: {t.phone}</p>}
                  </div>
                </div>

                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    onClick={() => openEditModal(t)}
                    className="p-1.5 rounded-lg hover:bg-emerald-50 text-gray-500 hover:text-[#045D38]"
                    title="সম্পাদনা"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600"
                    title="মুছুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
              <div className="bg-[#045D38] text-white p-5 flex items-center justify-between">
                <h3 className="font-bold text-base">
                  {editingTeacher ? 'শিক্ষক তথ্য সম্পাদনা' : 'নতুন শিক্ষক যোগ করুন'}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-emerald-800 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    শিক্ষকের পূর্ণ নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমনঃ মাওলানা মোঃ আব্দুর রহমান"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      পদবী <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="যেমনঃ সহকারী শিক্ষক / মুহাদ্দিস"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      পাঠদানের বিষয়
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="যেমনঃ আরবি / আল-কুরআন"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    শিক্ষাগত যোগ্যতা
                  </label>
                  <input
                    type="text"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    placeholder="যেমনঃ কামিল (হাদিস), এম.এ"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      মোবাইল নম্বর
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="০১XXXXXXXXX"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      ইমেইল (যদি থাকে)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="teacher@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    সংক্ষিপ্ত পরিচিতি / বায়ো
                  </label>
                  <textarea
                    rows={2}
                    value={biography}
                    onChange={(e) => setBiography(e.target.value)}
                    placeholder="শিক্ষক সম্পর্কে সংক্ষিপ্ত বিবরণ..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    শিক্ষকের ছবি
                  </label>
                  <div className="flex items-center gap-3">
                    {photoUrl && (
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-emerald-300">
                        <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-xs font-semibold cursor-pointer">
                      <Upload className="w-4 h-4 text-emerald-600" />
                      <span>{uploading ? 'আপলোড হচ্ছে...' : 'ছবি নির্বাচন করুন'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border border-slate-300 rounded-xl text-gray-600 hover:bg-slate-100"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#045D38] hover:bg-[#064E3B] text-white font-bold rounded-xl shadow"
                  >
                    সংরক্ষণ করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
