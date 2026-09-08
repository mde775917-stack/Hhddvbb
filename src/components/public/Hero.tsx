import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PhoneCall, Award, Sparkles, ArrowRight } from 'lucide-react';
import { useSiteData } from '../../hooks/useSiteData';

export const Hero: React.FC = () => {
  const { settings, admissionSettings } = useSiteData();

  return (
    <section className="relative w-full overflow-hidden bg-slate-900 border-b border-emerald-900">
      {/* Background Campus Photo - Preserving the authentic campus image & signboard */}
      <div className="relative w-full h-[520px] sm:h-[600px] lg:h-[660px]">
        <img
          src={settings.primaryCampusImageUrl}
          alt={`${settings.madrasaName} ক্যাম্পাস ও সাইনবোর্ড`}
          className="w-full h-full object-cover object-center"
          loading="eager"
        />

        {/* Subtle dual gradient overlay to guarantee text legibility without obscuring the main campus signboard */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-slate-900/30 backdrop-blur-[0.5px]" />
        
        {/* Subtle Islamic pattern accents */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between max-w-7xl mx-auto px-4 py-8 sm:py-12 z-10">
          {/* Top Badge: Islamic & Institutional Education */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-[#D4AF37]/60 text-[#FDE047] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-lg backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#FDE047]" />
              <span>{settings.badgeText}</span>
            </div>

            {settings.eiin && (
              <div className="bg-slate-900/80 text-emerald-300 border border-emerald-700/50 px-3 py-1 rounded-md text-xs font-mono backdrop-blur-sm">
                EIIN: {settings.eiin} | স্থাপিত: {settings.establishedYear}
              </div>
            )}
          </div>

          {/* Center/Bottom Hero Title & Descriptions */}
          <div className="max-w-3xl space-y-4 sm:space-y-6 pt-12 sm:pt-20">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight sm:leading-snug drop-shadow-md">
              {settings.madrasaName}
            </h1>

            <p className="text-base sm:text-xl text-emerald-100 font-medium leading-relaxed drop-shadow">
              “{settings.heroSubtitle}”
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <Link
                to="/admission"
                className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#b58f23] text-slate-950 font-bold px-6 py-3 rounded-lg text-sm sm:text-base shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>ভর্তি তথ্য</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white border border-white/30 font-medium px-6 py-3 rounded-lg text-sm sm:text-base backdrop-blur-sm transition-all"
              >
                <PhoneCall className="w-4 h-4 text-[#FDE047]" />
                <span>যোগাযোগ করুন</span>
              </Link>
            </div>
          </div>

          {/* Bottom Info Ribbon */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-300 font-semibold">
                {admissionSettings.isAdmissionOpen
                  ? `${admissionSettings.currentSession} ভর্তি আবেদন উন্মুক্ত`
                  : 'নিয়মিত ক্লাস ও শিক্ষা কার্যক্রম চলমান'}
              </span>
            </div>
            <div className="text-slate-300 flex items-center gap-4">
              <span>অধ্যক্ষ: মোঃ ইসমাইল হোসেন</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">মোবাইল: {settings.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
