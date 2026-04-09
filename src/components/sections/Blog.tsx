import { motion, AnimatePresence } from 'motion/react';
import { TRENDS } from '../../constants';
import { ArrowRight, Terminal, Plus } from 'lucide-react';
import React, { useState } from 'react';

export default function Blog() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="blog" className="py-40 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Terminal size={14} className="text-avio-primary" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-avio-primary uppercase">AVIO INSIGHTS</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-bold text-black tracking-tighter leading-[0.95] uppercase">
              AVIO <br />
              <span className="text-outline-dark">JOURNAL</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block text-right pb-2"
          >
            <p className="text-[10px] font-bold tracking-[0.3em] text-avio-primary uppercase mb-2">
              NOTICIAS Y ANÁLISIS
            </p>
          </motion.div>
        </div>

        {/* Interactive Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Left: Dynamic Image Display */}
          <div className="lg:col-span-6 relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden bg-gray-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <img 
                  src={TRENDS[activeIdx].image} 
                  alt={TRENDS[activeIdx].title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>
            </AnimatePresence>
            
            {/* Floating Info Tag */}
            <motion.div 
              key={`tag-${activeIdx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-10 left-10 z-10"
            >
              <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase">
                {TRENDS[activeIdx].date}
              </span>
            </motion.div>
          </div>

          {/* Right: Interactive List */}
          <div className="lg:col-span-6 flex flex-col">
            {TRENDS.map((post, idx) => (
              <motion.div
                key={post.id}
                onMouseEnter={() => setActiveIdx(idx)}
                className={`group relative py-10 border-b border-black/5 cursor-pointer transition-all duration-500 ${
                  activeIdx === idx ? 'opacity-100' : 'opacity-30 hover:opacity-100'
                }`}
              >
                <div className="flex items-start justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[10px] font-bold text-avio-primary">0{idx + 1}</span>
                      <div className={`h-[1px] bg-avio-primary transition-all duration-700 ${
                        activeIdx === idx ? 'w-12' : 'w-0'
                      }`} />
                    </div>
                    
                    <h3 className="text-3xl md:text-5xl font-bold text-black tracking-tighter leading-none uppercase mb-4 transition-transform duration-500 group-hover:translate-x-2">
                      {post.title}
                    </h3>
                    
                    <p className={`text-black/40 text-xs md:text-sm font-light leading-relaxed tracking-wide max-w-md transition-all duration-500 overflow-hidden ${
                      activeIdx === idx ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}>
                      {post.description}
                    </p>
                  </div>

                  <div className={`w-12 h-12 rounded-full border border-black/10 flex items-center justify-center transition-all duration-500 ${
                    activeIdx === idx ? 'bg-black text-white rotate-45' : 'bg-transparent text-black'
                  }`}>
                    <Plus size={20} />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* View All Button */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-12"
            >
              <a 
                href="#"
                className="flex items-center gap-4 group text-[10px] font-bold tracking-[0.3em] uppercase w-fit"
              >
                <span className="text-black/40 group-hover:text-black transition-colors">VER TODAS LAS PUBLICACIONES</span>
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-avio-primary group-hover:border-avio-primary group-hover:text-avio-secondary-2 transition-all duration-500">
                  <ArrowRight size={16} />
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
