import React from 'react';
import { Hero } from '../components/public/Hero';
import { InstitutionInfo } from '../components/public/InstitutionInfo';
import { About } from '../components/public/About';
import { Programs } from '../components/public/Programs';
import { WhyChooseUs } from '../components/public/WhyChooseUs';
import { PrincipalMessage } from '../components/public/PrincipalMessage';
import { Teachers } from '../components/public/Teachers';
import { Admission } from '../components/public/Admission';
import { Notices } from '../components/public/Notices';
import { Results } from '../components/public/Results';
import { Gallery } from '../components/public/Gallery';
import { Videos } from '../components/public/Videos';
import { Contact } from '../components/public/Contact';

export const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <InstitutionInfo />
      <div id="about">
        <About />
      </div>
      <div id="programs">
        <Programs />
      </div>
      <WhyChooseUs />
      <div id="principal">
        <PrincipalMessage />
      </div>
      <div id="teachers">
        <Teachers />
      </div>
      <div id="admission">
        <Admission />
      </div>
      <div id="notices">
        <Notices />
      </div>
      <div id="results">
        <Results />
      </div>
      <div id="gallery">
        <Gallery />
      </div>
      <Videos />
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
};
