import React from 'react';
import { Video, Youtube, ExternalLink } from 'lucide-react';
import { useSiteData } from '../../hooks/useSiteData';

export const Videos: React.FC = () => {
  const { videos } = useSiteData();

  // As per instructions: "Only display videos added by Admin"
  if (videos.length === 0) {
    return null;
  }

  const getEmbedUrl = (url: string) => {
    try {
      if (url.includes('youtube.com/watch?v=')) {
        const id = url.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${id}`;
      } else if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split('?')[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      return url;
    } catch {
      return url;
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#045D38] tracking-widest uppercase bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-200">
            ভিডিও প্রদর্শনী
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2 tracking-tight flex items-center justify-center gap-2">
            <Video className="w-7 h-7 text-[#045D38]" />
            ভিডিও গ্যালারি
          </h2>
          <div className="w-16 h-1 bg-[#045D38] mx-auto mt-3 rounded-full" />
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-slate-200 transition-all"
            >
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={getEmbedUrl(vid.youtubeUrl)}
                  title={vid.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-sm text-gray-900 line-clamp-2">
                  {vid.title}
                </h4>
                {vid.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {vid.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
