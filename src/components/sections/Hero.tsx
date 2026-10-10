import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';

const CARS = [
  {
    id: 1,
    code: '01',
    name: 'Zenith S',
    image: 'https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_1000/v1791237249/aut_01_okawtc.webp',
    widthClass: 'w-[79.5vw] sm:w-[515px] md:w-[603px] lg:w-[671px]',
  },
  {
    id: 2,
    code: '02',
    name: 'Neon GT',
    image: 'https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_1000/v1791237249/aut_02_sbmxom.webp',
    widthClass: 'w-[82.3vw] sm:w-[533px] md:w-[624px] lg:w-[694px]',
  },
  {
    id: 3,
    code: '03',
    name: 'Orion X',
    image: 'https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_1000/v1791237249/aut_03_kdz2lc.webp',
    widthClass: 'w-[78.8vw] sm:w-[510px] md:w-[597px] lg:w-[664px]',
  }
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);

  const currentCar = CARS[selectedCarIndex];

  // Preload all 3 cars in memory for zero-lag instant switching
  useEffect(() => {
    CARS.forEach((car) => {
      const img = new Image();
      img.src = car.image;
    });
  }, []);

  // Fluid keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setSelectedCarIndex((prev) => (prev + 1) % CARS.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedCarIndex((prev) => (prev - 1 + CARS.length) % CARS.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative h-[100dvh] min-h-[100dvh] max-h-[100dvh] w-full overflow-hidden flex flex-col justify-between text-white selection:bg-avio-primary selection:text-white select-none"
      style={{
        background: 'linear-gradient(180deg, #2078B7 0%, #1E3E59 46%, #1E3E59 54%, #2078B7 100%)'
      }}
    >
      {/* ============================================================== */}
      {/* CAPA 1: COLOR DEGRADADO (#2078B7 & #1E3E59)                     */}
      {/* ============================================================== */}
      {/* Renderizado directo con gradiente CSS de máxima nitidez */}

      {/* ============================================================== */}
      {/* CAPA 2: GRID DOT (MODERADO, CONTENIDO, ADORNO IZQUIERDA/DERECHA) */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-[1] pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[80vw] max-w-5xl aspect-[16/9] flex items-center justify-center">
          <img 
            src="https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_1000/v1791227566/dot_grid_gfktos.webp" 
            alt="Decoración Grid Dots" 
            className="w-full h-full object-contain select-none opacity-75"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* TEXTO SUPERIOR IZQUIERDO: SINTETIZADO EN 2 LÍNEAS              */}
      {/* Solo en modo Desktop (lg:block); en responsive va abajo        */}
      {/* ============================================================== */}
      <div className="hidden lg:block absolute left-12 sm:left-20 md:left-32 lg:left-44 xl:left-52 top-[20%] sm:top-[22%] md:top-[24%] z-20 max-w-xs sm:max-w-sm pointer-events-none">
        <motion.p 
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/90 text-xs sm:text-sm md:text-base font-light leading-snug font-space tracking-wide"
        >
          Cima del rendimiento eléctrico. <br />
          <span className="text-white font-medium">Para quienes exigen más que un viaje.</span>
        </motion.p>
      </div>

      {/* ============================================================== */}
      {/* TÍTULO HERO DERECHA: ESTANDARIZADO (SÓLIDO + LINEAL)           */}
      {/* Modo Desktop y Tablet (md:block). En responsive va limpio.     */}
      {/* Ubicado en la franja media-baja detrás del auto (z-[2])       */}
      {/* ============================================================== */}
      <div className="hidden md:block absolute right-8 sm:right-16 md:right-24 lg:right-36 xl:right-44 top-[48%] md:top-[50%] lg:top-[52%] z-[2] select-none pointer-events-none text-right">
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-syncopate tracking-tight uppercase leading-[0.95] drop-shadow-md"
        >
          <span className="text-white block">AVIO</span>
          <span className="text-outline uppercase block">SPORTS</span>
        </motion.h1>
      </div>

      {/* ============================================================== */}
      {/* SUBTÍTULO SUPERIOR (SOLO MODO RESPONSIVO: lg:hidden)           */}
      {/* Centrado en el punto medio exacto entre el header y el auto   */}
      {/* ============================================================== */}
      <div className="lg:hidden absolute left-1/2 -translate-x-1/2 top-[24%] sm:top-[26%] md:top-[27%] z-20 w-full px-6 text-center pointer-events-none">
        <motion.p 
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white/85 text-[11px] sm:text-xs md:text-sm font-light font-space leading-snug tracking-wide max-w-[280px] sm:max-w-xs mx-auto"
        >
          Cima del rendimiento eléctrico. <br />
          <span className="text-white font-medium">Para quienes exigen más que un viaje.</span>
        </motion.p>
      </div>

      {/* ============================================================== */}
      {/* SELECTOR VERTICAL 01-03 (SOLO MODO DESKTOP: lg:flex)           */}
      {/* Margen lateral equilibrado y a la par con el lado derecho      */}
      {/* ============================================================== */}
      <div className="hidden lg:flex absolute left-8 sm:left-14 md:left-20 lg:left-24 xl:left-28 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3 md:gap-5">
        <div className="w-[1px] h-8 md:h-12 bg-white/20" />
        
        {/* Number Range Indicator */}
        <span className="text-[10px] font-bold tracking-[0.25em] text-white/70 uppercase font-space -rotate-90 my-1">
          0{selectedCarIndex + 1}-03
        </span>

        {/* 3 Interactive Dots with Glow */}
        <div className="flex flex-col gap-3.5 my-1">
          {CARS.map((car, idx) => {
            const isActive = selectedCarIndex === idx;
            return (
              <button
                key={car.id}
                onClick={() => setSelectedCarIndex(idx)}
                aria-label={`Seleccionar modelo ${car.name}`}
                className="relative p-1 flex items-center justify-center cursor-pointer group"
              >
                <div 
                  className={`rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'w-3 h-3 bg-avio-primary shadow-[0_0_12px_rgba(43,150,217,0.95)] ring-2 ring-white/70' 
                      : 'w-2 h-2 bg-white/35 group-hover:bg-white/80'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="w-[1px] h-8 md:h-12 bg-white/20" />
      </div>

      {/* ============================================================== */}
      {/* CAPA 3: AUTOS EN EL MEDIO (CENTRADO, FIRME, ESCALA UNIFORME)   */}
      {/* Calibración visual idéntica entre los 3 modelos sin sombras    */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        
        {/* Contenedor central simétrico y equilibrado */}
        <div className="relative w-full max-w-5xl px-4 flex items-center justify-center pointer-events-auto">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCar.id}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_e, info) => {
                if (info.offset.x < -35) {
                  setSelectedCarIndex((prev) => (prev + 1) % CARS.length);
                } else if (info.offset.x > 35) {
                  setSelectedCarIndex((prev) => (prev - 1 + CARS.length) % CARS.length);
                }
              }}
              className="w-full flex items-center justify-center cursor-grab active:cursor-grabbing relative touch-pan-y"
              onClick={() => setSelectedCarIndex((prev) => (prev + 1) % CARS.length)}
              title="Haz clic o desliza para alternar modelo"
            >
              <img 
                src={currentCar.image} 
                alt={currentCar.name}
                className={`${currentCar.widthClass} max-w-full h-auto max-h-[32vh] sm:max-h-[36vh] md:max-h-[42vh] object-contain select-none pointer-events-none relative z-10`}
                style={{
                  imageRendering: '-webkit-optimize-contrast',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'translateZ(0)'
                }}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>

        </div>

      </div>

      {/* ============================================================== */}
      {/* BARRA DE NAVEGACIÓN Y MODELO (MODO RESPONSIVO: SOLO PUNTOS)    */}
      {/* Elevada y depurada: sin números en la píldora, solo puntos     */}
      {/* ============================================================== */}
      <div className="lg:hidden absolute left-1/2 -translate-x-1/2 bottom-[21.5%] sm:bottom-[22.5%] md:bottom-[23.5%] z-30 flex flex-col items-center gap-1.5 pointer-events-auto w-full px-4 text-center">
        {/* Model Badge */}
        <span className="text-[10px] font-bold tracking-[0.35em] text-white/70 uppercase font-space">
          0{currentCar.code} · {currentCar.name}
        </span>

        {/* Píldora de puntos táctiles minimalista (sin números ni textos) */}
        <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-black/25 backdrop-blur-md border border-white/10 shadow-lg">
          {CARS.map((car, idx) => {
            const isActive = selectedCarIndex === idx;
            return (
              <button
                key={car.id}
                onClick={() => setSelectedCarIndex(idx)}
                aria-label={`Seleccionar modelo ${car.name}`}
                className="p-1 flex items-center justify-center cursor-pointer touch-manipulation"
              >
                <div 
                  className={`rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'w-3 h-3 bg-avio-primary shadow-[0_0_12px_rgba(43,150,217,0.95)] ring-2 ring-white/80' 
                      : 'w-2 h-2 bg-white/35 hover:bg-white/70'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* BOTÓN CTA ELEVADO (MODO RESPONSIVO: DESPEGADO DE REDES)        */}
      {/* ============================================================== */}
      <div className="lg:hidden absolute left-1/2 -translate-x-1/2 bottom-[11.5%] sm:bottom-[12.5%] md:bottom-[13%] z-30 pointer-events-auto text-center w-auto">
        <a
          href="#catalog"
          className="group inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/25 backdrop-blur-md text-white text-[11px] font-space font-medium tracking-wider uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
        >
          <span>Explorar Catálogo</span>
          <ArrowUpRight size={13} className="text-avio-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* MODEL BADGE DISCRETO CENTRADO (SOLO MODO DESKTOP: lg:flex) */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 bottom-[14%] sm:bottom-[15%] z-20 flex-col items-center pointer-events-none">
        <span className="text-[10px] font-bold tracking-[0.35em] text-white/60 uppercase font-space">
          0{currentCar.code} · {currentCar.name}
        </span>
      </div>

      {/* ============================================================== */}
      {/* PIE DE HERO: REDES SOCIALES (ABAJO A LA IZQUIERDA)             */}
      {/* ============================================================== */}
      <div className="absolute left-8 sm:left-14 md:left-20 bottom-6 md:bottom-8 z-20 flex items-center gap-5">
        {[
          { icon: <Facebook size={17} />, label: 'Facebook', href: 'https://facebook.com' },
          { icon: <Twitter size={17} />, label: 'Twitter', href: 'https://twitter.com' },
          { icon: <Instagram size={17} />, label: 'Instagram', href: 'https://instagram.com' }
        ].map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors"
            aria-label={social.label}
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* Indicador de Desplazamiento Sutil Abajo a la Derecha */}
      <div className="absolute right-8 sm:right-14 md:right-20 bottom-6 md:bottom-8 z-20 hidden sm:flex items-center gap-3 text-[10px] text-white/40 tracking-[0.2em] font-space uppercase">
        <a href="#catalog" className="hover:text-avio-primary transition-colors flex items-center gap-2">
          <span>CATÁLOGO</span>
          <span className="w-6 h-[1px] bg-white/30" />
        </a>
      </div>

    </section>
  );
}
