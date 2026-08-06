import type { PortfolioItem } from "@/domain/content";

export const portfolioItems = [
  {
    id: "workplace-exercise-small-group",
    title: "Movimento no ambiente de trabalho",
    category: "Ginástica Laboral",
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
    category: "Ginástica Laboral",
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
    category: "Ginástica Laboral",
    description: "Mobilidade e alongamento organizados para um grande grupo.",
    image: {
      src: "/images/portfolio/ginastica-laboral-equipe-03.webp",
      alt: "Colaboradores organizados em grupo elevam as pernas durante uma atividade orientada ao ar livre.",
      width: 1600,
      height: 720,
      decorative: false,
    },
  },
  {
    id: "quick-massage-roller-session",
    title: "Quick Massage no trabalho",
    category: "Quick Massage",
    description: "Atendimento breve realizado na cadeira de massagem.",
    image: {
      src: "/images/portfolio/quick-massage-atendimento-01.webp",
      alt: "Profissional aplica um rolo de massagem nos ombros de um colaborador sentado na cadeira de Quick Massage em uma sala do local de trabalho.",
      width: 960,
      height: 1280,
      decorative: false,
    },
  },
  {
    id: "quick-massage-upper-back-session",
    title: "Uma pausa de cuidado",
    category: "Quick Massage",
    description: "Massagem realizada com apoio ergonômico no próprio ambiente da empresa.",
    image: {
      src: "/images/portfolio/quick-massage-atendimento-02.webp",
      alt: "Profissional realiza massagem na parte superior das costas de um colaborador apoiado em uma cadeira ergonômica dentro da empresa.",
      width: 960,
      height: 1280,
      decorative: false,
    },
  },
  {
    id: "quick-massage-chair",
    title: "Estrutura para o atendimento",
    category: "Quick Massage",
    description: "Cadeira ergonômica preparada para as sessões de Quick Massage.",
    image: {
      src: "/images/portfolio/quick-massage-cadeira.webp",
      alt: "Cadeira ergonômica verde preparada para uma sessão de Quick Massage em uma sala interna.",
      width: 960,
      height: 1280,
      decorative: false,
    },
  },
] as const satisfies readonly PortfolioItem[];
