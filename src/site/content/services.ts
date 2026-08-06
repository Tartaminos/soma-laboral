import type { Service } from "@/domain/content";

export const services = [
  {
    id: "workplace-exercise",
    name: "Ginástica Laboral",
    summary:
      "Práticas orientadas para movimentar o corpo durante a jornada, ajudar na prevenção de desconfortos e criar uma pausa de cuidado no dia.",
  },
  {
    id: "quick-massage",
    name: "Quick Massage",
    summary:
      "Sessões breves de massagem realizadas no ambiente de trabalho, pensadas para oferecer relaxamento e bem-estar sem atrapalhar a rotina.",
  },
  {
    id: "sipat",
    name: "SIPAT",
    summary:
      "Atividades de saúde e bem-estar que ajudam a tornar a programação da SIPAT mais próxima, participativa e útil para os colaboradores.",
  },
] as const satisfies readonly Service[];
