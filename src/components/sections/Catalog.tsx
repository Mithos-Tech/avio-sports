import { Vehicle } from '../../types';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { VEHICLES } from '../../constants';
import { ArrowUpRight, Zap, Gauge, Wind, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

interface CatalogCardProps {
  vehicle: Vehicle;
  index: number;
  key?: string | number;
}

function CatalogCard({ vehicle, index }: CatalogCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex-shrink-0 w-[85vw] md:w-[450px] h-[500px] md:h-[650px] rounded-[2.5rem] overflow-hidden group cursor-pointer snap-center"
    >
      {/* Background Image */}
      <motion.div 
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
      >
        <img 
          src={vehicle.image.includes('cloudinary') ? vehicle.image.replace('/upload/', '/upload/f_auto,q_auto/') : vehicle.image} 
          alt={vehicle.model}
          className="w-full h-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {/* Dynamic Gradient Overlay - Clearer at top, darker at bottom */}
        <div className={`absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-avio-secondary-2/90 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-80'}`} />
      </motion.div>

      {/* Content Overlay */}
      <div className="absolute inset-0 p-10 flex flex-col justify-end z-10">
        <div className="relative">
          {/* Category & Series */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-avio-primary text-avio-secondary-2 text-[9px] font-bold rounded-full tracking-widest uppercase">
              {vehicle.category}
            </span>
          </div>

          {/* Model & Price */}
          <div className="mb-6">
            <h4 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tighter leading-none">
              {vehicle.model}
            </h4>
            <p className="text-avio-primary text-xl font-space font-bold">
              {vehicle.price}
            </p>
          </div>

          {/* Specs Grid - Progressive Disclosure (Reveals on Hover) */}
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: isHovered ? 'auto' : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 mb-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/40">
                  <Zap size={12} />
                  <span className="text-[8px] uppercase tracking-widest font-bold">Rango</span>
                </div>
                <p className="text-white text-lg font-bold">{vehicle.range}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/40">
                  <Zap size={12} />
                  <span className="text-[8px] uppercase tracking-widest font-bold">0-100</span>
                </div>
                <p className="text-white text-lg font-bold">{vehicle.acceleration}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/40">
                  <Zap size={12} />
                  <span className="text-[8px] uppercase tracking-widest font-bold">Máx</span>
                </div>
                <p className="text-white text-lg font-bold">{vehicle.topSpeed}</p>
              </div>
            </div>
          </motion.div>

          {/* CTA - Always visible but animates on hover */}
          <motion.a 
            href="#cta"
            className="group/btn flex items-center gap-4 text-white"
          >
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase group-hover/btn:text-avio-primary transition-colors duration-300">
              CONFIGURAR
            </span>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-avio-secondary-2 group-hover/btn:border-white transition-all duration-500">
              <ArrowUpRight size={18} />
            </div>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Catalog() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.scrollWidth);
        setWindowWidth(window.innerWidth);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const isMobile = windowWidth < 768;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { clientX } = e;
    const moveRange = containerWidth - windowWidth + 200; // Extra padding for comfort
    if (moveRange <= 0) return;

    // Map mouse X (0 to windowWidth) to scroll position (0 to -moveRange)
    const percentage = clientX / windowWidth;
    const targetX = -(percentage * moveRange);
    x.set(targetX);
  };

  return (
    <section 
      id="catalog" 
      className="bg-white relative overflow-hidden pt-32 md:pt-40 pb-20"
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-6 mb-12 pointer-events-none">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-8 h-[1px] bg-avio-primary" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-avio-primary uppercase">AVIO MODELS</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-bold leading-[0.95] text-avio-secondary-2 tracking-tighter">
              NUESTRO <br />
              <span className="text-outline-dark uppercase">CATÁLOGO</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-left md:text-right"
          >
            <p className="text-[10px] font-bold tracking-[0.3em] text-avio-primary uppercase">
              INGENIERÍA DE PRECISIÓN
            </p>
          </motion.div>
        </div>
      </div>

      {/* Interactive Cards Container */}
      <div className="relative w-full h-[520px] md:h-[680px] overflow-x-auto md:overflow-hidden snap-x snap-mandatory scrollbar-hide">
        <motion.div 
          ref={containerRef}
          style={{ x: isMobile ? 0 : springX }}
          className="flex gap-6 md:gap-8 px-[7.5vw] md:px-[10vw] relative md:absolute top-0 left-0 h-full"
        >
          {VEHICLES.map((vehicle, index) => (
            <CatalogCard key={vehicle.id} vehicle={vehicle} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
