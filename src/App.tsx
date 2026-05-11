/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  FileText, 
  Users, 
  HelpCircle, 
  Menu, 
  X, 
  ArrowRight, 
  ArrowUpRight,
  ShieldCheck, 
  MessageSquare,
  Linkedin,
  Mail,
  Scale,
  Award,
  BookOpen,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { AiLegalAssistant } from './components/AiLegalAssistant';
import { LegalDiagnosticsForm } from './components/LegalDiagnosticsForm.tsx';

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SERVICES: Service[] = [
  {
    id: 'constitucion',
    title: 'Transformación Societaria',
    description: 'Gestión jurídica integral para la constitución y reestructuración de sociedades. Expertos en la optimización de estatutos y gobernanza corporativa.',
    icon: <Building2 className="w-5 h-5 text-brand-accent" />
  },
  {
    id: 'contratos',
    title: 'Estrategia Contractual',
    description: 'Auditoría y redacción de instrumentos mercantiles de alta complejidad. Blindamos sus relaciones comerciales bajo un rigor jurídico inexpugnable.',
    icon: <FileText className="w-5 h-5 text-brand-accent" />
  },
  {
    id: 'autonomos',
    title: 'Consultoría Estratégica',
    description: 'Soporte jurídico recurrente para el profesional independiente. Resolución de conflictos en materia fiscal, responsabilidad y cumplimiento normativo.',
    icon: <Users className="w-5 h-5 text-brand-accent" />
  },
  {
    id: 'tecnologico',
    title: 'Ecosistema Digital',
    description: 'Asesoramiento especializado en el entorno tecnológico: Protección de activos digitales (RGPD) y arquitectura legal para startups de base tecnológica.',
    icon: <ShieldCheck className="w-5 h-5 text-brand-accent" />
  }
];

const PRICING = [
  {
    name: 'Asesoría Puntual',
    price: '95€',
    desc: 'Consultas de alto impacto para resoluciones inmediatas.',
    features: ['Dictamen técnico prioritario (24h)', 'Análisis documental riguroso', 'Firma electrónica avanzada'],
    accent: false
  },
  {
    name: 'Retainer Estratégico',
    price: '250€/mes',
    desc: 'Dirección jurídica externa para su actividad diaria.',
    features: ['Consultoría jurídica ilimitada', 'Auditoría contractual continua', 'Gestión de riesgos corporativos'],
    accent: true
  },
  {
    name: 'Pack Constitución',
    price: '450€',
    desc: 'Arquitectura legal completa para el inicio de su actividad.',
    features: ['Escrituración y registro mercantil', 'Asesoramiento fiscal inicial', 'Pacto de socios personalizado'],
    accent: false
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-brand-bg/95 backdrop-blur-xl border-b border-brand-accent/10 py-4' : 'bg-transparent py-10'}`}>
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16 flex justify-between items-center">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => scrollTo('home')}>
               <div className="flex items-baseline gap-2">
                 <span className="font-display text-2xl font-bold tracking-tighter text-brand-primary">JC</span>
                 <div className="w-1 h-1 bg-brand-accent rounded-full mb-1" />
                 <span className="font-display text-2xl font-light tracking-tighter text-brand-primary/60 italic">Legal Boutique</span>
               </div>
            </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-14 font-medium text-[10px] uppercase tracking-[0.4em] text-brand-primary/60">
            {['sobre mí', 'servicios', 'precios', 'blog', 'contacto'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.replace(' ', '-'))}
                className="hover:text-brand-accent transition-colors relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-accent transition-all duration-500 group-hover:w-full" />
              </button>
            ))}
            <button 
              onClick={() => setIsAiAssistantOpen(true)}
              className="bg-brand-primary text-brand-bg px-12 py-5 rounded-none hover:bg-brand-accent transition-all duration-500 font-semibold text-xs uppercase tracking-[0.3em]"
            >
              Consultar IA
            </button>
          </div>

          <button className="md:hidden text-brand-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {['sobre mí', 'servicios', 'precios', 'blog', 'contacto'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.replace(' ', '-'))}
                className="font-display text-4xl text-brand-primary uppercase font-bold"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* HERO: Intellectual Authority */}
        <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-white">
          <div className="absolute inset-0 opacity-20">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#C5A03E_1px,transparent_1px)] [background-size:60px_60px]" />
          </div>
          
          <div className="max-w-screen-2xl mx-auto px-8 md:px-16 w-full grid lg:grid-cols-12 gap-16 relative z-10">
            <div className="lg:col-span-12 xl:col-span-9 flex flex-col justify-center text-brand-primary">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="flex items-center gap-6 mb-10">
                  <div className="h-[1px] w-16 bg-brand-accent scale-x-125 origin-left" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.6em] text-brand-primary opacity-60">Dirección Jurídica de Élite</span>
                </div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-6xl md:text-[8rem] leading-[0.9] mb-12 font-display font-medium tracking-tight text-brand-primary"
                >
                  Arquitectura <br /> <span className="italic text-brand-accent">Legal</span> de Alto <br /> Nivel.
                </motion.h1>
                <p className="text-lg md:text-xl text-brand-secondary mb-12 max-w-xl leading-relaxed font-display italic font-light">
                  Especialistas en Derecho Mercantil Moderno. Protegemos la integridad de sus activos con rigor técnico y visión global.
                </p>
                <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                  <button 
                    onClick={() => setIsAiAssistantOpen(true)}
                    className="group bg-brand-primary text-white px-16 py-8 flex items-center gap-6 hover:bg-brand-accent transition-all duration-700 font-bold text-[10px] uppercase tracking-[0.4em] shadow-[0_20px_40px_-15px_rgba(30,58,95,0.3)]"
                  >
                    Consultar IA <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                  </button>
                  <button 
                    onClick={() => scrollTo('sobre-mí')}
                    className="group flex items-center gap-3 text-brand-primary/60 hover:text-brand-primary py-4 text-[10px] uppercase tracking-[0.4em] font-bold transition-all"
                  >
                    Sobre la Firma <div className="w-1.5 h-1.5 bg-brand-accent rounded-full group-hover:scale-150 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TRUST MARKERS */}
        <section className="bg-white py-24 border-b border-brand-primary/5">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
            <div className="flex flex-col gap-2">
              <p className="text-5xl font-display font-medium text-brand-primary tracking-tighter">100%</p>
              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">Compromiso Legal</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-5xl font-display font-medium text-brand-primary tracking-tighter">C1</p>
              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">English Capability</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-5xl font-display font-medium text-brand-primary tracking-tighter">Real</p>
              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">Time Support</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-5xl font-display font-medium text-brand-primary tracking-tighter">SL+</p>
              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">Derecho Societario</p>
            </div>
          </div>
        </section>

        <section id="diagnostico" className="xl:hidden py-24 px-8 bg-brand-bg">
           <div className="max-w-xl mx-auto">
             <LegalDiagnosticsForm />
           </div>
        </section>

        {/* SERVICES: Grid Focused */}
        <section id="servicios" className="py-56 bg-white">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-16 text-brand-primary">
            <div className="grid lg:grid-cols-2 gap-24 items-end mb-48">
              <div>
                <div className="flex items-center gap-6 mb-10">
                  <div className="h-[1px] w-12 bg-brand-accent" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-brand-secondary">Áreas de Especialización</span>
                </div>
                <h2 className="text-6xl md:text-[8.5rem] font-display font-medium tracking-tighter leading-[0.8] mb-4">
                  Soluciones <br /> <span className="text-brand-accent italic">Técnicas</span>.
                </h2>
              </div>
              <p className="text-2xl text-brand-secondary font-display italic max-w-xl leading-relaxed font-light">
                Brindamos la seguridad jurídica necesaria para que su única prioridad sea la expansión de su patrimonio empresarial.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SERVICES.map((service, idx) => (
                <motion.div 
                  key={service.id}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-brand-bg p-16 group hover:bg-brand-primary transition-all duration-1000 cursor-pointer border border-brand-primary/5 flex flex-col h-full relative overflow-hidden"
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-primary group-hover:bg-brand-accent group-hover:text-brand-primary transition-all duration-700 mb-16 shadow-sm">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-display font-medium mb-10 group-hover:text-white transition-colors tracking-tight italic uppercase block">{service.title}</h3>
                  <p className="text-brand-secondary text-sm leading-relaxed mb-16 group-hover:text-white/60 transition-colors font-light italic">
                    {service.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-700 text-brand-accent">Saber más</span>
                    <div className="w-10 h-10 rounded-full border border-brand-primary/10 group-hover:border-brand-accent flex items-center justify-center text-brand-primary group-hover:text-brand-accent transition-all">
                      <ChevronRight className="w-5 h-5 group-hover:rotate-[-45deg] transition-transform duration-700" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING: Clarity & Transparency */}
        <section id="precios" className="py-48 bg-brand-bg">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
            <div className="text-center mb-32">
              <h2 className="text-6xl md:text-9xl font-display font-medium italic italic-none tracking-tighter mb-8 leading-none">Inversión <br /> <span className="text-brand-accent italic">Transparente</span>.</h2>
              <p className="text-slate-500 text-2xl font-display italic">Sin letra pequeña. Tarifas adaptadas a startups y autónomos de alto rendimiento.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-0 border border-brand-primary/10 divide-x divide-brand-primary/10">
              {PRICING.map((plan) => (
                <div key={plan.name} className={`p-16 ${plan.accent ? 'bg-brand-primary text-white' : 'bg-white'} transition-all duration-500 group relative`}>
                  {plan.accent && <div className="absolute top-10 right-10 bg-brand-accent text-brand-primary text-[10px] font-bold px-5 py-2 rounded-none uppercase tracking-widest italic italic-none">Servicio Recomendado</div>}
                  <h4 className="text-2xl font-display font-medium mb-4 italic italic-none tracking-tighter border-b border-brand-accent/20 pb-4 inline-block">{plan.name}</h4>
                  <p className="text-5xl font-display font-medium mb-10 tracking-tighter flex items-baseline gap-2">{plan.price} <span className="text-xs uppercase tracking-widest opacity-40">hon. base</span></p>
                  <p className={`text-base mb-12 font-light italic ${plan.accent ? 'text-white/60' : 'text-slate-500'}`}>{plan.desc}</p>
                  <ul className="space-y-6 mb-16">
                    {plan.features.map(f => (
                      <li key={f} className="flex gap-4 text-sm font-medium items-start">
                        <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-6 font-semibold text-xs uppercase tracking-[0.2em] transition-all border ${plan.accent ? 'bg-brand-accent text-brand-primary border-brand-accent hover:bg-white' : 'bg-brand-primary text-white border-brand-primary hover:bg-brand-accent hover:text-brand-primary'}`}>
                    Contratar Servicios
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="sobre-mí" className="py-56 bg-white overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-16 architectural-grid">
            <div className="col-span-12 lg:col-span-12 mb-48">
               <div className="flex items-center gap-6 mb-10">
                  <div className="h-[1px] w-12 bg-brand-accent" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-brand-secondary">Filosofía Jurídica</span>
                </div>
               <h2 className="text-7xl md:text-[9rem] font-display font-medium italic tracking-tighter text-brand-primary leading-[0.8] mb-8">
                 Excelencia <br /> <span className="text-brand-accent not-italic">Académica</span> & <br /> Visión Directiva.
               </h2>
            </div>
            <div className="col-span-12 lg:col-span-5 relative">
              <motion.div {...fadeInUp} className="sticky top-40">
                <div className="space-y-12 text-2xl text-brand-secondary leading-relaxed pr-10 font-display italic font-light">
                  <p>
                    Ofrecemos una alternativa de élite a la abogacía tradicional. Mi enfoque es pragmático, analítico y orientado plenamente a la **salvaguarda de los intereses corporativos**.
                  </p>
                  <p>
                    Con una base técnica avanzada y una formación de primer nivel, garantizamos instrumentos jurídicos capaces de resistir el escrutinio más exigente.
                  </p>
                  <div className="pt-12">
                     <button className="brand-link">Perfil Directivo Completo</button>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="col-span-12 lg:col-span-6 lg:col-start-7 space-y-24 text-brand-primary">
              <motion.div {...fadeInUp} className="group">
                <div className="aspect-[4/5] bg-brand-primary rounded-none overflow-hidden mb-16 shadow-[0_60px_100px_-20px_rgba(30,58,95,0.15)] relative">
                   <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" alt="Julia Candau Prieto" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 grayscale" />
                   <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/20 to-transparent" />
                   <div className="absolute bottom-12 left-12">
                     <p className="font-display text-5xl text-brand-accent italic mb-2">Julia Candau Prieto</p>
                     <p className="text-[10px] uppercase tracking-[0.5em] text-white/50 font-bold">Fundadora & Directora de Estrategia</p>
                   </div>
                </div>
                <div className="grid grid-cols-3 gap-12 border-t border-brand-primary/5 pt-16">
                  <div>
                    <h4 className="text-4xl font-display font-medium mb-4 italic tracking-tighter uppercase">Rigor</h4>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-secondary">Compromiso</p>
                  </div>
                  <div>
                    <h4 className="text-4xl font-display font-medium mb-4 italic tracking-tighter uppercase">Visión</h4>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-secondary">Estrategia</p>
                  </div>
                  <div>
                    <h4 className="text-4xl font-display font-medium mb-4 italic tracking-tighter uppercase">Global</h4>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-secondary">Alcance</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* BLOG: Insights Row */}
        <section id="blog" className="py-48 bg-brand-bg border-t border-brand-primary/10">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between items-end gap-12 mb-32 text-brand-primary">
            <h2 className="text-6xl md:text-9xl font-display font-medium italic italic-none tracking-tighter uppercase leading-[0.8]">Insights <br /> <span className="text-brand-accent italic">Mercantiles</span>.</h2>
            <button className="text-brand-accent pb-4 uppercase text-[10px] tracking-[0.5em] border-b border-brand-accent/30 font-semibold hover:border-brand-accent transition-colors">Archivo Completo</button>
          </div>
          
          <div className="max-w-screen-2xl mx-auto px-8 md:px-16 grid md:grid-cols-3 gap-20">
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] bg-brand-primary rounded-none overflow-hidden mb-12 shadow-2xl relative">
                <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600" alt="Legal" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-accent mb-2">Corporate Law</p>
                </div>
              </div>
              <h3 className="text-2xl mb-5 group-hover:text-brand-accent transition-colors italic text-brand-primary leading-tight font-display">Desafíos legales en la captación de inversión extranjera.</h3>
              <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 italic font-light">Análisis de los protocolos de cumplimiento normativo exigidos por fondos de capital riesgo internacionales...</p>
            </div>
            
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] bg-brand-primary rounded-none overflow-hidden mb-12 shadow-2xl relative">
                <img src="https://images.unsplash.com/photo-1521791136364-798a730bb361?auto=format&fit=crop&q=80&w=600" alt="Legal" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 to-transparent" />
                <div className="absolute bottom-8 left-8">
                   <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-accent mb-2">E-Strategy</p>
                </div>
              </div>
              <h3 className="text-2xl mb-5 group-hover:text-brand-accent transition-colors italic text-brand-primary leading-tight font-display">La tokenización de activos: Un nuevo horizonte mercantil.</h3>
              <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 italic font-light">Cómo la tecnología blockchain está redefiniendo la propiedad y los contratos societarios en el siglo XXI...</p>
            </div>
            
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] bg-brand-primary rounded-none overflow-hidden mb-12 shadow-2xl relative">
                <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600" alt="Legal" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 to-transparent" />
                <div className="absolute bottom-8 left-8">
                   <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-accent mb-2">Protocol</p>
                </div>
              </div>
              <h3 className="text-2xl mb-5 group-hover:text-brand-accent transition-colors italic text-brand-primary leading-tight font-display">Protocolos de salida: El arte de la desinversión societaria.</h3>
              <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 italic font-light">Estrategias de negociación para garantizar una transición fluida en la salida de socios clave...</p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contacto" className="py-56 bg-brand-bg text-brand-primary relative overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-16 grid lg:grid-cols-12 gap-32 relative z-10">
            <div className="lg:col-span-12 mb-32">
              <h2 className="text-7xl md:text-[11rem] font-display font-medium leading-[0.8] mb-12 tracking-tighter">Establecer <br /> <span className="text-brand-accent italic">Contacto</span>.</h2>
              <p className="text-3xl text-brand-secondary max-w-2xl font-display italic leading-relaxed font-light">
                Arquitectura legal diseñada para la protección de sus activos e intereses más críticos a escala global.
              </p>
            </div>
            
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="space-y-16">
                <div className="group cursor-pointer w-fit">
                   <p className="text-[11px] font-bold uppercase tracking-[0.6em] text-brand-secondary/50 mb-6 italic italic-none">Canal de Consulta Directo</p>
                   <p className="text-5xl font-display text-brand-primary group-hover:text-brand-accent transition-colors leading-none italic">jcandaup@gmail.com</p>
                </div>
                <div className="group cursor-pointer w-fit">
                   <p className="text-[11px] font-bold uppercase tracking-[0.6em] text-brand-secondary/50 mb-6 italic italic-none">Presencia Corporativa</p>
                   <p className="text-5xl font-display text-brand-primary group-hover:text-brand-accent transition-colors leading-none italic">LinkedIn Profile</p>
                </div>
              </div>
              <div className="mt-32 flex gap-6 items-center">
                 <div className="w-3 h-3 bg-brand-accent rounded-full animate-pulse shadow-[0_0_20px_rgba(194,155,109,0.5)]" />
                 <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-brand-secondary/60 italic italic-none">Asistencia Prioritaria en Curso</p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form className="space-y-16" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-16">
                  <div className="group border-b border-brand-primary/10 pb-8 focus-within:border-brand-accent transition-all duration-700">
                    <label className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-secondary/50 block mb-4 italic italic-none">Nombre Completo / Razón Social</label>
                    <input type="text" className="w-full bg-transparent outline-none text-2xl placeholder:text-brand-primary/10 font-display italic" placeholder="Su Identidad" />
                  </div>
                  <div className="group border-b border-brand-primary/10 pb-8 focus-within:border-brand-accent transition-all duration-700">
                    <label className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-secondary/50 block mb-4 italic italic-none">Email de Enlace</label>
                    <input type="email" className="w-full bg-transparent outline-none text-2xl placeholder:text-brand-primary/10 font-display italic" placeholder="email@corporativo.com" />
                  </div>
                </div>
                <div className="group border-b border-brand-primary/10 pb-8 focus-within:border-brand-accent transition-all duration-700">
                  <label className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-secondary/50 block mb-4 italic italic-none">Naturaleza del Requerimiento</label>
                  <textarea className="w-full bg-transparent outline-none text-2xl placeholder:text-brand-primary/10 h-48 resize-none font-display italic" placeholder="Describa la situación jurídica..." />
                </div>
                <button className="bg-brand-primary text-white px-20 py-8 rounded-none font-bold text-[10px] uppercase tracking-[0.5em] hover:bg-brand-accent transition-all shadow-[0_30px_60px_-15px_rgba(30,58,95,0.25)]">
                  Enviar Requerimiento
                </button>
              </form>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/50 pointer-events-none" />
        </section>
      </main>

      <AiLegalAssistant isOpen={isAiAssistantOpen} onClose={() => setIsAiAssistantOpen(false)} />

      {/* Floating Action Button for AI Assistance */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsAiAssistantOpen(true)}
        className="fixed bottom-12 right-12 w-20 h-20 bg-brand-primary text-white rounded-none shadow-2xl z-40 flex items-center justify-center hover:bg-brand-accent transition-all duration-500 group"
      >
        <MessageSquare className="w-7 h-7 group-hover:scale-110 transition-transform" />
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-brand-accent rounded-full border-2 border-white animate-pulse" />
      </motion.button>

      {/* Footer */}
      <footer className="bg-white py-32 border-t border-brand-primary/5">
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16 text-brand-primary">
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold tracking-tighter">JC</span>
                <div className="w-1 h-1 bg-brand-accent rounded-full mb-1" />
                <span className="font-display text-2xl font-light tracking-tighter opacity-40 italic">Legal Boutique</span>
              </div>
            </div>
            <div className="flex gap-16 text-[10px] font-bold uppercase tracking-[0.4em] text-brand-secondary/40">
              <a href="#" className="hover:text-brand-accent transition-colors">Aviso Legal</a>
              <a href="#" className="hover:text-brand-secondary transition-colors">Privacidad</a>
              <a href="#" className="hover:text-brand-secondary transition-colors">Protocolo</a>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-secondary/40 italic">© {new Date().getFullYear()} JC Legal Boutique</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
