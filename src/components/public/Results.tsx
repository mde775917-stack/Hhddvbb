import React, { useState } from 'react';
import { Search, Award, FileSpreadsheet, CheckCircle2, XCircle, AlertCircle, Printer } from 'lucide-react';
import { useSiteData } from '../../hooks/useSiteData';
import { ExamResultItem } from '../../types';

export const Results: React.FC = () => {
  const { results, settings } = useSiteData();

  // Search form state
  const [rollNumber, setRollNumber] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [examName, setExamName] = useState('বার্ষিক পরীক্ষা');
  const [year, setYear] = useState('২০২৫');

  const [searched, setSearched] = useState(false);
  const [matchedResult, setMatchedResult] = useState<ExamResultItem | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);

    const found = results.find((r) => {
      const matchRoll = r.rollNumber.trim() === rollNumber.trim();
      const matchReg = regNumber ? r.registrationNumber.trim() === regNumber.trim() : true;
      const matchExam = examName ? r.examName.toLowerCase().includes(examName.toLowerCase()) : true;
      const matchYear = year ? r.year.trim() === year.trim() : true;
      return matchRoll && matchReg && matchExam && matchYear;
    });

    setMatchedResult(found || null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-12 sm:py-16 bg-[#F8FAF9] border-b border-emerald-100">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#045D38] tracking-widest uppercase bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-200">
            শিক্ষার্থী মূল্যায়ন
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
            ফলাফল অনুসন্ধান
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            রোল ও রেজিস্ট্রেশন নম্বর দিয়ে প্রাতিষ্ঠানিক ও বোর্ড পরীক্ষার ফলাফল খুঁজুন
          </p>
          <div className="w-16 h-1 bg-[#045D38] mx-auto mt-3 rounded-full" />
        </div>

        {/* Search Box Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 sm:p-8 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Roll */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  রোল নম্বর <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমনঃ ১০১"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              {/* Registration Number */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  রেজিস্ট্রেশন নম্বর (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  placeholder="রেজিস্ট্রেশন নম্বর"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              {/* Exam */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  পরীক্ষার নাম
                </label>
                <select
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="বার্ষিক পরীক্ষা">বার্ষিক পরীক্ষা</option>
                  <option value="অর্ধ-বার্ষিক পরীক্ষা">অর্ধ-বার্ষিক পরীক্ষা</option>
                  <option value="দাখিল নির্বাচনী পরীক্ষা">দাখিল নির্বাচনী পরীক্ষা</option>
                  <option value="আলিম নির্বাচনী পরীক্ষা">আলিম নির্বাচনী পরীক্ষা</option>
                  <option value="ফাজিল (ডিগ্রী) পরীক্ষা">ফাজিল (ডিগ্রী) পরীক্ষা</option>
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  সাল / বছর
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="২০২৬">২০২৬</option>
                  <option value="২০২৫">২০২৫</option>
                  <option value="২০২৪">২০২৪</option>
                  <option value="২০২৩">২০২৩</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-center sm:justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#045D38] hover:bg-[#064E3B] text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>ফলাফল দেখুন</span>
              </button>
            </div>
          </form>
        </div>

        {/* Results Area */}
        {searched && (
          <div>
            {matchedResult ? (
              <div className="bg-white rounded-2xl shadow-lg border border-emerald-200 overflow-hidden print:shadow-none print:border-none">
                {/* Result Header */}
                <div className="bg-[#045D38] text-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-bold">
                      {settings.madrasaName}
                    </h3>
                    <p className="text-xs text-emerald-200 mt-0.5">
                      {matchedResult.examName} - {matchedResult.year} এর ফলাফল
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-950/80 px-4 py-1.5 rounded-lg border border-emerald-600/50 text-center">
                      <span className="text-[10px] text-emerald-300 block uppercase">গ্রেড</span>
                      <span className="text-lg font-bold text-[#FDE047]">{matchedResult.grade}</span>
                    </div>
                    <button
                      onClick={handlePrint}
                      className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 print:hidden"
                      title="প্রিন্ট করুন"
                    >
                      <Printer className="w-4 h-4" />
                      <span>প্রিন্ট</span>
                    </button>
                  </div>
                </div>

                {/* Student Info Card */}
                <div className="p-6 border-b border-gray-100 bg-slate-50/50">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
                    <div>
                      <span className="text-gray-500 block">শিক্ষার্থীর নাম</span>
                      <strong className="text-gray-900 text-sm sm:text-base">{matchedResult.studentName}</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 block">রোল নম্বর</span>
                      <strong className="text-gray-900 font-mono text-sm sm:text-base">{matchedResult.rollNumber}</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 block">শ্রেণি / বিভাগ</span>
                      <strong className="text-gray-900">{matchedResult.className}</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 block">ফলাফল স্ট্যাটাস</span>
                      <span className={`inline-flex items-center gap-1 font-bold ${
                        matchedResult.passed ? 'text-emerald-700' : 'text-red-700'
                      }`}>
                        {matchedResult.passed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        {matchedResult.finalResult}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subject Marks Table */}
                {matchedResult.subjectMarks && matchedResult.subjectMarks.length > 0 && (
                  <div className="p-6">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                      বিষয়ভিত্তিক নম্বর ও গ্রেড
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 bg-slate-50">
                            <th className="py-2.5 px-4 font-semibold text-gray-700">বিষয়ের নাম</th>
                            <th className="py-2.5 px-4 font-semibold text-gray-700 text-center">প্রাপ্ত নম্বর</th>
                            <th className="py-2.5 px-4 font-semibold text-gray-700 text-center">লেটার গ্রেড</th>
                          </tr>
                        </thead>
                        <tbody>
                          {matchedResult.subjectMarks.map((sub, idx) => (
                            <tr key={idx} className="border-b border-gray-100 hover:bg-slate-50/50">
                              <td className="py-2 px-4 text-gray-800 font-medium">{sub.subject}</td>
                              <td className="py-2 px-4 text-gray-800 text-center font-mono">{sub.marks}</td>
                              <td className="py-2 px-4 text-center font-bold text-emerald-800">{sub.grade}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-emerald-50/50 font-bold border-t-2 border-emerald-100">
                            <td className="py-3 px-4 text-gray-900">গড় জিপিএ (GPA)</td>
                            <td colSpan={2} className="py-3 px-4 text-center text-emerald-800 text-base font-mono">
                              {matchedResult.gpa}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center border border-amber-200 shadow-sm max-w-md mx-auto">
                <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                <h4 className="font-bold text-gray-900 text-base mb-1">
                  কোনো ফলাফল পাওয়া যায়নি
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  প্রদত্ত রোল নম্বর (<strong>{rollNumber}</strong>) এর কোনো অনুমোদিত ফলাফল তথ্য পাওয়া যায়নি। অনুগ্রহ করে রোল বা তথ্য পুনরায় যাচাই করে চেষ্টা করুন।
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
