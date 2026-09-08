import React, { useState } from 'react';
import { Save, Upload, CheckCircle2, AlertCircle, Image, Globe, MapPin, Phone, Mail } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useSiteData } from '../../hooks/useSiteData';
import { uploadFile } from '../../firebase/services';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useSiteData();

  const [form, setForm] = useState({ ...settings });
  const [saving, setSaving] = useState(false);
  const [uploadingCampus, setUploadingCampus] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCampusUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingCampus(true);
      const url = await uploadFile(file, 'campus');
      setForm((prev) => ({ ...prev, primaryCampusImageUrl: url }));
      setStatusMsg({ type: 'success', text: 'ক্যাম্পাস ছবি সফলভাবে আপলোড হয়েছে!' });
    } catch {
      setStatusMsg({ type: 'error', text: 'ছবি আপলোড করতে ব্যর্থ হয়েছে।' });
    } finally {
      setUploadingCampus(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingLogo(true);
      const url = await uploadFile(file, 'logos');
      setForm((prev) => ({ ...prev, logoUrl: url }));
      setStatusMsg({ type: 'success', text: 'লোগো সফলভাবে আপলোড হয়েছে!' });
    } catch {
      setStatusMsg({ type: 'error', text: 'লোগো আপলোড ব্যর্থ হয়েছে।' });
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateSettings(form);
      setStatusMsg({ type: 'success', text: 'সেটিংস সফলভাবে সংরক্ষিত হয়েছে!' });
      setTimeout(() => setStatusMsg(null), 4000);
    } catch {
      setStatusMsg({ type: 'error', text: 'সেটিংস সংরক্ষণে সমস্যা হয়েছে।' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout activeTab="settings">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              প্রাতিষ্ঠানিক সাধারণ সেটিংস
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              মাদরাসার নাম, যোগাযোগের তথ্য, ছবি এবং সামাজিক যোগাযোগ মাধ্যমের লিংক হালনাগাদ করুন
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#045D38] hover:bg-[#064E3B] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow transition-colors cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'পরিবর্তন সংরক্ষণ করুন'}</span>
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Institution Identity */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-gray-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#045D38]" />
              প্রতিষ্ঠানের নাম ও পরিচিতি
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  মাদরাসার নাম (বাংলায়) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.madrasaName}
                  onChange={(e) => setForm({ ...form, madrasaName: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  প্রতিষ্ঠানের নাম (ইংরেজি)
                </label>
                <input
                  type="text"
                  value={form.englishName}
                  onChange={(e) => setForm({ ...form, englishName: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  EIIN নম্বর
                </label>
                <input
                  type="text"
                  value={form.eiin}
                  onChange={(e) => setForm({ ...form, eiin: e.target.value })}
                  placeholder="যেমনঃ ১১১৪৭২"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  প্রতিষ্ঠার সাল
                </label>
                <input
                  type="text"
                  value={form.establishedYear}
                  onChange={(e) => setForm({ ...form, establishedYear: e.target.value })}
                  placeholder="যেমনঃ ১৯৫২"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-gray-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#045D38]" />
              ঠিকানা ও অফিসিয়াল যোগাযোগ
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  ঠিকানা <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  অফিসিয়াল মোবাইল নম্বর <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  অফিসিয়াল ইমেইল
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="উপলব্ধ না থাকলে খালি রাখুন"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  হোয়াটসঅ্যাপ নম্বর
                </label>
                <input
                  type="text"
                  value={form.whatsappNumber}
                  onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                  placeholder="017XXXXXXXX"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  ফেসবুক পেজ URL
                </label>
                <input
                  type="url"
                  value={form.facebookUrl}
                  onChange={(e) => setForm({ ...form, facebookUrl: e.target.value })}
                  placeholder="https://facebook.com/..."
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  ইউটিউব চ্যানেল URL
                </label>
                <input
                  type="url"
                  value={form.youtubeUrl}
                  onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                  placeholder="https://youtube.com/..."
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold text-gray-700 mb-1">
                  গুগল ম্যাপ এমবেড কোড / URL
                </label>
                <input
                  type="text"
                  value={form.googleMapEmbedUrl}
                  onChange={(e) => setForm({ ...form, googleMapEmbedUrl: e.target.value })}
                  placeholder="https://www.google.com/maps/embed?..."
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Hero Section Banner Texts & Primary Campus Image */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-gray-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Image className="w-4 h-4 text-[#045D38]" />
              হিরো সেকশন ও অফিসিয়াল প্রধান ক্যাম্পাস ছবি
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    হিরো ব্যাজ টেক্সট
                  </label>
                  <input
                    type="text"
                    value={form.badgeText}
                    onChange={(e) => setForm({ ...form, badgeText: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    হিরো স্লোগান / সাবটাইটেল
                  </label>
                  <input
                    type="text"
                    value={form.heroSubtitle}
                    onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* Campus Image Upload */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  অফিসিয়াল প্রধান ক্যাম্পাস ছবি (Hero, About এবং Gallery-তে প্রদর্শিত)
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-48 h-28 rounded-xl overflow-hidden border border-emerald-300 bg-slate-100 shrink-0">
                    <img
                      src={form.primaryCampusImageUrl}
                      alt="ক্যাম্পাস ছবি"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-xs font-bold text-gray-700 cursor-pointer">
                      <Upload className="w-4 h-4 text-emerald-600" />
                      <span>{uploadingCampus ? 'আপলোড হচ্ছে...' : 'নতুন ক্যাম্পাস ছবি আপলোড করুন'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCampusUpload}
                        disabled={uploadingCampus}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[11px] text-gray-500">
                      (প্রয়োজনে যেকোনো সময় মাদরাসা ক্যাম্পাস বা সাইনবোর্ডের নতুন ছবি যুক্ত করতে পারেন)
                    </p>
                  </div>
                </div>
              </div>

              {/* Logo Upload */}
              <div className="pt-2">
                <label className="block font-semibold text-gray-700 mb-1">
                  প্রতিষ্ঠানের লোগো
                </label>
                <div className="flex items-center gap-4">
                  {form.logoUrl && (
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-emerald-300">
                      <img src={form.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-xs font-bold text-gray-700 cursor-pointer">
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span>{uploadingLogo ? 'আপলোড হচ্ছে...' : 'লোগো ফাইল নির্বাচন করুন'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={uploadingLogo}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-[#045D38] hover:bg-[#064E3B] text-white text-sm font-bold px-6 py-3 rounded-xl shadow transition-colors cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'পরিবর্তন সংরক্ষণ করুন'}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
