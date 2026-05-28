import React from 'react';
import { ShieldHalf, Activity, CloudLightning, MapPin, Navigation, Clock } from 'lucide-react';

const BUILDINGS = [
  {
    id: 1,
    name: "QCU Administration",
    location: "Main Campus",
    time: "2 min",
    status: "Open",
    color: "bg-blue-500/20",
    icon: <ShieldHalf className="w-6 h-6 text-blue-500" />,
    type: "Academic"
  },
  {
    id: 2,
    name: "Engineering Building",
    location: "North Block",
    time: "5 min",
    status: "Closed",
    color: "bg-red-500/20",
    icon: <Activity className="w-6 h-6 text-red-500" />,
    type: "Academic"
  },
  {
    id: 3,
    name: "Student Plaza",
    location: "Central Area",
    time: "1 min",
    status: "Open",
    color: "bg-green-500/20",
    icon: <ShieldHalf className="w-6 h-6 text-green-500" />,
    type: "Others"
  },
  {
    id: 4,
    name: "Library & Media Center",
    location: "South Block",
    time: "4 min",
    status: "Open",
    color: "bg-orange-500/20",
    icon: <CloudLightning className="w-6 h-6 text-orange-500" />,
    type: "Academic"
  },
  {
    id: 5,
    name: "University Gym",
    location: "East Wing",
    time: "8 min",
    status: "Open",
    color: "bg-purple-500/20",
    icon: <Activity className="w-6 h-6 text-purple-500" />,
    type: "others"
  }
];

function BuildingModal() {
  return (
    <div className="px-4 py-2 flex flex-col gap-1 pb-20">
      {/* Title Header */}
      <div className="px-2 pt-2 mb-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Nearby Locations
        </h1>
        <p className="text-gray-400 text-sm">Discover buildings and services near you</p>
      </div>

      {/* Building List */}
      <div className="flex flex-col gap-3">
        {BUILDINGS.map((building) => (
          <div 
            key={building.id}
            className="grid grid-cols-[auto_1fr_auto] gap-4 w-full items-center px-4 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all cursor-pointer active:scale-[0.98]"
          >
            {/* Icon Container */}
            <div className={`w-12 h-12 flex ${building.color} rounded-xl justify-center items-center`}>
              {building.icon}
            </div>
             
            {/* Details */}
            <div className="flex flex-col">
              <h2 className="text-white font-bold text-lg leading-tight">{building.name}</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-gray-500" />
                <p className="text-sm text-gray-400 font-medium">{building.location}</p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="text-right flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                <Clock className="w-3 h-3" />
                <span className="text-[11px] font-bold uppercase tracking-wider">{building.time}</span>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Footer Hint */}
      <div className="text-center py-6">
        <p className="text-gray-500 text-xs font-medium uppercase tracking-[0.2em]">End of list</p>
      </div>
    </div>
  );
}

export default BuildingModal;
