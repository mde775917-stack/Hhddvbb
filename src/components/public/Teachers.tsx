import React from 'react';
import { User, BookOpen, GraduationCap, Phone, Mail, ShieldAlert, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../../hooks/useSiteData';
import { useAuth } from '../../hooks/useAuth';

export const Teachers: React.FC = () => {
  const { teachers } = useSiteData();
  const { isAdmin } = useAuth();

  return (
    <section className="py-12 sm:py-16 bg-[#F8FAF9]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold text-[#045D38] tracking-widest uppercase bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-200">
            শিক্ষকমণ্ডলীর তথ্য
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
            আমাদের শিক্ষকবৃন্দ
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            দ্বীনি ও আধুনিক শিক্ষায় পারদর্শী, অভিজ্ঞ ও নিষ্ঠাবান শিক্ষকমণ্ডলীর তালিকা
          </p>
          <div className="w-16 h-1 bg-[#045D38] mx-auto mt-3 rounded-full" />
        </div>

        {/* If no teachers added yet */}
        {teachers.length === 0 ? (
          <div className="max-w-xl mx-auto bg-white rounded-2xl p-8 text-center border border-dashed border-emerald-200 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 opacity-60" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              শিক্ষক তালিকা শীঘ্রই হালনাগাদ করা হচ্ছে
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              মাদরাসার শিক্ষক ও কর্মচারীদের অনুমোদিত তথ্য যাচাইকরণ শেষে সরাসরি অফিসিয়াল প্যানেলে প্রকাশ করা হবে।
            </p>

            {isAdmin && (
              <div className="mt-5">
                <Link
                  to="/admin/teachers"
                  className="inline-flex items-center gap-2 bg-[#045D38] hover:bg-[#064E3B] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  শিক্ষক তথ্য যুক্ত করুন
                </Link>
              </div>
            )}
          </div>
        ) : (
          /* Teachers Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-emerald-100 transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Photo Container */}
                  <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden relative flex items-center justify-center">
                    {teacher.photoUrl ? (
                      <img
                        src={teacher.photoUrl}
                        alt={teacher.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <User className="w-16 h-16 opacity-40" />
                        <span className="text-[11px] font-medium text-gray-500 mt-1">ছবি নেই</span>
                      </div>
                    )}
                    <span className="absolute bottom-2 right-2 bg-emerald-950/80 text-[#FDE047] text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                      {teacher.subject}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <h3 className="font-bold text-base text-gray-900 group-hover:text-[#045D38] transition-colors">
                      {teacher.name}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                      {teacher.designation}
                    </p>

                    {teacher.qualification && (
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{teacher.qualification}</span>
                      </p>
                    )}

                    {teacher.biography && (
                      <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                        {teacher.biography}
                      </p>
                    )}
                  </div>
                </div>

                {/* Contact Footer */}
                {(teacher.phone || teacher.email) && (
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-3 text-xs text-gray-600">
                    {teacher.phone && (
                      <a
                        href={`tel:${teacher.phone}`}
                        className="flex items-center gap-1 hover:text-[#045D38]"
                        title={teacher.phone}
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{teacher.phone}</span>
                      </a>
                    )}
                    {teacher.email && (
                      <a
                        href={`mailto:${teacher.email}`}
                        className="flex items-center gap-1 hover:text-[#045D38]"
                        title={teacher.email}
                      >
                        <Mail className="w-3.5 h-3.5 text-emerald-600" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
