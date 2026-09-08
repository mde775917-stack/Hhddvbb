import React from 'react';
import { Gallery } from '../components/public/Gallery';
import { Videos } from '../components/public/Videos';

export const GalleryPage: React.FC = () => {
  return (
    <div className="pt-4">
      <Gallery />
      <Videos />
    </div>
  );
};
