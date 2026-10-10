import { motion, useScroll, useTransform } from 'motion/react';
import { Instagram, Twitter, Linkedin, Youtube, ArrowUp, ArrowUpRight, Mail, Phone, CheckCircle2 } from 'lucide-react';
import React, { useRef, useState } from 'react';

const FOOTER_LINKS = {
  modelos: [
    { name: 'Neon GT', href: '#catalog' },
    { name: 'Zenith S', href: '#catalog' },
    { name: 'Orion X', href: '#catalog' },
    { name: 'Pulsar R', href: '#catalog' }
  ],
  compania: [
    { name: 'Nosotros', href: '#about' },
    { name: 'Servicios', href: '#services' },
    { name: 'Financiación', href: '#services-financing' },
    { name: 'Vende tu Coche', href: '#services-sell' },
    { name: 'Alquiler Premium', href: '#services-rental' },
    { name: 'Servicio Técnico', href: '#services-repair' }
  ],
  legal: [
    { name: 'Privacidad', href: '#legal/privacy' },
    { name: 'Términos', href: '#legal/terms' },
    { name: 'Normativa de IA', href: '#legal/ai' }
  ]
};

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const xTranslate = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Newsletter State
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Introduce un email corporativo válido.');
      return;
    }
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
  };

  const scrollToTop = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      // Salvaguarda para navegadores móviles si la animación se cancela o bloquea
      setTimeout(() => {
        if (window.scrollY > 40) {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
      }, 700);
    } catch {
      window.scrollTo(0, 0);
    }
  };

  const handleNavigation = (href: string, e: React.MouseEvent) => {
    const currentHash = window.location.hash || '#home';

    // Para enlaces de servicios con subsección (#services-financing, etc.)
    if (href.startsWith('#services-')) {
      e.preventDefault();
      const serviceId = href.replace('#services-', '');
      if (currentHash.startsWith('#services')) {
        const el = document.getElementById(serviceId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      } else {
        window.location.hash = href;
      }
      return;
    }

    // Para catálogo
    if (href === '#catalog') {
      if (currentHash === '#home' || currentHash === '') {
        e.preventDefault();
        const el = document.querySelector('#catalog');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.location.hash = '#catalog';
      }
      return;
    }

    // Si ya estamos en la página del enlace, hacemos scroll arriba suave
    if (href === currentHash) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  };

  return (
    <footer ref={containerRef} className="bg-white pt-16 pb-12 relative overflow-hidden text-avio-secondary-2">
      {/* Massive Background Text - Desktop Only Framer Aesthetic with Parallax */}
      <motion.div 
        style={{ x: xTranslate }}
        className="hidden lg:block absolute -bottom-10 left-0 select-none pointer-events-none opacity-[0.015] whitespace-nowrap"
      >
        <span className="font-syncopate font-bold text-[28vw] leading-none tracking-tighter uppercase stroke-text-light">
          Avio Avio Avio
        </span>
      </motion.div>

      {/* Top Decorative Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-12">
          
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <img 
                  src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1774306799/Logo_avio_rkbaqy.svg" 
                  alt="Avio" 
                  className="h-8 w-auto"
                  referrerPolicy="no-referrer"
                />
                <span className="font-syncopate font-bold text-2xl tracking-[0.25em] uppercase">Avio</span>
              </motion.div>
              <p className="text-sm font-light text-avio-secondary-2/60 leading-relaxed tracking-wide max-w-sm">
                Redefiniendo el futuro de la movilidad eléctrica con diseño de vanguardia y tecnología sin precedentes.
              </p>
              
              <div className="flex gap-8 pt-4">
                {[
                  { Icon: Instagram, href: "https://instagram.com" },
                  { Icon: Twitter, href: "https://twitter.com" },
                  { Icon: Linkedin, href: "https://linkedin.com" },
                  { Icon: Youtube, href: "https://youtube.com" }
                ].map(({ Icon, href }, i) => (
                  <motion.a 
                    key={i} 
                    href={href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, color: '#2B96D9' }}
                    className="text-avio-secondary-2/30 transition-all duration-300"
                    aria-label={`Enlace a red social ${i + 1}`}
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-bold tracking-[0.5em] text-avio-secondary-2/30 uppercase">Newsletter</h4>
              {isSubscribed ? (
                <div className="flex items-center gap-2 py-3 text-xs text-avio-primary font-bold tracking-wider">
                  <CheckCircle2 size={16} />
                  <span>Suscripción confirmada con cifrado de datos.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="relative max-w-sm group">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email corporativo"
                    className="w-full bg-transparent border-b border-black/10 py-4 text-sm font-light focus:outline-none focus:border-avio-primary transition-all placeholder:text-black/20"
                    aria-label="Introduce tu email para newsletter"
                  />
                  <button 
                    type="submit"
                    aria-label="Enviar suscripción"
                    className="absolute right-0 bottom-4 text-avio-secondary-2/40 hover:text-avio-primary transition-colors cursor-pointer"
                  >
                    <ArrowUpRight size={20} />
                  </button>
                  {errorMsg && (
                    <p className="text-[10px] text-red-500 mt-1 font-space">{errorMsg}</p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-8">
              <h4 className="text-[10px] font-bold tracking-[0.5em] text-avio-secondary-2/30 uppercase">Modelos</h4>
              <ul className="space-y-4">
                {FOOTER_LINKS.modelos.map((item, i) => (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a 
                      href={item.href} 
                      onClick={(e) => handleNavigation(item.href, e)}
                      className="text-sm font-light text-avio-secondary-2/50 hover:text-avio-primary transition-all flex items-center gap-3 group cursor-pointer"
                    >
                      <span className="w-0 h-[1px] bg-avio-primary group-hover:w-4 transition-all duration-500" />
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] font-bold tracking-[0.5em] text-avio-secondary-2/30 uppercase">Servicios</h4>
              <ul className="space-y-4">
                {FOOTER_LINKS.compania.map((item, i) => (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a 
                      href={item.href} 
                      onClick={(e) => handleNavigation(item.href, e)}
                      className="text-sm font-light text-avio-secondary-2/50 hover:text-avio-primary transition-all flex items-center gap-3 group cursor-pointer"
                    >
                      <span className="w-0 h-[1px] bg-avio-primary group-hover:w-4 transition-all duration-500" />
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[10px] font-bold tracking-[0.5em] text-avio-secondary-2/30 uppercase">Oficinas</h4>
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-avio-secondary-2/20 uppercase tracking-widest">Sede Central</p>
                <p className="text-sm font-light text-avio-secondary-2/50 leading-relaxed tracking-wide">
                  Av. de la Innovación 450<br />Madrid, España
                </p>
              </div>
              
              <div className="space-y-4 pt-2">
                <a href="tel:+34900123456" className="flex items-center gap-4 text-sm font-light text-avio-secondary-2/50 hover:text-avio-primary transition-colors group">
                  <Phone size={16} className="text-avio-secondary-2/20 group-hover:text-avio-primary" />
                  +34 900 123 456
                </a>
                <a href="mailto:hello@avio.com" className="flex items-center gap-4 text-sm font-light text-avio-secondary-2/50 hover:text-avio-primary transition-colors group">
                  <Mail size={16} className="text-avio-secondary-2/20 group-hover:text-avio-primary" />
                  hello@avio.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Large Centered Brand Name */}
        <div className="flex justify-center mb-4">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-syncopate font-bold text-[18vw] leading-none tracking-[-0.05em] uppercase text-[#E0F2FE] opacity-40 select-none"
          >
            Avio
          </motion.h2>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-black/5">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[11px] md:text-sm font-light text-avio-secondary-2/40"
            >
              © 2026 Avio by <span className="text-avio-primary font-medium">Inspyrio Studio</span>. Todos los derechos reservados.
            </motion.p>
            
            <div className="flex items-center gap-6 md:gap-8 flex-wrap">
              {FOOTER_LINKS.legal.map((item) => (
                <a
                  key={item.name} 
                  href={item.href}
                  onClick={() => {
                    document.documentElement.style.scrollBehavior = 'auto';
                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                  }}
                  className="text-[11px] md:text-sm font-medium text-avio-secondary-2/40 hover:text-avio-secondary-2 transition-colors cursor-pointer"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          
          <motion.button 
            type="button"
            onClick={scrollToTop}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-full border border-black/10 hover:border-avio-primary bg-white text-avio-secondary-2/60 hover:text-white hover:bg-avio-primary transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md cursor-pointer active:scale-95 group"
            aria-label="Volver arriba"
            title="Volver al inicio"
          >
            <ArrowUp size={19} className="group-hover:-translate-y-0.5 transition-transform duration-300 stroke-[2.2]" />
          </motion.button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stroke-text-light {
          -webkit-text-stroke: 1px rgba(0, 0, 0, 0.1);
          color: transparent;
        }
      `}} />
    </footer>
  );
}
