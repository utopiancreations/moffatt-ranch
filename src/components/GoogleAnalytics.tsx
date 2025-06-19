import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Type declaration for Google Analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// This component tracks page views in Google Analytics
const GoogleAnalytics = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Send pageview with updated location
    if (window.gtag) {
      window.gtag('config', 'G-NSLDK2GLQR', {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics;
