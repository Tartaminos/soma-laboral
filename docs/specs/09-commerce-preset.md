# 1. Título

Preset de comércio

**Status:** Aprovada para implementação

## 2. Contexto

Negócios de comércio, como mercados e lojas, precisam destacar produtos, categorias, diferenciais, localização e canais de contato. Essa apresentação não deve introduzir catálogo dinâmico, estoque, carrinho ou pagamentos. O segundo preset deve validar a reutilização das abstrações criadas para serviços sem forçar componentes compartilhados a conhecer tipos de cliente.

## 3. Objetivo

Criar o preset declarativo `commerce`, reutilizando o catálogo e o compositor existentes para formar uma vitrine institucional estática, com defaults próprios e sem lógica transacional.

## 4. Escopo

- Implementar a definição tipada do preset `commerce`.
- Definir blueprint padrão da página inicial.
- Definir ordem, IDs e variantes padrão.
- Destacar `product-showcase` como seção principal de oferta.
- Definir navegação padrão derivada das seções presentes.
- Integrar o preset ao resolver existente.
- Definir conteúdo obrigatório e opcional.
- Validar reutilização das abstrações do preset de serviços.
- Permitir overrides explícitos pela camada `site`.

## 5. Fora do escopo

- Catálogo remoto ou dinâmico.
- Busca, filtros, categorias navegáveis, estoque, carrinho, checkout, pedidos ou pagamentos.
- Preço calculado, promoção temporal ou integração com ERP.
- Página de detalhe de produto.
- Novo tema ou componentes exclusivos do preset.
- Analytics, formulários ou integrações externas.
- Herança do preset de serviços ou merge profundo entre presets.

## 6. Requisitos funcionais

- O preset deve possuir identificador exato `commerce`.
- O blueprint padrão da home deve usar, nesta ordem: `site-header`, `hero`, `product-showcase`, `highlights`, `about`, `contact`, `call-to-action` e `site-footer`.
- `hero` deve usar variante `split` por padrão.
- `product-showcase` deve usar variante `spotlight` quando existir produto principal válido; caso contrário, `grid`.
- `highlights` deve usar variante `inline` por padrão para benefícios comerciais curtos.
- `about` deve usar `media` quando houver imagem e `text` quando ausente.
- `contact` deve usar `split`, priorizando localização, horários e canais de atendimento fornecidos.
- `call-to-action` deve usar `panel` e somente destinos realmente disponíveis.
- Header e footer devem usar variantes `standard`.
- Produtos podem apresentar informação comercial estática opcional, mas o preset não deve interpretar preço, disponibilidade ou desconto.
- Seções não aplicáveis devem ser omitidas pela lista final, e não por flags paralelas.
- Overrides de composição e variante devem seguir a precedência da spec 07.

## 7. Requisitos não funcionais

- Definição somente leitura, declarativa e sem JSX.
- Nenhum conteúdo, cor, logo, contato ou asset concreto.
- Nenhum import de `site` ou tema.
- Compatibilidade com build estático e Server Components.
- Nenhum JavaScript adicional para produtos.
- Responsividade com listas de tamanhos variados e nomes longos.
- Acessibilidade de cards, links e informações comerciais.
- Nenhuma dependência nova.
- Reutilização deve ser demonstrada sem alterar contratos compartilhados apenas para acomodar este preset.

## 8. Decisões arquiteturais

- `commerce` será uma definição independente, não um filho de `services`.
- Duplicação pequena de blueprint e defaults é aceitável e preferível a herança ou engine de presets.
- A vitrine é conteúdo institucional. O domínio não deve modelar transação, estoque ou cálculo de preço.
- Não criar `CommerceProductCard` no preset. A seção `product-showcase` e as primitives existentes devem atender o caso.
- Caso a implementação exija mudança em contrato compartilhado, ela só é aceitável se representar necessidade reutilizável e permanecer compatível com serviços.
- Regras condicionais de variante devem ser puras e baseadas em conteúdo explicitamente modelado.
- Tema e identidade permanecem totalmente independentes.
- Uma ação de contato ou visita pode apontar para rota, âncora, telefone ou URL permitida; não simular botão de compra.

## 9. Estrutura impactada

- `src/presets/commerce`: definição, blueprint e defaults.
- Resolver explícito de presets.
- Conteúdo demonstrativo de vitrine na camada `site`, caso necessário.
- Testes de reutilização e resolução.

Não alterar componentes compartilhados sem necessidade comprovada por contrato comum.

## 10. Fluxo esperado

### Desenvolvedor que configura um cliente

1. Seleciona `commerce`.
2. Preenche produtos de vitrine, diferenciais, localização e contato em `site`.
3. Define produto principal apenas quando houver intenção editorial real.
4. Usa o blueprint padrão ou composição explícita.
5. Não configura ações transacionais sem uma spec futura.

### Aplicação durante build ou runtime

1. O resolver seleciona `commerce`.
2. Resolve composição explícita ou blueprint padrão.
3. Escolhe variante da vitrine conforme produto principal válido.
4. Valida conteúdo, IDs e navegação.
5. Renderiza seções compartilhadas estaticamente.

### Usuário final

1. Identifica rapidamente o que o comércio oferece.
2. Visualiza produtos ou categorias de forma institucional.
3. Encontra localização, horários e contato sem controles transacionais falsos.

## 11. Critérios de aceite

- Dado que `commerce` está selecionado sem override, quando a home é resolvida, então as oito seções aparecem na ordem definida.
- Dado que existe produto principal válido, quando a vitrine é resolvida, então usa `spotlight`; sem principal, usa `grid`.
- Dado que um produto não possui informação comercial opcional, quando renderizado, então o card continua válido sem placeholder de preço.
- Dado que o preset é inspecionado, então não contém dados de cliente, tema ou lógica de estoque e compra.
- Dado que a composição explícita remove `call-to-action`, quando a página é renderizada, então a seção não aparece e nenhuma flag paralela existe.
- Dado que os contratos compartilhados são comparados antes e depois, então não foram ampliados com propriedades específicas de comércio sem justificativa reutilizável.
- Dado que a página é construída para exportação estática, então nenhum recurso exige runtime por requisição.

## 12. Cenários de erro e borda

- Lista de produtos obrigatória vazia.
- Mais de um produto principal.
- Informação comercial desatualizada tratada como dado dinâmico.
- Ação rotulada como compra sem checkout real.
- Localização ou horários ausentes.
- Produto com nome ou descrição muito longos.
- Override adiciona seção de serviços com conteúdo incompatível.
- Preset tenta herdar ou modificar `services`.
- Componente compartilhado recebe flag `isCommerce`.
- Imagem de produto ausente ou em proporção inesperada.

## 13. Estratégia de testes

- Testes unitários devem cobrir blueprint, ordem e escolha `spotlight` versus `grid`.
- Testes de integração devem resolver vitrine completa, produto sem informação opcional, imagem ausente e override.
- Testes de regressão devem executar também o preset de serviços para detectar acoplamento introduzido.
- Smoke end-to-end deve validar home, navegação e links principais no preset de comércio.
- Validação manual deve cobrir diferentes quantidades de produtos, nomes longos, telas pequenas e ausência de imagens.
- Não testar lógica de transação inexistente.

## 14. Definição de pronto

- Preset `commerce` implementado e registrado explicitamente.
- Blueprint e defaults definidos sem herança.
- Vitrine estática funcionando com conteúdo tipado.
- Produto principal tratado de forma determinística.
- Nenhuma funcionalidade transacional ou dependência adicionada.
- Nenhum dado concreto ou tema dentro do preset.
- Preset de serviços continua válido e sem regressão.
- Lint, typecheck, testes disponíveis e build executados com sucesso.
- Diff revisado sem antecipar o preset profissional.

## 15. Instruções para o Codex

- Ler `AGENTS.md`, arquitetura, guideline e specs 01–08 implementadas.
- Implementar somente o preset `commerce` e sua integração.
- Reutilizar seções e componentes existentes; não criar componente específico por tipo de cliente.
- Não adicionar catálogo dinâmico, carrinho, preço calculado, estoque ou pagamentos.
- Não adicionar dependências, herança de preset ou merge profundo.
- Não atualizar pacotes.
- Preservar TypeScript estrito, Server Components e composição declarativa.
- Manter `"use client"` apenas nas fronteiras existentes.
- Executar lint, typecheck, testes e build conforme disponíveis, incluindo regressão do preset de serviços.
- Revisar o diff e informar ambiguidades e validações não executadas.
- Não afirmar que um comando passou sem executá-lo.
