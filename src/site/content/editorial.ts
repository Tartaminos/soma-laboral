import type { Highlight } from "@/domain/content";

export const highlights = [
  {
    id: "listen-first",
    title: "Escuta antes da atividade",
    description:
      "A proposta começa entendendo a rotina, os setores e as necessidades das pessoas que serão atendidas.",
  },
  {
    id: "company-routine",
    title: "Planejamento para a realidade da empresa",
    description:
      "Horários, frequência e formato são organizados para que a atividade faça sentido no dia a dia da equipe.",
  },
  {
    id: "whole-person-care",
    title: "Cuidado além do procedimento",
    description:
      "O trabalho considera o bem-estar físico e a experiência dos colaboradores, com uma condução próxima e respeitosa.",
  },
] as const satisfies readonly Highlight[];

export const aboutParagraphs = [
  "A Soma Laboral nasceu da experiência de cuidar de pessoas dentro do ambiente de trabalho, com atividades conduzidas de forma próxima, responsável e adaptada a cada empresa.",
  "Mais do que cumprir uma programação, o objetivo é criar momentos que façam sentido para os colaboradores e contribuam para uma rotina de trabalho mais saudável e acolhedora.",
] as const;
