import express from 'express';
import { initialIssues, initialLeaderboard } from '../data/initialData.js';

const router = express.Router();

// GET community impact analytics and metrics
router.get('/', (req, res) => {
  const totalResolved = 1248; // Global community all-time count
  const activeReports = initialIssues.filter(i => i.status !== 'Resolved').length;
  const avgResolutionDays = 2.4;
  const communityHealthIndex = 94; // %
  const activeVolunteers = 342;
  const co2SavedKg = 1840;

  // Category distribution
  const categoryBreakdown = [
    { name: 'Roads & Potholes', count: 48, percentage: 38, icon: 'construction' },
    { name: 'Streetlights & Grid', count: 32, percentage: 25, icon: 'lightbulb' },
    { name: 'Water & Drainage', count: 22, percentage: 17, icon: 'water_drop' },
    { name: 'Waste & Sanitation', count: 16, percentage: 13, icon: 'delete' },
    { name: 'Parks & Recreation', count: 9, percentage: 7, icon: 'park' }
  ];

  // Resolution speed timeline
  const resolutionTrends = [
    { month: 'Jan', reported: 120, resolved: 110, avgDays: 3.1 },
    { month: 'Feb', reported: 145, resolved: 138, avgDays: 2.8 },
    { month: 'Mar', reported: 160, resolved: 155, avgDays: 2.6 },
    { month: 'Apr', reported: 190, resolved: 184, avgDays: 2.5 },
    { month: 'May', reported: 210, resolved: 205, avgDays: 2.4 },
    { month: 'Jun', reported: 230, resolved: 228, avgDays: 2.4 }
  ];

  res.json({
    success: true,
    data: {
      metrics: {
        totalResolved,
        activeReports,
        avgResolutionDays,
        communityHealthIndex,
        activeVolunteers,
        co2SavedKg
      },
      categoryBreakdown,
      resolutionTrends,
      topContributors: initialLeaderboard
    }
  });
});

export default router;
