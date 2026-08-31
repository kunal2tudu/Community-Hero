import express from 'express';

const router = express.Router();

const civicKnowledge = [
  {
    triggers: ['pothole', 'road', 'asphalt', 'bump'],
    response: "To report a pothole, snap a clear photo showing its depth and width. Our AI Vision model will assess its severity (Class 1 to 3) and automatically dispatch it to the Department of Public Works. Remember, each validated report earns you 50 Hero Points!"
  },
  {
    triggers: ['streetlight', 'dark', 'light', 'lamp'],
    response: "Dark streetlights create pedestrian risks. You can report outages by pinpointing the pole on our Live Map. The Bureau of Street Lighting typically replaces luminaire diffusers within 48 to 72 hours."
  },
  {
    triggers: ['water', 'leak', 'pipe', 'burst', 'drain'],
    response: "Water main bursts are classified as Critical Hazards (Urgency Score >90). They bypass community queues and trigger emergency valve shut-off crews directly with the Water Supply & Sewerage Board."
  },
  {
    triggers: ['point', 'score', 'badge', 'reward', 'level', 'perk'],
    response: "You earn 50 Hero Points for reporting an issue, 10 points for every consensus verification, and 100 bonus points when your report gets resolved! You can redeem points for local coffee vouchers, civic badges, or tree plantings."
  },
  {
    triggers: ['verify', 'upvote', 'consensus', 'quorum'],
    response: "Community verification is how we ensure data transparency. When 5 or more neighbors verify an issue, it gains official municipal priority and moves to the 'Community Verified' workflow stage."
  },
  {
    triggers: ['duplicate', 'merge', 'same'],
    response: "Our AI proximity engine scans open reports within a 50m radius. If a neighbor already reported the same pothole or hazard, you can simply click 'Upvote & Corroborate' rather than submitting a duplicate!"
  }
];

// POST civic AI chat
router.post('/', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ success: false, message: 'Message is required' });
  }

  const query = message.toLowerCase();
  let matched = civicKnowledge.find(item => 
    item.triggers.some(t => query.includes(t))
  );

  let reply = matched 
    ? matched.response 
    : "Hello Civic Hero! I'm HeroBot, your hyperlocal AI civic guide. I can help you report hazards, understand ticket tracking timelines, explain our AI Vision triage, or check your Hero Badges and perks.";

  res.json({
    success: true,
    reply,
    timestamp: new Date().toISOString()
  });
});

export default router;
