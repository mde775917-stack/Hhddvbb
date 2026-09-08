import React from 'react';
import { About } from '../components/public/About';
import { WhyChooseUs } from '../components/public/WhyChooseUs';
import { PrincipalMessage } from '../components/public/PrincipalMessage';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-4">
      <About />
      <PrincipalMessage />
      <WhyChooseUs />
    </div>
  );
};
