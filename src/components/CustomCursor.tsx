import React, { useEffect, useRef, useState } from 'react';

const WATCH_SIZE = 32;

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(new Date());

  // Move cursor with mouse
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Animate watch hands
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Hide default cursor
  useEffect(() => {
    const prevCursor = document.body.style.cursor;
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = prevCursor;
    };
  }, []);

  // Calculate hand angles
  const sec = time.getSeconds();
  const min = time.getMinutes();
  const hour = time.getHours() % 12;
  const secAngle = sec * 6;
  const minAngle = min * 6 + sec * 0.1;
  const hourAngle = hour * 30 + min * 0.5;

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: WATCH_SIZE,
        height: WATCH_SIZE,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        mixBlendMode: 'normal',
      }}
    >
      <svg width={WATCH_SIZE} height={WATCH_SIZE} viewBox={`0 0 32 32`}>
        <circle cx="16" cy="16" r="15" fill="#0a174e" stroke="#23395d" strokeWidth="2" />
        {/* Hour marks */}
        <line x1="16" y1="3" x2="16" y2="7" stroke="#3a5ba0" strokeWidth="1" />
        <line x1="16" y1="25" x2="16" y2="29" stroke="#3a5ba0" strokeWidth="1" />
        <line x1="3" y1="16" x2="7" y2="16" stroke="#3a5ba0" strokeWidth="1" />
        <line x1="25" y1="16" x2="29" y2="16" stroke="#3a5ba0" strokeWidth="1" />
        <line x1="7.5" y1="7.5" x2="10.5" y2="10.5" stroke="#3a5ba0" strokeWidth="1" />
        <line x1="21.5" y1="21.5" x2="24.5" y2="24.5" stroke="#3a5ba0" strokeWidth="1" />
        <line x1="7.5" y1="24.5" x2="10.5" y2="21.5" stroke="#3a5ba0" strokeWidth="1" />
        <line x1="21.5" y1="10.5" x2="24.5" y2="7.5" stroke="#3a5ba0" strokeWidth="1" />
        {/* Hour hand */}
        <line x1="16" y1="16" x2="16" y2="8.5" stroke="#b0c4de" strokeWidth="2" strokeLinecap="round" transform={`rotate(${hourAngle} 16 16)`} />
        {/* Minute hand */}
        <line x1="16" y1="16" x2="16" y2="5.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" transform={`rotate(${minAngle} 16 16)`} />
        {/* Second hand */}
        <line x1="16" y1="16" x2="16" y2="3.5" stroke="#4fc3f7" strokeWidth="1" strokeLinecap="round" transform={`rotate(${secAngle} 16 16)`} />
        {/* Center dot */}
        <circle cx="16" cy="16" r="2" fill="#fff" stroke="#0a174e" strokeWidth="0.7" />
      </svg>
    </div>
  );
};

export default CustomCursor; 