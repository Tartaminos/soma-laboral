# 1. Título

Implementação da SPA da Soma Laboral

**Status:** Aprovada para implementação

## 2. Contexto

A Soma Laboral oferece Ginástica Laboral, Quick Massage e ações para SIPAT. O serviço principal é Ginástica Laboral.

O atendimento se diferencia por considerar as necessidades físicas, emocionais e organizacionais dos colaboradores, em vez de tratar a atividade apenas como um procedimento isolado. A proposta comercial deve transmitir proximidade, experiência e cuidado, sem perder a clareza necessária para um público empresarial.

O repositório `soma-laboral` foi criado a partir do `business-site-template` e já possui arquitetura static-first, preset de serviços, composição declarativa, tema tipado, seção de portfólio visual, SEO, testes e exportação estática.

Esta spec configura o template para o cliente real e introduz somente os pequenos ajustes reutilizáveis necessários para atender à experiência aprovada. Ela não cria um novo preset de nicho e não transforma o projeto em uma aplicação dinâmica.

## 3. Objetivo

Implementar uma single page institucional que:

- apresente a Soma Laboral de forma humana, profissional e confiável;
- destaque Ginástica Laboral sem esconder Quick Massage e SIPAT;
- ajude profissionais de RH, gestores, SESMT e responsáveis pela empresa a entenderem rapidamente o serviço;
- conduza o visitante a um contato qualificado pelo WhatsApp;
- use fotografias reais de forma curada, leve e respeitosa;
- preserve a identidade visual existente da marca;
- evite excesso de botões, chamadas repetidas, textos genéricos e aparência de conteúdo produzido por IA.

## 4. Público e tarefa principal

### Público prioritário

- profissionais de Recursos Humanos;
- gestores e administradores;
- responsáveis por saúde e segurança do trabalho;
- proprietários de empresas;
- pessoas organizando SIPAT ou ações internas de bem-estar.

### Tarefa principal do visitante

Entender o que a Soma oferece, perceber que o atendimento é adaptado à realidade da equipe e iniciar uma conversa pelo WhatsApp para solicitar uma proposta.

### Informações esperadas no contato

A mensagem inicial do WhatsApp deve orientar o visitante a informar:

- nome da empresa;
- cidade;
- número aproximado de colaboradores;
- setores a serem atendidos;
- horários disponíveis;
- frequência desejada por semana;
- serviço de interesse, quando já souber.

## 5. Princípios de UI/UX

### 5.1 Clareza antes de quantidade

A página deve ter uma narrativa curta e progressiva. Não repetir a mesma ideia em hero, diferenciais, sobre e contato com palavras diferentes.

Cada seção precisa responder a uma pergunta concreta:

1. O que a Soma faz?
2. Quais serviços oferece?
3. Como o atendimento é conduzido?
4. Como esse trabalho acontece na prática?
5. Quem é a Soma?
6. Como iniciar uma conversa?

### 5.2 Limite de ações

A home deve possuir somente:

- dois CTAs textuais de WhatsApp, um no hero e outro na seção final de contato;
- um link visual para o Instagram, apresentado por ícone;
- o logotipo clicável para retornar ao início;
- links de navegação interna no header.

Não adicionar:

- botão flutuante de WhatsApp;
- CTA no header desktop;
- CTA em cada card de serviço;
- botão depois da galeria;
- botão separado na seção sobre;
- repetição do Instagram no header e no footer;
- seção de CTA adicional depois do contato.

A composição deve omitir a seção `call-to-action` do preset para este cliente. A própria seção de contato encerra a jornada.

### 5.3 Sem controles falsos

Uma imagem só pode ser clicável quando existir um destino real e compreensível.

Não transformar fotografias da galeria em links sem destino, cards clicáveis sem ação ou imagens com aparência de botão. O logotipo pode ser link para `/`; o ícone do Instagram pode ser link externo; demais imagens permanecem conteúdo visual.

### 5.4 Hierarquia visual

- Um único `h1` no hero.
- Títulos de seção curtos e concretos.
- Textos introdutórios com largura de leitura controlada.
- Cards de serviço sem excesso de bordas, badges ou ícones decorativos.
- Ginástica Laboral pode receber maior peso visual, mas não deve ocupar uma seção duplicada.
- Fotografias devem equilibrar a página e não competir com o conteúdo textual.

### 5.5 Mobile-first

- Navegação móvel simples e com no máximo quatro destinos.
- Alvos de toque de no mínimo 44 por 44 CSS px para ícones e controles.
- Nenhum texto essencial apenas sobreposto a imagens.
- Nenhum conteúdo dependente de hover.
- Sem overflow horizontal em 320 CSS px.

## 6. Arquitetura de informação e composição

A home deve usar o preset `services`, com composição concreta para a Soma Laboral nesta ordem:

1. `site-header`;
2. `hero`;
3. `services`;
4. `highlights`;
5. `portfolio` com título público “Soma em ação”;
6. `about`;
7. `contact`;
8. `site-footer`.

Devem ser omitidas:

- `testimonials`, até existirem depoimentos reais e autorizados;
- `call-to-action`, para não duplicar a conversão já presente no contato.

### Navegação principal

Usar no máximo quatro itens:

- Serviços;
- Como trabalhamos;
- Soma em ação;
- Contato.

A seção “Sobre a Soma” permanece acessível pelo fluxo normal da página, sem necessariamente ocupar um item próprio no header.

## 7. Conteúdo editorial aprovado como base

Os textos abaixo são base editorial para implementação. Podem receber ajustes mínimos de ritmo, concordância e dados concretos, mas não devem ser substituídos por copy genérica.

### 7.1 Hero

**Eyebrow:**

`Cuidado com quem faz a empresa acontecer`

**Título:**

`Bem-estar no trabalho começa com atenção às pessoas.`

**Descrição:**

`A Soma Laboral leva Ginástica Laboral, Quick Massage e ações para SIPAT até a sua empresa, com atividades pensadas para a rotina e as necessidades de cada equipe.`

**Ação principal:**

`Contato por WhatsApp`

O hero deve usar uma fotografia real de Ginástica Laboral em ambiente de trabalho. A imagem precisa mostrar a atividade com naturalidade e não pode parecer fotografia genérica de banco de imagens.

### 7.2 Serviços

**Título:**

`Cuidado que cabe na rotina da sua empresa`

**Descrição:**

`As atividades são organizadas de acordo com o número de colaboradores, os setores, os horários e a frequência necessária.`

#### Ginástica Laboral

`Práticas orientadas para movimentar o corpo durante a jornada, ajudar na prevenção de desconfortos e criar uma pausa de cuidado no dia.`

Este serviço deve ser o item visualmente destacado.

#### Quick Massage

`Sessões breves de massagem realizadas no ambiente de trabalho, pensadas para oferecer relaxamento e bem-estar sem atrapalhar a rotina.`

#### SIPAT

`Atividades de saúde e bem-estar que ajudam a tornar a programação da SIPAT mais próxima, participativa e útil para os colaboradores.`

Os cards não devem ter botões individuais.

### 7.3 Como trabalhamos

Usar a seção `highlights`.

**Título:**

`Um atendimento que olha para a equipe como um todo`

Itens:

1. **Escuta antes da atividade**
   
   `A proposta começa entendendo a rotina, os setores e as necessidades das pessoas que serão atendidas.`

2. **Planejamento para a realidade da empresa**
   
   `Horários, frequência e formato são organizados para que a atividade faça sentido no dia a dia da equipe.`

3. **Cuidado além do procedimento**
   
   `O trabalho considera o bem-estar físico e a experiência dos colaboradores, com uma condução próxima e respeitosa.`

Evitar transformar benefícios gerais da Ginástica Laboral em diferenciais exclusivos da Soma.

### 7.4 Soma em ação

Usar a seção técnica `portfolio`, mantendo o nome interno do contrato.

**Título público:**

`Soma em ação`

**Descrição:**

`Um pouco do trabalho realizado junto às equipes.`

Exibir entre quatro e seis fotografias autorizadas, com recomendação inicial de cinco imagens.

A seleção deve, quando o acervo permitir, representar:

- Ginástica Laboral;
- Quick Massage;
- ação de SIPAT;
- diferentes ambientes ou setores;
- interação real com os colaboradores.

A galeria não deve possuir ação final, lightbox, carrossel, slider ou integração com Instagram.

### 7.5 Sobre

**Título:**

`Sobre a Soma Laboral`

**Parágrafo-base 1:**

`A Soma Laboral nasceu da experiência de cuidar de pessoas dentro do ambiente de trabalho, com atividades conduzidas de forma próxima, responsável e adaptada a cada empresa.`

**Parágrafo-base 2:**

`Mais do que cumprir uma programação, o objetivo é criar momentos que façam sentido para os colaboradores e contribuam para uma rotina de trabalho mais saudável e acolhedora.`

A informação sobre anos de experiência, profissionais e formação só pode ser incluída quando os dados exatos forem fornecidos.

### 7.6 Contato

**Título:**

`Vamos entender a rotina da sua empresa`

**Descrição:**

`Para preparar uma proposta mais adequada, conte quantos colaboradores e setores serão atendidos, os melhores horários e quantas vezes por semana você imagina realizar as atividades.`

**Ação:**

`Contato por WhatsApp`

A seção deve apresentar também um único link de Instagram por ícone, com nome acessível equivalente a:

`Abrir Instagram da Soma Laboral`

Não exibir endereço residencial. Região atendida pode ser apresentada quando confirmada. Horários fixos devem ser omitidos enquanto não existirem dados reais.

### 7.7 Rodapé

Exibir somente:

- marca;
- texto curto `Ginástica Laboral, Quick Massage e SIPAT`;
- copyright quando aplicável;
- navegação essencial, caso o layout continue leve.

Não repetir WhatsApp e Instagram no rodapé quando eles já estiverem apresentados na seção de contato.

## 8. Linguagem humana e empática

### 8.1 Tom

A escrita deve ser:

- próxima, sem informalidade excessiva;
- profissional, sem parecer corporativa demais;
- empática, sem dramatização;
- concreta, usando situações reais da rotina empresarial;
- simples o suficiente para leitura rápida.

### 8.2 Regras editoriais

- Preferir frases diretas e vocabulário comum.
- Falar com a empresa sem esquecer que o serviço atende pessoas.
- Usar “equipe”, “colaboradores”, “rotina” e “empresa” em contextos concretos.
- Explicar o serviço antes de tentar persuadir.
- Evitar blocos longos e parágrafos com muitas abstrações.
- Manter acentuação e capitalização corretas de Ginástica Laboral, Quick Massage e SIPAT.
- Não inventar estatísticas, resultados, clientes, certificações ou depoimentos.

### 8.3 Expressões a evitar

Não usar como preenchimento genérico:

- “transforme o bem-estar da sua empresa”;
- “potencialize seus resultados”;
- “soluções personalizadas” sem explicar o que é adaptado;
- “experiência única”;
- “jornada de bem-estar”;
- “resultados extraordinários”;
- “cuidamos de cada detalhe”;
- “eleve sua equipe a outro nível”;
- sequências de frases curtas artificiais com ponto após cada ideia;
- promessas absolutas de produtividade, prevenção de lesões ou redução de afastamentos.

Alegações de benefício devem usar formulações responsáveis, como “contribui para”, “ajuda a”, “favorece” ou “pode apoiar”, quando adequadas.

## 9. Links, botões e ícones

### 9.1 Aparência de hyperlinks

Nenhum link da interface deve usar a aparência padrão de navegador em azul ou roxo de link visitado.

- Navegação, marca, botões e ícones devem usar tokens da identidade visual.
- `:visited` não deve mudar o link para roxo padrão do navegador.
- Links de navegação não devem parecer texto sublinhado de artigo.
- Botões de ação devem possuir forma, espaçamento e contraste de botão.
- Links por ícone devem possuir área clicável própria e estados de hover e foco.
- Não remover globalmente a identificação de todo link sem oferecer outra affordance.
- Caso surja um link textual dentro de um parágrafo, ele deve ser identificável por sublinhado, peso, borda ou outro tratamento além da cor, ainda usando a paleta da marca.

A alteração não deve consistir apenas em `a { text-decoration: none; }` global.

### 9.2 WhatsApp

Os dois CTAs de WhatsApp devem ser links reais e usar exatamente o rótulo visível:

`Contato por WhatsApp`

O link deve abrir uma mensagem inicial pré-preenchida equivalente a:

```text
Olá! Gostaria de conversar sobre os serviços da Soma Laboral.

Empresa:
Cidade:
Número aproximado de colaboradores:
Setores a serem atendidos:
Horários disponíveis:
Frequência desejada:
Serviço de interesse:
```

Não usar somente “WhatsApp”, “Clique aqui”, “Saiba mais” ou “Fale conosco”.

### 9.3 Instagram

O Instagram deve ser apresentado por ícone, sem o texto visual “Instagram”.

Requisitos:

- link real para o perfil oficial;
- nome acessível por `aria-label` ou texto visualmente oculto;
- SVG local ou inline com `currentColor`;
- ícone decorativo com `aria-hidden="true"` quando houver nome acessível no link;
- área mínima de 44 por 44 CSS px;
- estado de foco claramente visível;
- não adicionar biblioteca de ícones.

### 9.4 Logo

O logo no header deve continuar sendo um link para o início da página.

- A área clicável deve incluir a imagem e, quando presente, o nome da marca.
- O link não deve parecer hyperlink textual.
- A imagem deve preservar proporção e não ficar comprimida.

## 10. Estratégia de mídia

### 10.1 Curadoria

O Drive do cliente pode conter muitos arquivos, mas somente uma seleção pequena deve entrar na home.

Quantidade inicial recomendada:

- uma fotografia de hero;
- uma fotografia para a seção sobre, caso melhore a composição;
- quatro a seis fotografias em “Soma em ação”.

Não publicar todo o acervo.

### 10.2 Critérios de escolha

Priorizar imagens que:

- mostrem a atividade claramente;
- tenham boa luz e enquadramento;
- pareçam naturais;
- não exponham documentos, crachás, telas ou informações confidenciais;
- funcionem bem em mobile;
- tenham autorização de uso.

### 10.3 Privacidade e preparação

- Confirmar direito de publicação e autorização das pessoas identificáveis.
- Remover metadados EXIF desnecessários.
- Renomear arquivos em `kebab-case`.
- Otimizar dimensões e peso antes do commit.
- Registrar largura, altura e alt text coerentes no conteúdo tipado.
- Não usar nomes de empresas atendidas como prova social sem autorização.

### 10.4 Vídeos

Vídeos não fazem parte desta implementação inicial.

Não adicionar autoplay, player, reels, embed do Instagram ou arquivo pesado em background. Um vídeo futuro exige spec própria ou extensão explícita desta spec, com poster, controles, legendas, performance e comportamento mobile definidos.

## 11. Direção visual

### 11.1 Paleta

Usar a identidade presente no logotipo como referência:

- fundo off-white próximo de `#F4F5EF`;
- roxo profundo próximo de `#251540` para texto, ações e estrutura;
- vermelho próximo de `#9E2C36` somente como acento controlado e foco;
- branco para superfícies quando necessário;
- tons intermediários neutros derivados da paleta para bordas e texto secundário.

O vermelho não deve dominar a interface. O site deve permanecer predominantemente claro, calmo e profissional.

### 11.2 Forma e composição

- Bordas suaves, sem excesso de cards arredondados.
- Sombras discretas ou ausentes.
- Sem gradientes genéricos.
- Sem blobs, brilhos, ondas abstratas ou elementos decorativos que remetam a template de IA.
- Sem animações obrigatórias para compreender o conteúdo.
- Espaçamento generoso, mas sem criar uma página excessivamente longa.

### 11.3 Tipografia

Usar tipografia legível e acolhedora, sem aparência infantil, fitness agressiva ou clínica hospitalar.

Não adicionar fonte externa somente por estética se o carregamento e licenciamento não estiverem definidos. A implementação pode usar uma pilha de sistema coerente com o tema existente, salvo decisão posterior aprovada.

## 12. Requisitos funcionais

- Configurar `siteSettings` para Soma Laboral, idioma `pt-BR`, preset `services` e tema concreto.
- Substituir integralmente o conteúdo fictício do Estúdio Horizonte.
- Configurar negócio, contatos, redes sociais, ações, serviços, conteúdo editorial, portfólio, tema e SEO em suas camadas próprias.
- Manter WhatsApp como canal principal.
- Integrar Instagram como link social por ícone na seção de contato.
- Permitir que `ContactSection` receba links sociais tipados quando necessário.
- Omitir endereço e horários quando não houver dados reais.
- Omitir depoimentos e CTA separado.
- Usar Ginástica Laboral como serviço destacado.
- Manter `portfolio` como contrato técnico da galeria “Soma em ação”.
- Não criar nova rota pública além da home e infraestrutura já existente.
- Atualizar nome do pacote para `soma-laboral` sem alterar versões de dependências.
- Atualizar metadata e dados estruturados somente com informações reais.

## 13. Decisões arquiteturais

- Não criar preset `soma`, `wellness` ou `laboral`.
- Usar uma composição concreta do cliente para retirar seções opcionais e ordenar o conteúdo.
- Conteúdo e dados do cliente permanecem em `src/site`.
- Componentes compartilhados não devem importar dados da Soma Laboral.
- A necessidade de Instagram por ícone deve ser resolvida com uma extensão pequena e reutilizável do contrato/componente de contato, aproveitando `SocialLink` já existente.
- Não adicionar `icon` genérico a todos os modelos de conteúdo sem necessidade comprovada.
- Não identificar o ícone do Instagram por heurística de URL; usar o `id` ou contrato explícito do link social.
- Não adicionar biblioteca de ícones. Usar SVG próprio, local e versionado.
- Não alterar `docs/ARCHITECTURE.md` ou `docs/CODING_GUIDELINES.md`.
- Preservar Server Components por padrão e exportação estática.

## 14. Estrutura impactada

Arquivos que poderão ser alterados:

- `package.json`;
- `src/site/config/site-settings.ts`;
- `src/site/business/business.ts`;
- `src/site/content/actions.ts`;
- `src/site/content/services.ts`;
- `src/site/content/editorial.ts`;
- `src/site/content/portfolio.ts`;
- `src/site/pages/home-content.ts`;
- `src/site/theme/default-theme.ts`;
- `src/site/assets/brand.ts`;
- `src/site/seo/seo.ts`;
- `src/domain/sections.ts`, somente para links sociais opcionais no contato;
- `src/sections/contact/contact.tsx` e CSS Module correspondente;
- um componente ou módulo local mínimo para SVGs sociais, caso necessário;
- CSS Modules de header, hero, serviços, destaques, portfólio, sobre, contato e rodapé quando a identidade exigir;
- `src/app/globals.css`, somente para corrigir estados globais de links sem remover affordance;
- assets em `public/brand` e `public/images`;
- testes afetados;
- documentação operacional do cliente, quando aplicável.

Não refatorar componentes ou contratos não afetados apenas para padronização estética.

## 15. Requisitos não funcionais

- Preservar Next.js, React e TypeScript nas versões instaladas.
- Não adicionar dependências.
- Preservar CSS Modules e CSS Custom Properties.
- Manter TypeScript estrito.
- Manter Server Components por padrão.
- Preservar `output: "export"` e compatibilidade com Cloudflare Pages.
- Não introduzir chamadas externas em runtime para carregar conteúdo.
- Manter imagens locais com dimensões conhecidas.
- Priorizar somente a mídia crítica do primeiro viewport.
- Validar contraste, foco, teclado, zoom de 200% e movimento reduzido.
- Evitar layout shift e carga inicial excessiva.
- Não depender de JavaScript para layout, galeria ou exibição de serviços.

## 16. Critérios de aceite de UI/UX

- A página apresenta no máximo dois botões textuais de WhatsApp.
- Não existe botão flutuante.
- O header não possui CTA adicional.
- O Instagram aparece uma única vez por ícone e possui nome acessível.
- Não existe texto visual “Instagram” usado como botão.
- Links não assumem azul ou roxo padrão do navegador.
- Links visitados não mudam para a cor padrão de link visitado.
- Foco por teclado permanece claramente visível.
- Ícones clicáveis possuem área mínima de toque.
- Cards de serviço não possuem CTAs repetidos.
- Galeria não possui controles sem função.
- A home não apresenta depoimentos fictícios.
- A home não termina com contato e outro CTA repetindo a mesma ação.
- A leitura em mobile mostra hierarquia clara sem blocos excessivos.
- Os textos não contêm frases genéricas listadas como proibidas nesta spec.
- Nenhuma alegação médica, trabalhista ou comercial é apresentada como garantia.

## 17. Estratégia de testes

### Unitários e integração

- validar composição final sem `testimonials` e sem `call-to-action`;
- validar Ginástica Laboral como serviço destacado;
- validar IDs únicos de serviços, destaques e itens de portfólio;
- validar referência de imagens e dimensões;
- validar WhatsApp com `href` válido e mensagem codificada;
- validar link social do Instagram;
- validar omissão de endereço e horários quando ausentes;
- validar metadata e dados estruturados com conteúdo real.

### Componentes

- contato renderiza CTA textual de WhatsApp e Instagram por ícone;
- ícone possui nome acessível e SVG não duplica leitura por leitor de tela;
- links preservam semântica de âncora;
- foco é perceptível;
- ausência de links sociais não quebra a seção.

### E2E e auditoria manual

- desktop e mobile sem overflow;
- navegação interna aponta para seções existentes;
- exatamente dois CTAs de WhatsApp na home;
- apenas um link externo de Instagram visível por ícone;
- WhatsApp abre destino correto;
- Instagram abre perfil correto;
- logo retorna ao início;
- axe sem violações;
- teclado, foco, zoom de 200% e 320 CSS px revisados;
- imagens carregam sem distorção ou layout shift relevante;
- inspeção manual confirma ausência de aparência padrão de hyperlink.

## 18. Dados obrigatórios antes da conclusão

A implementação não pode ser considerada pronta para produção sem:

- número definitivo do WhatsApp;
- link definitivo do Instagram;
- região atendida;
- confirmação sobre horários de atendimento;
- quantidade exata de anos de experiência, caso seja publicada;
- nomes, funções e credenciais dos profissionais, caso sejam publicados;
- logo em melhor formato, preferencialmente SVG ou PNG transparente em alta resolução;
- seleção final de fotografias;
- confirmação de autorização de publicação das imagens.

Informações ausentes devem ser omitidas ou tratadas como pendência explícita. Não inventar valores para preencher layout.

## 19. Fora do escopo

- formulário próprio;
- backend, banco de dados ou API;
- agendamento;
- CMS ou painel administrativo;
- preços;
- feed do Instagram;
- carrossel ou lightbox;
- vídeo;
- analytics;
- avaliações ou depoimentos sem material real;
- mapa ou endereço residencial;
- área autenticada;
- novo preset de nicho;
- dependências de ícones, animação ou galeria;
- promessas quantitativas de redução de lesões, afastamentos ou aumento de produtividade.

## 20. Definição de pronto

A implementação estará concluída quando:

- todo conteúdo fictício do template tiver sido removido;
- os dados reais disponíveis estiverem configurados em fonte única;
- a composição final respeitar a ordem e os limites de CTA desta spec;
- a linguagem tiver sido revisada manualmente;
- assets estiverem autorizados, otimizados e corretamente descritos;
- links, ícones, foco e estados visitados atenderem aos critérios de UI/UX;
- SEO refletir somente dados reais;
- não houver dependência nova;
- os comandos abaixo forem executados com sucesso:

```bash
npm run lint
npm run typecheck
npm test
SITE_DEPLOY_ENV=preview npm run build
npm run validate:static
npm run test:e2e
```

- a revisão manual de acessibilidade, responsividade e densidade visual estiver registrada;
- qualquer dado ainda pendente estiver explicitamente informado no relatório final, sem alegação de produção concluída.
