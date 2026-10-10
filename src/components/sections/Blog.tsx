import { motion, AnimatePresence } from 'motion/react';
import { TRENDS } from '../../constants';
import { ArrowRight, Terminal, Plus } from 'lucide-react';
import React, { useState, useEffect } from 'react';

export default function Blog() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Pre-carga inmediata de las imágenes del blog para alternancia instantánea
  useEffect(() => {
    TRENDS.forEach((post) => {
      const img = new Image();
      img.src = post.image;
    });
  }, []);

  return (
    <section id="blog" className="py-24 sm:py-32 lg:py-40 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Terminal size={14} className="text-avio-primary" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-avio-primary uppercase">AVIO INSIGHTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-black tracking-tighter leading-[0.95] uppercase font-syncopate">
              AVIO <br />
              <span className="text-outline-dark">JOURNAL</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-left md:text-right"
          >
            <p className="text-[10px] font-bold tracking-[0.3em] text-avio-primary uppercase font-space">
              NOTICIAS Y ANÁLISIS
            </p>
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* 1. MODO DESKTOP (lg:grid): LAYOUT INTERACTIVO DE 2 COLUMNAS   */}
        {/* Imagen sticky a la izquierda que cambia al pasar cursor/clic  */}
        {/* ============================================================== */}
        <div className="hidden lg:grid grid-cols-12 gap-16 items-start">
          {/* Columna Izquierda: Showcase de Imagen Sticky con Crossfade Fluido */}
          <div className="col-span-6 sticky top-28">
            <div className="relative h-[560px] rounded-[2.8rem] overflow-hidden bg-neutral-900 shadow-xl">
              {TRENDS.map((post, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <motion.div
                    key={post.id}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 1.04,
                    }}
                    transition={{
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute inset-0 pointer-events-none will-change-[opacity,transform]"
                  >
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  </motion.div>
                );
              })}
              
              {/* Badges Flotantes en Desktop */}
              <div className="absolute bottom-8 left-8 right-8 z-10 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2.5">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase">
                    {TRENDS[activeIdx]?.date}
                  </span>
                  <span className="inline-flex px-3.5 py-1.5 rounded-full bg-avio-primary/30 backdrop-blur-md border border-avio-primary/40 text-white text-[10px] font-bold tracking-widest uppercase">
                    EXCLUSIVO AVIO
                  </span>
                </div>
                <div className="text-white/40 text-[10px] font-mono tracking-widest">
                  0{activeIdx + 1} / 0{TRENDS.length}
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Lista Interactiva con Acordeón Fluido */}
          <div className="col-span-6 flex flex-col divide-y divide-black/10">
            {TRENDS.map((post, idx) => {
              const isActive = activeIdx === idx;

              return (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`w-full text-left py-8 lg:py-9 transition-colors duration-300 focus:outline-none cursor-pointer group ${
                    isActive ? 'opacity-100' : 'opacity-40 hover:opacity-85'
                  }`}
                >
                  <div className="flex items-start justify-between gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[11px] font-bold tracking-widest text-avio-primary font-mono">
                          0{idx + 1}
                        </span>
                        <div 
                          className={`h-[1px] bg-avio-primary transition-all duration-500 ease-out ${
                            isActive ? 'w-14' : 'w-0'
                          }`} 
                        />
                      </div>
                      
                      <h3 className="text-3xl lg:text-4xl font-bold text-black tracking-tight leading-tight uppercase font-syncopate">
                        {post.title}
                      </h3>
                      
                      <motion.div
                        initial={false}
                        animate={{
                          height: isActive ? 'auto' : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.35,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="text-neutral-600 text-sm font-normal leading-relaxed tracking-wide pt-3 max-w-xl">
                          {post.description}
                        </p>
                      </motion.div>
                    </div>

                    <div className="pt-1 flex-shrink-0">
                      <div 
                        className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isActive 
                            ? 'bg-black border-black text-white rotate-45 shadow-md scale-105' 
                            : 'border-black/15 bg-transparent text-black/60 group-hover:border-black group-hover:text-black'
                        }`}
                      >
                        <Plus size={18} strokeWidth={2.2} />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}

            <div className="pt-10">
              <a 
                href="#catalog"
                className="inline-flex items-center gap-3.5 group text-[11px] font-bold tracking-[0.25em] uppercase text-black hover:text-avio-primary transition-colors duration-300"
              >
                <span className="relative pb-0.5 border-b border-black/20 group-hover:border-avio-primary transition-colors">
                  VER TODAS LAS PUBLICACIONES
                </span>
                <div className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center group-hover:bg-avio-primary group-hover:border-avio-primary group-hover:text-white transition-all duration-300">
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. MODO RESPONSIVO (lg:hidden): ACORDEÓN EDITORIAL COMPACTO   */}
        {/* Al dar clic se abre el párrafo y muestra la imagen abajo      */}
        {/* Mantiene la sección en un tamaño proporcionado y controlado   */}
        {/* ============================================================== */}
        <div className="lg:hidden flex flex-col divide-y divide-black/10">
          {TRENDS.map((post, idx) => {
            const isActive = activeIdx === idx;

            return (
              <div 
                key={post.id} 
                className="py-5 sm:py-6 first:pt-0 last:pb-0"
              >
                {/* Botón Cabecera del Acordeón: Título, Número y Gatillo */}
                <button
                  type="button"
                  onClick={() => setActiveIdx(activeIdx === idx ? -1 : idx)}
                  className="w-full text-left flex items-start justify-between gap-4 focus:outline-none cursor-pointer group"
                  aria-expanded={isActive}
                >
                  <div className="flex-1">
                    {/* Micro-encabezado: Número, línea y fecha */}
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="text-[11px] font-bold tracking-widest text-avio-primary font-mono">
                        0{idx + 1}
                      </span>
                      <div 
                        className={`h-[1px] bg-avio-primary transition-all duration-500 ease-out ${
                          isActive ? 'w-10' : 'w-4 opacity-40'
                        }`} 
                      />
                      <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase font-space">
                        {post.date}
                      </span>
                    </div>

                    {/* Titular */}
                    <h3 className={`text-lg sm:text-2xl font-bold tracking-tight leading-snug uppercase font-syncopate transition-colors duration-300 ${
                      isActive ? 'text-black' : 'text-black/70 group-hover:text-black'
                    }`}>
                      {post.title}
                    </h3>
                  </div>

                  {/* Indicador Circular Táctil (+) */}
                  <div className="pt-1 flex-shrink-0">
                    <div 
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'bg-black border-black text-white rotate-45 shadow-sm' 
                          : 'border-black/15 bg-transparent text-black/60 group-hover:border-black group-hover:text-black'
                      }`}
                    >
                      <Plus size={16} strokeWidth={2.2} />
                    </div>
                  </div>
                </button>

                {/* Contenido Desplegable (Transición optimizada con grid-rows para evitar reflow en móvil) */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pt-3 pb-3 space-y-4">
                      {/* Párrafo Descriptivo */}
                      <p className="text-neutral-600 text-xs sm:text-sm font-normal leading-relaxed tracking-wide">
                        {post.description}
                      </p>

                      {/* Imagen que se revela debajo del párrafo */}
                      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[1.6rem] sm:rounded-[2rem] overflow-hidden bg-neutral-900 shadow-md">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                          decoding="async"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Badge Flotante en la Imagen */}
                        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white pointer-events-none">
                          <span className="text-[9px] font-bold tracking-widest uppercase bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 font-space">
                            AVIO JOURNAL
                          </span>
                          <span className="text-[10px] font-mono text-white/70 tracking-widest">
                            0{idx + 1} / 0{TRENDS.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Enlace de cierre en móvil */}
          <div className="pt-8 text-center sm:text-left">
            <a 
              href="#catalog"
              className="inline-flex items-center gap-3 group text-[11px] font-bold tracking-[0.25em] uppercase text-black hover:text-avio-primary transition-colors duration-300"
            >
              <span className="relative pb-0.5 border-b border-black/20 group-hover:border-avio-primary transition-colors">
                VER TODAS LAS PUBLICACIONES
              </span>
              <div className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center group-hover:bg-avio-primary group-hover:border-avio-primary group-hover:text-white transition-all duration-300">
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-300" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
