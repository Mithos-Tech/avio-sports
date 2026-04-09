import { motion } from 'motion/react';
import React from 'react';
import { ArrowUpRight, Zap, Cpu, Share2, Leaf } from 'lucide-react';

const TRENDS_DATA = [
  {
    id: 't1',
    keyword: 'SOLID STATE',
    tag: 'ENERGÍA',
    image: 'https://res.cloudinary.com/dk1tkgjpj/image/upload/v1774481340/t_01_xnphce.webp',
    icon: <Zap size={18} />,
    span: 'md:col-span-7'
  },
  {
    id: 't2',
    keyword: 'V2X CONNECT',
    tag: 'RED',
    image: 'https://res.cloudinary.com/dk1tkgjpj/image/upload/v1774481339/t_02_ezmgkd.webp',
    icon: <Share2 size={18} />,
    span: 'md:col-span-5'
  },
  {
    id: 't3',
    keyword: 'NEURAL DRIVE',
    tag: 'IA',
    image: 'https://res.cloudinary.com/dk1tkgjpj/image/upload/v1774481339/t_03_y24ar7.webp',
    icon: <Cpu size={18} />,
    span: 'md:col-span-5'
  },
  {
    id: 't4',
    keyword: 'BIO-LUXURY',
    tag: 'MATERIA',
    image: 'https://res.cloudinary.com/dk1tkgjpj/image/upload/v1774481339/t_04_nnoqze.webp',
    icon: <Leaf size={18} />,
    span: 'md:col-span-7'
  }
];

export default function Trends() {
  return (
    <section id="trends" className="py-40 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Standard Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Zap size={14} className="text-avio-primary" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-avio-primary uppercase">AVIO LABS</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-bold text-black tracking-tighter leading-[0.95] uppercase">
              FUTURO <br />
              <span className="text-outline-dark">ELÉCTRICO</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-right"
          >
            <p className="text-[10px] font-bold tracking-[0.3em] text-avio-primary uppercase">
              INNOVACIÓN SIN LÍMITES
            </p>
          </motion.div>
        </div>

        {/* Balanced Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {TRENDS_DATA.map((trend, i) => (
            <motion.div
              key={trend.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-[2rem] bg-gray-50 h-[400px] md:h-[450px] ${trend.span}`}
            >
              {/* Image with subtle zoom */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.img 
                  src={trend.image} 
                  alt={trend.keyword}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                {/* Overlay with subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[8px] font-bold text-white tracking-widest uppercase">
                    {trend.tag}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-avio-primary group-hover:border-avio-primary group-hover:text-avio-secondary-2 transition-all duration-500">
                    {trend.icon}
                  </div>
                </div>
                
                <div className="flex justify-between items-end">
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tighter leading-none uppercase">
                    {trend.keyword}
                  </h3>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>

              {/* Hover Border Accent */}
              <div className="absolute inset-0 border-2 border-avio-primary/0 group-hover:border-avio-primary/30 rounded-[2rem] transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
