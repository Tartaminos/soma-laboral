# Business Site Template

Template estático e configurável para sites de negócios locais. Cada cliente recebe
um repositório independente criado com **Use this template**; não há multi-tenancy
nem sincronização automática com o template depois da criação.

## Stack e requisitos

- Next.js 16.2.12, React 19 e TypeScript estrito;
- App Router e Server Components por padrão;
- CSS Modules e CSS Custom Properties;
- Node 20.19.4 (mínimo suportado: 20.9) e npm;
- exportação estática para `out`.

Use o lockfile oficial:

```bash
npm ci
```

## Início rápido

```bash
npm run dev
npm run lint
npm run typecheck
npm test
SITE_DEPLOY_ENV=preview npm run build
npm run validate:static
npm run preview
npm run test:e2e
```

`SITE_DEPLOY_ENV` aceita `local`, `preview` ou `production`. A ausência assume
`local`; somente `production` permite indexação e exige que
`src/site/config/site-settings.ts` use o domínio definitivo.

Durante `npm run dev`, o botão flutuante da home abre o modo de demonstração.
Ele navega entre `/demo/services/`, `/demo/commerce/` e
`/demo/professional/`, cada qual uma página estática independente. O controle
não aparece na home de produção; as rotas demonstrativas permanecem
`noindex, nofollow` e fora do sitemap.

Os três destinos reutilizam o mesmo conteúdo fictício do cliente. Portanto,
nome, telefone, marca e textos compartilhados não mudam ao trocar o preset:
o que muda é a composição, a ordem e as variantes de apresentação.

## Arquitetura resumida

- `src/site`: configuração, conteúdo, tema, páginas e SEO concretos do cliente;
- `src/domain`: contratos independentes de React e Next.js;
- `src/components`: primitives de UI e layout;
- `src/sections`: seções compartilhadas, incluindo portfólio visual;
- `src/presets`: blueprints `services`, `commerce` e `professional`;
- `src/composition`: resolução, validação, catálogo e renderização;
- `src/app`: adaptação fina ao App Router;
- `public`: marca, imagens, ícones e documentos deliberadamente públicos.

Tema define identidade visual; preset define apresentação e ordem padrão. Seções
são habilitadas pela presença na lista ordenada, nunca por flags `show*`.

Os presets `services` e `professional` demonstram a seção opcional de
portfólio; `commerce` preserva somente sua vitrine de produtos. Os trabalhos
fictícios ficam em `src/site/content/portfolio.ts` e devem ser substituídos ou
removidos ao criar um cliente.

As referências normativas são [arquitetura](docs/ARCHITECTURE.md),
[guideline](docs/CODING_GUIDELINES.md) e
[specs aprovadas](docs/specs/README.md), nessa ordem.

## Criar um cliente

Siga [o guia operacional](docs/NEW_CLIENT.md). Ele cobre configuração do negócio,
conteúdo, presets, tema, assets, composição, SEO, validações, publicação e
manutenção.

## Testes e qualidade

- Vitest: validações, resolvers, tema, SEO, componentes e os três presets;
- Testing Library: comportamento acessível do menu;
- Playwright: export estático, navegação, mobile, 404 e erros de runtime;
- axe: verificação automatizada sem suppressions;
- GitHub Actions: npm reprodutível, lint, tipos, testes, build e E2E.

Consulte o [registro de acessibilidade](docs/ACCESSIBILITY_AUDIT.md).

## Deploy

O resultado é portátil entre hosts de arquivos estáticos. Consulte
[Netlify e Cloudflare Pages](docs/DEPLOYMENT.md). Nenhum token, domínio ou
credencial deve ser versionado.

## Evolução

Formulários, autenticação, banco, pagamentos, CMS, APIs e outras funcionalidades
dinâmicas não fazem parte desta versão. Uma necessidade real exige nova spec e
reavaliação da estratégia de runtime/deploy.
