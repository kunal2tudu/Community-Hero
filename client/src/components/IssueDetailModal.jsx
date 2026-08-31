import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { api } from '../services/api.js';

export const IssueDetailModal = () => {
  const { selectedIssueId, setSelectedIssueId, issues, setIssues, handleVerify, playAudioFeedback, addToast } = useApp();
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [showResolvedCompare, setShowResolvedCompare] = useState(false);

  const issue = issues.find(i => i.id === selectedIssueId);
  if (!issue) return null;

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmittingComment(true);
    playAudioFeedback('click');

    try {
      const res = await api.addComment(issue.id, commentText);
      if (res && res.success) {
        setIssues(prev => prev.map(item => {
          if (item.id === issue.id) {
            return {
              ...item,
              comments: [...(item.comments || []), res.data]
            };
          }
          return item;
        }));
        setCommentText('');
        addToast('Comment posted to community thread', 'info');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const statusColors = {
    'Submitted': 'bg-surface-container text-primary',
    'AI Triaged': 'bg-accent-blue text-primary',
    'Community Verified': 'bg-secondary-container text-on-secondary-container font-bold',
    'Dispatched': 'bg-yellow-200 text-yellow-900',
    'In Progress': 'bg-accent-blue text-primary font-bold',
    'Resolved': 'bg-green-200 text-green-900 font-bold'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in overflow-y-auto">
      <div className="bg-container border-2 border-primary rounded-[2rem] w-full max-w-3xl shadow-[0_8px_0_0_rgba(0,0,0,1)] my-8 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b-2 border-primary bg-surface-container-low flex items-start justify-between">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`px-3 py-0.5 rounded-full text-xs border border-primary ${statusColors[issue.status] || 'bg-container'}`}>
                {issue.status}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-container border border-primary">
                {issue.categoryName || issue.category}
              </span>
              <span className="text-xs text-outline font-mono">
                {issue.id}
              </span>
            </div>
            <h2 className="font-headline-lg text-2xl md:text-3xl text-primary font-bold leading-tight">
              {issue.title}
            </h2>
            <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-base">location_on</span>
              {issue.location.address} • {issue.reportedAt}
            </p>
          </div>
          <button
            onClick={() => setSelectedIssueId(null)}
            className="w-9 h-9 rounded-full border-2 border-primary bg-container flex items-center justify-center text-primary font-bold hover:bg-surface-container-low shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Images Section */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-primary bg-surface-container">
            {issue.resolvedImage ? (
              <div>
                <div className="flex justify-between items-center bg-accent-blue px-4 py-2 border-b border-primary">
                  <span className="font-label-lg text-xs font-bold">✨ Before / After Resolution Verification</span>
                  <button
                    onClick={() => setShowResolvedCompare(!showResolvedCompare)}
                    className="text-xs font-bold underline cursor-pointer"
                  >
                    {showResolvedCompare ? 'Show Original' : 'Show Fixed Result'}
                  </button>
                </div>
                <img
                  src={showResolvedCompare ? issue.resolvedImage : issue.images[0]}
                  alt={issue.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            ) : (
              <img
                src={issue.images[0]}
                alt={issue.title}
                className="w-full h-64 object-cover"
              />
            )}
          </div>

          {/* Description */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-primary">
            <h4 className="font-headline-md text-base font-bold mb-2">Citizen Report Details</h4>
            <p className="text-sm text-on-surface leading-relaxed">{issue.description}</p>
            <div className="mt-4 pt-3 border-t border-outline-variant flex items-center justify-between text-xs text-on-surface-variant">
              <span>Reported by: <strong className="text-primary">{issue.reportedBy?.name || 'Local Citizen'}</strong></span>
              <span>Assigned Dept: <strong className="text-primary">{issue.department}</strong></span>
            </div>
          </div>

          {/* AI Auto-Triage Vision Card */}
          {issue.aiAnalysis && (
            <div className="bg-accent-blue/30 rounded-2xl p-5 border-2 border-primary relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary text-xl">smart_toy</span>
                <h4 className="font-headline-md text-base font-bold text-primary">AI Vision Triage & Diagnostics</h4>
                <span className="ml-auto text-xs bg-container px-2 py-0.5 rounded-full border border-primary font-bold">
                  {Math.round(issue.aiAnalysis.confidence * 100)}% Confidence
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-3">
                <div className="bg-container p-3 rounded-xl border border-primary">
                  <p className="text-outline uppercase font-semibold">Classification</p>
                  <p className="font-bold text-primary text-sm mt-0.5">{issue.aiAnalysis.detectedObject}</p>
                </div>
                <div className="bg-container p-3 rounded-xl border border-primary">
                  <p className="text-outline uppercase font-semibold">Safety Hazard</p>
                  <p className="font-bold text-primary text-sm mt-0.5">{issue.aiAnalysis.safetyRisk || 'Moderate'}</p>
                </div>
                <div className="bg-container p-3 rounded-xl border border-primary">
                  <p className="text-outline uppercase font-semibold">Estimated Repair</p>
                  <p className="font-bold text-primary text-sm mt-0.5">{issue.aiAnalysis.estimatedRepairCost}</p>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant italic bg-container/70 p-2.5 rounded-lg border border-primary/20">
                "{issue.aiAnalysis.aiSummary}"
              </p>
            </div>
          )}

          {/* Community Verification & Upvoting Action */}
          <div className="bg-secondary-container/40 p-5 rounded-2xl border-2 border-primary flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-headline-md text-base font-bold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary">how_to_reg</span>
                Community Verification Consensus
              </h4>
              <p className="text-xs text-on-surface-variant mt-1">
                <strong>{issue.verifications} neighbors</strong> have corroborated this hazard. 5 votes triggers municipal dispatch quorum.
              </p>
            </div>
            <button
              onClick={() => handleVerify(issue.id)}
              className={`px-6 py-3 rounded-full border-2 border-primary font-bold text-xs flex items-center gap-2 shadow-[0_3px_0_0_rgba(0,0,0,1)] transition-all ${
                issue.userHasVoted
                  ? 'bg-primary text-on-primary'
                  : 'bg-container text-primary hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {issue.userHasVoted ? 'check_circle' : 'thumb_up'}
              </span>
              <span>{issue.userHasVoted ? 'You Corroborated' : 'Verify & Upvote (+10 pts)'}</span>
            </button>
          </div>

          {/* Ticket Lifecycle Timeline */}
          <div>
            <h4 className="font-headline-md text-base font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">timeline</span>
              Issue Lifecycle & Municipal Tracking
            </h4>
            <div className="border-l-2 border-primary ml-4 pl-4 space-y-4">
              {issue.timeline?.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[23px] top-0 w-3.5 h-3.5 rounded-full bg-primary border-2 border-container"></div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-primary">{step.status}</span>
                    <span className="text-[10px] text-outline">• {step.date}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="wavy-divider"></div>

          {/* Community Comments Thread */}
          <div>
            <h4 className="font-headline-md text-base font-bold mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined">forum</span>
              Community Discussion ({issue.comments?.length || 0})
            </h4>

            {/* Comments List */}
            <div className="space-y-3 mb-4">
              {issue.comments && issue.comments.length > 0 ? (
                issue.comments.map((c) => (
                  <div key={c.id} className="p-3.5 bg-surface-container-lowest rounded-xl border border-primary flex gap-3">
                    <img src={c.avatar} alt={c.author} className="w-8 h-8 rounded-full border border-primary object-cover" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-primary">{c.author}</span>
                        <span className="text-[10px] text-outline">{c.time}</span>
                      </div>
                      <p className="text-xs text-on-surface mt-1">{c.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-outline italic">No community comments yet. Be the first to share an update!</p>
              )}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share field update or verification note..."
                className="flex-1 px-4 py-2.5 bg-surface-container-lowest border border-primary rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={isSubmittingComment}
                className="btn-ink px-4 py-2.5 text-xs font-bold shrink-0"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
