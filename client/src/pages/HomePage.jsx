import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldUser, PhoneCall, TriangleAlert, X } from 'lucide-react';
import SearchbarSection from '../components/shared/SearchbarSection';

const HOLD_DURATION = 3000; // ms

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
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: pin.color }} />
        </div>
      ))}

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
        <p style={{ margin: 0, fontWeight: '700', fontSize: '14px', color: '#0f172a', fontFamily: 'sans-serif', lineHeight: 1.3 }}>
          {title}
        </p>
        <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#64748b', fontFamily: 'sans-serif' }}>
          {subtitle}
        </p>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ─── Confirming Overlay ─── */
function ConfirmingOverlay({ progress, onCancel }) {
  // progress: 0 → 1
  const pct = Math.min(progress, 1);
  const seconds = Math.ceil((1 - pct) * (HOLD_DURATION / 1000));

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(6, 10, 22, 0.97)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: 'overlayIn 0.25s ease-out forwards',
      }}
    >
      {/* NOTIFYING header */}
      <div style={{ paddingTop: '90px', width: '100%', paddingLeft: '20px', paddingRight: '20px' }}>
        <p
          style={{
            textAlign: 'center',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: '700',
            fontSize: '12px',
            letterSpacing: '0.14em',
            color: '#64748b',
            marginBottom: '12px',
            textTransform: 'uppercase',
          }}
        >
          Notifying
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {['Campus Security', 'Emergency Contacts'].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '10px 16px',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: '700',
                fontSize: '13px',
                color: '#e2e8f0',
                lineHeight: 1.3,
                textAlign: 'center',
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Big button area */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {/* Outer glow rings */}
        <div style={{
          position: 'absolute',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(185,28,28,0.22) 0%, transparent 70%)',
          animation: 'ringPulse 1.4s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          width: '240px', height: '240px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(185,28,28,0.32) 0%, transparent 70%)',
          animation: 'ringPulse 1.4s ease-in-out 0.3s infinite',
        }} />
        <div style={{
          position: 'absolute',
          width: '185px', height: '185px', borderRadius: '50%',
          background: 'rgba(120, 20, 20, 0.45)',
          borderRadius: '50%',
        }} />

        {/* Main red circle */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: '155px',
            height: '155px',
            borderRadius: '50%',
            background: 'linear-gradient(180deg, #ef4444 0%, #b91c1c 100%)',
            border: '3px solid rgba(255,255,255,0.25)',
            boxShadow: '0 0 0 10px rgba(185,28,28,0.25), 0 16px 48px rgba(185,28,28,0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <TriangleAlert size={30} color="#ffffff" strokeWidth={2.5} />
          <span
            style={{
              color: '#ffffff',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: '800',
              fontSize: '14px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            CONFIRMING
          </span>
        </div>
      </div>

      {/* Bottom section */}
      <div
        style={{
          width: '100%',
          padding: '0 28px 100px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
        }}
      >
        {/* Label */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: '700',
            fontSize: '11px',
            letterSpacing: '0.12em',
            color: '#64748b',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Hold 3 seconds to trigger
        </p>

        {/* Progress bar */}
        <div
          style={{
            width: '100%',
            height: '5px',
            borderRadius: '99px',
            background: 'rgba(255,255,255,0.1)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${pct * 100}%`,
              borderRadius: '99px',
              background: 'linear-gradient(90deg, #ef4444, #fca5a5)',
              transition: 'width 0.05s linear',
            }}
          />
        </div>

        {/* Confirm pill */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '99px',
            padding: '12px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <span style={{ fontSize: '16px' }}>👆</span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: '700',
              fontSize: '15px',
              color: '#0f172a',
            }}
          >
            {seconds}s Confirm
          </span>
        </div>

        {/* Cancel */}
        <button
          onClick={onCancel}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: '700',
            fontSize: '13px',
            letterSpacing: '0.1em',
            color: '#64748b',
            textTransform: 'uppercase',
            padding: '8px 24px',
          }}
        >
          Cancel
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap');
        @keyframes overlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ringPulse {
          0%, 100% { transform: scale(0.93); opacity: 0.7; }
          50%       { transform: scale(1.07); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ─── Emergency Hold Button ─── */
function EmergencyButton({ onHoldStart, onHoldEnd }) {
  const [holding, setHolding] = useState(false);
  const holdingRef = useRef(false);
  const btnRef = useRef(null);

  // Stable callbacks — never recreated, so refs are always current
  const startHoldRef = useRef(null);
  const endHoldRef   = useRef(null);

  startHoldRef.current = () => {
    if (holdingRef.current) return;
    holdingRef.current = true;
    setHolding(true);
    onHoldStart?.();
  };

  endHoldRef.current = () => {
    if (!holdingRef.current) return;
    holdingRef.current = false;
    setHolding(false);
    onHoldEnd?.();
  };

  // Attach touchstart as non-passive so preventDefault works on mobile
  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    const onTouchStart = (e) => { e.preventDefault(); startHoldRef.current(); };
    const onTouchEnd   = ()  => endHoldRef.current();
    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchend',   onTouchEnd,   { passive: true  });
    el.addEventListener('touchcancel',onTouchEnd,   { passive: true  });
    return () => {
      el.removeEventListener('touchstart',  onTouchStart);
      el.removeEventListener('touchend',    onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []); // mount/unmount only — refs keep callbacks fresh

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        {holding && (
          <>
            {[130, 150, 170].map((size, i) => (
              <span
                key={size}
                style={{
                  position: 'absolute',
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: '50%',
                  backgroundColor: `rgba(239,68,68,${0.25 - i * 0.06})`,
                  animation: `pulse-ring 1.2s ease-out ${i * 0.3}s infinite`,
                }}
              />
            ))}
          </>
        )}
        <button
          ref={btnRef}
          onMouseDown={() => startHoldRef.current()}
          onMouseUp={() => endHoldRef.current()}
          onMouseLeave={() => endHoldRef.current()}
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
            HOLD FOR<br />EMERGENCY
          </span>
        </button>
      </div>
      <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(0.85); opacity: 1; }
          100% { transform: scale(1.2);  opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ─── HomePage ─── */
function HomePage() {
  const navigate = useNavigate();
  const [confirming, setConfirming]   = useState(false);
  const [progress,   setProgress]     = useState(0);

  // All timer/raf state lives in refs — no stale closure issues
  const rafRef         = useRef(null);
  const triggerRef     = useRef(null);
  const startTimeRef   = useRef(null);
  const activeRef      = useRef(false); // prevents double-start

  const startConfirming = useCallback(() => {
    if (activeRef.current) return;
    activeRef.current = true;
    setProgress(0);
    setConfirming(true);

    // rAF progress ticker
    startTimeRef.current = performance.now();
    const tick = (now) => {
      const elapsed = now - startTimeRef.current;
      const p = Math.min(elapsed / HOLD_DURATION, 1);
      setProgress(p);
      if (p < 1 && activeRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    // Single authoritative timer
    triggerRef.current = setTimeout(() => {
      stopConfirming();
      navigate('/success');
    }, HOLD_DURATION);
  }, [navigate]);

  const stopConfirming = useCallback(() => {
    activeRef.current = false;
    if (rafRef.current)     { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    if (triggerRef.current) { clearTimeout(triggerRef.current);     triggerRef.current = null; }
    setConfirming(false);
    setProgress(0);
  }, []);

  // Clean up on unmount
  useEffect(() => () => stopConfirming(), []);

  return (
    <>
      <main>
        <MapOverlay />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '35px', padding: '20px 16px 32px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <QuickCard
              icon={<ShieldUser />}
              iconBg="#dbeafe"
              iconColor="#2563eb"
              title="Campus Escort"
              subtitle="Request escort"
              delay={0}
            />
            <QuickCard
              icon={<PhoneCall />}
              iconBg="#fee2e2"
              iconColor="#dc2626"
              title="Emergency Desk"
              subtitle="Direct line"
              delay={0.15}
            />
          </div>
          <EmergencyButton
            onHoldStart={startConfirming}
            onHoldEnd={stopConfirming}
          />
        </div>
      </main>

      {/* Confirming overlay — mounts on top, no page change */}
      {confirming && (
        <ConfirmingOverlay progress={progress} onCancel={stopConfirming} />
      )}
    </>
  );
}

export default HomePage;