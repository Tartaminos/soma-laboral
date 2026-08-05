# 1. Título

Build estático e configuração de deploy

**Status:** Aprovada para implementação

## 2. Contexto

A primeira versão do template é pública, institucional e sem runtime obrigatório. A arquitetura exige abordagem static-first e hospedagem inicial em plataforma gerenciada, preferencialmente Netlify ou Cloudflare Pages. O projeto atual ainda usa configuração padrão do Next.js e não garante que imagens, metadata, testes E2E e rotas sejam compatíveis com exportação estática.

## 3. Objetivo

Habilitar uma saída estática portátil e reproduzível, validada em CI e preparada para deploy em Netlify ou Cloudflare Pages, sem acoplamento a APIs de provedor e com critérios claros para interromper a estratégia quando uma funcionalidade exigir runtime.

## 4. Escopo

- Configurar Next.js com `output: "export"` após confirmar suporte na documentação instalada.
- Definir convenção de trailing slash adequada à hospedagem estática e alinhá-la a canonical e sitemap.
- Configurar imagens locais para não depender do otimizador de imagem em runtime.
- Definir diretório de saída `out` como artifact de deploy.
- Fixar e documentar versão de Node compatível com Next.js 16, igual à utilizada na CI.
- Criar comando de preview estático local sem dependência externa desnecessária.
- Atualizar Playwright para testar a saída exportada.
- Validar rotas, assets, metadata files e links na saída estática.
- Documentar configuração de build e publicação para Netlify e Cloudflare Pages.
- Definir o contrato da variável de build não secreta `SITE_DEPLOY_ENV`.
- Definir checklist de incompatibilidades com exportação estática.
- Documentar reavaliação obrigatória antes de introduzir runtime.

## 5. Fora do escopo

- AWS, VPS, Kubernetes, Docker de produção ou servidor Next.js próprio.
- Funções serverless, Edge Functions, middleware/proxy, Server Actions ou Route Handlers dinâmicos.
- Autenticação, banco, backend, ISR ou revalidação em runtime.
- Deploy automático com tokens versionados.
- Configuração de DNS ou compra de domínio.
- CDN de imagens, loader remoto ou otimização em runtime.
- Observabilidade, logs de servidor ou alta disponibilidade.
- Sincronização de deploy entre repositórios de clientes.

## 6. Requisitos funcionais

- `npm run build` deve gerar uma pasta `out` completa e publicável.
- O build deve falhar quando uma rota ou API incompatível com static export for introduzida.
- A convenção inicial deve usar trailing slash de forma consistente para produzir diretórios com `index.html`; canonical, sitemap e links internos devem usar a mesma política.
- Imagens locais devem continuar usando contratos e componente aprovados, mas a configuração global deve evitar dependência do Image Optimization API em runtime, preferencialmente por `images.unoptimized` para neutralidade de provedor.
- Deve existir comando de preview que sirva `out` localmente com fallback compatível apenas com arquivos realmente exportados, sem reescrever toda rota para uma SPA única.
- Playwright deve executar contra o preview da saída `out`, não contra `next start` após habilitar exportação.
- O processo deve validar home, rotas adicionais, âncoras, assets, robots, sitemap, ícones e página 404 quando aplicável.
- A documentação de Netlify e Cloudflare Pages deve indicar comando de build, diretório de publicação, versão de Node e variáveis necessárias.
- `SITE_DEPLOY_ENV` deve aceitar somente `local`, `preview` ou `production`.
- Quando ausente em desenvolvimento local, `SITE_DEPLOY_ENV` pode assumir `local` de forma explícita e documentada.
- Deploys gerenciados devem configurar `SITE_DEPLOY_ENV`; valor inválido deve falhar o build.
- `local` e `preview` devem produzir política `noindex, nofollow`; `production` deve permitir indexação conforme a spec 11.
- `production` deve exigir URL canônica definitiva e rejeitar domínio demonstrativo ou vazio.
- `SITE_DEPLOY_ENV` não deve usar prefixo `NEXT_PUBLIC_`, pois é uma decisão de build e não precisa ser exposta ao cliente.
- Nenhuma variável de ambiente deve ser obrigatória para o conteúdo público inicial além da identificação de ambiente de deploy.
- O deploy não deve incluir arquivos fonte, segredos ou artifacts de teste desnecessários.

## 7. Requisitos não funcionais

- Portabilidade entre hosts de arquivos estáticos.
- Reprodutibilidade com `npm ci` e lockfile oficial.
- Node 20 LTS em versão igual ou superior a 20.9, alinhado à CI e documentado no projeto.
- Nenhuma dependência de produção nova.
- Sem segredos no repositório, `public`, bundle ou variável `NEXT_PUBLIC_*`.
- Build determinístico, sem acesso obrigatório à rede externa além da instalação de dependências.
- URLs internas e assets devem funcionar em navegação direta e refresh.
- Saída deve preservar acessibilidade e SEO verificados nas specs anteriores.
- Configuração específica de provedor, quando inevitável, deve ficar isolada.

## 8. Decisões arquiteturais

- O template inicial adotará exportação estática completa. Static-first continua não significando static-only: uma necessidade futura pode exigir nova estratégia.
- `output: "export"` e a política de imagens pertencem a `next.config.ts` e devem ser verificadas na documentação local do Next.js 16.2.12.
- Será adotado `trailingSlash: true` para produzir estrutura de diretórios previsível em hosts estáticos. SEO e navegação devem seguir essa decisão.
- `images.unoptimized` será preferido a loader específico de provedor, pois os assets iniciais são locais e já devem ser otimizados antes do commit.
- O preview local será servido por script Node pequeno e dedicado, ou capacidade equivalente já existente, sem instalar pacote apenas para servir arquivos. O script não deve virar servidor de produção.
- `SITE_DEPLOY_ENV` será a única convenção inicial de ambiente de deploy. Não criar abstração genérica de environment provider nem ler variáveis específicas de Netlify ou Cloudflare no núcleo.
- O default seguro será `local`, que não indexa. Produção só será ativada por valor explícito e URL definitiva.
- Deploy de produção será feito pela integração Git do host ou processo manual do cliente. Esta spec não adiciona credenciais nem workflow de deploy acoplado.
- Netlify e Cloudflare Pages serão documentados como opções equivalentes para `out`. O repositório de cada cliente deverá escolher e registrar um deles.
- Recursos que dependem de request, cookies, headers, revalidação, segredo em runtime ou processamento seguro são incompatíveis e exigem nova decisão arquitetural.
- Uma futura mudança para runtime não deve reescrever domínio, conteúdo, tema, seções ou composição; deve substituir a fronteira de deploy e integrações necessárias.

## 9. Estrutura impactada

- `next.config.ts`: exportação, trailing slash e imagens.
- `package.json`: scripts de preview e validação estática, sem dependência de produção.
- Arquivo de versão do Node e campo `engines` quando adotado.
- Script local para servir `out`.
- Configuração Playwright e workflow CI.
- Documentação de deploy para Netlify e Cloudflare Pages.
- Resolver ou validação de `SITE_DEPLOY_ENV` consumido pelo SEO no build.
- `.gitignore`: garantir que `out` e artifacts locais não sejam versionados, salvo decisão explícita contrária.

## 10. Fluxo esperado

### Desenvolvedor que configura um cliente

1. Define URL canônica e mantém `SITE_DEPLOY_ENV=local` no uso local.
2. Executa `npm ci` e todas as validações.
3. Executa o build e confirma geração de `out`.
4. Serve a saída com o comando de preview.
5. Valida navegação direta, refresh, assets e SEO.
6. Configura Netlify ou Cloudflare Pages com `SITE_DEPLOY_ENV=preview` para previews e `production` para o deploy final.
7. Publica preview antes da produção.

### Aplicação durante build

1. Resolve e valida `SITE_DEPLOY_ENV`.
2. Next.js pré-renderiza páginas e metadata.
3. Gera arquivos estáticos sob `out` com trailing slash consistente.
4. Copia assets públicos e imagens sem exigir otimizador em runtime.
5. Valida incompatibilidades e falha quando encontra recurso não exportável.
6. CI executa Playwright contra a saída estática.

### Usuário final

1. Recebe arquivos por CDN estática do provedor.
2. Navega e recarrega rotas válidas sem erro.
3. Recebe assets, metadata e conteúdo sem depender de servidor Next.js.

## 11. Critérios de aceite

- Dado o projeto completo, quando `npm run build` é executado, então `out` é gerado sem erro e contém a home.
- Dado uma rota estática adicional, quando seu URL com trailing slash é acessado diretamente no preview, então retorna o HTML correto.
- Dado o uso de imagens locais, quando a saída é servida sem servidor Next.js, então todas carregam e não fazem requisição ao endpoint de otimização.
- Dado o Playwright, quando E2E é executado após static export, então usa o preview de `out` e não `next start`.
- Dado `SITE_DEPLOY_ENV=preview` ou `local`, quando metadata é inspecionada, então aplica `noindex, nofollow`.
- Dado `SITE_DEPLOY_ENV=production` e URL definitiva, quando metadata é inspecionada, então permite indexação e canonical usa o domínio configurado.
- Dado `SITE_DEPLOY_ENV` inválido, quando o build executa, então falha com os valores aceitos.
- Dado produção com URL demonstrativa ou ausente, quando o build executa, então falha antes do deploy.
- Dado configuração de Netlify ou Cloudflare Pages, quando build command e publish directory são usados, então o site é publicado a partir de `out`.
- Dado uma API incompatível com exportação, quando o build é executado, então falha e a implementação não aplica workaround visual.
- Dado o repositório revisado, então não existem tokens, credenciais ou arquivos `.env` reais versionados.

## 12. Cenários de erro e borda

- `next start` usado com `output: "export"`.
- Reescrita SPA envia `index.html` para rotas inexistentes e mascara 404.
- Canonical sem trailing slash enquanto a URL pública usa slash.
- Imagem depende do otimizador em runtime.
- Route Handler usa request ou dado dinâmico.
- Uso de cookies, headers, Server Actions ou revalidação.
- `SITE_DEPLOY_ENV` ausente no host e deploy final permanece `noindex`.
- Preview configurado incorretamente como `production`.
- Produção criada com domínio provisório.
- Asset usa caminho absoluto incompatível com base path futuro.
- Node abaixo de 20.9 no host.
- `out` versionado por engano.
- Host configurado com diretório de publicação incorreto.

## 13. Estratégia de testes

- Testes unitários devem cobrir `local`, `preview`, `production`, valor inválido e URL obrigatória em produção.
- Testes de integração devem validar canonical, sitemap, robots, indexação e trailing slash consistentes para cada ambiente.
- E2E deve executar contra `out` e cobrir home, rotas, 404, assets, navegação e metadata essencial.
- CI deve executar build estático em runner limpo, ao menos com ambiente `preview`, e possuir cenário de validação de produção com URL fictícia válida reservada a testes.
- Validação manual deve publicar preview em ao menos um dos provedores suportados e testar refresh e rotas diretas.
- O segundo provedor pode ser validado pela configuração documentada e por projeto de teste quando necessário, sem exigir dois deploys em toda mudança.
- Falhas de ambiente devem ser relatadas, não substituídas por afirmação de sucesso.

## 14. Definição de pronto

- `output: "export"`, trailing slash e imagens configurados.
- Node compatível fixado e alinhado à CI.
- Contrato `SITE_DEPLOY_ENV` implementado e documentado.
- `out` gerado e ignorado pelo Git.
- Preview estático local disponível sem dependência desnecessária.
- Playwright executando contra a saída exportada.
- SEO, assets, rotas e 404 validados nos ambientes relevantes.
- Guias de Netlify e Cloudflare Pages completos.
- Preview e produção distinguem indexação corretamente.
- Nenhum runtime, segredo ou dependência de provedor introduzido.
- Lint, typecheck, testes, E2E e build executados com sucesso.
- Preview de produção validado antes de publicação final.

## 15. Instruções para o Codex

- Ler `AGENTS.md`, arquitetura, guideline e specs 01–13 implementadas.
- Consultar obrigatoriamente a documentação local de static export, imagens e deploy do Next.js 16.2.12.
- Implementar exportação estática, `SITE_DEPLOY_ENV`, preview, testes e documentação de deploy.
- Não adicionar servidor de produção, Docker, AWS, VPS, funções ou credenciais.
- Não ler variáveis específicas de provedor no núcleo nem expor `SITE_DEPLOY_ENV` como `NEXT_PUBLIC_*`.
- Não instalar pacote só para servir `out` se um script Node pequeno resolver.
- Não atualizar dependências fora do escopo.
- Preservar TypeScript estrito, Server Components, SEO, acessibilidade e CSS Modules.
- Atualizar Playwright para testar a saída estática.
- Executar lint, typecheck, testes, E2E e build em ambiente limpo.
- Validar preview real em plataforma gerenciada quando o acesso estiver disponível.
- Revisar o diff e informar ambiguidades e validações não executadas.
- Não afirmar que build ou deploy passou sem execução real.
