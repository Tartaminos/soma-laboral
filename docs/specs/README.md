# Especificações de implementação

## Objetivo

Este diretório contém as especificações técnicas oficiais para implementar e evoluir o `business-site-template`.

As specs 01–15 transformam as decisões aprovadas em `docs/ARCHITECTURE.md` e `docs/CODING_GUIDELINES.md` na primeira versão completa do template. Specs posteriores registram evoluções limitadas, implementáveis e verificáveis. Uma spec não afirma que a funcionalidade já existe enquanto sua implementação estiver pendente.

## Regra de precedência

Em caso de divergência, aplicar obrigatoriamente esta ordem:

1. `docs/ARCHITECTURE.md`;
2. `docs/CODING_GUIDELINES.md`;
3. spec da funcionalidade;
4. documentação técnica correspondente às versões instaladas;
5. convenções existentes no módulo afetado.

Uma implementação não pode alterar silenciosamente a arquitetura ou o guideline para se adequar a uma spec.

## Regra de execução

- Implementar apenas uma spec por vez.
- Respeitar a ordem abaixo, salvo dependência já comprovadamente concluída.
- Ler integralmente a spec antes de editar o projeto.
- Não misturar funcionalidades de specs futuras na implementação atual.
- Marcar uma implementação como concluída somente após atender à definição de pronto e executar as validações aplicáveis.
- Funcionalidades futuras, incluindo analytics, formulários, autenticação, banco, pagamentos, agendamento, catálogo dinâmico e backend, exigirão novas specs aprovadas.

## Ordem, dependências e status

| Ordem | Spec | Dependências principais | Spec criada | Implementação |
|---:|---|---|---|---|
| 1 | [Configuração central tipada do site e do negócio](./01-site-business-configuration.md) | Nenhuma | Sim | Concluída |
| 2 | [Modelo de domínio e conteúdo](./02-domain-content-model.md) | 01 | Sim | Concluída |
| 3 | [Sistema de tema e tokens visuais](./03-theme-design-tokens.md) | 01, 02 | Sim | Concluída |
| 4 | [Componentes fundamentais de interface e layout](./04-ui-layout-foundation.md) | 03 | Sim | Concluída |
| 5 | [Convenções de imagens e assets](./05-images-assets-conventions.md) | 01, 02, 04 | Sim | Concluída |
| 6 | [Catálogo inicial de seções](./06-section-catalog.md) | 02, 03, 04, 05 | Sim | Concluída |
| 7 | [Compositor declarativo de páginas](./07-declarative-page-composer.md) | 01, 02, 06 | Sim | Concluída |
| 8 | [Preset de serviços](./08-services-preset.md) | 03, 06, 07 | Sim | Concluída |
| 9 | [Preset de comércio](./09-commerce-preset.md) | 08 | Sim | Concluída |
| 10 | [Preset profissional](./10-professional-preset.md) | 08, 09 | Sim | Concluída |
| 11 | [SEO técnico e dados estruturados](./11-technical-seo-structured-data.md) | 01, 02, 05, 07 | Sim | Concluída |
| 12 | [Estratégia de testes e integração contínua](./12-testing-continuous-integration.md) | 01–11 | Sim | Concluída |
| 13 | [Auditoria de responsividade e acessibilidade](./13-responsive-accessibility-audit.md) | 03–12 | Sim | Concluída |
| 14 | [Build estático e configuração de deploy](./14-static-build-deployment.md) | 05, 07, 11, 12, 13 | Sim | Concluída |
| 15 | [Documentação para criação de um novo cliente](./15-new-client-documentation.md) | 01–14 | Sim | Concluída |
| 16 | [Investigação da resolução de presets e seletor de demonstração](./16-preset-resolution-demo-switcher.md) | 01–15 | Sim | Concluída |
| 17 | [Seção reutilizável de portfólio visual](./17-portfolio-section.md) | 02, 05–08, 10, 12–16 | Sim | Concluída |
| 18 | [Implementação da SPA da Soma Laboral](./18-soma-laboral-client-implementation.md) | 01–17 | Sim | Pendente |

## Mapa resumido de contratos

- A spec 01 cria a configuração central, os identificadores de preset e tema e os dados essenciais do negócio.
- A spec 02 amplia os contratos de domínio e separa conteúdo concreto da configuração operacional.
- A spec 03 transforma uma definição de tema em tokens CSS semânticos aplicados centralmente.
- As specs 04 e 05 fornecem primitives de interface, layout e mídia para as seções.
- A spec 06 estabelece a union fechada de seções, seus dados e suas variantes.
- A spec 07 cria a definição final de página, a resolução de defaults e o catálogo tipado usado para renderização.
- As specs 08, 09 e 10 fornecem defaults declarativos para serviços, comércio e profissional, sem conteúdo de cliente.
- A spec 11 consome dados do site e da página para metadata, arquivos de SEO e JSON-LD.
- A spec 12 define ferramentas, scripts e quality gates que validam os contratos anteriores.
- A spec 13 aplica uma auditoria transversal sobre a interface completa.
- A spec 14 garante que o resultado permaneça compatível com exportação estática e hospedagem gerenciada.
- A spec 15 documenta o fluxo operacional de criação, configuração, validação e publicação de um cliente.
- A spec 16 investiga a seleção atual de preset e adiciona páginas estáticas de demonstração com um seletor cliente mínimo.
- A spec 17 adiciona um portfólio visual tipado e opcional aos presets de serviços e profissional, sem criar preset de nicho ou galeria dinâmica.
- A spec 18 configura o template para a Soma Laboral, define conteúdo, composição, identidade, conversão por WhatsApp, links sociais por ícone e limites explícitos de densidade visual.

## Status oficial

Todas as specs deste diretório possuem status **Aprovada para implementação**.

No estado atual deste índice:

- specs 01–17: implementação concluída;
- spec 18: implementação pendente.
