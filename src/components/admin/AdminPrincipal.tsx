import React, { useState } from 'react';
import { Save, Upload, User, CheckCircle2, AlertCircle, Quote, Phone, Mail } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useSiteData } from '../../hooks/useSiteData';
import { uploadFile } from '../../firebase/services';

export const AdminPrincipal: React.FC = () => {
  const { principal, updatePrincipal } = useSiteData();

  const [name, setName] = useState(principal.name || 'মোঃ ইসমাইল হোসেন');
  const [designation, setDesignation] = useState(principal.designation || 'অধ্যক্ষ / প্রতিষ্ঠান প্রধান');
  const [qualifications, setQualifications] = useState(principal.qualifications || '');
  const [phone, setPhone] = useState(principal.phone || '01799669733');
  const [email, setEmail] = useState(principal.email || '');
  const [message, setMessage] = useState(principal.message || '');
  const [photoUrl, setPhotoUrl] = useState(principal.photoUrl || '');

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadFile(file, 'principal');
      setPhotoUrl(url);
      setStatusMsg({ type: 'success', text: 'অধ্যক্ষের ছবি আপলোড সম্পন্ন হয়েছে।' });
    } catch {
      setStatusMsg({ type: 'error', text: 'ছবি আপলোড ব্যর্থ হয়েছে।' });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updatePrincipal({
        name,
        designation,
        qualifications,
        phone,
        email,
        message,
        photoUrl,
      });
      setStatusMsg({ type: 'success', text: 'অধ্যক্ষের তথ্য ও বাণী সফলভাবে সংরক্ষিত হয়েছে!' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg({ type: 'error', text: 'সংরক্ষণ ব্যর্থ হয়েছে।' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout activeTab="principal">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              অধ্যক্ষের তথ্য ও বাণী ব্যবস্থাপনা
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              প্রতিষ্ঠান প্রধানের পরিচিতি, ছবি ও দিকনির্দেশনামূলক বাণী হালনাগাদ করুন
            </p>
          </div>

          <button
            onClick={handleSave}
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

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Photo Upload & Basic Details */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4 text-center">
              <h3 className="text-sm font-bold text-gray-900 border-b border-slate-100 pb-3">
                অধ্যক্ষের ছবি
              </h3>

              <div className="w-40 h-40 mx-auto rounded-2xl overflow-hidden border-2 border-emerald-200 bg-slate-50 flex items-center justify-center">
                {photoUrl ? (
                  <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-gray-400 opacity-50" />
                )}
              </div>

              <div>
                <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-xs font-semibold cursor-pointer">
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>{uploading ? 'আপলোড হচ্ছে...' : 'ছবি পরিবর্তন করুন'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="text-left space-y-3 pt-3 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    অধ্যক্ষের নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    পদবী <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    যোগাযোগের নম্বর
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Right: Message & Speech Details */}
            <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-gray-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Quote className="w-4 h-4 text-[#045D38]" />
                অধ্যক্ষের অফিসিয়াল বাণী
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    বাণীর মূল বক্তব্য <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    শিক্ষার্থী, অভিভাবক ও শুভানুধ্যায়ীদের উদ্দেশ্যে প্রতিষ্ঠান প্রধানের লিখিত বাণী
                  </p>
                  <textarea
                    rows={8}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed resize-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    শিক্ষাগত যোগ্যতা বা বিশেষ পদবী
                  </label>
                  <input
                    type="text"
                    value={qualifications}
                    onChange={(e) => setQualifications(e.target.value)}
                    placeholder="যেমনঃ অধ্যক্ষ / প্রতিষ্ঠান প্রধান, আছিম পাটুলী ফাজিল মাদরাসা"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
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
