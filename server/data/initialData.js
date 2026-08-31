// Initial Seed Data for Community Hero Hyperlocal Problem Solver

export const initialCategories = [
  { id: 'roads', name: 'Roads & Potholes', icon: 'construction', department: 'Department of Public Works', color: '#BADEFF' },
  { id: 'lighting', name: 'Streetlights & Grid', icon: 'lightbulb', department: 'Bureau of Street Lighting', color: '#B9D5EE' },
  { id: 'water', name: 'Water & Drainage', icon: 'water_drop', department: 'Water Supply & Sewerage Board', color: '#A0C4E4' },
  { id: 'waste', name: 'Waste & Sanitation', icon: 'delete', department: 'Department of Sanitation', color: '#E2E2E2' },
  { id: 'parks', name: 'Parks & Recreation', icon: 'park', department: 'Parks & Civic Spaces', color: '#CBE6FF' },
  { id: 'safety', name: 'Public Safety & Hazard', icon: 'warning', department: 'City Safety & Transport', color: '#FFDAD6' }
];

export const initialUser = {
  id: 'user-001',
  name: 'Alex Rivera',
  handle: '@alex_creates',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  impactScore: 450,
  level: 4,
  levelTitle: 'Civic Guardian',
  nextLevelPoints: 600,
  streakDays: 14,
  reportsCount: 12,
  resolvedCount: 8,
  verificationsCount: 29,
  upvotesReceived: 142,
  badges: [
    { id: 'badge-1', name: 'Pothole Patrol', tier: 'Gold', icon: 'construction', desc: 'Reported 10+ road safety hazards', unlockedAt: '2026-08-15' },
    { id: 'badge-2', name: 'Night Owl Watch', tier: 'Silver', icon: 'bedtime', desc: 'Reported 5+ broken streetlights', unlockedAt: '2026-08-20' },
    { id: 'badge-3', name: 'Consensus Champion', tier: 'Gold', icon: 'how_to_reg', desc: 'Cast 25+ accurate community verifications', unlockedAt: '2026-08-28' },
    { id: 'badge-4', name: 'Green Scout', tier: 'Bronze', icon: 'eco', desc: 'Reported illegal dumping in neighborhood parks', unlockedAt: '2026-08-10' }
  ]
};

export const initialLeaderboard = [
  {
    id: 'hero-1',
    rank: 1,
    name: 'Eleanor Vance',
    badgeTitle: 'Pothole Patrol Lv.5',
    reports: 142,
    resolved: 128,
    impactScore: 1890,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADolc8zYo3CErNL_6iV0kB5KtwCO2A5FcNiUjvPM2ajfTixLCFPLmPlLP4nmyBePUXXG8Gks7Mz81xfb9VMWyvAg6NcpKvf5QpLX0ksQHGcdDcZQCrQJuN2Bq5WJqeDeOu_XfgctLOlNKIBFOJn4jJG3MB4zYkis56zKXnKhbw8ZBZ0yKoUCvpAmiTvXOb9QC20ywixfEYlCA0dqikydTODPbq7qBUB3kEhkNRqgGNu82-IwXH5knJ9g'
  },
  {
    id: 'hero-2',
    rank: 2,
    name: 'Marcus Thorne',
    badgeTitle: 'Graffiti & Cleanup Guru',
    reports: 98,
    resolved: 85,
    impactScore: 1340,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxBy2snfJnbLH2-6jgaKtppFuOKZRV0hmqNsbGhGhRlCxLBllQKumUyNJk8IqIlVLzagQsftL9XxyGq6PGcW_4VVER7PWboGXK4t1EYScuPpyPW-m013ssD9ZcyiTpgtLpNM4Fq7zvCaG0gEo73xiT70cLqU_AXZQAhM4z5byZ9_lbOoCMkGGHdm_OgqRqYpj08BqWObAqhBo1sxjbYXWkfvibJicHVKMpofKUVA99EJeetVXUwDnn9g'
  },
  {
    id: 'hero-3',
    rank: 3,
    name: 'Chloe Jensen',
    badgeTitle: 'Park Guardian',
    reports: 75,
    resolved: 62,
    impactScore: 980,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2FD3xcpMpL0YG9AnSjAOFjS5khdi-Ay6XSTUhytJTJIIP_vXJvelUt8AWiJ4IydvMpqvIW-JTS-xHpKk4Jz-KdDQ89Tr-HH-CYR4o_imFFh6vPRyiyGf1sZBsn4_Y4Bv4ImEmCWkmC1CCQAuwIlH4SMc4RzfNX8p72hcQeStZd6GNos7XbUOBXlzPf27lHGnYbRv0zDFJ5D6MDdDpqwG1VhcIMXYM4nuIFNBWIhZK3rSncJQpHrl_xQ'
  },
  {
    id: 'hero-4',
    rank: 4,
    name: 'David Kim',
    badgeTitle: 'Streetlight Savior',
    reports: 61,
    resolved: 54,
    impactScore: 820,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'hero-5',
    rank: 5,
    name: 'Alex Rivera (You)',
    badgeTitle: 'Civic Guardian',
    reports: 12,
    resolved: 8,
    impactScore: 450,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  }
];

export const initialIssues = [
  {
    id: 'ISSUE-101',
    title: 'Severe Asphalt Pothole',
    description: 'Deep road cavity right at the intersection of Main St & 4th Ave near bakery. Severe hazard for cyclists and night drivers.',
    category: 'roads',
    categoryName: 'Roads & Potholes',
    department: 'Department of Public Works',
    status: 'In Progress', // Submitted, AI Triaged, Community Verified, Dispatched, In Progress, Resolved
    priority: 'Urgent',
    urgencyScore: 92,
    location: {
      address: 'Main St & 4th Ave, Near Baker House',
      lat: 40.7128,
      lng: -74.0060,
      neighborhood: 'Downtown Historic District'
    },
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCFVowrUhZE6y_dh6_PeRq6TDsuwG-omV4-QYHN-a4dDLC36-nYcWJrufjclngR2sS23KnuEMoSjakhweoovZ5TC-lngA3FkIpmfqO0Pp_B_Bx7MS3M4bZpSi9v1-Kq5EN_xgrp3ANCRa5usIZkARw79wDUOwX9Kl5GltjYBOefdXMGj7RYDxLo3uCf8ziMB4dKyxgfLCGvMKtwDYXWQLOTB-CobKG4D_4YWOE6Kmi1XQzKnr9Hh8TRKw'
    ],
    reportedBy: {
      name: 'Alex Rivera',
      id: 'user-001',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    reportedAt: '2 days ago',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    aiAnalysis: {
      detectedObject: 'Asphalt Pothole - Level 3 Depth',
      confidence: 0.96,
      suggestedPriority: 'Urgent',
      safetyRisk: 'High (Vehicle suspension damage & bike tumble risk)',
      estimatedRepairCost: '$280 - $400',
      estimatedFixTime: '48 Hours',
      aiSummary: 'Vision model detected 45cm diameter crater with structural asphalt sub-layer exposure.'
    },
    verifications: 14,
    verifiedByCommunity: true,
    userHasVoted: true,
    timeline: [
      { status: 'Reported', date: '2 days ago', desc: 'Submitted by Alex Rivera with photo evidence' },
      { status: 'AI Triaged', date: '2 days ago', desc: 'AI Vision classified as Class 3 Pothole with 96% confidence' },
      { status: 'Community Verified', date: 'Yesterday', desc: 'Reached 10+ neighbor upvotes and location consensus' },
      { status: 'Dispatched', date: 'Yesterday', desc: 'Assigned to DPW Road Crew #4' },
      { status: 'In Progress', date: 'Today at 08:30 AM', desc: 'Asphalt patch crew on site with cold mix roller' }
    ],
    comments: [
      { id: 'c1', author: 'Eleanor Vance', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADolc8zYo3CErNL_6iV0kB5KtwCO2A5FcNiUjvPM2ajfTixLCFPLmPlLP4nmyBePUXXG8Gks7Mz81xfb9VMWyvAg6NcpKvf5QpLX0ksQHGcdDcZQCrQJuN2Bq5WJqeDeOu_XfgctLOlNKIBFOJn4jJG3MB4zYkis56zKXnKhbw8ZBZ0yKoUCvpAmiTvXOb9QC20ywixfEYlCA0dqikydTODPbq7qBUB3kEhkNRqgGNu82-IwXH5knJ9g', text: 'I hit this yesterday on my bicycle! Thank you for reporting.', time: '1 day ago' },
      { id: 'c2', author: 'City Dispatch (Official)', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80', text: 'Work order #DPW-4092 created. Crew dispatched.', time: '18 hours ago' }
    ]
  },
  {
    id: 'ISSUE-102',
    title: 'Broken Streetlight Fixture',
    description: 'Oak Lane, block 400. Light casing is completely shattered and dark at night, causing pedestrian safety worries.',
    category: 'lighting',
    categoryName: 'Streetlights & Grid',
    department: 'Bureau of Street Lighting',
    status: 'Submitted',
    priority: 'Medium',
    urgencyScore: 68,
    location: {
      address: '412 Oak Lane, Corner of Elm Way',
      lat: 40.7180,
      lng: -73.9980,
      neighborhood: 'Oak Park North'
    },
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDj9ZD1J7LrfBmREM3d5a_y5PE5Kkhr4e3QI_0TAZJrM16ScXgqsK4XUChx_gBrP0RZxK20oVlnzuqMW4U9jZxrRdPqVdHxI7pc3qoMN7nnG3We8Wmftkc-Ys4Uq9OA6VQHJKg-yrBFH0MB0oEYEhpTeZ3MbVioVj-uYSkVtIcPLzuOfSwZDDQw07yIpWEvN97PaZX6gDuCoEkwqmx9BUv9h_oXU7kx2JGCIVEn0FolYD0zg2JUM42osw'
    ],
    reportedBy: {
      name: 'Alex Rivera',
      id: 'user-001',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    reportedAt: 'Yesterday',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    aiAnalysis: {
      detectedObject: 'Shattered Luminaire & Exposed Wiring',
      confidence: 0.94,
      suggestedPriority: 'Medium',
      safetyRisk: 'Moderate (Night dark corridor & minor weather exposure)',
      estimatedRepairCost: '$150 - $220',
      estimatedFixTime: '72 Hours',
      aiSummary: 'AI identified pole ID #SL-884 with shattered polycarbonate diffuser.'
    },
    verifications: 6,
    verifiedByCommunity: false,
    userHasVoted: false,
    timeline: [
      { status: 'Reported', date: 'Yesterday', desc: 'Submitted by Alex Rivera' },
      { status: 'AI Triaged', date: 'Yesterday', desc: 'AI verified optical fixture damage' }
    ],
    comments: [
      { id: 'c3', author: 'Marcus Thorne', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxBy2snfJnbLH2-6jgaKtppFuOKZRV0hmqNsbGhGhRlCxLBllQKumUyNJk8IqIlVLzagQsftL9XxyGq6PGcW_4VVER7PWboGXK4t1EYScuPpyPW-m013ssD9ZcyiTpgtLpNM4Fq7zvCaG0gEo73xiT70cLqU_AXZQAhM4z5byZ9_lbOoCMkGGHdm_OgqRqYpj08BqWObAqhBo1sxjbYXWkfvibJicHVKMpofKUVA99EJeetVXUwDnn9g', text: 'Confirmed dark last night. Voted up.', time: '12 hours ago' }
    ]
  },
  {
    id: 'ISSUE-103',
    title: 'Overflowing Park Waste Receptacle',
    description: 'Bins around the children playground in Central Green are overflowing with weekend debris.',
    category: 'waste',
    categoryName: 'Waste & Sanitation',
    department: 'Department of Sanitation',
    status: 'Community Verified',
    priority: 'Medium',
    urgencyScore: 74,
    location: {
      address: 'Central Green Park, Playground Zone 2',
      lat: 40.7150,
      lng: -74.0020,
      neighborhood: 'Central Green'
    },
    images: [
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80'
    ],
    reportedBy: {
      name: 'Chloe Jensen',
      id: 'hero-3',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2FD3xcpMpL0YG9AnSjAOFjS5khdi-Ay6XSTUhytJTJIIP_vXJvelUt8AWiJ4IydvMpqvIW-JTS-xHpKk4Jz-KdDQ89Tr-HH-CYR4o_imFFh6vPRyiyGf1sZBsn4_Y4Bv4ImEmCWkmC1CCQAuwIlH4SMc4RzfNX8p72hcQeStZd6GNos7XbUOBXlzPf27lHGnYbRv0zDFJ5D6MDdDpqwG1VhcIMXYM4nuIFNBWIhZK3rSncJQpHrl_xQ'
    },
    reportedAt: '5 hrs ago',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    aiAnalysis: {
      detectedObject: 'Municipal Trash Overflow',
      confidence: 0.98,
      suggestedPriority: 'Medium',
      safetyRisk: 'Sanitation & litter dispersion hazard',
      estimatedRepairCost: '$50 (Collection Route)',
      estimatedFixTime: '12 Hours',
      aiSummary: 'Waste volume exceeds capacity by 140%.'
    },
    verifications: 19,
    verifiedByCommunity: true,
    userHasVoted: true,
    timeline: [
      { status: 'Reported', date: '5 hrs ago', desc: 'Reported by Chloe Jensen' },
      { status: 'AI Triaged', date: '5 hrs ago', desc: 'Classified under Municipal Sanitation' },
      { status: 'Community Verified', date: '2 hrs ago', desc: '19 local park visitors corroborated report' }
    ],
    comments: []
  },
  {
    id: 'ISSUE-104',
    title: 'Pressurized Water Main Leak',
    description: 'Clean drinking water gushing from curb seam onto Cedar St. Creating large puddle and wasting municipal water supply.',
    category: 'water',
    categoryName: 'Water & Drainage',
    department: 'Water Supply & Sewerage Board',
    status: 'Dispatched',
    priority: 'Urgent',
    urgencyScore: 95,
    location: {
      address: '218 Cedar Street',
      lat: 40.7090,
      lng: -74.0110,
      neighborhood: 'Financial West'
    },
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=600&auto=format&fit=crop&q=80'
    ],
    reportedBy: {
      name: 'David Kim',
      id: 'hero-4',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    reportedAt: '3 hrs ago',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    aiAnalysis: {
      detectedObject: 'Underground Water Line Rupture',
      confidence: 0.97,
      suggestedPriority: 'Urgent',
      safetyRisk: 'High (Road sub-base erosion & potable water loss)',
      estimatedRepairCost: '$1,200',
      estimatedFixTime: '24 Hours',
      aiSummary: 'Flow rate estimated at ~15 gallons/min. Immediate valve shut-off required.'
    },
    verifications: 22,
    verifiedByCommunity: true,
    userHasVoted: false,
    timeline: [
      { status: 'Reported', date: '3 hrs ago', desc: 'Reported by David Kim' },
      { status: 'AI Triaged', date: '3 hrs ago', desc: 'AI flagged as High-Volume Water Loss' },
      { status: 'Dispatched', date: '1 hr ago', desc: 'Emergency crew #W-12 en route' }
    ],
    comments: []
  },
  {
    id: 'ISSUE-105',
    title: 'Vandalized Park Bench Restored',
    description: 'Broken slate and graffiti on historical memorial bench in Riverside Grove.',
    category: 'parks',
    categoryName: 'Parks & Recreation',
    department: 'Parks & Civic Spaces',
    status: 'Resolved',
    priority: 'Low',
    urgencyScore: 35,
    location: {
      address: 'Riverside Grove, South Promenade',
      lat: 40.7220,
      lng: -74.0150,
      neighborhood: 'Riverside'
    },
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBM9IUZWmOIv-i1nPOE5aiX9poh6wtxlpR44jjCRuPEeROXGV_tugtneGvZ_azT-INomAqzyxhpSYgviJmAq50flnNwb0ashRDufIw4vE7ZPJwqeZEtYhIXU72wtZg8Cd_4FqlIrnlRpX_AKjjkqi_pc635rq4PESkheSlSaivAtNv0XoFTtp_LewxI3uDqhkYv7iTeQ3wZw_9gdTD2WYhI5qegHrhQaTN69A1atSEtrN9s6WZjGK-s9w'
    ],
    resolvedImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80',
    reportedBy: {
      name: 'Eleanor Vance',
      id: 'hero-1',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADolc8zYo3CErNL_6iV0kB5KtwCO2A5FcNiUjvPM2ajfTixLCFPLmPlLP4nmyBePUXXG8Gks7Mz81xfb9VMWyvAg6NcpKvf5QpLX0ksQHGcdDcZQCrQJuN2Bq5WJqeDeOu_XfgctLOlNKIBFOJn4jJG3MB4zYkis56zKXnKhbw8ZBZ0yKoUCvpAmiTvXOb9QC20ywixfEYlCA0dqikydTODPbq7qBUB3kEhkNRqgGNu82-IwXH5knJ9g'
    },
    reportedAt: '4 days ago',
    resolvedAt: 'Yesterday',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    aiAnalysis: {
      detectedObject: 'Damaged Wooden Slat Bench',
      confidence: 0.91,
      suggestedPriority: 'Low',
      safetyRisk: 'Low (Aesthetic and seating deficiency)',
      estimatedRepairCost: '$90',
      estimatedFixTime: '48 Hours',
      aiSummary: 'Wood replacement completed by park volunteer corps.'
    },
    verifications: 31,
    verifiedByCommunity: true,
    userHasVoted: true,
    timeline: [
      { status: 'Reported', date: '4 days ago', desc: 'Submitted by Eleanor Vance' },
      { status: 'Dispatched', date: '2 days ago', desc: 'Carpentry unit assigned' },
      { status: 'Resolved', date: 'Yesterday', desc: 'Bench restored and sealed. Photo verified by community.' }
    ],
    comments: [
      { id: 'c4', author: 'Eleanor Vance', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADolc8zYo3CErNL_6iV0kB5KtwCO2A5FcNiUjvPM2ajfTixLCFPLmPlLP4nmyBePUXXG8Gks7Mz81xfb9VMWyvAg6NcpKvf5QpLX0ksQHGcdDcZQCrQJuN2Bq5WJqeDeOu_XfgctLOlNKIBFOJn4jJG3MB4zYkis56zKXnKhbw8ZBZ0yKoUCvpAmiTvXOb9QC20ywixfEYlCA0dqikydTODPbq7qBUB3kEhkNRqgGNu82-IwXH5knJ9g', text: 'Looks brand new again! Great job civic crew.', time: '1 day ago' }
    ]
  }
];

export const initialPredictiveInsights = [
  {
    id: 'pred-1',
    zone: 'Downtown Historic District (Zone 4)',
    riskType: 'Pothole Recurrence Surge',
    riskLevel: 'High Risk (88%)',
    driver: 'Freeze-thaw cycle + heavy bus transit route',
    forecast: 'Expect 4-7 new asphalt fractures along 4th Ave & Main St in next 14 days.',
    aiRecommendation: 'Deploy preventative infrared asphalt rejuvenation before weekend rainstorm.',
    confidence: '92%'
  },
  {
    id: 'pred-2',
    zone: 'Oak Park Grid (Zone 2)',
    riskType: 'Streetlight Cable Degeneration',
    riskLevel: 'Medium Risk (64%)',
    driver: 'Aging 1980s underground conduit corrosion',
    forecast: 'Probability of 3 adjacent pole outages along Oak Lane within 30 days.',
    aiRecommendation: 'Schedule thermal scan of junction boxes JB-102 through JB-108.',
    confidence: '86%'
  },
  {
    id: 'pred-3',
    zone: 'Central Green & Riverside (Zone 1)',
    riskType: 'Sanitation Overflow Anomaly',
    riskLevel: 'Elevated Risk (79%)',
    driver: 'Upcoming weekend farmer market and civic fair',
    forecast: 'Expected +240% waste volume surge between Saturday 10 AM and Sunday 6 PM.',
    aiRecommendation: 'Pre-position 6 high-capacity solar compaction bins on Friday evening.',
    confidence: '95%'
  }
];

export const initialCommunityPerks = [
  { id: 'perk-1', name: 'Neighborhood Tree Dedication', pointsCost: 500, icon: 'nature', desc: 'A sapling planted in Central Green with your Community Hero plaque.' },
  { id: 'perk-2', name: 'City Hall Civic Badge of Honor', pointsCost: 350, icon: 'military_tech', desc: 'Official digital and physical commendation by Mayor\'s Civic Board.' },
  { id: 'perk-3', name: 'Artisanal Coffee Voucher', pointsCost: 200, icon: 'local_cafe', desc: '$10 credit at community partner cafes (Bluebird Bakery, Oak Roasters).' },
  { id: 'perk-4', name: 'Priority Issue Dispatch Vote', pointsCost: 150, icon: 'electric_bolt', desc: 'Boost one community ticket directly into urgent municipal review queue.' }
];
