# 1. Título

Sistema de tema e tokens visuais

**Status:** Aprovada para implementação

## 2. Contexto

O template precisa produzir sites visualmente distintos sem duplicar componentes ou misturar identidade de marca com composição de páginas. A configuração central já identifica o tema selecionado, mas ainda não existe um contrato para cores, tipografia, superfícies, espaçamentos e demais decisões visuais compartilhadas.

A arquitetura determina que tema representa identidade visual e deve ser aplicado principalmente por CSS Custom Properties. Presets continuarão responsáveis por estratégia de apresentação, não por cores ou marca.

## 3. Objetivo

Criar um sistema de tema tipado, semântico e centralizado que transforme uma definição visual do cliente em CSS Custom Properties consumidas por componentes e seções, preservando contraste, static-first e independência entre tema e preset.

## 4. Escopo

- Definir o contrato de tema inicial.
- Definir categorias mínimas de tokens semânticos realmente necessárias à primeira versão.
- Criar um tema padrão demonstrativo substituível pelo cliente.
- Criar resolução explícita entre o identificador de tema da configuração e a definição selecionada.
- Aplicar os tokens em um ponto central da árvore da aplicação.
- Organizar reset, tokens, tipografia e estilos globais mínimos.
- Estabelecer precedência entre tokens globais, decisões de preset e estilos locais.
- Definir regras de contraste, foco e redução de movimento.
- Remover o dark mode automático demonstrativo do `create-next-app`, pois dark mode não pertence ao escopo inicial.
- Definir documentação mínima dos tokens públicos.

## 5. Fora do escopo

- Dark mode e alternância de tema no navegador.
- Editor visual, theme builder, geração automática de paleta ou escolha de tema em runtime.
- Design system completo.
- Presets, variantes de seções ou composição de páginas.
- Cores específicas para cada tipo de negócio.
- CSS-in-JS, Tailwind, biblioteca de componentes ou pacote de tokens externo.
- Carregamento dinâmico de tema por domínio, tenant ou API.
- Garantia automática completa de contraste para qualquer paleta arbitrária.

## 6. Requisitos funcionais

- O tema deve possuir identificador estável compatível com a configuração da spec 01.
- O contrato inicial deve cobrir, no mínimo, background principal e alternativo, superfície, texto principal e secundário, borda, ação primária, ação em hover, texto sobre ação, foco, sucesso e erro.
- O contrato deve cobrir tipografia base, tipografia de destaque, pesos utilizados e escala tipográfica essencial.
- O contrato deve expor escala limitada de espaçamento, raios, sombras e largura máxima de conteúdo somente quando houver consumo real pelas specs seguintes.
- Tokens públicos devem ser semânticos; nomes literais como `blue500` não devem ser a API principal dos componentes.
- A resolução de tema deve rejeitar identificador desconhecido e ausência de token obrigatório.
- A aplicação deve disponibilizar as variáveis CSS para toda a árvore sem exigir Context React.
- Componentes e seções devem consumir tokens sem importar o arquivo concreto do tema do cliente.
- Estados de foco devem permanecer visíveis e não depender apenas de mudança de cor imperceptível.
- A preferência `prefers-reduced-motion` deve reduzir ou remover transições não essenciais definidas globalmente.
- O tema não deve alterar quais seções existem nem sua ordem.

## 7. Requisitos não funcionais

- Manter TypeScript estrito e definição somente leitura.
- Não adicionar JavaScript de cliente ou `"use client"` para aplicar o tema inicial.
- Manter CSS global limitado a reset, tokens, tipografia, documento e acessibilidade transversal.
- Usar CSS Modules nos componentes e seções posteriores.
- Evitar geração de classes utilitárias globais.
- Manter os tokens determinísticos para build estático.
- O sistema deve permitir substituição da identidade visual sem alterar componentes compartilhados.
- Combinações padrão devem atender WCAG 2.2 nível AA para texto, controles e foco nos estados principais.
- Não adicionar dependências.

## 8. Decisões arquiteturais

- `ThemeDefinition` pertence a `domain/theme` e não conhece CSS, React ou Next.js.
- A definição concreta do cliente pertence a `site/theme`.
- A conversão controlada de tokens para nomes de CSS Custom Properties pertence à fronteira de estilos ou a um resolver puro compartilhado, nunca aos componentes visuais individualmente.
- O tema selecionado será resolvido durante build/renderização do layout raiz. Não haverá provider de cliente ou estado global.
- A aplicação inicial poderá possuir uma coleção fechada mínima de temas disponíveis, mas não um registry extensível ou sistema de plugins. Um único tema concreto também é aceitável se o identificador central for validado de forma explícita.
- A precedência visual será: tokens do tema para identidade global; decisões do preset para composição e densidade; variantes de seção para diferenças estruturais; CSS Module local para geometria interna. Não haverá merge profundo genérico.
- Valores internos específicos de um componente não precisam virar tokens globais.
- Breakpoints serão documentados em CSS e usados de forma limitada, mas não precisam ser configuráveis pelo cliente.
- Fontes devem usar a solução do Next.js quando aplicável e serão carregadas centralmente; somente famílias, pesos e subsets realmente utilizados devem ser incluídos.

## 9. Estrutura impactada

- `src/domain/theme`: contrato de tema e categorias de tokens.
- `src/site/theme`: definição concreta selecionada pelo cliente.
- `src/styles`: reset, tokens, tipografia e estilos globais.
- Resolver puro de tema para variáveis CSS.
- `src/app/layout`: aplicação central das fontes e dos tokens.
- `src/app/globals.css`: substituição do CSS demonstrativo por responsabilidades globais aprovadas.

Não criar componentes de UI nesta spec, salvo estrutura mínima inevitável para validar a aplicação do tema.

## 10. Fluxo esperado

### Desenvolvedor que configura um cliente

1. Seleciona o identificador do tema na configuração central.
2. Edita a definição concreta em `site/theme` usando tokens semânticos.
3. Valida contraste das combinações principais.
4. Executa typecheck, build e validações visuais.
5. Altera identidade visual sem editar componentes compartilhados.

### Aplicação durante build ou runtime

1. O layout raiz resolve o tema selecionado.
2. O resolver valida tokens obrigatórios e produz o conjunto conhecido de variáveis CSS.
3. As variáveis são aplicadas centralmente ao documento.
4. CSS global define bases do documento e CSS Modules posteriores consomem os tokens.
5. Nenhum estado de navegador é necessário.

### Usuário final

1. Recebe identidade visual consistente em todas as seções.
2. Visualiza foco, texto e ações com contraste adequado.
3. Tem movimentos não essenciais reduzidos quando sua preferência do sistema assim indicar.

## 11. Critérios de aceite

- Dado que o tema contém todos os tokens obrigatórios, quando o layout é renderizado, então as CSS Custom Properties públicas estão disponíveis na raiz do documento.
- Dado que um identificador de tema desconhecido é configurado, quando o tema é resolvido, então ocorre erro claro durante desenvolvimento ou build.
- Dado que um token obrigatório está ausente, quando a validação é executada, então o campo é identificado e nenhum fallback silencioso de cor é aplicado.
- Dado que o preset muda de `services` para `commerce`, quando o tema permanece o mesmo, então as cores e tipografia de marca não são substituídas pelo preset.
- Dado que um componente compartilhado é inspecionado, quando seus imports são revisados, então ele não importa `site/theme`.
- Dado que o sistema operacional solicita redução de movimento, quando a página é usada, então transições globais não essenciais são reduzidas ou removidas.
- Dado que o CSS global é revisado, então não existe dark mode automático, framework de utilitários ou estilos específicos de uma seção.
- Dado que as combinações padrão são auditadas, então texto e controles principais atendem ao contraste mínimo de nível AA.

## 12. Cenários de erro e borda

- Tema referenciado e inexistente.
- Cor de ação com contraste insuficiente para seu texto.
- Estado de hover indistinguível do estado normal.
- Foco invisível sobre superfície de contraste.
- Token duplicado com nomes diferentes e mesma responsabilidade.
- Tipografia configurada com peso que não foi carregado.
- Escala de espaçamento excessiva ou sem consumo real.
- CSS Module repetindo cores de marca em vez de usar tokens.
- Variável CSS não definida gerando fallback inesperado.
- Tentativa de alternar tema em runtime sem spec aprovada.

## 13. Estratégia de testes

- Testes unitários futuros devem cobrir resolução de identificador, presença de tokens e mapeamento para nomes de CSS Custom Properties.
- Testes de integração devem confirmar aplicação central no layout e ausência de provider cliente.
- Testes de componentes posteriores devem verificar estados de foco e consumo dos tokens em primitives críticas.
- Auditoria manual deve conferir contraste, zoom, redução de movimento e fontes carregadas.
- A spec 13 realizará auditoria transversal mais ampla; esta spec deve validar apenas os contratos e estados principais do sistema de tema.
- A ferramenta oficial será definida na spec 12.

## 14. Definição de pronto

- Contrato de tema e tema concreto implementados.
- Tokens obrigatórios semânticos definidos e documentados.
- Resolver de tema explícito e validado.
- CSS Custom Properties aplicadas centralmente sem Client Component.
- CSS global reorganizado dentro das responsabilidades aprovadas.
- Dark mode demonstrativo removido sem introduzir alternância substituta.
- Fontes e pesos limitados ao uso real.
- Contraste principal validado.
- Nenhuma dependência adicionada.
- Lint, typecheck, testes disponíveis e build executados com sucesso.
- Diff revisado sem alterações fora do escopo.

## 15. Instruções para o Codex

- Ler `AGENTS.md`, arquitetura, guideline e specs 01 e 02 implementadas.
- Consultar a documentação local do Next.js para `next/font`, layout raiz e estilos globais na versão instalada.
- Implementar somente tema, tokens e aplicação central.
- Não criar presets, componentes, seções, dark mode ou seletor de tema.
- Não adicionar Tailwind, CSS-in-JS, biblioteca de tokens ou dependências.
- Não atualizar pacotes.
- Preservar TypeScript estrito, Server Components e `"use client"` na menor fronteira possível; esta spec não deve precisar dele.
- Usar CSS Modules para estilos locais futuros e CSS Custom Properties para tokens compartilhados.
- Não criar merge profundo, registry genérico ou sistema de plugins.
- Executar lint, typecheck, testes e build conforme disponíveis.
- Revisar o diff, documentar ambiguidades e informar validações não executadas.
- Não afirmar que um comando passou sem executá-lo.
