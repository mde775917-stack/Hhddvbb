import React, { useState } from 'react';
import {
  Bell,
  Plus,
  Trash2,
  Edit2,
  Upload,
  FileText,
  AlertCircle,
  CheckCircle2,
  X,
  Calendar,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useSiteData } from '../../hooks/useSiteData';
import { NoticeItem } from '../../types';
import { uploadFile } from '../../firebase/services';

export const AdminNotices: React.FC = () => {
  const { notices, saveNotice, removeNotice } = useSiteData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<NoticeItem | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('সাধারণ নোটিশ');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [published, setPublished] = useState(true);

  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const openAddModal = () => {
    setEditingNotice(null);
    setTitle('');
    setCategory('সাধারণ নোটিশ');
    setDate(new Date().toISOString().split('T')[0]);
    setDescription('');
    setFileUrl('');
    setIsImportant(false);
    setPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (n: NoticeItem) => {
    setEditingNotice(n);
    setTitle(n.title);
    setCategory(n.category);
    setDate(n.date);
    setDescription(n.description);
    setFileUrl(n.fileUrl || '');
    setIsImportant(n.isImportant);
    setPublished(n.published);
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadFile(file, 'notices');
      setFileUrl(url);
    } catch {
      alert('ফাইল আপলোড ব্যর্থ হয়েছে।');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      const noticeItem: NoticeItem = {
        id: editingNotice ? editingNotice.id : 'notice-' + Date.now(),
        title,
        category,
        date,
        description,
        fileUrl,
        isImportant,
        published,
        createdAt: editingNotice ? editingNotice.createdAt : Date.now(),
      };

      await saveNotice(noticeItem);
      setStatusMsg({
        type: 'success',
        text: editingNotice ? 'নোটিশ সফলভাবে আপডেট হয়েছে।' : 'নতুন নোটিশ প্রকাশিত হয়েছে।',
      });
      setModalOpen(false);
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg({ type: 'error', text: 'নোটিশ সংরক্ষণে সমস্যা হয়েছে।' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('আপনি কি এই নোটিশটি মুছে ফেলতে চান?')) return;
    try {
      await removeNotice(id);
      setStatusMsg({ type: 'success', text: 'নোটিশ মুছে ফেলা হয়েছে।' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg({ type: 'error', text: 'মুছে ফেলা ব্যর্থ হয়েছে।' });
    }
  };

  return (
    <AdminLayout activeTab="notices">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              নোটিশ বোর্ড ব্যবস্থাপনা
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              ভর্তি, পরীক্ষা বা সাধারণ বিজ্ঞপ্তি প্রকাশ এবং পিডিএফ ফাইল সংযুক্তি পরিচালনা করুন
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-[#045D38] hover:bg-[#064E3B] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন নোটিশ প্রকাশ করুন</span>
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

        {/* Notices Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-gray-700">
                <tr>
                  <th className="py-3 px-4 font-bold">তারিখ</th>
                  <th className="py-3 px-4 font-bold">ক্যাটাগরি</th>
                  <th className="py-3 px-4 font-bold">শিরোনাম</th>
                  <th className="py-3 px-4 font-bold">সংযুক্তি</th>
                  <th className="py-3 px-4 font-bold text-center">জরুরি?</th>
                  <th className="py-3 px-4 font-bold text-right">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {notices.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 text-gray-500 whitespace-nowrap">{n.date}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-semibold">
                        {n.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900 line-clamp-1">{n.title}</div>
                      <div className="text-gray-500 text-xs line-clamp-1">{n.description}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {n.fileUrl ? (
                        <a
                          href={n.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-700 hover:underline flex items-center gap-1 text-xs"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>ফাইল</span>
                        </a>
                      ) : (
                        'নেই'
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {n.isImportant ? (
                        <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">
                          জরুরি
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">স্বাভাবিক</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(n)}
                          className="p-1.5 rounded-lg hover:bg-emerald-50 text-gray-600 hover:text-[#045D38]"
                          title="সম্পাদনা"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(n.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-700"
                          title="মুছুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="bg-[#045D38] text-white p-5 flex items-center justify-between">
                <h3 className="font-bold text-base">
                  {editingNotice ? 'নোটিশ সম্পাদনা করুন' : 'নতুন নোটিশ তৈরি করুন'}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-emerald-800 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    নোটিশের শিরোনাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="বিজ্ঞপ্তির মূল শিরোনাম"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      ক্যাটাগরি
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="ভর্তি বিজ্ঞপ্তি">ভর্তি বিজ্ঞপ্তি</option>
                      <option value="পরীক্ষা সংক্রান্ত">পরীক্ষা সংক্রান্ত</option>
                      <option value="সাধারণ নোটিশ">সাধারণ নোটিশ</option>
                      <option value="ছুটির বিজ্ঞপ্তি">ছুটির বিজ্ঞপ্তি</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      প্রকাশের তারিখ
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    নোটিশের বিস্তারিত বিবরণ <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="নোটিশের পূর্ণাঙ্গ বক্তব্য লিখুন..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                  />
                </div>

                {/* File Attachment */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    সংযুক্ত ফাইল (PDF বা ছবি)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-xs font-semibold cursor-pointer">
                      <Upload className="w-4 h-4 text-emerald-600" />
                      <span>{uploading ? 'আপলোড হচ্ছে...' : 'ফাইল নির্বাচন করুন'}</span>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                    {fileUrl && (
                      <span className="text-xs text-emerald-700 font-medium">ফাইল সংযুক্ত আছে ✓</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isImportant}
                      onChange={(e) => setIsImportant(e.target.checked)}
                      className="w-4 h-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
                    />
                    <span className="text-xs font-semibold text-gray-700">জরুরি নোটিশ হিসেবে চিহ্নিত করুন</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                    />
                    <span className="text-xs font-semibold text-gray-700">প্রকাশিত রাখুন</span>
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
