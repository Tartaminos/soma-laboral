# 1. Título

Preset profissional

**Status:** Aprovada para implementação

## 2. Contexto

Profissionais autônomos e especialistas precisam apresentar autoridade, perfil, serviços, credenciais, depoimentos e contato pessoal. O terceiro preset deve validar que o catálogo atende uma composição centrada em pessoa sem criar um repositório separado, tema próprio ou componentes acoplados a profissões concretas.

## 3. Objetivo

Criar o preset declarativo `professional`, com blueprint e defaults voltados à apresentação de um profissional, reutilizando infraestrutura e conteúdo tipado sem antecipar agenda, captação de leads ou área autenticada.

## 4. Escopo

- Implementar a definição tipada do preset `professional`.
- Definir blueprint padrão da home.
- Definir ordem, IDs e variantes padrão.
- Priorizar `professional-profile`, serviços e credenciais.
- Definir navegação padrão derivada das seções presentes.
- Integrar o preset ao resolver existente.
- Definir conteúdo obrigatório e opcional.
- Validar compatibilidade dos contratos após os presets anteriores.
- Permitir composição explícita do cliente.

## 5. Fora do escopo

- Agenda, calendário, reserva, teleatendimento ou pagamento.
- Formulário de contato ou captação.
- Área de membros, autenticação ou conteúdo privado.
- Currículo completo, blog, publicações ou páginas dinâmicas.
- Novo tema, componentes específicos por profissão ou seção universal de equipe.
- Herança entre presets ou merge profundo.
- Integrações com redes profissionais, mapas ou widgets externos.

## 6. Requisitos funcionais

- O preset deve possuir identificador exato `professional`.
- O blueprint padrão da home deve usar, nesta ordem: `site-header`, `hero`, `professional-profile`, `services`, `highlights`, `testimonials`, `contact`, `call-to-action` e `site-footer`.
- `hero` deve usar variante `centered` quando não houver retrato principal e `split` quando houver imagem adequada.
- `professional-profile` deve usar `portrait` quando houver imagem e `credentials` quando a apresentação depender principalmente de formação e experiência.
- `services` deve usar `grid` por padrão.
- `highlights` deve usar `inline` para credenciais ou diferenciais curtos.
- `testimonials` deve usar `featured` quando existir depoimento principal; caso contrário, `grid`.
- `contact` deve usar `compact` por padrão.
- `call-to-action` deve usar `panel` com destino real de contato ou navegação.
- Header e footer devem usar variantes `standard`.
- Perfil profissional e pelo menos um serviço devem ser obrigatórios no blueprint padrão.
- Depoimentos e CTA devem poder ser omitidos explicitamente quando não houver conteúdo legítimo.
- Overrides devem seguir a precedência definida na spec 07.

## 7. Requisitos não funcionais

- Preset declarativo, somente leitura e sem JSX.
- Nenhum conteúdo concreto, profissão específica, tema ou asset no preset.
- Compatibilidade com build estático e Server Components.
- Nenhum Client Component adicional.
- Responsividade com nomes, cargos, credenciais e biografias longas.
- Acessibilidade de retrato, headings, listas de credenciais e ações.
- Nenhuma dependência nova.
- O preset deve provar reutilização sem adicionar flags como `isProfessional` em componentes compartilhados.

## 8. Decisões arquiteturais

- `professional` será independente dos presets anteriores, sem herança.
- O contrato `professional-profile` deve permanecer orientado a apresentação individual e não se transformar em componente genérico para qualquer equipe.
- Diferenças de presença de retrato serão resolvidas por variantes existentes e conteúdo, não por novo componente específico do preset.
- O preset define ordem e variantes padrão; identidade visual continua no tema e dados concretos continuam em `site`.
- Chamadas para ação não devem sugerir agendamento se não houver fluxo implementado. Devem usar rótulo e destino compatíveis com contato disponível.
- Caso os três presets revelem repetição real em resolução, uma pequena função pura pode ser extraída. Não criar classe base, mixin ou engine de herança.
- Mudanças em contratos compartilhados devem beneficiar mais de um caso ou representar correção arquitetural, e precisam manter os dois presets anteriores válidos.

## 9. Estrutura impactada

- `src/presets/professional`: definição, blueprint e defaults.
- Resolver explícito de presets.
- Conteúdo demonstrativo profissional na camada `site`, quando necessário.
- Testes dos três presets e regressões cruzadas.

## 10. Fluxo esperado

### Desenvolvedor que configura um cliente

1. Seleciona `professional`.
2. Preenche perfil, serviços, credenciais, depoimentos e contato em `site`.
3. Adiciona retrato acessível quando disponível.
4. Omite seções sem conteúdo legítimo por composição explícita.
5. Não cria ações para agenda ou formulário inexistentes.

### Aplicação durante build ou runtime

1. O resolver seleciona `professional`.
2. Resolve composição explícita ou blueprint padrão.
3. Escolhe variantes de hero e perfil conforme presença de imagem e credenciais.
4. Valida conteúdo obrigatório, IDs e navegação.
5. Renderiza seções compartilhadas sem runtime por requisição.

### Usuário final

1. Identifica o profissional, sua atuação e credenciais.
2. Consulta serviços e prova social em ordem lógica.
3. Encontra canal de contato real sem fluxo fictício de agendamento.

## 11. Critérios de aceite

- Dado que `professional` está selecionado sem override, quando a home é resolvida, então as nove seções aparecem na ordem definida.
- Dado que há retrato principal válido, quando o hero e perfil são resolvidos, então usam variantes compatíveis; sem retrato, nenhum placeholder é inventado.
- Dado que perfil ou serviços obrigatórios estão ausentes, quando o build é executado, então a falha informa o conteúdo necessário.
- Dado que depoimentos não existem, quando a composição explícita os omite, então a página permanece válida.
- Dado que o preset é inspecionado, então não contém nome de profissional, profissão, cores, contatos ou imagens concretas.
- Dado que os componentes compartilhados são revisados, então não possuem flags específicas de profissional.
- Dado que os três presets são executados, então todos resolvem e renderizam sem regressão ou contratos incompatíveis.

## 12. Cenários de erro e borda

- Perfil sem nome, função ou biografia mínima.
- Lista de serviços vazia.
- Credenciais excessivamente longas ou numerosas.
- Retrato ausente, decorativo ou com texto alternativo inadequado.
- Ação de agendamento sem integração real.
- Mais de um depoimento principal.
- Preset tenta definir tipografia “profissional” ou cores próprias.
- Componente compartilhado recebe comportamento específico por profissão.
- Biografia com HTML arbitrário.
- Override duplica IDs ou cria heading principal adicional.

## 13. Estratégia de testes

- Testes unitários devem cobrir blueprint e variantes com e sem retrato, credenciais e depoimento principal.
- Testes de integração devem resolver conteúdo completo, conteúdo opcional ausente e composição explícita.
- Testes de regressão devem executar `services`, `commerce` e `professional` no mesmo conjunto.
- Smoke end-to-end deve validar página, navegação e contato no preset profissional.
- Validação manual deve cobrir nomes longos, biografia extensa, muitas credenciais, ausência de imagem e telas pequenas.
- Evitar duplicar testes das seções sem comportamento específico do preset.

## 14. Definição de pronto

- Preset `professional` implementado e registrado.
- Blueprint, defaults e obrigatoriedade documentados.
- Variantes com e sem retrato resolvidas de forma determinística.
- Nenhum agendamento, formulário, autenticação ou integração adicionado.
- Nenhum conteúdo, tema ou asset concreto dentro do preset.
- Três presets funcionando sem herança e sem flags específicas de cliente.
- Lint, typecheck, testes disponíveis e build executados com sucesso.
- Diff revisado e contratos compartilhados mantidos simples.

## 15. Instruções para o Codex

- Ler `AGENTS.md`, arquitetura, guideline e specs 01–09 implementadas.
- Implementar somente o preset `professional` e sua integração.
- Não criar agenda, formulário, área de membros, blog ou integração externa.
- Não criar componentes específicos por profissão nem flags `isProfessional`.
- Não adicionar dependências, herança ou merge profundo.
- Não atualizar pacotes.
- Preservar TypeScript estrito, Server Components e composição declarativa.
- Manter `"use client"` apenas nas fronteiras já existentes.
- Executar lint, typecheck, testes e build para os três presets.
- Revisar o diff e informar ambiguidades e validações não executadas.
- Não afirmar que um comando passou sem executá-lo.
