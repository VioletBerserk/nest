import { useEffect, useRef } from 'react';

export function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('is-revealed');
            obs.disconnect();
          }
        },
        { threshold: 0.08 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return ref;
}
