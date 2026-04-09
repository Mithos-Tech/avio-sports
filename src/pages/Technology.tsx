import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'motion/react';
import { Cpu, Battery, Zap, Globe } from 'lucide-react';

export default function Technology() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      <Navbar />
      <main className="pt-32">
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h1 className="text-5xl md:text-8xl font-bold mb-12 text-center">
              THE <span className="text-white">CORE</span> <br />
              OF INNOVATION
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-24">
              <div className="glass p-12 rounded-[3rem]">
                <Cpu size={48} className="text-white mb-8" />
                <h2 className="text-3xl font-bold mb-6">AVIO OS 3.0</h2>
                <p className="text-white/80 text-lg font-light leading-relaxed">
                  Our proprietary operating system manages everything from battery efficiency to autonomous driving with millisecond precision.
                </p>
              </div>
              <div className="glass p-12 rounded-[3rem]">
                <Battery size={48} className="text-white mb-8" />
                <h2 className="text-3xl font-bold mb-6">SOLID STATE</h2>
                <p className="text-white/80 text-lg font-light leading-relaxed">
                  Next-generation battery technology providing 800km+ range and 10-minute ultra-fast charging capabilities.
                </p>
              </div>
              <div className="glass p-12 rounded-[3rem]">
                <Zap size={48} className="text-white mb-8" />
                <h2 className="text-3xl font-bold mb-6">DUAL MOTOR</h2>
                <p className="text-white/80 text-lg font-light leading-relaxed">
                  Independent torque vectoring on each wheel for unparalleled handling and explosive acceleration.
                </p>
              </div>
              <div className="glass p-12 rounded-[3rem]">
                <Globe size={48} className="text-white mb-8" />
                <h2 className="text-3xl font-bold mb-6">CONNECTED</h2>
                <p className="text-white/80 text-lg font-light leading-relaxed">
                  Global satellite connectivity ensures your AVIO is always updated and reachable anywhere on Earth.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}
