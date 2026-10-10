import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  CreditCard, 
  Car, 
  Key, 
  Wrench,
  CheckCircle2,
  Sparkles,
  Zap,
  Shield,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const SERVICES = [
  {
    id: "financing",
    title: "Financiación",
    tagline: "Flexibilidad a tu medida",
    description: "Planes de leasing y amortización a medida con tasas preferentes. Diseñado tanto para particulares exigentes como flotas ejecutivas.",
    icon: <CreditCard className="text-avio-primary" size={24} />,
    image: "https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_800/v1774487278/s_01_arubge.webp",
    features: ["TIN preferente desde 3.9%", "Plazos de 24 a 84 meses", "Aprobación exprés en 24h", "Cancelación flexible"]
  },
  {
    id: "sell",
    title: "Vende tu Coche",
    tagline: "Tasación garantizada",
    description: "Tasación digital instantánea con certificación oficial. Aceptamos tu vehículo actual como parte de pago con la mejor cotización del mercado de lujo.",
    icon: <Car className="text-avio-primary" size={24} />,
    image: "https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_800/v1774487278/s_02_rtxk9w.webp",
    features: ["Tasación en 15 minutos", "Sin trámites burocráticos", "Bono de cambio AVIO Plus", "Recogida premium a domicilio"]
  },
  {
    id: "rental",
    title: "Alquiler Premium",
    tagline: "Suscripción sin ataduras",
    description: "Disfruta de la gama AVIO por días, semanas o meses con cobertura integral, asistencia prioritaria y recarga ilimitada en la red AVIO Power.",
    icon: <Key className="text-avio-primary" size={24} />,
    image: "https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_800/v1774487277/s_03_xsoixq.webp",
    features: ["Modelos Neon GT y Zenith S", "Seguro total sin franquicia", "Entrega en aeropuertos VIP", "Sin permanencia mínima"]
  },
  {
    id: "repair",
    title: "Servicio Técnico",
    tagline: "Ingeniería de máxima precisión",
    description: "Telemetría remota, diagnóstico predictivo y mantenimiento oficial por ingenieros certificados con componentes originales aeroespaciales.",
    icon: <Wrench className="text-avio-primary" size={24} />,
    image: "https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_800/v1774487285/s_04_ro6hkm.webp",
    features: ["Diagnóstico Over-The-Air", "Vehículo de sustitución de cortesía", "Garantía extendida de batería", "Cita prioritaria garantizada"]
  }
];

// Fictitious Pricing Plans (Estilo Framer minimalista y sofisticado)
const PRICING_PLANS = [
  {
    id: "essential",
    name: "Essential Care",
    badge: "Acceso",
    monthlyPrice: "480",
    annualPrice: "390",
    description: "Cobertura preventiva y mantenimiento programado para propietarios de modelos AVIO.",
    highlighted: false,
    features: [
      "Mantenimiento anual certificado",
      "Diagnóstico remoto OTA bimestral",
      "Asistencia en carretera nacional 24/7",
      "Actualizaciones de software prioritarias",
      "Descuento 10% en recargas AVIO Power"
    ],
    buttonText: "Elegir Plan"
  },
  {
    id: "subscription",
    name: "AVIO All-Inclusive",
    badge: "Más Popular",
    monthlyPrice: "1.450",
    annualPrice: "1.280",
    description: "Suscripción mensual flexible con vehículo incluido, seguro total y recarga sin límite.",
    highlighted: true,
    features: [
      "Vehículo AVIO Neon GT o Zenith S",
      "Seguro a todo riesgo sin franquicia",
      "Mantenimiento y neumáticos incluidos",
      "Acceso ilimitado a red AVIO Power 350kW",
      "Vehículo de sustitución inmediata VIP",
      "Cambio de modelo cada 12 meses"
    ],
    buttonText: "Iniciar Suscripción"
  },
  {
    id: "prestige",
    name: "Concierge Private",
    badge: "Exclusivo",
    monthlyPrice: "2.800",
    annualPrice: "2.400",
    description: "Servicio de guante blanco integral para flotas selectas o clientes de alta exigencia.",
    highlighted: false,
    features: [
      "Gestor de flota y concierge dedicado 24/7",
      "Entrega y recogida a domicilio en cualquier punto",
      "Prioridad absoluta en talleres oficiales",
      "Flota de reemplazo de gama superior",
      "Eventos de circuito privados AVIO Experience",
      "Garantía de valor residual extendida"
    ],
    buttonText: "Contactar Asesor"
  }
];

const TOP_OFFSETS = [
  'top-[80px] md:top-[90px] lg:top-[98px]',
  'top-[98px] md:top-[110px] lg:top-[122px]',
  'top-[116px] md:top-[130px] lg:top-[146px]',
  'top-[134px] md:top-[150px] lg:top-[170px]',
];

const Z_INDICES = [
  'z-10',
  'z-20',
  'z-30',
  'z-40',
];

interface ServiceCardProps {
  service: typeof SERVICES[0];
  index: number;
  total: number;
  containerProgress: MotionValue<number>;
  isDesktop: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, total, containerProgress, isDesktop }) => {
  const isLast = index === total - 1;

  // Staggered scroll progress for subtle scale when subsequent cards stack on top (Desktop & Tablet only)
  const startProgress = Math.max(0, (index + 0.15) / total);
  const endProgress = Math.min(1, (index + 1.25) / total);

  const scale = useTransform(
    containerProgress,
    [startProgress, endProgress],
    [1, isLast ? 1 : 1 - (total - index) * 0.02]
  );

  return (
    <div 
      id={service.id} 
      className={`sticky ${TOP_OFFSETS[index]} ${Z_INDICES[index]} w-full mb-[20vh] md:mb-[32vh] last:mb-0`}
    >
      <motion.div
        style={{ 
          scale,
          transformOrigin: 'top center',
        }}
        className="relative w-full max-w-5xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-gradient-to-b from-[#2484BF] to-[#1F547D] border border-white/20 shadow-md md:shadow-2xl md:shadow-[#1F547D]/30"
      >
        {/* Card Body */}
        <div className="relative flex flex-col md:flex-row items-stretch">
          {/* Subtle Ambient Background Light Highlight */}
          <div className="hidden md:block absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Information & CTA */}
          <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-14 flex flex-col justify-between w-full md:w-1/2">
            <div>
              {/* Icon Container - Blue on Vertical Gradient */}
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-avio-secondary-2/80 border border-avio-secondary-2/40 flex items-center justify-center mb-6 shadow-md shadow-black/10">
                {React.cloneElement(service.icon as React.ReactElement<any>, { size: 24, className: "text-[#2B96D9] md:w-7 md:h-7" })}
              </div>

              {/* Tagline */}
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-white/90 font-syncopate block mb-2">
                {service.tagline}
              </span>

              {/* Service Title - White */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-syncopate text-white tracking-tighter uppercase mb-4 leading-tight">
                {service.title}
              </h3>

              {/* Description - White */}
              <p className="text-white/85 text-xs sm:text-sm md:text-base font-space font-light leading-relaxed tracking-wide mb-6">
                {service.description}
              </p>

              {/* Micro-Features Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {service.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-[11px] sm:text-xs text-white/85 font-space">
                    <CheckCircle2 size={13} className="text-[#2B96D9] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row: Action button & Card Number */}
            <div className="flex items-center justify-between gap-4 mt-6 md:mt-10 pt-6 border-t border-white/15">
              <a 
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 md:px-8 md:py-4 bg-avio-secondary-2 text-white font-bold rounded-full hover:bg-white hover:text-avio-secondary-2 transition-all duration-300 uppercase tracking-widest text-[9px] md:text-[10px] flex items-center gap-2 group/btn cursor-pointer shadow-lg shadow-avio-secondary-2/30"
              >
                <span>Ver Precios</span>
                <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>

              <span className="text-white/20 font-syncopate text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold select-none">
                0{index + 1}
              </span>
            </div>
          </div>

          {/* Right Column / Visual container: Preserved 3/4 Aspect Ratio with clean car display */}
          <div className="relative z-10 w-full md:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex items-center justify-center">
            <div className="w-full aspect-[3/4] max-h-[380px] sm:max-h-[460px] md:max-h-[540px] rounded-2xl md:rounded-[2.2rem] overflow-hidden border border-white/20 shadow-xl shadow-black/15">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface MobileServiceTabsProps {
  services: typeof SERVICES;
  activeTab: number;
  onTabChange: (index: number) => void;
}

const TAB_ITEMS = [
  { id: "financing", label: "Finanzas", num: "01", icon: CreditCard },
  { id: "sell", label: "Venta", num: "02", icon: Car },
  { id: "rental", label: "Alquiler", num: "03", icon: Key },
  { id: "repair", label: "Taller", num: "04", icon: Wrench },
];

const MobileServiceTabs: React.FC<MobileServiceTabsProps> = ({ 
  services,
  activeTab,
  onTabChange
}) => {
  const currentService = services[activeTab] || services[0];
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50 && activeTab < services.length - 1) {
      onTabChange(activeTab + 1);
    } else if (diff < -50 && activeTab > 0) {
      onTabChange(activeTab - 1);
    }
    setTouchStart(null);
  };

  return (
    <div className="w-full">
      {/* Selector de Pestañas Segmentadas Estilo Framer */}
      <div className="bg-slate-100/90 p-1.5 rounded-2xl border border-black/5 shadow-inner mb-6 grid grid-cols-4 gap-1 relative">
        {services.map((service, idx) => {
          const isActive = activeTab === idx;
          const TabIcon = TAB_ITEMS[idx]?.icon || CreditCard;
          const tabLabel = TAB_ITEMS[idx]?.label || service.title;

          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onTabChange(idx)}
              className={`relative z-10 py-2.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors duration-200 select-none cursor-pointer ${
                isActive ? 'text-white' : 'text-avio-secondary-2/65 hover:text-avio-secondary-2'
              }`}
              aria-label={`Ver servicio ${service.title}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeServiceTabPill"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-0 bg-gradient-to-r from-[#2484BF] to-[#1F547D] rounded-xl shadow-md shadow-[#1F547D]/30"
                />
              )}
              <div className="relative z-20 flex items-center gap-1">
                <TabIcon size={14} className={isActive ? 'text-white' : 'text-avio-secondary-2/50'} />
                <span className="text-[10px] font-syncopate font-bold">0{idx + 1}</span>
              </div>
              <span className="relative z-20 text-[9px] font-space font-medium tracking-tight truncate max-w-full">
                {tabLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tarjeta Activa con AnimatePresence (Cero saltos de viewport ni scroll, transición suave a 60fps) */}
      <div 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentService.id}
            id={`mobile-${currentService.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="w-full rounded-[2rem] overflow-hidden bg-gradient-to-b from-[#2484BF] to-[#1F547D] border border-white/20 shadow-xl shadow-[#1F547D]/25 p-6 text-white"
          >
            {/* Cabecera de la tarjeta: Icono, Navegación con flechas y Contador */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-avio-secondary-2/80 border border-avio-secondary-2/40 flex items-center justify-center shadow-md shadow-black/10">
                  {React.cloneElement(currentService.icon as React.ReactElement<any>, { size: 22, className: "text-[#2B96D9]" })}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onTabChange(Math.max(0, activeTab - 1))}
                    disabled={activeTab === 0}
                    className={`w-7 h-7 rounded-full border border-white/20 flex items-center justify-center transition-all ${
                      activeTab === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 active:scale-95'
                    }`}
                    aria-label="Servicio anterior"
                  >
                    <ChevronLeft size={14} className="text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onTabChange(Math.min(services.length - 1, activeTab + 1))}
                    disabled={activeTab === services.length - 1}
                    className={`w-7 h-7 rounded-full border border-white/20 flex items-center justify-center transition-all ${
                      activeTab === services.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 active:scale-95'
                    }`}
                    aria-label="Servicio siguiente"
                  >
                    <ChevronRight size={14} className="text-white" />
                  </button>
                </div>
              </div>

              <span className="text-white/25 font-syncopate text-3xl font-bold select-none">
                0{activeTab + 1}
              </span>
            </div>

            {/* Tagline y Título */}
            <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/90 font-syncopate block mb-1.5">
              {currentService.tagline}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-syncopate text-white tracking-tight uppercase mb-3 leading-tight">
              {currentService.title}
            </h3>

            {/* Descripción */}
            <p className="text-white/85 text-xs font-space font-light leading-relaxed mb-4">
              {currentService.description}
            </p>

            {/* Imagen del servicio con visual limpio */}
            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/20 shadow-md shadow-black/20 mb-4 bg-black/15">
              <img 
                src={currentService.image} 
                alt={currentService.title} 
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Lista de micro-características */}
            <div className="space-y-2 mb-6">
              {currentService.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2 text-[11px] sm:text-xs text-white/90 font-space">
                  <CheckCircle2 size={13} className="text-[#2B96D9] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Fila inferior: Botón CTA y Píldoras de progreso */}
            <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-4">
              <a 
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 py-3.5 bg-avio-secondary-2 text-white font-bold rounded-full hover:bg-white hover:text-avio-secondary-2 transition-all duration-300 uppercase tracking-widest text-[9px] sm:text-[10px] flex items-center justify-center gap-2 shadow-md shadow-avio-secondary-2/30 cursor-pointer active:scale-95"
              >
                <span>Ver Precios</span>
                <ArrowUpRight size={13} />
              </a>

              {/* Indicadores de pestaña activa */}
              <div className="flex items-center gap-1.5 px-2">
                {services.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => onTabChange(dotIdx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      dotIdx === activeTab ? 'w-4 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Ir al servicio 0${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function Services() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [mobileActiveTab, setMobileActiveTab] = useState(0);
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);

  useEffect(() => {
    let rId: number;
    const handleResize = () => {
      cancelAnimationFrame(rId);
      rId = requestAnimationFrame(() => {
        setIsDesktop(window.innerWidth >= 1024);
      });
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      cancelAnimationFrame(rId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const stackContainerRef = useRef<HTMLDivElement>(null);

  // Pre-carga inmediata de todas las imágenes de servicios para evitar pantallas oscuras o parpadeos
  useEffect(() => {
    SERVICES.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
    const expImg = new Image();
    expImg.src = "https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_1600/v1773780937/experience_nsgman.jpg";
  }, []);
  const { scrollYProgress: cardsScrollYProgress } = useScroll({
    target: stackContainerRef,
    offset: ['start start', 'end end']
  });

  const { scrollYProgress: heroScrollProgress } = useScroll();
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.25], [1, 0]);
  const heroScale = useTransform(heroScrollProgress, [0, 0.25], [1, 0.96]);

  useEffect(() => {
    const handleScrollToHash = () => {
      const hash = window.location.hash;
      const cleanHash = hash.replace('#services', '');
      if (cleanHash && cleanHash.length > 1) {
        const targetId = cleanHash.startsWith('#') || cleanHash.startsWith('-') || cleanHash.startsWith('/') 
          ? cleanHash.slice(1) 
          : cleanHash;
        const matchedIndex = SERVICES.findIndex(s => s.id === targetId);
        if (matchedIndex !== -1) {
          setMobileActiveTab(matchedIndex);
        }
        const element = document.getElementById(targetId) || document.getElementById(`mobile-${targetId}`);
        if (element) {
          setTimeout(() => {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - 100;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }, 150);
        }
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    };

    handleScrollToHash();
    window.addEventListener('hashchange', handleScrollToHash);
    return () => window.removeEventListener('hashchange', handleScrollToHash);
  }, []);

  return (
    <div className="bg-white min-h-screen text-avio-secondary-2">
      <Navbar />

      <main>
        {/* ============================================================== */}
        {/* HERO SECTION DE SERVICIOS (Con imagen de fondo de Experiencia) */}
        {/* Sin difuminado opaco: imagen nítida que resalta el habitáculo  */}
        {/* Título y subtítulo estandarizados y proporcionados             */}
        {/* ============================================================== */}
        <section 
          id="services-hero" 
          className="relative h-[100dvh] min-h-[580px] w-full overflow-hidden flex items-center justify-center bg-avio-secondary-2"
        >
          {/* Fondo: Imagen de la sección Experiencia con nitidez total cubriendo el 100% de la pantalla */}
          <div className="absolute inset-0 z-0">
            <motion.div 
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              <img 
                src="https://res.cloudinary.com/dk1tkgjpj/image/upload/f_auto,q_auto,w_1600/v1773780937/experience_nsgman.jpg" 
                alt="Interior y ecosistema AVIO"
                className="w-full h-full object-cover object-[center_75%] brightness-100 contrast-105"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            {/* Velo ultra sutil y transparente sólo para permitir legibilidad del texto blanco sin difuminar la imagen */}
            <div className="absolute inset-0 bg-black/35 z-10 pointer-events-none" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-20 text-center">
            <motion.div 
              style={{ opacity: heroOpacity, scale: heroScale }}
              className="max-w-2xl mx-auto flex flex-col items-center"
            >
              {/* Badge superior corto */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 mb-3 sm:mb-5"
              >
                <span className="w-2 h-2 rounded-full bg-avio-primary inline-block shadow-[0_0_8px_rgba(43,150,217,0.8)]" />
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.4em] text-white uppercase font-syncopate drop-shadow">
                  ECOSISTEMA INTEGRAL
                </span>
              </motion.div>

              {/* TÍTULO HERO ESTANDARIZADO: Mismo tamaño y diseño (sólido arriba, lineal abajo) que Nosotros */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-syncopate text-white tracking-tight leading-[0.95] uppercase mb-5 sm:mb-6 drop-shadow-lg"
              >
                SERVICIOS <br />
                <span className="text-outline uppercase">AVIO</span>
              </motion.h1>

              {/* SUBTÍTULO: Bajado más al medio en modo responsivo */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="text-white/90 font-space text-xs sm:text-sm md:text-base max-w-[300px] sm:max-w-lg mx-auto leading-relaxed font-light mt-6 sm:mt-0 mb-12 sm:mb-10 drop-shadow"
              >
                Ingeniería, financiación y soporte de guante blanco diseñados a tu medida.
              </motion.p>

              {/* Acciones directas al catálogo o a precios: Posicionadas mucho más abajo en modo responsivo */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-8 sm:mt-0"
              >
                <a
                  href="#services-cards"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('services-cards')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3 sm:px-8 sm:py-4 bg-avio-primary text-white font-bold rounded-full text-[10px] sm:text-xs uppercase tracking-widest hover:bg-white hover:text-avio-secondary-2 transition-all duration-300 shadow-xl shadow-black/30 flex items-center gap-1.5 sm:gap-2 group cursor-pointer active:scale-95"
                >
                  <span>Explorar Catálogo</span>
                  <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3 sm:px-8 sm:py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full text-[10px] sm:text-xs uppercase tracking-widest border border-white/25 backdrop-blur-md transition-all duration-300 cursor-pointer active:scale-95"
                >
                  Planes & Precios
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* TARJETAS APILADAS STACKING CARDS (ESTILO FRAMER)               */}
        {/* Paleta vertical: #2484BF a #1F547D, texto blanco, botones azul */}
        {/* ============================================================== */}
        <section id="services-cards" className="bg-white py-20 md:py-32 relative">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-14 md:mb-20">
              <motion.div 
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-8 h-[1px] bg-avio-primary" />
                <span className="text-[10px] font-bold tracking-[0.4em] text-avio-primary uppercase">SERVICIOS EXCLUSIVOS</span>
              </motion.div>

              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <motion.h2 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[0.95] text-avio-secondary-2 font-syncopate uppercase"
                >
                  EXCELENCIA <br />
                  <span className="text-outline-dark uppercase">A MEDIDA</span>
                </motion.h2>

                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="max-w-md text-avio-secondary-2/65 text-xs sm:text-sm font-space leading-relaxed"
                >
                  Descubre las cuatro dimensiones de atención AVIO concebidas con los más altos estándares automotrices.
                </motion.p>
              </div>
            </div>

            {/* Desktop & Tablet Stacking Cards Container */}
            <div ref={stackContainerRef} className="hidden md:block relative pb-16 md:pb-36">
              {SERVICES.map((service, i) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  index={i} 
                  total={SERVICES.length}
                  containerProgress={cardsScrollYProgress}
                  isDesktop={true}
                />
              ))}
            </div>

            {/* Mobile Responsive Framer Segmented Tab Controller (Opción 2: Cero saltos, 60fps) */}
            <div className="block md:hidden pb-12">
              <MobileServiceTabs 
                services={SERVICES} 
                activeTab={mobileActiveTab}
                onTabChange={setMobileActiveTab}
              />
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECCIÓN DE PRECIOS FICTICIOS (ESTILO FRAMER SOFISTICADO)       */}
        {/* Directamente después de las tarjetas apiladas                  */}
        {/* ============================================================== */}
        <section id="pricing" className="py-24 md:py-36 bg-[#F8FAFC] border-t border-black/5 relative overflow-hidden">
          {/* Luces sutiles de fondo */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-avio-primary/5 rounded-full blur-[140px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            {/* Header de la sección de precios */}
            <div className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                <div className="w-8 h-[1px] bg-avio-primary" />
                <span className="text-[10px] font-bold tracking-[0.4em] text-avio-primary uppercase">PLANES & TARIFAS</span>
                <div className="w-8 h-[1px] bg-avio-primary" />
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-5xl md:text-6xl font-bold font-syncopate text-avio-secondary-2 tracking-tighter leading-tight uppercase"
              >
                PLANES <br />
                <span className="text-outline-dark">DISPONIBLES</span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-4 text-xs sm:text-sm text-avio-secondary-2/65 font-space leading-relaxed max-w-md mx-auto"
              >
                Transparencia absoluta y flexibilidad total adaptada al estilo de vida del conductor AVIO.
              </motion.p>

              {/* Selector de facturación Mensual / Anual */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8 inline-flex items-center p-1.5 rounded-full bg-white border border-black/10 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-5 py-2 rounded-full text-xs font-bold font-space transition-all cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'bg-avio-secondary-2 text-white shadow-md'
                      : 'text-avio-secondary-2/60 hover:text-avio-secondary-2'
                  }`}
                >
                  Mensual
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`px-5 py-2 rounded-full text-xs font-bold font-space transition-all flex items-center gap-1.5 cursor-pointer ${
                    billingCycle === 'annual'
                      ? 'bg-avio-primary text-white shadow-md'
                      : 'text-avio-secondary-2/60 hover:text-avio-secondary-2'
                  }`}
                >
                  <span>Anual</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">Ahorra 15%</span>
                </button>
              </motion.div>
            </div>

            {/* Grid de tarjetas de precios estilo Framer */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
              {PRICING_PLANS.map((plan, pIdx) => {
                const currentPrice = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: pIdx * 0.12, duration: 0.7 }}
                    className={`relative rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                      plan.highlighted
                        ? 'bg-gradient-to-b from-[#2484BF] to-[#1F547D] text-white border-2 border-white/30 shadow-2xl shadow-[#1F547D]/40 scale-[1.02] lg:-translate-y-2'
                        : 'bg-white text-avio-secondary-2 border border-black/8 shadow-lg shadow-black/[0.03] hover:border-avio-primary/30'
                    }`}
                  >
                    {/* Badge destacado */}
                    <div className="flex items-center justify-between mb-6">
                      <span className={`text-[10px] font-bold tracking-[0.3em] uppercase font-syncopate px-3 py-1.5 rounded-full ${
                        plan.highlighted 
                          ? 'bg-white/20 text-white backdrop-blur-sm'
                          : 'bg-black/5 text-avio-secondary-2/70'
                      }`}>
                        {plan.badge}
                      </span>

                      {plan.highlighted && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-white bg-avio-secondary-2/70 px-3 py-1 rounded-full">
                          <Sparkles size={12} className="text-[#2B96D9]" />
                          Recomendado
                        </span>
                      )}
                    </div>

                    <div>
                      {/* Nombre del Plan */}
                      <h3 className={`text-xl sm:text-2xl font-bold font-syncopate uppercase mb-3 ${
                        plan.highlighted ? 'text-white' : 'text-avio-secondary-2'
                      }`}>
                        {plan.name}
                      </h3>

                      {/* Descripción corta */}
                      <p className={`text-xs sm:text-sm font-space leading-relaxed mb-8 ${
                        plan.highlighted ? 'text-white/80' : 'text-avio-secondary-2/65'
                      }`}>
                        {plan.description}
                      </p>

                      {/* Precio */}
                      <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-black/10 dark:border-white/15">
                        <span className="text-sm font-bold font-syncopate">€</span>
                        <span className={`text-4xl sm:text-5xl font-bold font-syncopate tracking-tight ${
                          plan.highlighted ? 'text-white' : 'text-avio-secondary-2'
                        }`}>
                          {currentPrice}
                        </span>
                        <span className={`text-xs font-space ${
                          plan.highlighted ? 'text-white/70' : 'text-avio-secondary-2/50'
                        }`}>
                          /mes
                        </span>
                      </div>

                      {/* Lista de características */}
                      <ul className="space-y-3.5 mb-10">
                        {plan.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm font-space">
                            <CheckCircle2 
                              size={16} 
                              className={`shrink-0 mt-0.5 ${
                                plan.highlighted ? 'text-white' : 'text-avio-primary'
                              }`} 
                            />
                            <span className={plan.highlighted ? 'text-white/90' : 'text-avio-secondary-2/80'}>
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Botón CTA del Plan */}
                    <a
                      href="#reservation"
                      className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 group cursor-pointer transition-all duration-300 ${
                        plan.highlighted
                          ? 'bg-avio-secondary-2 text-white hover:bg-white hover:text-avio-secondary-2 shadow-lg shadow-black/20'
                          : 'bg-avio-secondary-2 text-white hover:bg-avio-primary hover:text-white'
                      }`}
                    >
                      <span>{plan.buttonText}</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
