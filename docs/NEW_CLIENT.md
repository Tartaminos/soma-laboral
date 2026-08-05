# Criar um novo site de cliente

## 1. Criar e preparar o repositório

1. No GitHub, use **Use this template**.
2. Crie um repositório independente, defina visibilidade, proprietário e branch
   principal.
3. Garanta que o cliente tenha propriedade ou acesso administrativo adequado.
4. Use Node 20.19.4 e execute `npm ci`.
5. Não crie outro lockfile e não use yarn, pnpm ou bun neste projeto.

O repositório é uma cópia pontual. Melhorias futuras do template não chegam
automaticamente.

## 2. Configurar na ordem correta

### Negócio e operação

Edite:

- `src/site/config/site-settings.ts`: site, idioma, locale, URL, preset e tema;
- `src/site/business/business.ts`: identidade, contato, endereço, horários e
  redes sociais.

Nome, telefone, email, endereço e URL possuem fonte única. Não os copie para
componentes ou módulos editoriais.

### Conteúdo

Edite os módulos em `src/site/content`. Preserve IDs ao reordenar coleções,
remova campos opcionais sem informação legítima e não insira HTML em strings.

Os dados presentes são fictícios e devem ser substituídos integralmente.

O portfólio demonstrativo está em `src/site/content/portfolio.ts`. Cada trabalho
precisa de ID e título não vazios, imagem local informativa com dimensões
corretas e alt text que descreva o conteúdo visual, em vez de repetir o título.
Categoria e descrição são editoriais; não criam filtros.
Quando a variante final for `featured`, configure
`featuredPortfolioItemId` com exatamente um ID existente; nenhum primeiro item
é escolhido automaticamente.

### Escolher o preset

Configure `presetId`:

| Preset | Ênfase | Composição inicial |
|---|---|---|
| `services` | proposta, serviços e confiança | hero, serviços, portfólio opcional, diferenciais, sobre, depoimentos e contato |
| `commerce` | vitrine institucional e localização | hero, produtos, diferenciais, sobre e contato |
| `professional` | pessoa, autoridade e atuação | hero, perfil, serviços, portfólio opcional, credenciais e contato |

Preset não define cores, fontes, logo ou conteúdo.

Para comparar os presets sem editar a configuração, execute `npm run dev` e use
o botão flutuante da home. Os destinos `/demo/services/`, `/demo/commerce/` e
`/demo/professional/` resolvem conteúdo e blueprint com o mesmo identificador e
permitem comparar a composição completa.

O conteúdo continua sendo o mesmo entre as três páginas: nome, contatos, marca
e textos pertencem ao cliente, não ao preset. Uma troca correta pode manter o
primeiro viewport semelhante enquanto altera seções posteriores. Confirme o
item atual do seletor e procure as seções exclusivas: serviços em `services`,
vitrine em `commerce` e perfil mais serviços em `professional`.

O seletor da home existe somente em desenvolvimento. As páginas demonstrativas
são exportadas para validação direta, mas usam `noindex, nofollow`, ficam fora
do sitemap e não repetem o JSON-LD do negócio.

### Diagnóstico da troca

A investigação desta funcionalidade confirmou que a alteração isolada de
`siteSettings.presetId` recompõe a home no servidor de desenvolvimento sem
reinício e sem manter uma definição obsoleta. Não foi encontrado defeito no
fluxo `siteSettings` → conteúdo → preset → página resolvida.

A semelhança observada era visual: o conteúdo do Estúdio Horizonte é
compartilhado e as mídias opcionais do hero e do perfil profissional não estão
configuradas. Nessas condições, as composições e variantes continuam corretas,
mas parte do primeiro viewport permanece parecida. Use as rotas de demonstração
e as seções exclusivas para verificar a troca, em vez de esperar outra marca ou
outros textos comerciais.

### Tema

Edite `src/site/theme/default-theme.ts`. Use os tokens semânticos existentes e
valide contraste de texto, ações, hover e foco. Não espalhe cores de marca pelos
CSS Modules.

### Assets

Siga [as convenções de assets](ASSETS.md). Substitua
`public/brand/brand-mark.svg`, remova assets não utilizados e registre referências
tipadas quando uma imagem for usada por conteúdo.

### Composição

A home está em `src/site/pages/home.ts`; seus dados são montados por
`src/site/pages/home-content.ts`. Para retirar uma seção, retire sua entrada da
lista final/blueprint aplicável ou forneça uma composição explícita completa.
Não crie flag booleana paralela.

Nos presets `services` e `professional`, `portfolio` ocupa uma posição opcional
depois de `services` e antes de `highlights`. Para removê-lo, retire o conteúdo e
o item de navegação `#portfolio` de forma coordenada. O componente compartilhado
não precisa ser alterado. O preset `commerce` não inclui essa posição.

Altere componentes compartilhados somente depois de esgotar esta ordem:

1. conteúdo;
2. tema;
3. composição;
4. variante existente;
5. variante reutilizável especificada;
6. nova seção reutilizável especificada;
7. código exclusivo em `src/custom`, somente quando necessário e documentado.

### SEO

Edite `src/site/seo/seo.ts` e os overrides da página. Antes da produção:

- use domínio canônico definitivo em `site-settings.ts`;
- selecione o tipo estruturado real;
- confira título, descrição, telefone, endereço, horários e logo;
- use `SITE_DEPLOY_ENV=production`;
- inspecione canonical, robots, sitemap e JSON-LD no preview.

Não invente rating, preço, coordenadas ou outros dados estruturados.

## 3. Validar

Execute separadamente:

```bash
npm run lint
npm run typecheck
npm test
SITE_DEPLOY_ENV=preview npm run build
npm run validate:static
npm run test:e2e
npm run preview
```

Nenhum comando deve ser declarado como aprovado sem ter sido executado.

Faça também a revisão manual descrita em
[`docs/ACCESSIBILITY_AUDIT.md`](ACCESSIBILITY_AUDIT.md).

## 4. Checklist antes do preview

- [ ] todos os nomes, textos, produtos, serviços e perfis fictícios foram trocados;
- [ ] telefone, email, endereço e horários estão corretos e não duplicados;
- [ ] links e destinos de âncora existem;
- [ ] IDs de coleções e seções são estáveis e únicos;
- [ ] logo, favicon, imagens, alt texts e documentos são do cliente;
- [ ] nenhum asset demonstrativo ou documento privado permanece em `public`;
- [ ] preset, tema e composição têm responsabilidades separadas;
- [ ] metadata e JSON-LD refletem o conteúdo real;
- [ ] telas de 320, 375, 768, 1024 e 1440 px foram verificadas;
- [ ] teclado, foco, zoom de 200% e movimento reduzido foram verificados;
- [ ] todos os comandos de validação passaram.

## 5. Publicar

Escolha Netlify ou Cloudflare Pages e registre a escolha na documentação do
cliente. Use [o guia de deploy](DEPLOYMENT.md), publique primeiro um preview com
`SITE_DEPLOY_ENV=preview` e só então configure produção e domínio.

O domínio e a conta de hospedagem devem pertencer ao cliente ou possuir acesso
compartilhado adequado. Não versione tokens ou arquivos `.env` reais.

## 6. Manter

Registre customizações, limitações, host escolhido e decisões que afetem o
cliente. Para aplicar melhorias futuras do template, use comparação de commits,
cherry-pick controlado ou PR específico; nunca prometa sincronização automática
nem faça merge indiscriminado sobre customizações.
