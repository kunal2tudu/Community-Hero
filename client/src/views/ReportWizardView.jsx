import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useApp } from '../context/AppContext.jsx';
import { api } from '../services/api.js';

// Interactive Pin Dropper for Map
const LocationPicker = ({ position, setPosition, setAddress }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      setAddress(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)} (Pin dropped on map)`);
    }
  });

  const pinIcon = L.divIcon({
    className: 'custom-pin',
    html: `<div style="font-size: 32px; transform: translate(-50%, -100%);">📍</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });

  return position ? <Marker position={position} icon={pinIcon} /> : null;
};

export const ReportWizardView = () => {
  const { handleCreateIssue, playAudioFeedback, setSelectedIssueId } = useApp();

  const [step, setStep] = useState(1);
  const [isAiScanning, setIsAiScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  // Form State
  const [selectedImage, setSelectedImage] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuCFVowrUhZE6y_dh6_PeRq6TDsuwG-omV4-QYHN-a4dDLC36-nYcWJrufjclngR2sS23KnuEMoSjakhweoovZ5TC-lngA3FkIpmfqO0Pp_B_Bx7MS3M4bZpSi9v1-Kq5EN_xgrp3ANCRa5usIZkARw79wDUOwX9Kl5GltjYBOefdXMGj7RYDxLo3uCf8ziMB4dKyxgfLCGvMKtwDYXWQLOTB-CobKG4D_4YWOE6Kmi1XQzKnr9Hh8TRKw');
  const [title, setTitle] = useState('Severe Asphalt Pothole');
  const [category, setCategory] = useState('roads');
  const [description, setDescription] = useState('Deep asphalt crater right on 4th Ave near the bakery. Creates dangerous hazard for cyclists and night traffic.');
  const [address, setAddress] = useState('Main St & 4th Ave, Near Baker House');
  const [pinPosition, setPinPosition] = useState([40.7128, -74.0060]);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample Presets for effortless testing
  const presets = [
    {
      label: '🕳️ Severe Pothole',
      category: 'roads',
      title: 'Deep Asphalt Road Cavity',
      desc: 'Large pothole expanding rapidly after rain on 4th Ave. Dangerous for cyclists.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFVowrUhZE6y_dh6_PeRq6TDsuwG-omV4-QYHN-a4dDLC36-nYcWJrufjclngR2sS23KnuEMoSjakhweoovZ5TC-lngA3FkIpmfqO0Pp_B_Bx7MS3M4bZpSi9v1-Kq5EN_xgrp3ANCRa5usIZkARw79wDUOwX9Kl5GltjYBOefdXMGj7RYDxLo3uCf8ziMB4dKyxgfLCGvMKtwDYXWQLOTB-CobKG4D_4YWOE6Kmi1XQzKnr9Hh8TRKw',
      coords: [40.7128, -74.0060],
      addr: 'Main St & 4th Ave'
    },
    {
      label: '💡 Shattered Streetlight',
      category: 'lighting',
      title: 'Broken Streetlight Luminaire',
      desc: 'Casing shattered on pole SL-884, leaves corner pitch dark at night.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj9ZD1J7LrfBmREM3d5a_y5PE5Kkhr4e3QI_0TAZJrM16ScXgqsK4XUChx_gBrP0RZxK20oVlnzuqMW4U9jZxrRdPqVdHxI7pc3qoMN7nnG3We8Wmftkc-Ys4Uq9OA6VQHJKg-yrBFH0MB0oEYEhpTeZ3MbVioVj-uYSkVtIcPLzuOfSwZDDQw07yIpWEvN97PaZX6gDuCoEkwqmx9BUv9h_oXU7kx2JGCIVEn0FolYD0zg2JUM42osw',
      coords: [40.7180, -73.9980],
      addr: '412 Oak Lane, Corner of Elm Way'
    },
    {
      label: '💧 Water Main Burst',
      category: 'water',
      title: 'Pressurized Water Line Leak',
      desc: 'Clean drinking water gushing from curb seam onto Cedar St.',
      img: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=600&auto=format&fit=crop&q=80',
      coords: [40.7090, -74.0110],
      addr: '218 Cedar Street'
    },
    {
      label: '🗑️ Trash Overflow',
      category: 'waste',
      title: 'Overflowing Park Receptacle',
      desc: 'Debris spilling out onto walkway near Central Green playground.',
      img: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80',
      coords: [40.7150, -74.0020],
      addr: 'Central Green Park, Playground Zone 2'
    }
  ];

  const handleApplyPreset = (p) => {
    playAudioFeedback('click');
    setTitle(p.title);
    setCategory(p.category);
    setDescription(p.desc);
    setSelectedImage(p.img);
    setPinPosition(p.coords);
    setAddress(p.addr);
  };

  // Run AI Vision Scan
  const runAiScan = async () => {
    playAudioFeedback('vote');
    setIsAiScanning(true);
    setScanProgress(15);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 200);

    try {
      const res = await api.runAiTriage({
        imageUrl: selectedImage,
        titleHint: title,
        categoryHint: category,
        coordinates: { lat: pinPosition[0], lng: pinPosition[1] }
      });

      clearInterval(interval);
      setScanProgress(100);

      setTimeout(() => {
        setIsAiScanning(false);
        if (res && res.success) {
          setAiAnalysis(res.data);
          setStep(2);
        }
      }, 500);
    } catch {
      clearInterval(interval);
      setIsAiScanning(false);
      setStep(2);
    }
  };

  // Final Submit
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const created = await handleCreateIssue({
        title,
        description,
        category,
        location: {
          address,
          lat: pinPosition[0],
          lng: pinPosition[1],
          neighborhood: 'Civic Sector'
        },
        images: [selectedImage],
        aiAnalysis,
        priority: aiAnalysis?.suggestedPriority || 'Medium'
      });
      if (created) {
        setSelectedIssueId(created.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-300 pb-20">
      {/* Main Wizard Vessel Container */}
      <div className="bg-container border-2 border-primary rounded-[2rem] shadow-[0_8px_0_0_rgba(0,0,0,1)] overflow-hidden">
        {/* Wizard Header & Progress Bar */}
        <div className="p-6 md:p-8 border-b-2 border-primary bg-surface-container-low text-center">
          <div className="inline-block px-3 py-1 bg-accent-blue rounded-full border border-primary text-xs font-bold mb-2">
            📸 Intelligent Civic Report Wizard
          </div>
          <h2 className="font-headline-lg text-2xl md:text-3xl text-primary font-bold">
            Report a Community Hazard
          </h2>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant max-w-md mx-auto mt-1">
            Our AI Vision will automatically classify the problem, verify urgency, and route directly to the city crew.
          </p>

          {/* Step Indicators */}
          <div className="flex items-center justify-center gap-3 mt-6 max-w-sm mx-auto">
            {[
              { num: 1, label: 'Upload' },
              { num: 2, label: 'AI Triage' },
              { num: 3, label: 'Location' },
              { num: 4, label: 'Review' }
            ].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 border-primary transition-colors ${
                    step === s.num
                      ? 'bg-primary text-on-primary shadow-[0_2px_0_0_rgba(0,0,0,1)]'
                      : step > s.num
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'bg-surface-container text-outline'
                  }`}>
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span className="font-caption text-[11px] font-bold mt-1 text-primary">{s.label}</span>
                </div>
                {idx < 3 && (
                  <div className={`flex-1 h-0.5 border-t-2 ${step > s.num ? 'border-primary' : 'border-dashed border-outline-variant'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Wizard Body */}
        <div className="p-6 md:p-10">
          {/* STEP 1: Upload Evidence */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="font-headline-md text-xl font-bold text-center text-primary">
                Step 1: Provide Visual Evidence
              </h3>

              {/* Sample Hazard Presets */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-2">
                  ✨ Quick-Fill Hazard Presets:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {presets.map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleApplyPreset(p)}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                        title === p.title
                          ? 'bg-secondary-container border-primary shadow-[0_2px_0_0_rgba(0,0,0,1)]'
                          : 'bg-surface-container-low border-primary/40 hover:bg-accent-blue'
                      }`}
                    >
                      <p className="truncate">{p.label}</p>
                      <span className="text-[10px] text-outline font-normal">Click to load</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Preview & Drag Area */}
              <div className="border-2 border-dashed border-primary rounded-2xl p-6 bg-surface-container-lowest flex flex-col items-center justify-center text-center">
                {selectedImage ? (
                  <div className="relative w-full max-w-sm rounded-xl overflow-hidden border-2 border-primary shadow-[0_4px_0_0_rgba(0,0,0,1)] mb-3">
                    <img src={selectedImage} alt="Preview" className="w-full h-48 object-cover" />
                    <button
                      onClick={() => setSelectedImage('')}
                      className="absolute top-2 right-2 bg-container border border-primary rounded-full px-2 py-0.5 text-xs font-bold shadow"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div className="py-8">
                    <span className="material-symbols-outlined text-5xl text-primary mb-2">cloud_upload</span>
                    <p className="font-bold text-sm">Drag & drop photo here or use presets above</p>
                    <p className="text-xs text-outline mt-1">JPG, PNG up to 10MB</p>
                  </div>
                )}
              </div>

              {/* AI Scanning Progress State */}
              {isAiScanning && (
                <div className="bg-accent-blue/40 rounded-2xl p-5 border-2 border-primary animate-soft-pulse">
                  <div className="flex items-center gap-2 mb-2 font-bold text-xs text-primary">
                    <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                    <span>AI Vision Engine Analyzing Hazard & Checking Duplicates...</span>
                  </div>
                  <div className="w-full bg-container rounded-full h-3 border border-primary overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all duration-300 rounded-full"
                      style={{ width: `${scanProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-2 text-center">
                    Running neural feature extraction & GIS proximity matching...
                  </p>
                </div>
              )}

              {/* Step 1 Actions */}
              <div className="flex justify-end pt-4 border-t border-primary/20">
                <button
                  type="button"
                  onClick={runAiScan}
                  disabled={isAiScanning}
                  className="btn-ink px-8 py-3.5 font-bold text-xs flex items-center gap-2"
                >
                  <span>{isAiScanning ? 'Analyzing with AI...' : 'Next: Run AI Triage'}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: AI Triage & Diagnostics Result */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 border border-green-800 rounded-full text-green-900 text-xs font-bold mb-2">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  AI Vision Analysis Complete
                </div>
                <h3 className="font-headline-md text-xl font-bold text-primary">
                  Step 2: Review AI Classification
                </h3>
              </div>

              {/* Proximity Duplicate Warning (If matched nearby) */}
              {aiAnalysis?.duplicateCheck?.hasPossibleDuplicate && (
                <div className="bg-yellow-100 border-2 border-yellow-800 rounded-2xl p-4 text-xs text-yellow-950">
                  <div className="flex items-center gap-2 font-bold text-sm mb-1">
                    <span className="material-symbols-outlined">warning</span>
                    <span>Possible Nearby Duplicate Detected!</span>
                  </div>
                  <p>
                    A similar hazard ({aiAnalysis.duplicateCheck.potentialMatches[0]?.title}) was already reported nearby at{' '}
                    <strong>{aiAnalysis.duplicateCheck.potentialMatches[0]?.address}</strong> with {aiAnalysis.duplicateCheck.potentialMatches[0]?.verifications} votes.
                  </p>
                  <p className="mt-1 font-semibold">
                    💡 You can proceed to submit a fresh angle, or our system will automatically merge verification weights.
                  </p>
                </div>
              )}

              {/* AI Diagnostic Metrics */}
              {aiAnalysis && (
                <div className="bg-accent-blue/30 rounded-2xl p-5 border-2 border-primary space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-primary/20">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-outline">Detected Object</span>
                      <h4 className="font-headline-md font-bold text-base text-primary">
                        {aiAnalysis.detectedObject}
                      </h4>
                    </div>
                    <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-bold">
                      {Math.round(aiAnalysis.confidence * 100)}% Match
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-container p-3 rounded-xl border border-primary">
                      <span className="text-outline uppercase font-semibold text-[10px]">Suggested Department</span>
                      <p className="font-bold text-primary text-sm mt-0.5">{aiAnalysis.department}</p>
                    </div>
                    <div className="bg-container p-3 rounded-xl border border-primary">
                      <span className="text-outline uppercase font-semibold text-[10px]">Urgency & Safety</span>
                      <p className="font-bold text-primary text-sm mt-0.5">{aiAnalysis.suggestedPriority} Priority ({aiAnalysis.urgencyScore}%)</p>
                    </div>
                  </div>

                  <div className="bg-container p-3.5 rounded-xl border border-primary text-xs">
                    <span className="text-outline uppercase font-semibold text-[10px]">AI Municipal Recommendation</span>
                    <p className="text-on-surface mt-1 italic">"{aiAnalysis.aiSummary}"</p>
                  </div>
                </div>
              )}

              {/* Editable Title & Description */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-primary mb-1">Issue Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-primary rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-primary mb-1">Citizen Description & Field Notes</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-primary rounded-xl text-xs focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              {/* Step 2 Actions */}
              <div className="flex justify-between pt-4 border-t border-primary/20">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-ink-white px-6 py-3 font-bold text-xs"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playAudioFeedback('click');
                    setStep(3);
                  }}
                  className="btn-ink px-8 py-3 font-bold text-xs flex items-center gap-1.5"
                >
                  <span>Next: Pinpoint Location</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Location Pinpoint */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="font-headline-md text-xl font-bold text-primary">
                  Step 3: Pinpoint Exact Geolocation
                </h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Click anywhere on the map to place or adjust the municipal dispatch pin.
                </p>
              </div>

              {/* Interactive Map Picker */}
              <div className="h-64 rounded-2xl border-2 border-primary shadow-[0_4px_0_0_rgba(0,0,0,1)] overflow-hidden relative">
                <MapContainer
                  center={pinPosition}
                  zoom={15}
                  scrollWheelZoom={false}
                  className="w-full h-full"
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  />
                  <LocationPicker
                    position={pinPosition}
                    setPosition={setPinPosition}
                    setAddress={setAddress}
                  />
                </MapContainer>
              </div>

              {/* Address Input */}
              <div>
                <label className="block text-xs font-bold text-primary mb-1">
                  Street Address or Landmark
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-container-lowest border border-primary rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              {/* Step 3 Actions */}
              <div className="flex justify-between pt-4 border-t border-primary/20">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-ink-white px-6 py-3 font-bold text-xs"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playAudioFeedback('click');
                    setStep(4);
                  }}
                  className="btn-ink px-8 py-3 font-bold text-xs flex items-center gap-1.5"
                >
                  <span>Next: Review & Submit</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Submit */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="font-headline-md text-xl font-bold text-primary">
                  Step 4: Final Ticket Review
                </h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Submitting will award you <strong>+50 Hero Points</strong> and publish to the live community feed!
                </p>
              </div>

              {/* Ticket Preview Card */}
              <div className="bg-surface-container-lowest border-2 border-primary rounded-2xl p-5 shadow-[0_4px_0_0_rgba(0,0,0,1)] space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-24 h-24 rounded-xl border border-primary overflow-hidden shrink-0">
                    <img src={selectedImage} alt="Evidence" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary-container border border-primary uppercase">
                      {category}
                    </span>
                    <h4 className="font-headline-md font-bold text-base text-primary mt-1">
                      {title}
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      📍 {address}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-surface-container-low rounded-xl border border-primary text-xs">
                  <p className="text-on-surface font-medium">{description}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-accent-blue/30 rounded-lg border border-primary">
                    <span className="text-outline text-[10px] uppercase font-bold">Auto-Assigned</span>
                    <p className="font-bold text-primary">{aiAnalysis?.department || 'Public Works'}</p>
                  </div>
                  <div className="p-2.5 bg-secondary-container/30 rounded-lg border border-primary">
                    <span className="text-outline text-[10px] uppercase font-bold">Priority Status</span>
                    <p className="font-bold text-primary">{aiAnalysis?.suggestedPriority || 'Medium'} Priority</p>
                  </div>
                </div>
              </div>

              {/* Step 4 Actions */}
              <div className="flex justify-between pt-4 border-t border-primary/20">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn-ink-white px-6 py-3 font-bold text-xs"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn-ink px-10 py-3.5 font-bold text-sm flex items-center gap-2 shadow-[0_6px_0_0_rgba(0,0,0,1)]"
                >
                  <span>{isSubmitting ? 'Publishing Ticket...' : '🎉 Submit Report (+50 pts)'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
