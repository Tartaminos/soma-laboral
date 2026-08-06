import type { PortfolioItem } from "@/domain/content";

export const portfolioItems = [
  {
    id: "workplace-exercise-small-group",
    title: "Movimento no ambiente de trabalho",
    description: "Uma pausa ativa orientada para integrar cuidado e rotina.",
    image: {
      src: "/images/portfolio/ginastica-laboral-equipe-01.webp",
      alt: "Três pessoas fazem movimentos de alongamento em uma área externa coberta do local de trabalho.",
      width: 1600,
      height: 1204,
      decorative: false,
    },
  },
  {
    id: "workplace-exercise-large-group",
    title: "Atividade com a equipe",
    description: "Exercícios conduzidos em grupo em uma área externa arborizada.",
    image: {
      src: "/images/portfolio/ginastica-laboral-equipe-02.webp",
      alt: "Grupo numeroso de colaboradores de camiseta verde pratica exercícios orientados em uma área externa arborizada.",
      width: 1600,
      height: 720,
      decorative: false,
    },
  },
  {
    id: "workplace-exercise-team-mobility",
    title: "Cuidado em movimento",
    description: "Mobilidade e alongamento organizados para um grande grupo.",
    image: {
      src: "/images/portfolio/ginastica-laboral-equipe-03.webp",
      alt: "Colaboradores organizados em grupo elevam as pernas durante uma atividade orientada ao ar livre.",
      width: 1600,
      height: 720,
      decorative: false,
    },
  },
] as const satisfies readonly PortfolioItem[];
