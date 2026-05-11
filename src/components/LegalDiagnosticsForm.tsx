import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Rocket, 
  ShieldCheck, 
  Lightbulb, 
  ArrowRight, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

type Step = 'stage' | 'need' | 'solution';

export function LegalDiagnosticsForm() {
  const [step, setStep] = useState<Step>('stage');
  const [stage, setStage] = useState<string | null>(null);
  const [need, setNeed] = useState<string | null>(null);

  const stages = [
    { id: 'startup', label: 'Tengo una idea / Startup', icon: <Rocket className="w-5 h-5" /> },
    { id: 'business', label: 'Empresa consolidada', icon: <Building2 className="w-5 h-5" /> },
    { id: 'freelance', label: 'Soy Autónomo / Professional', icon: <ShieldCheck className="w-5 h-5" /> }
  ];

  const needs: Record<string, any[]> = {
    startup: [
      { id: 'incorporation', label: 'Constituir Sociedad', desc: 'S.L., pactos de socios y estatutos.' },
      { id: 'tech', label: 'Protección Digital', desc: 'RGPD, Términos y Condiciones, E-commerce.' }
    ],
    business: [
      { id: 'contracts', label: 'Auditoría Contratación', desc: 'Revisión técnica de acuerdos vigentes.' },
      { id: 'compliance', label: 'Compliance & Gobierno', desc: 'Estructura legal y responsabilidad.' }
    ],
    freelance: [
      { id: 'tax', label: 'Consultoría Fiscal/Legal', desc: 'Obligaciones y protección patrimonial.' },
      { id: 'service-contracts', label: 'Contrato de Servicios', desc: 'Blindaje frente a impagos de clientes.' }
    ]
  };

  const reset = () => {
    setStep('stage');
    setStage(null);
    setNeed(null);
  };

  return (
    <div className="bg-white rounded-none p-10 md:p-14 shadow-[0_50px_100px_-20px_rgba(13,27,42,0.2)] border border-brand-primary/5">
      <div className="mb-14 text-center">
        <h3 className="text-3xl font-display font-medium tracking-wide text-brand-primary mb-4 uppercase">
          Análisis <span className="text-brand-accent italic font-sans font-light lowercase">preliminar</span>
        </h3>
        <p className="text-slate-400 text-[11px] font-medium uppercase tracking-widest">Identifique la arquitectura legal óptima para su proyecto.</p>
      </div>

      <AnimatePresence mode="wait">
        {step === 'stage' && (
          <motion.div
            key="stage"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-5"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-slate-400 mb-8 border-b border-brand-primary/5 pb-4">Fase I: Perfil Corporativo</p>
            {stages.map((s) => (
              <button
                key={s.id}
                onClick={() => { setStage(s.id); setStep('need'); }}
                className="w-full p-8 text-left border border-slate-100 rounded-none hover:border-brand-accent hover:bg-brand-bg transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-brand-bg rounded-full flex items-center justify-center text-brand-primary group-hover:bg-brand-accent group-hover:text-brand-primary transition-all">
                    {s.icon}
                  </div>
                  <span className="font-display text-xl text-brand-primary italic">{s.label}</span>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-200 group-hover:text-brand-accent group-hover:translate-x-2 transition-all" />
              </button>
            ))}
          </motion.div>
        )}

        {step === 'need' && stage && (
          <motion.div
            key="need"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-5"
          >
            <div className="flex items-center gap-2 mb-10">
              <button onClick={() => setStep('stage')} className="text-[10px] uppercase font-semibold text-slate-400 hover:text-brand-primary tracking-widest transition-colors flex items-center gap-2"><span>←</span> Volver</button>
              <div className="h-px flex-grow bg-slate-100" />
            </div>
            <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-slate-400 mb-8 border-b border-brand-primary/5 pb-4">Fase II: Requerimiento Técnico</p>
            {needs[stage].map((n) => (
              <button
                key={n.id}
                onClick={() => { setNeed(n.id); setStep('solution'); }}
                className="w-full p-8 text-left border border-slate-100 rounded-none hover:border-brand-accent transition-all group"
              >
                <p className="font-display text-2xl text-brand-primary mb-2 group-hover:text-brand-accent transition-colors italic">{n.label}</p>
                <p className="text-xs text-slate-400 font-light italic leading-relaxed">{n.desc}</p>
              </button>
            ))}
          </motion.div>
        )}

        {step === 'solution' && (
          <motion.div
            key="solution"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brand-primary text-white p-12 rounded-none text-center space-y-8 ring-1 ring-brand-accent/20"
          >
            <div className="w-20 h-20 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-brand-accent/30 animate-pulse">
              <Lightbulb className="w-10 h-10 text-brand-primary" />
            </div>
            <h4 className="text-4xl font-display font-medium italic italic-none tracking-tight">Dictamen de Estrategia</h4>
            <div className="bg-white/5 p-8 rounded-none text-left space-y-5 border border-white/10 italic font-display">
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-brand-accent shrink-0" />
                <p className="text-lg font-light leading-snug">Se requiere una **Auditoría de Estructura Societaria** para blindar la responsabilidad patrimonial.</p>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-brand-accent shrink-0" />
                <p className="text-lg font-light leading-snug">Implementación de **Protocolos de Contratación** específicos para el mercado internacional.</p>
              </div>
            </div>
            <div className="flex flex-col gap-5 pt-4">
              <button 
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-brand-accent text-brand-primary py-6 rounded-none font-semibold hover:bg-white transition-all uppercase text-xs tracking-[0.3em]"
              >
                Solicitar Cita Prioritaria
              </button>
              <button onClick={reset} className="text-[10px] text-white/30 uppercase font-medium tracking-[0.4em] hover:text-white transition-colors">Iniciar Nuevo Análisis</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
