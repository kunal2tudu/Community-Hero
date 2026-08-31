import React from 'react';
import { AppProvider, useApp } from './context/AppContext.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Header } from './components/Header.jsx';
import { HeroBotModal } from './components/HeroBotModal.jsx';
import { IssueDetailModal } from './components/IssueDetailModal.jsx';
import { DashboardView } from './views/DashboardView.jsx';
import { LiveMapView } from './views/LiveMapView.jsx';
import { ReportWizardView } from './views/ReportWizardView.jsx';
import { AnalyticsView } from './views/AnalyticsView.jsx';
import { GamificationView } from './views/GamificationView.jsx';

const MainLayout = () => {
  const { activeTab, isHeroBotOpen, setIsHeroBotOpen, toasts, playAudioFeedback } = useApp();

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'map':
        return <LiveMapView />;
      case 'report':
        return <ReportWizardView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'gamification':
        return <GamificationView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row antialiased relative">
      {/* Navigation */}
      <Navbar />

      {/* Top Header */}
      <Header />

      {/* Main Content Viewport */}
      <main className="flex-1 md:ml-64 pt-24 px-4 sm:px-6 lg:px-8 pb-20 md:pb-12 min-h-screen">
        {renderView()}
      </main>

      {/* Floating HeroBot AI Button */}
      {!isHeroBotOpen && (
        <button
          onClick={() => {
            playAudioFeedback('click');
            setIsHeroBotOpen(true);
          }}
          className="fixed bottom-20 md:bottom-8 right-6 z-40 bg-accent-blue text-primary border-2 border-primary rounded-full px-4 py-3 shadow-[0_5px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-1 transition-all flex items-center gap-2.5 font-bold text-xs group"
        >
          <div className="w-8 h-8 rounded-full bg-container border border-primary flex items-center justify-center text-base group-hover:rotate-12 transition-transform">
            🤖
          </div>
          <span className="hidden sm:inline">Ask HeroBot AI</span>
        </button>
      )}

      {/* Interactive Modals */}
      <HeroBotModal />
      <IssueDetailModal />

      {/* Toast Notifications Manager */}
      <div className="fixed top-24 right-6 z-50 flex flex-col gap-2.5 pointer-events-none max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-container border-2 border-primary rounded-2xl p-3.5 shadow-[0_4px_0_0_rgba(0,0,0,1)] flex items-center gap-3 animate-in slide-in-from-top-4 duration-200"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-primary ${
              toast.type === 'success' ? 'bg-green-200 text-green-950' : 'bg-secondary-container text-primary'
            }`}>
              <span className="material-symbols-outlined text-base">
                {toast.type === 'success' ? 'check_circle' : 'info'}
              </span>
            </div>
            <div className="flex-1 text-xs">
              <p className="font-bold text-primary">{toast.message}</p>
            </div>
            {toast.points && (
              <span className="bg-primary text-on-primary font-bold text-[10px] px-2 py-0.5 rounded-full">
                +{toast.points} XP
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
