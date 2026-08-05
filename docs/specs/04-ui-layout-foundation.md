# 1. Título

Componentes fundamentais de interface e layout

**Status:** Aprovada para implementação

## 2. Contexto

As seções dos três presets precisarão repetir padrões de largura, espaçamento, alinhamento, títulos, ações e superfícies. Implementar cada seção diretamente com marcação e CSS próprios aumentaria inconsistência e dificultaria acessibilidade e responsividade. Por outro lado, a arquitetura proíbe criar um design system completo ou componentes sem uso concreto.

Esta spec estabelece apenas as primitives necessárias para suportar o catálogo inicial de seções da spec 06.

## 3. Objetivo

Criar uma fundação pequena, acessível, responsiva e independente de conteúdo de cliente para padronizar layout e elementos de interface recorrentes sem transformar o projeto em uma biblioteca genérica.

## 4. Escopo

- Criar primitives de layout para container, fluxo vertical, agrupamento horizontal, grid responsivo e wrapper de seção.
- Criar primitives de interface para heading, texto auxiliar, ação primária ou secundária e superfície estrutural de card.
- Criar utilitário acessível para conteúdo visualmente oculto quando houver uso concreto.
- Definir contratos de variantes fechadas e mínimas.
- Aplicar CSS Modules próximos de cada componente.
- Consumir os tokens semânticos da spec 03.
- Definir semântica HTML e comportamento responsivo padrão.
- Fornecer APIs públicas controladas para uso pelas seções.
- Substituir apenas estilos demonstrativos do `create-next-app` diretamente relacionados à página inicial quando necessário para validar a fundação.

## 5. Fora do escopo

- Catálogo de seções, header completo, footer completo, hero, cards de serviço ou produto.
- Compositor de páginas e presets.
- Formulários, modal, carrossel, acordeão, tabs ou componentes complexos.
- Biblioteca completa de ícones.
- Sistema de utilitários globais.
- Storybook, pacote publicável ou documentação visual externa.
- Variantes específicas de clientes concretos.
- Componentes criados apenas para eventual uso futuro.

## 6. Requisitos funcionais

- `Container` deve limitar largura, preservar gutters fluidos e aceitar conteúdo sem impor semântica inadequada.
- `Stack` deve organizar filhos em fluxo vertical com opções limitadas de espaçamento sem permitir valores CSS arbitrários.
- `Cluster` deve agrupar itens com wrap e alinhamentos conhecidos, atendendo navegação, ações e metadados.
- `Grid` deve adaptar a quantidade de colunas ao espaço disponível por CSS, sem depender de JavaScript ou modelo de aparelho.
- `SectionShell` deve padronizar espaçamento vertical, largura e superfícies permitidas, podendo receber ID estável para navegação.
- `Heading` deve permitir nível semântico explícito sem escolher heading pelo tamanho visual.
- Ações devem renderizar link para navegação e botão somente para ação, sem elemento polimórfico permissivo que esconda semântica.
- Variantes de ação devem ser finitas, inicialmente primária e secundária, com estado de foco e desabilitação apenas quando semanticamente aplicável.
- A superfície de card deve ser estrutural e não conhecer serviço, produto, depoimento ou profissional.
- Componentes devem aceitar apenas as props necessárias e não receber configuração global.
- Links externos abertos em nova aba devem aplicar proteções adequadas e informar comportamento quando necessário.

## 7. Requisitos não funcionais

- Objetivo mínimo de acessibilidade: WCAG 2.2 nível AA dentro do escopo dos componentes.
- Operação completa por teclado para elementos interativos.
- Foco visível em todas as superfícies suportadas.
- Área de toque adequada para ações principais.
- Layout mobile-first, fluido e sem overflow horizontal.
- Tolerância a texto longo, aumento de fonte e zoom.
- CSS Modules, classes semânticas em `camelCase` e ausência de `!important` sem justificativa.
- Server Components por padrão; Client Components apenas quando um comportamento real exigir estado ou APIs do browser.
- Nenhuma dependência nova.
- Baixo JavaScript no cliente e ausência de efeitos para layout.

## 8. Decisões arquiteturais

- `components/ui` conterá primitives visuais sem significado de negócio.
- `components/layout` conterá primitives de distribuição e estrutura.
- Componentes fundamentais dependerão apenas de estilos e contratos locais; não importarão `site`, `presets`, `sections` ou conteúdo concreto.
- APIs polimórficas genéricas com propriedade `as` não serão adotadas por padrão. Componentes distintos para link e botão preservam semântica e tipagem mais claras.
- Variantes usarão unions literais fechadas. Valores internos de gap e tamanho serão resolvidos por classes conhecidas, não por strings CSS arbitrárias.
- Primitives de layout não devem substituir HTML semântico. O consumidor continuará responsável por usar `nav`, `main`, `header`, `footer`, listas e headings adequados.
- Não criar barrel global. Um índice local só será permitido quando representar fronteira pública clara e não esconder ciclos.
- A responsividade ficará majoritariamente no CSS. Não criar hooks de viewport para layout.
- A fundação poderá evoluir quando repetição real surgir nas seções, mas a spec não autoriza antecipar todos os componentes de um design system.

## 9. Estrutura impactada

- `src/components/layout`: container, stack, cluster, grid e section shell.
- `src/components/ui`: heading, texto, action link, button quando necessário, surface/card e visually hidden quando usado.
- CSS Modules colocalizados.
- Testes colocalizados quando a infraestrutura da spec 12 estiver disponível.
- Página inicial apenas como consumidor temporário ou real da fundação, sem conteúdo definitivo de preset antes das specs correspondentes.

## 10. Fluxo esperado

### Desenvolvedor que configura um cliente

1. Não edita componentes fundamentais para alterar conteúdo ou marca.
2. Ajusta identidade pela definição de tema.
3. Usa as primitives ao criar ou customizar seções, selecionando variantes conhecidas.
4. Cria nova variante somente quando existir diferença recorrente e documentada.

### Aplicação durante build ou runtime

1. Server Components renderizam as primitives com props específicas.
2. CSS Modules aplicam geometria local e consomem tokens globais.
3. O navegador adapta layout por CSS conforme espaço e conteúdo.
4. Nenhum estado global ou script de layout é carregado.

### Usuário final

1. Navega por teclado e enxerga foco.
2. Lê conteúdo em diferentes larguras, zoom e tamanhos de fonte.
3. Usa links e botões com semântica e comportamento previsíveis.

## 11. Critérios de aceite

- Dado que `Container` é usado em tela estreita, quando a largura diminui, então gutters permanecem e não ocorre overflow horizontal.
- Dado que `Grid` recebe quantidade variável de itens, quando o viewport muda, então a distribuição se adapta por CSS sem JavaScript.
- Dado que um heading precisa ser visualmente grande mas semanticamente nível 2, quando renderizado, então o elemento continua sendo `h2`.
- Dado que o destino representa navegação, quando a ação é renderizada, então o elemento é um link; dado que representa operação, então é um botão.
- Dado que uma ação recebe foco por teclado, quando qualquer variante é utilizada, então o indicador permanece visível e contrastante.
- Dado que o texto aumenta para 200%, quando as primitives são verificadas, então não há corte por altura fixa nem perda de conteúdo.
- Dado que os imports são revisados, então `components` não importa configuração concreta, conteúdo ou presets.
- Dado que o bundle de cliente é analisado, então primitives estáticas não foram convertidas em Client Components.

## 12. Cenários de erro e borda

- Label de ação muito longo.
- Grupo de ações que precisa quebrar linha em tela pequena.
- Grid com um único item ou quantidade não múltipla de colunas.
- Heading sem nível semântico explícito.
- ID de seção vazio ou duplicado, cuja validação final pertence ao compositor.
- Link externo inválido ou nova aba sem proteção.
- Botão desabilitado usado para navegação.
- Props abertas permitindo atributos incompatíveis com a semântica.
- Valores arbitrários de gap, cor ou raio escapando do contrato.
- `overflow-x: hidden` usado para mascarar defeito de layout.

## 13. Estratégia de testes

- Testes de componentes futuros devem validar roles, nomes acessíveis, elementos HTML e variantes com comportamento relevante.
- Testes unitários podem cobrir resolução de classes de variantes quando houver lógica não trivial.
- Testes de integração posteriores devem renderizar primitives dentro de seções reais.
- Testes end-to-end devem cobrir foco, navegação e menu quando o catálogo introduzir interatividade.
- Validação manual deve incluir 320 px de largura, zoom de 200%, texto longo, teclado e preferência de movimento reduzido.
- Não criar snapshots extensos nem testes que apenas confirmem texto estático.

## 14. Definição de pronto

- Conjunto mínimo de primitives implementado e utilizado por ao menos uma composição de validação ou pelas seções quando integradas.
- APIs públicas tipadas, pequenas e documentadas.
- Variantes fechadas e sem valores CSS arbitrários.
- Semântica de links, botões e headings preservada.
- CSS Modules colocalizados e tokens semânticos consumidos.
- Nenhum import proibido ou Client Component desnecessário.
- Responsividade, foco, zoom e texto longo validados.
- Nenhuma dependência adicionada.
- Lint, typecheck, testes disponíveis e build executados com sucesso.

## 15. Instruções para o Codex

- Ler `AGENTS.md`, arquitetura, guideline e specs 01–03 implementadas.
- Inspecionar a estrutura atual antes de criar diretórios.
- Implementar apenas as primitives listadas e realmente necessárias ao catálogo previsto.
- Não criar design system completo, Storybook, biblioteca de ícones ou utilities globais.
- Não adicionar dependências nem atualizar pacotes.
- Preservar Server Components por padrão e manter `"use client"` na menor fronteira possível.
- Usar HTML nativo, CSS Modules, CSS Custom Properties e TypeScript estrito.
- Não importar dados concretos de `site` nem presets.
- Não usar JS para layout resolvível por CSS.
- Executar lint, typecheck, testes e build conforme disponíveis.
- Revisar o diff e documentar ambiguidades e validações não executadas.
- Não afirmar que um comando passou sem executá-lo.
