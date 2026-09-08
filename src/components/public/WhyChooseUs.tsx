import React from 'react';
import {
  HeartHandshake,
  ShieldCheck,
  Clock,
  Users,
  Award,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useSiteData } from '../../hooks/useSiteData';

const getWhyChooseIcon = (iconName: string) => {
  switch (iconName) {
    case 'HeartHandshake':
      return <HeartHandshake className="w-6 h-6 text-emerald-600" />;
    case 'ShieldCheck':
      return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
    case 'Clock':
      return <Clock className="w-6 h-6 text-emerald-600" />;
    case 'Users':
      return <Users className="w-6 h-6 text-emerald-600" />;
    case 'Award':
      return <Award className="w-6 h-6 text-emerald-600" />;
    case 'CheckCircle2':
      return <CheckCircle2 className="w-6 h-6 text-emerald-600" />;
    default:
      return <Sparkles className="w-6 h-6 text-emerald-600" />;
  }
};

export const WhyChooseUs: React.FC = () => {
  const { whyChoose } = useSiteData();

  return (
    <section className="py-12 sm:py-16 bg-[#F1F5F3]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold text-[#045D38] tracking-widest uppercase bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-200">
            আমাদের বিশেষত্ব
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
            কেন আমাদের মাদরাসা?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            একটি আদর্শ দ্বীনি ও প্রাতিষ্ঠানিক বিদ্যাপীঠ হিসেবে আমাদের স্বকীয় বৈশিষ্ট্যসমূহ
          </p>
          <div className="w-16 h-1 bg-[#045D38] mx-auto mt-3 rounded-full" />
        </div>

        {/* 6 Core Reason Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChoose.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 hover:shadow-md transition-all duration-300 group flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 group-hover:bg-[#045D38] group-hover:text-white transition-colors shrink-0">
                {getWhyChooseIcon(item.iconName)}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#045D38] transition-colors mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
