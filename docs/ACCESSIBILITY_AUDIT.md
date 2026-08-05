# Auditoria de acessibilidade e responsividade

## Baseline automatizada

O Playwright verifica Chromium desktop e mobile contra a pasta `out`:

- landmarks, heading principal e navegação;
- menu móvel, estado anunciado, fechamento e retorno de foco;
- overflow horizontal em 320 CSS px;
- canonical, JSON-LD, assets e ausência de erros de runtime;
- axe completo, sem regras desabilitadas, bloqueando violações sérias e críticas.

Os três presets são resolvidos em testes de integração, incluindo ordem,
conteúdo obrigatório, defaults condicionais e referências de destaque.

## Matriz manual obrigatória

Para cada preset usado pelo cliente, verifique:

- larguras de 320, 375, 768, 1024 e 1440 CSS px;
- retrato e paisagem;
- zoom de 200% e fonte ampliada;
- teclado do início ao fim e indicador de foco;
- leitor de tela nos landmarks, headings, navegação e imagens;
- contraste de texto, bordas essenciais, ação, hover e foco;
- `prefers-reduced-motion`;
- nome comercial e títulos longos;
- listas com um item e muitos itens;
- imagens opcionais ausentes e proporções variadas;
- portfólio com um e vários itens, ordem do destaque, figures, captions e alt
  texts específicos;
- links com nomes compreensíveis fora do contexto.

## Resultado da implementação-base

Em 28 de julho de 2026:

- lint, typecheck, 33 testes Vitest, export estático e validação de saída foram
  executados localmente;
- 11 cenários Playwright passaram em Chromium desktop e mobile;
- axe não encontrou violações sérias ou críticas nas composições `services`,
  `commerce` e `professional`;
- os três presets foram exportados e não apresentaram overflow em 320 px;
- os portfólios de `services` e `professional` carregaram todas as imagens e
  permaneceram navegáveis por âncora;
- a estrutura usa um `main`, skip link, landmarks nativos, listas semânticas,
  foco visível e redução de movimento.

Limites: automação não certifica WCAG. Leitor de tela, zoom visual, contraste
medido e dispositivos físicos devem ser repetidos com o conteúdo e tema reais do
cliente.
