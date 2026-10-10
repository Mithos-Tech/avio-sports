import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';

const FEATURES = [
  "HUD Holográfico",
  "Audio Inmersivo 21.1",
  "Asientos Adaptativos",
  "Ambient Lighting"
];

export default function Experience() {
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="experience" className="relative min-h-[580px] md:h-screen md:min-h-[680px] w-full overflow-hidden flex items-center py-16 md:py-0">
      {/* Background Image - Menos opaca, difuminada de forma suave arriba y abajo para que el interior resalte */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_1600/v1773780937/experience_nsgman.jpg" 
          alt="Interior del habitáculo"
          className="w-full h-full object-cover object-[center_85%] brightness-95 contrast-105"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        {/* Difuminado suave arriba y abajo: sin tapar la imagen, garantizando legibilidad y presencia del habitáculo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/85 z-10 pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-2xl">
          
          {/* Label con viñeta de punto en vez de guión */}
          <motion.div 
            initial={isDesktop ? { opacity: 0, x: -15 } : { opacity: 1, x: 0 }}
            whileInView={isDesktop ? { opacity: 1, x: 0 } : undefined}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 mb-5 md:mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-avio-primary inline-block shadow-[0_0_8px_rgba(43,150,217,0.8)]" />
            <span className="text-[10px] font-bold tracking-[0.4em] text-avio-primary uppercase font-syncopate">
              LA EXPERIENCIA
            </span>
          </motion.div>

          {/* TÍTULO: Exactamente 3 líneas de texto (Desktop, Tablet y Responsive) */}
          <motion.h2 
            initial={isDesktop ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
            whileInView={isDesktop ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.5, delay: isDesktop ? 0.08 : 0, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tighter leading-[1.08] uppercase font-syncopate max-w-xl"
          >
            <span className="block">DISEÑADO</span>
            <span className="block text-outline">PARA EL</span>
            <span className="block text-white">CONDUCTOR</span>
          </motion.h2>

          {/* SUBTÍTULO: Exactamente 2 líneas de texto, simplificado y armonioso */}
          <motion.div 
            initial={isDesktop ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
            whileInView={isDesktop ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.5, delay: isDesktop ? 0.15 : 0, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/85 text-xs sm:text-sm md:text-base leading-relaxed font-light tracking-wide mb-8 max-w-lg font-space"
          >
            <p className="block">Conexión intuitiva entre conductor y máquina.</p>
            <p className="block text-white/70">Materiales premium y tecnología invisible.</p>
          </motion.div>

          {/* Features Tags */}
          <motion.div 
            initial={isDesktop ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
            whileInView={isDesktop ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.5, delay: isDesktop ? 0.2 : 0, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-2.5 sm:gap-3"
          >
            {FEATURES.map((feature, i) => (
              <div 
                key={i}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/25 bg-black/30 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-medium tracking-widest uppercase hover:bg-white/10 hover:border-avio-primary/50 transition-all cursor-default shadow-sm"
              >
                {feature}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
