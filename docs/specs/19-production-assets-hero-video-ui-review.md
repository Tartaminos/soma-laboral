# 1. Título

Ativação dos assets finais, hero com vídeo e revisão geral de UI

**Status:** Aprovada para implementação

## 2. Contexto

A primeira implementação da SPA da Soma Laboral, definida pela spec 18, já foi realizada.

A estrutura principal da página, o conteúdo editorial, o tema, a composição explícita, o contato reutilizável e as regras iniciais de acessibilidade já existem.

Após essa implementação, foram disponibilizados no repositório:

- logo oficial;
- três fotografias para a seção “Soma em ação”;
- um vídeo em formato MP4 para o hero.

Também foram confirmados:

- WhatsApp oficial: `+55 19 99746-2703`;
- Instagram oficial: `somaginasticalaboral`;
- domínio definitivo: `https://somalaboral.com.br`;
- região de atendimento: `Americana/SP`;
- atendimento de segunda a sexta, em horário comercial.

O domínio já está configurado na Cloudflare. Esta spec não deve alterar DNS nem infraestrutura de hospedagem.

Além da ativação desses dados e assets, a interface atual precisa passar por uma revisão geral de alinhamento, proporção, ritmo vertical e comportamento responsivo.

Esta spec complementa a spec 18. Ela não autoriza reconstrução integral do projeto nem mudança de arquitetura.

## 3. Objetivo

Entregar uma versão visual e tecnicamente pronta para produção que:

- utilize o domínio definitivo;
- habilite os dois contatos por WhatsApp previstos na spec 18;
- apresente o Instagram oficial por ícone;
- informe a região e a disponibilidade de atendimento;
- utilize a identidade visual oficial;
- apresente o vídeo no primeiro bloco da página;
- ative a seção “Soma em ação” com as três fotografias fornecidas;
- corrija desalinhamentos e inconsistências visuais da interface;
- apresente no rodapé a atribuição “Desenvolvido por Contestech”;
- preserve acessibilidade, performance e exportação estática;
- continue compatível com Cloudflare Pages.

## 4. Escopo

Esta implementação deve abranger:

1. configuração dos dados oficiais;
2. configuração definitiva de SEO e domínio;
3. preparação e organização dos assets;
4. suporte tipado a vídeo no hero;
5. composição responsiva do hero;
6. ativação da seção “Soma em ação”;
7. revisão geral do grid e dos alinhamentos;
8. revisão do header, serviços, diferenciais, contato e footer;
9. geração ou substituição do favicon;
10. atribuição da Contestech no rodapé;
11. atualização dos testes e da documentação de prontidão.

## 5. Dados oficiais

### 5.1 WhatsApp

Configurar como fonte única:

`+55 19 99746-2703`

O link produzido deve usar somente dígitos:

`https://wa.me/5519997462703`

Os dois CTAs visíveis devem continuar usando o texto:

`Contato por WhatsApp`

A mensagem pré-preenchida permanece:

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

Não exibir o número como um terceiro link textual na seção de contato ou no footer.

O número deve constar nos dados estruturados do negócio.

### 5.2 Instagram

Configurar:

- identificador: `instagram`;
- perfil: `https://www.instagram.com/somaginasticalaboral/`;
- nome acessível: `Abrir Instagram da Soma Laboral`.

O Instagram deve continuar aparecendo apenas como ícone na seção de contato.

Não repetir o Instagram:

- no header;
- no footer;
- na galeria;
- em botão textual separado.

### 5.3 Região atendida

Exibir:

`Americana/SP`

Não inventar endereço físico, bairro, CEP ou coordenadas.

A informação deve ser modelada como região de atendimento, e não como `Address`.

Os dados estruturados podem usar `areaServed` equivalente a:

```json
{
  "@type": "City",
  "name": "Americana",
  "addressRegion": "SP",
  "addressCountry": "BR"
}
```

### 5.4 Horário de atendimento

Exibir humanamente:

`Segunda a sexta, em horário comercial.`

Não converter “horário comercial” arbitrariamente para `08:00–18:00`, `09:00–18:00` ou qualquer outro intervalo.

Enquanto horários exatos não forem informados:

- não gerar `OpeningHoursSpecification`;
- não preencher `opens` e `closes` fictícios;
- não apresentar horário numérico na página.

Criar um campo textual apropriado, como `availabilityText`, em vez de utilizar incorretamente o contrato atual de horários exatos.

## 6. Domínio, indexação e SEO

### 6.1 URL base

Configurar:

`https://somalaboral.com.br`

Remover:

- `https://example.com`;
- comentários que tratem o domínio como pendente;
- canonical temporário.

### 6.2 Ambiente de produção

O domínio e a zona DNS já estão configurados na Cloudflare.

Esta implementação não deve:

- alterar DNS;
- recriar o projeto na Cloudflare;
- adicionar tokens ao repositório;
- criar outro provedor de hospedagem.

Deve ser verificado que o build de produção usa:

`SITE_DEPLOY_ENV=production`

### 6.3 Metadata

Configuração recomendada:

**Título padrão**

`Soma Laboral | Ginástica Laboral em Americana`

**Descrição**

`Ginástica Laboral, Quick Massage e ações para SIPAT em Americana/SP, com atividades organizadas para a rotina e as necessidades de cada equipe.`

Evitar repetição artificial de palavras-chave.

### 6.4 Open Graph

Gerar uma imagem social local com:

- dimensão final de `1200 × 630`;
- fotografia real;
- marca legível;
- pouco ou nenhum texto adicional;
- compressão adequada para web.

Caminho sugerido:

`/images/social/soma-laboral-og.webp`

Configurar essa imagem como `socialImage`.

### 6.5 Dados estruturados

Manter:

`ProfessionalService`

Adicionar ou confirmar:

- nome;
- descrição;
- URL definitiva;
- telefone;
- logo;
- Instagram em `sameAs`;
- `areaServed` para Americana/SP.

Não incluir:

- endereço físico inventado;
- coordenadas;
- preço;
- avaliações;
- nota média;
- horário numérico não confirmado.

## 7. Organização e preparação dos assets

Os arquivos atuais não devem ser consumidos diretamente com seus nomes originais.

### 7.1 Problemas atuais

Existem arquivos com:

- espaços;
- espaço antes da extensão;
- parênteses;
- letras maiúsculas;
- underscores;
- nomes sem significado editorial.

Arquivos atuais:

- `PHOTO-2024-08-06-17-02-59 (4).jpg`;
- `atividade em grupo .jpg`;
- `atividade_grupo_de_pessoas.jpg`;
- `logo.jpg`;
- `soma_laboral.mp4`.

### 7.2 Organização final sugerida

```text
public/
├── brand/
│   ├── soma-laboral-logo.webp
│   └── soma-laboral-mark.webp
├── images/
│   ├── hero/
│   │   ├── soma-laboral-hero.mp4
│   │   └── soma-laboral-hero-poster.webp
│   ├── portfolio/
│   │   ├── ginastica-laboral-equipe-01.webp
│   │   ├── ginastica-laboral-equipe-02.webp
│   │   └── ginastica-laboral-equipe-03.webp
│   └── social/
│       └── soma-laboral-og.webp
```

### 7.3 Fotografias disponíveis

As dimensões originais identificadas são:

| Arquivo atual | Dimensões |
|---|---:|
| `PHOTO-2024-08-06-17-02-59 (4).jpg` | `1600 × 1204` |
| `atividade em grupo .jpg` | `1600 × 720` |
| `atividade_grupo_de_pessoas.jpg` | `1600 × 720` |
| `logo.jpg` | `500 × 500` |

As fotografias devem ser convertidas para WebP ou formato local equivalente já suportado pelo projeto.

Como o projeto utiliza exportação estática e imagens não otimizadas pelo servidor, a compressão deve acontecer antes do commit.

### 7.4 Arquivos originais

Depois da geração e validação dos assets finais:

- remover os arquivos com nomes antigos de `public`;
- não manter cópias duplicadas publicamente acessíveis;
- preservar somente os arquivos realmente utilizados pela aplicação.

### 7.5 Metadados e privacidade

Antes do commit:

- remover EXIF desnecessário;
- remover localização;
- conferir dados de dispositivo;
- verificar crachás, documentos, telas ou dados empresariais visíveis;
- confirmar autorização de uso das pessoas identificáveis.

## 8. Logo e identidade

### 8.1 Asset original

O arquivo recebido é quadrado e contém a identidade completa da Soma Laboral.

Ele não deve ser reduzido diretamente para aproximadamente 40 pixels no header, pois o texto interno ficará ilegível.

### 8.2 Derivados

Gerar dois assets sem redesenhar a marca.

#### Logo completo

`public/brand/soma-laboral-logo.webp`

Uso:

- dados estruturados;
- documentação;
- imagem social;
- aplicações em que haja espaço suficiente.

#### Símbolo da marca

`public/brand/soma-laboral-mark.webp`

Uso:

- header;
- favicon;
- espaços compactos.

O símbolo deve ser obtido por recorte limpo da marca original. Não criar outro símbolo, alterar cores ou redesenhar formas.

### 8.3 Header

O header deve apresentar:

- símbolo da marca;
- texto visível `Soma Laboral`.

Não renderizar simultaneamente:

- o logo completo com seu texto interno;
- outro texto `Soma Laboral` imediatamente ao lado.

### 8.4 Favicon

Substituir favicon removido ou genérico por versão derivada do símbolo oficial.

Validar:

- 16 × 16;
- 32 × 32;
- visualização em fundo claro e escuro;
- ausência de detalhes ilegíveis.

## 9. Suporte tipado a vídeo

### 9.1 Problema atual

O contrato do hero suporta somente texto, ações e imagem opcional. Não existe contrato de vídeo.

O MP4 não deve ser inserido por hardcode diretamente dentro do componente do hero.

### 9.2 Contrato de mídia

Adicionar um contrato explícito de vídeo local na camada de assets.

Conceitualmente:

```ts
interface VideoAsset {
  readonly src: `/${string}`;
  readonly poster: ImageAsset;
  readonly width: number;
  readonly height: number;
  readonly decorative: true;
}
```

O hero deve receber mídia discriminada:

```ts
type HeroMedia =
  | {
      readonly type: "image";
      readonly asset: ImageAsset;
    }
  | {
      readonly type: "video";
      readonly asset: VideoAsset;
    };
```

Atualizar consumidores existentes do hero para o novo contrato.

Não permitir simultaneamente imagem e vídeo sem regra clara.

### 9.3 Limite da abstração

Não criar:

- player genérico;
- biblioteca de vídeo;
- galeria de vídeos;
- provider de mídia;
- registry;
- suporte antecipado a YouTube, Vimeo ou streaming;
- controles configuráveis sem uso real.

## 10. Preparação do vídeo

### 10.1 Inspeção obrigatória

Antes de referenciar o vídeo, verificar:

- largura e altura;
- orientação;
- duração;
- codec;
- taxa de quadros;
- presença de áudio;
- tamanho do arquivo.

Registrar dimensões reais no contrato.

### 10.2 Formato final

O arquivo final deve:

- permanecer em MP4;
- utilizar codec H.264 compatível com navegadores modernos;
- ter no máximo 720p quando suficiente para o tamanho de exibição;
- usar 24 ou 30 FPS;
- não conter trilha de áudio;
- ser otimizado para carregamento progressivo;
- possuir tamanho preferencial entre 4 e 6 MB;
- não ultrapassar 8 MB sem justificativa registrada.

Caso o vídeo original seja longo, editar trecho curto e contínuo, preferencialmente entre 10 e 20 segundos.

Não acelerar artificialmente as pessoas.

### 10.3 Poster

Gerar poster a partir de frame:

- nítido;
- representativo;
- sem desfoque de movimento;
- sem expressões ou posições inadequadas;
- com a mesma proporção do vídeo.

O poster deve aparecer antes do vídeo estar pronto.

## 11. Comportamento do vídeo

O vídeo deve ser tratado como mídia visual decorativa, pois o conteúdo essencial já está no texto do hero.

Requisitos:

- `muted`;
- `playsInline`;
- loop;
- sem controles visíveis;
- sem foco pelo teclado;
- sem trilha de áudio;
- `preload="metadata"`;
- poster obrigatório.

### 11.1 Movimento reduzido

Quando o visitante utilizar `prefers-reduced-motion: reduce`, o vídeo não deve iniciar automaticamente.

Deve permanecer no poster ou pausado.

Não basta esconder a animação por CSS enquanto o vídeo continua reproduzindo.

Pode ser criado um Client Component mínimo exclusivamente para:

- detectar preferência de movimento;
- iniciar o vídeo quando permitido;
- pausar quando movimento reduzido estiver ativo.

O restante do hero deve permanecer Server Component.

### 11.2 Economia de dados

Quando `navigator.connection.saveData` estiver disponível e ativo, priorizar o poster e não iniciar reprodução automática.

A ausência dessa API não pode causar erro.

### 11.3 Falha de carregamento

Se o vídeo falhar:

- manter o poster;
- não deslocar o layout;
- não exibir controle quebrado;
- não remover o conteúdo textual.

## 12. Novo layout do hero

### 12.1 Desktop

Em telas largas, usar composição dividida:

- conteúdo textual à esquerda;
- vídeo à direita;
- alinhamento vertical central;
- colunas equilibradas;
- largura máxima coerente com o restante do site.

Proporção inicial recomendada:

```text
texto: 1.05fr
mídia: 0.95fr
```

O título deve continuar sendo:

`Bem-estar no trabalho começa com atenção às pessoas.`

### 12.2 Mobile

Ordem:

1. eyebrow;
2. título;
3. descrição;
4. CTA;
5. vídeo.

O vídeo não deve aparecer antes do título no DOM.

Não manter duas colunas em telas estreitas.

### 12.3 Frame do vídeo

O frame deve:

- preservar proporção real;
- ter bordas coerentes com a identidade;
- não ultrapassar altura útil da tela;
- evitar cantos excessivamente arredondados;
- utilizar `object-fit: cover` somente quando o corte tiver sido revisado;
- permitir `object-fit: contain` se vídeo vertical perder conteúdo relevante.

A escolha entre `cover` e `contain` deve ocorrer depois da inspeção do vídeo.

### 12.4 Altura do hero

Remover dependência de altura mínima excessiva em dispositivos móveis.

O hero não precisa ocupar uma tela inteira.

Usar:

- padding responsivo;
- conteúdo natural;
- altura mínima moderada somente em desktop, caso necessária.

## 13. Seção “Soma em ação”

### 13.1 Ativação

Criar três itens de portfólio com as fotografias fornecidas.

A navegação deve voltar a apresentar:

`Soma em ação`

A seção deve aparecer depois de “Como trabalhamos” e antes de “Sobre a Soma Laboral”.

### 13.2 Textos alternativos

Os textos alternativos devem ser escritos depois da inspeção visual de cada fotografia.

Cada `alt` deve descrever:

- o que está acontecendo;
- o ambiente relevante;
- a organização geral das pessoas;
- sem identificar pessoas nominalmente.

### 13.3 Quantidade

A versão inicial deve usar exatamente as três fotografias disponíveis.

Não duplicar imagens para atingir artificialmente a quantidade prevista anteriormente.

### 13.4 Layout em mosaico

As proporções disponíveis são diferentes:

- uma imagem próxima de 4:3;
- duas imagens panorâmicas.

Adicionar variante reutilizável:

`mosaic`

Composição desktop recomendada:

```text
┌──────────────────┬──────────────────┐
│                  │ imagem panorâmica│
│ imagem principal ├──────────────────┤
│                  │ imagem panorâmica│
└──────────────────┴──────────────────┘
```

A primeira fotografia deve ocupar a área principal, desde que sua qualidade e conteúdo justifiquem o destaque.

Em telas pequenas:

- uma coluna;
- ordem do DOM preservada;
- proporção natural;
- sem posicionamento absoluto;
- sem JavaScript de layout.

### 13.5 Aparência

A seção não deve parecer coleção de três cards comerciais.

Para a variante `mosaic`:

- evitar padding branco largo ao redor das fotografias;
- evitar sombras pesadas;
- usar borda ou raio discretos;
- permitir legenda curta abaixo ou sobre área sólida, nunca exclusivamente por hover;
- manter `figure` e `figcaption`.

Não adicionar:

- carrossel;
- lightbox;
- modal;
- zoom;
- autoplay;
- clique sem destino;
- filtros;
- integração com Instagram.

## 14. Revisão geral de grid e alinhamento

### 14.1 Problema estrutural atual

O projeto utiliza larguras diferentes para header, seções e contato, criando linhas verticais inconsistentes.

### 14.2 Regra de alinhamento

Header, hero e conteúdo principal devem compartilhar a mesma grade externa.

Definir largura de conteúdo principal única, próxima de `72rem` a `76rem`.

A implementação deve escolher valor único após testar vídeo e fotografias.

Não manter simultaneamente:

- header em `84rem`;
- hero em outro limite;
- seções em `72rem`;
- contato em `48rem` sem necessidade editorial.

### 14.3 Bordas da composição

Devem compartilhar o mesmo eixo inicial:

- logo do header;
- texto do hero;
- títulos das seções;
- grids de cards;
- conteúdo do contato;
- conteúdo principal do footer.

Textos podem possuir `max-width` de leitura, mas esse limite não deve mudar o alinhamento externo da seção.

### 14.4 Ritmo vertical

Revisar uso de gaps muito grandes entre título e conteúdo.

Usar internamente algo próximo de:

`clamp(2rem, 4vw, 3rem)`

Não alterar globalmente todos os tokens apenas para corrigir uma seção.

Priorizar classes locais e mudanças controladas.

### 14.5 Fundos das seções

Criar alternância visual intencional:

1. hero — fundo principal;
2. serviços — fundo alternativo;
3. como trabalhamos — fundo principal;
4. Soma em ação — fundo alternativo;
5. sobre — fundo principal;
6. contato — fundo alternativo;
7. footer — fundo escuro.

## 15. Header

### 15.1 Container

Usar a mesma largura máxima do hero e das seções.

### 15.2 Altura

A altura deve acomodar símbolo oficial sem comprimir navegação.

Manter aproximadamente entre `4.75rem` e `5.25rem`.

### 15.3 Marca

Apresentar:

- símbolo;
- `Soma Laboral`.

Garantir:

- imagem sem distorção;
- altura previsível;
- texto verticalmente centralizado;
- ausência de quebra em duas linhas em larguras normais.

### 15.4 Navegação

Manter no máximo:

- Serviços;
- Como trabalhamos;
- Soma em ação;
- Contato.

Não adicionar CTA no header.

### 15.5 Sticky header

Manter header sticky.

Garantir fundo suficientemente opaco para que o vídeo não prejudique leitura do menu.

Não depender exclusivamente de `backdrop-filter`.

## 16. Serviços

### 16.1 Grid

Em desktop:

- três colunas iguais;
- alturas visuais equivalentes;
- alinhamento superior consistente.

Em tablet:

- duas colunas quando houver espaço suficiente;
- o terceiro item não deve parecer perdido ou possuir largura incoerente.

Em mobile:

- uma coluna.

Evitar que `auto-fit` gere composições imprevisíveis entre larguras próximas.

### 16.2 Destaque

Ginástica Laboral permanece em destaque.

O destaque deve usar borda, pequeno acento ou fundo levemente diferente.

Não aumentar o card de forma que quebre a linha dos demais.

### 16.3 Densidade

Os cards não devem possuir:

- botões;
- ícones genéricos;
- badges;
- textos adicionais inventados.

## 17. “Como trabalhamos”

A página já utiliza muitos blocos com aparência de card.

Para reduzir repetição visual, mudar essa seção para apresentação mais leve.

Direção recomendada:

- três colunas editoriais em desktop;
- marcador ou borda lateral em vermelho;
- sem superfície branca completa;
- sem sombra;
- títulos alinhados;
- descrições com largura semelhante.

Pode ser utilizada ou aprimorada a variante `inline`.

Não utilizar a mesma aparência dos cards de serviços.

## 18. Sobre a Soma Laboral

Manter os dois parágrafos aprovados.

Requisitos:

- largura confortável de leitura;
- alinhamento com as demais seções;
- título e parágrafos no mesmo eixo;
- espaçamento consistente;
- não deixar grande espaço vazio causado por container muito largo.

Não reutilizar uma das três fotografias da galeria apenas para preencher espaço.

Não inventar:

- anos de experiência;
- nomes;
- formação;
- certificações;
- clientes atendidos.

## 19. Contato

### 19.1 Variante

Alterar composição final para `split`.

### 19.2 Coluna esquerda

Apresentar:

- título;
- descrição;
- botão `Contato por WhatsApp`;
- ícone do Instagram.

### 19.3 Coluna direita

Apresentar bloco de informações operacionais:

**Região atendida**

`Americana/SP`

**Disponibilidade**

`Segunda a sexta, em horário comercial.`

### 19.4 Layout

Em desktop:

- duas colunas equilibradas;
- alinhamento superior;
- sem limitar toda a seção a `48rem`.

Em mobile:

- conteúdo empilhado;
- CTA antes das informações operacionais;
- ícone do Instagram próximo ao CTA;
- nenhum overflow.

### 19.5 Links

Manter:

- botão de WhatsApp como link real;
- Instagram como link por ícone;
- foco perceptível;
- estados visitados usando identidade da marca.

Não transformar região e disponibilidade em links.

## 20. Footer e atribuição da Contestech

### 20.1 Conteúdo principal

Manter footer compacto com:

- nome Soma Laboral;
- descrição curta;
- navegação essencial;
- copyright.

Não repetir:

- WhatsApp;
- Instagram;
- região;
- horários.

### 20.2 Atribuição obrigatória

No final do footer, abaixo ou ao lado do copyright conforme o espaço disponível, exibir:

`Desenvolvido por Contestech`

A frase inteira deve ser um link real para:

`https://contestech.com.br/`

Requisitos:

- texto visível exatamente como definido;
- link sem aparência azul ou roxa padrão do navegador;
- cor coerente com o footer;
- contraste suficiente;
- foco por teclado claramente visível;
- sublinhado no hover ou outro sinal adicional além da cor;
- área clicável confortável sem transformar o crédito em botão chamativo;
- não usar ícone externo desnecessário;
- não usar `nofollow`;
- não incluir parâmetros de rastreamento;
- não duplicar o link em outra seção da página.

O crédito deve ser discreto, mas legível. Não reduzir a opacidade a ponto de prejudicar contraste.

O link deve abrir na mesma aba, salvo decisão posterior explícita.

### 20.3 Grid

O layout deve considerar apenas filhos realmente existentes.

Não reservar terceira coluna vazia para canais que não serão renderizados.

Em desktop, usar no máximo:

- uma coluna de marca;
- uma coluna de navegação.

### 20.4 Alinhamento

O conteúdo do footer deve começar no mesmo eixo do conteúdo principal.

## 21. Links e estados interativos

Preservar regras da spec 18:

- nenhum azul padrão de hyperlink;
- nenhum roxo padrão de link visitado;
- navegação sem aparência de link de artigo;
- links inline identificáveis além da cor;
- foco por teclado visível;
- alvo mínimo de 44 × 44 CSS px para ícones e controles.

Não aplicar remoção global de sublinhado sem tratamento específico por contexto.

## 22. Performance

### 22.1 Meta inicial

A primeira visualização deve carregar:

- HTML;
- CSS;
- poster;
- logo;
- fontes de sistema.

O vídeo não deve bloquear apresentação do texto.

### 22.2 Imagens

- usar dimensões reais;
- evitar imagens maiores que o necessário;
- não marcar as três fotografias do portfólio como prioritárias;
- marcar como prioritário somente poster ou mídia realmente crítica, quando necessário;
- evitar layout shift.

### 22.3 Vídeo

- `preload="metadata"`;
- poster obrigatório;
- sem áudio;
- arquivo otimizado;
- reprodução somente depois que o componente estiver montado e as preferências forem verificadas.

### 22.4 Dependências

Não adicionar dependência para:

- vídeo;
- compressão em runtime;
- galeria;
- ícones;
- animação;
- layout.

A preparação de mídia deve ocorrer antes do commit.

## 23. Acessibilidade

### 23.1 Vídeo

Como o vídeo é decorativo:

- `aria-hidden="true"` ou tratamento equivalente;
- sem controle no tab order;
- sem áudio;
- conteúdo essencial presente no texto;
- poster quando movimento reduzido estiver ativo.

### 23.2 Imagens

- `alt` específico;
- nenhuma informação essencial somente na imagem;
- legendas legíveis;
- sem texto sobre áreas visualmente instáveis.

### 23.3 Responsividade

Validar:

- 320 px;
- 375 px;
- 768 px;
- 1024 px;
- 1440 px;
- zoom de 200%.

### 23.4 Teclado

Validar:

- abertura e fechamento do menu;
- retorno de foco;
- CTA de WhatsApp;
- Instagram;
- crédito da Contestech;
- skip link;
- navegação interna.

## 24. Estrutura impactada

Arquivos que poderão ser alterados:

- `docs/specs/README.md`;
- `docs/specs/19-production-assets-hero-video-ui-review.md`;
- `docs/SOMA_LABORAL_READINESS.md`;
- `src/domain/assets.ts`;
- `src/domain/sections.ts`;
- `src/domain/business.ts`, caso seja necessário contrato reutilizável de área de atendimento;
- `src/composition/seo.ts`;
- `src/app/page.tsx`;
- `src/app/favicon.ico` ou convenção equivalente do App Router;
- `src/site/config/site-settings.ts`;
- `src/site/business/business.ts`;
- `src/site/assets/brand.ts`;
- `src/site/content/actions.ts`;
- `src/site/content/portfolio.ts`;
- `src/site/pages/home-content.ts`;
- `src/site/seo/seo.ts`;
- `src/sections/hero/hero.tsx`;
- `src/sections/hero/hero.module.css`;
- novo componente mínimo de vídeo do hero;
- `src/sections/site-header/site-header.tsx`;
- `src/sections/site-header/site-header.module.css`;
- `src/sections/services/services.module.css`;
- `src/sections/highlights/highlights.tsx`;
- `src/sections/highlights/highlights.module.css`;
- `src/sections/portfolio/portfolio.tsx`;
- `src/sections/portfolio/portfolio.module.css`;
- `src/sections/contact/contact.tsx`;
- `src/sections/contact/contact.module.css`;
- `src/sections/site-footer/site-footer.tsx`;
- `src/sections/site-footer/site-footer.module.css`;
- `src/components/layout/layout.module.css`;
- `scripts/validate-static.mjs`;
- testes unitários, de integração e E2E afetados;
- assets públicos finais.

Não alterar arquivos fora desse escopo apenas para refatoração ou padronização geral.

## 25. Testes

### 25.1 Configuração e conteúdo

Validar:

- `baseUrl` igual a `https://somalaboral.com.br`;
- número normalizado;
- link do WhatsApp;
- mensagem codificada;
- Instagram oficial;
- região Americana/SP;
- disponibilidade textual;
- ausência de endereço inventado;
- ausência de horário numérico inventado.

### 25.2 Hero

Validar:

- título principal;
- presença da mídia `video`;
- caminho local do MP4;
- poster;
- `muted`;
- `playsInline`;
- ausência de áudio;
- fallback por poster;
- conteúdo textual antes da mídia no DOM.

### 25.3 Movimento reduzido

Em E2E:

```ts
await page.emulateMedia({ reducedMotion: "reduce" });
```

Confirmar que o vídeo:

- não inicia automaticamente;
- permanece pausado ou no poster;
- não causa erro no console.

### 25.4 Portfólio

Validar:

- exatamente três itens;
- IDs únicos;
- dimensões reais;
- imagens locais;
- seção presente;
- link `Soma em ação` presente;
- imagens carregadas;
- ordem do DOM preservada;
- ausência de lightbox ou controles falsos.

### 25.5 Contato

Validar:

- exatamente dois CTAs textuais de WhatsApp na home;
- exatamente um link do Instagram;
- região visível;
- disponibilidade visível;
- telefone não duplicado como terceiro link;
- nenhum endereço físico renderizado.

### 25.6 Footer

Validar:

- texto `Desenvolvido por Contestech` presente exatamente uma vez;
- `href` igual a `https://contestech.com.br/`;
- link abre na mesma aba;
- foco visível;
- link visitado não assume cor padrão do navegador;
- footer não possui coluna vazia.

### 25.7 SEO

Validar:

- canonical definitivo;
- sitemap com domínio definitivo;
- robots de produção;
- Open Graph;
- imagem social;
- telefone no JSON-LD;
- `sameAs`;
- `areaServed`;
- ausência de `OpeningHoursSpecification` com dados inventados.

### 25.8 UI e responsividade

Validar manualmente e por E2E:

- nenhum overflow horizontal;
- alinhamento externo consistente;
- header e seções no mesmo grid;
- hero sem colisões;
- cards com alturas coerentes;
- mosaico sem espaços acidentais;
- contato em duas colunas no desktop;
- footer sem espaços ou colunas vazias.

## 26. Critérios de aceite visual

A implementação será rejeitada se:

- o vídeo empurrar o título para fora do primeiro contexto visual;
- o vídeo tocar com áudio;
- o vídeo ignorar movimento reduzido;
- o header estiver mais largo que o conteúdo sem intenção clara;
- títulos de seções começarem em eixos diferentes;
- serviços e diferenciais parecerem duas cópias do mesmo grid de cards;
- a galeria apresentar três cards com proporções e alturas aleatórias;
- o contato permanecer como uma coluna estreita cercada por espaço vazio;
- o footer reservar coluna vazia;
- o crédito da Contestech estiver ilegível ou excessivamente chamativo;
- o link da Contestech usar aparência padrão de hyperlink;
- o logo completo ficar ilegível no header;
- as fotografias forem distorcidas;
- arquivos antigos com nomes inadequados continuarem públicos;
- o domínio temporário permanecer no build;
- dados não confirmados forem inventados.

## 27. Fora do escopo

- alteração de DNS;
- migração da Cloudflare;
- formulário próprio;
- backend;
- banco de dados;
- CMS;
- agendamento;
- analytics;
- preços;
- mapa;
- endereço físico;
- carrossel;
- lightbox;
- galeria de vídeos;
- player com controles avançados;
- áudio;
- depoimentos;
- novas páginas;
- redesign da marca;
- criação de nova logo;
- novas dependências;
- reestruturação completa da arquitetura.

## 28. Definição de pronto

A spec estará implementada quando:

- domínio definitivo estiver configurado;
- produção estiver indexável;
- WhatsApp estiver ativo nos dois pontos previstos;
- Instagram estiver ativo por ícone;
- região e disponibilidade estiverem visíveis;
- logo e favicon oficiais estiverem aplicados;
- vídeo otimizado estiver no hero;
- movimento reduzido estiver respeitado;
- poster funcionar como fallback;
- três fotografias estiverem em “Soma em ação”;
- assets estiverem renomeados, otimizados e sem metadados desnecessários;
- layout estiver alinhado nos viewports definidos;
- contato estiver organizado em duas colunas no desktop;
- footer não possuir espaços ou colunas vazias;
- rodapé apresentar `Desenvolvido por Contestech` com link correto;
- SEO e dados estruturados refletirem os dados reais;
- `docs/SOMA_LABORAL_READINESS.md` não listar como pendentes os dados resolvidos nesta spec;
- todos os testes aplicáveis passarem;
- revisão manual de UI/UX estiver registrada.

Executar:

```bash
npm run lint
npm run typecheck
npm test
SITE_DEPLOY_ENV=production npm run build
npm run validate:static
npm run test:e2e
```

Não declarar comando como aprovado sem executá-lo.
