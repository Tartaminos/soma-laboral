import type { Highlight, Testimonial } from "@/domain/content";

export const highlights = [
  {
    id: "clarity",
    title: "Clareza",
    description: "Você entende cada etapa, escolha e próximo passo.",
  },
  {
    id: "care",
    title: "Cuidado",
    description: "Cada necessidade é tratada em seu contexto real.",
  },
  {
    id: "consistency",
    title: "Consistência",
    description: "Processos simples ajudam a sustentar bons resultados.",
  },
] as const satisfies readonly Highlight[];

export const testimonials = [
  {
    id: "marina",
    author: "Marina S.",
    quote:
      "Encontramos uma direção clara e um acompanhamento muito cuidadoso do início ao fim.",
    context: "Cliente",
  },
  {
    id: "ricardo",
    author: "Ricardo M.",
    quote: "O trabalho foi objetivo, organizado e fácil de acompanhar.",
    context: "Cliente",
  },
] as const satisfies readonly Testimonial[];

export const aboutParagraphs = [
  "O Estúdio Horizonte nasceu para ajudar pessoas e negócios a avançarem com mais clareza e menos ruído.",
  "Nossa forma de trabalhar une atenção ao contexto, decisões explicadas e execução responsável.",
] as const;
