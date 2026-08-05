# Deploy estático

## Contrato de build

- Node: 20.19.4 (mínimo 20.9);
- instalação: `npm ci`;
- build: `npm run build`;
- saída: `out`;
- trailing slash: habilitado;
- imagens: locais e sem otimizador em runtime;
- variável obrigatória no host: `SITE_DEPLOY_ENV=preview` ou `production`.

Localmente, a ausência da variável assume `local`. `local` e `preview` produzem
`noindex, nofollow`; `production` permite indexação e rejeita domínio
demonstrativo.

Valide antes de publicar:

```bash
SITE_DEPLOY_ENV=preview npm run build
npm run validate:static
npm run preview
npm run test:e2e
```

## Netlify

1. Importe o repositório pela integração Git.
2. Configure build command como `npm run build`.
3. Configure publish directory como `out`.
4. Configure Node `20.19.4`.
5. Em deploy previews, use `SITE_DEPLOY_ENV=preview`.
6. Em produção, use `SITE_DEPLOY_ENV=production`.

Não configure rewrite SPA para `index.html`; o export possui HTML por rota e
404 real.

## Cloudflare Pages

1. Conecte o repositório ao Pages.
2. Use o preset de framework sem runtime, ou configuração manual.
3. Configure build command `npm run build` e output directory `out`.
4. Configure Node `20.19.4`.
5. Use `SITE_DEPLOY_ENV=preview` nos previews e `production` no ambiente final.

## Quando parar de usar export estático

Reavalie arquitetura, host, cache, segurança e custos antes de adicionar cookies,
headers por request, autenticação, segredo em runtime, Server Actions, banco,
revalidação, processamento seguro ou APIs privadas. Não contorne essas
necessidades em componentes visuais.
