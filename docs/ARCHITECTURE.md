# Arquitetura do Business Site Template

> Documento arquitetural oficial do repositório `business-site-template`.

## 1. Informações do documento

| Campo | Valor |
|---|---|
| Status | Aprovado |
| Versão | 0.1 |
| Data | 28 de julho de 2026 |
| Repositório | `Tartaminos/business-site-template` |
| Branch principal | `main` |
| Tipo de repositório | GitHub Template Repository |
| Responsabilidade | Definir os limites, princípios e decisões arquiteturais do projeto |

Este documento descreve a arquitetura pretendida para o repositório base.

Nem todas as estruturas descritas aqui já estão implementadas. As implementações deverão ser introduzidas progressivamente por meio de especificações técnicas individuais.

---

## 2. Contexto

O `business-site-template` é uma base reutilizável para criação de sites e aplicações web de negócios locais, incluindo:

- oficinas;
- restaurantes;
- mercados;
- lojas;
- clínicas;
- escritórios;
- prestadores de serviços;
- profissionais autônomos.

O repositório é configurado como um **Template Repository** do GitHub.

Quando um novo cliente for contratado, deverá ser criado um repositório independente por meio da opção **Use this template**.

Cada repositório de cliente será responsável por sua própria:

- identidade visual;
- configuração;
- publicação;
- evolução;
- integração;
- manutenção;
- infraestrutura.

Os clientes não serão separados por branches, tenants em runtime ou diretórios dentro de um monorepo.

---

## 3. Objetivos arquiteturais

A arquitetura deve permitir a criação rápida de sites visualmente distintos sem exigir a cópia ou alteração manual de dezenas de componentes.

A base deve separar claramente:

1. infraestrutura da aplicação;
2. contratos de domínio;
3. configuração do cliente;
4. conteúdo do negócio;
5. identidade visual;
6. componentes fundamentais;
7. seções de página;
8. composição das páginas;
9. presets visuais;
10. customizações específicas;
11. integrações externas.

A arquitetura também deve permitir que um site institucional simples evolua futuramente para funcionalidades como:

- formulários;
- agendamento;
- catálogo;
- solicitação de orçamento;
- área autenticada;
- painel administrativo;
- pedidos;
- pagamentos;
- consumo de APIs;
- integração com backend Java ou Ruby;
- persistência em banco de dados.

Essa possibilidade de evolução não autoriza a implementação antecipada dessas funcionalidades.

---

## 4. Princípios arquiteturais

### 4.1 Simplicidade antes de flexibilidade

A solução inicial deve atender aos casos reais conhecidos.

Não devem ser criadas abstrações para funcionalidades hipotéticas quando uma implementação simples e explícita for suficiente.

### 4.2 Configuração antes de duplicação

Diferenças entre clientes devem ser resolvidas prioritariamente por:

1. conteúdo;
2. configuração;
3. tema;
4. preset;
5. variante controlada;
6. composição de página.

Código específico deve ser utilizado apenas quando essas opções forem insuficientes.

### 4.3 Contratos explícitos

As estruturas de configuração, conteúdo, tema, preset e seções devem possuir contratos TypeScript explícitos.

Não devem ser utilizados objetos genéricos sem tipagem, propriedades arbitrárias ou estruturas baseadas em `any`.

### 4.4 Dependências direcionadas

As camadas compartilhadas não devem conhecer os dados concretos de um cliente.

O código reutilizável conhece contratos. O cliente fornece os valores desses contratos.

### 4.5 Renderização estática por padrão

Sites institucionais devem ser pré-renderizados sempre que possível.

Funcionalidades dinâmicas devem ser introduzidas apenas quando houver necessidade de runtime, autenticação, persistência ou processamento no servidor.

### 4.6 Server Components por padrão

Componentes do App Router devem permanecer como Server Components sempre que não houver necessidade de:

- estado no navegador;
- efeitos;
- event handlers;
- APIs exclusivas do browser;
- interatividade local.

Client Components devem ser utilizados de maneira localizada, e não como padrão global da aplicação.

### 4.7 Dependências externas mínimas

Uma nova biblioteca só deve ser adicionada quando:

- resolver um problema concreto;
- possuir benefício superior ao custo de manutenção;
- não duplicar uma capacidade simples da plataforma;
- estiver alinhada ao modelo de build e deploy.

### 4.8 Evolução incremental

As abstrações devem surgir a partir de repetição ou necessidade comprovada.

Não devem ser criados antecipadamente:

- sistemas de plugins;
- mecanismos de herança de presets;
- CMS;
- adapters sem implementação;
- engines de formulário;
- mecanismos de multi-tenancy;
- design system completo;
- frameworks internos.

---

## 5. Fora dos objetivos atuais

A arquitetura inicial não contempla:

- aplicação multi-tenant;
- seleção de cliente por domínio em runtime;
- monorepo contendo todos os clientes;
- branches para separar clientes;
- repositório separado para cada preset;
- CMS próprio;
- autenticação;
- banco de dados;
- painel administrativo;
- sistema de pagamentos;
- backend interno;
- microserviços;
- Kubernetes;
- AWS;
- VPS;
- sistema genérico de plugins;
- sincronização automática entre o template e os repositórios dos clientes.

Esses itens só poderão ser adicionados após uma necessidade concreta e uma nova decisão arquitetural.

---

## 6. Stack tecnológica

A stack principal do projeto é:

- Next.js;
- React;
- TypeScript;
- App Router;
- React Compiler;
- ESLint;
- CSS Modules;
- CSS Custom Properties;
- Node.js como ambiente de build;
- hospedagem inicial em plataforma gerenciada.

### 6.1 Decisões já estabelecidas

O projeto deve:

- utilizar TypeScript com modo estrito;
- utilizar o diretório `src`;
- utilizar App Router;
- priorizar CSS Modules;
- utilizar variáveis CSS para tokens visuais;
- evitar Tailwind;
- evitar JavaScript sem tipagem dentro de `src`;
- evitar bibliotecas de estado global sem necessidade;
- evitar bibliotecas de componentes completas sem necessidade;
- evitar código dependente de um provedor de hospedagem específico.

### 6.2 Gerenciamento de pacotes

O repositório deve manter um único gerenciador de pacotes oficial.

Não devem ser versionados lockfiles de gerenciadores diferentes no mesmo projeto.

O gerenciador escolhido deverá ser documentado no README e utilizado no pipeline de integração contínua.

---

## 7. Estratégia de renderização

A aplicação seguirá uma estratégia **static-first**, mas não **static-only**.

### 7.1 Estado inicial

Os primeiros projetos serão predominantemente:

- institucionais;
- públicos;
- indexáveis;
- orientados a conteúdo;
- sem autenticação;
- sem persistência;
- sem processamento obrigatório no servidor.

Essas páginas deverão ser pré-renderizadas durante o build.

### 7.2 Interatividade localizada

Funcionalidades como as seguintes podem utilizar Client Components isolados:

- menu mobile;
- carrossel;
- acordeão;
- filtros locais;
- controles de formulário;
- modais;
- elementos que dependam de APIs do navegador.

Uma seção inteira não deve ser transformada em Client Component quando apenas uma pequena parte dela precisa de interatividade.

### 7.3 Evolução para runtime

Quando uma funcionalidade exigir:

- autenticação;
- Server Actions;
- processamento seguro;
- acesso a banco;
- dados atualizados por requisição;
- APIs privadas;
- revalidação em runtime;

a estratégia de deploy deverá ser reavaliada.

A introdução de runtime não deve obrigar a reescrita das camadas de conteúdo, domínio, tema, seções ou composição.

---

## 8. Visão geral das camadas

A aplicação será organizada nas seguintes áreas conceituais:

| Camada | Responsabilidade |
|---|---|
| `app` | Integração com o Next.js e definição de rotas |
| `site` | Configuração e conteúdo do cliente |
| `domain` | Contratos e modelos independentes da interface |
| `components` | Componentes fundamentais de interface e layout |
| `sections` | Blocos de página com significado de negócio |
| `composition` | Montagem declarativa das páginas |
| `presets` | Blueprints de apresentação e composição |
| `styles` | Tokens e estilos globais |
| `integrations` | Integrações reais com serviços externos |
| `custom` | Implementações específicas do cliente |

---

## 9. Estrutura conceitual

A estrutura abaixo representa a direção arquitetural pretendida. Ela não deve ser criada integralmente antes de existir uma spec que justifique cada parte.

```text
src/
├── app/
│   ├── layout
│   ├── pages and routes
│   ├── metadata files
│   ├── error boundaries
│   └── loading states
│
├── site/
│   ├── config/
│   ├── business/
│   ├── content/
│   ├── pages/
│   ├── theme/
│   ├── seo/
│   └── integrations/
│
├── domain/
│   ├── business/
│   ├── content/
│   ├── navigation/
│   ├── pages/
│   ├── sections/
│   ├── theme/
│   └── seo/
│
├── components/
│   ├── ui/
│   └── layout/
│
├── sections/
│   ├── header/
│   ├── hero/
│   ├── services/
│   ├── about/
│   ├── call-to-action/
│   ├── contact/
│   └── footer/
│
├── composition/
│   ├── page-composer
│   ├── section-registry
│   └── resolvers
│
├── presets/
│   ├── services/
│   ├── commerce/
│   └── professional/
│
├── styles/
│   ├── reset
│   ├── tokens
│   ├── typography
│   └── globals
│
├── integrations/
│   └── providers added when required
│
└── custom/
    └── client-specific implementations

public/
├── brand/
├── images/
├── icons/
└── documents/
```

Os nomes finais dos arquivos serão definidos nas respectivas specs.

---

## 10. Regras de dependência

### 10.1 Fluxo principal

O fluxo de dependências deve seguir esta direção:

```text
app
├── site
└── composition

composition
├── presets
├── sections
└── domain

sections
├── components
└── domain

site
└── domain

components
└── estilos fundamentais
```

### 10.2 Dependências proibidas

Não devem ocorrer dependências nas seguintes direções:

- `components/ui` importando conteúdo do cliente;
- `components/ui` importando presets;
- `sections` importando diretamente a configuração global do cliente;
- `domain` importando componentes React;
- `domain` importando APIs do Next.js;
- `presets` contendo textos reais do negócio;
- `presets` importando configurações concretas do cliente;
- `site` conhecendo detalhes internos da implementação visual;
- uma seção importando outra seção para formar páginas;
- código compartilhado importando `custom`;
- integrações externas espalhadas dentro de componentes visuais.

### 10.3 Regra central

> Dependências devem apontar do código específico para o código genérico, nunca do código genérico para o cliente concreto.

---

## 11. Camada `app`

A camada `app` é o adaptador entre a arquitetura do projeto e o Next.js.

Ela é responsável por:

- rotas;
- layouts;
- metadata;
- arquivos especiais do App Router;
- páginas;
- estados de carregamento;
- estados de erro;
- integração com recursos do framework.

A camada `app` deve permanecer fina.

Uma página não deve montar manualmente todas as seções do site. Ela deve:

1. obter a definição da página;
2. obter o contexto do site;
3. delegar a renderização ao compositor;
4. fornecer metadata quando necessário.

Regras de negócio, conteúdo e decisões de preset não devem ficar dentro de arquivos de rota.

---

## 12. Camada `domain`

A camada `domain` contém contratos e modelos independentes da interface.

Exemplos de conceitos pertencentes ao domínio:

- negócio;
- endereço;
- contato;
- horário de funcionamento;
- rede social;
- serviço;
- produto;
- profissional;
- chamada para ação;
- item de navegação;
- referência de asset;
- metadata de página;
- definição de seção;
- definição de tema;
- definição de preset.

Essa camada não deve possuir:

- JSX;
- CSS;
- dependência do Next.js;
- acesso ao navegador;
- acesso a APIs externas;
- conteúdo concreto de um cliente.

O domínio deve ser simples e orientado aos dados que a aplicação realmente utiliza.

Não é necessário aplicar Domain-Driven Design completo para um site institucional.

---

## 13. Camada `site`

A camada `site` é o ponto principal de customização de cada repositório de cliente.

Ela deve reunir, de forma organizada:

- identidade do negócio;
- dados de contato;
- conteúdo;
- páginas;
- tema;
- preset selecionado;
- SEO;
- configurações de integrações;
- referências de assets.

### 13.1 Configuração central

Deve existir um ponto de entrada central para a configuração do site.

Esse ponto de entrada não deve conter todo o conteúdo em um único objeto gigante.

Sua responsabilidade é compor e expor módulos especializados, como:

- dados do negócio;
- tema;
- composição das páginas;
- SEO;
- integrações.

### 13.2 Fonte de verdade

A camada `site` deve ser a fonte de verdade para informações específicas do cliente.

Não devem existir versões duplicadas do mesmo telefone, endereço, nome comercial ou URL espalhadas em diferentes componentes.

### 13.3 Conteúdo em TypeScript

Inicialmente, configuração e conteúdo devem ser escritos em módulos TypeScript.

Essa decisão fornece:

- validação no build;
- autocomplete;
- refatoração segura;
- contratos explícitos;
- menor necessidade de validação em runtime;
- integração direta com o restante da aplicação.

JSON, MDX ou CMS poderão ser considerados posteriormente quando houver necessidade real de edição externa ou conteúdo editorial frequente.

### 13.4 Conteúdo sem marcação arbitrária

O conteúdo inicial deve privilegiar:

- strings;
- listas tipadas;
- objetos de domínio;
- referências de assets;
- chamadas para ação explícitas.

Não deve ser permitido HTML arbitrário em strings.

Conteúdo rico deve ser introduzido apenas quando houver um caso concreto e uma estratégia segura de renderização.

---

## 14. Componentes fundamentais

Os componentes fundamentais serão divididos entre interface e layout.

### 14.1 Componentes de interface

Exemplos:

- botão;
- link de ação;
- título;
- texto auxiliar;
- badge;
- ícone;
- imagem;
- card estrutural;
- divisor.

Esses componentes devem:

- possuir responsabilidade pequena;
- aceitar variantes limitadas;
- ser acessíveis;
- não conhecer regras do negócio;
- não acessar a configuração global;
- não conter conteúdo específico.

### 14.2 Componentes de layout

Exemplos:

- container;
- stack;
- cluster;
- grid;
- section wrapper;
- header shell;
- page shell.

Eles devem padronizar:

- largura máxima;
- espaçamento;
- alinhamento;
- comportamento responsivo;
- distribuição dos elementos.

### 14.3 Limite do design system

O projeto não terá inicialmente um design system completo.

Serão criados apenas os componentes necessários para manter consistência e evitar repetição relevante.

A criação de componentes sem uso concreto deve ser evitada.

---

## 15. Seções

Seções são blocos de página com significado para o negócio.

Exemplos:

- header;
- hero;
- lista de serviços;
- lista de produtos;
- sobre;
- diferenciais;
- equipe;
- depoimentos;
- localização;
- contato;
- chamada para ação;
- footer.

### 15.1 Responsabilidades

Cada seção deve:

- receber dados tipados;
- receber somente os dados necessários;
- utilizar componentes fundamentais;
- possuir estilos próprios por CSS Module;
- oferecer um conjunto controlado de variantes;
- funcionar de maneira independente da página;
- tratar estados de conteúdo opcionais previstos no contrato.

### 15.2 Restrições

Uma seção não deve:

- ler diretamente toda a configuração do site;
- decidir qual preset está ativo;
- importar conteúdo concreto do cliente;
- alterar globalmente o tema;
- conhecer a ordem das demais seções;
- realizar chamadas externas sem uma camada apropriada;
- possuir dezenas de propriedades booleanas independentes.

### 15.3 Variantes

Variantes devem representar diferenças visuais ou estruturais conhecidas.

Exemplos conceituais:

- hero centralizado;
- hero dividido;
- cards compactos;
- cards destacados;
- seção clara;
- seção de contraste.

As variantes devem ser:

- nomeadas;
- finitas;
- tipadas;
- documentadas;
- testáveis.

Não devem ser utilizados valores arbitrários que transformem cada seção em um construtor visual genérico.

---

## 16. Composição de páginas

A composição de uma página deve ser declarativa.

A definição da página será responsável por indicar:

- quais seções serão exibidas;
- a ordem das seções;
- o conteúdo associado;
- a variante utilizada;
- identificadores necessários para navegação;
- configurações específicas permitidas pela seção.

### 16.1 Habilitação de seções

A existência da seção na lista ordenada define se ela está habilitada.

Não devem ser criadas flags paralelas como:

- `showHero`;
- `showServices`;
- `showAbout`;
- `showTestimonials`;
- `showContact`.

Se uma seção não estiver na composição, ela não será renderizada.

### 16.2 Catálogo de seções

O compositor utilizará um catálogo explícito que associa cada tipo de seção ao componente responsável por sua renderização.

O catálogo deve ser fechado e tipado.

Tipos desconhecidos devem provocar erro de desenvolvimento ou build, e não serem silenciosamente ignorados.

### 16.3 Compositor

O compositor será responsável por:

1. receber a definição tipada da página;
2. resolver cada tipo de seção;
3. fornecer os dados correspondentes;
4. renderizar as seções na ordem definida;
5. preservar identificadores estáveis;
6. rejeitar combinações inválidas.

O compositor não será um page builder genérico.

Ele não deve permitir código arbitrário, componentes remotos ou estruturas sem contrato.

---

## 17. Presets visuais

O projeto terá inicialmente três presets:

- `services`;
- `commerce`;
- `professional`.

Os presets compartilharão a mesma infraestrutura, componentes e catálogo de seções.

### 17.1 Responsabilidade do preset

Um preset representa uma estratégia de apresentação.

Ele pode definir:

- composição padrão;
- ordem padrão das seções;
- variantes padrão;
- densidade visual;
- comportamento do hero;
- modelo de navegação;
- geometria dos cards;
- ritmo de espaçamento;
- alinhamentos;
- elementos decorativos.

### 17.2 O que não pertence ao preset

Um preset não deve definir:

- nome do negócio;
- telefone;
- endereço;
- textos comerciais;
- produtos reais;
- serviços reais;
- cores específicas da marca;
- logos;
- credenciais;
- IDs de analytics.

### 17.3 Preset não é tema

Preset e tema são conceitos diferentes.

| Tema | Preset |
|---|---|
| Identidade visual | Estratégia de apresentação |
| Cores | Composição |
| Tipografia da marca | Ordem das seções |
| Superfícies | Densidade visual |
| Contraste | Variantes padrão |
| Tokens visuais | Estrutura do hero |
| Logos e identidade | Modelo de navegação |

### 17.4 Sem herança complexa

Presets não devem utilizar uma engine de herança profunda.

Não devem existir inicialmente:

- presets pais e filhos;
- múltiplos níveis de override;
- merge profundo automático;
- regras complexas de precedência;
- callbacks dentro da configuração.

Uma pequena duplicação declarativa é preferível a uma linguagem interna difícil de prever.

### 17.5 Ordem de implementação

Os presets deverão ser implementados sequencialmente:

1. `services`;
2. `commerce`;
3. `professional`.

O primeiro preset será a implementação de referência.

O segundo e o terceiro validarão se as abstrações existentes são realmente reutilizáveis.

---

## 18. Sistema de tema

O tema representa a identidade visual do cliente.

Ele deverá ser aplicado principalmente por meio de CSS Custom Properties.

### 18.1 Tokens semânticos

Os tokens devem ser semânticos, e não baseados apenas na cor literal.

Exemplos conceituais:

- background principal;
- background alternativo;
- superfície;
- texto principal;
- texto secundário;
- borda;
- ação primária;
- ação primária em hover;
- texto sobre ação;
- estado de foco;
- estado de erro;
- estado de sucesso.

### 18.2 Categorias de tokens

O sistema poderá abranger:

- cores;
- tipografia;
- escala de espaçamento;
- raios;
- sombras;
- largura de conteúdo;
- transições;
- camadas;
- breakpoints documentados.

Nem todos esses grupos precisam ser configuráveis pelo cliente desde a primeira implementação.

### 18.3 Aplicação

O tema deverá ser resolvido em um ponto central e disponibilizado para a árvore da aplicação.

Componentes não devem importar diretamente um arquivo de tema específico do cliente.

### 18.4 Contraste

Combinações de cores devem atender aos requisitos mínimos de contraste.

O sistema não deve aceitar qualquer combinação sem validação manual ou automatizada apropriada.

### 18.5 Dark mode

Dark mode não faz parte do escopo inicial.

Ele só deverá ser introduzido quando existir necessidade real de produto ou identidade visual.

---

## 19. Estilos

A estratégia de estilos será:

- estilos globais mínimos;
- CSS Custom Properties para tokens;
- CSS Modules para componentes e seções;
- abordagem mobile-first;
- ausência de Tailwind;
- ausência de CSS-in-JS sem necessidade concreta.

### 19.1 Estilos globais

Os estilos globais devem conter apenas responsabilidades transversais, como:

- reset;
- box sizing;
- comportamento base do documento;
- tipografia global;
- tokens;
- foco;
- seleção;
- preferências de movimento;
- elementos HTML fundamentais.

### 19.2 CSS Modules

Cada componente ou seção deverá manter seus estilos próximos da implementação.

Classes globais de utilidade devem ser limitadas.

Não deverá ser criada uma cópia manual do modelo de utilitários do Tailwind em CSS global.

### 19.3 Responsividade

O comportamento responsivo deve ser responsabilidade dos componentes e layouts.

Não deve existir uma versão mobile completamente separada da árvore de componentes sem justificativa.

---

## 20. Imagens e assets

Assets estáticos do cliente devem ser organizados no diretório `public`.

Categorias iniciais:

- marca;
- imagens de conteúdo;
- ícones;
- documentos públicos.

### 20.1 Convenções

Cada asset deve possuir:

- nome descritivo;
- formato adequado;
- tamanho compatível com o uso;
- referência centralizada quando reutilizado;
- texto alternativo quando informativo.

### 20.2 Acessibilidade

Imagens informativas devem possuir texto alternativo significativo.

Imagens decorativas devem ser tratadas como decorativas e não repetir conteúdo já presente no texto.

### 20.3 Falhas

As seções devem prever comportamento adequado quando:

- uma imagem opcional não for informada;
- o caminho estiver incorreto;
- a proporção for diferente da esperada;
- o conteúdo textual existir sem imagem.

A página não deve depender visualmente de uma imagem opcional para permanecer compreensível.

### 20.4 Imagens remotas

Imagens remotas não serão utilizadas por padrão.

Quando forem necessárias, deverão existir:

- origem confiável;
- configuração explícita;
- política de segurança;
- estratégia de fallback;
- compatibilidade com o modelo de build.

---

## 21. SEO

SEO será tratado como uma responsabilidade transversal e centralizada.

### 21.1 Configuração global

A configuração global poderá definir:

- nome do site;
- título padrão;
- descrição padrão;
- URL canônica base;
- idioma;
- locale;
- imagem social padrão;
- informações do negócio.

### 21.2 Configuração por página

Cada página poderá sobrescrever de forma controlada:

- título;
- descrição;
- canonical;
- imagem social;
- indexação;
- dados estruturados aplicáveis.

### 21.3 Responsabilidades da camada de aplicação

A integração com a Metadata API do Next.js ficará na camada `app`.

Conteúdo de SEO não deve ser definido dentro dos componentes visuais.

### 21.4 Recursos previstos

Em etapas próprias, poderão ser adicionados:

- Open Graph;
- Twitter cards;
- sitemap;
- robots;
- favicons;
- manifest;
- dados estruturados;
- canonical;
- metadata por página.

### 21.5 Dados estruturados

Dados estruturados devem utilizar informações da camada de domínio e do negócio.

Não devem existir valores duplicados manualmente dentro do gerador de schema.

---

## 22. Navegação

A navegação será derivada da configuração das páginas e seções sempre que possível.

### 22.1 Regras

Itens de navegação devem possuir:

- rótulo;
- destino;
- identificador estável;
- indicação de link interno ou externo quando necessário.

### 22.2 Navegação por âncoras

Em sites de página única, seções navegáveis devem possuir IDs estáveis.

A remoção de uma seção deve remover ou invalidar explicitamente o item de navegação correspondente.

Links para seções inexistentes não devem ser renderizados.

### 22.3 Navegação multipágina

A arquitetura deve permitir páginas adicionais sem substituir os contratos fundamentais.

A escolha entre página única e múltiplas páginas pertence à composição do site, não ao preset isoladamente.

---

## 23. Customizações específicas

Cada cliente terá um repositório independente. Portanto, customizações específicas são permitidas.

Elas devem seguir esta ordem de preferência:

1. alterar conteúdo;
2. alterar tema;
3. alterar composição;
4. selecionar uma variante existente;
5. criar uma variante reutilizável;
6. criar uma nova seção reutilizável;
7. criar uma implementação específica em `custom`.

### 23.1 Diretório `custom`

O diretório `custom` será reservado para código que:

- atende apenas a um cliente;
- não pertence ao catálogo compartilhado;
- não deve contaminar componentes fundamentais;
- possui justificativa clara.

### 23.2 Restrições

Não devem ser adicionadas flags específicas de cliente aos componentes compartilhados.

Exemplos proibidos:

- `isRestaurantClient`;
- `useClientXLayout`;
- `showSpecialBannerForClientY`.

Se uma customização deixar de ser exclusiva e passar a atender casos recorrentes, ela poderá ser promovida para uma seção ou variante compartilhada.

---

## 24. Integrações

Integrações deverão ser adicionadas apenas quando existir um fornecedor ou caso de uso real.

Exemplos futuros:

- analytics;
- mapas;
- WhatsApp;
- envio de email;
- agenda;
- formulário externo;
- catálogo remoto;
- API Java;
- API Ruby;
- pagamentos.

### 24.1 Isolamento

Detalhes de SDK, endpoint e fornecedor devem ficar isolados da interface visual.

Componentes devem consumir contratos ou funções específicas da aplicação, e não chamar diretamente SDKs externos.

### 24.2 Configuração

Uma integração deverá ser explicitamente habilitada.

A ausência de configuração deve resultar em:

- integração desabilitada;
- fallback documentado; ou
- erro de build quando a integração for obrigatória.

### 24.3 Sem adapters vazios

Não serão criadas interfaces genéricas de providers antes da primeira implementação concreta.

A abstração deverá ser extraída quando houver evidência de mais de uma implementação ou necessidade clara de substituição.

---

## 25. Formulários

Formulários não pertencem ao núcleo inicial da arquitetura.

Quando introduzidos, deverão considerar separadamente:

- interface;
- validação no cliente;
- validação confiável no servidor;
- prevenção de spam;
- armazenamento;
- envio;
- privacidade;
- consentimento;
- estados de carregamento;
- estados de erro;
- acessibilidade.

Em build estritamente estático, o envio dependerá de:

- serviço externo;
- função da plataforma;
- API separada;
- backend Java ou Ruby.

Não deve ser criado um formulário visual que não tenha estratégia real de processamento.

---

## 26. Evolução para backend

Quando houver necessidade de backend, ele poderá ser implementado separadamente em Java ou Ruby.

### 26.1 Fronteira

O frontend deverá acessar o backend por uma camada dedicada de integração.

Chamadas à API não devem ser distribuídas diretamente entre componentes.

### 26.2 Independência

Os contratos visuais não devem depender de detalhes internos do backend.

O frontend deve conhecer:

- recursos;
- operações;
- formatos de entrada;
- formatos de saída;
- erros esperados.

Ele não deve conhecer:

- tabelas;
- entidades internas;
- detalhes de persistência;
- regras de infraestrutura do backend.

### 26.3 Mudança de deploy

A necessidade de backend não implica obrigatoriamente que o frontend precise abandonar a renderização estática.

Essa decisão dependerá do tipo de dado e da experiência esperada.

---

## 27. Acessibilidade

Acessibilidade é requisito de implementação, não uma etapa opcional no final do projeto.

Todas as specs de componentes e seções devem considerar:

- HTML semântico;
- navegação por teclado;
- foco visível;
- ordem de tabulação;
- rótulos;
- contraste;
- textos alternativos;
- headings hierárquicos;
- redução de movimento;
- zoom;
- leitores de tela;
- mensagens de erro compreensíveis.

### 27.1 Componentes interativos

Componentes interativos devem utilizar elementos HTML nativos sempre que possível.

Um elemento visualmente semelhante a botão deve ser um `button` quando executar uma ação.

Um elemento de navegação deve ser um link.

### 27.2 Conteúdo

A acessibilidade não pode depender apenas da implementação do componente.

A configuração do cliente também deve fornecer conteúdo adequado, como:

- textos alternativos;
- labels;
- títulos;
- descrições;
- nomes de links compreensíveis.

---

## 28. Responsividade

A aplicação deverá seguir abordagem mobile-first.

Deverá funcionar adequadamente em:

- celulares pequenos;
- celulares grandes;
- tablets;
- notebooks;
- monitores amplos.

### 28.1 Requisitos

Os componentes devem tolerar:

- nomes comerciais longos;
- textos maiores que o exemplo;
- listas com quantidades diferentes;
- títulos quebrando em múltiplas linhas;
- imagens em proporções diferentes;
- navegação com vários itens;
- aumento de fonte;
- orientação retrato e paisagem.

### 28.2 Breakpoints

Breakpoints devem ser limitados, consistentes e documentados.

Não devem ser criados breakpoints específicos para corrigir isoladamente cada componente.

---

## 29. Desempenho

A arquitetura deverá priorizar:

- pré-renderização;
- baixo volume de JavaScript no cliente;
- imagens adequadas;
- fontes controladas;
- ausência de dependências pesadas;
- carregamento progressivo;
- componentes de cliente localizados;
- CSS escopado;
- assets otimizados.

### 29.1 Orçamento técnico

Não será definido inicialmente um orçamento numérico rígido sem medições reais.

As specs futuras deverão impedir regressões evidentes, como:

- bibliotecas grandes para interações simples;
- imagens originais excessivamente pesadas;
- hidratação de seções totalmente estáticas;
- scripts de terceiros carregados sem necessidade;
- fontes com muitos pesos não utilizados.

### 29.2 Scripts externos

Scripts de analytics, mapas, widgets e atendimento devem ser tratados como custos de desempenho e privacidade.

Eles não devem ser inseridos globalmente apenas por conveniência.

---

## 30. Segurança e privacidade

Mesmo sites institucionais devem respeitar princípios básicos de segurança.

### 30.1 Segredos

Segredos não devem ser armazenados:

- no repositório;
- em arquivos públicos;
- em variáveis expostas ao navegador;
- em componentes React.

Variáveis públicas devem conter apenas dados que podem ser visualizados pelo usuário.

### 30.2 Conteúdo externo

Conteúdo externo deve ser tratado com origem e formato conhecidos.

HTML arbitrário não deve ser renderizado sem sanitização e necessidade explícita.

### 30.3 Links externos

Links externos abertos em nova aba devem utilizar as proteções apropriadas.

### 30.4 Dados pessoais

Formulários e analytics deverão considerar:

- finalidade;
- consentimento;
- retenção;
- compartilhamento;
- política de privacidade;
- legislação aplicável.

### 30.5 Dependências

Dependências devem ser mantidas em quantidade reduzida e atualizadas conscientemente.

Uma atualização de versão principal deve ser validada com lint, testes e build.

---

## 31. Estratégia de testes

A estratégia de testes deve buscar confiança, não quantidade artificial.

### 31.1 Validações obrigatórias

O pipeline deve executar, no mínimo:

- lint;
- verificação de tipos;
- testes automatizados aplicáveis;
- build de produção.

### 31.2 Testes unitários

Devem priorizar:

- resolução de configuração;
- resolução de preset;
- composição;
- validações;
- transformação de dados;
- fallbacks;
- regras sem dependência visual.

### 31.3 Testes de componentes

Devem priorizar:

- comportamento condicional relevante;
- interações;
- acessibilidade;
- estados vazios;
- estados de erro;
- variantes com lógica significativa.

Não é necessário criar testes que apenas confirmem que um texto estático foi renderizado.

### 31.4 Testes de integração

Devem validar a integração entre:

- configuração;
- composição;
- catálogo;
- seções;
- tema;
- metadata.

### 31.5 Testes end-to-end

Devem existir smoke tests para fluxos críticos, como:

- abertura da página principal;
- navegação;
- menu mobile;
- links principais;
- formulário quando existir;
- ausência de erros de runtime.

### 31.6 Validações manuais

Devem incluir:

- tamanhos de tela;
- teclado;
- foco;
- contraste;
- conteúdo longo;
- imagens ausentes;
- Lighthouse ou ferramenta equivalente;
- build e preview de produção.

### 31.7 Testes a evitar

Devem ser evitados:

- snapshots extensos e frágeis;
- testes de detalhes internos;
- testes duplicados;
- cobertura sem valor;
- testes que repetem a implementação.

---

## 32. Build e deploy

### 32.1 Estratégia inicial

A estratégia inicial será build estático quando todas as funcionalidades do cliente forem compatíveis.

O deploy deverá ocorrer em plataforma gerenciada, inicialmente:

- Netlify; ou
- Cloudflare Pages.

### 32.2 Neutralidade de provedor

O núcleo da aplicação não deve depender diretamente de APIs específicas do provedor.

Configurações específicas devem permanecer isoladas.

### 32.3 Ambiente

Cada integração deverá documentar:

- variáveis necessárias;
- quais variáveis são públicas;
- valores obrigatórios;
- comportamento quando ausentes.

### 32.4 Preview

Mudanças relevantes devem possuir preview de produção antes da publicação definitiva.

### 32.5 Domínio

O domínio deverá ser registrado em nome do cliente.

Credenciais de domínio e hospedagem não devem ficar vinculadas exclusivamente ao desenvolvedor.

### 32.6 Mudança para aplicação dinâmica

Quando o projeto deixar de ser estritamente estático, deverão ser reavaliados:

- provedor;
- runtime;
- cache;
- funções;
- logs;
- observabilidade;
- custos;
- segurança;
- disponibilidade.

---

## 33. Modelo de Template Repository

### 33.1 Criação de clientes

Cada novo cliente deverá ser criado por meio de **Use this template**.

O novo repositório será independente do repositório base.

### 33.2 Ausência de sincronização automática

O GitHub Template Repository copia o estado do template no momento da criação.

Melhorias futuras no template não serão automaticamente propagadas aos repositórios já criados.

Essa limitação deve ser assumida explicitamente.

### 33.3 Atualizações em clientes existentes

Atualizações compartilhadas poderão ser aplicadas por:

- implementação manual;
- cherry-pick controlado;
- comparação de commits;
- pull request específico;
- extração futura de pacote compartilhado.

Não deve ser criado agora um sistema complexo de sincronização.

### 33.4 Possível extração futura

A extração de componentes para um pacote compartilhado só deverá ser considerada quando:

- existirem vários clientes ativos;
- houver repetição comprovada de correções;
- o custo de sincronização manual for relevante;
- os componentes estiverem suficientemente estáveis;
- existir estratégia de versionamento.

Até esse momento, cada cliente permanecerá autônomo.

---

## 34. Processo de criação de um cliente

O fluxo esperado será:

1. criar um repositório por meio de **Use this template**;
2. definir nome e visibilidade do repositório;
3. instalar dependências;
4. substituir a configuração do negócio;
5. inserir conteúdo;
6. selecionar o preset;
7. configurar o tema;
8. adicionar assets;
9. configurar SEO;
10. habilitar integrações necessárias;
11. remover conteúdo demonstrativo;
12. executar lint;
13. executar verificação de tipos;
14. executar testes;
15. executar build;
16. validar acessibilidade e responsividade;
17. configurar deploy;
18. configurar domínio;
19. publicar;
20. documentar customizações específicas.

Esse processo será detalhado em documentação operacional após a arquitetura fundamental estar implementada.

---

## 35. Anti-patterns proibidos

A implementação não deve introduzir:

### 35.1 Flags de cliente

Não adicionar condicionais baseadas no nome ou tipo específico de um cliente dentro de componentes compartilhados.

### 35.2 Configuração monolítica

Não concentrar todo o site em um único arquivo com centenas ou milhares de linhas.

### 35.3 Componentes universais

Não criar componentes que tentem representar qualquer seção possível por meio de dezenas de propriedades opcionais.

### 35.4 Boolean explosion

Não controlar composição por dezenas de flags booleanas independentes.

### 35.5 Prop drilling da configuração completa

Não fornecer o objeto global do site para toda a árvore de componentes.

Cada componente deve receber apenas os dados necessários.

### 35.6 Acesso direto à configuração

Seções e componentes compartilhados não devem importar diretamente arquivos concretos de `site`.

### 35.7 Herança complexa de presets

Não criar múltiplos níveis de herança e merge profundo.

### 35.8 Abstrações antecipadas

Não criar providers, repositories, services ou adapters sem uma implementação real que os justifique.

### 35.9 Client Components globais

Não marcar layouts ou páginas inteiras como Client Components para resolver uma interação localizada.

### 35.10 Integrações espalhadas

Não chamar SDKs e APIs externas diretamente em vários componentes.

### 35.11 CSS global crescente

Não utilizar estilos globais como local padrão para qualquer novo componente.

### 35.12 Tipos genéricos permissivos

Não utilizar `any`, objetos livres ou casts para contornar contratos mal definidos.

---

## 36. Ordem arquitetural de implementação

A implementação deverá seguir, em linhas gerais, esta ordem:

1. configuração central tipada;
2. modelo de domínio e conteúdo;
3. sistema de tema;
4. componentes fundamentais de layout e interface;
5. convenções de imagens e assets;
6. catálogo inicial de seções;
7. compositor declarativo;
8. preset de serviços;
9. preset de comércio;
10. preset profissional;
11. SEO técnico;
12. estratégia de testes e integração contínua;
13. auditoria transversal de acessibilidade e responsividade;
14. build estático e deploy;
15. documentação de criação de cliente.

Analytics, formulários e outras integrações deverão ser especificados posteriormente, de acordo com necessidades concretas.

---

## 37. Primeira especificação

A primeira especificação técnica deverá ser:

> **Configuração central tipada do site e do negócio**

Essa spec deverá estabelecer:

- ponto de entrada da configuração;
- contratos fundamentais;
- separação entre configuração e conteúdo;
- dados básicos do negócio;
- idioma e locale;
- URL principal;
- identificação do preset;
- identificação do tema;
- contratos somente leitura;
- comportamento para valores inválidos;
- integração mínima com o layout do Next.js;
- convenções de importação;
- regras de dependência.

Ela não deverá implementar:

- seções;
- presets completos;
- componentes visuais;
- sistema completo de tema;
- SEO completo;
- analytics;
- formulários;
- CMS;
- integração remota;
- banco;
- autenticação.

---

## 38. Governança arquitetural

### 38.1 Responsabilidade deste documento

Este documento define a direção arquitetural principal do projeto.

Specs e implementações devem respeitar suas regras.

### 38.2 Alterações arquiteturais

Mudanças que afetem:

- direção de dependências;
- modelo de configuração;
- composição;
- presets;
- estratégia de renderização;
- estratégia de deploy;
- persistência;
- autenticação;
- integração com backend;
- compartilhamento entre clientes;

devem atualizar este documento.

### 38.3 Registros de decisão

Decisões arquiteturais relevantes e controversas poderão ser registradas futuramente em ADRs.

Não é necessário criar um ADR para decisões locais e reversíveis.

### 38.4 Specs

Cada funcionalidade deverá ser implementada a partir de uma spec objetiva, verificável e limitada em escopo.

A spec deverá indicar:

- contexto;
- objetivo;
- escopo;
- fora do escopo;
- requisitos;
- decisões arquiteturais;
- estrutura impactada;
- fluxo;
- critérios de aceite;
- cenários de erro;
- testes;
- definição de pronto;
- instruções para o Codex.

### 38.5 Divergências encontradas pelo Codex

Caso o Codex identifique uma ambiguidade ou necessidade não prevista, ele deverá:

1. evitar inventar uma nova arquitetura;
2. manter a implementação simples;
3. documentar a ambiguidade;
4. interromper mudanças fora do escopo;
5. solicitar decisão quando a divergência for arquiteturalmente relevante.

---

## 39. Decisões arquiteturais consolidadas

| ID | Decisão |
|---|---|
| ARQ-001 | Utilizar Next.js, React, TypeScript e App Router |
| ARQ-002 | Utilizar um repositório independente por cliente |
| ARQ-003 | Utilizar GitHub Template Repository para criação de clientes |
| ARQ-004 | Manter todos os presets na mesma base |
| ARQ-005 | Separar tema de preset |
| ARQ-006 | Utilizar composição declarativa de páginas |
| ARQ-007 | Utilizar lista ordenada de seções em vez de flags booleanas |
| ARQ-008 | Manter conteúdo e configuração inicialmente em TypeScript |
| ARQ-009 | Utilizar Server Components por padrão |
| ARQ-010 | Priorizar pré-renderização e build estático |
| ARQ-011 | Utilizar CSS Modules e CSS Custom Properties |
| ARQ-012 | Não utilizar Tailwind |
| ARQ-013 | Não criar CMS, autenticação ou banco sem necessidade |
| ARQ-014 | Não criar sistema de plugins antecipadamente |
| ARQ-015 | Isolar customizações específicas |
| ARQ-016 | Isolar integrações externas |
| ARQ-017 | Manter dependências externas mínimas |
| ARQ-018 | Implementar presets sequencialmente |
| ARQ-019 | Não sincronizar automaticamente repositórios de clientes inicialmente |
| ARQ-020 | Reavaliar runtime e hospedagem quando surgirem funcionalidades dinâmicas |

---

## 40. Critérios de conformidade arquitetural

Uma implementação está alinhada a esta arquitetura quando:

- conteúdo do cliente está separado dos componentes;
- componentes compartilhados não conhecem clientes concretos;
- páginas são compostas declarativamente;
- seções possuem contratos tipados;
- variantes são controladas;
- preset e tema possuem responsabilidades distintas;
- Server Components são utilizados por padrão;
- Client Components estão localizados;
- estilos globais são limitados;
- integrações estão isoladas;
- dependências foram justificadas;
- lint, tipos, testes e build passam;
- acessibilidade e responsividade foram consideradas;
- nenhuma funcionalidade futura foi implementada sem necessidade;
- alterações arquiteturais foram documentadas.

---

## 41. Glossário

### Cliente

Negócio ou profissional para o qual um repositório independente foi criado a partir do template.

### Configuração do site

Conjunto central de escolhas e referências que define o comportamento geral do site.

### Conteúdo

Dados editoriais e comerciais apresentados ao usuário.

### Domínio

Contratos que representam conceitos do negócio sem dependência visual.

### Tema

Identidade visual expressa por tokens, cores, tipografia e superfícies.

### Preset

Blueprint de apresentação que define composição, densidade e variantes padrão.

### Variante

Versão controlada de um componente ou seção.

### Seção

Bloco de página com significado de negócio.

### Composição

Lista declarativa e ordenada de seções que formam uma página.

### Catálogo de seções

Mapeamento tipado entre identificadores de seção e componentes responsáveis.

### Compositor

Mecanismo que transforma uma definição de página em uma árvore renderizável.

### Integração

Comunicação com um serviço, SDK, API ou backend externo.

### Customização específica

Código criado para atender uma necessidade exclusiva de um cliente.

### Template Repository

Repositório GitHub utilizado como base para criar novos repositórios independentes.

---

## 42. Estado de aprovação

Este documento foi revisado e aprovado para inclusão no repositório.

Após esta aprovação:

1. o documento passa a ser a referência arquitetural do projeto;
2. futuras specs deverão referenciar esta arquitetura;
3. divergências deverão ser registradas e avaliadas explicitamente;
4. alterações relevantes deverão atualizar este documento.
