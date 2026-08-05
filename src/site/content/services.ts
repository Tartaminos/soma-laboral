import type { Service } from "@/domain/content";

export const services = [
  {
    id: "planning",
    name: "Planejamento",
    summary: "Uma visão organizada do desafio, das prioridades e dos próximos passos.",
    description:
      "Entendemos o contexto antes de recomendar soluções e registramos decisões com clareza.",
  },
  {
    id: "implementation",
    name: "Implementação",
    summary: "Execução cuidadosa, comunicação direta e entregas que podem ser verificadas.",
  },
  {
    id: "support",
    name: "Acompanhamento",
    summary: "Suporte para manter o resultado consistente depois da entrega inicial.",
  },
] as const satisfies readonly Service[];
