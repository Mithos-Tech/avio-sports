import { motion, useScroll, useTransform } from 'motion/react';
import { Instagram, Twitter, Linkedin, Youtube, ArrowUpRight, Mail, Phone } from 'lucide-react';
import React, { useRef } from 'react';

const FOOTER_LINKS = {
  modelos: [
    { name: 'Neon GT', href: '#catalog' },
    { name: 'Zenith S', href: '#catalog' },
    { name: 'Orion X', href: '#catalog' },
    { name: 'Concept One', href: '#catalog' }
  ],
  compania: [
    { name: 'Financiación', href: '#about-financing' },
    { name: 'Vende tu Coche', href: '#about-sell' },
    { name: 'Alquiler Premium', href: '#about-rental' },
    { name: 'Servicio Técnico', href: '#about-repair' }
  ],
  legal: ['Privacidad', 'Términos']
};

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const xTranslate = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={containerRef} className="bg-white pt-16 pb-12 relative overflow-hidden text-avio-secondary-2">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Massive Background Text - Framer Aesthetic with Parallax */}
      <motion.div 
        style={{ x: xTranslate }}
        className="absolute -bottom-10 left-0 select-none pointer-events-none opacity-[0.01] whitespace-nowrap"
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
                {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                  <motion.a 
                    key={i} 
                    href="#" 
                    whileHover={{ scale: 1.2, color: '#FF6321' }}
                    className="text-avio-secondary-2/30 transition-all duration-300"
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold tracking-[0.5em] text-avio-secondary-2/30 uppercase">Newsletter</h4>
              <div className="relative max-w-sm group">
                <input 
                  type="email" 
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-black/10 py-4 text-sm font-light focus:outline-none focus:border-avio-primary transition-all placeholder:text-black/20"
                />
                <button className="absolute right-0 bottom-4 text-avio-secondary-2/40 hover:text-avio-primary transition-colors">
                  <ArrowUpRight size={20} />
                </button>
              </div>
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
                    <a href={item.href} className="text-sm font-light text-avio-secondary-2/50 hover:text-avio-primary transition-all flex items-center gap-3 group">
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
                    <a href={item.href} className="text-sm font-light text-avio-secondary-2/50 hover:text-avio-primary transition-all flex items-center gap-3 group">
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
              © 2025 Avio by <span className="text-avio-primary font-medium">Inspyrio</span>. Todos los derechos reservados.
            </motion.p>
            
            <div className="flex items-center gap-8">
              {FOOTER_LINKS.legal.map((item) => (
                <a key={item} href="#" className="text-[11px] md:text-sm font-medium text-avio-secondary-2/40 hover:text-avio-secondary-2 transition-colors">{item}</a>
              ))}
            </div>
          </div>
          
          <motion.button 
            onClick={scrollToTop}
            whileHover={{ y: -5, color: '#FF6321' }}
            className="text-avio-secondary-2/40 transition-all p-2"
            aria-label="Volver arriba"
          >
            <ArrowUpRight size={24} />
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
