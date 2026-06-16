import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const trailPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    const move = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      cursor.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
    };

    const animate = () => {
      trailPosRef.current.x += (posRef.current.x - trailPosRef.current.x) * 0.12;
      trailPosRef.current.y += (posRef.current.y - trailPosRef.current.y) * 0.12;
      trail.style.transform = `translate(${trailPosRef.current.x - 20}px, ${trailPosRef.current.y - 20}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.background = 'rgba(255,31,110,0.9)';
    };

    const onLeaveLink = () => {
      cursor.style.width = '16px';
      cursor.style.height = '16px';
      cursor.style.background = '#FF1F6E';
    };

    document.addEventListener('mousemove', move);
    rafRef.current = requestAnimationFrame(animate);

    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Main dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-9999 pointer-events-none rounded-full transition-all duration-75"
        style={{
          width: '16px',
          height: '16px',
          background: '#FF1F6E',
          boxShadow: '0 0 12px rgba(255,31,110,0.8)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
      {/* Trail ring */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 z-9998 pointer-events-none rounded-full border-2"
        style={{
          width: '40px',
          height: '40px',
          borderColor: 'rgba(255,31,110,0.35)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
    </>
  );
}
