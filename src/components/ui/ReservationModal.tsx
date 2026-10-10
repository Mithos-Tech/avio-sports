import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, ArrowRight, ShieldCheck, Calendar, Clock, MapPin } from 'lucide-react';
import { VEHICLES } from '../../constants';
import { Vehicle } from '../../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'reserve' | 'configure';
  initialVehicleId?: string;
}

const SHOWROOMS = [
  'Madrid — Barrio de Salamanca',
  'Barcelona — Passeig de Gràcia',
  'Milán — Via Montenapoleone',
  'París — Place Vendôme'
];

export default function ReservationModal({
  isOpen,
  onClose,
  initialMode = 'reserve',
  initialVehicleId
}: ReservationModalProps) {
  const [activeTab, setActiveTab] = useState<'reserve' | 'configure'>(initialMode);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(() => {
    const found = VEHICLES.find(v => v.id === initialVehicleId);
    return found || VEHICLES[0];
  });
  
  // Configure Options State
  const [selectedColor, setSelectedColor] = useState<'obsidian' | 'ice' | 'electric'>('obsidian');
  const [selectedInterior, setSelectedInterior] = useState<'leather' | 'vegan' | 'carbon'>('carbon');
  const [autopilotTier, setAutopilotTier] = useState<'neural' | 'autonomous'>('neural');

  // Reservation Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedShowroom, setSelectedShowroom] = useState(SHOWROOMS[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync tab if initialMode changes
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialMode);
      setIsSubmitted(false);
    }
  }, [isOpen, initialMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 select-none">
        {/* Backdrop with ultra-soft blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-neutral-950 text-white border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] z-10 flex flex-col scrollbar-thin scrollbar-thumb-white/10"
        >
          {/* Top Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-10 py-4 sm:py-5 bg-neutral-950/85 backdrop-blur-md border-b border-white/10">
            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-white/5 rounded-full border border-white/10">
              <button
                type="button"
                onClick={() => { setActiveTab('reserve'); setIsSubmitted(false); }}
                className={`relative px-3 sm:px-6 py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-widest uppercase transition-all duration-300 ${
                  activeTab === 'reserve'
                    ? 'text-neutral-950'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {activeTab === 'reserve' && (
                  <motion.div
                    layoutId="modal-active-tab"
                    className="absolute inset-0 bg-white rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 hidden sm:inline">Reservar Test Drive</span>
                <span className="relative z-10 sm:hidden">Reservar</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('configure'); setIsSubmitted(false); }}
                className={`relative px-3 sm:px-6 py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-widest uppercase transition-all duration-300 ${
                  activeTab === 'configure'
                    ? 'text-neutral-950'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {activeTab === 'configure' && (
                  <motion.div
                    layoutId="modal-active-tab"
                    className="absolute inset-0 bg-white rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 hidden sm:inline">Configurar Modelo</span>
                <span className="relative z-10 sm:hidden">Configurar</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Cerrar ventana"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200"
            >
              <X size={17} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-10 flex-1">
            {isSubmitted ? (
              /* Success / Concierge Confirmation View */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center max-w-lg mx-auto space-y-6"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-avio-primary/20 border border-avio-primary/40 flex items-center justify-center text-avio-primary shadow-[0_0_40px_rgba(43,150,217,0.3)]">
                  <Check size={36} strokeWidth={2.5} />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-avio-primary">
                    CONFIRMACIÓN OFICIAL AVIO
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-bold font-syncopate tracking-tight">
                    {activeTab === 'reserve' ? 'TEST DRIVE AGENDADO' : 'CONFIGURACIÓN GUARDADA'}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto pt-2">
                    {activeTab === 'reserve'
                      ? `Gracias, ${fullName || 'estimado conductor'}. Tu solicitud para experimentar el ${selectedVehicle.model} en ${selectedShowroom} ha sido procesada con éxito.`
                      : `Tu perfil de personalización para el ${selectedVehicle.model} ha sido creado con éxito.`}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-left text-xs space-y-2.5">
                  <div className="flex justify-between text-white/50">
                    <span>Modelo Seleccionado:</span>
                    <span className="text-white font-bold">{selectedVehicle.model} ({selectedVehicle.price})</span>
                  </div>
                  <div className="flex justify-between text-white/50">
                    <span>Showroom de entrega:</span>
                    <span className="text-white font-medium">{selectedShowroom}</span>
                  </div>
                  <div className="flex justify-between text-white/50">
                    <span>Asesor Concierge:</span>
                    <span className="text-avio-primary font-medium">Asignado dentro de las próximas 2 horas</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="px-8 py-3.5 rounded-full bg-white text-neutral-950 font-bold text-xs tracking-[0.2em] uppercase hover:bg-white/90 transition-all shadow-xl"
                >
                  Entendido, Cerrar
                </button>
              </motion.div>
            ) : (
              <div>
                {/* Vehicle Selector Strip */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-white/60">
                      1. Selecciona tu Vehículo
                    </span>
                    <span className="text-xs font-mono text-avio-primary font-bold">
                      {selectedVehicle.price}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                    {VEHICLES.map((vehicle) => {
                      const isSelected = selectedVehicle.id === vehicle.id;
                      return (
                        <button
                          key={vehicle.id}
                          type="button"
                          onClick={() => setSelectedVehicle(vehicle)}
                          className={`p-3 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group ${
                            isSelected
                              ? 'border-avio-primary bg-avio-primary/10 shadow-[0_0_25px_rgba(43,150,217,0.25)]'
                              : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20'
                          }`}
                        >
                          <div className="aspect-[4/3] rounded-lg overflow-hidden mb-2 bg-black/40">
                            <img
                              src={vehicle.image}
                              alt={vehicle.model}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="text-[10px] font-bold uppercase truncate tracking-wider text-white">
                            {vehicle.model}
                          </div>
                          <div className="text-[9px] text-white/40 font-mono">
                            {vehicle.range}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tab 1: Reservar Test Drive */}
                {activeTab === 'reserve' && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border-t border-white/10 pt-6">
                      <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-white/60 block mb-4">
                        2. Tus Datos de Contacto & Showroom
                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold tracking-widest uppercase text-white/50 mb-2">
                            Nombre Completo
                          </label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Ej. Carlos Mendoza"
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-avio-primary focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold tracking-widest uppercase text-white/50 mb-2">
                            Correo Corporativo / Personal
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="carlos@ejemplo.com"
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-avio-primary focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold tracking-widest uppercase text-white/50 mb-2">
                            Teléfono Directo
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+34 600 000 000"
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-avio-primary focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold tracking-widest uppercase text-white/50 mb-2">
                            Showroom Privado
                          </label>
                          <select
                            value={selectedShowroom}
                            onChange={(e) => setSelectedShowroom(e.target.value)}
                            className="w-full px-4 py-3.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:border-avio-primary focus:outline-none transition-colors"
                          >
                            {SHOWROOMS.map((showroom) => (
                              <option key={showroom} value={showroom} className="bg-neutral-950">
                                {showroom}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Guarantees */}
                    <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-white/60 text-[11px]">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-avio-primary" />
                        <span>Atención personalizada con Concierge VIP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-avio-primary" />
                        <span>Prueba inmersiva de 60 minutos sin compromiso</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-white text-neutral-950 font-bold text-xs tracking-wider sm:tracking-[0.25em] uppercase hover:bg-avio-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-xl"
                      >
                        <span className="hidden sm:inline">Confirmar Reserva de Test Drive</span>
                        <span className="sm:hidden">Confirmar Reserva</span>
                        <ArrowRight size={16} />
                      </motion.button>
                    </div>
                  </form>
                )}

                {/* Tab 2: Configurar Modelo */}
                {activeTab === 'configure' && (
                  <div className="space-y-6">
                    <div className="border-t border-white/10 pt-6">
                      <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-white/60 block mb-4">
                        2. Acabados y Personalización ({selectedVehicle.model})
                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* Color Exterior */}
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                          <label className="text-[10px] font-bold tracking-widest uppercase text-white/50 block">
                            Pintura Exterior
                          </label>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setSelectedColor('obsidian')}
                              className={`w-9 h-9 rounded-full bg-black border-2 transition-all ${
                                selectedColor === 'obsidian' ? 'border-avio-primary scale-110 shadow-[0_0_15px_rgba(43,150,217,0.5)]' : 'border-white/20'
                              }`}
                              title="Obsidian Black"
                            />
                            <button
                              type="button"
                              onClick={() => setSelectedColor('ice')}
                              className={`w-9 h-9 rounded-full bg-slate-200 border-2 transition-all ${
                                selectedColor === 'ice' ? 'border-avio-primary scale-110 shadow-[0_0_15px_rgba(43,150,217,0.5)]' : 'border-white/20'
                              }`}
                              title="Glacier Ice White"
                            />
                            <button
                              type="button"
                              onClick={() => setSelectedColor('electric')}
                              className={`w-9 h-9 rounded-full bg-blue-600 border-2 transition-all ${
                                selectedColor === 'electric' ? 'border-white scale-110 shadow-[0_0_15px_rgba(43,150,217,0.5)]' : 'border-white/20'
                              }`}
                              title="Electric Cyber Blue"
                            />
                          </div>
                          <span className="text-xs text-white/70 block capitalize font-mono">
                            {selectedColor === 'obsidian' ? 'Obsidian Black Mate' : selectedColor === 'ice' ? 'Glacier Pearl' : 'Avio Cyber Blue'}
                          </span>
                        </div>

                        {/* Habitáculo */}
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                          <label className="text-[10px] font-bold tracking-widest uppercase text-white/50 block">
                            Interior & Tapicería
                          </label>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedInterior('carbon')}
                              className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
                                selectedInterior === 'carbon' ? 'bg-avio-primary/20 border-avio-primary text-white' : 'border-white/10 text-white/50'
                              }`}
                            >
                              Carbon Tech
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedInterior('leather')}
                              className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
                                selectedInterior === 'leather' ? 'bg-avio-primary/20 border-avio-primary text-white' : 'border-white/10 text-white/50'
                              }`}
                            >
                              Piel Nappa
                            </button>
                          </div>
                        </div>

                        {/* Sistema de Piloto Autónomo */}
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                          <label className="text-[10px] font-bold tracking-widest uppercase text-white/50 block">
                            Nivel Autónomo
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setAutopilotTier('neural')}
                              className={`px-2.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border text-center ${
                                autopilotTier === 'neural' ? 'bg-avio-primary/20 border-avio-primary text-white' : 'border-white/10 text-white/50'
                              }`}
                            >
                              <span className="hidden xl:inline">Neural 3.0 (Incluido)</span>
                              <span className="xl:hidden">Neural 3.0</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setAutopilotTier('autonomous')}
                              className={`px-2.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border text-center ${
                                autopilotTier === 'autonomous' ? 'bg-avio-primary/20 border-avio-primary text-white' : 'border-white/10 text-white/50'
                              }`}
                            >
                              <span className="hidden xl:inline">Autónomo N4 (+$6k)</span>
                              <span className="xl:hidden">Nivel 4 (+6k)</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Specs summary */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="text-[9px] uppercase tracking-widest text-white/40">Aceleración</div>
                          <div className="text-sm font-bold font-mono text-white">{selectedVehicle.acceleration}</div>
                        </div>
                        <div>
                          <div className="text-[9px] uppercase tracking-widest text-white/40">Autonomía</div>
                          <div className="text-sm font-bold font-mono text-white">{selectedVehicle.range}</div>
                        </div>
                        <div>
                          <div className="text-[9px] uppercase tracking-widest text-white/40">Velocidad Máx</div>
                          <div className="text-sm font-bold font-mono text-white">{selectedVehicle.topSpeed}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[9px] uppercase tracking-widest text-white/40">Precio Estimado</div>
                        <div className="text-lg font-bold font-mono text-avio-primary">
                          {autopilotTier === 'autonomous' ? `${selectedVehicle.price} + $6,000` : selectedVehicle.price}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <motion.button
                        type="button"
                        onClick={() => {
                          setActiveTab('reserve');
                        }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-3.5 sm:py-4 px-6 rounded-full bg-white text-neutral-950 font-bold text-xs tracking-wider sm:tracking-[0.2em] uppercase hover:bg-avio-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-xl"
                      >
                        <span className="hidden md:inline">Agendar Test Drive con Configuración</span>
                        <span className="md:hidden">Agendar Test Drive</span>
                        <ArrowRight size={16} />
                      </motion.button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(true);
                        }}
                        className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/20 text-white hover:bg-white/10 font-bold text-xs tracking-wider sm:tracking-[0.2em] uppercase transition-all text-center"
                      >
                        <span className="hidden sm:inline">Guardar Presupuesto</span>
                        <span className="sm:hidden">Guardar</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
