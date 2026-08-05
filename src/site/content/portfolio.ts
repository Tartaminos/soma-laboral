import type { PortfolioItem } from "@/domain/content";

export const portfolioItems = [
  {
    id: "custom-shelving",
    title: "Estante sob medida",
    description:
      "Marcenaria planejada para organizar a sala e valorizar os materiais naturais.",
    category: "Interiores",
    image: {
      src: "/images/portfolio/estante-sob-medida.webp",
      alt: "Estante ampla de madeira clara com nichos, armários baixos e objetos de cerâmica.",
      width: 1200,
      height: 800,
      decorative: false,
    },
  },
  {
    id: "courtyard-garden",
    title: "Jardim de pátio",
    description:
      "Composição compacta com vegetação em camadas, caminho de pedra e banco integrado.",
    category: "Paisagismo",
    image: {
      src: "/images/portfolio/jardim-de-patio.webp",
      alt: "Caminho de pedras atravessando um jardim verde até um banco de madeira.",
      width: 800,
      height: 1200,
      decorative: false,
    },
  },
  {
    id: "botanical-cakes",
    title: "Coleção botânica",
    description:
      "Três bolos autorais com acabamentos delicados e decoração floral em tons suaves.",
    category: "Confeitaria",
    image: {
      src: "/images/portfolio/colecao-de-bolos.webp",
      alt: "Três bolos claros decorados com flores e folhagens sobre suportes de madeira.",
      width: 900,
      height: 900,
      decorative: false,
    },
  },
] as const satisfies readonly PortfolioItem[];
