import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const TEAM = [
  {
    name: "Elena Varkov",
    role: "CEO & Fundadora",
    image: "https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_400/v1774493925/elena_jq2vas.webp",
    bio: "Visionaria con más de 20 años en la industria automotriz de lujo."
  },
  {
    name: "Marcus Thorne",
    role: "Director de Diseño",
    image: "https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_400/v1774493925/marcus_yldbnn.webp",
    bio: "El cerebro detrás de las líneas aerodinámicas y el minimalismo de AVIO."
  },
  {
    name: "Sofia Chen",
    role: "Ingeniera Principal",
    image: "https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_400/v1774493925/sofia_w81m39.webp",
    bio: "Experta en propulsión eléctrica y sistemas de energía renovable."
  },
  {
    name: "Julian Rossi",
    role: "Director de Experiencia",
    image: "https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_400/v1774493925/julian_zqwsdh.webp",
    bio: "Dedicado a redefinir la relación entre el conductor y la máquina."
  }
];

export default function About() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Pre-carga inmediata de los activos visuales clave de Nosotros para evitar pantallas oscuras
  useEffect(() => {
    const heroBg = new Image();
    heroBg.src = "https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_1600/v1774391466/fondo_hero_ya2ekb.png";
    const heroCar = new Image();
    heroCar.src = "https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_1200/v1774391466/auto_wytvga.png";
    TEAM.forEach((m) => {
      const img = new Image();
      img.src = m.image;
    });
  }, []);

  useEffect(() => {
    const handleScrollToHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#about-')) {
        const targetId = hash.replace('#about-', '');
        const element = document.getElementById(targetId);
        if (element) {
          setTimeout(() => {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - 80;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }, 150);
        }
      } else if (hash === '#about' || hash === '') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    };

    handleScrollToHash();
    window.addEventListener('hashchange', handleScrollToHash);
    return () => window.removeEventListener('hashchange', handleScrollToHash);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white"
    >
      <Navbar />
      
      <main>
        {/* ============================================================== */}
        {/* HERO SECTION - 3D LAYERED DEPTH EFFECT                        */}
        {/* ============================================================== */}
        <section id="about-hero" className="relative h-[100dvh] min-h-screen flex items-center justify-center overflow-hidden bg-avio-secondary-2">
          {/* Layer 0: Background Environment */}
          <div className="absolute inset-0 z-0">
            <motion.div 
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <img 
                src="https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_1600/v1774391466/fondo_hero_ya2ekb.png" 
                alt="AVIO Environment" 
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Layer 1: Label and Title (Behind the Car, calibrated height across all screens) */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <motion.div 
              style={{ opacity, scale }}
              className="text-center mb-36 sm:mb-44 md:mb-56 lg:mb-64"
            >
              <motion.div 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center gap-3 mb-3 sm:mb-5"
              >
                <div className="w-8 h-[1px] bg-avio-primary" />
                <span className="text-[10px] font-bold tracking-[0.4em] text-avio-primary uppercase">NOSOTROS</span>
                <div className="w-8 h-[1px] bg-avio-primary" />
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight font-syncopate uppercase drop-shadow-lg"
              >
                MÁS QUE <br />
                <span className="text-outline uppercase">MOVIMIENTO</span>
              </motion.h1>
            </motion.div>
          </div>

          {/* Layer 2: Foreground Car (Middle Layer) */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <motion.div 
              initial={{ y: 40, opacity: 0, scale: 1.02 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.02, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full flex items-center justify-center"
            >
              <img 
                src="https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_1200/v1774391466/auto_wytvga.png" 
                alt="AVIO Sports Car" 
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Layer 3: Description (In front of everything, lower and concise on mobile) */}
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <motion.div 
              style={{ opacity, scale }}
              className="container mx-auto px-6 text-center mt-[28rem] sm:mt-[29rem] md:mt-[38rem] pointer-events-auto"
            >
              <div className="flex flex-col items-center">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="max-w-[290px] sm:max-w-2xl mx-auto text-white/85 text-xs sm:text-sm md:text-base font-space font-light leading-snug sm:leading-relaxed tracking-wide drop-shadow-lg"
                >
                  <span className="sm:hidden">
                    Diseñamos el futuro de la libertad <br />
                    con ingeniería de precisión española.
                  </span>
                  <span className="hidden sm:inline">
                    En AVIO®, no solo fabricamos vehículos eléctricos de alto rendimiento; diseñamos el futuro de la libertad personal con ingeniería de precisión española.
                  </span>
                </motion.p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* NUESTRA HISTORIA - TIMELINE (White Theme Refined)              */}
        {/* ============================================================== */}
        <section id="legacy" className="py-24 md:py-40 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(2,6,89,0.1)_0%,transparent_70%)]" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20 md:mb-32">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                <div className="w-8 h-[1px] bg-avio-primary" />
                <span className="text-[10px] font-bold tracking-[0.4em] text-avio-primary uppercase">HISTORIA</span>
                <div className="w-8 h-[1px] bg-avio-primary" />
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-8xl font-bold tracking-tighter leading-none text-avio-secondary-2 font-syncopate uppercase"
              >
                NUESTRO <br />
                <span className="text-outline-dark uppercase">LEGADO</span>
              </motion.h2>
            </div>

            <div className="relative max-w-6xl mx-auto">
              {/* Central Line - Refined with gradient */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-avio-primary/20 to-transparent -translate-x-1/2 hidden md:block" />
              <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-avio-primary/20 to-transparent md:hidden" />

              <div className="space-y-24 md:space-y-0">
                {[
                  { year: "2015", date: "MAR 27", title: "EL COMIENZO", text: "Fundación de AVIO en Madrid con la visión de electrificar el lujo y redefinir la movilidad personal." },
                  { year: "2018", date: "JUN 12", title: "ZENITH S PROTOTYPE", text: "Presentación de nuestro primer prototipo funcional, rompiendo récords de autonomía en el circuito del Jarama.", highlight: true },
                  { year: "2022", date: "SEP 05", title: "EXPANSIÓN GLOBAL", text: "Apertura de nuestras Experience Stores en Londres, París y Berlín, llevando el diseño español al mundo." },
                  { year: "2025", date: "ENE 15", title: "LIDERAZGO SOSTENIBLE", text: "Lanzamiento de la serie Sports y consolidación como líderes en movilidad eléctrica de alto rendimiento." }
                ].map((item, i) => (
                  <div key={i} className={`relative flex items-center justify-between md:h-72 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Content Side */}
                    <motion.div 
                      initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className={`w-full md:w-[45%] pl-16 md:pl-0 ${item.highlight ? 'z-20' : ''}`}
                    >
                      <div className={`p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-700 border ${item.highlight ? 'bg-avio-secondary-2 text-white border-avio-secondary-2 shadow-2xl scale-105' : 'bg-white text-avio-secondary-2 border-avio-secondary-2/5 shadow-xl hover:shadow-2xl hover:border-avio-primary/20 hover:scale-[1.02]'}`}>
                        <h4 className="text-xl md:text-3xl font-bold mb-4 font-syncopate leading-tight">{item.title}</h4>
                        <p className={`font-space font-light leading-relaxed text-xs md:text-sm tracking-wide ${item.highlight ? 'text-white/70' : 'text-avio-secondary-2/60'}`}>
                          {item.text}
                        </p>
                      </div>
                    </motion.div>

                    {/* Dot on Line */}
                    <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
                      <div className="relative">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-avio-primary shadow-[0_0_20px_rgba(43,150,217,0.5)]" />
                        <motion.div 
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-full bg-avio-primary"
                        />
                      </div>
                    </div>

                    {/* Date Side */}
                    <motion.div 
                      initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className={`hidden md:flex w-[45%] flex-col ${i % 2 === 0 ? 'items-end text-right' : 'items-start text-left'}`}
                    >
                      <span className="text-4xl md:text-6xl font-bold font-syncopate text-avio-secondary-2 mb-2">{item.year}</span>
                      <span className="text-[11px] font-bold tracking-[0.4em] text-avio-secondary-2/30 uppercase">{item.date}</span>
                    </motion.div>

                    {/* Mobile Date (Visible only on mobile) */}
                    <div className="absolute left-16 top-[-35px] md:hidden">
                      <span className="text-2xl font-bold font-syncopate text-avio-secondary-2 mr-3">{item.year}</span>
                      <span className="text-[10px] font-bold tracking-[0.3em] text-avio-secondary-2/30 uppercase">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* MARQUEE AVIO - FRAMER STYLE (WHITE THEME)                     */}
        {/* ============================================================== */}
        <section className="pt-20 md:pt-32 pb-0 bg-white overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex whitespace-nowrap">
            <motion.div 
              animate={{ x: [0, -2000] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex gap-12 md:gap-24 items-center pr-12 md:pr-24"
            >
              {[...Array(20)].map((_, i) => (
                <div key={i} className="flex items-center gap-12 md:gap-24">
                  <span className={`text-6xl md:text-[12rem] font-bold font-syncopate tracking-tighter ${i % 2 === 0 ? 'text-avio-secondary-2' : 'text-outline-dark'}`}>
                    AVIO
                  </span>
                  <span className="text-4xl md:text-8xl text-avio-primary font-bold">·</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* EQUIPO - LOS VISIONARIOS (WHITE THEME)                        */}
        {/* ============================================================== */}
        <section id="team" className="pt-12 md:pt-16 pb-24 md:pb-40 bg-white">
          <div className="container mx-auto px-6">
            <div className="mb-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-avio-primary" />
                <span className="text-[10px] font-bold tracking-[0.4em] text-avio-primary uppercase">EQUIPO</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.95] text-avio-secondary-2 font-syncopate">
                LOS <br />
                <span className="text-outline-dark uppercase">VISIONARIOS</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {TEAM.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="group"
                >
                  <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-8 border border-black/5">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-avio-secondary-2/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                      <p className="text-white/70 text-[10px] md:text-xs font-space font-light leading-relaxed tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-2 font-syncopate text-avio-secondary-2">{member.name}</h4>
                  <p className="text-avio-primary text-[10px] font-bold tracking-widest uppercase">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* FINAL CTA - DISEÑA EL MAÑANA                                  */}
        {/* ============================================================== */}
        <section id="cta" className="py-24 sm:py-32 md:py-48 bg-white relative overflow-visible">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-avio-secondary-2 rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[5rem] p-7 sm:p-12 md:p-24 flex flex-col md:flex-row items-center gap-10 md:gap-16 overflow-visible shadow-[0_40px_100px_rgba(0,0,0,0.2)]"
            >
              {/* Background Accents */}
              <div className="absolute top-0 right-0 w-full h-full overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[5rem] pointer-events-none">
                <div className="hidden md:block absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-avio-primary/10 blur-[120px] rounded-full rotate-12" />
                <div className="hidden md:block absolute bottom-[-20%] left-[-10%] w-[40%] h-[80%] bg-avio-primary/5 blur-[100px] rounded-full" />
              </div>

              {/* Left Content */}
              <div className="w-full md:w-3/5 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="flex items-center gap-2.5 mb-5 sm:mb-8">
                    <span className="w-2 h-2 rounded-full bg-avio-primary inline-block shadow-[0_0_8px_rgba(43,150,217,0.8)]" />
                    <span className="text-[10px] font-bold tracking-[0.4em] text-avio-primary uppercase">OPORTUNIDADES</span>
                  </div>
                </motion.div>

                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-2xl sm:text-4xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight sm:tracking-tighter leading-[0.95] font-syncopate mb-5 sm:mb-10 uppercase"
                >
                  DISEÑA EL <br />
                  <span className="text-outline uppercase">MAÑANA</span>
                </motion.h2>

                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="max-w-md text-white/60 font-space text-xs sm:text-sm md:text-base font-light leading-relaxed tracking-wide mb-7 sm:mb-12"
                >
                  Estamos construyendo más que vehículos; estamos definiendo una nueva era de libertad. Únete a nuestro equipo de visionarios en Madrid.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <motion.a
                    href="mailto:careers@aviomotors.com"
                    whileHover={{ scale: 1.02, x: 8 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center gap-3 sm:gap-6 bg-white text-avio-secondary-2 px-6 py-3 sm:px-10 sm:py-5 rounded-full font-bold text-[11px] sm:text-xs tracking-widest uppercase transition-all hover:bg-avio-primary hover:text-white w-fit cursor-pointer shadow-lg active:scale-95"
                  >
                    <span className="sm:hidden">CARRERAS</span>
                    <span className="hidden sm:inline">Ver posiciones abiertas</span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-avio-secondary-2/5 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <ArrowUpRight size={13} className="stroke-[2.5]" />
                    </div>
                  </motion.a>
                </motion.div>
              </div>

              {/* Right Image - Car PNG entering from right */}
              <div className="w-full md:w-2/5 relative">
                <motion.div
                  initial={{ opacity: 0, x: 100, scale: 0.8 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 1.2, 
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2
                  }}
                  className="relative z-20 md:absolute md:top-1/2 md:-translate-y-1/2 md:right-[-25%] w-full md:w-[180%] pointer-events-none"
                >
                  {/* Subtle Glow Behind Car */}
                  <div className="hidden md:block absolute inset-0 bg-avio-primary/20 blur-[80px] rounded-full scale-75 opacity-50" />
                  
                  <motion.img 
                    src="https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_900/v1774465202/cta_2_b1rytx.png" 
                    alt="AVIO Vehicle"
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)] relative z-10"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Tech Detail */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-[10%] left-[10%] bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl z-30 hidden md:block"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-avio-primary animate-pulse" />
                      <span className="text-[10px] font-bold text-white tracking-widest uppercase">SISTEMA ACTIVO</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
}
