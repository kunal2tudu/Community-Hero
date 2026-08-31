import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export const Header = () => {
  const { user, searchQuery, setSearchQuery, setActiveTab, setIsHeroBotOpen, playAudioFeedback } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'Issue Verified!', desc: '10 neighbors corroborated Pothole #101', time: '10m ago', unread: true },
    { id: 2, title: 'Municipal Crew Dispatched', desc: 'Water leak on Cedar St assigned to Crew #W-12', time: '1h ago', unread: true },
    { id: 3, title: 'New Badge Unlocked!', desc: 'Consensus Champion Gold unlocked', time: '1d ago', unread: false }
  ];

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-20 px-gutter flex items-center justify-between z-30 bg-transparent transition-all duration-300 pointer-events-none">
      {/* Search Field (Pointer events auto to allow interaction) */}
      <div className="flex-1 max-w-md pointer-events-auto">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search potholes, lights, streets..."
            className="w-full pl-10 pr-4 py-2 bg-container border border-primary rounded-full text-sm text-primary placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary shadow-[0_2px_0_0_rgba(0,0,0,1)]"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 pointer-events-auto relative">
        {/* AI HeroBot Trigger Button */}
        <button
          onClick={() => {
            playAudioFeedback('click');
            setIsHeroBotOpen(true);
          }}
          className="bg-accent-blue hover:bg-secondary-container border border-primary px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-primary shadow-[0_2px_0_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="material-symbols-outlined text-base animate-pulse">smart_toy</span>
          <span className="hidden sm:inline">Ask HeroBot AI</span>
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => {
              playAudioFeedback('click');
              setShowNotifications(!showNotifications);
            }}
            className="w-10 h-10 rounded-full bg-container border border-primary flex items-center justify-center text-primary shadow-[0_2px_0_0_rgba(0,0,0,1)] hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            <span className="absolute top-0 right-0 w-3 h-3 bg-error rounded-full border-2 border-container"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-container border-2 border-primary rounded-2xl p-4 shadow-[0_6px_0_0_rgba(0,0,0,1)] z-50 animate-in fade-in duration-200">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-primary/20">
                <h4 className="font-headline-md text-sm font-bold">Civic Alerts</h4>
                <span className="text-[11px] font-bold bg-secondary-container px-2 py-0.5 rounded-full border border-primary">
                  2 New
                </span>
              </div>
              <div className="flex flex-col gap-2.5 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer hover:bg-surface-container-low transition-colors ${
                      n.unread ? 'bg-accent-blue/30 border-primary' : 'bg-surface-container-lowest border-outline-variant'
                    }`}
                  >
                    <div className="font-bold flex justify-between items-center text-primary">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-outline font-normal">{n.time}</span>
                    </div>
                    <p className="text-on-surface-variant mt-1">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Hero Profile Mini Badge */}
        <button
          onClick={() => {
            playAudioFeedback('click');
            setActiveTab('gamification');
          }}
          className="flex items-center gap-2 bg-container border border-primary pl-1.5 pr-3 py-1 rounded-full shadow-[0_2px_0_0_rgba(0,0,0,1)] hover:bg-surface-container-low transition-transform hover:-translate-y-0.5"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-7 h-7 rounded-full object-cover border border-primary"
          />
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold text-primary leading-tight flex items-center gap-1">
              <span>{user.name.split(' ')[0]}</span>
              <span className="bg-secondary-container px-1 py-0.2 rounded text-[10px] border border-primary">
                Lv.{user.level}
              </span>
            </p>
            <p className="text-[10px] text-on-surface-variant font-semibold">
              ⭐ {user.impactScore} pts
            </p>
          </div>
        </button>
      </div>
    </header>
  );
};
