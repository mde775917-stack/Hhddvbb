import React from 'react';
import { Admission } from '../components/public/Admission';
import { Programs } from '../components/public/Programs';

export const AdmissionPage: React.FC = () => {
  return (
    <div className="pt-4">
      <Admission />
      <Programs />
    </div>
  );
};
