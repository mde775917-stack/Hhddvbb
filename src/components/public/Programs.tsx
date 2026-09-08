import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Bookmark,
  Library,
  Languages,
  GraduationCap,
  Moon,
  Compass,
  ArrowRight,
  CheckCircle2,
  X,
  Clock,
  UserCheck,
} from 'lucide-react';
import { useSiteData } from '../../hooks/useSiteData';
import { ProgramItem } from '../../types';

// Map icon string to Lucide icon component
const getProgramIcon = (name: string) => {
  switch (name) {
    case 'BookOpen':
      return <BookOpen className="w-6 h-6" />;
    case 'Sparkles':
      return <Sparkles className="w-6 h-6" />;
    case 'Bookmark':
      return <Bookmark className="w-6 h-6" />;
    case 'Library':
      return <Library className="w-6 h-6" />;
    case 'Languages':
      return <Languages className="w-6 h-6" />;
    case 'GraduationCap':
      return <GraduationCap className="w-6 h-6" />;
    case 'Moon':
      return <Moon className="w-6 h-6" />;
    case 'Compass':
      return <Compass className="w-6 h-6" />;
    default:
      return <BookOpen className="w-6 h-6" />;
  }
};

export const Programs: React.FC = () => {
  const { programs } = useSiteData();
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);

  const activePrograms = programs.filter((p) => p.enabled);

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-emerald-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold text-[#045D38] tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
            পাঠক্রম ও বিভাগসমূহ
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
            আমাদের শিক্ষা কার্যক্রম
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            মাদরাসা কারিকুলাম ও আধুনিক শিক্ষাদর্শনের সুবিন্যস্ত সমন্বয়ে বিভিন্ন বিভাগে সার্বিক পাঠদান
          </p>
          <div className="w-16 h-1 bg-[#045D38] mx-auto mt-3 rounded-full" />
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activePrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-slate-50/70 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#045D38] to-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  {getProgramIcon(prog.iconName)}
                </div>

                {/* Category Pill */}
                <span className="inline-block text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-md mb-2">
                  {prog.category}
                </span>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#045D38] transition-colors leading-snug">
                  {prog.title}
                </h3>

                {prog.subtitle && (
                  <p className="text-xs font-medium text-emerald-700 mt-1">
                    {prog.subtitle}
                  </p>
                )}

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 mt-2.5 line-clamp-3 leading-relaxed">
                  {prog.description}
                </p>
              </div>

              {/* Details Button */}
              <div className="pt-5 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                {prog.duration && (
                  <span className="text-[11px] text-gray-500 font-medium">
                    মেয়াদ: {prog.duration}
                  </span>
                )}
                <button
                  onClick={() => setSelectedProgram(prog)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#045D38] hover:text-[#064E3B] group-hover:translate-x-0.5 transition-all ml-auto cursor-pointer"
                >
                  <span>বিস্তারিত</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Program Details Modal */}
        {selectedProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden">
              {/* Modal Header */}
              <div className="bg-[#045D38] text-white p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-800 text-[#FDE047]">
                    {getProgramIcon(selectedProgram.iconName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">
                      {selectedProgram.title}
                    </h3>
                    <p className="text-xs text-emerald-200">{selectedProgram.category} বিভাগ</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="p-1.5 rounded-lg hover:bg-emerald-800 text-emerald-100 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                {selectedProgram.subtitle && (
                  <div className="text-sm font-semibold text-emerald-800 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                    {selectedProgram.subtitle}
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    কার্যক্রমের বিবরণ
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedProgram.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  {selectedProgram.eligibility && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                      <span className="text-[11px] text-gray-500 font-semibold block flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        ভর্তির যোগ্যতা
                      </span>
                      <span className="text-xs font-bold text-gray-800 mt-1 block">
                        {selectedProgram.eligibility}
                      </span>
                    </div>
                  )}

                  {selectedProgram.duration && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                      <span className="text-[11px] text-gray-500 font-semibold block flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        কোর্সের মেয়াদ
                      </span>
                      <span className="text-xs font-bold text-gray-800 mt-1 block">
                        {selectedProgram.duration}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="px-5 py-2 rounded-lg bg-[#045D38] text-white text-xs font-bold hover:bg-[#064E3B] transition-colors"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
