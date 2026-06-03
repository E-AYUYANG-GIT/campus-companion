import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Users, X } from 'lucide-react';

/* ─── Animated Check Circle ─── */
function CheckCircle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '130px',
        height: '130px',
      }}
    >
      {/* Outer glow ring */}
      <div
        style={{
          position: 'absolute',
          width: '130px',
          height: '130px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)',
          animation: 'glow-pulse 2.4s ease-in-out infinite',
        }}
      />

      {/* Ring border */}
      <div
        style={{
          position: 'absolute',
          width: '110px',
          height: '110px',
          borderRadius: '50%',
          border: '2.5px solid rgba(16,185,129,0.25)',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'scale(1)' : 'scale(0.6)',
          transition: 'opacity 0.5s ease 0.1s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s',
        }}
      />

      {/* Main circle */}
      <div
        style={{
          width: '84px',
          height: '84px',
          borderRadius: '50%',
          background: 'linear-gradient(145deg, #10b981 0%, #059669 100%)',
          boxShadow: '0 0 0 8px rgba(16,185,129,0.15), 0 12px 32px rgba(5,150,105,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'scale(1)' : 'scale(0.5)',
          transition: 'opacity 0.4s ease 0.2s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s',
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.3s ease 0.55s',
          }}
        >
          <path
            d="M8 18.5L15 25.5L28 11"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="32"
            strokeDashoffset={mounted ? '0' : '32'}
            style={{
              transition: 'stroke-dashoffset 0.45s ease 0.6s',
            }}
          />
        </svg>
      </div>

      <style>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.6; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}

/* ─── Status Row Card ─── */
function StatusRow({ icon, title, subtitle, delay }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        background: 'rgba(255,255,255,0.04)',
        borderRadius: '14px',
        padding: '16px',
        border: '1px solid rgba(255,255,255,0.07)',
        borderLeft: '3px solid #10b981',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-16px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'rgba(16,185,129,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {React.cloneElement(icon, { size: 18, color: '#10b981', strokeWidth: 2 })}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: '700',
            fontSize: '14px',
            color: '#f1f5f9',
            lineHeight: 1.3,
          }}
        >
          {title}
        </p>
        <p
          style={{
            margin: '3px 0 0',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '12px',
            color: '#64748b',
            lineHeight: 1.3,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Check badge */}
      <div
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: 'rgba(16,185,129,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.5 6L5 8.5L9.5 3.5"
            stroke="#10b981"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* ─── Cancel Button with countdown ─── */
function CancelButton({ onCancel, seconds = 8 }) {
  const [remaining, setRemaining] = useState(seconds);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(show);
  }, []);

  useEffect(() => {
    if (!visible) return;
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [visible]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      <button
        onClick={onCancel}
        style={{
          width: '100%',
          height: '54px',
          borderRadius: '27px',
          border: '2px solid #d97706',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          cursor: 'pointer',
          transition: 'background 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(217,119,6,0.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: '800',
            fontSize: '14px',
            color: '#f59e0b',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Cancel Alert
        </span>

        {remaining > 0 && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '22px',
              borderRadius: '6px',
              background: '#d97706',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: '800',
              fontSize: '12px',
              color: '#fff',
            }}
          >
            {remaining}s
          </span>
        )}
      </button>
    </div>
  );
}

/* ─── SuccessPage ─── */
function SuccessPage({ onCancel }) {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [subVisible, setSubVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHeaderVisible(true), 450);
    const t2 = setTimeout(() => setSubVisible(true), 620);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const timestamp = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#080f1e',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '90px', // space for ActionBar
      }}
    >
      {/* Top section — check + headline */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '64px',
          paddingBottom: '32px',
          gap: '20px',
        }}
      >
        <CheckCircle />

        <div style={{ textAlign: 'center', padding: '0 24px' }}>
          <h1
            style={{
              margin: 0,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: '800',
              fontSize: '26px',
              color: '#f1f5f9',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            Help is on the way
          </h1>
          <p
            style={{
              margin: '8px 0 0',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              color: '#64748b',
              opacity: subVisible ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          >
            Alert sent at {timestamp}
          </p>
        </div>
      </div>

      {/* Status rows + cancel */}
      <div
        style={{
          flex: 1,
          padding: '0 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <StatusRow
          icon={<ShieldCheck />}
          title="Campus Security notified"
          subtitle="Live dispatch tracking active"
          delay={500}
        />
        <StatusRow
          icon={<Users />}
          title="Emergency Contact notified"
          subtitle="SMS & Voice call sent"
          delay={700}
        />

        {/* Spacer */}
        <div style={{ flex: 1, minHeight: '24px' }} />

        {/* Cancel button */}
        <CancelButton onCancel={onCancel} seconds={8} />

        {/* Reassurance text */}
        <p
          style={{
            textAlign: 'center',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            color: '#475569',
            margin: '4px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#10b981',
              display: 'inline-block',
              animation: 'dot-pulse 1.8s ease-in-out infinite',
            }}
          />
          Stay calm. Help is coming.
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#10b981',
              display: 'inline-block',
              animation: 'dot-pulse 1.8s ease-in-out 0.6s infinite',
            }}
          />
        </p>
      </div>

      {/* Google Fonts + keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap');
        @keyframes dot-pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </main>
  );
}

export default SuccessPage;