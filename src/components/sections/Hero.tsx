import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect } from 'react';
import { ArrowRight, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Hero() {
  const scrollY = useMotionValue(0);
  const parallaxY = useSpring(useMotionValue(0), { damping: 25, stiffness: 700 });

  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY);
      parallaxY.set(window.scrollY * 0.3);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY, parallaxY]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-avio-primary">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-avio-secondary-1/30 rounded-full" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(43,150,217,0.85)_0%,rgba(22,71,115,1)_100%)]" />
        {/* Background Image with Gradient Opacity - Even more subtle to avoid interference */}
        <div 
          className="absolute inset-0 z-0 mix-blend-soft-light"
          style={{
            backgroundImage: 'url("https://res.cloudinary.com/dk1tkgjpj/image/upload/v1773773694/hero_ruc0eu.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: 'linear-gradient(to right, rgba(0,0,0,0.005) 0%, rgba(0,0,0,0.12) 100%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.005) 0%, rgba(0,0,0,0.12) 100%)',
          }}
        />
      </div>

      {/* Social Media Icons - Vertical Left - Positioned to respect margins */}
      <div className="absolute left-6 md:left-30 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-8 items-center">
        <div className="w-[1px] h-20 bg-white/20 mb-2" />
        {[
          { icon: <Instagram size={20} />, label: 'Instagram' },
          { icon: <Twitter size={20} />, label: 'Twitter' },
          { icon: <Facebook size={20} />, label: 'Facebook' }
        ].map((social, i) => (
          <motion.a
            key={social.label}
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + (i * 0.1) }}
            className="text-white/40 hover:text-white transition-colors duration-300"
          >
            {social.icon}
          </motion.a>
        ))}
        <div className="w-[1px] h-20 bg-white/20 mt-2" />
      </div>

      <div className="container mx-auto px-6 md:px-24 relative z-10 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-9xl font-bold mb-6 leading-[0.95] tracking-tighter"
            >
              AVIO <br />
              <span className="text-outline uppercase">SPORTS</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-xl text-sm md:text-base text-white/60 mb-10 font-light tracking-wide leading-relaxed"
            >
              Experimenta la cima del rendimiento eléctrico. Diseñado para aquellos que exigen más que un simple viaje.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <a 
                href="#catalog"
                className="px-10 py-5 md:px-12 md:py-6 border border-white/30 text-white font-bold rounded-full hover:bg-white hover:text-avio-secondary-2 transition-all duration-500 flex items-center gap-3 group inline-flex"
              >
                EXPLORAR
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50, scale: 1 }}
            animate={{ opacity: 1, x: 0, scale: 1.25 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="relative lg:translate-x-16"
          >
            <img 
              src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1773693647/car_white_qaiizh.png" 
              alt="AVIO White Car"
              className="w-full h-auto object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
