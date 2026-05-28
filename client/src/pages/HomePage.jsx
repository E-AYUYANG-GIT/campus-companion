import React, { useState, useRef, useCallback } from 'react';
import { ShieldUser, PhoneCall, TriangleAlert } from 'lucide-react';
import SearchbarSection from '../components/shared/SearchbarSection';

/* ─── Map Overlay Placeholder ─── */
function MapOverlay() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '40vh',
        borderRadius: '0',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #1a2744 0%, #0f1f3d 40%, #162032 100%)',
        flexShrink: 0,
      }}
    >
      {/* Simulated satellite map grid texture */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#4a9eff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Fake building blocks */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.22 }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 260"
      >
        <rect x="60" y="60" width="80" height="55" rx="4" fill="#3b82f6" />
        <rect x="160" y="50" width="60" height="40" rx="4" fill="#3b82f6" />
        <rect x="80" y="130" width="50" height="35" rx="4" fill="#3b82f6" />
        <rect x="180" y="120" width="70" height="50" rx="4" fill="#3b82f6" />
        <rect x="30" y="150" width="40" height="30" rx="4" fill="#3b82f6" />
        <rect x="240" y="80" width="50" height="60" rx="4" fill="#3b82f6" />
      </svg>

      {/* Glowing center campus marker */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,158,255,0.35) 0%, transparent 70%)',
          boxShadow: '0 0 0 8px rgba(74,158,255,0.08)',
        }}
      />

      {/* Map pin dots */}
      {[
        { top: '38%', left: '35%', color: '#ef4444' },
        { top: '28%', left: '62%', color: '#22c55e' },
        { top: '55%', left: '72%', color: '#22c55e' },
        { top: '65%', left: '28%', color: '#22c55e' },
        { top: '45%', left: '50%', color: '#a855f7' },
      ].map((pin, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: pin.top,
            left: pin.left,
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: pin.color + '22',
            border: `2px solid ${pin.color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: pin.color,
            }}
          />
        </div>
      ))}

      {/* SearchbarSection pinned to top of map */}
      <div style={{ position: 'absolute', top: '12px', left: 0, right: 0, zIndex: 10 }}>
        <SearchbarSection />
      </div>
    </div>
  );
}

/* ─── Quick Action Card ─── */
function QuickCard({ icon, iconBg, iconColor, title, subtitle, delay = 0 }) {
  return (
    <div
      style={{
        flex: 1,
        background: '#ffffff',
        borderRadius: '16px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        minWidth: 0,
        opacity: 0,
        transform: 'translateY(20px)',
        animation: `fadeInUp 0.5s ease-out ${delay}s forwards`,
      }}
    >
      {/* Icon container */}
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          backgroundColor: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {React.cloneElement(icon, { size: 22, color: iconColor, strokeWidth: 2 })}
      </div>

      <div>
        <p
          style={{
            margin: 0,
            fontWeight: '700',
            fontSize: '14px',
            color: '#0f172a',
            fontFamily: 'sans-serif',
            lineHeight: 1.3,
          }}
        >
          {title}
        </p>
        <p
          style={{
            margin: '3px 0 0',
            fontSize: '12px',
            color: '#64748b',
            fontFamily: 'sans-serif',
          }}
        >
          {subtitle}
        </p>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/* ─── Emergency Hold Button ─── */
function EmergencyButton() {
  const [holding, setHolding] = useState(false);
  const timerRef = useRef(null);

  const startHold = useCallback(() => {
    setHolding(true);
    timerRef.current = setTimeout(() => {
      // Could trigger emergency action here
      setHolding(false);
    }, 3000);
  }, []);

  const endHold = useCallback(() => {
    setHolding(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Pulse rings — only when holding */}
        {holding && (
          <>
            <span
              style={{
                position: 'absolute',
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                backgroundColor: 'rgba(239,68,68,0.25)',
                animation: 'pulse-ring 1.2s ease-out infinite',
              }}
            />
            <span
              style={{
                position: 'absolute',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                backgroundColor: 'rgba(239,68,68,0.12)',
                animation: 'pulse-ring 1.2s ease-out 0.3s infinite',
              }}
            />
            <span
              style={{
                position: 'absolute',
                width: '170px',
                height: '170px',
                borderRadius: '50%',
                backgroundColor: 'rgba(239,68,68,0.06)',
                animation: 'pulse-ring 1.2s ease-out 0.6s infinite',
              }}
            />
          </>
        )}

        {/* Button */}
        <button
          onMouseDown={startHold}
          onMouseUp={endHold}
          onMouseLeave={endHold}
          onTouchStart={startHold}
          onTouchEnd={endHold}
          style={{
            position: 'relative',
            zIndex: 1,
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            border: 'pink 1px solid',
            background: 'linear-gradient(180deg, #ef4444 0%, #b91c1c 100%)',
            boxShadow: holding
              ? '0 0 0 12px rgba(239,68,68,0.25), 0 0 0 24px rgba(239,68,68,0.1), 0 16px 40px rgba(185,28,28,0.5)'
              : '0 0 0 6px rgba(239,68,68,0.15), 0 8px 30px rgba(185,28,28,0.4)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            transform: holding ? 'scale(0.96)' : 'scale(1)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        >
          <TriangleAlert size={28} color="#ffffff" strokeWidth={2.5} />
          <span
            style={{
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '13px',
              textAlign: 'center',
              letterSpacing: '0.05em',
              lineHeight: 1.3,
              fontFamily: 'sans-serif',
              textTransform: 'uppercase',
            }}
          >
            HOLD FOR
            <br />
            EMERGENCY
          </span>
        </button>
      </div>

      {/* Keyframes injected inline */}
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.85); opacity: 1; }
          100% { transform: scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ─── HomePage ─── */
function HomePage() {
  return (
    <main>
      {/* Map Overlay with SearchbarSection inside */}
      <MapOverlay />

      {/* Content below map */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '35px',
          padding: '20px 16px 32px',
        }}
      >
        
      {/* Quick Action Cards */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <QuickCard
          icon={<ShieldUser />}
          iconBg="#dbeafe"
          iconColor="#2563eb"
          title="Campus Escort"
          subtitle="Request escort"
          delay={0}        // Left card: no delay
        />
        <QuickCard
          icon={<PhoneCall />}
          iconBg="#fee2e2"
          iconColor="#dc2626"
          title="Emergency Desk"
          subtitle="Direct line"
          delay={0.15}     // Right card: 150ms delay
        />
      </div>

        {/* Emergency Hold Button */}
        <EmergencyButton />
      </div>
    </main>
  );
}

export default HomePage;