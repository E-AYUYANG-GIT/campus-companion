import React, { useState, useRef, useEffect, useCallback } from 'react';
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
      {/* Grid Overlay */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }}>
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
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'rgba(74,158,255,0.2)',
          border: '2px solid #4a9eff',
          boxShadow: '0 0 15px rgba(74,158,255,0.3)',
        }}
      />

      {/* Searchbar wrapper */}
      <div style={{ position: 'absolute', top: '12px', left: 0, right: 0, zIndex: 10, display: 'flex', justifyContent: 'center' }}>
        <SearchbarSection />
      </div>
    </div>
  );
}

function MapPage() {
  const [sheetY, setSheetY] = useState(65); // Initial peek position
  const [isDragging, setIsDragging] = useState(false);
  
  const dragStartPos = useRef(null);
  const dragStartY = useRef(null);
  
  const SNAP_POINTS = [65, 5]; // Peek and Full (5% instead of 10% for more "full" feel)

  const handleDragStart = useCallback((clientY) => {
    setIsDragging(true);
    dragStartPos.current = clientY;
    dragStartY.current = sheetY;
  }, [sheetY]);

  const handleDragMove = useCallback((clientY) => {
    if (dragStartPos.current === null) return;
    const delta = clientY - dragStartPos.current;
    const viewportH = window.innerHeight;
    const newY = dragStartY.current + (delta / viewportH) * 100;
    
    // Constraints: Don't let it go off-screen at bottom, or too far past top
    setSheetY(Math.min(88, Math.max(2, newY)));
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    dragStartPos.current = null;
    dragStartY.current = null;

    setSheetY(currentY => {
      return SNAP_POINTS.reduce((prev, curr) =>
        Math.abs(curr - currentY) < Math.abs(prev - currentY) ? curr : prev
      );
    });
  }, [isDragging]);

  // Window listeners for smooth dragging even when mouse leaves handle
  useEffect(() => {
    if (isDragging) {
      const onMove = (e) => handleDragMove(e.type.includes('touch') ? e.touches[0].clientY : e.clientY);
      const onEnd = () => handleDragEnd();

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('touchend', onEnd);

      return () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onEnd);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('touchend', onEnd);
      };
    }
  }, [isDragging, handleDragMove, handleDragEnd]);

  return (
    <div style={{ 
      position: 'relative', 
      flex: 1, 
      width: '100%', 
      height: '100%', 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      background: '#0b0f1a'
    }}>
      {/* Background Map */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <MapOverlay />
      </div>

      {/* Bottom Sheet */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${sheetY}%`,
          bottom: '-100px', // Extra buffer to ensure content can always scroll up
          zIndex: 20,
          background: '#0f172a',
          borderRadius: '28px 28px 0 0',
          boxShadow: '0 -12px 48px rgba(0,0,0,0.7)',
          transition: isDragging ? 'none' : 'top 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
          display: 'flex',
          flexDirection: 'column',
          willChange: 'top',
        }}
      >
        {/* Drag Handle (Touch Target) */}
        <div
          onMouseDown={(e) => handleDragStart(e.clientY)}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
          style={{
            padding: '16px 0 24px',
            display: 'flex',
            justifyContent: 'center',
            cursor: isDragging ? 'grabbing' : 'grab',
            flexShrink: 0,
            touchAction: 'none' // Prevent browser scroll while dragging handle
          }}
        >
          <div style={{ 
            width: '44px', 
            height: '5px', 
            borderRadius: '3px', 
            background: 'rgba(255,255,255,0.25)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
          }} />
        </div>

        {/* Scrollable Content Container */}
        <div 
          style={{ 
            flex: 1, 
            overflowY: isDragging ? 'hidden' : 'auto', 
            WebkitOverflowScrolling: 'touch',
            paddingBottom: '120px' // Offset the negative bottom of parent
          }}
        >
          <BuildingModal />
        </div>
      </div>
    </div>
  );
}

export default MapPage;
