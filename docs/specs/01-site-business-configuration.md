# 1. Título

Configuração central tipada do site e do negócio

**Status:** Aprovada para implementação

## 2. Contexto

Cada repositório criado a partir do template precisa possuir uma fonte de verdade clara para os dados essenciais do cliente e para as escolhas estruturais do site. O estado inicial ainda contém valores demonstrativos do `create-next-app`, o que favorece duplicação de nome, URL, idioma e dados de contato em componentes ou arquivos do App Router.

Esta spec cria a fundação mínima sobre a qual domínio, tema, páginas, presets e SEO serão construídos, sem antecipar as responsabilidades dessas specs posteriores.

## 3. Objetivo

Estabelecer uma configuração central, tipada, somente leitura e validada durante desenvolvimento ou build, capaz de identificar o site, o negócio, o idioma, a URL principal, o preset selecionado e o tema selecionado.

## 4. Escopo

- Criar o ponto de entrada público da camada `site`.
- Definir o contrato central de configuração do site.
- Definir os dados essenciais de identidade e contato do negócio necessários antes do modelo de conteúdo completo.
- Definir identificadores fechados para os três presets iniciais.
- Definir um identificador estável para o tema selecionado, sem implementar tokens visuais.
- Definir idioma, locale, URL base e informações institucionais mínimas.
- Separar módulos especializados e compô-los no ponto de entrada central.
- Criar validação explícita para valores obrigatórios que TypeScript não consegue validar sozinho.
- Integrar idioma e dados básicos ao `RootLayout`, mantendo a camada `app` fina.
- Remover do layout apenas os valores demonstrativos diretamente substituídos por esta configuração.

## 5. Fora do escopo

- Modelo completo de serviços, produtos, profissionais, depoimentos ou páginas.
- Componentes visuais, seções e compositor.
- Implementação do sistema de tema.
- Implementação dos presets.
- SEO completo, sitemap, robots, Open Graph ou JSON-LD.
- Analytics, formulários, CMS, autenticação, banco de dados, backend ou integrações remotas.
- Variáveis de ambiente para dados públicos que podem permanecer versionados.

## 6. Requisitos funcionais

- A configuração deve expor um único objeto público do site, composto por módulos menores.
- O negócio deve possuir, no mínimo, identificador estável, nome comercial, descrição curta, email e telefone principal.
- A configuração do site deve possuir nome do site, idioma do documento, locale, URL base absoluta, identificador do preset e identificador do tema.
- Os identificadores de preset aceitos inicialmente devem ser somente `services`, `commerce` e `professional`.
- Dados repetidos, como nome comercial, telefone, email e URL, devem existir em uma única fonte de verdade.
- O `RootLayout` deve obter o atributo de idioma da configuração central.
- A aplicação deve rejeitar configuração obrigatória vazia, URL base inválida, locale incompatível com o formato esperado ou identificador de preset desconhecido.
- Conteúdo opcional ausente não deve ser preenchido com texto comercial inventado.
- A API pública da camada `site` deve permitir imports estáveis por outras camadas autorizadas.

## 7. Requisitos não funcionais

- Manter TypeScript estrito, contratos exportados explícitos e valores somente leitura.
- Não utilizar `any`, casts duplos, `@ts-ignore`, classes de configuração ou mutação após a criação.
- Manter Server Components por padrão e não introduzir `"use client"`.
- Não adicionar dependências.
- Produzir mensagens de validação que indiquem o campo inválido e a causa.
- Evitar objeto monolítico: dados do negócio e configuração operacional devem permanecer em módulos coesos.
- A configuração deve ser determinística e compatível com pré-renderização e exportação estática.
- Dados públicos versionados não devem ser tratados como segredo.

## 8. Decisões arquiteturais

- A camada `site` será a fonte de verdade para valores concretos do cliente e dependerá apenas de contratos permitidos da camada `domain`.
- A spec poderá introduzir somente os contratos fundamentais necessários à própria configuração; a modelagem ampliada pertence à spec 02.
- O ponto de entrada central compõe módulos especializados, mas não concentra todo o conteúdo do site em um único arquivo.
- `PresetId` será uma união literal fechada com os três valores aprovados. O contrato não deve aceitar strings arbitrárias.
- O identificador de tema será validado como identificador não vazio, mas o catálogo e os tokens do tema serão definidos na spec 03.
- A validação deverá ser uma função pura e explícita, executada quando a configuração central for resolvida. Não criar framework de schema, decorators ou mecanismo genérico de configuração.
- A camada `app` pode importar o ponto de entrada de `site`; componentes e seções compartilhadas não podem importá-lo diretamente.
- Não usar Context ou provider para distribuir a configuração inteira.
- A evolução futura deve ocorrer por novos módulos especializados agregados pela configuração central, sem alterar a direção das dependências.

## 9. Estrutura impactada

- `src/site`: ponto de entrada público e composição da configuração.
- `src/site/config`: escolhas gerais do site, idioma, locale, URL, preset e tema.
- `src/site/business`: identidade e contato essencial do cliente.
- `src/domain`: contratos mínimos compartilhados exigidos por esta configuração.
- `src/app/layout`: consumo do idioma e dos dados mínimos permitidos.
- Testes da validação da configuração quando a infraestrutura de testes estiver disponível.

Os nomes finais devem respeitar `kebab-case`, imports por `@/` entre áreas e exports nomeados fora dos arquivos especiais do Next.js.

## 10. Fluxo esperado

### Desenvolvedor que configura um cliente

1. Edita os módulos de negócio e de configuração dentro de `src/site`.
2. Seleciona um dos três identificadores de preset aceitos.
3. Informa um identificador de tema que será implementado pela spec 03.
4. Informa idioma, locale e URL base absoluta.
5. Executa as validações do projeto e recebe erro objetivo caso um campo obrigatório esteja inválido.

### Aplicação durante build ou runtime

1. A camada `app` importa o ponto de entrada público de `site`.
2. A configuração central compõe os módulos especializados.
3. A validação verifica os invariantes definidos nesta spec.
4. O `RootLayout` aplica o idioma configurado e permanece como Server Component.
5. Specs posteriores consomem os contratos sem duplicar valores concretos.

### Usuário final

1. Recebe documento com idioma correto.
2. Visualiza, quando as specs visuais forem implementadas, dados provenientes da mesma fonte de verdade.

## 11. Critérios de aceite

- Dado que a configuração utiliza `services`, `commerce` ou `professional`, quando o typecheck é executado, então o identificador é aceito sem cast.
- Dado que um identificador de preset desconhecido é informado, quando o typecheck ou a validação é executado, então a configuração é rejeitada com indicação do campo.
- Dado que a URL base é relativa ou inválida, quando a configuração é resolvida, então o build ou validação falha antes de renderizar a página.
- Dado que nome comercial, email ou telefone obrigatório está vazio, quando a configuração é resolvida, então ocorre erro claro e determinístico.
- Dado que o idioma configurado é `pt-BR`, quando o layout raiz é renderizado, então o atributo `lang` utiliza o valor correspondente definido pelo contrato.
- Dado que um consumidor está em `components` ou `sections`, quando os imports são revisados, então ele não importa a configuração concreta de `site`.
- Dado que a implementação termina, quando o diff é revisado, então não existem dados demonstrativos duplicados no layout para os campos cobertos por esta spec.

## 12. Cenários de erro e borda

- Nome comercial composto apenas por espaços.
- URL base sem protocolo ou com caminho inesperado.
- Locale vazio ou incompatível com o idioma informado.
- Telefone ou email ausente quando definido como obrigatório.
- Identificador de tema vazio.
- Preset desconhecido obtido por cast ou valor externo.
- Import circular entre `site` e `domain`.
- Objeto central crescendo para concentrar conteúdo editorial que pertence à spec 02.
- Uso indevido de variável pública de ambiente para esconder dado que deve ser versionado.

## 13. Estratégia de testes

- Testes unitários futuros devem cobrir validação de URL, campos obrigatórios, locale, preset e identificador de tema.
- Um teste de integração futuro deve confirmar que o layout consome o idioma da configuração sem transformar a árvore em Client Component.
- O typecheck deve exercer casos inválidos de preset por meio de testes de tipo ou fixtures apropriadas quando a ferramenta oficial for escolhida.
- A validação manual deve confirmar ausência de duplicação dos dados cobertos e direção correta dos imports.
- Esta spec não deve escolher ou instalar o test runner; isso pertence à spec 12.

## 14. Definição de pronto

- Ponto de entrada público da camada `site` criado.
- Configuração e dados essenciais do negócio separados em módulos coesos.
- Contratos somente leitura implementados sem `any`.
- Três identificadores de preset fechados e tipados.
- Validação explícita dos invariantes obrigatórios implementada.
- `RootLayout` consumindo o idioma configurado sem lógica de negócio adicional.
- Nenhuma dependência adicionada.
- Nenhuma funcionalidade de specs futuras implementada.
- Lint, typecheck quando disponível e build executados com sucesso.
- Diff revisado e documentação afetada atualizada.

## 15. Instruções para o Codex

- Ler integralmente `AGENTS.md`.
- Respeitar `docs/ARCHITECTURE.md` e `docs/CODING_GUIDELINES.md`.
- Consultar a documentação instalada em `node_modules/next/dist/docs/` para detalhes do `RootLayout` na versão instalada.
- Implementar apenas o escopo desta spec.
- Não adicionar dependências nem atualizar pacotes.
- Não alterar decisões arquiteturais, arquitetura ou guideline.
- Não criar abstrações prematuras, providers, registries genéricos ou sistema de plugins.
- Preservar TypeScript estrito e contratos somente leitura.
- Preservar Server Components por padrão e não adicionar `"use client"` sem necessidade concreta.
- Preservar CSS Modules e variáveis CSS, embora esta spec não deva criar interface visual.
- Executar lint, typecheck, testes e build conforme os scripts disponíveis.
- Revisar o diff completo e confirmar que apenas arquivos necessários foram alterados.
- Documentar ambiguidades e validações que não puderam ser executadas.
- Não afirmar que um comando passou sem executá-lo.
