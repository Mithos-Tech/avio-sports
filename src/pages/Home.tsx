import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import Catalog from '../components/sections/Catalog';
import Experience from '../components/sections/Experience';
import Trends from '../components/sections/Trends';
import Blog from '../components/sections/Blog';
import Reservation from '../components/sections/Reservation';
import Footer from '../components/layout/Footer';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const handleScrollToHash = () => {
      const hash = window.location.hash;
      if (hash && hash !== '#home' && hash.length > 1) {
        try {
          const tryScroll = () => {
            const element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
              return true;
            }
            return false;
          };

          if (!tryScroll()) {
            setTimeout(tryScroll, 120);
            setTimeout(tryScroll, 320);
          }
        } catch {
          // Ignore invalid selector
        }
      } else if (hash === '#home' || hash === '') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    };

    handleScrollToHash();
    window.addEventListener('hashchange', handleScrollToHash);
    return () => window.removeEventListener('hashchange', handleScrollToHash);
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <Catalog />
        <Trends />
        <Experience />
        <Reservation />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
