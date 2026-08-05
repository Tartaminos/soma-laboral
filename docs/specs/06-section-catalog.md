# 1. Título

Catálogo inicial de seções

**Status:** Aprovada para implementação

## 2. Contexto

Os três presets precisam compartilhar blocos de página com significado de negócio sem importar conteúdo concreto ou formar páginas por dependências entre seções. A fundação de domínio, tema, UI e assets já estabelece os contratos básicos, mas ainda falta um conjunto fechado de seções que cubra os casos iniciais de serviços, comércio e profissional.

A quantidade deve ser suficiente para uma primeira versão útil, mas deliberadamente limitada para evitar um page builder genérico.

## 3. Objetivo

Implementar um catálogo inicial, fechado e tipado de seções independentes, acessíveis e responsivas, com variantes finitas e dados específicos, pronto para ser consumido pelo compositor declarativo da spec 07.

## 4. Escopo

Implementar as seguintes seções compartilhadas:

- `site-header`;
- `hero`;
- `services`;
- `product-showcase`;
- `about`;
- `highlights`;
- `professional-profile`;
- `testimonials`;
- `contact`;
- `call-to-action`;
- `site-footer`.

Também faz parte do escopo:

- definir o contrato discriminado de cada seção;
- definir variantes iniciais fechadas;
- criar um catálogo público de tipos e componentes;
- utilizar primitives das specs 04 e 05;
- implementar menu mobile apenas na menor fronteira de cliente necessária;
- tratar conteúdo opcional, coleções vazias permitidas e ausência de imagem;
- preservar IDs estáveis para navegação por âncoras;
- definir referências explícitas e únicas para itens em destaque nas seções que suportam esse comportamento.

## 5. Fora do escopo

- Compositor e resolução da ordem final das páginas.
- Presets e conteúdo real de clientes.
- Formulários, mapas incorporados, agendamento, WhatsApp automatizado ou envio de mensagens.
- Carrinho, busca, filtros, estoque, checkout ou catálogo dinâmico.
- Carrossel, autoplay, lightbox ou animações complexas.
- Seções específicas por cliente.
- Sistema extensível de plugins ou descoberta automática de componentes.
- Integrações externas e scripts de terceiros.

## 6. Requisitos funcionais

- Cada seção deve possuir um discriminador de tipo único e um contrato de props específico.
- Cada seção deve receber somente dados necessários, nunca o objeto completo do site.
- `site-header` deve suportar identidade, navegação e ação principal opcional; sua interação mobile deve funcionar por teclado e fechar de forma previsível.
- `hero` deve suportar variantes `centered` e `split`, com título, texto, ações e imagem opcional.
- `services` deve suportar variantes `grid` e `featured`, consumindo uma lista tipada de serviços e um `featuredServiceId` opcional que, quando informado, referencia exatamente um item existente.
- `product-showcase` deve suportar variantes `grid` e `spotlight`, apresentando produtos institucionais sem lógica transacional e aceitando um `featuredProductId` opcional que referencia exatamente um item existente.
- `about` deve suportar variantes `text` e `media`, com conteúdo editorial e imagem opcional.
- `highlights` deve suportar variantes `cards` e `inline`, para diferenciais ou credenciais curtas.
- `professional-profile` deve suportar variantes `portrait` e `credentials`, sem se tornar seção genérica de equipe.
- `testimonials` deve suportar variantes `grid` e `featured`, sem carrossel, e aceitar um `featuredTestimonialId` opcional que referencia exatamente um depoimento existente.
- As referências de destaque devem ficar no contrato da seção, não como flags booleanas repetidas em cada entidade de domínio.
- `contact` deve suportar variantes `split` e `compact`, exibindo apenas dados fornecidos e sem formulário ou mapa incorporado.
- `call-to-action` deve suportar variantes `banner` e `panel`.
- `site-footer` deve suportar variantes `standard` e `compact`, reutilizando identidade, navegação e contatos sem duplicar sua fonte.
- Cada seção navegável deve aceitar ID estável, único na página e utilizável por links de âncora.
- Tipos ou variantes desconhecidos não podem ser ignorados silenciosamente.

## 7. Requisitos não funcionais

- Server Components por padrão; somente o controle interativo do menu mobile pode ser Client Component.
- HTML semântico, headings hierárquicos, listas para coleções e `address` quando apropriado.
- WCAG 2.2 nível AA dentro do escopo, incluindo teclado, foco, contraste, reflow e redução de movimento.
- Layout mobile-first, sem altura fixa que corte texto e sem overflow horizontal.
- CSS Modules por seção, consumindo tokens da spec 03.
- Nenhuma seção pode importar outra seção, presets ou configuração concreta de `site`.
- Baixo volume de JavaScript e ausência de dependências novas.
- Conteúdo longo, lista com quantidades diferentes e imagem opcional devem ser tolerados.
- Variantes devem ser nomeadas, finitas, tipadas e visualmente justificadas.

## 8. Decisões arquiteturais

- Contratos compartilhados de seção e a union discriminada pertencem a `domain/sections` quando independentes de React; props específicas próximas do componente são aceitáveis quando puramente visuais.
- O catálogo inicial será explícito. Não utilizar import dinâmico por nome de arquivo, reflection, filesystem scan ou plugin registry.
- O catálogo nesta spec define quais tipos existem; a resolução ordenada pertence à spec 07.
- Header e footer serão tratados como seções para permitir composição controlada e variantes por preset, mas continuam usando landmarks semânticos apropriados.
- A seção de contato apenas apresenta dados. Qualquer captura de dados requer nova spec com estratégia real de processamento.
- `product-showcase` representa vitrine estática. Não criar conceitos de preço calculado, estoque, quantidade ou ação de compra.
- O menu mobile terá fronteira cliente isolada no controle e painel necessários. O restante do header deve permanecer renderizável no servidor.
- Variantes não usarão dezenas de flags. Diferenças que não pertencem às variantes iniciais deverão aguardar necessidade real.
- Itens em destaque serão selecionados por um único ID opcional no conteúdo da seção. Não adicionar `isFeatured` em todas as entidades, múltiplas flags concorrentes ou ordenação implícita para comunicar destaque.
- Conteúdo concreto será injetado por composição, não importado pelas seções.

## 9. Estrutura impactada

- `src/domain/sections`: discriminadores e contratos compartilhados.
- `src/sections/site-header`.
- `src/sections/hero`.
- `src/sections/services`.
- `src/sections/product-showcase`.
- `src/sections/about`.
- `src/sections/highlights`.
- `src/sections/professional-profile`.
- `src/sections/testimonials`.
- `src/sections/contact`.
- `src/sections/call-to-action`.
- `src/sections/site-footer`.
- Catálogo público explícito dos tipos e componentes.
- CSS Modules e testes colocalizados quando a infraestrutura estiver disponível.

## 10. Fluxo esperado

### Desenvolvedor que configura um cliente

1. Não edita as seções para trocar textos, contatos ou cores.
2. Escolhe conteúdo e variante por meio da composição ou preset.
3. Quando necessário, informa um único ID de item em destaque no conteúdo da seção.
4. Usa somente tipos e variantes documentados.
5. Cria uma nova seção apenas por spec futura ou necessidade reutilizável comprovada.

### Aplicação durante build ou runtime

1. O compositor futuro entrega a cada seção seu tipo, ID, variante e dados específicos.
2. O contrato valida que qualquer ID de destaque existe na coleção correspondente.
3. O catálogo resolve o componente correspondente.
4. A seção usa primitives e CSS Module local.
5. Somente o menu mobile hidrata a fronteira cliente necessária.
6. Conteúdo é renderizado na ordem determinada externamente.

### Usuário final

1. Navega pelas âncoras existentes.
2. Usa menu, links e ações por teclado ou toque.
3. Compreende cada seção mesmo sem imagens opcionais.
4. Não encontra controles falsos para funcionalidades inexistentes.

## 11. Critérios de aceite

- Dado um tipo de seção suportado, quando o catálogo é consultado, então existe exatamente um componente responsável por renderizá-lo.
- Dado um tipo ou variante desconhecida, quando o typecheck ou resolução é executado, então ocorre falha explícita e exaustiva.
- Dado que uma seção é inspecionada, quando seus imports são revisados, então ela não importa `site`, presets ou outra seção.
- Dado que apenas o menu mobile exige interação, quando a árvore é analisada, então `"use client"` está restrito ao menor componente necessário.
- Dado que serviços, produtos ou depoimentos possuem quantidades variadas, quando a seção é renderizada, então o layout permanece consistente sem depender de índice como identidade.
- Dado que um ID de destaque referencia item inexistente, quando a seção é validada, então ocorre erro claro com o ID e a coleção envolvidos.
- Dado que uma imagem opcional está ausente, quando hero, about ou profile é renderizado, então o texto continua compreensível e o layout se adapta.
- Dado que a página é usada com teclado, quando header e ações recebem foco, então a ordem é lógica e o indicador é visível.
- Dado que a largura é 320 px ou o zoom é 200%, quando as seções são auditadas, então não ocorre perda de conteúdo ou overflow horizontal.

## 12. Cenários de erro e borda

- ID de seção vazio ou duplicado, cuja validação final será centralizada na spec 07.
- ID de item em destaque vazio, inexistente ou pertencente a outra coleção.
- Heading principal ausente ou hierarquia incoerente.
- Lista obrigatória vazia.
- Texto de ação sem destino.
- Navegação apontando para seção inexistente.
- Menu mobile aberto durante mudança de largura ou navegação por âncora.
- Produto com informações transacionais não suportadas.
- Depoimento sem autoria mínima.
- Contato sem nenhum canal exibível.
- Conteúdo muito longo, imagem de proporção extrema ou item sem imagem.
- Variante usada para implementar diferença específica de um cliente.

## 13. Estratégia de testes

- Testes unitários devem cobrir resoluções exaustivas, validações puras e IDs de destaque válidos e inválidos.
- Testes de componentes devem priorizar semântica, ausência opcional, variantes com lógica e menu mobile.
- Testes de integração devem confirmar que cada entrada do catálogo renderiza a seção correta com dados tipados.
- Testes end-to-end devem cobrir abertura da página, navegação por âncoras, menu mobile e links principais.
- Auditorias automatizadas e manuais devem verificar teclado, foco, headings, reflow, contraste e texto longo.
- Evitar snapshots extensos e testes que apenas confirmem strings estáticas.
- A ferramenta oficial será introduzida pela spec 12.

## 14. Definição de pronto

- Onze seções iniciais implementadas com contratos específicos.
- Union discriminada e catálogo fechado criados.
- Variantes iniciais finitas implementadas e documentadas.
- Referências únicas de item em destaque implementadas por ID nos contratos aplicáveis.
- Seções independentes de conteúdo concreto, presets e outras seções.
- Menu mobile acessível com fronteira cliente mínima.
- CSS Modules e tokens semânticos utilizados.
- Estados opcionais e listas variáveis tratados.
- Nenhuma integração, formulário, catálogo dinâmico ou dependência adicionada.
- Lint, typecheck, testes disponíveis e build executados com sucesso.
- Diff revisado e sem funcionalidades de composição ou preset antecipadas.

## 15. Instruções para o Codex

- Ler `AGENTS.md`, arquitetura, guideline e specs 01–05 implementadas.
- Consultar a documentação local de Server/Client Components, links e imagens da versão instalada.
- Implementar exatamente as onze seções e variantes listadas.
- Usar IDs opcionais únicos para itens em destaque; não adicionar flags `isFeatured` em todas as entidades.
- Não criar compositor, presets, integrações, formulários, carrossel ou page builder.
- Não adicionar dependências ou atualizar pacotes.
- Preservar TypeScript estrito, Server Components e `"use client"` somente no menu mobile mínimo.
- Usar HTML nativo, CSS Modules, tokens semânticos e props específicas.
- Não importar configuração concreta, outra seção ou preset.
- Não ignorar tipos desconhecidos silenciosamente.
- Executar lint, typecheck, testes e build conforme disponíveis.
- Revisar o diff, documentar ambiguidades e informar validações não executadas.
- Não afirmar que um comando passou sem executá-lo.
