import React, { useState } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, ZoomIn, Award } from 'lucide-react';
import { useSiteData } from '../../hooks/useSiteData';
import { GalleryItem } from '../../types';

export const Gallery: React.FC = () => {
  const { gallery } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    'সকল',
    'মাদ্রাসা ক্যাম্পাস',
    'শিক্ষা কার্যক্রম',
    'অনুষ্ঠান',
    'ক্রীড়া',
    'পুরস্কার বিতরণ',
    'অন্যান্য',
  ];

  const filteredGallery =
    selectedCategory === 'সকল'
      ? gallery
      : gallery.filter((item) => item.category === selectedCategory);

  const activeImage = lightboxIndex !== null ? filteredGallery[lightboxIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredGallery.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! < filteredGallery.length - 1 ? prev! + 1 : 0));
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#045D38] tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
            স্মৃতি ও প্রাঙ্গণ
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight flex items-center justify-center gap-2">
            <ImageIcon className="w-8 h-8 text-[#045D38]" />
            ফটো গ্যালারি
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            আছিম পাটুলী ফাজিল (ডিগ্রী) মাদরাসার মনোরম ক্যাম্পাস, প্রাতিষ্ঠানিক অনুষ্ঠান ও কর্মকাণ্ডের স্থিরচিত্র
          </p>
          <div className="w-16 h-1 bg-[#045D38] mx-auto mt-3 rounded-full" />
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#045D38] text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-200 hover:border-emerald-300 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Primary Campus Badge */}
                {item.isPrimaryCampus && (
                  <div className="absolute top-2 left-2 bg-[#045D38]/90 text-[#FDE047] text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1 backdrop-blur-xs">
                    <Award className="w-3 h-3" />
                    <span>অফিসিয়াল ক্যাম্পাস চিত্র</span>
                  </div>
                )}

                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-emerald-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2.5 rounded-full bg-white/90 text-emerald-900 shadow">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                <span className="absolute bottom-2 right-2 bg-slate-900/70 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs">
                  {item.category}
                </span>
              </div>

              {/* Caption */}
              <div className="p-4">
                <h4 className="font-bold text-sm text-gray-900 group-hover:text-[#045D38] transition-colors line-clamp-1">
                  {item.title}
                </h4>
                {item.caption && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            {filteredGallery.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Button */}
            {filteredGallery.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Image Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            >
              <div className="max-h-[75vh] flex items-center justify-center bg-black/40 overflow-hidden">
                <img
                  src={activeImage.imageUrl}
                  alt={activeImage.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Caption & Metadata bar */}
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-emerald-300">
                    {activeImage.title}
                  </h3>
                  {activeImage.caption && (
                    <p className="text-xs text-gray-300 mt-0.5">{activeImage.caption}</p>
                  )}
                </div>
                <span className="text-xs bg-emerald-800 text-white px-3 py-1 rounded-full font-medium">
                  {activeImage.category}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
