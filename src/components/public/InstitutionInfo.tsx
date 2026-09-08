import React from 'react';
import { Building2, MapPin, UserCheck, Phone, Award, Calendar, Hash } from 'lucide-react';
import { useSiteData } from '../../hooks/useSiteData';

export const InstitutionInfo: React.FC = () => {
  const { settings } = useSiteData();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 sm:p-8 relative overflow-hidden">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#045D38] via-[#D4AF37] to-[#045D38]" />

      <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <span className="text-xs font-bold text-[#045D38] tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            প্রতিষ্ঠান পরিচিতি সারসংক্ষেপ
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">
            অফিসিয়াল তথ্যাবলি
          </h2>
        </div>
        <Building2 className="w-8 h-8 text-[#045D38] opacity-80" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Name Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-emerald-100 text-[#045D38]">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-xs text-gray-500 font-semibold">প্রতিষ্ঠানের নাম</span>
          </div>
          <p className="font-bold text-gray-900 text-sm leading-snug">
            {settings.madrasaName}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">{settings.englishName}</p>
        </div>

        {/* Address Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-emerald-100 text-[#045D38]">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-xs text-gray-500 font-semibold">ঠিকানা</span>
          </div>
          <p className="font-bold text-gray-900 text-sm leading-snug">
            {settings.location}
          </p>
        </div>

        {/* Head Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-emerald-100 text-[#045D38]">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="text-xs text-gray-500 font-semibold">প্রতিষ্ঠান প্রধান</span>
          </div>
          <p className="font-bold text-gray-900 text-sm leading-snug">
            মোঃ ইসমাইল হোসেন
          </p>
          <p className="text-xs text-emerald-700 font-medium mt-0.5">অধ্যক্ষ / প্রতিষ্ঠান প্রধান</p>
        </div>

        {/* Contact Phone Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-emerald-100 text-[#045D38]">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-xs text-gray-500 font-semibold">অফিসিয়াল মোবাইল</span>
          </div>
          <a
            href={`tel:${settings.phone}`}
            className="font-bold text-[#045D38] hover:text-[#064E3B] text-sm block tracking-wide"
          >
            {settings.phone}
          </a>
          <p className="text-xs text-gray-500 mt-0.5">সরাসরি যোগাযোগের নম্বর</p>
        </div>
      </div>

      {/* Verified Additional Badges */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-4">
          {settings.eiin && (
            <span className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-md font-mono text-gray-800">
              <Hash className="w-3.5 h-3.5 text-emerald-600" />
              EIIN: <strong>{settings.eiin}</strong>
            </span>
          )}
          {settings.establishedYear && (
            <span className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-md text-gray-800">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              প্রতিষ্ঠার সাল: <strong>{settings.establishedYear}</strong>
            </span>
          )}
        </div>
        <span className="text-emerald-700 font-medium flex items-center gap-1">
          <Award className="w-3.5 h-3.5" />
          ইসলামী আরবি বিশ্ববিদ্যালয় ও বাংলাদেশ মাদ্রাসা শিক্ষা বোর্ডভুক্ত
        </span>
      </div>
    </div>
  );
};
