import { motion, AnimatePresence } from 'motion/react';
import { X, Search, ArrowUpRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cuarteto curado de navegación según especificación Framer
  const navLinks = [
    { number: '01', name: 'Inicio', href: '#home' },
    { number: '02', name: 'Catálogo', href: '#catalog' },
    { number: '03', name: 'Servicios', href: '#services' },
    { number: '04', name: 'Nosotros', href: '#about' }
  ];

  const handleLinkClick = (href: string, e?: React.MouseEvent) => {
    setIsOpen(false);
    
    const currentHash = window.location.hash || '#home';

    // Si el usuario hace clic en Inicio o en el logo
    if (href === '#home') {
      if (currentHash === '#home' || currentHash === '') {
        if (e) e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      } else {
        // Venimos de una página secundaria (#about, #services, #legal)
        window.location.hash = '#home';
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
    }

    // Si ya estamos en la misma sección o página, scroll suave arriba
    if (currentHash === href) {
      if (e) e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Si estamos en la página principal y es un ancla interna
    if (href.startsWith('#') && (currentHash === '#home' || currentHash === '')) {
      const element = document.querySelector(href);
      if (element) {
        if (e) e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Si estamos en una página secundaria y vamos a un ancla interna de home (ej: #catalog o #reservation)
      window.location.hash = href;
    }
  };

  return (
    <>
      {/* ============================================================== */}
      {/* HEADER PERMANENTE FLOTANTE (ESTILO FRAMER MINIMALISTA)         */}
      {/* 3 ZONAS: [Lupa] — [Logo Centro + "AVIO"] — [Botón Menú Framer] */}
      {/* ============================================================== */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 md:px-14 pt-7 sm:pt-8 md:pt-9 pb-4 flex items-center justify-between pointer-events-auto transition-all duration-500 ease-out ${
          isScrolled 
            ? 'opacity-0 -translate-y-3 pointer-events-none' 
            : 'opacity-100 translate-y-0 pointer-events-auto'
        }`}
      >
        {/* ZONA 1 (IZQUIERDA): Búsqueda Minimalista Flotante */}
        <div className="w-20 flex items-center justify-start">
          <a
            href="#catalog"
            onClick={(e) => handleLinkClick('#catalog', e)}
            aria-label="Buscar vehículos en el catálogo"
            className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 cursor-pointer"
          >
            <Search size={20} strokeWidth={1.75} />
          </a>
        </div>

        {/* ZONA 2 (CENTRO ABSOLUTO): Isotipo Superior + Marca "AVIO" ceñida */}
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick('#home', e)}
          className="flex flex-col items-center group cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          <img 
            src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1774306344/Avio_logo_ld4iur.svg" 
            alt="Avio Isotipo" 
            className="h-6 sm:h-7 w-auto"
            referrerPolicy="no-referrer"
          />
          <span className="font-syncopate font-bold text-[10px] sm:text-[11px] tracking-[0.35em] text-white uppercase mt-0.5 leading-none group-hover:text-avio-primary transition-colors">
            AVIO
          </span>
        </a>

        {/* ZONA 3 (DERECHA): Botón Menú Estilo Framer con 3 Líneas Escalonadas (Sin palabra MENÚ) */}
        <div className="w-20 flex items-center justify-end">
          <button 
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir menú de navegación"
            className="group p-2 rounded-full hover:bg-white/10 transition-all duration-300 cursor-pointer flex items-center justify-center"
          >
            {/* 3 Líneas Escalonadas (Una más grande que la otra) */}
            <div className="flex flex-col gap-[3.5px] items-end w-5">
              <span className="w-5 h-[1.5px] bg-white group-hover:bg-avio-primary transition-all duration-300" />
              <span className="w-3.5 h-[1.5px] bg-white group-hover:w-5 group-hover:bg-avio-primary transition-all duration-300" />
              <span className="w-2 h-[1.5px] bg-white group-hover:w-5 group-hover:bg-avio-primary transition-all duration-300" />
            </div>
          </button>
        </div>
      </header>

      {/* ============================================================== */}
      {/* MENÚ NAVEGACIÓN: CARD FLOTANTE EN MÓVIL / DRAWER EN DESKTOP   */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* ========================================================== */}
            {/* 1. MODO MÓVIL (sm:hidden): CARD FLOTANTE CON ESQUINAS CURVAS */}
            {/* NO ocupa toda la pantalla, ceñido, apilado al centro       */}
            {/* ========================================================== */}
            <div className="sm:hidden fixed inset-0 z-[100] p-4 flex flex-col justify-start items-center pt-5 pointer-events-none">
              {/* Backdrop desenfocado */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-black/65 backdrop-blur-md pointer-events-auto"
              />

              {/* Tarjeta Card Flotante (Auto-height, esquinas muy curvas) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: -12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[310px] bg-[#020659]/95 backdrop-blur-3xl border border-white/15 rounded-[2rem] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-10 pointer-events-auto text-white flex flex-col"
              >
                {/* Cabecera Card: Logo + Marca y Botón Cerrar */}
                <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1774306344/Avio_logo_ld4iur.svg" 
                      alt="Avio" 
                      className="h-5 w-auto"
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-syncopate font-bold text-xs tracking-[0.3em] text-white leading-none">
                      AVIO
                    </span>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Cerrar menú"
                    className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <X size={13} />
                  </button>
                </div>

                {/* Navegación Móvil: Botones apilados al centro, tamaño ceñido con efecto hover */}
                <nav className="py-3 flex flex-col items-center gap-1">
                  {navLinks.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleLinkClick(item.href, e)}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + index * 0.04 }}
                      className="w-full text-center py-2 px-3 rounded-xl text-[11px] font-bold font-syncopate uppercase tracking-[0.2em] text-white/80 hover:text-white hover:bg-white/10 active:bg-white/15 transition-all cursor-pointer"
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>

                {/* Botón CTA Móvil: RESERVAR compacto */}
                <div className="pt-3 border-t border-white/10">
                  <a
                    href="#reservation"
                    onClick={(e) => handleLinkClick('#reservation', e)}
                    className="w-full py-2.5 rounded-full bg-avio-primary hover:bg-white text-white hover:text-avio-secondary-2 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 transition-all duration-300 shadow-lg shadow-avio-primary/25 cursor-pointer font-space active:scale-[0.98]"
                  >
                    <span>RESERVAR</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* ========================================================== */}
            {/* 2. MODO DESKTOP Y TABLET (hidden sm:flex): DRAWER LATERAL  */}
            {/* ========================================================== */}
            <div className="hidden sm:flex fixed inset-0 z-[100] justify-end">
              {/* Backdrop con desenfoque cinematográfico */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-black/65 backdrop-blur-md"
              />

              {/* Menu Slide Drawer con proporciones ceñidas */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-md md:max-w-[420px] h-full bg-[#020659]/95 backdrop-blur-3xl text-white border-l border-white/15 p-8 md:p-10 flex flex-col justify-between shadow-[-20px_0_60px_rgba(0,0,0,0.6)] z-10 overflow-y-auto"
              >
                {/* Cabecera del Drawer */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1774306344/Avio_logo_ld4iur.svg" 
                      alt="Avio" 
                      className="h-6 w-auto"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col leading-none">
                      <span className="font-syncopate font-bold text-xs tracking-[0.3em] text-white">
                        AVIO
                      </span>
                      <span className="text-[8px] font-space tracking-[0.2em] text-white/50 uppercase mt-0.5">
                        AUTOMOTIVE
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Cerrar menú"
                    className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Lista de Navegación Editorial Ceñida */}
                <nav className="py-8 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-avio-primary shadow-[0_0_8px_rgba(43,150,217,0.8)]" />
                    <span className="text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase font-syncopate">
                      NAVEGACIÓN
                    </span>
                  </div>
                  
                  <div className="flex flex-col">
                    {navLinks.map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleLinkClick(item.href, e)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + (index * 0.05), ease: [0.16, 1, 0.3, 1] }}
                        className="group flex items-center justify-between py-3 border-b border-white/[0.08] last:border-b-0 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-xs text-white/35 group-hover:text-avio-primary transition-colors tracking-widest">
                            {item.number}
                          </span>
                          <span className="text-xl font-bold font-syncopate uppercase tracking-tight text-white/85 group-hover:text-white group-hover:translate-x-1 transition-all leading-none">
                            {item.name}
                          </span>
                        </div>

                        <div className="w-6 h-6 rounded-full border border-transparent group-hover:border-avio-primary/40 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                          <ArrowUpRight size={13} className="text-avio-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </nav>

                {/* Bloque Inferior: CTA + Metadata */}
                <div className="pt-6 border-t border-white/10 space-y-3.5">
                  <a
                    href="#reservation"
                    onClick={(e) => handleLinkClick('#reservation', e)}
                    className="w-full py-4 rounded-full bg-avio-primary hover:bg-white text-white hover:text-avio-secondary-2 font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-avio-primary/20 cursor-pointer font-space active:scale-[0.98]"
                  >
                    <span>RESERVAR TEST DRIVE</span>
                    <ArrowUpRight size={14} />
                  </a>

                  <div className="flex items-center justify-between text-[11px] text-white/40 pt-1 font-space">
                    <span>© 2026 AVIO Automobili</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-white/60">Disponibilidad Inmediata</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
