import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

const TRENDS_DATA = [
  {
    id: 't1',
    keyword: 'SOLID STATE',
    subtitle: 'Baterías de alta densidad cuántica',
    image: 'https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_800/v1774481340/t_01_xnphce.webp',
    span: 'md:col-span-7'
  },
  {
    id: 't2',
    keyword: 'V2X CONNECT',
    subtitle: 'Interconexión de red inteligente',
    image: 'https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_800/v1774481339/t_02_ezmgkd.webp',
    span: 'md:col-span-5'
  },
  {
    id: 't3',
    keyword: 'NEURAL DRIVE',
    subtitle: 'Piloto autónomo neural 4.0',
    image: 'https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_800/v1774481339/t_03_y24ar7.webp',
    span: 'md:col-span-5'
  },
  {
    id: 't4',
    keyword: 'BIO-LUXURY',
    subtitle: 'Materiales sostenibles de vanguardia',
    image: 'https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_800/v1774481339/t_04_nnoqze.webp',
    span: 'md:col-span-7'
  }
];

export default function Trends() {
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pre-carga inmediata de las 4 imágenes de tendencias para evitar bloques oscuros
  useEffect(() => {
    TRENDS_DATA.forEach((t) => {
      const img = new Image();
      img.src = t.image;
    });
  }, []);

  return (
    <section id="trends" className="py-24 md:py-36 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section Header with smooth entrance */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-12">
          <motion.div
            initial={isDesktop ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            whileInView={isDesktop ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-8 h-[1px] bg-avio-primary" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-avio-primary uppercase">AVIO LABS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-black tracking-tighter leading-[0.95] uppercase font-syncopate">
              FUTURO <br />
              <span className="text-outline-dark">ELÉCTRICO</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={isDesktop ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            whileInView={isDesktop ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-left md:text-right"
          >
            <p className="text-[10px] font-bold tracking-[0.3em] text-avio-primary uppercase font-space">
              INNOVACIÓN SIN LÍMITES
            </p>
          </motion.div>
        </div>

        {/* Bento Grid: Smooth rising scroll ingress only in desktop mode */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {TRENDS_DATA.map((trend, i) => (
            <motion.div
              key={trend.id}
              initial={isDesktop ? { opacity: 0, y: 55 } : { opacity: 1, y: 0 }}
              whileInView={isDesktop ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ 
                duration: 0.85, 
                delay: isDesktop ? i * 0.12 : 0, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className={`group relative overflow-hidden rounded-[2.2rem] bg-neutral-900 h-[360px] sm:h-[400px] md:h-[460px] shadow-sm hover:shadow-xl transition-all duration-500 ${trend.span}`}
            >
              {/* Image - Natural, vivid, zero blue overlay or tint */}
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={trend.image} 
                  alt={trend.keyword}
                  className="w-full h-full object-cover select-none brightness-100 contrast-100"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle bottom-only scrim for text contrast - 100% of vehicle remains completely natural */}
                <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
              </div>

              {/* Layered Content Overlay - Subtitle, Title and Direction Button */}
              <div className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-end z-10">
                <div className="flex justify-between items-end gap-4">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.25em] text-avio-primary uppercase block mb-1.5 font-space drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                      {trend.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tighter leading-none uppercase font-syncopate drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {trend.keyword}
                    </h3>
                  </div>
                  
                  <a
                    href="#experience"
                    aria-label={`Explorar ${trend.keyword}`}
                    className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-white group-hover:text-avio-secondary-2 group-hover:border-white transition-all duration-300 shrink-0 shadow-md"
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
