# 1. Título

Seção reutilizável de portfólio visual

**Status:** Aprovada para implementação

## 2. Contexto

Profissionais e negócios locais com resultado visual — como nail designers, designers de sobrancelhas, salões, tatuadores, fotógrafos, arquitetos, marceneiros, oficinas, instaladores, paisagistas e confeiteiros — frequentemente usam somente redes sociais para apresentar trabalhos anteriores.

Uma single page própria pode aumentar a percepção de profissionalismo, centralizar informações comerciais e apresentar uma seleção curada de trabalhos sem depender da disponibilidade, do algoritmo ou da interface de uma plataforma externa.

O template já possui contratos de imagens locais, catálogo fechado de seções, compositor declarativo e presets de serviços e profissional. Entretanto, `product-showcase` representa produtos institucionais e `professional-profile` apresenta a pessoa e suas credenciais; nenhum dos dois expressa corretamente uma coleção de trabalhos já realizados.

A nova funcionalidade deve acrescentar uma seção de portfólio genérica e reutilizável, sem criar um preset específico para beleza, sem transformar a página em galeria dinâmica e sem adicionar carrossel, lightbox, filtros ou integração com Instagram.

## 3. Objetivo

Implementar uma seção tipada `portfolio` para apresentar trabalhos visuais em grade ou com um item em destaque, integrá-la de forma opcional aos presets `services` e `professional`, disponibilizar conteúdo demonstrativo coerente e preservar acessibilidade, performance, exportação estática e separação entre conteúdo, composição e apresentação.

## 4. Escopo

- Criar o modelo de conteúdo reutilizável `PortfolioItem`.
- Adicionar `PortfolioSection` à union discriminada e ao catálogo fechado de seções.
- Implementar as variantes iniciais `grid` e `featured`.
- Permitir um único item em destaque por meio de `featuredPortfolioItemId` opcional.
- Permitir título, descrição introdutória e ação final opcional na seção.
- Exigir imagem informativa para cada trabalho apresentado.
- Renderizar a coleção com HTML semântico, responsivo e sem interação obrigatória no cliente.
- Adicionar conteúdo concreto demonstrativo na camada `site`.
- Adicionar a seção como posição opcional nos presets `services` e `professional`.
- Não adicionar a seção ao preset `commerce`, cujo `product-showcase` já cobre sua principal necessidade visual inicial.
- Exibir a seção nas demonstrações de `services` e `professional` implementadas pela spec 16.
- Atualizar documentação de criação de cliente, assets e uso dos presets.
- Adicionar validações e testes unitários, de componente, integração e E2E.

## 5. Fora do escopo

- Criar preset específico para salão, nail designer, sobrancelhas ou qualquer setor.
- Criar carrossel, slider, autoplay, lightbox, modal, zoom ou visualização em tela cheia.
- Criar filtros por categoria, busca, paginação, ordenação pelo usuário ou carregamento incremental.
- Criar layout masonry dependente de JavaScript ou biblioteca externa.
- Importar automaticamente publicações do Instagram, TikTok, Pinterest ou outra rede social.
- Consumir APIs externas, usar tokens de redes sociais ou armazenar conteúdo remoto.
- Criar upload, CMS, painel administrativo, editor visual ou gerenciamento de mídia.
- Criar páginas individuais ou rotas dinâmicas para cada trabalho.
- Criar comparação interativa de antes e depois.
- Criar suporte a vídeo, áudio, reels ou conteúdo incorporado de terceiros.
- Criar curtidas, comentários, compartilhamento ou métricas de visualização.
- Criar schema.org específico de `ImageGallery`, `CreativeWork` ou avaliações para o portfólio.
- Adicionar novas dependências ou alterar a estratégia static-first.

## 6. Requisitos funcionais

### Modelo de conteúdo

- Deve existir um contrato independente de React e Next.js equivalente a `PortfolioItem`.
- Cada item deve possuir:
  - `id` estável e não vazio;
  - `title` não vazio;
  - `description` opcional;
  - `category` opcional, apenas para exibição editorial;
  - `image` obrigatória e informativa.
- A imagem do trabalho deve utilizar o contrato informativo já existente, exigindo `alt`, `width`, `height`, caminho local e indicação `decorative: false`.
- `category` não pode ativar filtros, agrupamentos automáticos ou lógica de navegação.
- Título, descrição e categoria devem ser texto simples; HTML fornecido por conteúdo não é permitido.

### Contrato da seção

- A seção deve possuir discriminador `type: "portfolio"`.
- As variantes iniciais devem ser somente:
  - `grid`;
  - `featured`.
- A seção deve aceitar:
  - `title` obrigatório;
  - `description` opcional;
  - `items` obrigatório;
  - `featuredPortfolioItemId` opcional;
  - `action` opcional para destino como página de contato ou perfil social externo.
- `items` deve conter pelo menos um item.
- IDs dos itens devem ser únicos dentro da coleção.
- Quando `featuredPortfolioItemId` for informado, ele deve referenciar exatamente um item existente.
- A presença de `featuredPortfolioItemId` deve resolver a variante final como `featured`, seguindo o padrão já utilizado por serviços, produtos e depoimentos em destaque.
- Uma composição explícita que solicite `featured` sem um ID válido deve falhar com mensagem clara em vez de escolher silenciosamente o primeiro item.
- Ausência de `featuredPortfolioItemId` deve preservar a variante definida pelo blueprint, desde que ela seja válida para o contrato.
- A ação opcional deve usar o contrato `Action` existente e ser renderizada como link real, nunca como botão sem comportamento.

### Variante `grid`

- Deve apresentar todos os itens em uma lista semântica.
- Deve usar uma coluna em telas pequenas e aumentar progressivamente a quantidade de colunas conforme o espaço disponível.
- Deve tolerar quantidades diferentes de itens, incluindo um único item.
- Deve preservar a proporção original das imagens e não distorcê-las.
- Deve tolerar uma coleção com imagens horizontais, verticais e quadradas sem provocar overflow ou corte de conteúdo textual.
- Não deve simular masonry com posicionamento absoluto, medição em JavaScript ou reordenação visual diferente da ordem do DOM.

### Variante `featured`

- Deve apresentar o item referenciado como destaque visual antes dos demais.
- O item destacado deve permanecer na mesma lista semântica e não ser duplicado no DOM.
- Os itens restantes devem seguir em grade responsiva.
- Quando existir apenas um item, a variante deve continuar válida e apresentar somente o destaque.
- A ordem lógica e de leitura deve começar pelo item destacado e depois seguir a ordem editorial dos demais.
- O destaque não deve transformar a imagem em controle interativo sem destino real.

### Semântica e conteúdo visual

- A seção deve usar heading compatível com a hierarquia da página.
- A coleção deve usar `ul`/`li` ou estrutura semântica equivalente apropriada.
- Cada trabalho deve utilizar `figure` e `figcaption` quando título, categoria ou descrição forem exibidos em relação direta com a imagem.
- O texto alternativo deve descrever o conteúdo visual relevante, enquanto o título deve nomear o trabalho; os dois não devem ser duplicados mecanicamente.
- Imagem, título e descrição devem continuar compreensíveis sem depender de hover.
- Nenhuma informação essencial pode existir apenas sobreposta à imagem.
- A ação final opcional deve aparecer depois da coleção.

### Conteúdo demonstrativo e presets

- Deve existir um módulo concreto de conteúdo, preferencialmente `src/site/content/portfolio.ts`, com trabalhos fictícios e assets locais demonstrativos.
- Os dados devem permanecer claramente fictícios e substituíveis ao criar um cliente.
- O preset `services` deve ganhar uma entrada opcional de `portfolio` depois da seção de serviços e antes dos diferenciais ou da seção editorial seguinte.
- O preset `professional` deve ganhar uma entrada opcional de `portfolio` depois do perfil e/ou das áreas de atuação, antes dos diferenciais e depoimentos.
- A implementação deve escolher uma ordem única e documentada para cada preset, sem heurística por setor.
- O preset `commerce` deve permanecer inalterado nesta spec.
- A home demonstrativa deve fornecer conteúdo de portfólio para `services` e `professional`, permitindo verificar a seção nas rotas de demonstração.
- A seção deve ser omitida sem erro quando seu blueprint for opcional e o conteúdo não estiver presente.
- Caso exista item de navegação `#portfolio`, ele só pode ser criado quando o conteúdo correspondente estiver presente e a seção estiver marcada como navegável.
- Remover a seção para um cliente não pode exigir alteração no componente; deve ocorrer pela remoção coordenada de conteúdo e navegação/composição aplicável.

### Privacidade e direitos de imagem

- A documentação deve afirmar que somente imagens com direito de publicação e autorização adequada podem ser adicionadas.
- Fotografias de clientes, rostos, placas, endereços, documentos, crianças ou dados identificáveis exigem avaliação e autorização do responsável pelo site.
- A implementação não deve criar sistema de consentimento; a responsabilidade editorial deve ser documentada.
- Assets públicos devem ser tratados como acessíveis por qualquer pessoa que conheça ou descubra a URL.
- Metadados desnecessários dos arquivos, incluindo localização EXIF quando aplicável, devem ser removidos antes do commit.

## 7. Requisitos não funcionais

- Preservar Next.js 16.2.12, React 19.2.4 e TypeScript estrito.
- Preservar Server Components por padrão; a seção não deve exigir `"use client"`.
- Não adicionar JavaScript para layout, seleção de item ou apresentação das imagens.
- Preservar CSS Modules e CSS Custom Properties sem criar framework global de utilitários.
- Reutilizar `ContentImage`, primitives de layout e componentes tipográficos existentes quando seus contratos forem suficientes.
- Não criar wrapper genérico de galeria ou abstração de mídia sem repetição comprovada.
- Não adicionar dependências de galeria, ícones, imagens, gestos ou animação.
- Preservar compatibilidade com `output: "export"` e hosts de arquivos estáticos.
- Utilizar apenas assets locais no contrato inicial.
- Manter dimensões conhecidas para prevenir layout shift.
- Não marcar todas as imagens como prioritárias; imagens de portfólio normalmente devem carregar sem prioridade por estarem abaixo do conteúdo inicial.
- Manter leitura e navegação utilizáveis em 320 CSS px, zoom de 200% e texto ampliado.
- Respeitar `prefers-reduced-motion`; a implementação não necessita de animação para funcionar.
- Não depender de hover, precisão de ponteiro ou tamanho específico de imagem.
- Evitar que uma coleção grande torne a home excessivamente pesada; o conteúdo demonstrativo deve usar uma quantidade pequena e representativa.

## 8. Decisões arquiteturais

- `PortfolioItem` pertence a `domain/content`, pois representa conteúdo de negócio independente da interface.
- `PortfolioSection` pertence à union discriminada em `domain/sections`.
- O componente pertence a `src/sections/portfolio` e deve ser registrado explicitamente no catálogo de seções.
- As referências concretas de imagem e os itens demonstrativos pertencem à camada `site`; os arquivos físicos pertencem a `public/images`.
- Portfólio e produto são conceitos diferentes: portfólio mostra trabalhos realizados; `product-showcase` mostra itens oferecidos ou comercializados.
- Portfólio e perfil profissional são complementares: um apresenta evidência visual do trabalho e o outro apresenta identidade, biografia e credenciais.
- A seção não deve conhecer preset, negócio concreto, rota de demonstração ou configuração global.
- O compositor continua responsável por unir blueprint, conteúdo e variante final.
- A seleção de destaque seguirá um único ID opcional no contrato da seção. Não adicionar `isFeatured` a cada item.
- Os presets `services` e `professional` recebem apenas uma posição opcional; eles não passam a depender obrigatoriamente de fotografias.
- Não criar preset de nicho. Diferenças entre nail designer, salão, oficina ou fotógrafo pertencem ao conteúdo, aos assets, ao tema e eventualmente à composição explícita do cliente.
- Não introduzir lightbox nesta fase. Uma futura necessidade exigirá spec própria para foco, teclado, zoom, fechamento, histórico, performance e comportamento sem JavaScript.
- Não introduzir comparação antes/depois nesta fase. Uma futura solução deverá definir contrato de duas mídias, consentimento, descrição acessível e prevenção de apresentação enganosa.
- O conteúdo demonstrativo deve ser suficientemente distinto para provar a seção, mas não deve simular resultados médicos, garantias ou alegações não verificáveis.

## 9. Estrutura impactada

Conceitualmente, poderão ser criados ou alterados:

- `src/domain/content.ts` para `PortfolioItem`;
- `src/domain/sections.ts` para `PortfolioSection`, variantes e union discriminada;
- `src/sections/portfolio/portfolio.tsx`;
- `src/sections/portfolio/portfolio.module.css`;
- `src/composition/section-catalog.tsx`;
- `src/composition/resolve-page.ts` para validação e resolução do item em destaque;
- `src/site/content/portfolio.ts`;
- `src/site/pages/home-content.ts`;
- `src/presets/services/services-preset.ts`;
- `src/presets/professional/professional-preset.ts`;
- navegação concreta dos presets quando a seção demonstrativa estiver presente;
- `public/images/portfolio` ou organização equivalente coerente com a documentação de assets;
- testes de domínio, resolver, catálogo, componente, presets e rotas de demonstração;
- `README.md`, `docs/NEW_CLIENT.md`, `docs/ASSETS.md` e auditoria de acessibilidade quando aplicável.

Não alterar o preset `commerce`, criar nova camada global ou modificar arquitetura/guideline para acomodar a seção.

## 10. Fluxo esperado

### Desenvolvedor configurando um profissional visual

1. Seleciona `professional` ou `services` conforme o foco comercial do cliente.
2. Otimiza, renomeia e adiciona imagens autorizadas ao diretório público.
3. Cria itens de portfólio com IDs estáveis, títulos, descrições opcionais e alt texts específicos.
4. Escolhe opcionalmente um único item em destaque.
5. Adiciona o conteúdo da seção à composição aplicável.
6. Adiciona navegação para `#portfolio` somente quando a seção estiver presente e navegável.
7. Executa validações de assets, acessibilidade, testes e build estático.

### Aplicação durante resolução

1. Recebe o blueprint opcional do preset e o conteúdo concreto da página.
2. Omite a seção quando o conteúdo não existe e o blueprint é opcional.
3. Valida coleção, IDs e referência de destaque quando o conteúdo existe.
4. Resolve `featured` quando um ID de destaque válido é fornecido.
5. Produz uma `PageSection` tipada e a entrega ao catálogo.
6. O catálogo renderiza `PortfolioSection` sem importar dados concretos.

### Usuário final

1. Encontra uma seleção curada de trabalhos na ordem editorial definida.
2. Visualiza imagens, títulos e descrições sem depender de interação.
3. Identifica o trabalho destacado quando a variante correspondente é usada.
4. Pode seguir uma ação real, como contato ou perfil social, quando configurada.
5. Continua usando a página com teclado, leitor de tela, zoom ou JavaScript desabilitado.

## 11. Critérios de aceite

- Dado um `PortfolioItem`, quando o typecheck é executado, então ID, título e imagem informativa são obrigatórios.
- Dado uma imagem decorativa ou sem alt, quando usada como imagem de portfólio, então o contrato deve rejeitar esse uso.
- Dado uma coleção vazia, quando a página é resolvida, então ocorre erro claro informando a seção.
- Dado IDs duplicados, quando a coleção é validada, então ocorre erro explícito com o ID repetido.
- Dado `featuredPortfolioItemId` inexistente, quando a página é resolvida, então ocorre erro claro com seção, coleção e ID.
- Dado um ID válido, quando a página é resolvida, então o item aparece uma única vez, primeiro na leitura e com variante final `featured`.
- Dado ausência de ID de destaque e blueprint `grid`, quando a página é resolvida, então a variante final permanece `grid`.
- Dado composição explícita `featured` sem referência válida, quando validada, então ela não escolhe silenciosamente o primeiro item.
- Dado um preset `services` ou `professional` sem conteúdo de portfólio, quando resolvido, então a seção opcional é omitida sem conteúdo órfão ou navegação quebrada.
- Dado conteúdo demonstrativo de portfólio, quando `/demo/services/` ou `/demo/professional/` é acessada, então a seção está presente e navegável conforme configuração.
- Dado `/demo/commerce/`, quando a página é resolvida, então a composição padrão não ganha `portfolio` por esta spec.
- Dado a variante `grid`, quando a viewport possui 320 CSS px, então há uma coluna, sem overflow e sem perda de texto.
- Dado a variante `featured`, quando existe um único item, então o layout continua válido sem área vazia ou duplicação.
- Dado imagens com proporções diferentes, quando renderizadas, então não são distorcidas e suas dimensões reservam espaço antes do carregamento.
- Dado leitor de tela, quando percorre a seção, então heading, lista, figures, captions, alt texts e ação possuem nomes e ordem compreensíveis.
- Dado JavaScript desabilitado, quando a página é acessada diretamente, então todo o portfólio permanece visível e funcional.
- Dado build estático, quando os assets são validados, então caminhos inexistentes falham e nenhum runtime de mídia é necessário.

## 12. Cenários de erro e borda

- Coleção vazia, ID vazio ou IDs duplicados.
- Título do item vazio ou texto alternativo genérico como “foto do trabalho”.
- Referência de destaque inexistente ou pertencente a outra coleção.
- Item destacado duplicado na grade restante.
- Blueprint opcional omitido, mas navegação ainda aponta para `#portfolio`.
- Conteúdo de portfólio fornecido a preset sem entrada correspondente, tornando-se conteúdo órfão.
- Imagem local inexistente, corrompida, excessivamente pesada ou com dimensões incorretas.
- Muitas imagens marcadas como `priority`.
- Imagens verticais e horizontais causando desalinhamento, distorção ou overflow.
- Texto sobre imagem ficando ilegível ou disponível somente em hover.
- Ação externa sem nome compreensível ou com `kind` incompatível com o destino.
- Uso de fotografia sem autorização ou contendo informação pessoal não necessária.
- Metadata EXIF expondo localização ou informações do dispositivo.
- Tentativa de usar URL remota, embed de rede social, vídeo ou iframe.
- Coleção grande demais para uma single page estática, prejudicando peso e leitura.
- Uso de portfólio para prometer resultado garantido, especialmente em saúde ou estética.
- Implementação de lightbox, filtro ou masonry fora do escopo para “melhorar” a seção.

## 13. Estratégia de testes

- Testes de tipo e unitários devem cobrir o contrato obrigatório de `PortfolioItem` e rejeição de imagem decorativa.
- Testes do resolver devem cobrir coleção vazia, IDs duplicados, referência válida, referência inválida, promoção para `featured` e preservação de `grid`.
- A validação de composição explícita deve cobrir `featured` sem ID válido.
- Testes do catálogo devem confirmar que `portfolio` resolve exatamente para o componente correspondente e mantém exaustividade da union.
- Testes de componente com Testing Library devem verificar heading, lista, quantidade de itens, figures, captions, alt texts e ação opcional.
- Testes devem confirmar que o item destacado não é duplicado e aparece antes dos demais na ordem do DOM.
- Testes de presets devem confirmar a posição opcional em `services` e `professional` e ausência em `commerce`.
- Testes devem confirmar que retirar o conteúdo opcional não produz seção, conteúdo órfão ou link inválido.
- Testes E2E com Playwright devem acessar as demonstrações de serviços e profissional, navegar por `#portfolio` quando configurado e verificar imagens carregadas.
- E2E deve validar ausência de overflow horizontal em 320 CSS px e ausência de violações sérias ou críticas de axe.
- Validação estática deve confirmar que todos os caminhos locais existem na pasta pública.
- Build e E2E devem continuar executando contra `out`, preservando acesso direto às rotas demonstrativas.
- Validação manual deve incluir teclado, leitor de tela, zoom de 200%, texto longo, um item, vários itens e proporções de imagem variadas.
- Evitar snapshots extensos, comparação pixel a pixel e testes dependentes de uma quantidade fixa de colunas em todas as larguras.

## 14. Definição de pronto

- `PortfolioItem` criado com imagem informativa obrigatória.
- `PortfolioSection` incluída na union discriminada e no catálogo fechado.
- Variantes `grid` e `featured` implementadas sem JavaScript de interação.
- Coleção, IDs e referência de destaque validados.
- Item destacado renderizado uma única vez e na ordem correta.
- Layout responsivo, sem distorção e compatível com proporções variadas.
- Semântica de lista, figure, caption e alt text aplicada.
- Ação final opcional implementada com contrato existente.
- Conteúdo e assets demonstrativos adicionados na camada correta.
- Presets `services` e `professional` atualizados com posição opcional.
- Preset `commerce` preservado.
- Demonstrações de serviços e profissional exibem a seção após conclusão da spec 16.
- Documentação atualizada com configuração, otimização, autorização e privacidade de imagens.
- Nenhum carrossel, lightbox, filtro, masonry, CMS, API externa ou dependência adicionado.
- Lint, typecheck, testes, build, validação estática e E2E executados com sucesso.
- Diff revisado e limitado ao domínio, seção, composição, presets, conteúdo, assets, testes e documentação correspondentes.

## 15. Instruções para o Codex

- Ler `AGENTS.md`, `docs/ARCHITECTURE.md`, `docs/CODING_GUIDELINES.md` e esta spec integralmente.
- Confirmar que a spec 16 foi implementada e validada antes de iniciar esta spec; não implementar as duas simultaneamente.
- Inspecionar `package.json`, contratos de conteúdo e assets, union de seções, resolver, catálogo, presets, conteúdo da home, rotas demonstrativas e testes existentes.
- Consultar a documentação instalada em `node_modules/next/dist/docs/` para `next/image`, Server Components, App Router e static export do Next.js 16.2.12.
- Reutilizar padrões existentes de `featuredServiceId`, `featuredProductId` e `featuredTestimonialId` para criar `featuredPortfolioItemId`.
- Não usar imagem decorativa em item de portfólio e não enfraquecer o contrato global de assets.
- Não substituir `product-showcase` ou `professional-profile`; adicionar um conceito de domínio distinto.
- Implementar somente `grid` e `featured`.
- Não adicionar lightbox, modal, carrossel, filtro, masonry, upload, CMS, embed social ou rota individual.
- Manter a seção como Server Component e não adicionar `"use client"`.
- Usar lista e figures semânticas, CSS Modules, tokens existentes e primitives compartilhadas quando adequadas.
- Preservar a proporção das imagens, dimensões conhecidas e carregamento sem prioridade indiscriminada.
- Adicionar a posição opcional somente a `services` e `professional`; não alterar `commerce`.
- Manter conteúdo e assets concretos dentro de `site` e `public`; a seção compartilhada não pode importar esses módulos.
- Atualizar navegação somente quando a seção realmente existir.
- Documentar autorização, exposição pública e remoção de metadata sensível dos arquivos.
- Não adicionar dependências nem atualizar versões ou lockfile.
- Executar `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run validate:static` e `npm run test:e2e`.
- Revisar o diff e informar arquivos alterados, decisões, comandos executados, resultados e qualquer validação não realizada.
- Não afirmar que um comando passou sem executá-lo.