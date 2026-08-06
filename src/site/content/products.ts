import type { Product } from "@/domain/content";

export const products = [
  {
    id: "essential",
    name: "Ginástica Laboral",
    summary:
      "Práticas orientadas para movimentar o corpo durante a jornada e criar uma pausa de cuidado no dia.",
    category: "Serviços",
  },
  {
    id: "signature",
    name: "Quick Massage e SIPAT",
    summary:
      "Atividades breves de bem-estar e ações organizadas para a realidade da empresa.",
    category: "Serviços",
  },
] as const satisfies readonly Product[];
