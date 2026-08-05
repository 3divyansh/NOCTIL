import { useEffect, useState } from 'react';

/**
 * Tracks scroll progress 0→1 for the whole page, throttled via rAF.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      frame = 0;
    }
    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(update);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return progress;
}
