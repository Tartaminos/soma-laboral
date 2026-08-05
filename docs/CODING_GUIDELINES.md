# Guideline de Codificação do Business Site Template

> Padrões oficiais de implementação do repositório `business-site-template`.

## 1. Informações do documento

| Campo | Valor |
|---|---|
| Status | Aprovado |
| Versão | 0.1 |
| Data | 28 de julho de 2026 |
| Repositório | `Tartaminos/business-site-template` |
| Documento relacionado | `docs/ARCHITECTURE.md` |
| Responsabilidade | Definir como o código deve ser escrito, organizado, validado e revisado |

Este documento complementa a arquitetura oficial. A arquitetura define os limites do sistema; este guideline define as práticas obrigatórias para implementá-los.

---

## 2. Objetivo

Este guideline existe para:

- manter consistência entre implementações;
- orientar desenvolvedores e agentes de codificação;
- preservar a arquitetura;
- reduzir decisões arbitrárias;
- evitar acoplamento e abstrações prematuras;
- garantir legibilidade, acessibilidade, desempenho e testabilidade;
- tornar o código previsível para manutenção futura.

As regras devem melhorar a qualidade técnica. Preferências puramente estéticas não devem se transformar em regras sem benefício concreto.

---

## 3. Escopo

Este documento se aplica a:

- TypeScript;
- React;
- Next.js e App Router;
- Server Components e Client Components;
- CSS Modules e CSS Custom Properties;
- configuração, conteúdo, presets e composição;
- componentes e seções;
- integrações;
- testes, scripts e documentação técnica;
- código produzido por desenvolvedores, Codex ou outros agentes.

---

## 4. Ordem de precedência

Em caso de conflito, a ordem de precedência será:

1. arquitetura aprovada em `docs/ARCHITECTURE.md`;
2. este guideline de codificação;
3. spec aprovada da funcionalidade;
4. documentação instalada da versão atual do Next.js;
5. documentação oficial do React e do TypeScript;
6. convenções existentes no módulo afetado.

Toda spec deve ser elaborada com base neste guideline e não pode contrariá-lo silenciosamente.

Uma spec também não pode alterar silenciosamente uma decisão arquitetural. Quando uma implementação exigir mudança na arquitetura ou neste guideline, a alteração deverá ser discutida, aprovada e documentada antes da implementação.

---

## 5. Fonte de verdade técnica

Antes de implementar uma funcionalidade específica do Next.js, o responsável deverá:

1. ler `AGENTS.md`;
2. identificar o assunto técnico envolvido;
3. consultar a documentação correspondente em `node_modules/next/dist/docs/`;
4. confirmar que a API pertence à versão instalada;
5. verificar avisos de depreciação;
6. evitar depender apenas de conhecimento prévio.

Isso se aplica especialmente a App Router, metadata, cache, renderização, Server Components, Client Components, Server Actions, Route Handlers, exportação estática, imagens, fontes, configuração e deploy.

O conteúdo entre marcadores gerenciados pelo Next.js dentro de `AGENTS.md` não deve ser removido ou alterado sem justificativa. Regras do projeto devem ser adicionadas fora desses marcadores.

---

## 6. Fluxo antes da implementação

Antes de escrever código:

1. ler integralmente a spec;
2. ler as partes relacionadas da arquitetura e deste guideline;
3. inspecionar os arquivos afetados;
4. identificar as camadas envolvidas;
5. verificar convenções existentes;
6. consultar a documentação da versão instalada quando aplicável;
7. identificar dependências, impactos e riscos;
8. confirmar o que está fora do escopo;
9. evitar alterações preventivas em áreas não relacionadas.

Não criar arquivos apenas com base nos nomes sugeridos por uma spec sem antes inspecionar a estrutura real do projeto.

---

## 7. Princípios gerais

### 7.1 Código explícito

Prefira código cuja intenção possa ser entendida diretamente. Evite comportamento implícito, mutações ocultas, side effects durante renderização, merges profundos, propriedades mágicas e convenções não documentadas.

### 7.2 Responsabilidade e coesão

Um módulo deve possuir uma responsabilidade principal. Código que muda pelo mesmo motivo deve permanecer próximo, como componente e CSS Module, seção e testes, integração e normalização.

Não existe limite arbitrário de linhas. Divida um arquivo quando ele misturar responsabilidades, dificultar leitura ou teste, ou violar uma fronteira arquitetural.

### 7.3 Baixo acoplamento

Um módulo deve conhecer apenas o necessário. Não forneça a configuração global inteira quando o consumidor precisa apenas de um título, uma lista, uma ação ou uma variante.

### 7.4 Sem abstração por previsão

Não crie abstrações porque algo poderá ser necessário no futuro. Extraia uma abstração quando houver repetição relevante, mais de um caso concreto ou uma fronteira arquitetural real.

### 7.5 Clareza antes de poucas linhas

Código menor não é necessariamente mais simples. Não compacte lógica apenas para reduzir linhas.

---

## 8. Idioma e nomenclatura

Identificadores técnicos devem ser escritos em inglês. A documentação principal pode permanecer em português, e o conteúdo exibido deve usar o idioma configurado para o cliente.

Não misture idiomas no mesmo identificador.

Convenções:

- arquivos e diretórios comuns: `kebab-case`;
- componentes e tipos: `PascalCase`;
- funções e variáveis: `camelCase`;
- funções devem usar verbos que representem a operação;
- booleanos devem usar prefixos como `is`, `has`, `can`, `should` ou `supports`;
- callbacks recebidos usam `on`; handlers internos usam `handle`;
- `SCREAMING_SNAKE_CASE` apenas para constantes globais realmente invariáveis.

Não utilize prefixos como `I`, `T`, `Interface` ou `Type` para tipos.

Nomes devem expressar responsabilidade, não aparência momentânea. Prefira `ContactSection` a `BlueBox`.

---

## 9. Organização, imports e exports

Cada arquivo deve possuir uma responsabilidade principal. Pequenos helpers, tipos privados e constantes diretamente relacionadas podem permanecer no mesmo arquivo.

Mantenha próximos:

- componente;
- CSS Module;
- teste;
- tipos privados;
- fixtures específicas.

Imports devem ser organizados conceitualmente em:

1. React, Next.js e dependências externas;
2. módulos internos por alias;
3. módulos relativos;
4. estilos e assets.

Use `@/` entre áreas diferentes de `src`. Imports relativos são aceitáveis dentro do mesmo módulo. Evite caminhos relativos longos e imports profundos que contornem a API pública de outro módulo.

Use imports de tipo quando o valor não existir em runtime.

Não crie barrels globais. Um `index` só é aceitável quando representa uma fronteira pública clara, não cria ciclos e não esconde dependências importantes.

Componentes compartilhados devem preferir exports nomeados. Default exports devem ficar principalmente nos arquivos em que o Next.js os exige ou convenciona, como páginas e layouts.

---

## 10. TypeScript

O projeto deve permanecer compatível com o modo estrito.

Regras obrigatórias:

- `any` é proibido por padrão;
- use `unknown` para valores externos desconhecidos e faça narrowing;
- contratos exportados e fronteiras entre camadas devem possuir tipos claros;
- configuração, conteúdo estrutural, presets e definições de página são somente leitura;
- não mutar configuração depois de criada;
- preferir unions discriminadas para formatos conhecidos diferentes;
- uma propriedade só deve ser opcional quando a ausência for válida no domínio;
- preferir `undefined` para ausência interna, salvo contrato externo que exija `null`;
- normalizar `null` e formatos externos na camada de integração;
- evitar type assertions e non-null assertions;
- assertions duplas são proibidas;
- preferir narrowing, type guards, contratos melhores e `satisfies`;
- preferir string literal unions ou objetos constantes a enums pequenos;
- não usar `@ts-ignore`;
- `@ts-expect-error` exige motivo explícito e escopo mínimo;
- evitar `Record<string, unknown>`, index signatures e mapas abertos quando as chaves forem conhecidas.

Use inferência para implementações locais simples. Tipos explícitos são obrigatórios em contratos públicos, parâmetros e retornos exportados, configurações e integrações.

---

## 11. Funções

Uma função deve realizar uma operação principal. Não combine transformação, validação, persistência, registro e renderização na mesma função.

Evite listas extensas de parâmetros posicionais. Use objeto tipado quando vários argumentos formarem um contexto real, sem transformar funções triviais em APIs cerimoniais.

Use early return quando reduzir aninhamento e tornar pré-condições claras.

Funções de transformação e resolução devem permanecer puras quando possível. Side effects devem ficar em fronteiras explícitas.

Operações que podem falhar de maneira esperada devem possuir contrato de resultado previsível.

---

## 12. React

Componentes devem ser puros durante renderização. Eles não devem:

- alterar props ou objetos externos;
- alterar estado diretamente;
- disparar requisições imperativas;
- atualizar armazenamento;
- registrar recursos;
- depender de valores aleatórios não estabilizados;
- produzir outros efeitos observáveis durante renderização.

Props são snapshots somente leitura. Normalização deve ocorrer antes da renderização ou em função pura.

Prefira funções comuns para componentes. Não é obrigatório usar `React.FC`.

Props devem ser específicas e mínimas. Evite nomes genéricos como `data`, `config`, `options` ou `settings` quando a responsabilidade não estiver clara.

Não espalhe objetos arbitrários em elementos HTML. Rest props só são aceitáveis em primitives deliberadas e corretamente tipadas.

Condições simples podem permanecer no JSX. Lógica complexa deve ser resolvida antes do retorno ou em função dedicada.

Keys devem representar identidade estável. Não use índice quando a lista puder mudar de ordem, inserir ou remover itens.

Prefira composição a componentes com muitas flags booleanas. Diferenças relevantes devem ser variantes controladas ou componentes distintos.

---

## 13. Server Components e Client Components

Server Components são o padrão.

Adicione `"use client"` apenas quando houver necessidade concreta de estado local, efeitos, eventos, Context de cliente, APIs do navegador ou hooks exclusivos do cliente.

A fronteira de cliente deve ser a menor possível. Não transforme página, layout ou seção inteira em Client Component quando apenas um controle interno precisar de interatividade.

Props enviadas do servidor para o cliente devem ser serializáveis. Não envie instâncias de classe, clientes de SDK, conexões, objetos de request ou segredos.

Módulos que acessam segredos, arquivos privados, APIs exclusivamente server-side ou dados protegidos não podem ser importados por Client Components.

Providers de cliente devem envolver apenas a subárvore que realmente os utiliza. Não adicione providers globais preventivamente.

---

## 14. Estado, Context, Hooks e Effects

Armazene apenas o estado mínimo necessário. Valores derivados de props, configuração ou outro estado devem ser calculados durante renderização.

Não mantenha duas fontes de verdade para o mesmo dado. Evite copiar prop para estado, manter lista original e filtrada separadamente ou guardar um valor calculado junto de seus inputs.

O estado deve ficar no ancestral comum mais próximo. Não adicione biblioteca de estado global sem requisito real.

Context deve servir dados realmente transversais dentro de uma subárvore. Não use Context automaticamente para evitar props e não transporte a configuração inteira do site por Context.

Hooks devem seguir as regras oficiais: chamadas no nível superior, apenas em componentes ou custom hooks, com ordem estável e dependências corretas.

Crie custom hook quando existir lógica de estado ou sincronização reutilizável. Não crie hook para envolver uma única chamada simples sem agregar abstração.

Effects são escape hatch para sincronização com sistemas externos, como listeners, timers, observers, storage e widgets imperativos.

Não use Effect para:

- transformar dados para renderização;
- calcular valores derivados;
- reagir a eventos já tratados por handler;
- copiar props para estado;
- filtrar listas;
- buscar conteúdo estático do cliente;
- sincronizar estados que deveriam possuir uma fonte única.

Effects que registram recursos devem fazer cleanup. Não omita dependências para controlar artificialmente a execução.

---

## 15. React Compiler e memoização

O React Compiler está habilitado.

Não adicione `useMemo`, `useCallback` ou `React.memo` automaticamente.

Memoização manual só deve ser usada quando:

- medição indicar custo relevante;
- biblioteca externa exigir estabilidade referencial;
- uma dependência estável for necessária para sincronização;
- o Compiler não conseguir otimizar o caso;
- houver evidência no profiler.

Memoização nunca deve ser necessária para correção funcional.

Diretivas específicas do Compiler exigem problema reproduzível, consulta à documentação instalada, justificativa e teste.

---

## 16. Configuração, conteúdo, presets e composição

Dados específicos do cliente pertencem à camada `site`.

Componentes compartilhados não devem importar configuração concreta. Devem receber somente os dados preparados por página, compositor, seção ou resolver.

A configuração é somente leitura e deve possuir fonte única para nome, telefone, endereço, URL, redes sociais, horário, logo e descrição padrão.

Conteúdo deve ser estruturado e tipado. Não utilize HTML arbitrário em strings.

Fallbacks devem ser conscientes. Conteúdo obrigatório ausente deve provocar erro claro; conteúdo opcional deve poder ser omitido sem quebrar a interface.

Presets devem ser declarativos, conter decisões de apresentação e composição e nunca importar conteúdo concreto.

Variantes devem ser finitas, nomeadas e tipadas. Não aceite strings arbitrárias.

A precedência entre tema, preset e configuração de seção deve ser explícita. Não use merge profundo genérico nem callbacks de renderização dentro da configuração.

O catálogo de seções deve ser fechado e tipado. Tipos desconhecidos não podem ser ignorados silenciosamente.

Resoluções baseadas em unions devem ser exaustivas. O compositor resolve tipo, variante, ordem, ID e conteúdo associado, mas não concentra regras visuais internas de cada seção.

---

## 17. Integrações e dados externos

Acesso a APIs e SDKs deve ficar em uma camada de integração ou fronteira server-side apropriada.

Componentes visuais não devem conhecer endpoints, autenticação, política de retry nem formatos brutos de fornecedor.

Dados externos devem ser normalizados para contratos internos antes de alcançar seções e componentes.

TypeScript não valida runtime. Entradas externas devem ser validadas quando a funcionalidade for implementada.

Requisições independentes podem ser executadas em paralelo quando o fluxo permitir.

Não faça fetch inicial em Effect quando os dados puderem ser obtidos no servidor ou durante o build.

Integrações opcionais devem permanecer desativadas quando não configuradas. Não carregue seus SDKs ou scripts desnecessariamente.

---

## 18. Erros, loading e logs

Erros esperados, como validação inválida ou integração indisponível, devem possuir tratamento explícito.

Erros inesperados devem ser lançados e tratados pela boundary apropriada.

Não use `catch` vazio e não esconda configuração inválida com fallback genérico.

Mensagens para o usuário devem explicar o ocorrido sem expor detalhes internos e indicar ação possível quando houver.

Error boundaries devem existir onde uma falha possa ser isolada e haja experiência útil de recuperação, sem criar uma boundary para cada componente.

Loading só deve existir quando houver operação assíncrona perceptível. Não adicione spinner ou skeleton a páginas estáticas. Fall­backs devem preservar estabilidade de layout quando necessário.

Use Suspense apenas quando houver conteúdo assíncrono real e um fallback com valor.

Logs temporários devem ser removidos. Não use `console.log` como observabilidade permanente e nunca registre credenciais, tokens, cookies ou dados pessoais desnecessários.

---

## 19. Rotas, HTML e acessibilidade

Use a navegação do Next.js para rotas internas e links semânticos para navegação. Não use navegação programática quando um link resolver o fluxo.

Links para âncoras devem apontar para IDs existentes, únicos e estáveis.

Use elementos HTML de acordo com a semântica:

- `button` para ações;
- link para navegação;
- headings para títulos;
- listas para coleções;
- `nav`, `main`, `header`, `footer` e `address` quando apropriados.

Não use `div` ou `span` como botão. Não escolha heading por tamanho visual.

O objetivo mínimo é WCAG 2.2 nível AA dentro do escopo da funcionalidade.

Toda funcionalidade interativa deve funcionar por teclado, possuir foco visível e ordem lógica. Não use `tabIndex` positivo.

Cor não deve ser o único meio de comunicar estado. Controles devem possuir área adequada para toque.

Campos precisam de labels associados; placeholder não substitui label. Erros devem ser associados ao campo e anunciáveis.

Imagens informativas precisam de texto alternativo. Imagens decorativas devem ser ignoradas por tecnologia assistiva.

Prefira HTML nativo a ARIA. Use ARIA apenas quando necessário e compreendido.

Respeite `prefers-reduced-motion`.

---

## 20. CSS e responsividade

Componentes e seções devem usar CSS Modules.

CSS global deve ficar restrito a reset, tokens, estilos base, tipografia, preferências do documento e acessibilidade transversal.

Classes devem ser semânticas em `camelCase`. Prefira `serviceGrid` a `marginTop20`.

Use tokens semânticos quando existirem, mas valores específicos da geometria interna de um componente podem permanecer no módulo local. Nem todo valor CSS deve virar token global.

Não use `!important`, salvo integração externa justificada.

Evite seletores excessivamente específicos, dependência profunda da árvore e IDs para estilização.

Use flexbox, grid, propriedades lógicas e layout fluido. Não use JavaScript para resolver layout que CSS resolve.

A abordagem é mobile-first. Breakpoints devem responder ao conteúdo, não a modelos específicos de aparelho.

Teste com títulos longos, listas de tamanhos diferentes, conteúdo opcional ausente, imagens em proporções variadas, zoom e fonte aumentada.

Overflow horizontal da página é defeito, salvo componente deliberado e acessível.

Não fixe altura de elementos com texto quando isso puder cortar conteúdo.

---

## 21. Imagens, fontes, SEO e desempenho

Use a solução de imagem do Next.js quando compatível com o build e o deploy. Imagens devem possuir dimensões ou proporção conhecida para evitar layout shift.

Não aplique lazy loading indiscriminadamente a imagens importantes para o conteúdo inicial. Assets muito pesados não devem ser adicionados sem otimização.

Imagens remotas exigem origem permitida, estratégia de fallback e compatibilidade com exportação estática.

Use a solução de fontes do Next.js quando aplicável. Carregue apenas famílias, pesos, estilos e subsets utilizados. Prefira variable fonts quando fizer sentido.

Metadata pertence à camada `app`; conteúdo de SEO pertence à configuração do site. Reutilize os dados do negócio, sem duplicar nome, endereço, telefone, URL e logo.

JSON-LD deve representar o negócio real, usar contratos tipados e ser serializado de forma segura.

Reduza JavaScript no cliente mantendo conteúdo estático como Server Component.

Não adicione dependência pesada para interação simples. Scripts de terceiros precisam de justificativa, habilitação explícita, estratégia de carregamento, avaliação de privacidade e medição de impacto.

Mudanças devem considerar LCP, INP e CLS. Otimizações complexas exigem medição prévia.

---

## 22. Exportação estática e deploy

Enquanto um cliente utilizar exportação estática, a implementação não pode depender de recursos que exijam runtime por requisição.

Antes de usar uma API server-side, verifique se ela:

- funciona durante build;
- exige request, cookies ou headers;
- exige armazenamento ou revalidação em runtime;
- é suportada pelo host escolhido.

Quando uma funcionalidade exigir runtime, isso deve ser tratado como decisão de arquitetura e deploy, e não contornado com hacks no componente.

Toda integração futura deve declarar compatibilidade com exportação estática, função da plataforma, servidor Next.js ou backend separado.

---

## 23. Segurança e dependências

Segredos nunca devem aparecer em código-fonte, diretório `public`, bundle do cliente, variáveis públicas ou documentação versionada.

Variáveis públicas devem conter apenas valores que possam ser vistos pelo usuário final.

Não use `dangerouslySetInnerHTML` sem requisito explícito, origem conhecida, sanitização, teste e justificativa.

Trate dados externos e URLs como não confiáveis. Validação no cliente não substitui validação confiável no servidor ou serviço receptor.

Uma dependência só deve ser adicionada quando resolver problema concreto, estiver mantida, possuir licença compatível, funcionar com a stack e tiver custo aceitável de bundle e manutenção.

Não instale pacotes preventivamente e não atualize dependências fora do escopo da tarefa.

Use o gerenciador correspondente ao lockfile oficial. Não crie lockfiles adicionais.

---

## 24. ESLint, formatação e comentários

Mantenha a configuração flat do ESLint. Não desabilite regras do Next.js ou TypeScript apenas para concluir uma tarefa.

Toda supressão deve possuir escopo mínimo e explicar o motivo.

Correções automáticas podem ser usadas, mas o diff deve ser revisado.

Enquanto não houver formatter oficial:

- preserve o estilo existente;
- não reformate arquivos não relacionados;
- mantenha indentação e aspas consistentes;
- não adicione Prettier sem spec.

Comentários devem explicar por que uma decisão não óbvia existe, qual restrição externa está sendo atendida ou qual trade-off foi aceito.

Não comente o óbvio, não mantenha código comentado e não use TODO genérico. TODOs precisam de ação concreta, motivo e referência quando aplicável.

---

## 25. Testes e quality gates

A escolha oficial de test runner será definida em spec própria. Não adicione Jest, Vitest, Playwright, Cypress ou outra ferramenta durante uma funcionalidade não relacionada.

Testes devem validar comportamento observável, não detalhes internos.

Prioridades:

- unitários: resolvers, validações, transformações, funções puras e fallbacks;
- componentes: interações, acessibilidade, estados vazios e variantes com comportamento relevante;
- integração: configuração, compositor, catálogo, seções, tema e metadata;
- end-to-end: fluxos críticos e smoke tests.

Seletores de UI devem preferir roles, nomes acessíveis e labels. Evite classes CSS e estrutura interna.

Snapshots devem ser pequenos e intencionais.

Antes de concluir uma implementação, execute separadamente:

1. lint;
2. verificação de tipos;
3. testes aplicáveis;
4. build de produção.

O build não substitui lint ou testes.

Não afirme que uma validação passou sem executá-la. Falhas por limitação de ambiente devem ser informadas explicitamente. Warnings novos devem ser analisados.

---

## 26. Revisão manual obrigatória

Antes da conclusão, verificar:

### Arquitetura

- camada correta;
- ausência de dependência proibida;
- escopo respeitado;
- ausência de abstração prematura;
- separação entre configuração e código compartilhado.

### TypeScript e React

- ausência de `any` injustificado;
- ausência de casts usados para esconder erros;
- contratos claros;
- componente puro;
- estado não duplicado;
- Effect realmente necessário;
- fronteira de cliente mínima;
- keys estáveis.

### Interface

- HTML semântico;
- operação por teclado;
- foco visível;
- responsividade;
- conteúdo longo;
- estados ausentes;
- ausência de overflow horizontal.

### Desempenho e qualidade

- JavaScript de cliente não aumentou sem necessidade;
- imagens possuem dimensões;
- dependências foram justificadas;
- scripts externos não carregam sem necessidade;
- lint, typecheck, testes e build passaram;
- documentação afetada foi atualizada.

---

## 27. Regras para agentes de codificação

Ao implementar uma spec, o agente deve:

1. ler `AGENTS.md`;
2. ler `docs/ARCHITECTURE.md`;
3. ler `docs/CODING_GUIDELINES.md`;
4. ler integralmente a spec;
5. inspecionar o código existente;
6. consultar a documentação instalada do Next.js;
7. implementar somente o escopo solicitado;
8. evitar dependências novas e mudanças arquiteturais;
9. preservar tipagem, acessibilidade e compatibilidade de deploy;
10. executar validações;
11. revisar o diff;
12. relatar ambiguidades, limitações e desvios.

O agente não deve:

- inventar requisitos;
- adicionar funcionalidades fora do escopo;
- atualizar dependências sem solicitação;
- substituir tecnologias aprovadas;
- criar abstrações futuras;
- desabilitar regras para passar lint;
- usar APIs obsoletas;
- confiar apenas no conhecimento de treinamento;
- afirmar que executou comandos não executados;
- ocultar erros preexistentes;
- alterar arquitetura ou guideline silenciosamente.

O relatório final deve informar mudanças, arquivos afetados, decisões tomadas, comandos executados, resultados, ambiguidades, limitações e qualquer desvio da spec.

---

## 28. Padrões proibidos

Não introduzir:

- `any` sem justificativa;
- `@ts-ignore`;
- assertions duplas;
- non-null assertions recorrentes;
- HTML arbitrário sem sanitização;
- configuração global mutável;
- props gigantes com a configuração inteira;
- componentes universais;
- dezenas de flags booleanas;
- Effects para dados derivados;
- fetch inicial em Effect sem necessidade;
- páginas inteiras como Client Components;
- estado global preventivo;
- Context para qualquer prop drilling;
- memoização preventiva;
- índice como key em lista instável;
- componentes interativos com `div`;
- remoção de foco sem substituição;
- estilos de componente em CSS global;
- cores de marca repetidas fora dos tokens;
- `!important` sem justificativa;
- breakpoints específicos para aparelhos;
- scripts de terceiros habilitados por padrão;
- acesso direto da UI a SDK externo;
- segredos em variáveis públicas;
- dependências preventivas;
- atualização de pacotes fora do escopo;
- código comentado;
- logs temporários;
- snapshots extensos;
- alterações fora do escopo para “aproveitar a tarefa”.

---

## 29. Exceções

Uma regra só pode ser excepcionada quando existir limitação comprovada da plataforma, integração incompatível, alternativa mais arriscada ou decisão arquitetural aprovada.

Toda exceção deve:

1. possuir justificativa;
2. ter o menor escopo possível;
3. ser documentada;
4. não se transformar silenciosamente em padrão;
5. ser revisada quando a restrição deixar de existir.

Quando uma spec precisar contrariar este guideline, o guideline deverá ser alterado e aprovado antes da implementação da spec.

---

## 30. Atualização e referências

Este documento deve ser atualizado quando uma convenção recorrente for adotada, ferramentas oficiais de teste ou formatação forem escolhidas, a estratégia de deploy mudar, uma regra se mostrar inadequada ou uma atualização principal da stack alterar práticas relevantes.

As referências normativas são:

- `docs/ARCHITECTURE.md`;
- documentação instalada do Next.js;
- documentação oficial do React;
- documentação oficial do TypeScript;
- documentação oficial do ESLint;
- WCAG 2.2;
- orientações de Core Web Vitals.

A documentação correspondente à versão instalada possui precedência para detalhes específicos do Next.js.

---

## 31. Estado de aprovação

Este documento está aprovado.

A partir deste commit:

1. o arquivo oficial é `docs/CODING_GUIDELINES.md`;
2. `AGENTS.md` poderá referenciar este documento fora dos marcadores gerenciados pelo Next.js;
3. futuras specs deverão ser elaboradas respeitando este guideline;
4. divergências relevantes deverão ser aprovadas antes da implementação.
