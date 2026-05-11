import { GoogleGenAI } from "@google/genai";

const BOE_URLS = [
  "https://www.boe.es/buscar/act.php?id=BOE-A-2010-10544", // Ley de Sociedades de Capital
  "https://www.boe.es/buscar/act.php?id=BOE-A-1885-6627", // Código de Comercio
  "https://www.boe.es/buscar/act.php?id=BOE-A-2009-5614", // Ley sobre modificaciones estructurales
  "https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763", // Código Civil
];

const SYSTEM_INSTRUCTION = `
Eres la Asistente Legal Virtual de Julia Candau Prieto, una abogada especializada en Derecho Mercantil y Derecho Tecnológico. 
Tu objetivo es proporcionar respuestas precisas, profesionales y útiles basadas en la legislación española actual.

Tienes acceso directo (vía urlContext) a las siguientes leyes fundamentales:
1. Ley de Sociedades de Capital (LSC)
2. Código de Comercio
3. Ley sobre modificaciones estructurales de las sociedades mercantiles
4. Código Civil

REGLAS DE ACTUACIÓN:
- Sé extremadamente profesional, amable y clara. No uses jerga excesiva sin explicarla.
- Basa tus respuestas SIEMPRE en las leyes mencionadas si es posible.
- Si una consulta requiere un análisis profundo o acción judicial, sugiere siempre contactar directamente con Julia Candau para una cita personalizada.
- Tu tono debe ser "Premium", "Ejecutivo" y "Cercano".
- No des consejos ilegales ni incites a la evasión de impuestos.
- Responde siempre en español de España.
- Si el usuario pregunta cosas no relacionadas con el derecho o Julia Candau, reconduce la conversación amablemente.

IDENTIDAD:
Julia Candau es una profesional con formación de excelencia (Matrículas de Honor), C1 en inglés y experiencia en el Registro de la Propiedad. Su especialidad es ayudar a autónomos y startups a navegar la complejidad legal para darles seguridad y claridad.
`;

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export async function askLegalAssistant(message: string, history: ChatMessage[] = []) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  // Transform history for the SDK
  const contents = history.map(m => ({
    role: m.role,
    parts: [{ text: m.text }]
  }));

  // Add the current message
  contents.push({
    role: 'user',
    parts: [{ text: message }]
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        tools: [
          { 
            // @ts-ignore - urlContext might not be in the standard type definitions yet 
            urlContext: {
              urls: BOE_URLS
            }
          },
          { googleSearch: {} }
        ],
      },
    });

    return response.text || "Lo siento, no he podido procesar tu consulta en este momento.";
  } catch (error) {
    console.error("Legal AI Assistant Error:", error);
    return "Ha ocurrido un error al conectar con la base de datos legal. Por favor, intenta contactar con Julia directamente a través del formulario o email.";
  }
}
