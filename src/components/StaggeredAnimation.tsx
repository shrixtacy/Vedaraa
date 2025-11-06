import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface StaggeredAnimationProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  animationType?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleUp';
}

const StaggeredAnimation: React.FC<StaggeredAnimationProps> = ({
  children,
  className,
  staggerDelay = 0.1,
  animationType = 'fadeUp',
}) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const childrenArray = React.Children.toArray(children);

  const getAnimationClasses = (index: number) => {
    const delay = index * staggerDelay;
    const baseClasses = 'transition-all duration-700 ease-out';
    const delayClass = `delay-[${Math.round(delay * 1000)}ms]`;

    switch (animationType) {
      case 'fadeUp':
        return cn(
          baseClasses,
          delayClass,
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-6'
        );
      case 'fadeIn':
        return cn(
          baseClasses,
          delayClass,
          isVisible ? 'opacity-100' : 'opacity-0'
        );
      case 'slideLeft':
        return cn(
          baseClasses,
          delayClass,
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-6'
        );
      case 'slideRight':
        return cn(
          baseClasses,
          delayClass,
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-6'
        );
      case 'scaleUp':
        return cn(
          baseClasses,
          delayClass,
          isVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95'
        );
      default:
        return cn(
          baseClasses,
          delayClass,
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-6'
        );
    }
  };

  return (
    <div ref={elementRef} className={className}>
      {childrenArray.map((child, index) => (
        <div key={index} className={getAnimationClasses(index)}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default StaggeredAnimation;