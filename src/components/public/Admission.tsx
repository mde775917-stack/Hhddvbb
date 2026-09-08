import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  FileText,
  CheckSquare,
  DollarSign,
  HelpCircle,
  X,
  Upload,
  User,
  Phone,
  Home,
  BookOpen,
  Send,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { useSiteData } from '../../hooks/useSiteData';
import { submitAdmissionApplication } from '../../firebase/services';

export const Admission: React.FC = () => {
  const { admissionSettings, settings } = useSiteData();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    studentNameBangla: '',
    studentNameEnglish: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    gender: 'ছাত্র' as 'ছাত্র' | 'ছাত্রী',
    bloodGroup: '',
    mobileNumber: '',
    emergencyContact: '',
    presentAddress: '',
    permanentAddress: '',
    desiredClass: admissionSettings.availableClasses[0] || 'নূরানী বিভাগ',
    previousInstitution: '',
    previousExamGpa: '',
    photoUrl: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.studentNameBangla || !formData.fatherName || !formData.mobileNumber) {
      setErrorMsg('অনুগ্রহ করে সকল আবশ্যকীয় তথ্য পূরণ করুন।');
      return;
    }

    try {
      setSubmitting(true);
      const appId = await submitAdmissionApplication({
        studentNameBangla: formData.studentNameBangla,
        studentNameEnglish: formData.studentNameEnglish,
        fatherName: formData.fatherName,
        motherName: formData.motherName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        mobileNumber: formData.mobileNumber,
        emergencyContact: formData.emergencyContact,
        presentAddress: formData.presentAddress,
        permanentAddress: formData.permanentAddress,
        desiredClass: formData.desiredClass,
        previousInstitution: formData.previousInstitution,
        previousExamGpa: formData.previousExamGpa,
        photoUrl: formData.photoUrl,
      });
      setSubmittedId(appId);
    } catch (err: any) {
      setErrorMsg('আবেদন জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedId(null);
    setFormData({
      studentNameBangla: '',
      studentNameEnglish: '',
      fatherName: '',
      motherName: '',
      dateOfBirth: '',
      gender: 'ছাত্র',
      bloodGroup: '',
      mobileNumber: '',
      emergencyContact: '',
      presentAddress: '',
      permanentAddress: '',
      desiredClass: admissionSettings.availableClasses[0] || 'নূরানী বিভাগ',
      previousInstitution: '',
      previousExamGpa: '',
      photoUrl: '',
    });
    setShowApplyModal(false);
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-emerald-50/50 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Prominent Banner Card */}
        <div className="bg-gradient-to-br from-[#045D38] via-[#064E3B] to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          {/* Subtle gold decorative accents */}
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#D4AF37]/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37] text-slate-950 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-md">
                <Sparkles className="w-4 h-4" />
                <span>ভর্তি চলছে | {admissionSettings.currentSession}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                {settings.madrasaName}-এ নতুন শিক্ষাবর্ষে ভর্তি চলছে
              </h2>

              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-3xl">
                {admissionSettings.noticeText}
              </p>

              {/* Deadline & Department Quick Tags */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm text-emerald-200">
                <div className="flex items-center gap-1.5 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-700/50">
                  <Calendar className="w-4 h-4 text-[#FDE047]" />
                  <span>আবেদনের শেষ সময়: {admissionSettings.deadlineDate}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-700/50">
                  <BookOpen className="w-4 h-4 text-[#FDE047]" />
                  <span>উপলব্ধ বিভাগ: নূরানী, নাজেরা, হিফজ, কিতাব ও ফাজিল</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => setShowApplyModal(true)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#b58f23] text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm sm:text-base shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>ভর্তি আবেদন করুন</span>
              </button>

              <button
                onClick={() => setShowInfoModal(true)}
                className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-medium px-6 py-3.5 rounded-xl text-sm sm:text-base backdrop-blur-sm transition-all cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-[#FDE047]" />
                <span>ভর্তি তথ্য দেখুন</span>
              </button>
            </div>
          </div>
        </div>

        {/* Admission Info Modal */}
        {showInfoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden max-h-[90vh] flex flex-col">
              <div className="bg-[#045D38] text-white p-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#FDE047]" />
                  <h3 className="font-bold text-lg">ভর্তি সংক্রান্ত তথ্যাবলি</h3>
                </div>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="p-1 rounded-lg hover:bg-emerald-800 text-emerald-100 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-700">
                {/* Eligibility */}
                <div>
                  <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-2 text-base">
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                    ভর্তির যোগ্যতা
                  </h4>
                  <p className="whitespace-pre-line bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                    {admissionSettings.eligibility}
                  </p>
                </div>

                {/* Required Documents */}
                <div>
                  <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-2 text-base">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    প্রয়োজনীয় কাগজপত্র
                  </h4>
                  <ul className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                    {admissionSettings.requiredDocuments.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fees */}
                <div>
                  <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-2 text-base">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    ভর্তি ফি ও মাসিক বেতন
                  </h4>
                  <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                    {admissionSettings.feesDescription}
                  </p>
                </div>

                {/* Instructions */}
                <div>
                  <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-2 text-base">
                    <HelpCircle className="w-4 h-4 text-emerald-600" />
                    ভর্তি নির্দেশিকা
                  </h4>
                  <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                    {admissionSettings.instructions}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowInfoModal(false);
                    setShowApplyModal(true);
                  }}
                  className="px-5 py-2 rounded-lg bg-[#045D38] text-white text-xs font-bold hover:bg-[#064E3B]"
                >
                  অনলাইনে আবেদন করুন
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Online Admission Application Form Modal */}
        {showApplyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden my-8 max-h-[92vh] flex flex-col">
              {/* Header */}
              <div className="bg-[#045D38] text-white p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#FDE047]" />
                    অনলাইন ভর্তি আবেদন ফরম
                  </h3>
                  <p className="text-xs text-emerald-200">{settings.madrasaName}</p>
                </div>
                <button
                  onClick={resetForm}
                  className="p-1 rounded-lg hover:bg-emerald-800 text-emerald-100 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content / Success Screen */}
              <div className="p-6 overflow-y-auto">
                {submittedId ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">
                      ভর্তি আবেদন সফলভাবে সম্পন্ন হয়েছে!
                    </h4>
                    <p className="text-sm text-gray-600 max-w-md mx-auto">
                      আপনার আবেদনটি মাদরাসার প্রশাসনিক দফতরে সংরক্ষিত হয়েছে।
                    </p>
                    <div className="inline-block bg-slate-100 border border-slate-200 px-4 py-2 rounded-lg font-mono text-sm font-bold text-emerald-800">
                      আবেদন ট্র্যাকিং নম্বর: {submittedId}
                    </div>
                    <p className="text-xs text-gray-500">
                      ভর্তির পরবর্তী প্রক্রিয়ার জন্য অনুগ্রহ করে অফিসিয়াল নম্বরে (<strong>{settings.phone}</strong>) যোগাযোগ করুন।
                    </p>
                    <button
                      onClick={resetForm}
                      className="mt-4 px-6 py-2.5 rounded-xl bg-[#045D38] text-white text-sm font-bold hover:bg-[#064E3B]"
                    >
                      ঠিক আছে
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                    {errorMsg && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {/* Student Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                          শিক্ষার্থীর নাম (বাংলায়) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.studentNameBangla}
                          onChange={(e) => setFormData({ ...formData, studentNameBangla: e.target.value })}
                          placeholder="উদাঃ মোঃ আব্দুল্লাহ"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                          শিক্ষার্থীর নাম (ইংরেজি)
                        </label>
                        <input
                          type="text"
                          value={formData.studentNameEnglish}
                          onChange={(e) => setFormData({ ...formData, studentNameEnglish: e.target.value })}
                          placeholder="e.g. Md. Abdullah"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Parents */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                          পিতার নাম <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fatherName}
                          onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                          placeholder="পিতার পূর্ণ নাম"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                          মাতার নাম
                        </label>
                        <input
                          type="text"
                          value={formData.motherName}
                          onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                          placeholder="মাতার পূর্ণ নাম"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Birth, Gender, Class */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                          জন্ম তারিখ <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                          লিঙ্গ <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        >
                          <option value="ছাত্র">ছাত্র</option>
                          <option value="ছাত্রী">ছাত্রী</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                          ভর্তির বিভাগ/শ্রেণি <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.desiredClass}
                          onChange={(e) => setFormData({ ...formData, desiredClass: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        >
                          {admissionSettings.availableClasses.map((cls, idx) => (
                            <option key={idx} value={cls}>
                              {cls}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Mobile & Emergency */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                          অভিভাবকের মোবাইল নম্বর <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.mobileNumber}
                          onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                          placeholder="০১৭XXXXXXXX"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                          জরুরি যোগাযোগের নম্বর
                        </label>
                        <input
                          type="tel"
                          value={formData.emergencyContact}
                          onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                          placeholder="বিকল্প নম্বর"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Addresses */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                          বর্তমান ঠিকানা <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={formData.presentAddress}
                          onChange={(e) => setFormData({ ...formData, presentAddress: e.target.value })}
                          placeholder="গ্রাম/মহল্লা, ডাকঘর, উপজেলা, জেলা"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                          স্থায়ী ঠিকানা
                        </label>
                        <textarea
                          rows={2}
                          value={formData.permanentAddress}
                          onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
                          placeholder="স্থায়ী ঠিকানা"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                        />
                      </div>
                    </div>

                    {/* Previous Institution */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                          পূর্ববর্তী শিক্ষা প্রতিষ্ঠান (যদি থাকে)
                        </label>
                        <input
                          type="text"
                          value={formData.previousInstitution}
                          onChange={(e) => setFormData({ ...formData, previousInstitution: e.target.value })}
                          placeholder="প্রতিষ্ঠানের নাম"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                          পূর্ববর্তী পরীক্ষার ফলাফল / জিপিএ
                        </label>
                        <input
                          type="text"
                          value={formData.previousExamGpa}
                          onChange={(e) => setFormData({ ...formData, previousExamGpa: e.target.value })}
                          placeholder="যেমনঃ জিপিএ ৫.০০"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Photo Upload */}
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">
                        শিক্ষার্থীর ছবি (ঐচ্ছিক)
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-slate-50 text-gray-600">
                          <Upload className="w-4 h-4 text-emerald-600" />
                          <span>ছবি নির্বাচন করুন</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </label>
                        {formData.photoUrl && (
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-emerald-300">
                            <img
                              src={formData.photoUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                      >
                        বাতিল
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-6 py-2 rounded-lg bg-[#045D38] text-white font-bold hover:bg-[#064E3B] flex items-center gap-2 disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>{submitting ? 'আবেদন জমা হচ্ছে...' : 'আবেদন সাবমিট করুন'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
