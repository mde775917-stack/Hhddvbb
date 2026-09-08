import React, { useState } from 'react';
import {
  GraduationCap,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  X,
  Phone,
  Save,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useSiteData } from '../../hooks/useSiteData';
import { AdmissionApplication, AdmissionSettings } from '../../types';
import { updateAdmissionApplicationStatus } from '../../firebase/services';

export const AdminAdmissions: React.FC = () => {
  const {
    applications,
    admissionSettings,
    updateAdmissionSettings,
    removeAdmissionApp,
    refreshData,
  } = useSiteData();

  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Edit settings
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(admissionSettings.isAdmissionOpen);
  const [currentSession, setCurrentSession] = useState(admissionSettings.currentSession);
  const [deadlineDate, setDeadlineDate] = useState(admissionSettings.deadlineDate);
  const [feesDescription, setFeesDescription] = useState(admissionSettings.feesDescription || '');
  const [noticeText, setNoticeText] = useState(admissionSettings.noticeText);
  const [requiredDocs, setRequiredDocs] = useState(admissionSettings.requiredDocuments.join('\n'));

  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const filteredApps =
    statusFilter === 'ALL'
      ? applications
      : applications.filter((app) => app.status === statusFilter);

  const handleStatusChange = async (id: string, status: 'PENDING' | 'ACCEPTED' | 'REJECTED') => {
    try {
      await updateAdmissionApplicationStatus(id, status);
      await refreshData();
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp({ ...selectedApp, status });
      }
      setStatusMsg({ type: 'success', text: 'আবেদনের অবস্থা পরিবর্তন করা হয়েছে।' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg({ type: 'error', text: 'হালনাগাদ ব্যর্থ হয়েছে।' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('আপনি কি এই আবেদনটি স্থায়ীভাবে মুছে ফেলতে চান?')) return;
    try {
      await removeAdmissionApp(id);
      setSelectedApp(null);
      setStatusMsg({ type: 'success', text: 'আবেদন মুছে ফেলা হয়েছে।' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg({ type: 'error', text: 'মুছে ফেলা ব্যর্থ হয়েছে।' });
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated: AdmissionSettings = {
        ...admissionSettings,
        isAdmissionOpen,
        currentSession,
        deadlineDate,
        feesDescription,
        noticeText,
        requiredDocuments: requiredDocs.split('\n').filter((l) => l.trim().length > 0),
      };
      await updateAdmissionSettings(updated);
      setIsEditingInfo(false);
      setStatusMsg({ type: 'success', text: 'ভর্তি নির্দেশিকা ও সেশন তথ্য সংরক্ষিত হয়েছে।' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg({ type: 'error', text: 'তথ্য সংরক্ষণ ব্যর্থ হয়েছে।' });
    }
  };

  return (
    <AdminLayout activeTab="admissions">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              ভর্তি আবেদন ও তথ্য পরিচালনা
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              অনলাইনে জমা পড়া শিক্ষার্থীদের ভর্তি ফরম পর্যালোচনা, অনুমোদন ও ভর্তি সংক্রান্ত তথ্য আপডেট করুন
            </p>
          </div>

          <button
            onClick={() => setIsEditingInfo(!isEditingInfo)}
            className="inline-flex items-center gap-2 bg-[#045D38] hover:bg-[#064E3B] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow transition-colors cursor-pointer"
          >
            <GraduationCap className="w-4 h-4" />
            <span>{isEditingInfo ? 'আবেদন তালিকা দেখুন' : 'ভর্তি সেটিংস ও ফি'}</span>
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

        {isEditingInfo ? (
          /* Admission Info & Rules Edit Form */
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-base text-gray-900 mb-4 border-b pb-3">
              ভর্তি সেশন ও নিয়মাবলী কনফিগারেশন
            </h3>
            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2 pb-2">
                <input
                  type="checkbox"
                  id="admOpen"
                  checked={isAdmissionOpen}
                  onChange={(e) => setIsAdmissionOpen(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-gray-300"
                />
                <label htmlFor="admOpen" className="font-bold text-gray-800">
                  বর্তমানে অনলাইন ভর্তি আবেদন চলমান রয়েছে
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    শিক্ষাবর্ষ / সেশন
                  </label>
                  <input
                    type="text"
                    value={currentSession}
                    onChange={(e) => setCurrentSession(e.target.value)}
                    placeholder="যেমনঃ ২০২৬-২০২৭"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    আবেদনের শেষ সময় / ডেডলাইন
                  </label>
                  <input
                    type="text"
                    value={deadlineDate}
                    onChange={(e) => setDeadlineDate(e.target.value)}
                    placeholder="যেমনঃ ৩০ মার্চ ২০২৬"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  ভর্তি সংক্রান্ত মূল বিজ্ঞপ্তি টেক্সট
                </label>
                <textarea
                  rows={2}
                  value={noticeText}
                  onChange={(e) => setNoticeText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  ভর্তি ফি ও খরচ সংক্রান্ত বিবরণ
                </label>
                <textarea
                  rows={2}
                  value={feesDescription}
                  onChange={(e) => setFeesDescription(e.target.value)}
                  placeholder="ফি সংক্রান্ত তথ্য (যদি থাকে)..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  প্রয়োজনীয় কাগজপত্র (প্রতি লাইনে একটি করে লিখুন)
                </label>
                <textarea
                  rows={4}
                  value={requiredDocs}
                  onChange={(e) => setRequiredDocs(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl resize-none font-sans leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingInfo(false)}
                  className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-slate-100"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#045D38] text-white font-bold rounded-xl shadow hover:bg-[#064E3B]"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Applications List */
          <div className="space-y-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2">
              {[
                { id: 'ALL', name: 'সকল আবেদন' },
                { id: 'PENDING', name: 'অপেক্ষমাণ' },
                { id: 'ACCEPTED', name: 'অনুমোদিত' },
                { id: 'REJECTED', name: 'বাতিলকৃত' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    statusFilter === tab.id
                      ? 'bg-[#045D38] text-white'
                      : 'bg-white text-gray-600 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {filteredApps.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
                <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h4 className="font-bold text-gray-700 text-base">কোনো আবেদন পাওয়া যায়নি</h4>
                <p className="text-xs text-gray-500 mt-1">
                  শিক্ষার্থীরা অনলাইন ভর্তি ফরম পূরণ করলে তা এখানে দেখা যাবে।
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-gray-700">
                      <tr>
                        <th className="py-3 px-4 font-bold">আবেদনকারীর নাম</th>
                        <th className="py-3 px-4 font-bold">অভিভাবক ও ফোন</th>
                        <th className="py-3 px-4 font-bold">আবেদনকৃত শ্রেণি</th>
                        <th className="py-3 px-4 font-bold">তারিখ</th>
                        <th className="py-3 px-4 font-bold text-center">অবস্থা</th>
                        <th className="py-3 px-4 font-bold text-right">পদক্ষেপ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredApps.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4 font-bold text-gray-900">
                            {app.studentNameBangla || app.studentNameEnglish}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            <div>{app.fatherName}</div>
                            <div className="font-mono text-[11px] text-emerald-700">{app.mobileNumber}</div>
                          </td>
                          <td className="py-3 px-4 text-gray-800 font-medium">
                            {app.desiredClass}
                          </td>
                          <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                            {new Date(app.submittedAt).toLocaleDateString('bn-BD')}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                app.status === 'ACCEPTED'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : app.status === 'REJECTED'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {app.status === 'ACCEPTED'
                                ? 'অনুমোদিত'
                                : app.status === 'REJECTED'
                                ? 'বাতিলকৃত'
                                : 'অপেক্ষমাণ'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="inline-flex items-center gap-2">
                              <button
                                onClick={() => setSelectedApp(app)}
                                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
                                title="বিস্তারিত দেখুন"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(app.id)}
                                className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
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
            )}
          </div>
        )}

        {/* Application Details Modal */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
              <div className="bg-[#045D38] text-white p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base">ভর্তি আবেদনপত্রের বিস্তারিত বিবরণ</h3>
                  <p className="text-xs text-emerald-200">
                    আবেদনের সময়: {new Date(selectedApp.submittedAt).toLocaleString('bn-BD')}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-1 rounded-lg hover:bg-emerald-800 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5 overflow-y-auto text-xs sm:text-sm">
                <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs text-gray-500">আবেদনকারী শিক্ষার্থী</span>
                    <h2 className="text-lg font-bold text-gray-900 mt-0.5">
                      {selectedApp.studentNameBangla} ({selectedApp.studentNameEnglish})
                    </h2>
                    <p className="text-emerald-700 font-semibold mt-0.5">
                      আবেদনকৃত শ্রেণি: {selectedApp.desiredClass}
                    </p>
                  </div>

                  {/* Status Dropdown/Selector */}
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[11px] text-gray-500">অবস্থা পরিবর্তন:</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleStatusChange(selectedApp.id, 'ACCEPTED')}
                        className={`px-2.5 py-1 rounded text-xs font-bold ${
                          selectedApp.status === 'ACCEPTED'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-gray-700 hover:bg-emerald-50'
                        }`}
                      >
                        অনুমোদন
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedApp.id, 'REJECTED')}
                        className={`px-2.5 py-1 rounded text-xs font-bold ${
                          selectedApp.status === 'REJECTED'
                            ? 'bg-red-600 text-white'
                            : 'bg-slate-100 text-gray-700 hover:bg-red-50'
                        }`}
                      >
                        বাতিল
                      </button>
                    </div>
                  </div>
                </div>

                {/* Grid Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-gray-500 block">পিতার নাম</span>
                    <strong className="text-gray-900 block mt-0.5">{selectedApp.fatherName}</strong>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-gray-500 block">মাতার নাম</span>
                    <strong className="text-gray-900 block mt-0.5">{selectedApp.motherName}</strong>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-gray-500 block">মোবাইল নম্বর</span>
                    <a
                      href={`tel:${selectedApp.mobileNumber}`}
                      className="text-emerald-800 font-mono font-bold block mt-0.5 hover:underline"
                    >
                      {selectedApp.mobileNumber}
                    </a>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-gray-500 block">জন্ম তারিখ</span>
                    <strong className="text-gray-900 block mt-0.5 font-mono">{selectedApp.dateOfBirth}</strong>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-gray-500 block">লিঙ্গ</span>
                    <strong className="text-gray-900 block mt-0.5">
                      {selectedApp.gender}
                    </strong>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-gray-500 block">পূর্ববর্তী শিক্ষাপ্রতিষ্ঠান</span>
                    <strong className="text-gray-900 block mt-0.5">
                      {selectedApp.previousInstitution || 'প্রযোজ্য নয়'}
                    </strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-gray-500 block">বর্তমান ঠিকানা</span>
                  <p className="text-gray-900 font-medium mt-0.5 leading-relaxed">
                    {selectedApp.presentAddress}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-gray-500 block">স্থায়ী ঠিকানা</span>
                  <p className="text-gray-900 font-medium mt-0.5 leading-relaxed">
                    {selectedApp.permanentAddress}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => handleDelete(selectedApp.id)}
                  className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-xl text-xs flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>আবেদনপত্র মুছুন</span>
                </button>

                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-gray-700 font-semibold rounded-xl text-xs"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
