import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Clock,
  Menu,
  X,
  GraduationCap,
  Sparkles,
  BookOpen,
  LogIn,
  MapPin,
  Share2,
} from 'lucide-react';
import { useSiteData } from '../../hooks/useSiteData';
import { useAuth } from '../../hooks/useAuth';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { settings, admissionSettings } = useSiteData();
  const { isAdmin } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'হোম', path: '/' },
    { name: 'আমাদের সম্পর্কে', path: '/about' },
    { name: 'শিক্ষা কার্যক্রম', path: '/programs' },
    { name: 'শিক্ষকবৃন্দ', path: '/teachers' },
    { name: 'ভর্তি তথ্য', path: '/admission' },
    { name: 'নোটিশ', path: '/notices' },
    { name: 'ফলাফল', path: '/results' },
    { name: 'গ্যালারি', path: '/gallery' },
    { name: 'যোগাযোগ', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50 transition-all">
      {/* Top Header Bar */}
      <div className="bg-[#045D38] text-emerald-50 text-xs sm:text-sm py-2 px-4 border-b border-[#064E3B]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Institution Contact & Location */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#FDE047]" />
              {settings.location}
            </span>
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#FDE047]" />
              {settings.phone}
            </a>
            {settings.eiin && (
              <span className="hidden md:inline-flex items-center gap-1 bg-[#064E3B] px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide border border-emerald-700/50">
                EIIN: {settings.eiin}
              </span>
            )}
          </div>

          {/* Social Links & Admin Portal Link */}
          <div className="flex items-center gap-3">
            {settings.facebookUrl && (
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                title="ফেসবুক"
              >
                <Share2 className="w-3.5 h-3.5" />
              </a>
            )}
            <Link
              to={isAdmin ? '/admin' : '/login'}
              className="inline-flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded transition-colors"
            >
              <LogIn className="w-3 h-3 text-[#FDE047]" />
              {isAdmin ? 'অ্যাডমিন ড্যাশবোর্ড' : 'অ্যাডমিন লগইন'}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Branding Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          {/* Logo Area */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#045D38] to-[#0D9488] text-white flex items-center justify-center shadow-md border-2 border-[#D4AF37] shrink-0">
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

          {/* Madrasa Title & Subtitle */}
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-[#045D38] leading-tight group-hover:text-[#064E3B] transition-colors">
              {settings.madrasaName}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 font-medium tracking-wide">
              {settings.englishName}
            </p>
          </div>
        </Link>

        {/* Admission CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {admissionSettings.isAdmissionOpen && (
            <Link
              to="/admission"
              className="hidden lg:inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B48C28] text-slate-900 font-bold px-4 py-2 rounded-lg text-sm shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-emerald-950" />
              ভর্তি চলছে ({admissionSettings.currentSession})
            </Link>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#045D38] focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Main Navigation Bar */}
      <nav className="hidden lg:block bg-[#045D38] border-t border-[#064E3B]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center gap-1 py-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`block px-3.5 py-2.5 rounded-md text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'bg-[#064E3B] text-white shadow-inner font-semibold border-b-2 border-[#D4AF37]'
                      : 'text-emerald-50 hover:bg-[#064E3B]/60 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-xs text-emerald-100 py-2">
            <BookOpen className="w-4 h-4 text-[#FDE047]" />
            <span>দ্বীনি ও সাধারণ শিক্ষার অনন্য তীর্থভূমি</span>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#045D38] border-t border-[#064E3B] px-4 pt-2 pb-4 shadow-xl">
          <ul className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-[#064E3B] text-[#FDE047] font-semibold'
                      : 'text-emerald-50 hover:bg-[#064E3B] hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {admissionSettings.isAdmissionOpen && (
              <li className="pt-2">
                <Link
                  to="/admission"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-[#D4AF37] text-slate-950 font-bold px-4 py-2.5 rounded-md text-sm shadow text-center"
                >
                  <Sparkles className="w-4 h-4" />
                  ভর্তি চলছে ({admissionSettings.currentSession})
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};
