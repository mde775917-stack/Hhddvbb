import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useSiteData } from '../../hooks/useSiteData';
import { ExamResultItem, ExamResultSubject } from '../../types';

export const AdminResults: React.FC = () => {
  const { results, saveResult, removeResult } = useSiteData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingResult, setEditingResult] = useState<ExamResultItem | null>(null);

  const [studentName, setStudentName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [className, setClassName] = useState('দাখিল ১০ম শ্রেণি');
  const [examName, setExamName] = useState('বার্ষিক পরীক্ষা');
  const [examYear, setExamYear] = useState('২০২৫');
  const [grade, setGrade] = useState('A+');
  const [gpa, setGpa] = useState<number>(5.0);
  const [finalResult, setFinalResult] = useState<'PASSED' | 'FAILED' | 'PROMOTED'>('PASSED');

  // Subjects
  const [subjectList, setSubjectList] = useState<ExamResultSubject[]>([
    { subjectName: 'কুরআন মাজিদ ও তাজবীদ', marks: 92, grade: 'A+', gpa: 5.0 },
    { subjectName: 'হাদিস শরিফ', marks: 88, grade: 'A+', gpa: 5.0 },
    { subjectName: 'আরবি ১ম পত্র', marks: 85, grade: 'A+', gpa: 5.0 },
  ]);

  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const openAddModal = () => {
    setEditingResult(null);
    setStudentName('');
    setRollNumber('');
    setRegNumber('');
    setClassName('দাখিল ১০ম শ্রেণি');
    setExamName('বার্ষিক পরীক্ষা');
    setExamYear('২০২৫');
    setGrade('A+');
    setGpa(5.0);
    setFinalResult('PASSED');
    setSubjectList([
      { subjectName: 'কুরআন মাজিদ ও তাজবীদ', marks: 90, grade: 'A+', gpa: 5.0 },
      { subjectName: 'হাদিস শরিফ', marks: 85, grade: 'A+', gpa: 5.0 },
      { subjectName: 'বাংলা', marks: 80, grade: 'A+', gpa: 5.0 },
    ]);
    setModalOpen(true);
  };

  const openEditModal = (r: ExamResultItem) => {
    setEditingResult(r);
    setStudentName(r.studentName);
    setRollNumber(r.rollNumber);
    setRegNumber(r.regNumber);
    setClassName(r.className);
    setExamName(r.examName);
    setExamYear(r.examYear);
    setGrade(r.grade);
    setGpa(r.gpa);
    setFinalResult(r.finalResult);
    setSubjectList(r.subjects || []);
    setModalOpen(true);
  };

  const addSubjectRow = () => {
    setSubjectList([...subjectList, { subjectName: '', marks: 80, grade: 'A+', gpa: 5.0 }]);
  };

  const removeSubjectRow = (idx: number) => {
    setSubjectList(subjectList.filter((_, i) => i !== idx));
  };

  const updateSubjectRow = (idx: number, field: keyof ExamResultSubject, val: any) => {
    const updated = [...subjectList];
    (updated[idx] as any)[field] = val;
    setSubjectList(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !rollNumber) return;

    try {
      const item: ExamResultItem = {
        id: editingResult ? editingResult.id : 'res-' + Date.now(),
        studentName,
        rollNumber,
        regNumber,
        className,
        examName,
        examYear,
        grade,
        gpa: Number(gpa) || 5.0,
        finalResult,
        subjects: subjectList,
        publishedDate: new Date().toISOString().split('T')[0],
      };

      await saveResult(item);
      setStatusMsg({
        type: 'success',
        text: editingResult ? 'ফলাফল তথ্য আপডেট হয়েছে।' : 'নতুন ফলাফল রেকর্ড যোগ হয়েছে।',
      });
      setModalOpen(false);
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg({ type: 'error', text: 'ফলাফল সংরক্ষণে সমস্যা হয়েছে।' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('আপনি কি এই ফলাফল রেকর্ডটি মুছে ফেলতে চান?')) return;
    try {
      await removeResult(id);
      setStatusMsg({ type: 'success', text: 'ফলাফল মুছে ফেলা হয়েছে।' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg({ type: 'error', text: 'মুছে ফেলা ব্যর্থ হয়েছে।' });
    }
  };

  return (
    <AdminLayout activeTab="results">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              পরীক্ষার ফলাফল ব্যবস্থাপনা
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              শিক্ষার্থীদের রোলভিত্তিক পরীক্ষার ফলাফল, জিপিএ ও বিষয়ভিত্তিক নম্বর ডাটাবেজে সংরক্ষণ করুন
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-[#045D38] hover:bg-[#064E3B] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন ফলাফল এন্ট্রি করুন</span>
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

        {/* Results List */}
        {results.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
            <FileSpreadsheet className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h4 className="font-bold text-gray-700 text-base">এখনও কোনো ফলাফল যুক্ত করা হয়নি</h4>
            <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
              ভুয়া বা কাল্পনিক ফলাফল সংযোজন নিষিদ্ধ থাকায় তালিকাটি খালি রয়েছে। কোনো পরীক্ষার ফলাফল প্রকাশ করতে উপরের বাটনে ক্লিক করে ছাত্র-ছাত্রীর রোল ও নম্বর যোগ করুন।
            </p>
            <button
              onClick={openAddModal}
              className="mt-4 px-4 py-2 bg-[#045D38] text-white rounded-xl text-xs font-bold hover:bg-[#064E3B]"
            >
              + ফলাফল যোগ করুন
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-gray-700">
                  <tr>
                    <th className="py-3 px-4 font-bold">রোল</th>
                    <th className="py-3 px-4 font-bold">শিক্ষার্থীর নাম</th>
                    <th className="py-3 px-4 font-bold">শ্রেণি ও পরীক্ষা</th>
                    <th className="py-3 px-4 font-bold">সাল</th>
                    <th className="py-3 px-4 font-bold text-center">GPA</th>
                    <th className="py-3 px-4 font-bold text-center">ফলাফল</th>
                    <th className="py-3 px-4 font-bold text-right">পদক্ষেপ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {results.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-gray-900">{r.rollNumber}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">{r.studentName}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {r.className} • {r.examName}
                      </td>
                      <td className="py-3 px-4 text-gray-500 font-mono">{r.examYear}</td>
                      <td className="py-3 px-4 text-center font-bold font-mono text-emerald-800">
                        {r.gpa} ({r.grade})
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            r.finalResult === 'PASSED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {r.finalResult === 'PASSED' ? 'উত্তীর্ণ' : 'অনুত্তীর্ণ'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(r)}
                            className="p-1.5 rounded-lg hover:bg-emerald-50 text-gray-600 hover:text-[#045D38]"
                            title="সম্পাদনা"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(r.id)}
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
        )}

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
              <div className="bg-[#045D38] text-white p-5 flex items-center justify-between">
                <h3 className="font-bold text-base">
                  {editingResult ? 'ফলাফল সম্পাদনা করুন' : 'নতুন ফলাফল এন্ট্রি করুন'}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-emerald-800 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto text-xs sm:text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      শিক্ষার্থীর নাম <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="নাম"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      রোল নম্বর <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      placeholder="যেমনঃ ১০১"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      রেজিস্ট্রেশন নম্বর
                    </label>
                    <input
                      type="text"
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
                      placeholder="ঐচ্ছিক"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      শ্রেণি / বিভাগ
                    </label>
                    <input
                      type="text"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      placeholder="যেমনঃ দাখিল ১০ম শ্রেণি"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      পরীক্ষার নাম
                    </label>
                    <input
                      type="text"
                      value={examName}
                      onChange={(e) => setExamName(e.target.value)}
                      placeholder="বার্ষিক পরীক্ষা"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      সাল / বছর
                    </label>
                    <input
                      type="text"
                      value={examYear}
                      onChange={(e) => setExamYear(e.target.value)}
                      placeholder="২০২৫"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      জিপিএ (GPA)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="5.0"
                      value={gpa}
                      onChange={(e) => setGpa(parseFloat(e.target.value))}
                      placeholder="5.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      লেটার গ্রেড
                    </label>
                    <input
                      type="text"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      placeholder="A+"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      ফলাফল
                    </label>
                    <select
                      value={finalResult}
                      onChange={(e) => setFinalResult(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="PASSED">উত্তীর্ণ (PASSED)</option>
                      <option value="FAILED">অনুত্তীর্ণ (FAILED)</option>
                      <option value="PROMOTED">উত্তীর্ণ/প্রমোটেড (PROMOTED)</option>
                    </select>
                  </div>
                </div>

                {/* Subject marks list */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-semibold text-gray-700">
                      বিষয়ভিত্তিক নম্বর তালিকা
                    </label>
                    <button
                      type="button"
                      onClick={addSubjectRow}
                      className="text-xs text-[#045D38] font-bold hover:underline"
                    >
                      + বিষয় যোগ করুন
                    </button>
                  </div>

                  <div className="space-y-2">
                    {subjectList.map((row, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="বিষয়ের নাম"
                          value={row.subjectName}
                          onChange={(e) => updateSubjectRow(idx, 'subjectName', e.target.value)}
                          className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs"
                        />
                        <input
                          type="number"
                          placeholder="নম্বর"
                          value={row.marks}
                          onChange={(e) => updateSubjectRow(idx, 'marks', Number(e.target.value))}
                          className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-mono"
                        />
                        <input
                          type="text"
                          placeholder="গ্রেড"
                          value={row.grade}
                          onChange={(e) => updateSubjectRow(idx, 'grade', e.target.value)}
                          className="w-16 px-3 py-1.5 border border-gray-300 rounded-lg text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => removeSubjectRow(idx)}
                          className="p-1 text-gray-400 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
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
