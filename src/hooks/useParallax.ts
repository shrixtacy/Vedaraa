import { useEffect, useState, useRef, useCallback } from 'react';

interface UseParallaxOptions {
  speed?: number;
  offset?: number;
}

export const useParallax = (options: UseParallaxOptions = {}) => {
  const { speed = 0.5, offset = 0 } = options;
  const [scrollY, setScrollY] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);

  const updateElementPosition = useCallback(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setElementTop(rect.top + window.scrollY);
    }
  }, []);

  useEffect(() => {
    // Update position on mount and resize
    updateElementPosition();
    window.addEventListener('resize', updateElementPosition);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Listen to both regular scroll and Lenis scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also listen for Lenis scroll events if available
    const handleLenisScroll = (e: any) => {
      setScrollY(e.scroll);
    };

    // Check if Lenis is available and add listener
    if (typeof window !== 'undefined' && (window as any).lenis) {
      (window as any).lenis.on('scroll', handleLenisScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateElementPosition);
      
      // Remove Lenis listener if it exists
      if (typeof window !== 'undefined' && (window as any).lenis) {
        (window as any).lenis.off('scroll', handleLenisScroll);
      }
    };
  }, [updateElementPosition]);

  // Calculate parallax transform based on element's position
  const getParallaxTransform = () => {
    const relativeScrollY = scrollY - elementTop + offset;
    return `translateY(${relativeScrollY * speed}px)`;
  };

  return {
    elementRef,
    transform: getParallaxTransform(),
    scrollY
  };
};