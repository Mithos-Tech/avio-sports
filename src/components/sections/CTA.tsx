import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import React, { useRef } from 'react';

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax for cards - they move from below the viewport to above it
  // We stagger their ranges to create a sequential "passing" effect
  const y1 = useTransform(scrollYProgress, [0, 0.6], ["120vh", "-120vh"]);
  const y2 = useTransform(scrollYProgress, [0.1, 0.7], ["120vh", "-120vh"]);
  const y3 = useTransform(scrollYProgress, [0.2, 0.8], ["120vh", "-120vh"]);
  const y4 = useTransform(scrollYProgress, [0.3, 0.9], ["120vh", "-120vh"]);

  // Text opacity - fade in at start, fade out at very end
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.1], [0.9, 1]);

  return (
    <section 
      id="cta"
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/5 bg-avio-primary/5 mb-8">
            <Sparkles size={14} className="text-avio-primary" />
            <span className="text-[10px] font-bold tracking-[0.4em] text-avio-primary uppercase">
              RESERVA
            </span>
          </div>

          <h2 className="text-4xl md:text-7xl font-bold text-avio-secondary-2 mb-8 tracking-tighter leading-[0.95] uppercase">
            CONDUCE <br />
            <span className="text-outline-dark">EL MAÑANA</span>
          </h2>

          <p className="text-avio-secondary-2/40 text-sm md:text-base max-w-2xl mx-auto mb-16 font-light leading-relaxed tracking-wide">
            Únete a la élite de la movilidad eléctrica. Reserva tu prueba de manejo y experimenta la ingeniería que redefine los límites.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.a
              href="#home"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-6 bg-avio-secondary-2 text-white font-bold text-xs tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 shadow-xl shadow-avio-secondary-2/20 inline-flex items-center justify-center"
            >
              <span className="relative z-10 flex items-center gap-3">
                RESERVAR AHORA <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-avio-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.a>

            <motion.a
              href="#catalog"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 border border-black/10 text-avio-secondary-2 font-bold text-xs tracking-[0.2em] rounded-full hover:bg-black/5 transition-all duration-500 inline-flex items-center justify-center"
            >
              CONFIGURAR MODELO
            </motion.a>
          </div>
        </motion.div>

        {/* Floating Cards - These move vertically past the static text */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          
          {/* Card 1: Top Left */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute left-[5%] md:left-[10%] top-0 w-[200px] md:w-[380px] aspect-[4/5] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-black/5 bg-white"
          >
            <img 
              src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1774482701/cta_01_xdylnh.webp" 
              className="w-full h-full object-cover" 
              alt="Avio Performance" 
              loading="lazy"
              referrerPolicy="no-referrer" 
            />
          </motion.div>

          {/* Card 2: Mid Right */}
          <motion.div 
            style={{ y: y2 }}
            className="absolute right-[5%] md:right-[12%] top-0 w-[180px] md:w-[340px] aspect-square rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-black/5 bg-white"
          >
            <img 
              src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1774482702/cta_02_c7mzlm.webp" 
              className="w-full h-full object-cover" 
              alt="Avio Interior" 
              loading="lazy"
              referrerPolicy="no-referrer" 
            />
          </motion.div>

          {/* Card 3: Mid Left */}
          <motion.div 
            style={{ y: y3 }}
            className="absolute left-[8%] md:left-[15%] top-0 w-[160px] md:w-[320px] aspect-[4/5] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-black/5 bg-white"
          >
            <img 
              src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1774482702/cta_03_nwhyii.webp" 
              className="w-full h-full object-cover" 
              alt="Avio Motion" 
              loading="lazy"
              referrerPolicy="no-referrer" 
            />
          </motion.div>

          {/* Card 4: Bottom Right */}
          <motion.div 
            style={{ y: y4 }}
            className="absolute right-[8%] md:right-[10%] top-0 w-[190px] md:w-[360px] aspect-square rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-black/5 bg-white"
          >
            <img 
              src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1774482702/cta_04_oop3gs.webp" 
              className="w-full h-full object-cover" 
              alt="Avio Detail" 
              loading="lazy"
              referrerPolicy="no-referrer" 
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
