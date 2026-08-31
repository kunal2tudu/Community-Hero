import React from 'react';
import { useApp } from '../context/AppContext.jsx';

export const Navbar = () => {
  const { activeTab, setActiveTab, playAudioFeedback } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'map', label: 'Live Map', icon: 'map' },
    { id: 'report', label: 'Report Issue', icon: 'flag' },
    { id: 'analytics', label: 'Analytics', icon: 'analytics' },
    { id: 'gamification', label: 'Hero Badges', icon: 'military_tech' }
  ];

  const handleNav = (id) => {
    playAudioFeedback('click');
    setActiveTab(id);
  };

  return (
    <>
      {/* Desktop Side Navigation */}
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-64 border-r border-primary bg-container flex-col p-gutter z-40">
        {/* Brand Logo & Header */}
        <div className="mb-8 cursor-pointer" onClick={() => handleNav('dashboard')}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full border-2 border-primary bg-accent-blue flex items-center justify-center font-headline-md font-bold text-xl shadow-[0_2px_0_0_rgba(0,0,0,1)]">
              ⚡
            </div>
            <div>
              <h1 className="font-headline-md text-headline-md font-bold text-primary italic leading-none">
                Community Hero
              </h1>
              <p className="font-label-lg text-xs text-on-surface-variant mt-0.5 tracking-wider uppercase">
                Hyperlocal Solver
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col gap-2 flex-grow">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNav(item.id)}
                  className={`w-full px-4 py-3 flex items-center gap-3 rounded-lg border transition-all duration-150 text-left ${
                    isActive
                      ? 'bg-secondary-container text-on-secondary-container border-primary font-bold shadow-[0_2px_0_0_rgba(0,0,0,1)] translate-x-1'
                      : 'text-on-surface border-transparent hover:bg-accent-blue/50 hover:border-primary/40'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <span className="font-label-lg text-sm">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Primary CTA Button */}
        <div className="mt-auto pt-6 border-t border-primary/20">
          <button
            onClick={() => handleNav('report')}
            className="w-full btn-ink py-3 px-4 font-label-lg text-sm flex items-center justify-center gap-2 group"
          >
            <span className="material-symbols-outlined text-lg group-hover:rotate-90 transition-transform">
              add_circle
            </span>
            Report New Issue
          </button>
        </div>

        {/* Subtle bottom doodle */}
        <div className="mt-4 flex justify-center opacity-40">
          <span className="text-xs font-caption text-outline">v2.4 • Whimsical AI Civic</span>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-container border-t-2 border-primary flex justify-around items-center z-40 px-2 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          if (item.id === 'report') {
            return (
              <div key={item.id} className="relative -top-4">
                <button
                  onClick={() => handleNav(item.id)}
                  className="w-12 h-12 rounded-full bg-primary text-on-primary border-2 border-primary flex items-center justify-center shadow-[0_3px_0_0_rgba(0,0,0,1)] active:translate-y-1"
                >
                  <span className="material-symbols-outlined text-2xl">add</span>
                </button>
              </div>
            );
          }
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`flex flex-col items-center justify-center p-1 transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-on-surface-variant'
              }`}
            >
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="font-caption text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
