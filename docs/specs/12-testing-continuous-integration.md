# 1. Título

Estratégia de testes e integração contínua

**Status:** Aprovada para implementação

## 2. Contexto

As specs anteriores introduzem contratos, resolvers, componentes, seções, presets e SEO. O repositório atual possui apenas scripts de desenvolvimento, lint e build, sem typecheck isolado, test runner ou pipeline de CI. Confiar somente no build não valida comportamento, acessibilidade, composição nem regressão entre presets.

A estratégia deve buscar confiança proporcional ao risco e evitar cobertura artificial ou ferramentas redundantes.

## 3. Objetivo

Definir e implementar uma infraestrutura de testes e GitHub Actions que valide lint, tipos, regras puras, componentes relevantes, integração entre camadas, smoke end-to-end e build de produção em ambiente reproduzível.

## 4. Escopo

- Adicionar script explícito de typecheck.
- Adotar Vitest como runner de testes unitários, de componentes e de integração síncrona.
- Adotar React Testing Library e matchers acessíveis para componentes.
- Adotar Playwright para smoke e fluxos end-to-end.
- Adotar `@axe-core/playwright` para verificações automatizadas básicas de acessibilidade consumidas pela spec 13.
- Configurar aliases TypeScript, CSS Modules, imagens e ambiente de DOM conforme necessário.
- Definir convenções de localização e nomenclatura dos testes.
- Criar fixtures representativas dos três presets sem dados reais de cliente.
- Criar workflow de GitHub Actions para pushes e pull requests direcionados à `main`.
- Executar instalação reproduzível com npm e cache oficial do gerenciador.
- Publicar relatório ou artifacts de Playwright somente quando útil, principalmente em falha.
- Documentar comandos locais e limites da estratégia.

## 5. Fora do escopo

- Cobertura de 100% ou threshold numérico rígido sem baseline.
- Testes visuais por screenshot como gate inicial.
- Serviço externo de CI, BrowserStack, SaaS de cobertura ou monitoramento pago.
- Matriz extensa de versões de Node ou sistemas operacionais.
- Testes de analytics, formulários, autenticação ou integrações inexistentes.
- Testes de implementação interna, snapshots extensos ou duplicação de cenários.
- Deploy automático, que pertence à spec 14.
- Alteração de dependências de produção.

## 6. Requisitos funcionais

- `npm run typecheck` deve executar TypeScript sem emissão.
- O comando de testes padrão em CI deve terminar após uma execução e retornar código de saída não zero em falha.
- Deve existir comando separado para watch local.
- Testes unitários devem cobrir validação de configuração, IDs, conteúdo, tema, composição, presets, canonical e JSON-LD.
- Testes de componentes devem cobrir semântica, estados opcionais, variantes com lógica e menu mobile.
- Testes de integração devem validar configuração → preset → composição → catálogo → seção → metadata.
- Playwright deve cobrir abertura da home, navegação principal, âncoras, menu mobile, links principais e ausência de erro de runtime.
- Os três presets devem possuir ao menos um cenário de smoke.
- O workflow deve executar `npm ci`, lint, typecheck, testes automatizados aplicáveis e build.
- O workflow deve usar versão de Node compatível com Next.js 16, no mínimo 20.9, fixada de forma previsível.
- O cache deve usar suporte oficial de `actions/setup-node` para npm e `package-lock.json`.
- Falha em qualquer quality gate obrigatório deve falhar o workflow.
- O pipeline não deve afirmar sucesso se uma etapa foi omitida por configuração incorreta.

## 7. Requisitos não funcionais

- Testes determinísticos, independentes de rede e sem dados sensíveis.
- Execução local compatível com npm e lockfile atual.
- Seletores de UI baseados em role, nome acessível e label, não em classes CSS.
- Fixtures pequenas, explícitas e sem compartilhamento mutável.
- Tempo de execução proporcional a um template pequeno.
- Nenhum teste deve depender da ordem de execução de outro.
- Async Server Components devem ser preferencialmente cobertos por E2E quando o runner unitário não os suportar adequadamente.
- Dependências de teste devem ser apenas `devDependencies` e possuir necessidade explícita.
- A configuração deve funcionar com aliases `@/` e TypeScript estrito.

## 8. Decisões arquiteturais

- Vitest será escolhido por integração simples com TypeScript, Vite e Testing Library para funções puras e componentes síncronos.
- Playwright cobrirá a aplicação em ambiente de navegador e será a principal estratégia para Server Components assíncronos e fluxos completos.
- Não serão mantidos Jest e Vitest simultaneamente.
- `@axe-core/playwright` será usado como detector automatizado complementar, não como prova de conformidade WCAG.
- Testes ficarão próximos dos módulos quando unitários ou de componente; testes end-to-end ficarão em diretório próprio.
- O workflow inicial poderá executar E2E contra build e servidor de produção compatíveis com o estado anterior à spec 14. Ao habilitar `output: "export"`, a spec 14 deverá atualizar o servidor de teste para servir a pasta estática sem introduzir dependência desnecessária.
- O pipeline terá jobs ou etapas claras para qualidade e E2E. Paralelismo só será usado se reduzir tempo sem duplicar instalação de forma desproporcional.
- Não definir threshold de cobertura inicialmente. Relatórios poderão orientar lacunas, mas cobertura não substitui seleção de riscos.
- Actions devem ser fixadas por versão principal estável ou SHA conforme política adotada, usando somente ações oficiais ou amplamente necessárias.

## 9. Estrutura impactada

- `package.json`: scripts de typecheck, testes e E2E.
- `package-lock.json`: somente pelas devDependencies aprovadas.
- Configuração do Vitest e setup da Testing Library.
- Configuração do Playwright.
- Testes colocalizados nos módulos.
- Diretório de testes end-to-end.
- Fixtures compartilhadas limitadas aos contratos públicos.
- `.github/workflows`: workflow de integração contínua.
- `.gitignore`: artifacts locais de teste quando necessário.
- Documentação de comandos de validação.

## 10. Fluxo esperado

### Desenvolvedor

1. Instala dependências com `npm ci` ou `npm install` conforme contexto local.
2. Executa testes em watch durante desenvolvimento.
3. Antes de concluir, executa lint, typecheck, testes, E2E aplicável e build separadamente.
4. Corrige a causa em vez de desabilitar regra ou teste.
5. Revisa reports de falha e informa limitações reais do ambiente.

### CI

1. Recebe push ou pull request para `main`.
2. Configura Node compatível e cache npm.
3. Executa `npm ci`.
4. Executa lint, typecheck, testes unitários/integrados e build.
5. Executa smoke E2E em ambiente de produção ou estático compatível.
6. Publica artifact de diagnóstico quando houver falha relevante.
7. Falha o check se qualquer gate obrigatório falhar.

### Usuário final

1. Não interage diretamente com a infraestrutura.
2. Recebe menor risco de regressão em navegação, conteúdo, responsividade básica e runtime.

## 11. Critérios de aceite

- Dado um erro TypeScript que o build não deveria ocultar, quando `npm run typecheck` é executado, então o comando falha.
- Dado um teste unitário falhando, quando o workflow executa, então o job falha e não é marcado como sucesso.
- Dado que um dos três presets não renderiza, quando o smoke E2E roda, então a falha identifica o preset ou cenário.
- Dado que o menu mobile é testado, quando o Playwright interage por role e nome acessível, então o fluxo não depende de classe CSS.
- Dado que uma página possui violação automatizável grave detectada pelo axe, quando o smoke de acessibilidade roda, então o teste falha com diagnóstico.
- Dado que o workflow inicia em runner limpo, quando instala dependências, então usa `npm ci` e o lockfile oficial.
- Dado que `package.json` é inspecionado, então não existem dois runners unitários concorrentes.
- Dado que uma validação não foi executada localmente, quando a implementação é reportada, então a limitação é declarada e não apresentada como sucesso.

## 12. Cenários de erro e borda

- Teste depende de rede, timezone ou relógio real.
- Fixture mutada entre testes.
- Alias funciona no Next.js mas não no runner.
- CSS Module ou `next/image` quebra ambiente de teste.
- Playwright não encontra browser no CI.
- Servidor de teste continua usando `next start` após static export.
- Artifact cresce indefinidamente.
- Workflow usa versão de Node incompatível.
- Teste flakey mascarado com retries excessivos.
- Snapshot extenso aprovado sem revisão.
- Coverage alta com fluxos críticos sem teste.

## 13. Estratégia de testes

Esta spec implementa a própria estratégia:

- Unitários: validadores, resolvers, transformações e serialização.
- Componentes: interações, semântica, acessibilidade e estados relevantes.
- Integração: contratos entre configuração, conteúdo, tema, composição, seções e SEO.
- E2E: smoke dos três presets, navegação, menu mobile, âncoras e erros de runtime.
- Acessibilidade automatizada: axe em páginas e estados críticos.
- Manual: revisão de reports, investigação de flakiness e validações que automação não cobre.

Testes devem validar comportamento observável e evitar repetição entre camadas.

## 14. Definição de pronto

- Vitest, Testing Library, Playwright e axe configurados e justificados.
- Scripts de lint, typecheck, testes, watch, E2E e build documentados.
- Testes prioritários das specs 01–11 implementados.
- Smoke dos três presets funcionando.
- Workflow GitHub Actions criado com npm, Node compatível e cache.
- Falhas obrigatórias bloqueiam o workflow.
- Reports e artifacts limitados ao necessário.
- Nenhuma dependência de produção adicionada.
- Pipeline executado com sucesso no GitHub Actions.
- Diff revisado e nenhuma regra desabilitada para forçar passagem.

## 15. Instruções para o Codex

- Ler `AGENTS.md`, arquitetura, guideline e specs 01–11 implementadas.
- Consultar documentação local de testes do Next.js 16 e documentação oficial das ferramentas escolhidas.
- Adicionar somente devDependencies necessárias a Vitest, Testing Library, Playwright e axe.
- Não instalar Jest, Cypress, Storybook ou serviço externo em paralelo.
- Não atualizar dependências existentes fora do necessário.
- Preservar TypeScript estrito e aliases.
- Testar comportamento, não detalhes internos ou classes CSS.
- Não usar retries para esconder flakiness.
- Executar todos os scripts localmente quando o ambiente permitir e confirmar o workflow remoto.
- Revisar o diff, lockfile e artifacts gerados.
- Documentar ambiguidades e validações não executadas.
- Não afirmar que um comando ou workflow passou sem executá-lo.
