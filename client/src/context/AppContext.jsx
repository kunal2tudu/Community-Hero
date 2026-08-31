import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { api } from '../services/api.js';

const AppContext = createContext();

// Simple Web Audio sound synth for whimsical interactions
const playAudioFeedback = (type = 'click') => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'vote') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    }
  } catch {
    // AudioContext may be restricted by browser policy before first interaction
  }
};

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'map', 'report', 'analytics', 'gamification'
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Current user / Hero state
  const [user, setUser] = useState({
    name: 'Alex Rivera',
    handle: '@alex_creates',
    impactScore: 450,
    level: 4,
    levelTitle: 'Civic Guardian',
    streakDays: 14,
    reportsCount: 12,
    resolvedCount: 8,
    badges: []
  });

  // Modals & Floating Widgets
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [isHeroBotOpen, setIsHeroBotOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Toast notification helper
  const addToast = (message, type = 'info', points = null) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, points }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Trigger celebration confetti
  const triggerCelebration = () => {
    playAudioFeedback('success');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#000000', '#A0C4E4', '#B9D5EE', '#BADEFF', '#FFFFFF']
    });
  };

  // Load initial data
  const loadData = async () => {
    try {
      setLoading(true);
      const [issuesRes, userRes] = await Promise.all([
        api.getIssues(),
        api.getCurrentUser()
      ]);

      if (issuesRes && issuesRes.success) {
        setIssues(issuesRes.data);
      }
      if (userRes && userRes.success) {
        setUser(userRes.data);
      }
    } catch (err) {
      console.error('Error fetching data from API:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Upvote / Verify handler
  const handleVerify = async (issueId) => {
    playAudioFeedback('vote');
    try {
      const res = await api.verifyIssue(issueId);
      if (res && res.success) {
        setIssues(prev => prev.map(issue => {
          if (issue.id === issueId) {
            return {
              ...issue,
              verifications: res.verifications,
              userHasVoted: res.userHasVoted,
              status: res.status
            };
          }
          return issue;
        }));

        if (res.pointsAwarded > 0) {
          setUser(prev => ({
            ...prev,
            impactScore: prev.impactScore + res.pointsAwarded,
            verificationsCount: (prev.verificationsCount || 0) + 1
          }));
          addToast(`Corroborated issue! +${res.pointsAwarded} Hero Points`, 'success', res.pointsAwarded);
        } else {
          addToast('Verification vote removed', 'info');
        }
      }
    } catch (err) {
      console.error('Error verifying issue:', err);
    }
  };

  // Add new issue handler
  const handleCreateIssue = async (issueData) => {
    try {
      const res = await api.createIssue(issueData);
      if (res && res.success) {
        setIssues(prev => [res.data, ...prev]);
        setUser(prev => ({
          ...prev,
          impactScore: prev.impactScore + 50,
          reportsCount: prev.reportsCount + 1
        }));
        triggerCelebration();
        addToast('Issue submitted & AI triaged! +50 Hero Points', 'success', 50);
        setActiveTab('map');
        return res.data;
      }
    } catch (err) {
      console.error('Error creating issue:', err);
      throw err;
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        issues,
        setIssues,
        loading,
        selectedCategory,
        setSelectedCategory,
        selectedStatus,
        setSelectedStatus,
        searchQuery,
        setSearchQuery,
        user,
        setUser,
        selectedIssueId,
        setSelectedIssueId,
        isHeroBotOpen,
        setIsHeroBotOpen,
        toasts,
        addToast,
        triggerCelebration,
        playAudioFeedback,
        handleVerify,
        handleCreateIssue,
        refreshData: loadData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
