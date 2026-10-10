import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Scale, 
  ShieldCheck, 
  Cpu, 
  Search, 
  Printer, 
  Share2, 
  Check, 
  ArrowLeft, 
  AlertCircle, 
  Mail, 
  FileCheck,
  CheckCircle2
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export type LegalDocType = 'terms' | 'privacy' | 'ai';

interface LegalProps {
  initialHash?: string;
}

export default function Legal({ initialHash }: LegalProps) {
  // Determine active document from hash or prop
  const getDocFromHash = (hashStr?: string): LegalDocType => {
    const h = hashStr || window.location.hash;
    if (h.includes('terms') || h.includes('terminos')) return 'terms';
    if (h.includes('ai') || h.includes('normativa') || h.includes('ia')) return 'ai';
    return 'privacy';
  };

  const [activeDoc, setActiveDoc] = useState<LegalDocType>(() => getDocFromHash(initialHash));
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedClause, setCopiedClause] = useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  
  // ARCO+ interactive state
  const [selectedArcoRight, setSelectedArcoRight] = useState<'access' | 'rectification' | 'erasure' | 'portability'>('access');
  const [arcoFormEmail, setArcoFormEmail] = useState('');
  const [arcoFormSuccess, setArcoFormSuccess] = useState(false);

  // Sync state with URL hash and ensure instantaneous scroll to top without bottom-to-top animation
  useEffect(() => {
    const handleHash = () => {
      const doc = getDocFromHash();
      setActiveDoc(doc);
    };

    // Instant reset to top on mount
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const raf = requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = '';
    });

    window.addEventListener('hashchange', handleHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  const switchDoc = (doc: LegalDocType) => {
    setActiveDoc(doc);
    window.location.hash = `#legal/${doc}`;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = '';
    });
  };

  const copyClauseLink = (clauseId: string) => {
    const fullUrl = `${window.location.origin}/#legal/${activeDoc}#${clauseId}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedClause(clauseId);
      setTimeout(() => setCopiedClause(null), 2500);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleArcoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!arcoFormEmail) return;
    setArcoFormSuccess(true);
    setTimeout(() => {
      setArcoFormSuccess(false);
      setArcoFormEmail('');
    }, 4000);
  };

  // Structured content for each document in the white & celeste brand
  const documents = useMemo(() => ({
    terms: {
      id: 'terms',
      title: 'Términos y Condiciones de Uso',
      kicker: 'Marco Regulatorio Internacional · Edición Oficial 2026',
      summary: 'Condiciones generales de acceso, uso de plataforma digital, especificaciones técnicas de vehículos, reservas preferentes y propiedad intelectual de AVIO Sports.',
      icon: Scale,
      sections: [
        {
          id: 'terms-01',
          number: '01',
          title: 'Preámbulo y Ámbito de Aplicación',
          content: `El presente contrato regula el acceso y utilización del ecosistema digital AVIO Sports S.L., entidad debidamente constituida conforme a las leyes del Reino de España y la Unión Europea, con sede en Av. de la Innovación 450, Madrid, en estrecha colaboración creativa y tecnológica con Inspyrio Studio.

El acceso, navegación o reserva en este portal implica la aceptación tácita, incondicional e íntegra de la totalidad de las cláusulas aquí estipuladas. Ninguna modificación verbal surtirá efecto a menos que conste por escrito debidamente firmada por los apoderados legales de la compañía.`,
          keyPoints: [
            'Aplicable en todo el territorio de la Unión Europea y mercados homologados.',
            'Integración de tecnologías desarrolladas en conjunto con Inspyrio Studio.',
            'Validez jurídica renovada para el ejercicio fiscal 2026.'
          ]
        },
        {
          id: 'terms-02',
          number: '02',
          title: 'Pre-reservas, Depósitos y Líneas de Fabricación',
          content: `Los modelos de alta gama exhibidos en nuestra plataforma (Neon GT, Zenith S, Orion X, Pulsar R) se ensamblan bajo pedidos con asignación de slot de producción individualizado. 

La confirmación de una pre-reserva confiere al usuario una prioridad preferente en el calendario de ensamble. El depósito inicial se mantiene en cuentas fiduciarias auditadas y es 100% reembolsable durante un período de gracia de 30 días naturales posteriores a la asignación de número VIN preliminar. Transcurrido dicho plazo, se formalizará el contrato de adquisición vehicular definitivo.`,
          keyPoints: [
            'Depósito en custodia fiduciaria con auditoría bancaria independiente.',
            'Periodo de desistimiento y reembolso íntegro de 30 días.',
            'Entrega personalizada en centros oficiales AVIO Performance o a domicilio certificado.'
          ]
        },
        {
          id: 'terms-03',
          number: '03',
          title: 'Propiedad Intelectual, Software Embarcado y Patentes',
          content: `Todos los derechos de propiedad industrial y derechos de autor sobre la arquitectura aerodinámica, modelos 3D, código fuente de AVIO OS, renders hiperrealistas, interfaces táctiles y marcas distintivas pertenecen de manera privativa a AVIO Sports y a Inspyrio Studio.

Se prohíbe expresamente cualquier ingeniería inversa, extracción desautorizada de telemetría, copia de diseños o explotación comercial no licenciada. Las actualizaciones inalámbricas (OTA) se distribuyen bajo licencia de usuario final no transferible y de uso exclusivo en la unidad vehicular autorizada.`,
          keyPoints: [
            'Protección bajo el Tratado de la OMPI y directivas europeas de software.',
            'Licencia OTA limitada al chasis original registrado.',
            'Diseño de interfaces e identidad visual registrados por Inspyrio Studio.'
          ]
        },
        {
          id: 'terms-04',
          number: '04',
          title: 'Garantía Estructural y Celdas de Estado Sólido',
          content: `Cada unidad AVIO cuenta con una garantía integral de fábrica sobre el sistema de tracción eléctrica y el paquete de celdas de batería de estado sólido por un término de 10 años o 250.000 kilómetros (lo que suceda primero), garantizando una retención mínima de capacidad útil del 85%.

La garantía permanece supeditada al cumplimiento del plan de mantenimiento periódico programado en talleres oficiales AVIO y al no reacondicionamiento de software no homologado.`,
          keyPoints: [
            'Garantía de batería: 10 años / 250.000 km al 85% de capacidad mínima.',
            'Asistencia en carretera 24/7 con cobertura en 42 países.',
            'Soporte técnico y telemetría predictiva incluida de serie.'
          ]
        },
        {
          id: 'terms-05',
          number: '05',
          title: 'Jurisdicción y Arbitraje Internacional',
          content: `Para la resolución de cualquier discrepancia derivada de la interpretación de los presentes términos, las partes se someten voluntariamente a los Juzgados y Tribunales de la Villa de Madrid (España), con renuncia expresa a cualquier otro fuero que pudiera corresponderles, sin perjuicio de los derechos imperativos que asistan al consumidor final conforme a la normativa comunitaria europea.`,
          keyPoints: [
            'Sometimiento a la ley sustantiva española y comunitaria europea.',
            'Vía de mediación previa telemática a través de legal@avio.com.',
            'Plataforma de Resolución de Litigios en Línea (ODR) de la Comisión Europea.'
          ]
        }
      ]
    },
    privacy: {
      id: 'privacy',
      title: 'Política de Privacidad y Protección de Datos',
      kicker: 'Conformidad Plena GDPR (UE 2016/679) & LOPD-GDD · 2026',
      summary: 'Mecanismos de tratamiento, cifrado criptográfico de grado automotriz, salvaguarda de datos telemáticos vehiculares y ejercicio soberano de derechos ARCO+.',
      icon: ShieldCheck,
      sections: [
        {
          id: 'privacy-01',
          number: '01',
          title: 'Responsable del Tratamiento y DPO',
          content: `AVIO Sports S.L. asume el rol de Responsable del Tratamiento de los datos personales suministrados a través de este portal y del sistema conectado AVIO OS. Hemos designado a un Delegado de Protección de Datos (DPO) certificado, accesible de manera directa en dpo@avio.com.

El tratamiento de datos respeta escrupulosamente los principios de licitud, lealtad, transparencia, limitación de la finalidad, minimización de datos, exactitud, limitación del plazo de conservación e integridad confidencial.`,
          keyPoints: [
            'DPO independiente certificado según el Esquema AEPD.',
            'Canal de respuesta prioritaria garantizado en menos de 48 horas.',
            'Auditorías bianuales de impacto en protección de datos (EIPD).'
          ]
        },
        {
          id: 'privacy-02',
          number: '02',
          title: 'Clasificación de Datos Recabados y Finalidad',
          content: `Distinguimos tres categorías esenciales de datos:
1. Datos Identificativos y de Contacto: Nombres, números de teléfono y direcciones de correo electrónico recopilados para pruebas de conducción (Test Drive), suscripción al boletín confidencial y gestión de compras.
2. Datos Telemáticos Vehiculares: Parámetros anónimos de eficiencia de batería, régimen de giro motriz y temperatura de inversores, procesados de forma disociada para mejorar los algoritmos dinámicos.
3. Datos de Navegación y Conectividad: Direcciones IP anonimizadas, datos técnicos de sesión y métricas de rendimiento de la interfaz para garantizar estabilidad de servidor.`,
          keyPoints: [
            'Disociación irreversible entre telemetría del vehículo y la identidad del propietario.',
            'Prohibición expresa de comercialización de datos a brokers o aseguradoras.',
            'Almacenamiento segregado en centros de datos ubicados dentro del Espacio Económico Europeo.'
          ]
        },
        {
          id: 'privacy-03',
          number: '03',
          title: 'Cifrado Criptográfico y Seguridad de Grado Automotriz',
          content: `Toda comunicación entre el usuario, el portal web y los servidores centrales se efectúa bajo el protocolo TLS 1.3 con cifrado ECDHE-RSA-AES256-GCM. 

Las claves de cifrado se gestionan en Módulos de Seguridad de Hardware (HSM) dedicados con certificación FIPS 140-3 Nivel 3. En caso de detección de incidentes de seguridad que puedan entrañar riesgo para los derechos y libertades de las personas físicas, AVIO lo notificará a la autoridad competente y a los afectados en un plazo no superior a 72 horas.`,
          keyPoints: [
            'Protocolo TLS 1.3 con secreto perfecto hacia adelante (PFS).',
            'Almacenamiento en reposo cifrado mediante AES-256-XTS.',
            'Cumplimiento de la norma ISO/IEC 27001 e ISO/SAE 21434.'
          ]
        },
        {
          id: 'privacy-04',
          number: '04',
          title: 'Matriz de Ejercicio de Derechos ARCO+ (Soberanía Digital)',
          content: `Usted ostenta el control irrestricto sobre sus datos personales. Conforme a los artículos 15 a 22 del GDPR, tiene derecho a solicitar:
• Acceso: Conocer qué datos exactos conservamos y para qué fines.
• Rectificación: Subsanar datos erróneos o incompletos.
• Supresión (Derecho al Olvido): Eliminación completa de sus registros de nuestras bases de datos comerciales.
• Oposición y Limitación: Suspender temporalmente el procesamiento de sus registros.
• Portabilidad: Recibir sus datos en formato estructurado e interoperable (JSON/XML).`,
          keyPoints: [
            'Ejercicio 100% gratuito sin requerir justificación compleja.',
            'Resolución expedita en un plazo máximo de 30 días.',
            'Formulario automatizado de solicitud interactiva disponible abajo.'
          ]
        },
        {
          id: 'privacy-05',
          number: '05',
          title: 'Política de Cookies y Almacenamiento Local',
          content: `Nuestra plataforma prescinde deliberadamente de cookies invasivas de terceros, redes de rastreo publicitario trans-sitio o fingerprinting de dispositivos. 

Únicamente empleamos cookies técnicas estrictamente necesarias para la sesión segura y preferencias de diseño (por ejemplo, recordar la selección de modelo o estado de consentimiento legal), las cuales no almacenan información de identificación personal.`,
          keyPoints: [
            'Cero píxeles de rastreo invasivo de redes publicitarias externas.',
            'Duración máxima de cookies de sesión: 12 meses renovables.',
            'Control de consentimiento granular modificable en cualquier instante.'
          ]
        }
      ]
    },
    ai: {
      id: 'ai',
      title: 'Transparencia y Normativa de Inteligencia Artificial',
      kicker: 'Cumplimiento Estricto del Reglamento de IA de la UE (EU AI Act 2024/1689 & Marcos 2026)',
      summary: 'Gobernanza ética, clasificación de riesgo algorítmico, principio de supervisión humana incondicional y auditoría de sistemas neuronales embarcados.',
      icon: Cpu,
      sections: [
        {
          id: 'ai-01',
          number: '01',
          title: 'Declaración y Clasificación de Sistemas de IA en AVIO',
          content: `De conformidad con el Reglamento Europeo de Inteligencia Artificial (EU AI Act), AVIO Sports categoriza e inventaría con total transparencia los algoritmos y redes neuronales integradas en su ecosistema:

1. AVIO Neural Drive Assist (Nivel 2+ y Nivel 4 en zonas confinadas): Sistema clasificado bajo la categoría de Alto Riesgo (Anexo III - Componentes de seguridad en el transporte). Diseñado con redundancia triple de hardware y capas de computación determinista que verifican cada inferencia antes de aplicar par de frenado o dirección.
2. Solid-State Battery Neural Balancer: Modelo de Optimización de Recursos (Riesgo Mínimo) encargado de distribuir la carga iónica entre celdas térmicas para prolongar la vida útil del vehículo sin interferir en decisiones de ruta.`,
          keyPoints: [
            'Clasificación oficial de riesgos debidamente documentada en la base de datos de la UE.',
            'Redundancia determinista triple sobre cualquier inferencia de conducción asistida.',
            'Modelos entrenados exclusivamente con conjuntos de datos sintéticos y telemetría consentida.'
          ]
        },
        {
          id: 'ai-02',
          number: '02',
          title: 'Supervisión Humana Incondicional (Human-in-the-Loop)',
          content: `El principio rector inmutable de AVIO es la subordinación algorítmica al criterio humano. Ninguna función asistida puede revocar la intervención de emergencia del conductor. 

El vehículo incorpora sensores capacitivos de volante y monitores de atención ocular óptica no biométrica que certifican que el conductor mantiene la capacidad de control. El conductor puede desacoplar de forma instantánea cualquier función autónoma ejerciendo una presión física sobre el pedal de freno o un giro del volante superior a 1.2 Nm.`,
          keyPoints: [
            'Desconexión física instantánea prioritaria sobre cualquier inferencia del procesador.',
            'No existe bloqueo remoto de frenos ni aceleración forzada por software central.',
            'Auditoría constante de la latencia sensorial, inferior a 8 milisegundos.'
          ]
        },
        {
          id: 'ai-03',
          number: '03',
          title: 'Prohibición Expresa de Biometría Invasiva y Puntajes Sociales',
          content: `AVIO Sports se compromete de manera vinculante a no implementar en ningún modelo presente o futuro:
• Reconocimiento biométrico facial para fines de identificación o perfilado comercial.
• Inferencia de emociones subjetivas para tarificación dinámica o seguros.
• Sistemas de puntuación social o categorización discriminatoria prohibidos por el Artículo 5 del EU AI Act.

Los sensores interiores operan únicamente en bucle cerrado local, procesando vectores térmicos en la memoria volátil del vehículo sin transmitir imágenes al exterior ni almacenarlas en disco persistente.`,
          keyPoints: [
            'Cumplimiento taxativo de las prohibiciones del Artículo 5 del Reglamento de IA de la UE.',
            'Sensores interiores de cabina en bucle cerrado y memoria volátil (RAM temporal).',
            'Cero transmisión de imágenes de cabina a la nube o a servidores de AVIO.'
          ]
        },
        {
          id: 'ai-04',
          number: '04',
          title: 'Ciberseguridad Algorítmica y Homologación UN ECE R155/R156',
          content: `La robustez frente a ataques cibernéticos adversarios (manipulación de sensores, inyecciones de datos en la cámara o perturbaciones de señales LiDAR) está certificada bajo los reglamentos UN ECE R155 (Sistemas de Gestión de Ciberseguridad Vehicular) y R156 (Gestión de Actualizaciones de Software). 

Equipos independientes de red teaming ejecutan pruebas periódicas de penetración sobre los modelos neuronales para prevenir el envenenamiento de modelos y garantizar la resiliencia en carretera.`,
          keyPoints: [
            'Certificación de ciberseguridad UN ECE R155 y R156 en toda la flota.',
            'Validaciones continuas de resistencia a ataques adversarios de visión artificial.',
            'Registro inmutable de logs en caja negra vehicular blindada con firma SHA-384.'
          ]
        },
        {
          id: 'ai-05',
          number: '05',
          title: 'Eficiencia Energética y Huella de Carbono del Procesador',
          content: `En estricta consonancia con los objetivos medioambientales europeos 2026, los módulos NPU (Unidad de Procesamiento Neuronal) de AVIO operan con una eficiencia líder en la industria de 42 TOPS por vatio. 

El consumo energético del sistema de IA no degrada más del 1.2% de la autonomía total del paquete de baterías durante la conducción autónoma activa. Los centros de datos donde se entrenan los modelos operan con un 100% de energías renovables certificadas (GDO).`,
          keyPoints: [
            'Arquitectura NPU de 3nm con eficiencia de 42 TOPS/W.',
            'Impacto inferior al 1.2% sobre la autonomía total de la batería.',
            'Centros de entrenamiento computacional con energía renovable 100% garantizada.'
          ]
        },
        {
          id: 'ai-06',
          number: '06',
          title: 'Canal de Transparencia y Notificación de Incidencias',
          content: `Cualquier usuario, autoridad reguladora o investigador de seguridad puede solicitar información detallada sobre la tarjeta del modelo (Model Card), las métricas de rendimiento y las especificaciones de seguridad algorítmica a través del buzón oficial ai-governance@avio.com.`,
          keyPoints: [
            'Acceso a Model Cards y hojas de datos de entrenamiento bajo NDA regulatorio.',
            'Registro público de incidentes de seguridad e intervenciones de asistencia.',
            'Comité de Ética e IA supervisado conjuntamente con Inspyrio Studio.'
          ]
        }
      ]
    }
  }), []);

  const currentDocData = documents[activeDoc];

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return currentDocData.sections;
    const q = searchQuery.toLowerCase();
    return currentDocData.sections.filter(sec => 
      sec.title.toLowerCase().includes(q) ||
      sec.content.toLowerCase().includes(q) ||
      sec.keyPoints.some(pt => pt.toLowerCase().includes(q))
    );
  }, [currentDocData, searchQuery]);

  return (
    <div className="min-h-screen bg-white text-avio-secondary-2 selection:bg-avio-primary selection:text-white relative overflow-x-hidden font-space">
      <Navbar />

      {/* Subtle Sky-Blue Gradient Radial Accent behind Header */}
      <div className="absolute top-0 left-0 right-0 h-[480px] bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(43,150,217,0.08),transparent)] pointer-events-none" />

      <main className="relative z-10 pt-28 md:pt-36 pb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Top Breadcrumb & Clean Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <a 
              href="#home"
              onClick={() => {
                document.documentElement.style.scrollBehavior = 'auto';
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-avio-secondary-2/60 hover:text-avio-primary transition-colors group cursor-pointer"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Volver a la experiencia principal</span>
            </a>

            {/* Zero-Pill Metadata Discipline */}
            <div className="flex items-center gap-2 text-[11px] md:text-xs text-avio-secondary-2/50 font-light flex-wrap">
              <span>Marco Legal 2026</span>
              <span aria-hidden="true">·</span>
              <span>Unión Europea & Internacional</span>
              <span aria-hidden="true">·</span>
              <span>Inspyrio Studio & Avio Legal</span>
              <span aria-hidden="true">·</span>
              <span className="text-avio-primary font-medium">Revisión: Octubre 2026</span>
            </div>
          </div>

          {/* Hero Header of Legal Hub */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12 border-b border-black/5 pb-10"
          >
            <div className="max-w-4xl space-y-4">
              <span className="text-[11px] font-bold tracking-[0.4em] text-avio-primary uppercase font-syncopate">
                AVIO CORPORATE & ETHICAL GOVERNANCE
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-avio-secondary-2 uppercase font-syncopate leading-[1.05]">
                Centro Jurídico <br className="hidden sm:block" />
                <span className="text-avio-primary">& Normativa de IA</span>
              </h1>
              <p className="text-base sm:text-lg text-avio-secondary-2/70 font-light leading-relaxed max-w-2xl">
                Transparencia total en contratos de vehículos de alto rendimiento, salvaguarda de privacidad bajo el GDPR y riguroso cumplimiento de los estándares éticos del nuevo Reglamento de IA europeo (EU AI Act).
              </p>
            </div>
          </motion.div>

          {/* Document Switcher - 3 Distinct Professional Portals in Pure White & Celeste */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              {
                id: 'terms' as LegalDocType,
                title: 'Términos de Servicio',
                subtitle: 'Contratos, pre-reservas y garantías de rendimiento',
                icon: Scale,
                badge: 'Edición 2026'
              },
              {
                id: 'privacy' as LegalDocType,
                title: 'Privacidad & Datos',
                subtitle: 'GDPR 2016/679, cifrado telemático y derechos ARCO+',
                icon: ShieldCheck,
                badge: 'Cifrado TLS 1.3'
              },
              {
                id: 'ai' as LegalDocType,
                title: 'Normativa de IA',
                subtitle: 'EU AI Act, supervisión humana y ética de redes',
                icon: Cpu,
                badge: 'EU AI Act 2024/1689'
              }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeDoc === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => switchDoc(tab.id)}
                  type="button"
                  className={`text-left p-6 rounded-2xl md:rounded-3xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                    isActive
                      ? 'bg-white border-avio-primary shadow-[0_12px_36px_rgba(43,150,217,0.14)] ring-1 ring-avio-primary'
                      : 'bg-[#F8FAFC] border-black/5 hover:bg-white hover:border-black/10 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl transition-colors ${
                      isActive ? 'bg-avio-primary text-white' : 'bg-black/[0.04] text-avio-secondary-2/60 group-hover:text-avio-secondary-2 group-hover:bg-avio-primary/10'
                    }`}>
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-avio-primary uppercase">
                      {tab.badge}
                    </span>
                  </div>

                  <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight text-avio-secondary-2 mb-1.5 font-syncopate">
                    {tab.title}
                  </h2>
                  <p className="text-xs text-avio-secondary-2/60 leading-relaxed font-light">
                    {tab.subtitle}
                  </p>

                  {/* Active highlight underline */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-avio-primary" 
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive Utility Bar: Search, Print, Share */}
          <div className="bg-white rounded-2xl p-4 md:p-5 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 border border-black/5 shadow-sm">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avio-secondary-2/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar cláusulas (ej. batería, IA, datos, derechos)..."
                className="w-full bg-[#F8FAFC] border border-black/10 rounded-xl pl-10 pr-4 py-2 text-xs md:text-sm text-avio-secondary-2 placeholder:text-avio-secondary-2/40 focus:outline-none focus:border-avio-primary focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-avio-secondary-2/40 hover:text-avio-secondary-2"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <button
                onClick={handlePrint}
                type="button"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-avio-secondary-2/70 bg-[#F8FAFC] hover:bg-white border border-black/5 hover:border-black/10 transition-colors cursor-pointer"
                title="Imprimir documento oficial"
              >
                <Printer size={15} />
                <span className="hidden sm:inline">Imprimir PDF Oficial</span>
              </button>

              <button
                onClick={() => copyClauseLink('main')}
                type="button"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-avio-secondary-2/70 bg-[#F8FAFC] hover:bg-white border border-black/5 hover:border-black/10 transition-colors cursor-pointer"
                title="Copiar enlace permanente"
              >
                {copiedClause === 'main' ? (
                  <>
                    <Check size={15} className="text-avio-primary font-bold" />
                    <span className="text-avio-primary font-medium">Enlace Copiado</span>
                  </>
                ) : (
                  <>
                    <Share2 size={15} />
                    <span className="hidden sm:inline">Compartir</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Content Layout with Sticky Index Sidebar on Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Sidebar Navigation & Regulatory Seals (4 cols on lg) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Sticky Table of Contents */}
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm">
                  <h3 className="text-xs font-bold tracking-[0.2em] text-avio-primary uppercase mb-4 font-syncopate">
                    Índice de Cláusulas
                  </h3>

                  <nav className="space-y-1">
                    {currentDocData.sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        onClick={() => setActiveSectionId(section.id)}
                        className={`group flex items-start gap-3 p-2.5 rounded-xl text-xs transition-colors ${
                          activeSectionId === section.id 
                            ? 'bg-sky-50 text-avio-primary font-semibold' 
                            : 'text-avio-secondary-2/60 hover:text-avio-secondary-2 hover:bg-black/[0.02]'
                        }`}
                      >
                        <span className="font-mono text-avio-primary shrink-0 mt-0.5 font-bold">
                          {section.number}.
                        </span>
                        <span className="line-clamp-2 leading-relaxed">
                          {section.title}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Compliance & Trust Panel */}
                <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <FileCheck size={20} className="text-avio-primary" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-avio-secondary-2">
                      Certificación Vigente
                    </h4>
                  </div>
                  <p className="text-xs text-avio-secondary-2/60 leading-relaxed font-light">
                    Esta documentación cuenta con dictamen legal favorable, alineada con las normativas ISO/IEC 27001, UN ECE R155/R156 y el Reglamento Europeo de Inteligencia Artificial para el ciclo 2026.
                  </p>
                  
                  <div className="pt-2 border-t border-black/5 flex items-center justify-between text-[11px] text-avio-secondary-2/40">
                    <span>Protocolo Legal: AVIO-V26.4</span>
                    <span className="text-avio-primary font-medium">Verificado</span>
                  </div>
                </div>

                {/* Direct Contact Card */}
                <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-avio-secondary-2">
                    Asesoría y DPO
                  </h4>
                  <p className="text-xs text-avio-secondary-2/60 leading-relaxed font-light">
                    ¿Tienes dudas específicas o necesitas tramitar una petición personalizada?
                  </p>
                  <a
                    href="mailto:legal@avio.com"
                    className="inline-flex items-center gap-2 text-xs font-medium text-avio-primary hover:underline pt-1"
                  >
                    <Mail size={14} />
                    <span>legal@avio.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Document Body (8 cols on lg) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Document Banner */}
              <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm relative overflow-hidden">
                <div className="space-y-3 max-w-2xl relative z-10">
                  <span className="text-xs text-avio-primary font-bold tracking-widest uppercase">
                    {currentDocData.kicker}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-avio-secondary-2 font-syncopate">
                    {currentDocData.title}
                  </h2>
                  <p className="text-sm sm:text-base text-avio-secondary-2/70 font-light leading-relaxed">
                    {currentDocData.summary}
                  </p>
                </div>
              </div>

              {/* Search result notification if filtering */}
              {searchQuery && (
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-black/5 flex items-center justify-between text-xs text-avio-secondary-2/70">
                  <span>
                    Mostrando resultados coincidentes con: <strong>"{searchQuery}"</strong> ({filteredSections.length} cláusulas)
                  </span>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-avio-primary hover:underline font-medium"
                  >
                    Restablecer vista
                  </button>
                </div>
              )}

              {/* Section Clauses */}
              {filteredSections.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-black/5 space-y-4">
                  <AlertCircle size={32} className="mx-auto text-avio-primary" />
                  <p className="text-sm text-avio-secondary-2/70">No se encontraron cláusulas coincidentes con tu búsqueda.</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-5 py-2 rounded-xl bg-avio-primary text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Ver todas las cláusulas
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredSections.map((section) => (
                    <motion.article
                      key={section.id}
                      id={section.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-avio-primary/30 transition-all duration-300 space-y-6"
                    >
                      {/* Clause Title & Number */}
                      <div className="flex items-start justify-between gap-4 border-b border-black/5 pb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-mono font-bold text-avio-primary bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
                            {section.number}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-avio-secondary-2 font-syncopate">
                            {section.title}
                          </h3>
                        </div>

                        {/* Copy Permalink Button */}
                        <button
                          onClick={() => copyClauseLink(section.id)}
                          type="button"
                          className="text-avio-secondary-2/40 hover:text-avio-primary transition-colors p-1.5 rounded-lg hover:bg-black/[0.03]"
                          title="Copiar enlace a esta cláusula"
                        >
                          {copiedClause === section.id ? (
                            <Check size={16} className="text-avio-primary font-bold" />
                          ) : (
                            <Share2 size={16} />
                          )}
                        </button>
                      </div>

                      {/* Content Prose */}
                      <div className="text-sm sm:text-base font-light text-avio-secondary-2/80 leading-relaxed whitespace-pre-line space-y-3">
                        {section.content}
                      </div>

                      {/* Key Points Sub-grid */}
                      {section.keyPoints && section.keyPoints.length > 0 && (
                        <div className="bg-[#F8FAFC] border border-black/5 rounded-2xl p-5 space-y-2.5">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-avio-primary">
                            Aspectos Clave & Garantías
                          </span>
                          <ul className="space-y-2 text-xs sm:text-sm text-avio-secondary-2/70 font-light">
                            {section.keyPoints.map((pt, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <CheckCircle2 size={15} className="text-avio-primary shrink-0 mt-0.5" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.article>
                  ))}
                </div>
              )}

              {/* Special Interactive Component for GDPR: ARCO+ Assistant */}
              {activeDoc === 'privacy' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-avio-primary/30 shadow-[0_8px_32px_rgba(43,150,217,0.08)] space-y-6"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-avio-primary uppercase font-syncopate">
                      MÓDULO INTERACTIVO DE AUTODETERMINACIÓN INFORMATIVA
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-avio-secondary-2 font-syncopate">
                      Gestor de Ejercicio de Derechos ARCO+
                    </h3>
                    <p className="text-xs sm:text-sm text-avio-secondary-2/70 font-light leading-relaxed">
                      Elige el derecho que deseas ejercer sobre tus datos personales almacenados en AVIO. Nuestro sistema redactará y remitirá formalmente la petición a nuestro Delegado de Protección de Datos.
                    </p>
                  </div>

                  {/* Right Selector Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'access', label: 'Acceso' },
                      { id: 'rectification', label: 'Rectificación' },
                      { id: 'erasure', label: 'Supresión / Olvido' },
                      { id: 'portability', label: 'Portabilidad' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setSelectedArcoRight(tab.id as any)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                          selectedArcoRight === tab.id
                            ? 'bg-avio-primary text-white shadow-sm'
                            : 'bg-[#F8FAFC] text-avio-secondary-2/70 hover:bg-white hover:text-avio-secondary-2 border border-black/5'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Direct Form */}
                  <form onSubmit={handleArcoSubmit} className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-8">
                        <input
                          type="email"
                          required
                          value={arcoFormEmail}
                          onChange={(e) => setArcoFormEmail(e.target.value)}
                          placeholder="Tu correo electrónico registrado"
                          className="w-full bg-[#F8FAFC] border border-black/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-avio-secondary-2 placeholder:text-avio-secondary-2/40 focus:outline-none focus:border-avio-primary focus:bg-white"
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <button
                          type="submit"
                          className="w-full h-full py-3 px-4 rounded-xl bg-avio-primary hover:bg-avio-secondary-2 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm"
                        >
                          Generar Trámite
                        </button>
                      </div>
                    </div>

                    {arcoFormSuccess && (
                      <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-avio-primary text-xs flex items-center gap-2">
                        <CheckCircle2 size={16} />
                        <span>Petición formal pre-registrada con firma tokenizada. Recibirás confirmación en {arcoFormEmail}.</span>
                      </div>
                    )}
                  </form>
                </motion.div>
              )}

              {/* Special Interactive Component for AI: EU AI Act Risk Matrix */}
              {activeDoc === 'ai' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-avio-primary/30 shadow-[0_8px_32px_rgba(43,150,217,0.08)] space-y-6"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-avio-primary uppercase font-syncopate">
                      TRANSPARENCIA ALGORÍTMICA 2026
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-avio-secondary-2 font-syncopate">
                      Matriz de Clasificación según EU AI Act (2024/1689)
                    </h3>
                    <p className="text-xs sm:text-sm text-avio-secondary-2/70 font-light leading-relaxed">
                      Desglose público de cada red neuronal y algoritmo que interviene en el vehículo, con su nivel de riesgo y medidas de salvaguarda verificadas.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-black/5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-avio-primary uppercase">Nivel 2+/4 Asistido</span>
                        <span className="text-[10px] bg-sky-50 text-avio-primary px-2 py-0.5 rounded font-mono border border-sky-100">Alto Riesgo (Anexo III)</span>
                      </div>
                      <h4 className="text-sm font-bold text-avio-secondary-2 uppercase">AVIO Neural Pilot</h4>
                      <p className="text-xs text-avio-secondary-2/70 font-light leading-relaxed">
                        Control de crucero adaptativo y mantenimiento de carril. Sometido a pruebas de ciberseguridad UN ECE R155 con desconexión física de 0.05 segundos ante intervención del conductor.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-black/5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-avio-primary uppercase">Termo-Distribución</span>
                        <span className="text-[10px] bg-sky-50 text-avio-primary px-2 py-0.5 rounded font-mono border border-sky-100">Riesgo Mínimo</span>
                      </div>
                      <h4 className="text-sm font-bold text-avio-secondary-2 uppercase">Optimizador de Batería de Estado Sólido</h4>
                      <p className="text-xs text-avio-secondary-2/70 font-light leading-relaxed">
                        Predicción de curvas de carga rápida sin acceso a telemetría de usuario. Optimiza la longevidad de las celdas en climas extremos de manera estrictamente local.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
