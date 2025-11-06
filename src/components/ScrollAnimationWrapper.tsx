import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleUp';
  delay?: number;
  duration?: number;
}

const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  className,
  animationType = 'fadeUp',
  delay = 0,
  duration = 0.8,
}) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all ease-out';
    const durationClass = `duration-[${Math.round(duration * 1000)}ms]`;
    const delayClass = delay > 0 ? `delay-[${Math.round(delay * 1000)}ms]` : '';

    switch (animationType) {
      case 'fadeUp':
        return cn(
          baseClasses,
          durationClass,
          delayClass,
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        );
      case 'fadeIn':
        return cn(
          baseClasses,
          durationClass,
          delayClass,
          isVisible ? 'opacity-100' : 'opacity-0'
        );
      case 'slideLeft':
        return cn(
          baseClasses,
          durationClass,
          delayClass,
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-8'
        );
      case 'slideRight':
        return cn(
          baseClasses,
          durationClass,
          delayClass,
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-8'
        );
      case 'scaleUp':
        return cn(
          baseClasses,
          durationClass,
          delayClass,
          isVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95'
        );
      default:
        return cn(
          baseClasses,
          durationClass,
          delayClass,
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        );
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn(getAnimationClasses(), className)}
    >
      {children}
    </div>
  );
};

export default ScrollAnimationWrapper;