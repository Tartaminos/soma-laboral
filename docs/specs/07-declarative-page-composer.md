# 1. Título

Compositor declarativo de páginas

**Status:** Aprovada para implementação

## 2. Contexto

O catálogo da spec 06 define seções independentes, mas ainda não existe uma forma central de escolher quais aparecem, em que ordem e com quais dados. Montar as seções manualmente nos arquivos de rota duplicaria lógica, dificultaria presets e incentivaria flags como `showServices` ou `showAbout`.

A arquitetura exige lista ordenada, catálogo fechado, erros explícitos e uma camada `app` fina. O compositor deve atender a isso sem se tornar um page builder genérico.

## 3. Objetivo

Criar uma composição tipada e determinística que produza a definição final de cada página, resolva defaults controlados de preset e renderize seções na ordem declarada, com conteúdo proveniente exclusivamente da camada `site`.

## 4. Escopo

- Definir o contrato de `PageDefinition` final.
- Definir o contrato de blueprint de preset contendo estrutura, sem conteúdo concreto.
- Definir o contrato de conteúdo de página fornecido pela camada `site`.
- Definir entradas discriminadas para as onze seções da spec 06.
- Representar habilitação pela presença na lista ordenada.
- Definir IDs estáveis de página e de seção.
- Criar catálogo explícito entre tipo de seção e componente.
- Criar o compositor responsável pela renderização exaustiva.
- Definir resolução entre composição explícita do cliente e defaults do preset.
- Definir o vínculo exato entre blueprint e conteúdo por ID e tipo.
- Definir precedência de variantes sem merge profundo.
- Validar IDs duplicados, tipos desconhecidos, variantes incompatíveis, conteúdo órfão e navegação por âncoras inválida.
- Integrar a página inicial do App Router ao compositor.
- Preservar possibilidade de páginas adicionais sem criar roteamento dinâmico desnecessário.

## 5. Fora do escopo

- Implementação dos três presets, que pertence às specs 08–10.
- Editor visual, drag-and-drop, JSON remoto ou CMS.
- Descoberta automática de seções.
- Componentes remotos, callbacks de renderização ou JSX dentro da configuração.
- Rotas dinâmicas, blog, catálogo dinâmico ou paginação.
- Herança de presets, merge profundo ou múltiplos níveis de override.
- Registro global de conteúdo por strings arbitrárias.
- Integrações, formulários, autenticação ou backend.
- Customizações específicas de cliente em `custom`.

## 6. Requisitos funcionais

- Uma página final deve possuir identificador, rota, título de referência e lista somente leitura de seções completas.
- A presença de uma seção na lista deve determinar sua renderização; não criar flags paralelas de habilitação.
- Cada seção final deve conter tipo discriminador, ID estável, conteúdo específico e variante resolvida compatível com seu tipo.
- Um blueprint de preset deve conter somente tipo, ID, variante padrão opcional e indicação de navegabilidade; nunca textos, entidades ou assets concretos.
- O conteúdo padrão de uma página do cliente deve ser fornecido como lista tipada de entradas contendo tipo, ID e conteúdo específico, sem definir ordem visual.
- Quando o blueprint for utilizado, o resolver deve associar estrutura e conteúdo pelo mesmo ID e exigir que os tipos coincidam.
- IDs presentes no blueprint sem conteúdo obrigatório correspondente devem falhar claramente.
- Conteúdo com ID que não existe no blueprint deve ser reportado como órfão, salvo quando pertence a uma composição explícita.
- Quando existir composição explícita do cliente, ela deve fornecer a lista final completa e ser a fonte de ordem, presença, conteúdo e variante explícita.
- O compositor deve renderizar os itens exatamente na ordem final.
- Conteúdo concreto deve vir de módulos `site/content`; o preset nunca fornece textos ou dados reais.
- A precedência de variante deve ser: variante explícita da composição; default do blueprint para aquela entrada; default interno documentado da seção.
- Campos devem ser selecionados atomicamente; não realizar merge recursivo de objetos.
- IDs de seção devem ser únicos na página.
- Itens de navegação por âncora devem apontar apenas para IDs existentes e navegáveis.
- Tipo desconhecido, conteúdo incompatível ou variante inválida deve causar erro de tipo ou falha clara em desenvolvimento/build.
- A rota deve obter a definição final e delegar ao compositor, sem montar seções manualmente.

## 7. Requisitos não funcionais

- TypeScript estrito, unions discriminadas exaustivas e contratos somente leitura.
- Server Component por padrão; o compositor não deve ser Client Component.
- Determinismo para pré-renderização e exportação estática.
- Nenhuma dependência nova.
- Sem reflection, import dinâmico por string, filesystem scan ou registro mutável.
- Mensagens de validação devem indicar página, seção, ID e campo envolvidos.
- Manter baixo acoplamento: compositor conhece catálogo, contratos e presets; não conhece detalhes visuais internos das seções.
- A camada `app` deve permanecer fina.
- A solução deve aceitar página única ou múltiplas páginas estáticas sem alterar os contratos fundamentais.

## 8. Decisões arquiteturais

- `PageDefinition`, `PresetSectionBlueprint` e as unions independentes de React pertencem a `domain/pages` e `domain/sections`.
- Definições concretas de página e listas de conteúdo pertencem a `site/pages`.
- `composition` conterá compositor, catálogo e resolvers puros.
- `app` dependerá de `site` e `composition`; `composition` dependerá de `presets`, `sections` e `domain`.
- O contrato padrão separará duas listas: blueprint estrutural do preset e conteúdo tipado do cliente. O join será explícito por `(sectionId, sectionType)` e produzirá uma lista final completa.
- Não criar `contentKey` livre, mapa global de conteúdo, service locator ou lookup por caminho textual. IDs servem apenas para identidade e associação validada dentro da página.
- Uma composição explícita do cliente poderá substituir integralmente blueprint e lista de conteúdo padrão quando ordem ou presença precisar mudar.
- Não haverá merge profundo. A resolução deve escolher lista e campos conhecidos de forma explícita.
- O catálogo será um mapeamento fechado revisável no código. Exaustividade deve impedir que uma nova seção seja adicionada sem atualizar o compositor.
- A key React deverá usar identidade estável da seção, nunca índice.
- Navegação será validada contra a definição final, evitando links órfãos.
- O compositor não decide estilos internos, conteúdo, SEO ou integrações.

## 9. Estrutura impactada

- `src/domain/pages`: página final, blueprint e conteúdo de página.
- `src/domain/sections`: união final das entradas de seção.
- `src/site/pages`: listas de conteúdo, definições explícitas e overrides do cliente.
- `src/composition/page-composer`: renderização da lista final.
- `src/composition/section-catalog`: mapeamento fechado.
- `src/composition/resolvers`: join de blueprint e conteúdo, resolução de variantes, validação e navegação.
- `src/app/page`: delegação da página inicial.
- Rotas adicionais somente quando necessárias para validar o contrato multipágina.

## 10. Fluxo esperado

### Desenvolvedor que configura um cliente

1. Seleciona um preset na configuração central.
2. Preenche a lista tipada de conteúdo da página usando os IDs esperados pelo blueprint.
3. Usa a composição padrão ou cria uma definição explícita completa em `site/pages`.
4. Reordena a lista explícita para reordenar a página.
5. Remove uma entrada da composição explícita para remover a seção, sem criar flag booleana.
6. Ajusta uma variante explícita quando o default do preset não atende.
7. Executa validações para IDs, tipos, conteúdo, navegação e entradas órfãs.

### Aplicação durante build ou runtime

1. A rota solicita a definição da página.
2. O resolver escolhe composição explícita ou blueprint do preset.
3. Quando usa blueprint, associa cada entrada ao conteúdo do cliente por ID e tipo.
4. Resolve variantes por precedência conhecida.
5. Valida IDs, navegação, conteúdo ausente e conteúdo órfão.
6. O compositor consulta o catálogo fechado e renderiza na ordem final.
7. Cada seção recebe somente seus dados.

### Usuário final

1. Recebe seções na ordem configurada.
2. Navega apenas para âncoras existentes.
3. Não percebe lógica de resolução ou carregamento de page builder no navegador.

## 11. Critérios de aceite

- Dado que uma página final lista hero, services e contact nessa ordem, quando o compositor renderiza, então a ordem do DOM corresponde à lista.
- Dado que uma composição explícita remove uma seção, quando a página é renderizada, então ela não aparece e nenhuma flag adicional precisa ser alterada.
- Dado que dois itens usam o mesmo ID, quando a definição final é validada, então o build falha com página e ID duplicado.
- Dado um blueprint com ID `services` e conteúdo com o mesmo ID e tipo, quando o resolver executa, então produz uma entrada final de `services`.
- Dado um blueprint e conteúdo com o mesmo ID mas tipos diferentes, quando o resolver executa, então falha informando ID, tipo esperado e tipo recebido.
- Dado um ID obrigatório do blueprint sem conteúdo correspondente, quando a página é resolvida, então o build falha com seção e página.
- Dado conteúdo que não corresponde a nenhum ID do blueprint, quando a página é validada, então a entrada órfã é reportada em vez de ignorada.
- Dado que a seção define variante explícita, quando o preset possui outro default, então a variante explícita prevalece sem merge profundo.
- Dado que um link de navegação aponta para ID ausente, quando a composição é validada, então o link não é renderizado silenciosamente ou a configuração falha conforme sua obrigatoriedade.
- Dado que um tipo não existe no catálogo, quando a união ou resolução é atualizada incorretamente, então typecheck ou teste exaustivo falha.
- Dado que `src/app/page` é revisado, então ele não contém montagem manual das onze seções.

## 12. Cenários de erro e borda

- Página sem seções ou sem conteúdo principal.
- Mais de uma seção que tenta representar o heading principal.
- Header ou footer duplicado.
- ID vazio, duplicado ou instável.
- Blueprint e conteúdo com mesmo ID e tipos diferentes.
- Conteúdo órfão ou conteúdo obrigatório ausente.
- Conteúdo de `services` fornecido a `product-showcase`.
- Variante de outro tipo de seção.
- Preset selecionado sem blueprint implementado.
- Navegação externa confundida com âncora interna.
- Rota duplicada entre definições de página.
- Uso de índice como key.
- Callback, JSX ou lookup textual arbitrário inserido na definição declarativa.

## 13. Estratégia de testes

- Testes unitários devem cobrir join de blueprint e conteúdo, resolução de composição, precedência de variantes, IDs duplicados, órfãos e navegação.
- Testes de tipo devem garantir associação correta entre discriminador, conteúdo e variantes.
- Testes de integração devem renderizar uma página final e confirmar ordem e componente resolvido.
- Testes end-to-end devem cobrir página inicial, navegação por âncoras e ausência de erros de runtime.
- Fixtures devem representar composição explícita, default de preset, conteúdo ausente, conteúdo órfão e tipo incompatível.
- Não testar detalhes internos de JSX nem produzir snapshots extensos.
- A infraestrutura oficial será definida na spec 12.

## 14. Definição de pronto

- Contratos de página final, blueprint e conteúdo de página implementados.
- Catálogo fechado e compositor exaustivo implementados.
- Join por ID e tipo implementado com erros para ausência, incompatibilidade e órfãos.
- Resolução explícita de composição e variantes implementada sem merge profundo.
- IDs e navegação validados.
- Página inicial delegando ao compositor.
- Conteúdo proveniente de `site`, nunca de preset.
- Nenhuma flag de habilitação, callback de renderização, content registry ou page builder introduzido.
- Nenhuma dependência adicionada.
- Lint, typecheck, testes disponíveis e build executados com sucesso.
- Diff revisado e camada `app` mantida fina.

## 15. Instruções para o Codex

- Ler `AGENTS.md`, arquitetura, guideline e specs 01–06 implementadas.
- Consultar documentação local do App Router e Server Components da versão instalada.
- Implementar contratos, join por ID e tipo, resolvers, catálogo, compositor e integração fina com a rota.
- Não implementar os presets além dos contratos mínimos consumidos por esta spec.
- Não criar page builder, CMS, registry dinâmico, `contentKey` livre, flags booleanas ou merge profundo.
- Não adicionar dependências nem atualizar pacotes.
- Preservar TypeScript estrito, unions exaustivas e Server Components.
- Manter `"use client"` fora do compositor.
- Não importar conteúdo concreto dentro das seções.
- Executar lint, typecheck, testes e build conforme disponíveis.
- Revisar o diff, documentar ambiguidades e informar validações não executadas.
- Não afirmar que um comando passou sem executá-lo.
