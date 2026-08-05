# 1. Título

Investigação da resolução de presets e seletor de demonstração

**Status:** Aprovada para implementação

## 2. Contexto

A configuração central permite selecionar os presets `services`, `commerce` e `professional`, mas a alteração manual de `presetId` não produziu uma diferença visual clara durante `npm run dev`.

A inspeção inicial indica que o valor configurado participa do fluxo atual: ele é utilizado para criar o conteúdo da home, resolver o blueprint do preset e montar a página final. Entretanto, o conteúdo de marca e boa parte do conteúdo editorial continuam sendo os mesmos, pois pertencem ao cliente demonstrativo “Estúdio Horizonte”, e não ao preset.

Também existe convergência visual no primeiro viewport:

- os presets `services` e `commerce` solicitam hero `split`, mas o conteúdo compartilhado não fornece imagem e o resolver converte o resultado para `centered`;
- o preset `professional` fornece imagem ao conteúdo, mas utiliza hero `centered`;
- o componente atual só apresenta a imagem quando a variante final é `split`;
- consequentemente, os três presets podem começar com hero visualmente muito semelhante, mesmo quando as seções seguintes são diferentes.

Antes de implementar uma interface de troca, é necessário confirmar se existe um defeito real de resolução, hot reload ou composição, ou se o comportamento observado é principalmente consequência de conteúdo compartilhado e variantes pouco perceptíveis.

Depois da investigação, o template deve oferecer uma forma própria de demonstração. Um controle flutuante e acessível permitirá alternar entre páginas estáticas dos três presets sem editar código, sem transformar a aplicação em multi-tenant e sem mover a composição completa para o cliente.

## 3. Objetivo

Investigar e corrigir, quando necessário, a troca efetiva de presets e implementar um seletor flutuante de demonstração que permita navegar entre versões estáticas de `services`, `commerce` e `professional`, preservando Server Components, exportação estática e o site configurado para o cliente.

## 4. Escopo

A implementação deve ocorrer em duas fases obrigatórias e sequenciais.

### Fase A — Investigação e correção

- Reproduzir a troca manual de `siteSettings.presetId` entre os três valores suportados.
- Verificar o comportamento em `npm run dev`, incluindo recompilação, atualização do navegador e necessidade indevida de reinício.
- Rastrear o valor desde `siteSettings` até `createHomeContent`, `resolvePreset`, `resolvePage` e `PageComposer`.
- Registrar para cada preset a ordem final, os tipos e as variantes resolvidas das seções.
- Confirmar se as diferenças esperadas estão presentes no DOM mesmo quando não são evidentes no primeiro viewport.
- Identificar se alguma variante configurada está sendo anulada ou convergindo para outra por causa de dados opcionais.
- Corrigir somente defeitos comprovados no fluxo de resolução, composição, hot reload ou contrato entre conteúdo e preset.
- Adicionar testes que impeçam regressão da seleção de preset.
- Documentar a conclusão da investigação no relatório da implementação e na documentação operacional afetada.

### Fase B — Seletor de demonstração

- Criar três páginas demonstrativas pré-renderizadas para `services`, `commerce` e `professional`.
- Usar rotas estáticas explícitas para evitar dependência de query string ou resolução por request.
- Criar um botão flutuante, redondo e acessível para abrir o seletor.
- Exibir no menu os três presets, o preset atual e destinos estáticos conhecidos.
- Navegar entre as páginas usando links, preservando a renderização principal no servidor.
- Exibir o seletor nas páginas de demonstração.
- Exibir o seletor também na home durante `npm run dev`, permitindo entrar diretamente no modo de demonstração.
- Ocultar o seletor da home no build de produção.
- Marcar as páginas demonstrativas como não indexáveis e excluí-las do sitemap.
- Atualizar a documentação de uso do template e criação de clientes.

## 5. Fora do escopo

- Alterar o conteúdo concreto “Estúdio Horizonte” apenas para simular clientes diferentes.
- Transformar preset em tema, marca ou conjunto de textos comerciais.
- Permitir que o usuário final de um site de cliente altere o layout em produção.
- Persistir seleção em banco, cookie, sessão, local storage ou configuração remota.
- Selecionar preset por domínio, tenant ou dado de request.
- Renderizar simultaneamente as três páginas e apenas esconder duas com CSS.
- Converter `PageComposer`, páginas ou seções inteiras em Client Components.
- Criar editor visual, painel administrativo ou page builder.
- Criar sistema de plugins, registro dinâmico ou descoberta automática de presets.
- Adicionar novos presets, temas, seções ou conteúdo de clientes.
- Adicionar dependências de ícones, menus, popovers ou estado global.
- Alterar a estratégia de deploy static-first.

## 6. Requisitos funcionais

### Investigação

- A alteração de `presetId` para `services` deve produzir uma página com seção de serviços e sem `product-showcase` ou `professional-profile`.
- A alteração para `commerce` deve produzir uma página com `product-showcase` e sem seção de serviços ou perfil profissional na composição padrão.
- A alteração para `professional` deve produzir uma página com `professional-profile` e seção de serviços.
- A página resolvida deve utilizar o mesmo identificador de preset na criação do conteúdo e na resolução do blueprint.
- O fluxo não pode manter uma definição de página obsoleta após uma alteração de configuração no ambiente de desenvolvimento.
- O relatório deve distinguir explicitamente:
  - defeito funcional;
  - comportamento correto, mas pouco perceptível;
  - conteúdo compartilhado que não deveria mudar com o preset.
- Caso o primeiro viewport permaneça semelhante por decisão legítima, isso não deve ser classificado automaticamente como falha, desde que a composição final e o indicador do seletor confirmem a troca.
- Caso uma variante declarada seja sempre anulada de forma incoerente com o contrato, a correção mínima deve ser realizada e testada.

### Páginas de demonstração

- Devem existir destinos estáticos equivalentes a:
  - `/demo/services/`;
  - `/demo/commerce/`;
  - `/demo/professional/`.
- Cada página deve criar conteúdo e resolver blueprint usando o mesmo `PresetId` explícito.
- As três páginas devem reutilizar o compositor, catálogo, conteúdo e tema existentes.
- Nenhuma página demonstrativa deve duplicar manualmente a árvore de seções.
- Cada página deve permanecer Server Component e ser compatível com `output: "export"`.
- A seleção de uma opção deve navegar para a rota correspondente e iniciar a página no topo.
- A rota inválida não deve escolher silenciosamente um preset padrão.

### Controle flutuante

- O botão deve ser circular, visualmente identificável e permanecer fixo próximo ao canto inferior lógico da viewport.
- O botão deve possuir nome acessível, por exemplo “Alternar preset de demonstração”.
- O ícone deve ser implementado sem dependência nova e não pode ser a única fonte do nome acessível.
- Ao ativar o botão, deve abrir um pequeno painel contendo as três opções.
- O painel deve indicar visualmente e semanticamente o preset atual.
- As opções devem ser links reais para as rotas estáticas.
- O botão deve informar o estado aberto por `aria-expanded` e relacionar-se ao painel por identificador estável.
- O painel deve fechar ao selecionar uma opção, pressionar Escape ou ativar novamente o botão.
- Ao fechar por Escape, o foco deve retornar ao botão.
- O controle deve funcionar por teclado, toque e mouse.
- O componente cliente deve controlar somente abertura, fechamento e foco do menu.
- A composição da página e a seleção do preset não podem ser armazenadas em estado React.

### Visibilidade e SEO

- Durante `npm run dev`, a home configurada deve exibir o botão flutuante como atalho para as páginas de demonstração.
- Em build de produção, a home configurada não deve exibir o seletor.
- As páginas `/demo/*` devem exibir o seletor para permitir comparação navegável.
- As páginas demonstrativas devem utilizar `noindex, nofollow`.
- As rotas demonstrativas não devem entrar no sitemap.
- O JSON-LD do negócio não deve ser duplicado nas páginas demonstrativas.
- A home normal deve continuar usando exclusivamente `site.settings.presetId` e preservar seu comportamento de produção.

## 7. Requisitos não funcionais

- Preservar Next.js 16.2.12, React 19.2.4 e TypeScript estrito.
- Preservar Server Components por padrão.
- Restringir `"use client"` ao controle flutuante e sua lógica interativa mínima.
- Preservar CSS Modules e CSS Custom Properties.
- Não adicionar dependências.
- Manter compatibilidade com exportação estática e acesso direto às rotas demonstrativas.
- Não utilizar query string, cookies, headers ou APIs de runtime para resolver o preset.
- Não introduzir Context, provider global, store ou estado global.
- O seletor deve respeitar WCAG 2.2 nível AA dentro do escopo.
- O alvo interativo deve possuir tamanho adequado para toque.
- O painel não pode produzir overflow horizontal em 320 CSS px.
- O controle não deve encobrir permanentemente conteúdo, ações importantes ou navegação.
- O menu deve possuir contraste, foco visível e ordem de tabulação previsível.
- A solução deve continuar funcional quando JavaScript estiver desabilitado nas rotas acessadas diretamente; apenas a abertura do menu flutuante poderá depender de JavaScript.
- A troca entre rotas não deve carregar as três composições no mesmo documento.

## 8. Decisões arquiteturais

- A home normal continua sendo a representação do cliente configurado. O modo de demonstração é uma ferramenta separada, não uma nova fonte de verdade.
- A seleção persistente do cliente continua em `src/site/config/site-settings.ts`.
- As páginas demonstrativas recebem um `PresetId` explícito e não mutam `siteSettings`.
- A renderização de cada preset ocorrerá em rota própria, permitindo que Next.js produza HTML estático separado.
- Não utilizar `searchParams` para alternar preset, pois a seleção por query em runtime conflita com a exportação estática e incentivaria composição no cliente.
- Não renderizar três `PageComposer` simultaneamente. Essa abordagem aumentaria HTML, JavaScript, IDs duplicados e problemas de acessibilidade.
- O seletor será um Client Component pequeno. Ele recebe somente o preset atual e destinos conhecidos; não recebe conteúdo, tema, página completa ou configuração global.
- O renderer demonstrativo pode permanecer próximo da camada `app` como adaptação específica de rota, reutilizando funções existentes de conteúdo, preset, SEO e composição.
- As rotas devem ser explícitas e simples. Não criar mecanismo genérico de descoberta de presets.
- O mesmo conteúdo de negócio pode aparecer nos três presets. Isso demonstra composição, não três clientes ou três marcas.
- O relatório de investigação deve anteceder qualquer correção visual ampla. Diferença discreta não autoriza redesenhar todos os presets sem evidência.
- Caso seja necessário corrigir a convergência de variante do hero, a alteração deve respeitar o contrato existente entre presença de mídia e variante, sem tornar imagem obrigatória para todos os clientes.
- A home de produção não deve importar comportamento demonstrativo para o usuário final além de código eliminado ou não renderizado pelo build.

## 9. Estrutura impactada

Conceitualmente, poderão ser criados ou alterados:

- testes do fluxo `siteSettings` → conteúdo → preset → página resolvida;
- testes das variantes resolvidas por preset;
- resolver de página, apenas se a investigação comprovar defeito;
- conteúdo demonstrativo, apenas se necessário para cumprir contratos existentes sem alterar conteúdo do cliente real;
- área privada de rota em `src/app/demo` para renderização compartilhada;
- páginas estáticas de demonstração para os três presets;
- componente cliente do seletor flutuante e seu CSS Module;
- home do App Router para exibição do atalho somente em desenvolvimento;
- metadata das páginas demonstrativas;
- geração de sitemap para exclusão das rotas de demonstração;
- testes unitários, de componente, integração e E2E existentes;
- `README.md` e `docs/NEW_CLIENT.md` para explicar preset, conteúdo compartilhado e modo de demonstração.

Não criar nova camada arquitetural global apenas para essa funcionalidade.

## 10. Fluxo esperado

### Desenvolvedor investigando

1. Inicia `npm run dev`.
2. Registra a composição renderizada com `services`.
3. Altera somente `presetId` para `commerce` e depois `professional`.
4. Confirma recompilação e compara tipos, IDs, variantes e headings finais.
5. Executa testes de resolução para os três presets.
6. Classifica a causa entre falha funcional, cache/HMR ou semelhança visual legítima.
7. Corrige apenas o defeito comprovado.
8. Registra a conclusão no relatório e na documentação operacional.

### Desenvolvedor demonstrando

1. Executa `npm run dev`.
2. Abre a home configurada.
3. Ativa o botão flutuante.
4. Seleciona `Serviços`, `Comércio` ou `Profissional`.
5. É navegado para a rota estática correspondente.
6. Compara ordem, seções e variantes sem editar arquivos.
7. Retorna a outro preset pelo mesmo seletor.

### Aplicação durante build

1. Mantém a home baseada em `site.settings.presetId`.
2. Pré-renderiza as três rotas de demonstração.
3. Resolve cada rota com conteúdo e blueprint do mesmo preset explícito.
4. Gera metadata não indexável para as rotas demonstrativas.
5. Exclui as rotas do sitemap e não gera JSON-LD duplicado.
6. Oculta o seletor da home de produção.

### Usuário final do site do cliente

1. Acessa a home normal sem controle de troca de preset.
2. Recebe somente o preset escolhido para o cliente.
3. Não encontra modo de personalização, configuração ou estado persistente.

## 11. Critérios de aceite

### Investigação

- Dado `presetId: "services"`, quando a home é resolvida, então a lista contém `services` e não contém `product-showcase` nem `professional-profile`.
- Dado `presetId: "commerce"`, quando a home é resolvida, então a lista contém `product-showcase` e não contém `services` nem `professional-profile`.
- Dado `presetId: "professional"`, quando a home é resolvida, então a lista contém `professional-profile` e `services`.
- Dado que somente `presetId` é alterado durante `npm run dev`, quando o arquivo é salvo e a página é recarregada, então a composição correspondente é apresentada sem editar outro módulo.
- Dado que nome, telefone e textos continuam “Estúdio Horizonte”, quando o preset muda, então isso é documentado como conteúdo compartilhado e não como falha da troca.
- Dado que duas variantes convergem, quando a investigação é concluída, então a causa e a decisão de corrigir ou preservar são registradas com evidência de DOM e resolução.
- Dado um defeito comprovado, quando a correção é aplicada, então existe teste que falharia no comportamento anterior.

### Seletor

- Dado `npm run dev` na home, quando a página abre, então existe um botão flutuante acessível para demonstração.
- Dado build de produção na home, quando o HTML é inspecionado, então o seletor não é renderizado.
- Dado `/demo/services/`, quando a página abre, então o seletor indica `Serviços` e a composição contém a seção de serviços.
- Dado `/demo/commerce/`, quando a página abre, então o seletor indica `Comércio` e a composição contém a vitrine de produtos.
- Dado `/demo/professional/`, quando a página abre, então o seletor indica `Profissional` e a composição contém perfil profissional.
- Dado o seletor fechado, quando o botão é ativado, então o painel abre, `aria-expanded` muda e as três opções ficam acessíveis.
- Dado o painel aberto, quando Escape é pressionado, então o painel fecha e o foco retorna ao botão.
- Dado uma opção diferente, quando o link é ativado, então ocorre navegação para a rota estática correspondente e a página inicia no topo.
- Dado teclado ou toque em 320 CSS px, quando o seletor é usado, então não existe perda de conteúdo, alvo pequeno ou overflow horizontal.
- Dado uma rota de demonstração, quando metadata e sitemap são inspecionados, então ela usa `noindex, nofollow`, não aparece no sitemap e não contém JSON-LD duplicado.
- Dado `npm run build`, quando a exportação termina, então existem arquivos estáticos acessíveis diretamente para as três rotas.

## 12. Cenários de erro e borda

- `presetId` válido alterado, mas HMR mantém módulo ou composição obsoleta.
- Conteúdo criado com um preset e blueprint resolvido com outro.
- Conteúdo órfão ou seção obrigatória ausente após a troca.
- Hero `split` sem mídia e fallback visual não documentado.
- Hero com mídia em variante que não a apresenta.
- Usuário confunde nome do negócio com nome do preset.
- Rotas demonstrativas inseridas no sitemap ou indexadas por mecanismo de busca.
- JSON-LD duplicado em três páginas com o mesmo negócio.
- Seletor aparece na home de produção.
- Seletor depende de query string, cookie ou local storage.
- Menu abre fora da viewport ou atrás de conteúdo por z-index incorreto.
- Botão encobre CTA, consentimento ou navegação em telas pequenas.
- Escape fecha o painel, mas perde o foco.
- Clique em opção atual provoca estado inconsistente.
- Navegação direta ou refresh em `/demo/*` retorna 404 no preview estático.
- JavaScript desabilitado impede abertura do seletor, mas as rotas diretas devem continuar renderizadas.
- Novo preset adicionado futuramente sem atualização explícita do seletor e dos testes.

## 13. Estratégia de testes

- Testes unitários devem cobrir `createHomeContent`, `resolvePreset` e `resolvePage` para os três presets, verificando ordem, tipos e variantes relevantes.
- Um teste deve garantir que conteúdo e blueprint utilizam o mesmo `PresetId` no renderer demonstrativo.
- Testes de regressão devem cobrir qualquer correção identificada durante a investigação.
- Testes de componente com Testing Library devem cobrir abertura, fechamento, Escape, retorno de foco, nome acessível, `aria-expanded` e indicação do item atual.
- Os testes devem selecionar controles por role e nome acessível, não por classes CSS.
- Testes de integração devem confirmar que cada rota resolve a página correta sem duplicar manualmente as seções.
- Testes E2E com Playwright devem navegar entre as três rotas pelo seletor e verificar headings ou seções exclusivas de cada preset.
- E2E deve validar acesso direto e refresh das três rotas contra a pasta `out`.
- E2E deve verificar ausência de overflow horizontal e violações sérias ou críticas de axe no seletor aberto e fechado.
- Testes de SEO devem confirmar `noindex`, ausência no sitemap e ausência de JSON-LD nas rotas demonstrativas.
- O build de produção deve validar que a home normal não contém o seletor.
- Evitar snapshots extensos e testes que dependam da aparência literal do ícone.
- Validação manual deve comparar os três presets, teclado, foco, toque, viewport pequena e comportamento durante `npm run dev`.

## 14. Definição de pronto

- Investigação executada e conclusão registrada com causa comprovada.
- Troca manual de `siteSettings.presetId` validada para os três presets.
- Defeitos comprovados corrigidos com testes de regressão.
- Diferença entre conteúdo de cliente e preset documentada.
- Três rotas demonstrativas estáticas implementadas.
- Seletor flutuante circular implementado com fronteira cliente mínima.
- Navegação entre presets realizada por links para rotas estáticas.
- Estado atual indicado de forma visual e acessível.
- Operação por teclado, Escape, foco e toque validada.
- Seletor disponível na home em desenvolvimento e ausente na home de produção.
- Rotas demonstrativas não indexáveis, fora do sitemap e sem JSON-LD duplicado.
- Static export e refresh direto das três rotas validados.
- Nenhum Context, store, local storage, cookie, query string ou dependência adicionado.
- README e documentação de criação de cliente atualizados.
- Lint, typecheck, testes, E2E, validação estática e build executados com sucesso.
- Diff revisado e limitado à investigação, correção comprovada, seletor, rotas, testes e documentação correspondente.

## 15. Instruções para o Codex

- Ler `AGENTS.md`, `docs/ARCHITECTURE.md`, `docs/CODING_GUIDELINES.md` e esta spec integralmente.
- Inspecionar `package.json`, configuração do site, conteúdo da home, presets, resolver, compositor, hero, metadata, sitemap e testes existentes.
- Consultar a documentação em `node_modules/next/dist/docs/` para App Router, rotas estáticas, metadata, ambiente e exportação estática do Next.js 16.2.12.
- Executar primeiro a Fase A e registrar a causa antes de implementar a Fase B.
- Não assumir que o nome “Estúdio Horizonte” deve mudar com o preset.
- Corrigir apenas defeitos comprovados e não redesenhar os presets por percepção subjetiva.
- Implementar rotas estáticas explícitas, não seleção por query string ou request.
- Manter páginas, compositor e seções como Server Components.
- Manter `"use client"` somente no seletor interativo mínimo.
- Não renderizar as três composições simultaneamente.
- Não mutar `siteSettings`, não persistir seleção e não criar estado global.
- Não adicionar dependências nem atualizar pacotes fora do escopo.
- Preservar TypeScript estrito, CSS Modules, variáveis CSS, acessibilidade e static export.
- Garantir `noindex`, exclusão do sitemap e ausência de JSON-LD nas páginas demonstrativas.
- Atualizar testes existentes em vez de criar infraestrutura paralela.
- Executar `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run validate:static` e `npm run test:e2e`.
- Revisar o diff e informar arquivos alterados, causa da investigação, comandos executados e resultados.
- Documentar qualquer validação não executada e não afirmar que um comando passou sem executá-lo.