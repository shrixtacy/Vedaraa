import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import Preloader from "./Preloader";
import ScrollToTop from "./ScrollToTop";
import SmoothScroll from "./SmoothScroll";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <ScrollToTop />
      <Preloader />
      <SmoothScroll>
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen bg-background">
          {children}
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
};

export default Layout;
