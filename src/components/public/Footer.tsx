import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Share2,
  Youtube,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Heart,
} from 'lucide-react';
import { useSiteData } from '../../hooks/useSiteData';

export const Footer: React.FC = () => {
  const { settings } = useSiteData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#033621] text-emerald-100 border-t-4 border-[#D4AF37]">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1: Institution Brand & Summary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#045D38] to-[#0D9488] text-white flex items-center justify-center shadow-md border border-[#D4AF37] shrink-0">
                {settings.logoUrl ? (
                  <img
                    src={settings.logoUrl}
                    alt={settings.madrasaName}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <GraduationCap className="w-7 h-7 text-[#FDE047]" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-white text-base sm:text-lg leading-snug">
                  {settings.madrasaName}
                </h3>
                <p className="text-xs text-emerald-300">
                  {settings.englishName}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed pt-2">
              ময়মনসিংহ জেলার ফুলবাড়ীয়া উপজেলার একটি ঐতিহাসিক দ্বীনি ও প্রাতিষ্ঠানিক উচ্চশিক্ষা বিদ্যাপীঠ।
            </p>

            {settings.eiin && (
              <div className="inline-block bg-[#022617] border border-emerald-800 text-[#FDE047] text-xs px-3 py-1 rounded-md font-mono">
                EIIN: {settings.eiin} | প্রতিষ্ঠিত: {settings.establishedYear}
              </div>
            )}
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-emerald-800 pb-2">
              প্রয়োজনীয় লিংক
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/about" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>আমাদের সম্পর্কে</span>
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>শিক্ষা কার্যক্রম ও বিভাগ</span>
                </Link>
              </li>
              <li>
                <Link to="/admission" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>ভর্তি তথ্য ও আবেদন</span>
                </Link>
              </li>
              <li>
                <Link to="/teachers" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>শিক্ষকমণ্ডলী</span>
                </Link>
              </li>
              <li>
                <Link to="/notices" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>নোটিশ বোর্ড</span>
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>ফলাফল অনুসন্ধান</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Summary */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-emerald-800 pb-2">
              ঠিকানা ও যোগাযোগ
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-emerald-200">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FDE047] shrink-0 mt-0.5" />
                <span>{settings.location}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FDE047] shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white font-mono text-sm">
                  {settings.phone}
                </a>
              </p>
              {settings.email && (
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#FDE047] shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-white text-xs">
                    {settings.email}
                  </a>
                </p>
              )}
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-2">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#022617] hover:bg-emerald-800 flex items-center justify-center text-white transition-colors"
                  title="Facebook"
                >
                  <Share2 className="w-4 h-4 text-[#FDE047]" />
                </a>
              )}
              {settings.youtubeUrl && (
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#022617] hover:bg-emerald-800 flex items-center justify-center text-white transition-colors"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4 text-red-400" />
                </a>
              )}
              {settings.whatsappNumber && (
                <a
                  href={`https://wa.me/88${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#022617] hover:bg-emerald-800 flex items-center justify-center text-white transition-colors"
                  title="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                </a>
              )}
            </div>
          </div>

          {/* Column 4: Admin Access */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-emerald-800 pb-2">
              প্রশাসন
            </h4>
            <p className="text-xs text-emerald-300">
              মাদরাসার তথ্য ও কার্যক্রম হালনাগাদ করতে অফিসিয়াল প্যানেল।
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b58f23] text-slate-950 px-3.5 py-2 rounded-lg text-xs font-bold transition-all shadow"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>অ্যাডমিন পোর্টাল</span>
            </Link>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-300">
          <p>
            © {currentYear} {settings.madrasaName}। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="flex items-center gap-1 text-[11px]">
            <span>ইসলামী ও প্রাতিষ্ঠানিক শিক্ষার সমন্বয়ে পরিচালিত</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
