import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background text-foreground">
      <SEO title="404 - Page Not Found" description="The page you are looking for does not exist." />
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-heading font-bold text-primary">404</h1>
        <p className="mb-8 text-xl text-muted-foreground">Oops! Page not found</p>
        <Link to="/" className="text-primary hover:text-primary/80 underline font-medium transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
