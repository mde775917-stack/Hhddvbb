import React from 'react';
import { User, Quote, Phone, Mail, Award } from 'lucide-react';
import { useSiteData } from '../../hooks/useSiteData';

export const PrincipalMessage: React.FC = () => {
  const { principal } = useSiteData();

  if (!principal || (!principal.name && !principal.message)) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold text-[#045D38] tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
            প্রতিষ্ঠানের দিকনির্দেশনা
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
            অধ্যক্ষের বাণী
          </h2>
          <div className="w-16 h-1 bg-[#045D38] mx-auto mt-3 rounded-full" />
        </div>

        {/* Principal Card */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-emerald-50/60 via-white to-amber-50/30 rounded-3xl p-6 sm:p-10 border border-emerald-200/80 shadow-sm relative overflow-hidden">
          {/* Subtle Background Quote Watermark */}
          <Quote className="absolute right-4 bottom-4 w-32 h-32 text-emerald-900/5 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Principal Photo / Avatar Column */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-4 border-white shadow-md bg-emerald-100 flex items-center justify-center">
                  {principal.photoUrl ? (
                    <img
                      src={principal.photoUrl}
                      alt={principal.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-emerald-700">
                      <User className="w-20 h-20 opacity-40" />
                      <span className="text-[11px] font-semibold text-emerald-800 mt-1">
                        প্রতিষ্ঠান প্রধান
                      </span>
                    </div>
                  )}
                </div>

                {/* Decorative Badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#045D38] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm whitespace-nowrap flex items-center gap-1 border border-[#D4AF37]">
                  <Award className="w-3.5 h-3.5 text-[#FDE047]" />
                  <span>প্রতিষ্ঠান প্রধান</span>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                  {principal.name || 'মোঃ ইসমাইল হোসেন'}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#045D38] mt-1">
                  {principal.designation || 'অধ্যক্ষ / প্রতিষ্ঠান প্রধান'}
                </p>
                {principal.qualifications && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {principal.qualifications}
                  </p>
                )}

                {principal.phone && (
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-700 bg-white px-3 py-1.5 rounded-full border border-emerald-100 shadow-2xs">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{principal.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Principal Speech Column */}
            <div className="md:col-span-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-[#045D38] font-bold text-sm mb-3">
                  <Quote className="w-4 h-4 rotate-180 text-[#D4AF37]" />
                  <span>সম্মানিত অভিভাবক, শুভাকাঙ্ক্ষী ও সুধীবৃন্দ,</span>
                </div>

                <div className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
                  {principal.message ? (
                    <p className="whitespace-pre-line italic">
                      "{principal.message}"
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">
                      প্রতিষ্ঠানের বার্তা শীঘ্রই আপডেট করা হবে।
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-100/80 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                <span>আছিম পাটুলী ফাজিল (ডিগ্রী) মাদরাসা পরিবার</span>
                <span className="text-emerald-700 font-semibold">ফুলবাড়ীয়া, ময়মনসিংহ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
