import express from 'express';
import { initialIssues, initialCategories } from '../data/initialData.js';

const router = express.Router();

// In-Memory Database Store (with full persistent state during session)
let issues = [...initialIssues];

// GET all issues (supports search, category filter, status filter, sorting)
router.get('/', (req, res) => {
  const { category, status, search, sort } = req.query;
  let filtered = [...issues];

  if (category && category !== 'all') {
    filtered = filtered.filter(i => i.category.toLowerCase() === category.toLowerCase());
  }

  if (status && status !== 'all') {
    filtered = filtered.filter(i => i.status.toLowerCase() === status.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(i => 
      i.title.toLowerCase().includes(q) || 
      i.description.toLowerCase().includes(q) ||
      i.location.address.toLowerCase().includes(q) ||
      i.department.toLowerCase().includes(q)
    );
  }

  // Sort
  if (sort === 'urgent') {
    filtered.sort((a, b) => (b.urgencyScore || 0) - (a.urgencyScore || 0));
  } else if (sort === 'verifications') {
    filtered.sort((a, b) => (b.verifications || 0) - (a.verifications || 0));
  } else {
    // Newest first default
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  res.json({
    success: true,
    total: filtered.length,
    data: filtered
  });
});

// GET single issue by ID
router.get('/:id', (req, res) => {
  const issue = issues.find(i => i.id === req.params.id);
  if (!issue) {
    return res.status(404).json({ success: false, message: 'Issue not found' });
  }
  res.json({ success: true, data: issue });
});

// POST create new issue
router.post('/', (req, res) => {
  const {
    title,
    description,
    category,
    location,
    images,
    aiAnalysis,
    priority = 'Medium'
  } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ success: false, message: 'Title, description, and category are required' });
  }

  const categoryObj = initialCategories.find(c => c.id === category) || {
    name: 'General Civic',
    department: 'Department of Public Works'
  };

  const newIssue = {
    id: `ISSUE-${100 + issues.length + 1}`,
    title,
    description,
    category,
    categoryName: categoryObj.name,
    department: categoryObj.department,
    status: 'AI Triaged',
    priority: aiAnalysis?.suggestedPriority || priority,
    urgencyScore: aiAnalysis?.urgencyScore || 75,
    location: location || {
      address: 'Reported Location',
      lat: 40.7138,
      lng: -74.0080,
      neighborhood: 'Civic District'
    },
    images: images && images.length > 0 ? images : [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCFVowrUhZE6y_dh6_PeRq6TDsuwG-omV4-QYHN-a4dDLC36-nYcWJrufjclngR2sS23KnuEMoSjakhweoovZ5TC-lngA3FkIpmfqO0Pp_B_Bx7MS3M4bZpSi9v1-Kq5EN_xgrp3ANCRa5usIZkARw79wDUOwX9Kl5GltjYBOefdXMGj7RYDxLo3uCf8ziMB4dKyxgfLCGvMKtwDYXWQLOTB-CobKG4D_4YWOE6Kmi1XQzKnr9Hh8TRKw'
    ],
    reportedBy: {
      name: 'Alex Rivera',
      id: 'user-001',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    reportedAt: 'Just now',
    createdAt: new Date().toISOString(),
    aiAnalysis: aiAnalysis || {
      detectedObject: 'Community Hazard Identified',
      confidence: 0.94,
      suggestedPriority: priority,
      safetyRisk: 'Moderate Civic Impact',
      estimatedRepairCost: '$200 - $350',
      estimatedFixTime: '48 Hours',
      aiSummary: 'Auto-triaged and assigned to ' + categoryObj.department
    },
    verifications: 1,
    verifiedByCommunity: false,
    userHasVoted: true,
    timeline: [
      { status: 'Reported', date: 'Just now', desc: 'Submitted by Alex Rivera' },
      { status: 'AI Triaged', date: 'Just now', desc: `Vision AI automatically routed to ${categoryObj.department}` }
    ],
    comments: []
  };

  issues.unshift(newIssue);
  res.status(201).json({ success: true, data: newIssue, pointsAwarded: 50 });
});

// POST toggle community upvote & consensus verification
router.post('/:id/verify', (req, res) => {
  const issue = issues.find(i => i.id === req.params.id);
  if (!issue) {
    return res.status(404).json({ success: false, message: 'Issue not found' });
  }

  if (issue.userHasVoted) {
    issue.verifications = Math.max(0, (issue.verifications || 1) - 1);
    issue.userHasVoted = false;
  } else {
    issue.verifications = (issue.verifications || 0) + 1;
    issue.userHasVoted = true;

    // Automatic threshold transition: 5+ votes triggers Community Verified
    if (issue.verifications >= 5 && issue.status === 'Submitted') {
      issue.status = 'Community Verified';
      issue.verifiedByCommunity = true;
      issue.timeline.push({
        status: 'Community Verified',
        date: 'Just now',
        desc: `Reached community verification quorum (${issue.verifications} citizen corroborations)`
      });
    }
  }

  res.json({
    success: true,
    verifications: issue.verifications,
    userHasVoted: issue.userHasVoted,
    status: issue.status,
    pointsAwarded: issue.userHasVoted ? 10 : 0
  });
});

// POST add comment
router.post('/:id/comments', (req, res) => {
  const { text } = req.body;
  const issue = issues.find(i => i.id === req.params.id);
  if (!issue) {
    return res.status(404).json({ success: false, message: 'Issue not found' });
  }

  const newComment = {
    id: `c-${Date.now()}`,
    author: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    text: text || 'Confirmed this issue is still present.',
    time: 'Just now'
  };

  if (!issue.comments) issue.comments = [];
  issue.comments.push(newComment);

  res.status(201).json({ success: true, data: newComment });
});

// PATCH update status (Municipal or Citizen Resolution Proof)
router.patch('/:id/status', (req, res) => {
  const { status, resolvedImage, resolutionNote } = req.body;
  const issue = issues.find(i => i.id === req.params.id);
  if (!issue) {
    return res.status(404).json({ success: false, message: 'Issue not found' });
  }

  issue.status = status || issue.status;
  if (resolvedImage) issue.resolvedImage = resolvedImage;
  if (status === 'Resolved') {
    issue.resolvedAt = 'Just now';
  }

  issue.timeline.push({
    status: status,
    date: 'Just now',
    desc: resolutionNote || `Status escalated to ${status}`
  });

  res.json({ success: true, data: issue });
});

export default router;
