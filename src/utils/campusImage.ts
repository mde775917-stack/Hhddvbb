// Official authentic campus gate and signboard photograph of Achim Patuli Fazil (Degree) Madrasah
import officialGatePhoto from '../assets/images/achim_madrasah_gate_1788901948640.jpg';

export const OFFICIAL_CAMPUS_IMAGE = officialGatePhoto;
export const DEFAULT_CAMPUS_IMAGE_URL = officialGatePhoto;

export const DEFAULT_CAMPUS_IMAGE_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" width="1200" height="700">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7dd3fc" />
      <stop offset="40%" stop-color="#bae6fd" />
      <stop offset="85%" stop-color="#e0f2fe" />
      <stop offset="100%" stop-color="#f0fdf4" />
    </linearGradient>
    <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fef9c3" />
      <stop offset="10%" stop-color="#fef08a" />
      <stop offset="100%" stop-color="#fde047" />
    </linearGradient>
    <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#047857" />
      <stop offset="100%" stop-color="#064e3b" />
    </linearGradient>
    <linearGradient id="signboardGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#064e3b" />
      <stop offset="50%" stop-color="#065f46" />
      <stop offset="100%" stop-color="#044e3b" />
    </linearGradient>
    <linearGradient id="grassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#16a34a" />
      <stop offset="60%" stop-color="#15803d" />
      <stop offset="100%" stop-color="#166534" />
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000" flood-opacity="0.3"/>
    </filter>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Sky -->
  <rect width="1200" height="700" fill="url(#skyGrad)"/>

  <!-- Clouds -->
  <g fill="#ffffff" opacity="0.85">
    <circle cx="200" cy="90" r="50"/>
    <circle cx="240" cy="80" r="60"/>
    <circle cx="290" cy="90" r="45"/>
    <circle cx="330" cy="100" r="35"/>

    <circle cx="850" cy="110" r="55"/>
    <circle cx="900" cy="95" r="70"/>
    <circle cx="960" cy="110" r="50"/>
    <circle cx="1010" cy="120" r="40"/>
  </g>

  <!-- Background Trees & Foliage -->
  <g fill="#15803d" opacity="0.9">
    <ellipse cx="100" cy="460" rx="90" ry="120"/>
    <ellipse cx="170" cy="450" rx="100" ry="140"/>
    <ellipse cx="230" cy="470" rx="80" ry="110"/>
    <ellipse cx="980" cy="460" rx="95" ry="130"/>
    <ellipse cx="1060" cy="450" rx="110" ry="150"/>
    <ellipse cx="1130" cy="480" rx="85" ry="110"/>
  </g>

  <!-- Main Multi-story Academic Madrasa Building -->
  <!-- 3rd Floor -->
  <g filter="url(#shadow)">
    <!-- Main Wall Structure -->
    <rect x="220" y="240" width="760" height="300" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3" rx="4"/>
    
    <!-- Top Green Parapet / Islamic Cornice -->
    <rect x="200" y="220" width="800" height="24" fill="url(#roofGrad)" rx="3"/>
    <polygon points="210,220 230,200 250,220" fill="#047857"/>
    <polygon points="580,220 600,180 620,220" fill="#047857"/>
    <polygon points="950,220 970,200 990,220" fill="#047857"/>
    <!-- Crescent & Star on Central Dome -->
    <circle cx="600" cy="175" r="10" fill="#fbbf24"/>
  </g>

  <!-- Veranda Columns & Floors (Fazil Degree Academic Block) -->
  <g fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5">
    <!-- Floor dividers -->
    <rect x="220" y="340" width="760" height="12" fill="#047857"/>
    <rect x="220" y="440" width="760" height="14" fill="#047857"/>

    <!-- Veranda Railings (Balcony Grills) -->
    <rect x="230" y="315" width="740" height="25" fill="#f1f5f9" stroke="#047857" stroke-width="1.5"/>
    <rect x="230" y="415" width="740" height="25" fill="#f1f5f9" stroke="#047857" stroke-width="1.5"/>
  </g>

  <!-- Windows & Archways on Madrasa Building -->
  <g fill="#0f766e" stroke="#134e4a" stroke-width="2">
    <!-- 3rd Floor Windows (Islamic Arched) -->
    <path d="M 270 290 Q 285 265 300 290 L 300 315 L 270 315 Z" fill="#0369a1"/>
    <path d="M 350 290 Q 365 265 380 290 L 380 315 L 350 315 Z" fill="#0369a1"/>
    <path d="M 430 290 Q 445 265 460 290 L 460 315 L 430 315 Z" fill="#0369a1"/>
    <path d="M 510 290 Q 525 265 540 290 L 540 315 L 510 315 Z" fill="#0369a1"/>
    <path d="M 590 290 Q 605 265 620 290 L 620 315 L 590 315 Z" fill="#0369a1"/>
    <path d="M 670 290 Q 685 265 700 290 L 700 315 L 670 315 Z" fill="#0369a1"/>
    <path d="M 750 290 Q 765 265 780 290 L 780 315 L 750 315 Z" fill="#0369a1"/>
    <path d="M 830 290 Q 845 265 860 290 L 860 315 L 830 315 Z" fill="#0369a1"/>
    <path d="M 910 290 Q 925 265 940 290 L 940 315 L 910 315 Z" fill="#0369a1"/>

    <!-- 2nd Floor Classrooms -->
    <path d="M 270 390 Q 285 365 300 390 L 300 415 L 270 415 Z" fill="#0284c7"/>
    <path d="M 350 390 Q 365 365 380 390 L 380 415 L 350 415 Z" fill="#0284c7"/>
    <path d="M 430 390 Q 445 365 460 390 L 460 415 L 430 415 Z" fill="#0284c7"/>
    <path d="M 510 390 Q 525 365 540 390 L 540 415 L 510 415 Z" fill="#0284c7"/>
    <path d="M 590 390 Q 605 365 620 390 L 620 415 L 590 415 Z" fill="#0284c7"/>
    <path d="M 670 390 Q 685 365 700 390 L 700 415 L 670 415 Z" fill="#0284c7"/>
    <path d="M 750 390 Q 765 365 780 390 L 780 415 L 750 415 Z" fill="#0284c7"/>
    <path d="M 830 390 Q 845 365 860 390 L 860 415 L 830 415 Z" fill="#0284c7"/>
    <path d="M 910 390 Q 925 365 940 390 L 940 415 L 910 415 Z" fill="#0284c7"/>

    <!-- Ground Floor Corridor & Entrance -->
    <rect x="560" y="465" width="80" height="75" fill="#1e293b" rx="2"/>
    <path d="M 560 475 Q 600 450 640 475 Z" fill="#047857"/>
  </g>

  <!-- Front Green Courtyard / Ground -->
  <rect x="0" y="520" width="1200" height="180" fill="url(#grassGrad)"/>

  <!-- Paved Walkway leading to Madrasa -->
  <polygon points="530,540 670,540 760,700 440,700" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2"/>
  <line x1="560" y1="580" x2="640" y2="580" stroke="#94a3b8" stroke-width="2"/>
  <line x1="530" y1="620" x2="670" y2="620" stroke="#94a3b8" stroke-width="2"/>
  <line x1="490" y1="660" x2="710" y2="660" stroke="#94a3b8" stroke-width="2"/>

  <!-- Official Madrasa Entrance Gate & Signboard (PRESERVED & PROMINENT) -->
  <g filter="url(#shadow)">
    <!-- Gate Pillars -->
    <rect x="140" y="410" width="38" height="230" fill="#ffffff" stroke="#047857" stroke-width="3" rx="3"/>
    <rect x="1022" y="410" width="38" height="230" fill="#ffffff" stroke="#047857" stroke-width="3" rx="3"/>
    
    <!-- Pillar Tops / Minarets -->
    <polygon points="135,410 159,370 183,410" fill="#047857"/>
    <circle cx="159" cy="365" r="5" fill="#fbbf24"/>
    <polygon points="1017,410 1041,370 1065,410" fill="#047857"/>
    <circle cx="1041" cy="365" r="5" fill="#fbbf24"/>

    <!-- THE OFFICIAL SIGNBOARD ARCH & BOARD -->
    <!-- Signboard Frame -->
    <rect x="160" y="390" width="880" height="135" fill="#ffffff" stroke="#d97706" stroke-width="4" rx="10"/>
    <rect x="166" y="396" width="868" height="123" fill="url(#signboardGrad)" rx="8"/>

    <!-- Islamic Bismillah Calligraphy Banner on Top of Signboard -->
    <rect x="380" y="375" width="440" height="28" fill="#047857" stroke="#fbbf24" stroke-width="2" rx="6"/>
    <text x="600" y="394" fill="#fbbf24" font-family="'Noto Sans Bengali', 'Hind Siliguri', sans-serif" font-size="14" font-weight="bold" text-anchor="middle">
      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
    </text>

    <!-- Signboard Inner Gold Border -->
    <rect x="174" y="404" width="852" height="107" fill="none" stroke="#fbbf24" stroke-width="1.5" rx="5"/>

    <!-- Signboard Text (Preserving original exact institutional text) -->
    <text x="600" y="424" fill="#fef08a" font-family="'Hind Siliguri', sans-serif" font-size="14" font-weight="600" letter-spacing="1" text-anchor="middle">
      গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত ও ইসলামী আরবি বিশ্ববিদ্যালয় অধিভুক্ত
    </text>
    
    <!-- MAIN INSTITUTION NAME IN BOLD BENGALI -->
    <text x="600" y="460" fill="#ffffff" font-family="'Hind Siliguri', sans-serif" font-size="28" font-weight="800" text-anchor="middle" filter="url(#glow)">
      আছিম পাটুলী ফাজিল (ডিগ্রী) মাদরাসা
    </text>

    <!-- Subtitle on Signboard -->
    <text x="600" y="484" fill="#e2e8f0" font-family="'Hind Siliguri', sans-serif" font-size="14" font-weight="500" text-anchor="middle">
      ডাকঘর: আছিম পাটুলী, উপজেলা: ফুলবাড়ীয়া, জেলা: ময়মনসিংহ, বাংলাদেশ
    </text>

    <!-- Meta Details on Signboard -->
    <text x="600" y="503" fill="#fbbf24" font-family="'Hind Siliguri', sans-serif" font-size="12" font-weight="600" text-anchor="middle">
      স্থাপিত: ১৯৫২ খ্রিঃ | EIIN: ১১১৪৭২ | কোড: ১২৫৪৭
    </text>
  </g>

  <!-- Foreground Floral & Greenery -->
  <g fill="#22c55e">
    <circle cx="160" cy="645" r="30"/>
    <circle cx="190" cy="655" r="25"/>
    <circle cx="1010" cy="650" r="28"/>
    <circle cx="1040" cy="645" r="30"/>
    <circle cx="80" cy="680" r="45" fill="#15803d"/>
    <circle cx="1120" cy="680" r="45" fill="#15803d"/>
  </g>

  <!-- Official Badge Tag in bottom right corner -->
  <g transform="translate(930, 630)">
    <rect width="240" height="50" rx="8" fill="#064e3b" stroke="#fbbf24" stroke-width="2" opacity="0.95"/>
    <text x="120" y="24" fill="#fbbf24" font-family="'Hind Siliguri', sans-serif" font-size="12" font-weight="bold" text-anchor="middle">
      ★ অফিসিয়াল প্রধান ক্যাম্পাস চিত্র ★
    </text>
    <text x="120" y="40" fill="#ffffff" font-family="'Hind Siliguri', sans-serif" font-size="11" text-anchor="middle">
      আছিম পাটুলী ফাজিল (ডিগ্রী) মাদরাসা
    </text>
  </g>
</svg>
`)}`;
