import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediate scroll to top on route change
    window.scrollTo(0, 0);
    
    // Also trigger Lenis if it's available globally
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
