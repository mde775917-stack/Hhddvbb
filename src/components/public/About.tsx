import React from 'react';
import { Target, Compass, Trees, Award, CheckCircle2, Shield } from 'lucide-react';
import { useSiteData } from '../../hooks/useSiteData';

export const About: React.FC = () => {
  const { settings } = useSiteData();

  return (
    <section className="py-12 sm:py-16 bg-[#F8FAF9]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold text-[#045D38] tracking-widest uppercase bg-emerald-100/70 px-3.5 py-1.5 rounded-full border border-emerald-200">
            পরিচিতি ও আদর্শ
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
            আমাদের সম্পর্কে
          </h2>
          <div className="w-16 h-1 bg-[#045D38] mx-auto mt-3 rounded-full" />
        </div>

        {/* Two Column Layout: Campus Image on left, Institutional Philosophy on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Campus Building & Signboard Photo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-emerald-100 bg-white group">
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={settings.primaryCampusImageUrl}
                  alt={`${settings.madrasaName} ভবন ও সাইনবোর্ড`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              {/* Photo Caption Badge preserving signboard identity */}
              <div className="p-4 bg-emerald-900 text-white flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#FDE047]">
                    {settings.madrasaName}
                  </h4>
                  <p className="text-xs text-emerald-100 mt-0.5">
                    মূল একাডেমিক ভবন ও ফটকের অফিসিয়াল দৃশ্য
                  </p>
                </div>
                <Award className="w-6 h-6 text-[#D4AF37] shrink-0" />
              </div>
            </div>
          </div>

          {/* Right Column: Safe Introductory Text & Core Values */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-emerald-100/80">
              <h3 className="text-lg sm:text-xl font-bold text-[#045D38] mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#D4AF37]" />
                প্রতিষ্ঠানের পরিচিতি
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                {settings.aboutText}
              </p>

              {settings.historyText && (
                <p className="text-gray-600 text-sm leading-relaxed mt-3 pt-3 border-t border-gray-100">
                  {settings.historyText}
                </p>
              )}
            </div>

            {/* Quick highlight checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-emerald-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-gray-800">
                  সুন্নাহভিত্তিক চরিত্র গঠন
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-emerald-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-gray-800">
                  ইসলামী ও আধুনিক শিক্ষার অপূর্ব সমন্বয়
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-emerald-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-gray-800">
                  দক্ষ ও নিষ্ঠাবান শিক্ষকমণ্ডলী
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-emerald-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-gray-800">
                  নিরাপদ ও সুশৃঙ্খল পাঠদান পরিবেশ
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Structured Pillar Cards: লক্ষ্য, উদ্দেশ্য, শিক্ষার পরিবেশ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* লক্ষ্য (Mission) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#045D38] flex items-center justify-center mb-4 border border-emerald-100">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">আমাদের লক্ষ্য</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {settings.missionText}
            </p>
          </div>

          {/* উদ্দেশ্য (Vision) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#B48C28] flex items-center justify-center mb-4 border border-amber-100">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">আমাদের উদ্দেশ্য</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {settings.visionText}
            </p>
          </div>

          {/* শিক্ষার পরিবেশ (Environment) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 border border-teal-100">
              <Trees className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">শিক্ষার পরিবেশ</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {settings.environmentText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
