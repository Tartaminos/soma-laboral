# 1. Título

Preset de serviços

**Status:** Aprovada para implementação

## 2. Contexto

Negócios orientados a serviços, como oficinas, clínicas, escritórios e prestadores, precisam destacar proposta de valor, serviços, diferenciais, confiança e contato. O preset de serviços será a implementação de referência para validar os contratos de tema, seções e composição antes dos demais presets.

Ele deve fornecer defaults de apresentação sem incluir textos, cores, logos ou dados de um cliente concreto.

## 3. Objetivo

Criar o preset declarativo `services` com blueprint padrão de página, variantes e densidade coerentes para negócios de serviços, reutilizando integralmente a infraestrutura existente e permitindo overrides explícitos pela camada `site`.

## 4. Escopo

- Implementar a definição tipada do preset `services`.
- Definir blueprint padrão da página inicial.
- Definir ordem, IDs semânticos e variantes padrão das seções.
- Definir defaults de navegação derivados das seções navegáveis.
- Definir densidade e ritmo de apresentação por opções declarativas já suportadas.
- Integrar o preset ao resolver da spec 07.
- Fornecer conteúdo demonstrativo somente na camada `site`, quando necessário para visualizar o preset.
- Documentar quais conteúdos são obrigatórios, opcionais e omitíveis.
- Validar que o preset não contém identidade visual nem dados concretos.

## 5. Fora do escopo

- Novo catálogo de seções ou componentes específicos do preset.
- Tema próprio do preset.
- Textos reais, telefone, endereço, imagens, logo ou serviços concretos.
- Formulário, agendamento, orçamento, WhatsApp automatizado ou mapa incorporado.
- Páginas de detalhe de serviço.
- SEO completo.
- Herança entre presets, merge profundo ou engine de layouts.
- Customizações exclusivas de clientes.

## 6. Requisitos funcionais

- O preset deve possuir identificador exato `services`.
- O blueprint padrão da home deve usar, nesta ordem: `site-header`, `hero`, `services`, `highlights`, `about`, `testimonials`, `contact`, `call-to-action` e `site-footer`.
- `hero` deve usar a variante `split` por padrão, mantendo imagem opcional.
- `services` deve usar variante `featured` quando houver serviço prioritário explicitamente configurado; caso contrário, usar `grid` de forma determinística.
- `highlights` deve usar variante `cards`.
- `about` deve usar variante `media` quando houver imagem e `text` quando não houver, sem inventar asset.
- `testimonials` deve usar variante `featured` somente quando houver depoimento marcado como principal; caso contrário, `grid`.
- `contact` deve usar variante `split`.
- `call-to-action` deve usar variante `banner`.
- `site-header` e `site-footer` devem usar suas variantes `standard`.
- O preset deve declarar seções obrigatórias e opcionais sem usar flags independentes na configuração central.
- A ausência de conteúdo obrigatório deve gerar erro claro na resolução; uma seção opcional sem conteúdo deve ser omitida de forma explícita pela composição final.
- Overrides de ordem, presença e variante definidos em `site/pages` devem prevalecer conforme a spec 07.

## 7. Requisitos não funcionais

- Preset completamente declarativo e somente leitura.
- Nenhum import de conteúdo concreto, tema, asset ou configuração de cliente.
- Nenhum JSX, callback de renderização ou componente React dentro da definição.
- Compatibilidade com build estático e Server Components.
- Nenhuma dependência nova.
- Navegação, headings e ordem de leitura coerentes.
- Layout deve continuar responsivo com poucos ou muitos serviços.
- Defaults devem funcionar para conteúdo longo e ausência de imagens opcionais.
- O preset não deve aumentar JavaScript no cliente.

## 8. Decisões arquiteturais

- `services` será o preset de referência e deverá usar apenas contratos já justificados pelas specs 01–07.
- O preset define defaults, não a página final imutável. A camada `site` pode fornecer composição explícita sem alterar o preset.
- Não criar componentes `ServicesPresetHero` ou similares. As diferenças devem ser expressas pelas variantes já suportadas.
- Regras condicionais simples, como escolher variante com base na presença de conteúdo previsto, devem ficar em resolver puro e testável, não dentro do componente.
- O preset não pode decidir cores, fontes, logo ou imagens. Essas responsabilidades permanecem no tema e no conteúdo.
- Se a implementação revelar necessidade de nova variante, ela deve ser justificada no catálogo antes de ser usada, não criada localmente dentro do preset.
- O blueprint será uma lista ordenada e fechada; não haverá herança ou composição automática de presets.
- Uma pequena duplicação declarativa futura entre presets é preferível a abstração prematura.

## 9. Estrutura impactada

- `src/presets/services`: definição, blueprint e defaults.
- Contrato público de preset já previsto em `domain` ou `composition`.
- Resolver de preset da spec 07.
- Conteúdo demonstrativo de serviços na camada `site`, sem misturá-lo ao preset.
- Testes do preset quando a infraestrutura estiver disponível.

## 10. Fluxo esperado

### Desenvolvedor que configura um cliente

1. Seleciona `services` na configuração central.
2. Preenche identidade e conteúdo em `site`.
3. Usa o blueprint padrão ou cria composição explícita para alterar ordem e presença.
4. Ajusta variante apenas quando o default não atende.
5. Executa validações e corrige conteúdo obrigatório ausente.

### Aplicação durante build ou runtime

1. O resolver encontra o preset `services`.
2. Usa a composição explícita do cliente ou o blueprint padrão.
3. Resolve variantes condicionais previstas com base em conteúdo tipado.
4. Valida IDs, conteúdo e navegação.
5. O compositor renderiza as seções compartilhadas.

### Usuário final

1. Encontra proposta de valor e serviços no início da página.
2. Visualiza diferenciais, prova social e contato em ordem lógica.
3. Usa navegação e ações sem depender de funcionalidade não implementada.

## 11. Critérios de aceite

- Dado que `services` está selecionado e não existe override, quando a home é resolvida, então as nove seções aparecem na ordem definida nesta spec.
- Dado que o cliente fornece composição explícita, quando a página é resolvida, então sua ordem e presença prevalecem sem alterar o preset.
- Dado que existe serviço principal válido, quando a variante é resolvida, então `services` usa `featured`; sem principal, usa `grid`.
- Dado que a imagem de about está ausente, quando a página é resolvida, então a variante é `text` e nenhum placeholder é criado.
- Dado que o preset é inspecionado, então não contém nome comercial, textos, cores, logos, contatos ou assets concretos.
- Dado que uma seção obrigatória não possui conteúdo, quando o build é executado, então a falha informa preset, seção e dado ausente.
- Dado que o bundle é analisado, então a seleção do preset não introduz Client Component adicional.

## 12. Cenários de erro e borda

- Identificador do preset digitado incorretamente.
- Lista de serviços vazia.
- Mais de um serviço marcado como principal sem regra aprovada.
- Depoimentos ausentes quando a seção é opcional.
- Navegação aponta para seção omitida.
- Override repete ID de seção.
- Conteúdo inclui chamada para agendamento sem integração correspondente.
- Preset tenta importar tema ou dados do cliente.
- Nova variante criada somente para este preset.
- Página com textos muito longos ou serviço sem imagem.

## 13. Estratégia de testes

- Testes unitários devem cobrir blueprint, ordem, defaults e variantes condicionais.
- Testes de tipo devem garantir que o identificador e as variantes são fechados.
- Testes de integração devem resolver a home com conteúdo completo, opcional ausente e override explícito.
- Teste end-to-end deve validar smoke da página no preset de referência, navegação e menu mobile.
- Validação manual deve cobrir diferentes quantidades de serviços, textos longos, imagens ausentes e telas pequenas.
- Não duplicar testes internos já cobertos pelo compositor ou pelas seções.

## 14. Definição de pronto

- Preset `services` implementado e registrado de forma explícita.
- Blueprint padrão e ordem definidos.
- Variantes padrão e condicionais resolvidas de forma pura.
- Conteúdo obrigatório e opcional documentado e validado.
- Overrides do cliente preservados.
- Nenhum conteúdo, tema, asset, componente específico ou dependência adicionado ao preset.
- Página de referência renderizada com seções compartilhadas.
- Lint, typecheck, testes disponíveis e build executados com sucesso.
- Diff revisado sem antecipar comércio ou profissional.

## 15. Instruções para o Codex

- Ler `AGENTS.md`, arquitetura, guideline e specs 01–07 implementadas.
- Implementar somente o preset `services` e sua integração explícita.
- Não criar novos componentes ou variantes sem necessidade comprovada e alinhamento com a spec 06.
- Não incluir conteúdo concreto, tema ou assets no preset.
- Não adicionar dependências, herança, merge profundo ou engine de presets.
- Não atualizar pacotes.
- Preservar TypeScript estrito, imutabilidade e Server Components.
- Manter `"use client"` restrito às fronteiras já existentes.
- Executar lint, typecheck, testes e build conforme disponíveis.
- Revisar o diff, documentar ambiguidades e informar validações não executadas.
- Não afirmar que um comando passou sem executá-lo.
