import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { api } from '../services/api.js';
import { DoodleSun, DoodleSparkle } from '../components/DoodleDecorations.jsx';

export const AnalyticsView = () => {
  const { playAudioFeedback, setActiveTab } = useApp();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [timeRange, setTimeRange] = useState('30days');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [anRes, predRes] = await Promise.all([
          api.getAnalytics(),
          api.getAiPredictions()
        ]);
        if (anRes && anRes.success) setAnalyticsData(anRes.data);
        if (predRes && predRes.success) setPredictions(predRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const metrics = analyticsData?.metrics || {
    totalResolved: '1,248',
    avgResolutionDays: '2.4 Days',
    communityHealthIndex: '94%',
    activeVolunteers: '342'
  };

  const contributors = analyticsData?.topContributors || [];

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-300 pb-20">
      {/* White Vessel Container */}
      <div className="bg-container rounded-[2rem] p-6 md:p-10 border-2 border-primary sketchy-border shadow-[0_8px_0_0_rgba(0,0,0,1)] relative overflow-hidden">
        {/* Doodle Accent */}
        <DoodleSun className="absolute top-4 right-4 w-16 h-16 opacity-70 hidden sm:block" />

        {/* Header */}
        <header className="mb-8 relative z-10">
          <div className="inline-block px-3 py-1 bg-secondary-container border border-primary rounded-full text-xs font-bold mb-2">
            📊 Hyperlocal Civic Data & Predictive Insights
          </div>
          <h2 className="font-display-lg text-3xl md:text-5xl text-primary font-bold mb-2">
            Impact & Community Analytics
          </h2>
          <p className="font-body-lg text-sm md:text-base text-on-surface-variant max-w-2xl">
            Measuring our collective effort to build a cleaner, safer, and more accountable neighborhood with AI automation.
          </p>
        </header>

        <div className="wavy-divider mb-8 opacity-60"></div>

        {/* Bento Grid Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {/* Metric 1 */}
          <div className="bg-accent-blue rounded-2xl p-5 border-2 border-primary shadow-[0_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
            <span className="material-symbols-outlined text-primary text-3xl mb-2 block">assignment_turned_in</span>
            <p className="font-label-lg text-xs text-primary uppercase tracking-wider mb-1 font-bold">Total Reports Resolved</p>
            <p className="font-headline-lg text-3xl font-bold text-primary">{metrics.totalResolved}</p>
            <span className="text-[11px] font-semibold text-green-900 mt-1 block">↗ +18% from last month</span>
          </div>

          {/* Metric 2 */}
          <div className="bg-surface-container-low rounded-2xl p-5 border-2 border-primary shadow-[0_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
            <span className="material-symbols-outlined text-primary text-3xl mb-2 block">timer</span>
            <p className="font-label-lg text-xs text-primary uppercase tracking-wider mb-1 font-bold">Avg Resolution Speed</p>
            <p className="font-headline-lg text-3xl font-bold text-primary">{metrics.avgResolutionDays}</p>
            <span className="text-[11px] font-semibold text-secondary mt-1 block">⚡ 2.1x faster than city average</span>
          </div>

          {/* Metric 3 */}
          <div className="bg-secondary-container rounded-2xl p-5 border-2 border-primary shadow-[0_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
            <span className="material-symbols-outlined text-primary text-3xl mb-2 block">favorite</span>
            <p className="font-label-lg text-xs text-primary uppercase tracking-wider mb-1 font-bold">Community Health Index</p>
            <p className="font-headline-lg text-3xl font-bold text-primary">{metrics.communityHealthIndex}</p>
            <span className="text-[11px] font-semibold text-primary mt-1 block">⭐ High Civic Transparency</span>
          </div>

          {/* Metric 4 */}
          <div className="bg-container rounded-2xl p-5 border-2 border-primary shadow-[0_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
            <span className="material-symbols-outlined text-primary text-3xl mb-2 block">groups</span>
            <p className="font-label-lg text-xs text-primary uppercase tracking-wider mb-1 font-bold">Active Citizen Heroes</p>
            <p className="font-headline-lg text-3xl font-bold text-primary">{metrics.activeVolunteers || '342'}</p>
            <span className="text-[11px] font-semibold text-secondary mt-1 block">🤝 1,420+ Verifications cast</span>
          </div>
        </div>

        {/* Main Chart Area (Resolution Rate Over Time) */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-between items-end mb-4 gap-2">
            <div>
              <h3 className="font-headline-md text-xl font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">show_chart</span>
                Issue Resolution Rate & Speed Trend
              </h3>
              <p className="text-xs text-on-surface-variant">Monthly velocity of reported vs fixed civic tickets</p>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-container border-2 border-primary rounded-xl px-3 py-1.5 text-xs font-bold text-primary outline-none shadow-[0_2px_0_0_rgba(0,0,0,1)] cursor-pointer"
            >
              <option value="30days">Last 30 Days</option>
              <option value="3months">Last 3 Months</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div className="w-full h-80 bg-surface-container-low rounded-2xl border-2 border-primary shadow-[0_4px_0_0_rgba(0,0,0,1)] flex items-center justify-center relative overflow-hidden p-4">
            {/* SVG Whimsical Ink Line Chart */}
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 300">
              {/* Grid Lines */}
              <line x1="0" x2="800" y1="50" y2="50" stroke="#cfc4c5" strokeDasharray="6,6" strokeWidth="1" />
              <line x1="0" x2="800" y1="130" y2="130" stroke="#cfc4c5" strokeDasharray="6,6" strokeWidth="1" />
              <line x1="0" x2="800" y1="210" y2="210" stroke="#cfc4c5" strokeDasharray="6,6" strokeWidth="1" />

              {/* Area fill */}
              <path
                d="M 50 250 Q 150 210, 250 220 T 450 140 T 650 90 T 760 50 L 760 260 L 50 260 Z"
                fill="rgba(185, 213, 238, 0.4)"
              />

              {/* Main Hand-drawn ink line */}
              <path
                d="M 50 250 Q 150 210, 250 220 T 450 140 T 650 90 T 760 50"
                fill="none"
                stroke="#000000"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Data points */}
              <circle cx="50" cy="250" r="6" fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" />
              <circle cx="250" cy="220" r="6" fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" />
              <circle cx="450" cy="140" r="6" fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" />
              <circle cx="650" cy="90" r="6" fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" />
              <circle cx="760" cy="50" r="7" fill="#BADEFF" stroke="#000000" strokeWidth="3" />
            </svg>

            <div className="absolute bottom-3 left-4 text-xs font-bold text-primary flex items-center gap-4">
              <span>● Jan: 110 fixed</span>
              <span>● Mar: 155 fixed</span>
              <span>● May: 205 fixed</span>
              <span className="text-secondary font-bold">★ Jun: 228 fixed (Record)</span>
            </div>
          </div>
        </section>

        {/* AI Predictive Infrastructure Risk Matrix */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline-md text-xl font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-primary animate-pulse">psychology</span>
              AI Predictive Infrastructure Insights & Anomaly Forecast
            </h3>
            <span className="text-xs bg-accent-blue px-3 py-1 rounded-full border border-primary font-bold">
              AI Risk Engine Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {predictions.map((p) => (
              <div
                key={p.id}
                className="bg-surface-container-lowest p-5 rounded-2xl border-2 border-primary shadow-[0_4px_0_0_rgba(0,0,0,1)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold bg-secondary-container px-2 py-0.5 rounded border border-primary">
                      {p.zone}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                      p.riskLevel.includes('High') ? 'bg-red-100 text-red-900 border-red-800' : 'bg-yellow-100 text-yellow-900 border-yellow-800'
                    }`}>
                      {p.riskLevel}
                    </span>
                  </div>
                  <h4 className="font-headline-md text-base font-bold text-primary mb-1">
                    {p.riskType}
                  </h4>
                  <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">
                    {p.forecast}
                  </p>
                </div>

                <div className="pt-3 border-t border-primary/20 bg-accent-blue/20 -mx-5 -mb-5 p-4 rounded-b-2xl">
                  <span className="text-[10px] uppercase font-bold text-outline">AI Action Recommendation:</span>
                  <p className="text-xs font-bold text-primary mt-0.5 leading-snug">
                    "{p.aiRecommendation}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="wavy-divider mb-12 opacity-60"></div>

        {/* Top Contributors Leaderboard */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h3 className="font-headline-md text-xl font-bold text-primary">
                Top Community Heroes & Contributors
              </h3>
              <span className="material-symbols-outlined text-secondary text-2xl">military_tech</span>
            </div>
            <button
              onClick={() => {
                playAudioFeedback('click');
                setActiveTab('gamification');
              }}
              className="text-xs font-bold text-secondary hover:underline"
            >
              View All Badges & Rewards →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contributors.map((hero) => (
              <div
                key={hero.id}
                className="flex items-center gap-4 p-4 border-2 border-primary rounded-2xl bg-surface-container-lowest hover:bg-surface-container-low transition-all shadow-[0_3px_0_0_rgba(0,0,0,1)] cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden shrink-0 bg-accent-blue">
                  <img src={hero.avatar} alt={hero.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-headline-md text-sm font-bold text-primary group-hover:underline">
                    {hero.name}
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    {hero.reports} Reports • <span className="font-bold text-secondary">{hero.badgeTitle}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-headline-md text-xl font-bold text-primary">
                    #{hero.rank}
                  </span>
                  <p className="text-[10px] font-bold text-outline">
                    {hero.impactScore} pts
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
