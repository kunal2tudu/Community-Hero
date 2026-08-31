import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { DoodleSun, DoodleSparkle, DoodleHeart } from '../components/DoodleDecorations.jsx';

export const DashboardView = () => {
  const { user, issues, setSelectedIssueId, setActiveTab, playAudioFeedback } = useApp();

  const activeReports = issues.filter(i => i.status !== 'Resolved').slice(0, 5);
  const resolvedCount = issues.filter(i => i.status === 'Resolved').length;

  return (
    <div className="max-w-[1200px] mx-auto relative animate-in fade-in duration-300 pb-16">
      {/* Decorative Doodles */}
      <DoodleSparkle className="top-2 right-4 w-14 h-14 hidden lg:block" />
      <DoodleSun className="-top-6 left-12 w-16 h-16 hidden md:block" />

      {/* Header Section (Welcome Banner) */}
      <div className="mb-8 relative bg-container rounded-[2rem] p-8 border-2 border-primary sketchy-border shadow-[0_6px_0_0_rgba(0,0,0,1)] overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container border border-primary rounded-full text-xs font-bold text-on-secondary-container mb-3">
            <span>🔥 {user.streakDays}-Day Civic Streak</span>
            <span>•</span>
            <span>Level {user.level} {user.levelTitle}</span>
          </div>
          <h2 className="font-display-lg text-3xl md:text-5xl text-primary font-bold mb-2 tracking-tight">
            Welcome back, {user.name.split(' ')[0]}
          </h2>
          <p className="font-body-lg text-sm md:text-base text-on-surface-variant leading-relaxed">
            Here's how you and 340+ local neighbors are making our community safer and more vibrant today.
          </p>
        </div>

        {/* Quick Report CTA */}
        <div className="mt-6 flex flex-wrap gap-3 relative z-10">
          <button
            onClick={() => {
              playAudioFeedback('click');
              setActiveTab('report');
            }}
            className="btn-ink px-6 py-3 font-bold text-xs flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">add_a_photo</span>
            Report New Issue (+50 pts)
          </button>
          <button
            onClick={() => {
              playAudioFeedback('click');
              setActiveTab('map');
            }}
            className="btn-ink-white px-5 py-3 font-bold text-xs flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">explore</span>
            Explore Live Map
          </button>
        </div>

        {/* Whimsical Heart Doodle in Banner */}
        <div className="absolute -bottom-4 -right-4 opacity-80 pointer-events-none hidden sm:block">
          <DoodleHeart className="w-24 h-24" />
        </div>
      </div>

      {/* Main Grid: Left (Stats + Reports) + Right (Highlights Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Stats & Reports) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Impact Stats Bento */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-container rounded-2xl p-5 border-2 border-primary shadow-[0_4px_0_0_rgba(0,0,0,1)] flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-accent-blue border border-primary flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-2xl text-primary">campaign</span>
              </div>
              <h3 className="font-headline-lg text-3xl font-bold text-primary">{user.reportsCount}</h3>
              <p className="font-label-lg text-xs text-on-surface-variant uppercase tracking-wider mt-1">Total Reported</p>
            </div>

            <div className="bg-container rounded-2xl p-5 border-2 border-primary shadow-[0_4px_0_0_rgba(0,0,0,1)] flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-secondary-container border border-primary flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-2xl text-primary">task_alt</span>
              </div>
              <h3 className="font-headline-lg text-3xl font-bold text-primary">{user.resolvedCount || 8}</h3>
              <p className="font-label-lg text-xs text-on-surface-variant uppercase tracking-wider mt-1">Issues Resolved</p>
            </div>

            <div className="bg-accent-blue rounded-2xl p-5 border-2 border-primary shadow-[0_4px_0_0_rgba(0,0,0,1)] flex flex-col items-center text-center cursor-pointer hover:bg-secondary-container transition-colors" onClick={() => setActiveTab('gamification')}>
              <div className="w-12 h-12 rounded-full bg-container border border-primary flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-2xl text-primary">stars</span>
              </div>
              <h3 className="font-headline-lg text-3xl font-bold text-primary">{user.impactScore}</h3>
              <p className="font-label-lg text-xs text-on-surface-variant uppercase tracking-wider mt-1">Hero Impact Score</p>
            </div>
          </div>

          <div className="wavy-divider my-2"></div>

          {/* Active Reports List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline-md text-xl text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">pending_actions</span>
                Active Community Reports
              </h3>
              <button
                onClick={() => setActiveTab('map')}
                className="text-xs font-bold text-secondary hover:underline flex items-center gap-1"
              >
                View on Map <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {activeReports.map((issue) => (
                <div
                  key={issue.id}
                  onClick={() => {
                    playAudioFeedback('click');
                    setSelectedIssueId(issue.id);
                  }}
                  className="bg-container rounded-2xl p-4 border-2 border-primary shadow-[0_3px_0_0_rgba(0,0,0,1)] flex flex-col sm:flex-row gap-5 items-start sm:items-center hover:bg-surface-container-low transition-all duration-150 group cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="w-full sm:w-32 h-24 rounded-xl overflow-hidden border border-primary shrink-0 bg-surface-container">
                    <img
                      src={issue.images[0]}
                      alt={issue.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1.5 flex-wrap gap-2">
                      <h4 className="font-headline-md text-base font-bold text-primary group-hover:underline underline-offset-4">
                        {issue.title}
                      </h4>
                      <span className={`px-2.5 py-0.5 border border-primary rounded-full text-[11px] font-bold ${
                        issue.status === 'In Progress' ? 'bg-secondary-container text-on-secondary-container' :
                        issue.status === 'Dispatched' ? 'bg-yellow-100 text-yellow-900' :
                        issue.status === 'Community Verified' ? 'bg-accent-blue text-primary' : 'bg-surface-container'
                      }`}>
                        {issue.status}
                      </span>
                    </div>
                    <p className="font-body-md text-xs text-on-surface-variant line-clamp-1 mb-2">
                      {issue.location?.address || issue.description}
                    </p>
                    <div className="flex items-center gap-4 text-[11px] text-outline font-semibold">
                      <span>🕒 {issue.reportedAt}</span>
                      <span>👍 {issue.verifications || 0} Corroborations</span>
                      <span className="hidden sm:inline">⚡ AI Urgency: {issue.urgencyScore || 75}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Community Highlights & Quotes) */}
        <div className="lg:col-span-1">
          <div className="bg-container rounded-[2rem] p-6 border-2 border-primary sketchy-border shadow-[0_6px_0_0_rgba(0,0,0,1)] h-full relative overflow-hidden flex flex-col justify-between">
            <div>
              <h3 className="font-headline-md text-lg font-bold text-primary mb-4 border-b-2 border-primary pb-3 flex items-center justify-between">
                <span>Community Highlights</span>
                <span className="text-xl">🌸</span>
              </h3>

              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="font-label-lg text-xs font-bold uppercase tracking-wider text-secondary mb-2">
                    Weekly Wrap-up
                  </h4>
                  <ul className="space-y-3 text-xs text-on-surface">
                    <li className="flex items-start gap-2.5 bg-surface-container-low p-2.5 rounded-xl border border-primary/40">
                      <span className="material-symbols-outlined text-green-700 text-base mt-0.5">check_circle</span>
                      <span><strong>Riverside Park Cleanup:</strong> 20 volunteers fixed 6 benches!</span>
                    </li>
                    <li className="flex items-start gap-2.5 bg-surface-container-low p-2.5 rounded-xl border border-primary/40">
                      <span className="material-symbols-outlined text-secondary text-base mt-0.5">trending_up</span>
                      <span><strong>Speed Resolution:</strong> Average fix time decreased by 15% this week.</span>
                    </li>
                    <li className="flex items-start gap-2.5 bg-surface-container-low p-2.5 rounded-xl border border-primary/40">
                      <span className="material-symbols-outlined text-amber-700 text-base mt-0.5">bolt</span>
                      <span><strong>AI Pre-Triage:</strong> 94% of reported potholes routed accurately on first pass.</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-2">
                  <h4 className="font-label-lg text-xs font-bold uppercase tracking-wider text-secondary mb-2">
                    Top Civic Category
                  </h4>
                  <div className="p-3 bg-secondary-container/40 rounded-xl border border-primary flex items-center gap-3">
                    <span className="material-symbols-outlined text-2xl text-primary">construction</span>
                    <div>
                      <p className="font-bold text-xs">Roads & Potholes</p>
                      <p className="text-[11px] text-on-surface-variant">38% of total neighborhood actions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Whimsical Inspirational Quote */}
            <div className="mt-6 p-4 bg-accent-blue rounded-2xl border-2 border-primary text-center relative shadow-[0_2px_0_0_rgba(0,0,0,1)]">
              <p className="font-headline-md text-xs italic text-primary leading-relaxed">
                "Small acts of civic care, multiplied by thousands of citizens, transform the entire city."
              </p>
              <p className="font-caption text-[10px] text-on-surface-variant font-bold mt-1.5">
                — Whimsical Civic Blueprint
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
