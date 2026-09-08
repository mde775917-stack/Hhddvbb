import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Share2,
  Clock,
  MessageSquare,
} from 'lucide-react';
import { useSiteData } from '../../hooks/useSiteData';
import { submitContactMessage } from '../../firebase/services';

export const Contact: React.FC = () => {
  const { settings } = useSiteData();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name || !formData.phone || !formData.message) {
      setErrorMsg('অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর এবং বার্তাটি প্রদান করুন।');
      return;
    }

    try {
      setSubmitting(true);
      await submitContactMessage({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: formData.subject || 'সাধারণ যোগাযোগ',
        message: formData.message,
      });
      setSuccess(true);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setErrorMsg('বার্তা প্রেরণ করা সম্ভব হয়নি। সরাসরি মোবাইল নম্বরে যোগাযোগ করুন।');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold text-[#045D38] tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
            যোগাযোগ ও তথ্যসেবা
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
            যোগাযোগ করুন
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            যেকোনো তথ্য, পরামর্শ অথবা ভর্তি অনুসন্ধানের জন্য আমাদের সাথে যোগাযোগ করুন
          </p>
          <div className="w-16 h-1 bg-[#045D38] mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Contact Details & Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-[#045D38] to-[#064E3B] rounded-2xl p-6 sm:p-8 text-white shadow-md">
              <h3 className="text-xl font-bold mb-6 text-[#FDE047] flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                অফিসিয়াল যোগাযোগের ঠিকানা
              </h3>

              <div className="space-y-5 text-sm sm:text-base">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-800 text-[#FDE047] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-200 block font-medium">মাদরাসা ক্যাম্পাস ঠিকানা</span>
                    <strong className="text-white text-sm sm:text-base leading-snug block mt-0.5">
                      {settings.location}
                    </strong>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-800 text-[#FDE047] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-200 block font-medium">অফিসিয়াল মোবাইল</span>
                    <a
                      href={`tel:${settings.phone}`}
                      className="text-white hover:text-[#FDE047] text-base font-bold tracking-wide transition-colors block mt-0.5"
                    >
                      {settings.phone}
                    </a>
                    <span className="text-xs text-emerald-300">সরাসরি কল করুন</span>
                  </div>
                </div>

                {/* Email (if available) */}
                {settings.email && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-800 text-[#FDE047] shrink-0 mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-emerald-200 block font-medium">ইমেইল ঠিকানা</span>
                      <a
                        href={`mailto:${settings.email}`}
                        className="text-white hover:text-[#FDE047] text-sm block mt-0.5"
                      >
                        {settings.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Social & Messaging */}
                <div className="pt-4 border-t border-emerald-700/60 flex flex-wrap items-center gap-3">
                  {settings.facebookUrl && (
                    <a
                      href={settings.facebookUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 bg-emerald-900/80 hover:bg-emerald-800 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-100 transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5 text-[#FDE047]" />
                      <span>ফেসবুক পেজ</span>
                    </a>
                  )}

                  {settings.whatsappNumber && (
                    <a
                      href={`https://wa.me/88${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 bg-emerald-900/80 hover:bg-emerald-800 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-100 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>হোয়াটসঅ্যাপ</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            {settings.googleMapEmbedUrl && (
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-emerald-100 h-64 sm:h-72">
                <iframe
                  src={settings.googleMapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location"
                />
              </div>
            )}
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-slate-50/70 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Send className="w-5 h-5 text-[#045D38]" />
              সরাসরি বার্তা পাঠান
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-6">
              আপনার মতামত, জিজ্ঞাসা বা অভিযোগ লিখে পাঠান। প্রশাসন দ্রুত সাড়া দেবে।
            </p>

            {success ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-gray-900 text-base">
                  আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে!
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  ধন্যবাদ। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-4 py-2 bg-[#045D38] text-white rounded-lg text-xs font-bold hover:bg-[#064E3B]"
                >
                  নতুন বার্তা পাঠান
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      আপনার নাম <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="আপনার পূর্ণ নাম"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      মোবাইল নম্বর <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="০১XXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      ইমেইল (ঐচ্ছিক)
                    </label>
                    <input
                      type="email"
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      বিষয়
                    </label>
                    <input
                      type="text"
                      placeholder="বার্তা বা জিজ্ঞাসার বিষয়"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    আপনার বার্তা <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="এখানে আপনার বার্তা বিস্তারিত লিখুন..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#045D38] hover:bg-[#064E3B] text-white font-bold flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'বার্তা পাঠানো হচ্ছে...' : 'বার্তা প্রেরণ করুন'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
