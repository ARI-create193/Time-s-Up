import React, { useState, useEffect } from 'react';

const defaultDial = '#e5e7eb';
const defaultStrap = '#222';

const WatchFace: React.FC<{ dial: string }> = ({ dial }) => (
  <g>
    {/* Metallic rim */}
    <circle cx="100" cy="100" r="76" fill="url(#rimGradient)" />
    {/* Dial with radial gradient */}
    <circle cx="100" cy="100" r="70" fill={`url(#dialGradient)`} />
    {/* Dial color overlay */}
    <circle cx="100" cy="100" r="68" fill={dial} opacity="0.85" />
    {/* Markers */}
    {[...Array(12)].map((_, i) => {
      const angle = (i * 30) * (Math.PI / 180);
      const x1 = 100 + Math.sin(angle) * 60;
      const y1 = 100 - Math.cos(angle) * 60;
      const x2 = 100 + Math.sin(angle) * 66;
      const y2 = 100 - Math.cos(angle) * 66;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#222" strokeWidth={i % 3 === 0 ? 4 : 2} />;
    })}
  </g>
);

const WatchStrap: React.FC<{ strap: string }> = ({ strap }) => (
  <g>
    {/* Strap shadow */}
    <rect x="82" y="-30" width="36" height="260" rx="18" fill="#000" opacity="0.12" />
    {/* Main strap with gradient */}
    <rect x="85" y="10" width="30" height="180" rx="15" fill={`url(#strapGradient)`} />
    {/* Strap color overlay */}
    <rect x="85" y="10" width="30" height="180" rx="15" fill={strap} opacity="0.7" />
    {/* Stitches */}
    <rect x="98" y="20" width="4" height="160" rx="2" fill="#fff" opacity="0.3" />
    {[...Array(8)].map((_, i) => (
      <circle key={i} cx="100" cy={30 + i * 20} r="1.5" fill="#fff" opacity="0.7" />
    ))}
  </g>
);

const WatchHands: React.FC<{ date: Date }> = ({ date }) => {
  const sec = date.getSeconds();
  const min = date.getMinutes();
  const hour = date.getHours() % 12;
  // Angles
  const secAngle = (sec / 60) * 360;
  const minAngle = ((min + sec / 60) / 60) * 360;
  const hourAngle = ((hour + min / 60) / 12) * 360;
  return (
    <g>
      {/* Hour hand */}
      <rect
        x="98.5"
        y="100"
        width="3"
        height="32"
        rx="2"
        fill="#222"
        filter="url(#handShadow)"
        transform={`rotate(${hourAngle} 100 100)`}
      />
      {/* Minute hand */}
      <rect
        x="99"
        y="75"
        width="2"
        height="50"
        rx="1.5"
        fill="#444"
        filter="url(#handShadow)"
        transform={`rotate(${minAngle} 100 100)`}
      />
      {/* Second hand */}
      <rect
        x="99.5"
        y="60"
        width="1"
        height="60"
        rx="1"
        fill="#e53e3e"
        filter="url(#handShadow)"
        transform={`rotate(${secAngle} 100 100)`}
      />
      {/* Center dot with highlight */}
      <circle cx="100" cy="100" r="6" fill="#fff" stroke="#0a33ad" strokeWidth="2" />
      <circle cx="100" cy="100" r="3" fill="#0a33ad" />
    </g>
  );
};

const InteractiveWatchSVG: React.FC = () => {
  const [dial, setDial] = useState(defaultDial);
  const [strap, setStrap] = useState(defaultStrap);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-row items-center justify-center w-full bg-transparent">
      {/* Watch on the left */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <svg width={260} height={260} viewBox="0 0 200 200">
          <defs>
            {/* Rim gradient */}
            <radialGradient id="rimGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#eee" />
              <stop offset="60%" stopColor="#bbb" />
              <stop offset="100%" stopColor="#888" />
            </radialGradient>
            {/* Dial gradient */}
            <radialGradient id="dialGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor="#bbb" />
            </radialGradient>
            {/* Strap gradient */}
            <linearGradient id="strapGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#444" />
              <stop offset="100%" stopColor="#111" />
            </linearGradient>
            {/* Hand shadow */}
            <filter id="handShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.25" />
            </filter>
          </defs>
          <WatchStrap strap={strap} />
          <WatchFace dial={dial} />
          <WatchHands date={date} />
        </svg>
      </div>
      {/* Controls on the right */}
      <div className="flex flex-col gap-6 ml-10">
        <div>
          <label className="block text-sm font-medium mb-1">Dial Color</label>
          <input type="color" value={dial} onChange={e => setDial(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Strap Color</label>
          <input type="color" value={strap} onChange={e => setStrap(e.target.value)} />
        </div>
      </div>
    </div>
  );
};

export default InteractiveWatchSVG; 