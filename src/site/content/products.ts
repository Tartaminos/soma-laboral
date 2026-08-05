import type { Product } from "@/domain/content";

export const products = [
  {
    id: "essential",
    name: "Linha Essencial",
    summary: "Seleção versátil para necessidades do dia a dia.",
    category: "Destaques",
    commercialInfo: "Consulte disponibilidade",
  },
  {
    id: "signature",
    name: "Linha Autoral",
    summary: "Itens escolhidos por qualidade, origem e acabamento.",
    category: "Coleção",
  },
] as const satisfies readonly Product[];
