import React, { useState } from 'react';
import { Video, Plus, Trash2, CheckCircle2, AlertCircle, X, ExternalLink } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useSiteData } from '../../hooks/useSiteData';
import { VideoItem } from '../../types';

export const AdminVideos: React.FC = () => {
  const { videos, saveVideoItem, removeVideoItem } = useSiteData();

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [description, setDescription] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !youtubeUrl) return;

    try {
      const newItem: VideoItem = {
        id: 'vid-' + Date.now(),
        title,
        youtubeUrl,
        description,
        order: videos.length + 1,
      };

      await saveVideoItem(newItem);
      setStatusMsg({ type: 'success', text: 'ভিডিও সফলভাবে যুক্ত হয়েছে।' });
      setModalOpen(false);
      setTitle('');
      setYoutubeUrl('');
      setDescription('');
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg({ type: 'error', text: 'ভিডিও সংরক্ষণ ব্যর্থ হয়েছে।' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('আপনি কি এই ভিডিওটি মুছে ফেলতে চান?')) return;
    try {
      await removeVideoItem(id);
      setStatusMsg({ type: 'success', text: 'ভিডিও মুছে ফেলা হয়েছে।' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg({ type: 'error', text: 'মুছে ফেলা ব্যর্থ হয়েছে।' });
    }
  };

  return (
    <AdminLayout activeTab="videos">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              ভিডিও গ্যালারি ব্যবস্থাপনা
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              ইউটিউব ভিডিও লিঙ্ক যুক্ত করুন যা মূল ওয়েবসাইটের ভিডিও সেকশনে প্রদর্শিত হবে
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#045D38] hover:bg-[#064E3B] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন ভিডিও যোগ করুন</span>
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

        {videos.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
            <Video className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h4 className="font-bold text-gray-700 text-base">কোনো ভিডিও যুক্ত করা হয়নি</h4>
            <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
              শুধুমাত্র অ্যাডমিনের যুক্ত করা ভিডিও ওয়েবসাইটের ভিডিও গ্যালারিতে দেখানো হয়। নতুন ভিডিও যোগ করতে উপরের বাটনে ক্লিক করুন।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col justify-between"
              >
                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-sm text-gray-900 line-clamp-2">{vid.title}</h4>
                  <a
                    href={vid.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-emerald-700 hover:underline flex items-center gap-1 font-mono truncate"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{vid.youtubeUrl}</span>
                  </a>
                  {vid.description && (
                    <p className="text-xs text-gray-500 line-clamp-2">{vid.description}</p>
                  )}
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => handleDelete(vid.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
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
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="bg-[#045D38] text-white p-5 flex items-center justify-between">
                <h3 className="font-bold text-base">নতুন ভিডিও যুক্ত করুন</h3>
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
                    ভিডিওর শিরোনাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="যেমনঃ বার্ষিক পুরস্কার বিতরণী অনুষ্ঠান"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    ইউটিউব ভিডিও লিঙ্ক (URL) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    সংক্ষিপ্ত বিবরণ (ঐচ্ছিক)
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                  />
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
