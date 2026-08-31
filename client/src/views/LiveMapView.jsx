import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useApp } from '../context/AppContext.jsx';

// Custom Map Controller to center on selected coordinates
const MapRecenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15, { duration: 1.2 });
    }
  }, [center, map]);
  return null;
};

// Create whimsical Leaflet SVG icons for each category
const createWhimsicalIcon = (iconName, category) => {
  const colorMap = {
    roads: '#BADEFF',
    lighting: '#B9D5EE',
    water: '#A0C4E4',
    waste: '#E2E2E2',
    parks: '#CBE6FF',
    safety: '#FFDAD6'
  };

  const bg = colorMap[category] || '#FFFFFF';

  return L.divIcon({
    className: 'custom-ink-icon',
    html: `
      <div style="
        width: 42px;
        height: 42px;
        background: ${bg};
        border: 2px solid #000000;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 0 0 rgba(0, 0, 0, 1);
        cursor: pointer;
        transform: translate(-50%, -50%);
        transition: transform 0.2s ease;
      ">
        <span class="material-symbols-outlined" style="font-size: 20px; color: #000000;">${iconName}</span>
      </div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 21]
  });
};

export const LiveMapView = () => {
  const {
    issues,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    searchQuery,
    setSelectedIssueId,
    handleVerify,
    playAudioFeedback
  } = useApp();

  const [mapCenter, setMapCenter] = useState([40.7138, -74.0060]);
  const [activeItemOnMap, setActiveItemOnMap] = useState(null);

  const categories = [
    { id: 'all', label: 'All Hazards', icon: 'apps' },
    { id: 'roads', label: 'Roads & Potholes', icon: 'construction' },
    { id: 'lighting', label: 'Streetlights', icon: 'lightbulb' },
    { id: 'water', label: 'Water & Leaks', icon: 'water_drop' },
    { id: 'waste', label: 'Sanitation', icon: 'delete' },
    { id: 'parks', label: 'Parks', icon: 'park' }
  ];

  const statuses = [
    { id: 'all', label: 'All Statuses' },
    { id: 'Submitted', label: 'Submitted' },
    { id: 'Community Verified', label: 'Verified' },
    { id: 'In Progress', label: 'In Progress' },
    { id: 'Resolved', label: 'Resolved' }
  ];

  // Filter issues
  const filteredIssues = issues.filter(issue => {
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || issue.status === selectedStatus;
    const matchesSearch = !searchQuery ||
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location?.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'roads': return 'construction';
      case 'lighting': return 'lightbulb';
      case 'water': return 'water_drop';
      case 'waste': return 'delete';
      case 'parks': return 'park';
      default: return 'warning';
    }
  };

  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col animate-in fade-in duration-300">
      {/* Category & Status Filter Header */}
      <div className="mb-4 bg-container rounded-2xl p-3.5 border-2 border-primary shadow-[0_3px_0_0_rgba(0,0,0,1)] flex flex-wrap items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((c) => {
            const isSelected = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  playAudioFeedback('click');
                  setSelectedCategory(c.id);
                }}
                className={`px-3 py-1.5 rounded-full border border-primary text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-[0_2px_0_0_rgba(0,0,0,1)]'
                    : 'bg-surface-container-low text-primary hover:bg-accent-blue'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{c.icon}</span>
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* Status Dropdown / Pills */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-outline font-semibold">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-surface-container-low border border-primary rounded-lg px-2.5 py-1 text-xs font-bold text-primary outline-none cursor-pointer"
          >
            {statuses.map(s => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Map + Side Feed Container */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden">
        {/* Map Container */}
        <div className="flex-1 h-[360px] lg:h-full rounded-2xl border-2 border-primary shadow-[0_6px_0_0_rgba(0,0,0,1)] overflow-hidden relative bg-container">
          <MapContainer
            center={mapCenter}
            zoom={14}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            {/* Tile Layer (Clean OpenStreetMap or CartoDB Positron for light theme) */}
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <MapRecenter center={mapCenter} />

            {/* Render Issue Markers */}
            {filteredIssues.map((issue) => {
              if (!issue.location?.lat || !issue.location?.lng) return null;
              const icon = createWhimsicalIcon(getCategoryIcon(issue.category), issue.category);

              return (
                <Marker
                  key={issue.id}
                  position={[issue.location.lat, issue.location.lng]}
                  icon={icon}
                  eventHandlers={{
                    click: () => {
                      playAudioFeedback('click');
                      setActiveItemOnMap(issue);
                    }
                  }}
                >
                  <Popup>
                    <div className="p-1 max-w-[220px]">
                      <div className="w-full h-20 rounded-lg overflow-hidden border border-primary mb-2">
                        <img src={issue.images[0]} alt={issue.title} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="font-headline-md font-bold text-sm text-primary leading-snug">
                        {issue.title}
                      </h4>
                      <p className="text-[11px] text-on-surface-variant line-clamp-1 mt-0.5">
                        {issue.location.address}
                      </p>
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-primary/20">
                        <span className="text-[10px] font-bold bg-secondary-container px-2 py-0.5 rounded border border-primary">
                          {issue.status}
                        </span>
                        <button
                          onClick={() => setSelectedIssueId(issue.id)}
                          className="text-xs font-bold text-secondary underline hover:text-primary"
                        >
                          Full Details
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>

          {/* Map Overlay Badge */}
          <div className="absolute top-4 left-4 z-[400] bg-container/95 backdrop-blur-sm border-2 border-primary rounded-xl px-3 py-1.5 shadow-[0_3px_0_0_rgba(0,0,0,1)] pointer-events-none">
            <span className="font-bold text-xs flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              <span>{filteredIssues.length} Local Hazards Active</span>
            </span>
          </div>
        </div>

        {/* Right Feed: Latest Activity */}
        <div className="w-full lg:w-96 flex flex-col gap-3 z-10 bg-container rounded-2xl p-4 border-2 border-primary shadow-[0_6px_0_0_rgba(0,0,0,1)] h-full overflow-hidden">
          <div className="flex items-center justify-between border-b border-primary pb-2">
            <h2 className="font-headline-md text-base font-bold text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary">feed</span>
              Live Hyperlocal Activity
            </h2>
            <span className="text-[11px] font-bold text-on-surface-variant">
              {filteredIssues.length} items
            </span>
          </div>

          {/* Feed Scroll List */}
          <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3">
            {filteredIssues.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-3xl">🌱</span>
                <p className="text-xs font-bold text-on-surface-variant mt-2">No hazards found matching filter.</p>
              </div>
            ) : (
              filteredIssues.map((issue) => (
                <div
                  key={issue.id}
                  onClick={() => {
                    playAudioFeedback('click');
                    if (issue.location?.lat && issue.location?.lng) {
                      setMapCenter([issue.location.lat, issue.location.lng]);
                    }
                  }}
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer group ${
                    activeItemOnMap?.id === issue.id
                      ? 'bg-secondary-container/40 border-primary shadow-[0_3px_0_0_rgba(0,0,0,1)]'
                      : 'bg-surface-container-lowest border-primary/60 hover:border-primary hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="w-14 h-14 rounded-lg border border-primary shrink-0 overflow-hidden bg-surface-container">
                      <img src={issue.images[0]} alt={issue.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-headline-md text-xs font-bold text-primary truncate group-hover:underline">
                          {issue.title}
                        </h3>
                      </div>
                      <p className="text-[11px] text-on-surface-variant truncate mt-0.5">
                        {issue.location.address}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-[10px]">
                        <span className={`px-2 py-0.5 rounded-full border border-primary font-bold ${
                          issue.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                          issue.status === 'In Progress' ? 'bg-secondary-container' : 'bg-surface-container'
                        }`}>
                          {issue.status}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVerify(issue.id);
                            }}
                            className={`px-2 py-0.5 rounded border border-primary font-bold flex items-center gap-1 ${
                              issue.userHasVoted ? 'bg-primary text-on-primary' : 'bg-container hover:bg-accent-blue'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[12px]">thumb_up</span>
                            <span>{issue.verifications || 0}</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedIssueId(issue.id);
                            }}
                            className="font-bold text-secondary hover:text-primary underline"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
