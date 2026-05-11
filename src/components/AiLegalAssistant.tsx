import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  X, 
  MessageSquare, 
  Scale, 
  Loader2, 
  ArrowDownCircle,
  HelpCircle
} from 'lucide-react';
import { askLegalAssistant, ChatMessage } from '../services/legalAiService';

interface AiLegalAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiLegalAssistant({ isOpen, onClose }: AiLegalAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askLegalAssistant(input, messages);
      const modelMessage: ChatMessage = { role: 'model', text: response };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "¿Qué trámites necesito para crear una SL?",
    "Responsabilidades legales de un autónomo",
    "¿Cómo blindar un pacto de socios?",
    "Dudas sobre protección de datos"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-white shadow-2xl z-[100] flex flex-col border-l border-brand-primary/5"
        >
          {/* Header */}
          <div className="bg-brand-primary p-8 text-white flex justify-between items-center shrink-0 border-b border-brand-accent/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-none flex items-center justify-center">
                <Scale className="w-6 h-6 text-brand-accent" />
              </div>
              <div>
                <h3 className="font-display text-xl tracking-tight italic italic-none uppercase font-medium">Asesoría Inteligente</h3>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
                  <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium">Grounded: BOE & Jurisprudencia</span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-3 hover:bg-white/10 rounded-none transition-colors border border-white/5"
            >
              <X className="w-5 h-5 text-brand-accent" />
            </button>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-grow overflow-y-auto p-10 space-y-8 bg-brand-bg/50"
          >
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-8">
                <div className="w-20 h-20 bg-white rounded-none shadow-xl flex items-center justify-center mb-6 border border-brand-primary/5">
                  <MessageSquare className="w-10 h-10 text-brand-accent" />
                </div>
                <div className="space-y-4">
                  <h4 className="font-display text-2xl text-brand-primary tracking-wide">Dictamen Preliminar</h4>
                  <p className="text-[13px] text-slate-500 leading-relaxed font-sans max-w-[280px]">
                    Análisis técnico instantáneo basado en la Ley de Sociedades de Capital y el Código de Comercio.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-3 w-full mt-10">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setInput(s)}
                      className="text-left p-5 bg-white border border-brand-primary/5 rounded-none text-[11px] text-brand-primary hover:border-brand-accent hover:shadow-lg transition-all flex items-center justify-between group font-medium uppercase tracking-wider"
                    >
                      {s}
                      <ArrowDownCircle className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-brand-accent" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-5 rounded-none text-[13px] leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-brand-primary text-white ml-12 border-l-2 border-brand-accent font-sans' 
                    : 'bg-white border border-brand-primary/5 text-brand-primary mr-12 shadow-sm font-sans'
                }`}>
                  {m.text}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-brand-primary/5 p-5 rounded-none flex items-center gap-4">
                  <Loader2 className="w-5 h-5 animate-spin text-brand-accent" />
                  <span className="text-[10px] text-slate-400 italic uppercase tracking-widest font-medium">Consultando Biblioteca Legal...</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Input */}
          <div className="p-8 bg-white border-t border-brand-primary/5">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Consulte su situación jurídica..."
                className="w-full bg-brand-bg/30 border border-brand-primary/10 rounded-none py-5 pl-8 pr-16 outline-none focus:border-brand-accent transition-all text-sm font-display italic"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-brand-primary text-brand-accent rounded-none flex items-center justify-center hover:bg-brand-accent hover:text-brand-primary transition-all disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            <p className="mt-6 text-[10px] text-center text-slate-400 font-medium uppercase tracking-[0.3em]">
               Uso estrictamente consultivo.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
