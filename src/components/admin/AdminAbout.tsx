import React, { useState } from 'react';
import { Save, CheckCircle2, AlertCircle, Info, Target, Compass, Trees } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useSiteData } from '../../hooks/useSiteData';

export const AdminAbout: React.FC = () => {
  const { settings, updateSettings } = useSiteData();

  const [aboutText, setAboutText] = useState(settings.aboutText);
  const [historyText, setHistoryText] = useState(settings.historyText || '');
  const [missionText, setMissionText] = useState(settings.missionText);
  const [visionText, setVisionText] = useState(settings.visionText);
  const [environmentText, setEnvironmentText] = useState(settings.environmentText);

  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateSettings({
        ...settings,
        aboutText,
        historyText,
        missionText,
        visionText,
        environmentText,
      });
      setStatusMsg({ type: 'success', text: 'আমাদের সম্পর্কে তথ্য সফলভাবে আপডেট হয়েছে!' });
      setTimeout(() => setStatusMsg(null), 4000);
    } catch {
      setStatusMsg({ type: 'error', text: 'তথ্য সংরক্ষণে ব্যর্থ হয়েছে।' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout activeTab="about">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              আমাদের সম্পর্কে - তথ্য সম্পাদনা
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              প্রতিষ্ঠানের পরিচিতি, লক্ষ্য, উদ্দেশ্য ও শিক্ষার পরিবেশের টেক্সট সম্পাদনা করুন
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#045D38] hover:bg-[#064E3B] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow transition-colors cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}</span>
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
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{statusMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Main About Intro Text */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-gray-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-[#045D38]" />
              প্রতিষ্ঠানের পরিচিতি (Safe Introductory Text)
            </h3>
            <p className="text-xs text-gray-500">
              মূল ওয়েবসাইটে "আমাদের সম্পর্কে" সেকশনের মূল পরিচিতি হিসেবে এটি প্রদর্শিত হয়।
            </p>
            <textarea
              rows={4}
              required
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none leading-relaxed"
            />
          </div>

          {/* History Text */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-gray-900 border-b border-slate-100 pb-3">
              প্রতিষ্ঠানের সংক্ষিপ্ত পটভূমি / ইতিহাস (ঐচ্ছিক)
            </h3>
            <textarea
              rows={3}
              value={historyText}
              onChange={(e) => setHistoryText(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none leading-relaxed"
            />
          </div>

          {/* 3 Core Pillars: Mission, Vision, Environment */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mission */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
              <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600" />
                আমাদের লক্ষ্য (Mission)
              </h4>
              <textarea
                rows={4}
                value={missionText}
                onChange={(e) => setMissionText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Vision */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
              <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-600" />
                আমাদের উদ্দেশ্য (Vision)
              </h4>
              <textarea
                rows={4}
                value={visionText}
                onChange={(e) => setVisionText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Environment */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
              <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <Trees className="w-4 h-4 text-teal-600" />
                শিক্ষার পরিবেশ (Environment)
              </h4>
              <textarea
                rows={4}
                value={environmentText}
                onChange={(e) => setEnvironmentText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none leading-relaxed"
              />
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
