import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/utils/gsap';

/**
 * Magnetic button effect — the element drifts toward the cursor while hovered.
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(strength = 0.35) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(max-width: 1024px)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      xTo(x * strength);
      yTo(y * strength);
    }
    function onLeave() {
      xTo(0);
      yTo(0);
    }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return ref;
}
