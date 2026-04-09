import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import Catalog from '../components/sections/Catalog';
import Experience from '../components/sections/Experience';
import Trends from '../components/sections/Trends';
import Blog from '../components/sections/Blog';
import CTA from '../components/sections/CTA';
import Footer from '../components/layout/Footer';
import { motion } from 'motion/react';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const handleScrollToHash = () => {
      const hash = window.location.hash;
      if (hash && hash !== '#home') {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    handleScrollToHash();
    window.addEventListener('hashchange', handleScrollToHash);
    return () => window.removeEventListener('hashchange', handleScrollToHash);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      <Navbar />
      <main>
        <Hero />
        <Catalog />
        <Trends />
        <Experience />
        <CTA />
        <Blog />
      </main>
      <Footer />
    </motion.div>
  );
}
