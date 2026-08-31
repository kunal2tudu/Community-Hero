import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { api } from '../services/api.js';
import { DoodleSun, DoodleSparkle, DoodleHeart } from '../components/DoodleDecorations.jsx';

export const GamificationView = () => {
  const { user, setUser, addToast, triggerCelebration, playAudioFeedback } = useApp();
  const [perks, setPerks] = useState([]);
  const [redeemingId, setRedeemingId] = useState(null);

  useEffect(() => {
    const fetchPerks = async () => {
      try {
        const res = await api.getPerks();
        if (res && res.success) setPerks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPerks();
  }, []);

  const handleRedeem = async (perk) => {
    if (user.impactScore < perk.pointsCost) {
      addToast(`Need ${perk.pointsCost - user.impactScore} more points to claim ${perk.name}!`, 'info');
      return;
    }

    setRedeemingId(perk.id);
    playAudioFeedback('click');

    try {
      const res = await api.redeemPerk(perk.id);
      if (res && res.success) {
        setUser(prev => ({ ...prev, impactScore: res.newBalance }));
        triggerCelebration();
        addToast(`🎉 Claimed "${perk.name}"! Certificate generated.`, 'success');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRedeemingId(null);
    }
  };

  const allBadges = [
    { id: 'b1', name: 'Pothole Patrol', tier: 'Gold', icon: 'construction', desc: 'Reported 10+ dangerous asphalt cavities', unlocked: true },
    { id: 'b2', name: 'Night Owl Watch', tier: 'Silver', icon: 'bedtime', desc: 'Identified 5+ unlit streetlights', unlocked: true },
    { id: 'b3', name: 'Consensus Champion', tier: 'Gold', icon: 'how_to_reg', desc: 'Cast 25+ accurate community verifications', unlocked: true },
    { id: 'b4', name: 'Green Scout', tier: 'Bronze', icon: 'eco', desc: 'Reported park waste and illegal dumping', unlocked: true },
    { id: 'b5', name: 'Flood Warden', tier: 'Platinum', icon: 'water_drop', desc: 'Report 3 critical storm drain clogs before rainfall', unlocked: false },
    { id: 'b6', name: 'Speed Responder', tier: 'Gold', icon: 'bolt', desc: 'First to verify a critical municipal hazard within 15 min', unlocked: false }
  ];

  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-300 pb-20 relative">
      <DoodleSparkle className="top-0 right-8 w-16 h-16 hidden md:block" />

      {/* Hero Level & Progression Banner */}
      <div className="bg-container rounded-[2rem] p-8 border-2 border-primary sketchy-border shadow-[0_8px_0_0_rgba(0,0,0,1)] mb-8 overflow-hidden relative">
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          {/* Avatar & Level Badge */}
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-primary object-cover shadow-[0_4px_0_0_rgba(0,0,0,1)]"
            />
            <span className="absolute -bottom-2 -right-2 bg-secondary-container border-2 border-primary px-3 py-0.5 rounded-full font-headline-md font-bold text-xs">
              Lv.{user.level}
            </span>
          </div>

          {/* User Info & Stats */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-primary">
                {user.name}
              </h2>
              <span className="bg-accent-blue border border-primary px-2.5 py-0.5 rounded-full text-xs font-bold">
                {user.levelTitle}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant font-semibold">
              {user.handle} • {user.reportsCount} Reports Filed • 29 Verifications Corroborated
            </p>

            {/* Level Progress Bar */}
            <div className="mt-4 max-w-md">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Level {user.level} Progress</span>
                <span>{user.impactScore} / {user.nextLevelPoints || 600} XP</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-3.5 border-2 border-primary overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (user.impactScore / (user.nextLevelPoints || 600)) * 100)}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-outline font-semibold mt-1">
                {(user.nextLevelPoints || 600) - user.impactScore} points remaining until <strong>Level 5: Master Civic Architect</strong>
              </p>
            </div>
          </div>

          {/* Quick Score Card */}
          <div className="bg-secondary-container rounded-2xl p-4 border-2 border-primary shadow-[0_4px_0_0_rgba(0,0,0,1)] text-center min-w-[160px]">
            <span className="text-xs uppercase font-bold text-primary">Available Hero Points</span>
            <h3 className="font-headline-lg text-3xl font-bold text-primary mt-1">
              ⭐ {user.impactScore}
            </h3>
            <span className="text-[10px] font-bold bg-container px-2 py-0.5 rounded-full border border-primary mt-1 inline-block">
              🔥 {user.streakDays}-Day Streak
            </span>
          </div>
        </div>
      </div>

      {/* Badges Showcase */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="font-headline-md text-xl font-bold text-primary">
            Citizen Badges & Achievements
          </h3>
          <span className="text-lg">🏅</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {allBadges.map((badge) => (
            <div
              key={badge.id}
              className={`p-5 rounded-2xl border-2 transition-all shadow-[0_4px_0_0_rgba(0,0,0,1)] flex gap-4 items-start ${
                badge.unlocked
                  ? 'bg-container border-primary'
                  : 'bg-surface-container-low border-outline-variant opacity-60'
              }`}
            >
              <div className={`w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center shrink-0 ${
                badge.unlocked ? 'bg-accent-blue text-primary' : 'bg-surface-container text-outline'
              }`}>
                <span className="material-symbols-outlined text-2xl">{badge.icon}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-headline-md text-sm font-bold text-primary">{badge.name}</h4>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                    badge.tier === 'Gold' ? 'bg-amber-100 text-amber-900 border-amber-800' :
                    badge.tier === 'Silver' ? 'bg-slate-200 text-slate-900 border-slate-700' :
                    badge.tier === 'Platinum' ? 'bg-purple-100 text-purple-900 border-purple-800' :
                    'bg-orange-100 text-orange-900 border-orange-800'
                  }`}>
                    {badge.tier}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-1 leading-snug">{badge.desc}</p>
                <span className="text-[10px] font-bold block mt-2 text-primary">
                  {badge.unlocked ? '✅ Unlocked & Active' : '🔒 In Progress'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="wavy-divider mb-10 opacity-60"></div>

      {/* Redeemable Community Perks */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-headline-md text-xl font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">redeem</span>
              Redeem Community Impact Rewards
            </h3>
            <p className="text-xs text-on-surface-variant">
              Turn your civic contribution into real neighborhood impact and local benefits!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {perks.map((perk) => {
            const canAfford = user.impactScore >= perk.pointsCost;
            return (
              <div
                key={perk.id}
                className="bg-container rounded-2xl p-5 border-2 border-primary shadow-[0_4px_0_0_rgba(0,0,0,1)] flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-secondary-container border-2 border-primary flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-2xl text-primary">{perk.icon}</span>
                  </div>
                  <h4 className="font-headline-md text-sm font-bold text-primary mb-1">
                    {perk.name}
                  </h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                    {perk.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-primary/20 flex flex-col gap-2">
                  <span className="font-headline-lg text-base font-bold text-primary text-center">
                    ⭐ {perk.pointsCost} Points
                  </span>
                  <button
                    onClick={() => handleRedeem(perk)}
                    disabled={!canAfford || redeemingId === perk.id}
                    className={`w-full py-2.5 px-3 rounded-full text-xs font-bold border border-primary transition-all shadow-[0_2px_0_0_rgba(0,0,0,1)] ${
                      canAfford
                        ? 'btn-ink'
                        : 'bg-surface-container text-outline cursor-not-allowed border-outline'
                    }`}
                  >
                    {canAfford ? 'Claim Reward' : `Need ${perk.pointsCost - user.impactScore} more`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
