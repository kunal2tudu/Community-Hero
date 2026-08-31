import express from 'express';
import { initialUser, initialLeaderboard, initialCommunityPerks } from '../data/initialData.js';

const router = express.Router();

let currentUser = { ...initialUser };
let leaderboard = [...initialLeaderboard];

// GET current logged-in hero profile
router.get('/me', (req, res) => {
  res.json({ success: true, data: currentUser });
});

// GET hero leaderboard
router.get('/leaderboard', (req, res) => {
  res.json({ success: true, data: leaderboard });
});

// GET redeemable community perks
router.get('/perks', (req, res) => {
  res.json({ success: true, data: initialCommunityPerks });
});

// POST redeem a perk
router.post('/perks/:id/redeem', (req, res) => {
  const perk = initialCommunityPerks.find(p => p.id === req.params.id);
  if (!perk) {
    return res.status(404).json({ success: false, message: 'Perk not found' });
  }

  if (currentUser.impactScore < perk.pointsCost) {
    return res.status(400).json({ success: false, message: `Insufficient Impact Points (Need ${perk.pointsCost}, have ${currentUser.impactScore})` });
  }

  currentUser.impactScore -= perk.pointsCost;
  res.json({
    success: true,
    message: `Successfully redeemed "${perk.name}"!`,
    newBalance: currentUser.impactScore,
    perk
  });
});

export default router;
