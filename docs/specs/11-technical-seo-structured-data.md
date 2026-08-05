# 1. Título

SEO técnico e dados estruturados

**Status:** Aprovada para implementação

## 2. Contexto

Os sites gerados pelo template serão públicos, indexáveis e orientados a conteúdo. A configuração central já possui URL, idioma e dados do negócio, enquanto o compositor conhece páginas e seções. Sem uma estratégia central, títulos, canonical, Open Graph e dados estruturados podem duplicar ou contradizer informações exibidas.

O Next.js 16 oferece Metadata API e convenções de arquivos especiais que devem ser verificadas na documentação instalada antes da implementação.

## 3. Objetivo

Implementar SEO técnico estático, tipado e centralizado para páginas públicas, reutilizando a fonte de verdade do negócio e oferecendo metadata, canonical, robots, sitemap, imagens sociais e JSON-LD coerentes com o conteúdo real.

## 4. Escopo

- Definir configuração global de SEO na camada `site`.
- Definir overrides controlados por página.
- Integrar com a Metadata API do App Router.
- Configurar `metadataBase`, título padrão, template de título, descrição, canonical, idioma e locale.
- Configurar Open Graph e Twitter Card com imagem social local opcional.
- Criar sitemap e robots pelas convenções suportadas pela versão instalada.
- Organizar favicons e ícones públicos.
- Gerar JSON-LD tipado para o negócio.
- Suportar tipos estruturados iniciais controlados: `LocalBusiness`, `ProfessionalService` e `Store`.
- Reutilizar nome, URL, logo, telefone, endereço, horários e redes sociais quando disponíveis.
- Definir comportamento de indexação em ambiente de produção e preview sem depender de segredo no cliente.

## 5. Fora do escopo

- Analytics, Search Console, gerenciador de tags ou monitoramento de ranking.
- SEO editorial avançado, blog, keywords automáticas ou geração de conteúdo.
- Dados estruturados de produto transacional, oferta, avaliação agregada ou evento.
- Geração dinâmica de imagem social em runtime.
- Internacionalização com múltiplas versões de rota e `hreflang`.
- Redirecionamentos, domínio, DNS ou infraestrutura do provedor.
- Garantia de posicionamento em buscadores.
- Schema.org arbitrário informado por strings livres.

## 6. Requisitos funcionais

- A configuração global deve possuir título padrão, descrição padrão, URL canônica base, locale e imagem social padrão opcional.
- Cada página deve poder sobrescrever título, descrição, canonical, imagem social e política de indexação por contrato fechado.
- Título e descrição obrigatórios não podem ser vazios ou compostos apenas por espaços.
- Canonicals devem ser URLs absolutas resolvidas a partir da URL base e da rota da página.
- A metadata deve ser produzida na camada `app` a partir de resolvers puros e dados de `site`.
- A implementação deve preferir objeto `metadata` estático quando os valores forem conhecidos estaticamente e usar `generateMetadata` somente quando a composição exigir resolução por página suportada pela versão instalada.
- Sitemap deve listar apenas páginas públicas e indexáveis da composição final.
- Robots deve apontar para o sitemap canônico e não bloquear produção por padrão.
- Preview ou ambiente não produtivo deve poder usar política `noindex, nofollow` por configuração explícita de deploy, sem expor segredo.
- JSON-LD deve incluir somente propriedades reais e disponíveis; não inventar rating, faixa de preço, geo ou horários.
- O tipo estruturado deve ser uma união fechada entre os três tipos iniciais.
- Dados estruturados devem usar a URL canônica e o mesmo nome, telefone, endereço e logo da fonte de verdade.
- JSON-LD deve ser serializado com proteção contra fechamento inesperado de tag e conteúdo injetável.

## 7. Requisitos não funcionais

- Compatibilidade com Next.js 16.2.12 e documentação local.
- Metadata suportada apenas em Server Components.
- Compatibilidade com build e exportação estática.
- TypeScript estrito, contratos somente leitura e resolvers testáveis.
- Nenhuma duplicação manual de dados centrais do negócio.
- Nenhuma dependência nova de SEO ou schema.
- URLs e conteúdo externo devem ser tratados como não confiáveis durante validação.
- Não usar `dangerouslySetInnerHTML` fora da inserção de JSON-LD explicitamente justificada, com serialização segura e teste.
- Manter a camada `app` fina e componentes visuais sem responsabilidade de SEO.

## 8. Decisões arquiteturais

- Contratos de SEO independentes do framework pertencem a `domain/seo`.
- Valores concretos globais e por página pertencem a `site/seo` e `site/pages`.
- Adaptadores para `Metadata`, `MetadataRoute.Sitemap` e `MetadataRoute.Robots` pertencem à camada `app` ou a um resolver específico consumido por ela.
- A URL base da spec 01 será a fonte de verdade para `metadataBase`, canonical, sitemap e JSON-LD.
- Não criar segundo cadastro de negócio para schema. O gerador receberá contratos existentes.
- O tipo estruturado inicial será explicitamente configurado e independente do preset; preset pode sugerir um default durante criação do cliente, mas não define o tipo real do negócio.
- A inserção de JSON-LD pode usar script no Server Component com serialização segura. Esta é a única autorização desta spec para a técnica necessária, limitada a dados internos tipados.
- Imagem social será asset local estático. Geração dinâmica exige nova avaliação de build.
- Política de preview deverá ser simples e isolada da interface, podendo ser determinada por variável pública de build somente se seu valor não for sensível.

## 9. Estrutura impactada

- `src/domain/seo`: contratos globais, por página e tipo estruturado.
- `src/site/seo`: configuração concreta e imagem social.
- `src/composition` ou resolver dedicado: composição de metadata a partir da página final.
- `src/app/layout` e páginas: export de metadata compatível.
- `src/app/sitemap` e `src/app/robots` conforme convenções da versão instalada.
- Arquivos de ícone e imagem social em `src/app` ou `public`, conforme a API escolhida.
- Gerador tipado e seguro de JSON-LD.

## 10. Fluxo esperado

### Desenvolvedor que configura um cliente

1. Informa título, descrição e tipo estruturado no módulo de SEO.
2. Usa a URL base e dados de negócio já existentes.
3. Adiciona imagem social local acessível e adequada.
4. Define overrides apenas para páginas que precisam deles.
5. Executa validações e inspeciona metadata e JSON-LD no build de produção.

### Aplicação durante build ou runtime

1. A rota obtém a definição da página.
2. O resolver combina defaults globais e override de página por precedência explícita, sem merge profundo.
3. A camada `app` produz metadata suportada pelo Next.js.
4. Sitemap e robots são gerados estaticamente.
5. JSON-LD é criado a partir dos dados reais e serializado com segurança.

### Usuário final e crawler

1. Recebem título, descrição, canonical e cards sociais coerentes.
2. Crawlers encontram sitemap e política de indexação.
3. Dados estruturados refletem somente informações reais exibidas ou configuradas.

## 11. Critérios de aceite

- Dado que uma página não possui override, quando metadata é resolvida, então usa título e descrição globais com canonical derivado da rota.
- Dado que uma página possui override de título e descrição, quando renderizada, então os valores específicos prevalecem sem duplicar a configuração global.
- Dado que a URL base é inválida, quando SEO é resolvido, então build ou validação falha antes de gerar canonical.
- Dado que uma página está marcada como não indexável, quando sitemap e metadata são gerados, então ela não aparece no sitemap e recebe diretivas coerentes.
- Dado que o build é de produção, quando `robots` é servido, então o conteúdo permite indexação das rotas públicas e referencia o sitemap.
- Dado que telefone, endereço ou logo não foram fornecidos, quando JSON-LD é gerado, então as propriedades são omitidas e não recebem valores inventados.
- Dado que JSON-LD contém texto com caractere potencialmente perigoso, quando serializado, então não encerra a tag de script nem injeta marcação.
- Dado que componentes visuais são revisados, então nenhum define metadata ou duplica dados estruturados.

## 12. Cenários de erro e borda

- URL base relativa, com barra inconsistente ou domínio provisório.
- Título ou descrição vazios ou excessivamente longos.
- Canonical duplicado para rotas diferentes.
- Página não indexável incluída no sitemap.
- Imagem social inexistente ou com URL inválida.
- Tipo estruturado incompatível com o negócio real.
- Horários incompletos ou endereço parcial.
- Rating, preço ou coordenadas inventados para enriquecer schema.
- Preview publicado acidentalmente como indexável.
- Uso de API de metadata incompatível com exportação estática ou versão instalada.

## 13. Estratégia de testes

- Testes unitários devem cobrir resolução global versus página, canonical, indexação e geração segura de JSON-LD.
- Testes de integração devem validar metadata da home nos três presets e páginas adicionais quando existirem.
- Testes devem confirmar que sitemap exclui páginas não indexáveis e que robots referencia a URL correta.
- E2E ou inspeção de produção deve verificar tags no documento, canonical, JSON-LD parseável e arquivos públicos.
- Validação manual pode usar ferramentas de resultados avançados e depuradores de cards, sem tornar serviços externos gate único.
- Não testar algoritmo de buscador nem exigir score de SEO como garantia de ranking.

## 14. Definição de pronto

- Contratos e configuração global e por página implementados.
- Metadata integrada à camada `app` com API compatível com Next.js 16.2.12.
- Canonical, Open Graph, Twitter Card, ícones, sitemap e robots funcionando.
- JSON-LD tipado, seguro e sem dados inventados.
- Páginas não indexáveis tratadas de forma coerente.
- Nenhuma dependência, analytics ou geração dinâmica adicionada.
- Lint, typecheck, testes disponíveis e build estático executados com sucesso.
- Metadata e arquivos gerados inspecionados em saída de produção.

## 15. Instruções para o Codex

- Ler `AGENTS.md`, arquitetura, guideline e specs 01–10 implementadas.
- Consultar obrigatoriamente a documentação local de Metadata API, metadata files, sitemap, robots e static export para Next.js 16.2.12.
- Implementar somente SEO técnico e dados estruturados desta spec.
- Não adicionar pacote de SEO, analytics, tags de marketing ou geração dinâmica de imagem.
- Não duplicar nome, URL, telefone, endereço, logo ou horários.
- Não atualizar dependências ou lockfile.
- Preservar Server Components, TypeScript estrito e camada `app` fina.
- Limitar `dangerouslySetInnerHTML` à inserção segura e testada de JSON-LD, se necessária pela API escolhida.
- Executar lint, typecheck, testes e build conforme disponíveis.
- Inspecionar metadata, sitemap, robots e JSON-LD do build.
- Revisar o diff e informar ambiguidades e validações não executadas.
- Não afirmar que um comando passou sem executá-lo.
