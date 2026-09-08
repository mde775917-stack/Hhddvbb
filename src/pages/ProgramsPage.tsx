import React from 'react';
import { Programs } from '../components/public/Programs';
import { Admission } from '../components/public/Admission';

export const ProgramsPage: React.FC = () => {
  return (
    <div className="pt-4">
      <Programs />
      <Admission />
    </div>
  );
};
