import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  X,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useSiteData } from '../../hooks/useSiteData';
import { ProgramItem } from '../../types';

export const AdminPrograms: React.FC = () => {
  const { programs, updatePrograms } = useSiteData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<ProgramItem | null>(null);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('নূরানী');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('BookOpen');
  const [eligibility, setEligibility] = useState('');
  const [duration, setDuration] = useState('');
  const [enabled, setEnabled] = useState(true);

  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const openAddModal = () => {
    setEditingProgram(null);
    setTitle('');
    setSubtitle('');
    setCategory('নূরানী');
    setDescription('');
    setIconName('BookOpen');
    setEligibility('');
    setDuration('');
    setEnabled(true);
    setModalOpen(true);
  };

  const openEditModal = (prog: ProgramItem) => {
    setEditingProgram(prog);
    setTitle(prog.title);
    setSubtitle(prog.subtitle || '');
    setCategory(prog.category);
    setDescription(prog.description);
    setIconName(prog.iconName);
    setEligibility(prog.eligibility || '');
    setDuration(prog.duration || '');
    setEnabled(prog.enabled);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      if (editingProgram) {
        const updated = programs.map((p) =>
          p.id === editingProgram.id
            ? {
                ...p,
                title,
                subtitle,
                category,
                description,
                iconName,
                eligibility,
                duration,
                enabled,
              }
            : p
        );
        await updatePrograms(updated);
        setStatusMsg({ type: 'success', text: 'কার্যক্রম সফলভাবে আপডেট করা হয়েছে।' });
      } else {
        const newProg: ProgramItem = {
          id: 'prog-' + Date.now(),
          title,
          subtitle,
          category,
          description,
          iconName,
          eligibility,
          duration,
          enabled,
          order: programs.length + 1,
        };
        await updatePrograms([...programs, newProg]);
        setStatusMsg({ type: 'success', text: 'নতুন কার্যক্রম যুক্ত করা হয়েছে।' });
      }
      setModalOpen(false);
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg({ type: 'error', text: 'সংরক্ষণ ব্যর্থ হয়েছে।' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই কার্যক্রমটি মুছে ফেলতে চান?')) return;
    try {
      const updated = programs.filter((p) => p.id !== id);
      await updatePrograms(updated);
      setStatusMsg({ type: 'success', text: 'কার্যক্রম সফলভাবে মুছে ফেলা হয়েছে।' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg({ type: 'error', text: 'মুছে ফেলা ব্যর্থ হয়েছে।' });
    }
  };

  const toggleEnable = async (id: string) => {
    const updated = programs.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p));
    await updatePrograms(updated);
  };

  const moveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= programs.length) return;

    const list = [...programs];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    // update orders
    const reordered = list.map((item, idx) => ({ ...item, order: idx + 1 }));
    await updatePrograms(reordered);
  };

  return (
    <AdminLayout activeTab="programs">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              শিক্ষা কার্যক্রম ব্যবস্থাপনা
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              মাদরাসার শিক্ষা কার্যক্রম যোগ, সম্পাদনা, পুনর্বিন্যাস অথবা সক্রিয়/নিষ্ক্রিয় করুন
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-[#045D38] hover:bg-[#064E3B] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন কার্যক্রম যোগ করুন</span>
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

        {/* Programs Table / Cards */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-gray-700">
                <tr>
                  <th className="py-3 px-4 font-bold">ক্রম</th>
                  <th className="py-3 px-4 font-bold">কার্যক্রমের নাম ও বিভাগ</th>
                  <th className="py-3 px-4 font-bold">বিবরণ</th>
                  <th className="py-3 px-4 font-bold">মেয়াদ / যোগ্যতা</th>
                  <th className="py-3 px-4 font-bold text-center">অবস্থা</th>
                  <th className="py-3 px-4 font-bold text-right">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {programs.map((prog, index) => (
                  <tr key={prog.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-gray-500">
                      <div className="flex items-center gap-1">
                        <span>{index + 1}</span>
                        <div className="flex flex-col">
                          <button
                            onClick={() => moveOrder(index, 'up')}
                            disabled={index === 0}
                            className="text-gray-400 hover:text-gray-700 disabled:opacity-30"
                          >
                            <MoveUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => moveOrder(index, 'down')}
                            disabled={index === programs.length - 1}
                            className="text-gray-400 hover:text-gray-700 disabled:opacity-30"
                          >
                            <MoveDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900">{prog.title}</div>
                      <div className="text-[11px] text-emerald-700 font-medium">
                        {prog.category} {prog.subtitle ? `• ${prog.subtitle}` : ''}
                      </div>
                    </td>

                    <td className="py-3 px-4 max-w-xs truncate text-gray-600">
                      {prog.description}
                    </td>

                    <td className="py-3 px-4 text-gray-600">
                      <div>{prog.duration || 'নিয়মিত'}</div>
                      <div className="text-[11px] text-gray-400">{prog.eligibility}</div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => toggleEnable(prog.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                          prog.enabled
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {prog.enabled ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{prog.enabled ? 'সক্রিয়' : 'লুকানো'}</span>
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(prog)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-800 transition-colors"
                          title="সম্পাদনা"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(prog.id)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-100 text-gray-600 hover:text-red-700 transition-colors"
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

        {/* Modal for Add / Edit */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="bg-[#045D38] text-white p-5 flex items-center justify-between">
                <h3 className="font-bold text-base">
                  {editingProgram ? 'কার্যক্রম সম্পাদনা করুন' : 'নতুন কার্যক্রম যোগ করুন'}
                </h3>
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
                    কার্যক্রমের শিরোনাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="যেমনঃ নূরানী শিক্ষা"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      উপ-শিরোনাম
                    </label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="যেমনঃ প্রাথমিক কুরআন ও দ্বীনি শিক্ষা"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      বিভাগ ক্যাটাগরি
                    </label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="নূরানী / হিফজ / কিতাব"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    বিস্তারিত বিবরণ <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      ভর্তির যোগ্যতা
                    </label>
                    <input
                      type="text"
                      value={eligibility}
                      onChange={(e) => setEligibility(e.target.value)}
                      placeholder="যেমনঃ বয়স ৪-৭ বছর"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      কোর্সের মেয়াদ
                    </label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="যেমনঃ ১-২ বছর"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="enableCheck"
                    checked={enabled}
                    onChange={(e) => setEnabled(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                  />
                  <label htmlFor="enableCheck" className="text-xs font-semibold text-gray-700">
                    ওয়েবসাইটে সক্রিয় রাখুন
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
