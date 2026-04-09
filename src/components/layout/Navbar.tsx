import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useRef } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Catalogo', href: '#catalog' },
    { name: 'Tendencias', href: '#trends' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Servicios', href: '#about-services' }
  ];

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: -120 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto glass rounded-full px-8 py-4 flex items-center justify-between pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/10">
        <div className="flex items-center gap-3">
          <img 
            src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1774306344/Avio_logo_ld4iur.svg" 
            alt="Avio Logo" 
            className="h-8 w-auto"
            referrerPolicy="no-referrer"
          />
          <span className="font-syncopate font-bold text-xl tracking-[0.2em] text-white">Avio</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="relative text-[11px] font-bold text-white/60 hover:text-white transition-colors uppercase tracking-[0.2em] group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-avio-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <motion.a 
            href="#cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block px-6 py-2 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-avio-primary hover:text-white transition-all duration-300"
          >
            Reservar
          </motion.a>
          
          <button 
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 glass rounded-2xl p-4 md:hidden border border-white/10 shadow-2xl pointer-events-auto overflow-hidden"
          >
            <div className="flex flex-col gap-1">
              <div className="flex justify-end mb-2">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-avio-primary p-1 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              {navLinks.map((item, i) => (
                <motion.a 
                  key={item.name} 
                  href={item.href}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative px-4 py-2 text-[10px] font-bold text-white hover:text-avio-primary transition-all uppercase tracking-[0.25em] rounded-xl hover:bg-white/5 group text-center"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="relative z-10">{item.name}</span>
                  <motion.div 
                    className="absolute inset-0 bg-avio-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    layoutId="mobile-hover"
                  />
                </motion.a>
              ))}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="h-[1px] bg-avio-primary/10 my-2 mx-2"
              />
              <motion.a 
                href="#cta"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                className="w-full py-3 bg-avio-primary text-black text-[9px] font-bold uppercase tracking-[0.3em] rounded-xl hover:bg-white hover:text-black transition-all duration-300 text-center"
                onClick={() => setIsOpen(false)}
              >
                Reservar
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
