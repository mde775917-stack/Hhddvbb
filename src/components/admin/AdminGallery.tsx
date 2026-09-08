import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Award,
  Plus,
  X,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useSiteData } from '../../hooks/useSiteData';
import { GalleryItem } from '../../types';
import { uploadFile } from '../../firebase/services';

export const AdminGallery: React.FC = () => {
  const { gallery, saveGalleryItem, removeGalleryItem, updateSettings, settings } = useSiteData();

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('মাদ্রাসা ক্যাম্পাস');
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPrimaryCampus, setIsPrimaryCampus] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadFile(file, 'gallery');
      setImageUrl(url);
    } catch {
      alert('ছবি আপলোড ব্যর্থ হয়েছে।');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) {
      alert('দয়া করে শিরোনাম এবং ছবি নির্বাচন করুন।');
      return;
    }

    try {
      const newItem: GalleryItem = {
        id: 'gal-' + Date.now(),
        title,
        category,
        caption,
        imageUrl,
        isPrimaryCampus,
        order: gallery.length + 1,
      };

      await saveGalleryItem(newItem);

      // If marked as primary campus, also update general settings
      if (isPrimaryCampus) {
        await updateSettings({
          ...settings,
          primaryCampusImageUrl: imageUrl,
        });
      }

      setStatusMsg({ type: 'success', text: 'ছবি সফলভাবে গ্যালারিতে যোগ হয়েছে।' });
      setModalOpen(false);
      setTitle('');
      setCaption('');
      setImageUrl('');
      setIsPrimaryCampus(false);
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg({ type: 'error', text: 'সংরক্ষণ ব্যর্থ হয়েছে।' });
    }
  };

  const handleSetPrimary = async (item: GalleryItem) => {
    try {
      await updateSettings({
        ...settings,
        primaryCampusImageUrl: item.imageUrl,
      });

      // Update all gallery items so only this one has isPrimaryCampus = true
      for (const g of gallery) {
        await saveGalleryItem({
          ...g,
          isPrimaryCampus: g.id === item.id,
        });
      }

      setStatusMsg({ type: 'success', text: 'প্রধান অফিসিয়াল ক্যাম্পাস ছবি হিসেবে নির্ধারিত হয়েছে।' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg({ type: 'error', text: 'হালনাগাদ ব্যর্থ হয়েছে।' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('আপনি কি এই ছবিটি মুছে ফেলতে চান?')) return;
    try {
      await removeGalleryItem(id);
      setStatusMsg({ type: 'success', text: 'ছবি মুছে ফেলা হয়েছে।' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg({ type: 'error', text: 'মুছে ফেলা ব্যর্থ হয়েছে।' });
    }
  };

  return (
    <AdminLayout activeTab="gallery">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              ফটো গ্যালারি ব্যবস্থাপনা
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              ক্যাম্পাস, অনুষ্ঠান ও ক্রীড়ার ছবি আপলোড করুন এবং অফিসিয়াল ক্যাম্পাস ছবি নির্ধারণ করুন
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#045D38] hover:bg-[#064E3B] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন ছবি আপলোড</span>
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {item.isPrimaryCampus && (
                  <span className="absolute top-2 left-2 bg-[#045D38] text-[#FDE047] text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    <span>প্রধান ক্যাম্পাস ছবি</span>
                  </span>
                )}

                <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded">
                  {item.category}
                </span>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-1">
                    {item.title}
                  </h4>
                  {item.caption && (
                    <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">
                      {item.caption}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  {!item.isPrimaryCampus ? (
                    <button
                      onClick={() => handleSetPrimary(item)}
                      className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
                    >
                      প্রধান ছবি বানান
                    </button>
                  ) : (
                    <span className="text-[11px] text-emerald-700 font-bold">✓ সক্রিয় প্রধান</span>
                  )}

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="মুছুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="bg-[#045D38] text-white p-5 flex items-center justify-between">
                <h3 className="font-bold text-base">নতুন ছবি আপলোড করুন</h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-emerald-800 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    ছবির শিরোনাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="যেমনঃ ঐতিহাসিক মাদরাসা ক্যাম্পাস ভবন"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    ক্যাটাগরি
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="মাদ্রাসা ক্যাম্পাস">মাদ্রাসা ক্যাম্পাস</option>
                    <option value="শিক্ষা কার্যক্রম">শিক্ষা কার্যক্রম</option>
                    <option value="অনুষ্ঠান">অনুষ্ঠান</option>
                    <option value="ক্রীড়া">ক্রীড়া</option>
                    <option value="পুরস্কার বিতরণ">পুরস্কার বিতরণ</option>
                    <option value="অন্যান্য">অন্যান্য</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    ক্যাপশন / বিবরণ
                  </label>
                  <textarea
                    rows={2}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="ছবি সম্পর্কে বিস্তারিত..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    ছবি ফাইল <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    {imageUrl && (
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-emerald-300">
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-xs font-semibold cursor-pointer">
                      <Upload className="w-4 h-4 text-emerald-600" />
                      <span>{uploading ? 'আপলোড হচ্ছে...' : 'ছবি ফাইল নির্বাচন করুন'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPrimaryCampus}
                      onChange={(e) => setIsPrimaryCampus(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                    />
                    <span className="text-xs font-semibold text-gray-700">
                      এই ছবিটিকে মূল অফিসিয়াল ক্যাম্পাস ছবি হিসেবে সেট করুন
                    </span>
                  </label>
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
