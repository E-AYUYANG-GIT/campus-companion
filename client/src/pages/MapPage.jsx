import React, { useState, useRef, useCallback } from 'react';
import SearchbarSection from '../components/shared/SearchbarSection';
import BuildingModal from '../components/map/BuildingModal';

function MapOverlay() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(160deg, #1a2744 0%, #0f1f3d 40%, #162032 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.2 }}>
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#4a9eff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Center Marker */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(74,158,255,0.3)',
          border: '2px solid #4a9eff',
          boxShadow: '0 0 20px rgba(74,158,255,0.4)',
        }}
      />

      {/* Searchbar pinned to top */}
      <div style={{ position: 'absolute', top: '12px', left: 0, right: 0, zIndex: 10, display: 'flex', justifyContent: 'center' }}>
        <SearchbarSection />
      </div>
    </div>
  );
}

function MapPage() {
  const [sheetY, setSheetY] = useState(65);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef(null);
  const dragStartY = useRef(null);

  const SNAP_POINTS = [65, 10];

  const onDragStart = (clientY) => {
    setIsDragging(true);
    dragStartPos.current = clientY;
    dragStartY.current = sheetY;
  };

  const onDragMove = (clientY) => {
    if (dragStartPos.current === null) return;
    const delta = clientY - dragStartPos.current;
    const viewportH = window.innerHeight;
    const newY = dragStartY.current + (delta / viewportH) * 100;
    setSheetY(Math.min(85, Math.max(5, newY)));
  };

  const onDragEnd = () => {
    setIsDragging(false);
    dragStartPos.current = null;
    dragStartY.current = null;
    setSheetY(currentY => {
      return SNAP_POINTS.reduce((prev, curr) =>
        Math.abs(curr - currentY) < Math.abs(prev - currentY) ? curr : prev
      );
    });
  };

  return (
    <div style={{ 
      position: 'relative', 
      flex: 1, 
      width: '100%', 
      height: '100%', 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Background Map Layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <MapOverlay />
      </div>

      {/* Sliding Sheet */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${sheetY}%`,
          bottom: 0,
          zIndex: 20,
          background: '#0f172a',
          borderRadius: '24px 24px 0 0',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.6)',
          transition: isDragging ? 'none' : 'top 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          willChange: 'top',
        }}
      >
        {/* Handle */}
        <div
          onMouseDown={(e) => onDragStart(e.clientY)}
          onTouchStart={(e) => onDragStart(e.touches[0].clientY)}
          style={{
            padding: '16px 0',
            display: 'flex',
            justifyContent: 'center',
            cursor: 'grab',
            flexShrink: 0,
          }}
          onMouseMove={(e) => isDragging && onDragMove(e.clientY)}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchMove={(e) => onDragMove(e.touches[0].clientY)}
          onTouchEnd={onDragEnd}
        >
          <div style={{ width: '40px', height: '5px', borderRadius: '3px', background: 'rgba(255,255,255,0.2)' }} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: isDragging ? 'hidden' : 'auto', WebkitOverflowScrolling: 'touch' }}>
          <BuildingModal />
        </div>
      </div>
    </div>
  );
}

export default MapPage;
