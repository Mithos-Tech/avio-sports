import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Technology from './pages/Technology';
import About from './pages/About';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#home');
  
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      setCurrentPath(hash);
      
      // Only scroll to top if we're switching to a main page, 
      // not a sub-section of the home page
      const mainPages = ['#home', '#technology', '#about'];
      if (mainPages.includes(hash)) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Simple routing logic
  const renderPage = () => {
    if (currentPath.startsWith('#about')) return <About />;
    return <Home />;
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
    </div>
  );
}
