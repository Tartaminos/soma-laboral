# 1. Título

Modelo de domínio e conteúdo

**Status:** Aprovada para implementação

## 2. Contexto

A configuração central da spec 01 identifica o site e o negócio, mas não deve se transformar em um objeto monolítico contendo todos os textos, listas e entidades exibidos nas páginas. Os presets e as seções futuras precisam consumir contratos estáveis para serviços, produtos, profissionais, chamadas para ação, navegação, horários, endereço e depoimentos sem conhecer dados concretos de um cliente.

Esta spec define a linguagem de dados inicial do template e a separação entre contratos reutilizáveis, conteúdo concreto e composição de páginas.

## 3. Objetivo

Criar contratos de domínio simples, explícitos e somente leitura, além de uma organização de conteúdo em TypeScript que permita aos módulos posteriores receber somente os dados necessários, sem HTML arbitrário, duplicação ou dependência visual.

## 4. Escopo

- Modelar os conceitos iniciais de negócio utilizados pelos três presets.
- Definir contratos para endereço, canais de contato, horário de funcionamento e redes sociais.
- Definir contratos para chamada para ação e item de navegação.
- Definir contratos para serviço, produto demonstrativo, profissional, credencial, diferencial e depoimento.
- Definir conteúdo editorial básico, como títulos, subtítulos, descrições e textos auxiliares.
- Criar módulos concretos de conteúdo na camada `site`, separados por responsabilidade.
- Criar um ponto de entrada de conteúdo que agregue referências aos módulos sem duplicar dados.
- Definir obrigatoriedade, opcionalidade, identificadores estáveis e regras de ausência.
- Preparar os contratos para consumo por seções e composição, sem implementar qualquer componente.

## 5. Fora do escopo

- Contratos de seção, variantes visuais e catálogo de componentes.
- Compositor de páginas e resolução de preset.
- Contrato completo de imagens, dimensões e estratégia de `next/image`, que pertencem à spec 05.
- Catálogo dinâmico, estoque, preço transacional, carrinho, pedidos ou pagamentos.
- Agendamento, formulário, envio de email, mapa integrado ou WhatsApp automatizado.
- CMS, Markdown, MDX, HTML arbitrário ou conteúdo remoto.
- Validação de dados provenientes de APIs externas.

## 6. Requisitos funcionais

- Todo conceito compartilhado deve possuir contrato explícito na camada `domain`.
- Entidades de coleção devem possuir identificador estável, único dentro de seu contexto e independente da posição no array.
- Um endereço deve distinguir, quando aplicável, logradouro, número, complemento, bairro, cidade, região, código postal e país.
- Horários devem representar dias ou grupos de dias, intervalo de atendimento e estado fechado, sem depender de texto livre como única fonte.
- Canais de contato devem distinguir telefone, email e URL exibível de valores usados como destino.
- Chamadas para ação devem distinguir rótulo, destino e natureza de navegação ou ação permitida.
- Serviços devem representar nome, resumo e descrição opcional, sem lógica de orçamento ou agendamento.
- Produtos devem representar conteúdo de vitrine, podendo conter nome, resumo, categoria e informação comercial opcional, sem modelar estoque ou checkout.
- Profissionais devem representar nome, função, biografia curta e credenciais opcionais.
- Depoimentos devem identificar autor, texto e contexto opcional, sem inventar avaliações numéricas quando não fornecidas.
- Navegação deve possuir rótulo, destino e identificador estável; links para âncoras dependerão de IDs existentes na composição.
- Conteúdo obrigatório ausente deve falhar claramente; conteúdo opcional deve poder ser omitido sem exigir placeholder falso.
- Strings de conteúdo não podem conter HTML arbitrário como mecanismo de formatação.

## 7. Requisitos não funcionais

- Contratos devem permanecer independentes de React, Next.js, JSX e CSS.
- Coleções e objetos de conteúdo devem ser somente leitura.
- Propriedades opcionais só podem existir quando a ausência for semanticamente válida.
- Nomes técnicos devem ser em inglês e arquivos em `kebab-case`.
- Evitar tipos genéricos permissivos, index signatures abertas e `Record<string, unknown>` para chaves conhecidas.
- Usar unions discriminadas apenas quando existirem formatos realmente diferentes.
- Não adicionar dependências para validação ou modelagem.
- O conteúdo deve ser serializável e compatível com Server Components e build estático.
- O modelo deve tolerar textos longos, listas vazias quando permitidas e variação na quantidade de itens.

## 8. Decisões arquiteturais

- `domain` conterá apenas contratos e regras puras. Não poderá importar `site`, React ou APIs do Next.js.
- `site/content` conterá os valores concretos do cliente e poderá importar contratos de `domain`.
- Dados já definidos na configuração central, como nome comercial, telefone principal e URL base, não serão duplicados em conteúdo. Conteúdos que precisarem desses valores receberão referências resolvidas posteriormente.
- O conteúdo será dividido por conceito ou área editorial, e não por componente visual específico. Por exemplo, a lista de serviços não pertence a uma variante de cards.
- Um agregado público de conteúdo poderá expor módulos especializados, mas não deverá copiar arrays ou reconstruir entidades.
- O modelo de produto será deliberadamente institucional: apresentação de itens ou categorias. Recursos transacionais exigirão nova spec.
- Referências a imagens poderão usar um contrato mínimo provisório apenas se necessário para compilar conteúdo; a semântica definitiva de mídia será estabelecida e consolidada pela spec 05.
- Não criar repositórios, services, factories, classes de entidade, value objects nominais ou DDD completo.
- A evolução deverá ocorrer pela introdução de contratos concretamente necessários, preservando compatibilidade com consumidores existentes sempre que razoável.

## 9. Estrutura impactada

- `src/domain/business`: endereço, contato, horários e redes sociais.
- `src/domain/content`: ações, serviços, produtos, profissionais, credenciais, diferenciais e depoimentos.
- `src/domain/navigation`: itens e destinos de navegação.
- `src/site/content`: módulos concretos separados por área editorial.
- `src/site/business`: ampliação dos dados do negócio quando o conceito pertencer à identidade, e não ao conteúdo de página.
- API pública controlada para contratos e conteúdo que serão consumidos por specs posteriores.

Não criar diretórios vazios nem toda a estrutura conceitual da arquitetura sem uso real nesta spec.

## 10. Fluxo esperado

### Desenvolvedor que configura um cliente

1. Atualiza os dados permanentes do negócio no módulo apropriado de `site/business`.
2. Edita listas e textos editoriais nos módulos de `site/content`.
3. Mantém IDs estáveis ao reordenar itens.
4. Omite campos realmente opcionais em vez de preencher textos artificiais.
5. Recebe erro de tipo ou validação para contratos incompatíveis e IDs duplicados cobertos pela implementação.

### Aplicação durante build ou runtime

1. Módulos de conteúdo são carregados como dados TypeScript estáticos.
2. A camada de composição futura seleciona apenas os dados necessários para cada seção.
3. Componentes recebem objetos específicos, sem acessar o agregado global ou arquivos concretos de `site`.
4. Nenhuma busca remota ou hidratação de estado é necessária.

### Usuário final

1. Visualiza dados consistentes do negócio e conteúdo estruturado.
2. Não recebe placeholders enganosos para informações não fornecidas.

## 11. Critérios de aceite

- Dado que um módulo de domínio é inspecionado, quando seus imports são revisados, então ele não depende de React, Next.js, CSS ou conteúdo concreto.
- Dado que um serviço, produto, profissional ou depoimento é criado, quando o typecheck é executado, então um identificador estável e os campos obrigatórios são exigidos.
- Dado que um campo opcional é omitido, quando o conteúdo é consumido por uma fixture compatível, então o contrato permanece válido sem valor vazio artificial.
- Dado que dois itens da mesma coleção usam o mesmo identificador, quando a validação de conteúdo é executada, então a duplicidade é reportada com a coleção e o ID.
- Dado que um conteúdo contém HTML arbitrário para formatação, quando a revisão e as validações são executadas, então a implementação é rejeitada ou o conteúdo é modelado de forma estruturada.
- Dado que telefone e endereço já existem na fonte de verdade do negócio, quando o conteúdo é revisado, então não há segunda cópia desses valores em módulos editoriais.
- Dado que um componente compartilhado futuro precisa de um serviço, quando a direção de dependência é verificada, então ele recebe o contrato necessário por props e não importa `site/content`.

## 12. Cenários de erro e borda

- Identificadores vazios, duplicados ou dependentes do índice da lista.
- Horário com intervalo invertido, dia sem definição clara ou combinação fechada e aberta conflitante.
- Link externo sem URL absoluta ou destino interno inconsistente.
- Lista obrigatória vazia para um preset que exige conteúdo.
- Textos compostos apenas por espaços.
- Produto modelado com regras transacionais fora do escopo.
- Informação obrigatória repetida em múltiplos módulos.
- Conteúdo extremamente longo causando suposições visuais indevidas.
- Uso de `null` interno sem necessidade, em vez de ausência explícita.
- Tentativa de incluir JSX, callback de renderização ou componente dentro da configuração de conteúdo.

## 13. Estratégia de testes

- Testes unitários futuros devem cobrir validadores puros de IDs, coleções e horários quando implementados.
- Testes de tipo devem verificar contratos obrigatórios, unions fechadas e imutabilidade quando a infraestrutura permitir.
- Testes de integração posteriores devem confirmar que conteúdo concreto alimenta seções sem import direto de `site` pelos componentes.
- Fixtures devem representar ausência opcional, texto longo, coleções pequenas e grandes e IDs duplicados.
- Não testar simples existência de strings estáticas sem regra associada.
- A ferramenta de testes não deve ser escolhida nesta spec.

## 14. Definição de pronto

- Contratos iniciais de negócio, conteúdo e navegação implementados em `domain`.
- Conteúdo concreto organizado em módulos coesos dentro de `site`.
- Fonte única preservada para dados centrais do negócio.
- IDs estáveis definidos e validação de duplicidade implementada onde necessária.
- Nenhum contrato depende de React, Next.js ou CSS.
- Nenhum HTML arbitrário, callback de renderização ou lógica transacional foi introduzido.
- Nenhuma dependência adicionada.
- Lint, typecheck, testes disponíveis e build executados com sucesso.
- Diff revisado e escopo das specs posteriores preservado.

## 15. Instruções para o Codex

- Ler `AGENTS.md`, `docs/ARCHITECTURE.md`, `docs/CODING_GUIDELINES.md` e a spec 01 concluída.
- Implementar somente os contratos e módulos necessários a esta spec.
- Não criar seções, componentes, compositor, presets ou SEO.
- Não adicionar bibliotecas, CMS, parser de Markdown ou validador genérico.
- Não atualizar pacotes nem lockfile.
- Preservar TypeScript estrito, imutabilidade e direção `site` para `domain`.
- Não usar `any`, assertions duplas, `@ts-ignore`, JSX ou APIs do Next.js em `domain`.
- Manter Server Components por padrão; esta spec não deve exigir `"use client"`.
- Não transformar conteúdo em uma configuração monolítica.
- Executar lint, typecheck, testes e build conforme disponíveis.
- Revisar o diff e confirmar ausência de arquivos fora do escopo.
- Documentar ambiguidades e comandos não executados.
- Não afirmar sucesso de validação sem execução real.
