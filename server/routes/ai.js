import express from 'express';
import { initialIssues, initialPredictiveInsights } from '../data/initialData.js';

const router = express.Router();

// Preset AI Analysis profiles based on common civic hazards
const aiCatalog = {
  pothole: {
    category: 'roads',
    categoryName: 'Roads & Potholes',
    department: 'Department of Public Works',
    detectedObject: 'Severe Asphalt Pothole - Level 3 Cavity',
    confidence: 0.96,
    suggestedPriority: 'Urgent',
    urgencyScore: 92,
    safetyRisk: 'High (Immediate suspension damage, cyclist hazard & road foundation erosion)',
    estimatedRepairCost: '$280 - $450',
    estimatedFixTime: '24 - 48 Hours',
    aiSummary: 'Computer vision analysis detected 50cm deep crater with asphalt sub-base exposure. Recommend hot-mix asphalt compaction patch.',
    autoTags: ['#Pothole', '#RoadSafety', '#UrgentAsphalt', '#CyclistHazard']
  },
  streetlight: {
    category: 'lighting',
    categoryName: 'Streetlights & Grid',
    department: 'Bureau of Street Lighting',
    detectedObject: 'Damaged LED Luminaire & Exposed Wiring',
    confidence: 0.94,
    suggestedPriority: 'Medium',
    urgencyScore: 70,
    safetyRisk: 'Moderate (Zero night visibility on pedestrian walkway)',
    estimatedRepairCost: '$180 - $250',
    estimatedFixTime: '48 - 72 Hours',
    aiSummary: 'Luminaire casing fractured. Photocell inactive. Recommend replacement of standard 100W LED head unit.',
    autoTags: ['#StreetlightDark', '#PublicSafety', '#LightingGrid', '#NightVisibility']
  },
  water: {
    category: 'water',
    categoryName: 'Water & Drainage',
    department: 'Water Supply & Sewerage Board',
    detectedObject: 'High-Pressure Water Line Rupture',
    confidence: 0.98,
    suggestedPriority: 'Urgent',
    urgencyScore: 97,
    safetyRisk: 'Critical (Drinking water loss, localized flooding, curb foundation wash-away)',
    estimatedRepairCost: '$1,200 - $1,800',
    estimatedFixTime: '12 - 24 Hours',
    aiSummary: 'Active pressurized leak detected. Estimated 18 gallons/min discharge. Emergency crew dispatch priority.',
    autoTags: ['#WaterLeak', '#MainBurst', '#UrgentUtility', '#ResourceLoss']
  },
  waste: {
    category: 'waste',
    categoryName: 'Waste & Sanitation',
    department: 'Department of Sanitation',
    detectedObject: 'Illegal Waste Accumulation & Overflow',
    confidence: 0.95,
    suggestedPriority: 'Medium',
    urgencyScore: 65,
    safetyRisk: 'Moderate (Sanitation vector, pest risk, sidewalk blockage)',
    estimatedRepairCost: '$75 (Special Collection)',
    estimatedFixTime: '12 - 24 Hours',
    aiSummary: 'Debris volume estimated at 3.5 cubic meters. Requires standard hydraulic compaction truck.',
    autoTags: ['#WasteSanitation', '#TrashOverflow', '#CleanNeighborhood', '#BioClean']
  },
  parks: {
    category: 'parks',
    categoryName: 'Parks & Recreation',
    department: 'Parks & Civic Spaces',
    detectedObject: 'Broken Civic Furniture / Park Bench Hazard',
    confidence: 0.92,
    suggestedPriority: 'Low',
    urgencyScore: 40,
    safetyRisk: 'Low (Splinter & structural collapse risk for park visitors)',
    estimatedRepairCost: '$120 - $180',
    estimatedFixTime: '3 - 5 Days',
    aiSummary: 'Timber support fracture detected. Metal frame intact. Wooden slat restoration recommended.',
    autoTags: ['#ParkMaintenance', '#PublicBench', '#CivicAmenity', '#Recreation']
  },
  safety: {
    category: 'safety',
    categoryName: 'Public Safety & Hazard',
    department: 'City Safety & Transport',
    detectedObject: 'Fallen Tree Branch & Sidewalk Obstruction',
    confidence: 0.97,
    suggestedPriority: 'Urgent',
    urgencyScore: 89,
    safetyRisk: 'High (Pedestrian forced into active vehicular traffic)',
    estimatedRepairCost: '$300',
    estimatedFixTime: '6 - 12 Hours',
    aiSummary: 'Heavy tree limb blocking pedestrian right-of-way. Chainsaw clearing crew required.',
    autoTags: ['#PublicHazard', '#SidewalkBlocked', '#TreeLimb', '#PedestrianSafety']
  }
};

// POST AI Vision Auto-Triage endpoint
router.post('/triage', (req, res) => {
  const { imageUrl, titleHint, categoryHint, coordinates } = req.body;

  // Detect matching hazard profile based on hint or random smart match
  let detectedType = 'pothole';
  const queryStr = `${titleHint || ''} ${categoryHint || ''} ${imageUrl || ''}`.toLowerCase();

  if (queryStr.includes('light') || queryStr.includes('bulb') || queryStr.includes('dark')) {
    detectedType = 'streetlight';
  } else if (queryStr.includes('water') || queryStr.includes('leak') || queryStr.includes('pipe') || queryStr.includes('flood')) {
    detectedType = 'water';
  } else if (queryStr.includes('waste') || queryStr.includes('trash') || queryStr.includes('bin') || queryStr.includes('garbage')) {
    detectedType = 'waste';
  } else if (queryStr.includes('bench') || queryStr.includes('park') || queryStr.includes('garden')) {
    detectedType = 'parks';
  } else if (queryStr.includes('tree') || queryStr.includes('danger') || queryStr.includes('hazard')) {
    detectedType = 'safety';
  }

  const analysis = aiCatalog[detectedType] || aiCatalog.pothole;

  // Check for proximity duplicate issues (within ~500m)
  let nearbyDuplicates = [];
  if (coordinates && coordinates.lat && coordinates.lng) {
    nearbyDuplicates = initialIssues.filter(issue => {
      if (!issue.location || !issue.location.lat) return false;
      const dLat = Math.abs(issue.location.lat - coordinates.lat);
      const dLng = Math.abs(issue.location.lng - coordinates.lng);
      // Rough delta < ~0.005 is within ~500m
      const isNearby = dLat < 0.006 && dLng < 0.006;
      const isSameCategory = issue.category === analysis.category;
      const isOpen = issue.status !== 'Resolved';
      return isNearby && isSameCategory && isOpen;
    });
  }

  res.json({
    success: true,
    data: {
      ...analysis,
      duplicateCheck: {
        hasPossibleDuplicate: nearbyDuplicates.length > 0,
        duplicateCount: nearbyDuplicates.length,
        potentialMatches: nearbyDuplicates.map(d => ({
          id: d.id,
          title: d.title,
          address: d.location.address,
          verifications: d.verifications,
          status: d.status
        }))
      }
    }
  });
});

// GET AI Predictive Infrastructure Insights & Heatmap Matrix
router.get('/predictions', (req, res) => {
  res.json({
    success: true,
    data: initialPredictiveInsights,
    heatmapData: [
      { lat: 40.7128, lng: -74.0060, intensity: 0.95, name: 'Downtown Historic Hub', risk: 'Pothole Recurrence' },
      { lat: 40.7180, lng: -73.9980, intensity: 0.72, name: 'Oak Lane Corridor', risk: 'Grid Outage Risk' },
      { lat: 40.7150, lng: -74.0020, intensity: 0.84, name: 'Central Green Fairgrounds', risk: 'Waste Surge' },
      { lat: 40.7090, lng: -74.0110, intensity: 0.91, name: 'Financial Water Junction', risk: 'Pipe Pressure Strain' }
    ]
  });
});

export default router;
