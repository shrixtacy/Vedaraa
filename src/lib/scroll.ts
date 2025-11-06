/**
 * Utility functions for smooth scrolling with Lenis
 */

export const scrollTo = (target: string | number | HTMLElement, options?: { 
  offset?: number; 
  duration?: number; 
  easing?: (t: number) => number;
}) => {
  if (typeof window !== 'undefined' && (window as any).lenis) {
    (window as any).lenis.scrollTo(target, {
      duration: 1.5,
      ...options,
    });
  } else {
    // Fallback for native scrolling
    if (typeof target === 'string') {
      const element = document.querySelector(target);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  }
};

export const scrollToTop = (duration = 1.5) => {
  scrollTo(0, { duration });
};

export const scrollToSection = (sectionId: string, duration = 1.5) => {
  scrollTo(`#${sectionId}`, { duration });
};

export const stopScroll = () => {
  if (typeof window !== 'undefined' && (window as any).lenis) {
    (window as any).lenis.stop();
  }
};

export const startScroll = () => {
  if (typeof window !== 'undefined' && (window as any).lenis) {
    (window as any).lenis.start();
  }
};