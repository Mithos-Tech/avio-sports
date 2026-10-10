import { Vehicle } from '../../types';
import { motion, useMotionValue, useAnimationFrame } from 'motion/react';
import { VEHICLES } from '../../constants';
import { ArrowUpRight, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReservationModal from '../ui/ReservationModal';

// Tripled set of vehicles to ensure an infinitely seamless wrap in desktop
const INFINITE_VEHICLES = [...VEHICLES, ...VEHICLES, ...VEHICLES];

interface CatalogCardProps {
  vehicle: Vehicle;
  displayIndex: number;
  isMobile: boolean;
  isActiveMobile?: boolean;
  onConfigure?: (vehicle: Vehicle) => void;
}

function CatalogCard({ vehicle, displayIndex, isMobile, isActiveMobile, onConfigure }: CatalogCardProps) {
  return (
    <div
      className={`relative flex-shrink-0 w-[84vw] sm:w-[380px] md:w-[420px] lg:w-[460px] h-[520px] md:h-[620px] rounded-[2rem] overflow-hidden group cursor-pointer border transition-all duration-300 bg-[#020659] select-none ${
        isMobile && isActiveMobile
          ? 'border-neutral-300/90 shadow-md shadow-black/[0.04]'
          : 'border-neutral-200/60 shadow-sm shadow-black/[0.02]'
      }`}
    >
      {/* Background Vehicle Image - Steady and crisp without zoom artifacts */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={vehicle.image} 
          alt={vehicle.model}
          className="w-full h-full object-cover"
          loading={displayIndex < 3 ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
        />
        
        {/* Vignette Gradient without colored shadows */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-[#020659]/95 pointer-events-none" />
      </div>

      {/* Content Overlay - Permanent rock-solid structure (no trembling) */}
      <div className="absolute inset-0 p-7 md:p-9 flex flex-col justify-between z-20 pointer-events-none">
        
        {/* Top: Category Pill Tag & Number Badge */}
        <div className="flex items-center justify-between gap-3">
          <span className="px-3.5 py-1 bg-avio-primary text-white text-[9px] font-bold rounded-full tracking-widest uppercase shadow-sm">
            {vehicle.category}
          </span>
          <span className="text-[10px] font-bold tracking-[0.25em] text-white/50 uppercase font-space">
            0{(displayIndex % VEHICLES.length) + 1}
          </span>
        </div>

        {/* Bottom Content: Model, Price, Specs and CTA */}
        <div>
          {/* Model & Price */}
          <div className="mb-5 md:mb-6">
            <h4 className="text-3xl md:text-5xl font-bold text-white mb-1.5 tracking-tighter leading-none font-syncopate">
              {vehicle.model}
            </h4>
            <p className="text-avio-primary text-lg md:text-xl font-space font-bold">
              {vehicle.price}
            </p>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 md:pt-5 border-t border-white/15 mb-5 md:mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-white/50">
                <Zap size={11} className="text-avio-primary" />
                <span className="text-[8px] uppercase tracking-widest font-bold">Rango</span>
              </div>
              <p className="text-white text-xs sm:text-sm md:text-base font-bold font-space">{vehicle.range}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-white/50">
                <Zap size={11} className="text-avio-primary" />
                <span className="text-[8px] uppercase tracking-widest font-bold">0-100</span>
              </div>
              <p className="text-white text-xs sm:text-sm md:text-base font-bold font-space">{vehicle.acceleration}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-white/50">
                <Zap size={11} className="text-avio-primary" />
                <span className="text-[8px] uppercase tracking-widest font-bold">Máx</span>
              </div>
              <p className="text-white text-xs sm:text-sm md:text-base font-bold font-space">{vehicle.topSpeed}</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pointer-events-auto">
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onConfigure) {
                  onConfigure(vehicle);
                }
              }}
              className="group/btn inline-flex items-center gap-3.5 text-white cursor-pointer"
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase group-hover/btn:text-avio-primary transition-colors duration-300">
                CONFIGURAR
              </span>
              <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-[#020659] group-hover/btn:border-white transition-all duration-300">
                <ArrowUpRight size={16} />
              </div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Catalog() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | undefined>(undefined);
  const isHoveredRef = useRef(false);

  const handleOpenConfigureModal = useCallback((vehicle: Vehicle) => {
    setSelectedVehicleId(vehicle.id);
    setModalOpen(true);
  }, []);

  // Desktop Infinite Marquee Motion Value
  const desktopX = useMotionValue(0);

  // Determine viewport mode: desktop (>= 1024px) vs responsive (< 1024px)
  const isMobile = windowWidth < 1024;

  // Pre-carga inmediata de imágenes del catálogo para evitar fondos oscuros vacíos
  useEffect(() => {
    VEHICLES.forEach((v) => {
      const img = new Image();
      img.src = v.image;
    });
  }, []);

  useEffect(() => {
    let rId: number;
    const handleResize = () => {
      cancelAnimationFrame(rId);
      rId = requestAnimationFrame(() => {
        setWindowWidth(window.innerWidth);
      });
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      cancelAnimationFrame(rId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Zero-render pause/resume handlers
  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  };

  // DESKTOP: Infinite Continuous Seamless Glide (requestAnimationFrame)
  // One single set of 6 cars = 6 * (460px + 32px gap) = 2952px
  const singleSetWidth = VEHICLES.length * (460 + 32);

  useAnimationFrame((_, delta) => {
    if (isMobile) return;
    if (!isHoveredRef.current) {
      // Smooth luxury gliding speed: ~45px per second
      const speed = 0.045;
      let nextX = desktopX.get() - speed * delta;
      
      // Invisible seamless loop: wraps exactly at 1 set width without any stutter or white space
      if (nextX <= -singleSetWidth) {
        nextX += singleSetWidth;
      }
      desktopX.set(nextX);
    }
  });

  // RESPONSIVE: Tactile Offset Calculation (Mobile & Tablet)
  const getMobileOffset = useCallback((index: number) => {
    if (typeof window === 'undefined') return index * 380;
    if (windowWidth < 640) {
      // 84vw + 20px gap
      return index * (windowWidth * 0.84 + 20);
    }
    if (windowWidth < 768) {
      // 380px + 24px gap
      return index * (380 + 24);
    }
    // Tablet (768 - 1023px): 420px + 32px gap
    return index * (420 + 32);
  }, [windowWidth]);

  const handleMobilePrev = () => {
    setMobileIndex((prev) => (prev - 1 + VEHICLES.length) % VEHICLES.length);
  };

  const handleMobileNext = () => {
    setMobileIndex((prev) => (prev + 1) % VEHICLES.length);
  };

  return (
    <section 
      id="catalog" 
      className="bg-white relative overflow-hidden pt-24 md:pt-36 pb-16 md:pb-24 select-none"
    >
      <div className="container mx-auto px-6 mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12">
          
          {/* Section Header Title */}
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
            <h2 className="text-4xl md:text-7xl font-bold leading-[0.95] text-avio-secondary-2 tracking-tighter font-syncopate">
              NUESTRO <br />
              <span className="text-outline-dark uppercase">CATÁLOGO</span>
            </h2>
          </motion.div>
          
          {/* Controls: Clean Header Layout */}
          <div className="w-full md:w-auto">
            
            {/* DESKTOP MODE: Elegant clean brand tag without tutorial text */}
            <div className="hidden lg:block text-right">
              <p className="text-[10px] font-bold tracking-[0.4em] text-avio-primary uppercase font-syncopate">
                INGENIERÍA DE PRECISIÓN
              </p>
            </div>

            {/* RESPONSIVE MODE (Mobile & Tablet): Tactile Arrow Controls with Counter */}
            <div className="flex lg:hidden items-center justify-between w-full pt-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-avio-primary" />
                <span className="text-[10px] font-bold tracking-[0.25em] text-avio-secondary-2/50 uppercase font-space">
                  MODELOS
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={handleMobilePrev}
                  aria-label="Vehículo anterior"
                  className="w-10 h-10 rounded-full border border-neutral-200/80 flex items-center justify-center text-avio-secondary-2 hover:border-black/30 hover:bg-black/5 active:bg-avio-primary active:text-white transition-all cursor-pointer"
                >
                  <ChevronLeft size={17} />
                </motion.button>

                <div className="text-[10px] font-bold tracking-[0.2em] text-avio-secondary-2/70 uppercase px-2 font-space">
                  <span className="text-avio-primary font-bold">0{mobileIndex + 1}</span> / <span>0{VEHICLES.length}</span>
                </div>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={handleMobileNext}
                  aria-label="Siguiente vehículo"
                  className="w-10 h-10 rounded-full border border-neutral-200/80 flex items-center justify-center text-avio-secondary-2 hover:border-black/30 hover:bg-black/5 active:bg-avio-primary active:text-white transition-all cursor-pointer"
                >
                  <ChevronRight size={17} />
                </motion.button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        DESKTOP VIEWPORT: Infinite Continuous Seamless Glide
        - Infinite duplicated set of vehicles (no ending, zero white gap)
        - Pauses completely when cursor enters (onMouseEnter)
        - Resumes when cursor leaves (onMouseLeave)
        ========================================================================
      */}
      {!isMobile && (
        <div 
          className="relative w-full pt-2 pb-8 overflow-hidden bg-white"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div 
            style={{ x: desktopX }}
            className="flex gap-8 px-8 items-stretch will-change-transform"
          >
            {INFINITE_VEHICLES.map((vehicle, index) => (
              <CatalogCard 
                key={`desktop-${vehicle.id}-${index}`}
                vehicle={vehicle} 
                displayIndex={index} 
                isMobile={false}
                onConfigure={handleOpenConfigureModal}
              />
            ))}
          </motion.div>
        </div>
      )}

      {/* 
        ========================================================================
        RESPONSIVE VIEWPORT (Mobile & Tablet): Tactile Drag & Button Nav
        - Snaps cleanly card by card with touch drag or buttons
        ========================================================================
      */}
      {isMobile && (
        <div className="relative w-full pt-2 pb-8 overflow-hidden bg-white">
          <motion.div 
            animate={{ x: -getMobileOffset(mobileIndex) }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: -getMobileOffset(VEHICLES.length - 1), right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_e, info) => {
              if (info.offset.x < -40) {
                handleMobileNext();
              } else if (info.offset.x > 40) {
                handleMobilePrev();
              }
            }}
            className="flex gap-5 sm:gap-6 px-6 sm:px-10 items-stretch cursor-grab active:cursor-grabbing"
          >
            {VEHICLES.map((vehicle, index) => (
              <CatalogCard 
                key={`mobile-${vehicle.id}`}
                vehicle={vehicle} 
                displayIndex={index} 
                isMobile={true}
                isActiveMobile={mobileIndex === index}
                onConfigure={handleOpenConfigureModal}
              />
            ))}
          </motion.div>
        </div>
      )}

      {/* Reservation & Configurator Modal */}
      <ReservationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialMode="configure"
        initialVehicleId={selectedVehicleId}
      />
    </section>
  );
}
