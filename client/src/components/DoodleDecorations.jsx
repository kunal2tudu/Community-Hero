import React from 'react';

export const DoodleSun = ({ className = 'w-16 h-16' }) => (
  <svg className={`doodle ${className}`} viewBox="0 0 100 100" fill="none" stroke="black" strokeWidth="2">
    <circle cx="50" cy="50" r="20" fill="white" />
    <path d="M50 10 L50 25 M50 90 L50 75 M10 50 L25 50 M90 50 L75 50 M20 20 L35 35 M80 80 L65 65 M20 80 L35 65 M80 20 L65 35" strokeLinecap="round" />
  </svg>
);

export const DoodleSparkle = ({ className = 'w-12 h-12' }) => (
  <svg className={`doodle ${className}`} viewBox="0 0 100 100" fill="none" stroke="black" strokeWidth="2">
    <path d="M50 10 L50 30 M50 70 L50 90 M10 50 L30 50 M70 50 L90 50 M25 25 L40 40 M60 60 L75 75 M25 75 L40 60 M60 40 L75 25" strokeLinecap="round" />
    <circle cx="50" cy="50" fill="white" r="12" />
  </svg>
);

export const DoodleHeart = ({ className = 'w-10 h-10' }) => (
  <svg className={`doodle ${className}`} viewBox="0 0 100 100" fill="none" stroke="black" strokeWidth="2">
    <path d="M50 80 C 20 80, 20 20, 50 40 C 80 20, 80 80, 50 80 Z" fill="white" />
  </svg>
);

export const DoodleSmiley = ({ className = 'w-14 h-14' }) => (
  <svg className={`doodle ${className}`} viewBox="0 0 100 100" fill="none" stroke="black" strokeWidth="2">
    <circle cx="50" cy="50" r="38" fill="white" strokeWidth="2.5" />
    <circle cx="36" cy="42" r="4" fill="black" />
    <circle cx="64" cy="42" r="4" fill="black" />
    <path d="M35 60 Q 50 75 65 60" strokeLinecap="round" strokeWidth="2.5" />
  </svg>
);

export const DoodleCloud = ({ className = 'w-16 h-10' }) => (
  <svg className={`doodle ${className}`} viewBox="0 0 100 60" fill="none" stroke="black" strokeWidth="2">
    <path d="M20 50 C10 50 5 40 10 30 C10 20 25 15 35 22 C45 10 65 10 75 22 C85 18 95 28 90 40 C95 50 85 50 80 50 Z" fill="white" />
  </svg>
);
