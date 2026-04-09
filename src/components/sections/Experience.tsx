import { motion } from 'motion/react';
import React from 'react';

const FEATURES = [
  "HUD Holográfico",
  "Audio Inmersivo 21.1",
  "Asientos Adaptativos",
  "Ambient Lighting"
];

export default function Experience() {
  return (
    <section id="experience" className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto/v1773780937/experience_nsgman.jpg" 
          alt="Interior del vehículo"
          className="w-full h-full object-cover object-[center_85%]"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {/* Dark Overlay - Horizontal bottom gradient only as requested */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          {/* Label with accent line - Kept primary color for brand but darkened the line slightly */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-8 h-[2px] bg-avio-primary/80" />
            <span className="text-[10px] font-bold tracking-[0.4em] text-white uppercase">
              LA EXPERIENCIA
            </span>
          </motion.div>

          {/* Heading - Adjusted size for coherence with other sections */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tighter leading-[0.95] uppercase"
          >
            Diseñado para <br />
            el conductor.
          </motion.h2>

          {/* Description - Slightly reduced size for coherence */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-xs md:text-sm leading-relaxed font-light tracking-wide mb-8 max-w-lg"
          >
            Cada detalle del habitáculo crea una conexión directa entre conductor y máquina. 
            Materiales premium, iluminación ambiental y tecnología invisible.
          </motion.p>

          {/* Features Tags */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            {FEATURES.map((feature, i) => (
              <div 
                key={i}
                className="px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white text-[10px] font-medium tracking-widest uppercase hover:bg-white/10 hover:border-white/40 transition-all cursor-default"
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
