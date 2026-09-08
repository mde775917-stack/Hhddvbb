import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  FileText,
  Download,
  AlertCircle,
  ArrowRight,
  X,
  Search,
  Tag,
} from 'lucide-react';
import { useSiteData } from '../../hooks/useSiteData';
import { NoticeItem } from '../../types';

interface NoticesProps {
  showAll?: boolean;
}

export const Notices: React.FC<NoticesProps> = ({ showAll = false }) => {
  const { notices } = useSiteData();
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('সকল');

  const publishedNotices = notices.filter((n) => n.published);

  // Filter logic
  const filtered = publishedNotices.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === 'সকল' || n.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  const displayedNotices = showAll ? filtered : filtered.slice(0, 4);

  const categories = ['সকল', 'ভর্তি বিজ্ঞপ্তি', 'পরীক্ষা সংক্রান্ত', 'সাধারণ নোটিশ'];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-100 gap-4">
          <div>
            <span className="text-xs font-bold text-[#045D38] tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
              বিজ্ঞপ্তি ও আপডেট
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2 tracking-tight flex items-center gap-2.5">
              <Bell className="w-7 h-7 text-[#045D38]" />
              সর্বশেষ নোটিশ
            </h2>
          </div>

          {!showAll && (
            <a
              href="/notices"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#045D38] hover:text-[#064E3B] group"
            >
              <span>সকল নোটিশ দেখুন</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          )}
        </div>

        {/* Filter Bar (if showing all notices) */}
        {showAll && (
          <div className="mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-[#045D38] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="নোটিশ খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs outline-none focus:border-emerald-500"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2" />
            </div>
          </div>
        )}

        {/* Notices List */}
        {displayedNotices.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-gray-200">
            <Bell className="w-10 h-10 text-gray-400 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-medium text-gray-600">কোনো নোটিশ পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayedNotices.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedNotice(item)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  item.isImportant
                    ? 'bg-amber-50/40 border-amber-200 hover:border-amber-300'
                    : 'bg-white hover:bg-slate-50 border-gray-200 hover:border-emerald-300'
                } shadow-2xs hover:shadow-sm`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2.5 rounded-xl shrink-0 ${
                      item.isImportant
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {item.isImportant && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded">
                          <AlertCircle className="w-3 h-3" />
                          জরুরি
                        </span>
                      )}
                      <span className="text-[11px] font-medium text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {item.date}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-gray-900 hover:text-[#045D38] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="sm:shrink-0 flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  {item.fileUrl && (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium">
                      <Download className="w-3.5 h-3.5" />
                      সংযুক্তি আছে
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#045D38]">
                    পড়ুন <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Notice Details Modal */}
        {selectedNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden">
              <div className="bg-[#045D38] text-white p-5 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#FDE047] bg-emerald-900/80 px-2 py-0.5 rounded">
                    {selectedNotice.category}
                  </span>
                  <p className="text-xs text-emerald-200 mt-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    প্রকাশের তারিখ: {selectedNotice.date}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="p-1 rounded-lg hover:bg-emerald-800 text-emerald-100 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                  {selectedNotice.title}
                </h3>

                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  {selectedNotice.description}
                </div>

                {selectedNotice.fileUrl && (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-emerald-800 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      নোটিশ ফাইল/সংযুক্তি
                    </span>
                    <a
                      href={selectedNotice.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="inline-flex items-center gap-1 bg-[#045D38] hover:bg-[#064E3B] text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                    >
                      <Download className="w-3.5 h-3.5" />
                      ডাউনলোড
                    </a>
                  </div>
                )}
              </div>

              <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="px-4 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold"
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
