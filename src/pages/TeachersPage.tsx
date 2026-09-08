import React from 'react';
import { Teachers } from '../components/public/Teachers';
import { PrincipalMessage } from '../components/public/PrincipalMessage';

export const TeachersPage: React.FC = () => {
  return (
    <div className="pt-4">
      <PrincipalMessage />
      <Teachers />
    </div>
  );
};
