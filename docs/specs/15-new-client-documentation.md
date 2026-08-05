# 1. Título

Documentação para criação de um novo cliente

**Status:** Aprovada para implementação

## 2. Contexto

Após a implementação técnica das specs anteriores, o valor do template depende de um processo repetível para criar um repositório de cliente, substituir conteúdo demonstrativo, validar a aplicação e publicar com responsabilidade. O README atual ainda é o padrão do `create-next-app` e não explica arquitetura, presets, tema, assets, SEO, testes ou deploy.

O GitHub Template Repository copia o estado do repositório no momento da criação e não sincroniza melhorias futuras automaticamente. Essa limitação precisa estar explícita.

## 3. Objetivo

Criar documentação operacional completa e prática para transformar o template em um repositório independente de cliente, cobrindo configuração, conteúdo, tema, composição, presets, assets, SEO, validação, deploy e manutenção sem exigir leitura do código inteiro.

## 4. Escopo

- Substituir o README demonstrativo por documentação oficial do template.
- Criar guia passo a passo de novo cliente.
- Documentar pré-requisitos e versões de Node e npm.
- Documentar uso de **Use this template**.
- Documentar estrutura relevante e pontos permitidos de customização.
- Documentar seleção e diferenças entre os três presets.
- Documentar configuração do negócio, conteúdo, tema, páginas, assets e SEO.
- Documentar comandos de desenvolvimento, lint, typecheck, testes, E2E, build e preview.
- Documentar deploy em Netlify e Cloudflare Pages por referência ao guia da spec 14.
- Criar checklist para remoção de conteúdo e assets demonstrativos.
- Criar checklist de acessibilidade, responsividade, SEO e publicação.
- Documentar customizações específicas e uso excepcional de `custom`.
- Documentar ausência de sincronização automática com o template.
- Documentar como registrar decisões e limitações do cliente.

## 5. Fora do escopo

- Automação que cria repositório, domínio ou conta no provedor.
- CLI geradora, scaffolding interativo ou wizard.
- Sincronização automática entre template e clientes.
- Pacote compartilhado, monorepo ou submodule.
- Treinamento completo de Next.js, React, TypeScript ou CSS.
- Documentação de funcionalidades futuras inexistentes.
- Credenciais, tokens, dados reais de cliente ou arquivos `.env` reais.
- Contrato comercial, SLA ou documentação jurídica.

## 6. Requisitos funcionais

- O README deve explicar objetivo do repositório, stack, arquitetura resumida, comandos e fluxo de implementação por specs.
- O guia de novo cliente deve iniciar pela criação via **Use this template**, nome, visibilidade e propriedade do repositório.
- O guia deve exigir instalação com npm e versão de Node alinhada à CI.
- Deve existir uma ordem operacional clara: negócio, conteúdo, preset, tema, assets, composição, SEO, validações, deploy, domínio e documentação final.
- Cada etapa deve indicar os módulos conceituais a editar e os que não devem ser alterados normalmente.
- A comparação de presets deve explicar apresentação e composição, sem associar cores ou identidade.
- O guia deve explicar que remover uma seção significa removê-la da lista ordenada, não criar flag booleana.
- Deve explicar que dados centrais não podem ser duplicados em componentes ou conteúdo.
- Deve indicar como substituir logos, imagens, ícones e documentos e como escrever alt text.
- Deve exigir URL canônica definitiva e política de indexação antes de produção.
- Deve listar todos os comandos de validação existentes e proibir afirmar sucesso sem executá-los.
- Deve incluir checklist de conteúdo demonstrativo residual, links quebrados, IDs, contato, horários, metadata e assets.
- Deve explicar como escolher Netlify ou Cloudflare Pages e registrar a escolha no repositório do cliente.
- Deve explicar que melhorias futuras do template não chegam automaticamente ao cliente e listar estratégias manuais permitidas.

## 7. Requisitos não funcionais

- Linguagem direta, técnica e orientada a tarefas.
- Estrutura navegável com títulos, listas e checklists curtos.
- Comandos e paths devem corresponder exatamente à implementação final.
- Não duplicar integralmente arquitetura ou guideline; resumir e apontar para documentos normativos.
- Não conter segredos, URLs privadas, exemplos com dados pessoais reais ou credenciais.
- Documentação deve continuar válida em repositórios independentes criados do template.
- Exemplos devem usar dados fictícios claramente identificados.
- Termos técnicos e nomes de módulos devem ser consistentes com as 14 specs anteriores.
- A documentação deve distinguir obrigatório, opcional e fora do escopo.

## 8. Decisões arquiteturais

- O README será a porta de entrada; detalhes operacionais ficarão em documento dedicado de criação de cliente e guias de deploy já definidos.
- A documentação seguirá a mesma precedência normativa do projeto e instruirá agentes a implementar uma spec por vez.
- Não haverá CLI de scaffolding na primeira versão. Editar módulos TypeScript é mais simples, transparente e alinhado ao número atual de clientes.
- A documentação não sugerirá editar componentes compartilhados para alterar marca ou conteúdo. A ordem será conteúdo, tema, composição, variante, nova seção reutilizável e, por último, `custom`.
- O diretório `custom` será documentado como exceção para código exclusivo, com justificativa e isolamento. Não deve ser criado ou populado preventivamente.
- Atualizações de clientes existentes poderão usar comparação de commits, cherry-pick controlado ou PR específico; não será prometida compatibilidade automática.
- Domínio e contas de hospedagem devem pertencer ao cliente ou possuir acesso compartilhado adequado, conforme a arquitetura.
- Funcionalidade futura exige nova spec antes de implementação, mesmo dentro de repositório de cliente quando alterar arquitetura ou integração.

## 9. Estrutura impactada

- `README.md`: visão geral e início rápido oficial.
- Guia operacional em `docs`, com nome coerente e estável.
- Guia de deploy ou links internos para documentação criada pela spec 14.
- Checklist de novo cliente e publicação.
- Documentação de customizações e atualização manual.
- Referências cruzadas a `AGENTS.md`, arquitetura, guideline e `docs/specs/README.md`.

Nenhum código-fonte, dependência ou configuração funcional deve ser alterado apenas para facilitar a escrita desta documentação, salvo correção documental de comandos realmente existentes.

## 10. Fluxo esperado

### Desenvolvedor que cria um cliente

1. Usa **Use this template** e cria repositório independente.
2. Confirma propriedade, visibilidade e branch principal.
3. Instala versão correta de Node e executa `npm ci`.
4. Atualiza configuração do negócio e conteúdo.
5. Seleciona preset e configura tema.
6. Adiciona assets e ajusta composição.
7. Configura SEO, URL e ambiente.
8. Executa lint, typecheck, testes, E2E, build e preview.
9. Audita acessibilidade e responsividade.
10. Configura host e domínio.
11. Remove conteúdo demonstrativo e documenta customizações.
12. Publica após validar preview.

### Aplicação durante build e deploy

1. Consome os módulos do cliente.
2. Gera saída estática validada.
3. É publicada no host escolhido conforme documentação.

### Cliente ou mantenedor futuro

1. Encontra no README os comandos e documentos relevantes.
2. Entende onde alterar conteúdo e onde não acoplar dados concretos.
3. Sabe que atualizações do template exigem aplicação manual controlada.

## 11. Critérios de aceite

- Dado um desenvolvedor sem contexto prévio, quando segue o guia, então identifica todos os módulos que precisa configurar sem editar componentes compartilhados por padrão.
- Dado que escolhe um preset, quando consulta a comparação, então entende diferenças de composição sem confundir preset com tema.
- Dado que remove uma seção, quando segue a documentação, então altera a lista ordenada e não cria flag booleana.
- Dado que prepara produção, quando usa o checklist, então valida URL canônica, indexação, contato, assets, testes, build, preview e domínio.
- Dado que consulta os comandos, então todos existem no `package.json` e possuem finalidade correta.
- Dado que o README é revisado, então não mantém instruções de `create-next-app`, múltiplos gerenciadores ou promoção exclusiva de Vercel.
- Dado que um repositório cliente foi criado, então a documentação informa claramente que não haverá sincronização automática.
- Dado que os arquivos documentais são pesquisados, então não contêm segredos ou dados reais de cliente.

## 12. Cenários de erro e borda

- Guia aponta para path renomeado ou script inexistente.
- Desenvolvedor usa yarn, pnpm ou bun e cria lockfile adicional.
- Conteúdo demonstrativo permanece em metadata ou JSON-LD.
- Preset é alterado para resolver cor ou logo.
- Componente compartilhado recebe nome específico de cliente.
- Produção usa URL temporária ou permanece `noindex`.
- Preview é publicado como produção.
- Domínio fica registrado apenas em conta pessoal do desenvolvedor.
- Atualização do template é aplicada por merge indiscriminado e quebra customizações.
- `custom` vira local padrão de toda alteração.
- Documentação promete formulário, compra ou agenda inexistente.

## 13. Estratégia de testes

- Validar manualmente todos os links internos da documentação.
- Conferir scripts documentados contra `package.json`.
- Executar o guia em um repositório temporário criado por **Use this template** quando possível.
- Realizar ao menos um dry run completo de configuração fictícia até o preview estático.
- Revisar exemplos para garantir que são fictícios e não contêm segredos.
- Usar lint de Markdown somente se já existir ou for justificado por necessidade concreta; não adicionar ferramenta apenas por esta spec.
- Verificar legibilidade, ordem e ausência de contradição com arquitetura, guideline e specs.

## 14. Definição de pronto

- README oficial substitui integralmente o conteúdo demonstrativo.
- Guia de criação de cliente completo e coerente com a implementação.
- Comparação de presets, customizações, atualização manual e deploy documentados.
- Todos os comandos e paths conferidos.
- Checklists de preparação e publicação incluídos.
- Ausência de sincronização automática explicitada.
- Dry run executado ou limitação registrada.
- Nenhum código, dependência, arquitetura ou guideline alterado por esta tarefa documental.
- Links internos revisados e documentação sem dados sensíveis.

## 15. Instruções para o Codex

- Ler `AGENTS.md`, arquitetura, guideline e specs 01–14 implementadas.
- Inspecionar a implementação final antes de documentar paths, contratos ou comandos.
- Substituir o README demonstrativo e criar documentação operacional, sem escrever tutorial genérico da stack.
- Não criar CLI, gerador, automação de repositório ou sincronização automática.
- Não alterar código-fonte ou dependências para adequá-los à documentação sem spec própria.
- Não atualizar pacotes.
- Preservar a precedência normativa e instruir implementação de uma spec por vez.
- Usar somente dados fictícios e não versionar segredos.
- Conferir todos os comandos, links e paths.
- Executar dry run quando o ambiente permitir e informar o que não foi validado.
- Revisar o diff completo.
- Não afirmar que um comando, build ou deploy passou sem executá-lo.
