import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, SlidersHorizontal } from 'lucide-react';
import React, { useRef, useState } from 'react';
import ReservationModal from '../ui/ReservationModal';

export default function Reservation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'reserve' | 'configure'>('reserve');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const handleOpenReserve = () => {
    setModalMode('reserve');
    setModalOpen(true);
  };

  const handleOpenConfigure = () => {
    setModalMode('configure');
    setModalOpen(true);
  };

  // Parallax for cards - they move from below the viewport to above it
  // Calibrated with generous vertical spacing between consecutive cards on each side
  const y1 = useTransform(scrollYProgress, [0, 0.48], ["135vh", "-135vh"]);
  const y2 = useTransform(scrollYProgress, [0.12, 0.60], ["135vh", "-135vh"]);
  const y3 = useTransform(scrollYProgress, [0.30, 0.80], ["145vh", "-135vh"]);
  const y4 = useTransform(scrollYProgress, [0.44, 0.94], ["145vh", "-135vh"]);

  // Text opacity - appears immediately and smoothly as soon as section enters viewport
  const textOpacity = useTransform(scrollYProgress, [0, 0.04, 0.92, 1], [0.85, 1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.04], [0.96, 1]);

  return (
    <section 
      id="reservation"
      ref={containerRef}
      className="relative h-[600vh] bg-white"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Subtle Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* Static Centered Content */}
        <motion.div 
          style={{ opacity: textOpacity, scale: textScale }}
          className="container mx-auto px-6 text-center z-10 relative"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/5 bg-avio-primary/5 mb-6 sm:mb-8">
            <Sparkles size={14} className="text-avio-primary" />
            <span className="text-[10px] font-bold tracking-[0.4em] text-avio-primary uppercase">
              RESERVA
            </span>
          </div>

          <h2 className="text-4xl md:text-7xl font-bold text-avio-secondary-2 mb-6 sm:mb-8 tracking-tighter leading-[0.95] uppercase">
            CONDUCE <br />
            <span className="text-outline-dark">EL MAÑANA</span>
          </h2>

          <p className="text-avio-secondary-2/40 text-sm md:text-base max-w-2xl mx-auto mb-10 sm:mb-16 font-light leading-relaxed tracking-wide">
            Únete a la élite de la movilidad eléctrica. Reserva tu prueba de manejo y experimenta la ingeniería que redefine los límites.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* Botón 1: RESERVAR AHORA (Abre modal concierge con spring physics) */}
            <motion.button
              type="button"
              onClick={handleOpenReserve}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96, y: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group relative px-7 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-avio-secondary-2 text-white font-bold text-xs tracking-wider sm:tracking-[0.2em] rounded-full overflow-hidden transition-all duration-300 shadow-xl shadow-avio-secondary-2/20 inline-flex items-center justify-center w-full md:w-auto cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-3">
                RESERVAR AHORA 
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
              {/* Framer subtle spotlight / sweep overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-avio-primary via-[#2078B7] to-avio-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>

            {/* Botón 2: CONFIGURAR MODELO (Abre configurador interactivo con tabs de acabado) */}
            <motion.button
              type="button"
              onClick={handleOpenConfigure}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96, y: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group relative px-7 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 border border-black/15 bg-white/50 backdrop-blur-sm text-avio-secondary-2 font-bold text-xs tracking-wider sm:tracking-[0.2em] rounded-full hover:border-black/30 hover:bg-black/5 transition-all duration-300 inline-flex items-center justify-center gap-3 w-full md:w-auto cursor-pointer shadow-sm hover:shadow-md"
            >
              <SlidersHorizontal size={15} className="text-avio-primary group-hover:rotate-45 transition-transform duration-300" />
              <span>CONFIGURAR MODELO</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Floating Cards - These move vertically past the static text */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          
          {/* Card 1: Top Left */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute left-[4%] md:left-[8%] top-0 w-[200px] md:w-[380px] aspect-[4/5] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-md md:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-black/5 bg-white"
          >
            <img 
              src="https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_600/v1774482701/cta_01_xdylnh.webp" 
              className="w-full h-full object-cover" 
              alt="Avio Performance" 
              decoding="async"
              referrerPolicy="no-referrer" 
            />
          </motion.div>

          {/* Card 2: Mid Right */}
          <motion.div 
            style={{ y: y2 }}
            className="absolute right-[4%] md:right-[8%] top-0 w-[180px] md:w-[340px] aspect-square rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-md md:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-black/5 bg-white"
          >
            <img 
              src="https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_600/v1774482702/cta_02_c7mzlm.webp" 
              className="w-full h-full object-cover" 
              alt="Avio Interior" 
              decoding="async"
              referrerPolicy="no-referrer" 
            />
          </motion.div>

          {/* Card 3: Lower Left (Spaced generously from Card 1) */}
          <motion.div 
            style={{ y: y3 }}
            className="absolute left-[6%] md:left-[13%] top-0 w-[160px] md:w-[320px] aspect-[4/5] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-md md:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-black/5 bg-white"
          >
            <img 
              src="https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_600/v1774482702/cta_03_nwhyii.webp" 
              className="w-full h-full object-cover" 
              alt="Avio Motion" 
              decoding="async"
              referrerPolicy="no-referrer" 
            />
          </motion.div>

          {/* Card 4: Lower Right (Spaced generously from Card 2) */}
          <motion.div 
            style={{ y: y4 }}
            className="absolute right-[6%] md:right-[13%] top-0 w-[190px] md:w-[360px] aspect-square rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-md md:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-black/5 bg-white"
          >
            <img 
              src="https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_600/v1774482702/cta_04_oop3gs.webp" 
              className="w-full h-full object-cover" 
              alt="Avio Detail" 
              decoding="async"
              referrerPolicy="no-referrer" 
            />
          </motion.div>
        </div>

      </div>

      {/* Concierge & Configurator Interactive Modal */}
      <ReservationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialMode={modalMode}
      />
    </section>
  );
}
