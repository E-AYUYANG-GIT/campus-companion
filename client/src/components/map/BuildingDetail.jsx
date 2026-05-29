import React from 'react';

function BuildingDetail({ building, onClose }) {
  if (!building) return null;

  const {
    name = 'Belmonte Building',
    type = 'BUILDING',
    status = 'Open',
    closingTime = '9:00 PM',
    levels = 'Levels 1 – 4',
    levelLink = '#',
    category = 'Classroom Building',
    occupancyStatus = 'Currently quiet',
    occupancyPercent = 15,
    buildingClass = 'Laboratory Building',
    safetyTip = 'This location is a designated Campus Safe Zone with 24/7 security presence and emergency call buttons.',
  } = building;

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* Type Badge */}
      <div style={{ marginBottom: 12 }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          background: '#eef2ff',
          color: '#4f46e5',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.07em',
          padding: '4px 10px',
          borderRadius: 6,
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
          </svg>
          {type}
        </span>
      </div>

      {/* Building Name */}
      <h2 style={{
        fontSize: 26,
        fontWeight: 700,
        color: '#0f172a',
        margin: '0 0 8px',
        lineHeight: 1.2,
        letterSpacing: '-0.3px',
      }}>
        {name}
      </h2>

      {/* Status + Level row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 13,
        color: '#475569',
        marginBottom: 14,
        flexWrap: 'wrap',
      }}>
        <span>{status} · Closes {closingTime}</span>
        <span style={{ color: '#cbd5e1' }}>·</span>
        <a
          href={levelLink}
          style={{
            color: '#3b82f6',
            textDecoration: 'underline',
            textDecorationColor: 'rgba(59,130,246,0.4)',
            textUnderlineOffset: 2,
            fontWeight: 500,
          }}
          onClick={(e) => e.preventDefault()}
        >
          {category},<br />
          {levels}
        </a>
      </div>

      {/* Occupancy indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
        fontSize: 13,
        color: '#334155',
      }}>
        <span style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: '#22c55e',
          boxShadow: '0 0 0 3px rgba(34,197,94,0.2)',
          flexShrink: 0,
          display: 'inline-block',
        }} />
        <span>
          <strong style={{ fontWeight: 600 }}>{occupancyStatus}</strong>
          <span style={{ color: '#94a3b8', marginLeft: 6 }}>({occupancyPercent}% capacity)</span>
        </span>
      </div>

      {/* Building class */}
      <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px' }}>
        {buildingClass},
      </p>

      {/* Get Directions button */}
      <button
        style={{
          width: '100%',
          padding: '14px 0',
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 14,
          fontSize: 15,
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          marginBottom: 20,
          letterSpacing: '0.01em',
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
        </svg>
        Get Directions
      </button>

      {/* Safety Tip card */}
      <div style={{
        background: '#eff6ff',
        borderRadius: 12,
        padding: '12px 14px',
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
      }}>
        <div style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: '#3b82f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 1,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#1e40af', margin: '0 0 3px' }}>Safety Tip</p>
          <p style={{ fontSize: 12, color: '#3b82f6', margin: 0, lineHeight: 1.5 }}>{safetyTip}</p>
        </div>
      </div>

    </div>
  );
}

export default BuildingDetail;