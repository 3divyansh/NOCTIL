import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/utils/gsap';

export interface RevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  scale?: number;
}

/**
 * Fade-up reveal on scroll using GSAP ScrollTrigger.
 * Attach the returned ref to the container; children with [data-reveal] animate in sequence.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(opts: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>('[data-reveal]');
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { y: opts.y ?? 40, opacity: 0, scale: opts.scale ?? 1 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: opts.duration ?? 1.1,
          ease: 'power3.out',
          stagger: opts.stagger ?? 0.12,
          delay: opts.delay ?? 0,
          scrollTrigger: {
            trigger: el,
            start: opts.start ?? 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [opts.y, opts.duration, opts.delay, opts.stagger, opts.scale, opts.start]);

  return ref;
}

/**
 * Parallax: moves the element on the Y axis as it scrolls through viewport.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.2) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}
