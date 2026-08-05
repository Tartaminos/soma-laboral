# 1. Título

Convenções de imagens e assets

**Status:** Aprovada para implementação

## 2. Contexto

Sites de negócios locais dependem de logo, fotografias, imagens de serviços, produtos e profissionais. Sem convenções, cada cliente tende a adicionar arquivos grandes, nomes genéricos, proporções imprevisíveis e textos alternativos inconsistentes. A estratégia também precisa permanecer compatível com o build estático e com os hosts inicialmente aprovados.

Esta spec define contratos e organização de assets sem introduzir armazenamento remoto, CDN própria ou pipeline complexo de mídia.

## 3. Objetivo

Estabelecer uma estratégia local, acessível, previsível e compatível com exportação estática para imagens, marca, ícones e documentos públicos, incluindo contratos tipados, regras de fallback e uso controlado da solução de imagens do Next.js.

## 4. Escopo

- Organizar assets públicos em categorias de marca, imagens de conteúdo, ícones e documentos.
- Definir convenções de nomes, formatos, dimensões, proporção e tamanho.
- Consolidar o contrato tipado de referência de imagem usado pelo conteúdo.
- Distinguir imagem informativa de imagem decorativa.
- Definir regras para texto alternativo.
- Criar um componente fundamental de imagem, caso necessário, sobre a API do Next.js, sem ocultar seus contratos importantes.
- Definir comportamento quando imagem opcional estiver ausente.
- Definir política inicial para imagens locais e declarar imagens remotas fora do padrão.
- Preparar compatibilidade com `output: "export"`, cuja configuração final pertence à spec 14.
- Documentar responsabilidade do desenvolvedor ao substituir assets demonstrativos.

## 5. Fora do escopo

- Upload de arquivos, CMS, armazenamento em nuvem, transformação em runtime ou CDN própria.
- Imagens remotas por padrão.
- Editor de corte, geração automática de thumbnails ou reconhecimento de conteúdo.
- Biblioteca completa de ícones.
- Vídeo, áudio ou streaming.
- Geração dinâmica de Open Graph, que será tratada na spec 11 quando aplicável.
- Pipeline de compressão sofisticado ou serviço externo de otimização.
- Galeria interativa, lightbox ou carrossel.

## 6. Requisitos funcionais

- Assets públicos devem ficar sob diretórios claros para marca, imagens, ícones e documentos.
- Nomes de arquivo devem ser descritivos, estáveis, em `kebab-case`, sem espaços e sem nomes como `image1` ou `final-final`.
- Imagens informativas devem exigir texto alternativo significativo no contrato.
- Imagens decorativas devem ser explicitamente identificadas como decorativas e não anunciar conteúdo redundante.
- Toda imagem deve fornecer dimensões conhecidas ou uma proporção de layout controlada, evitando layout shift.
- O contrato deve distinguir origem, descrição acessível, dimensões, prioridade de carregamento quando realmente necessária e intenção decorativa.
- A prioridade de carregamento deve ser reservada a imagens críticas do conteúdo inicial, nunca aplicada indiscriminadamente.
- Imagens opcionais ausentes devem permitir que a seção preserve compreensão e layout aceitável sem placeholder obrigatório.
- Um caminho local inexistente deve ser detectado por build, teste ou validação dedicada sempre que tecnicamente viável.
- Documentos públicos devem possuir nomes legíveis e links com indicação clara de formato ou finalidade quando necessário.
- Imagens remotas não devem ser aceitas silenciosamente pelo contrato inicial.

## 7. Requisitos não funcionais

- Compatibilidade com Next.js 16.2.12 e com a documentação instalada.
- Compatibilidade com exportação estática e hospedagem sem servidor Next.js.
- Acessibilidade alinhada à WCAG 2.2 nível AA.
- Prevenção de CLS por dimensões ou proporção conhecidas.
- Assets devem ser otimizados antes do commit e adequados ao uso real.
- Não adicionar dependência de processamento de imagem.
- Componentes estáticos devem permanecer Server Components.
- Não expor segredos ou documentos privados em `public`.
- Caminhos e contratos devem permanecer portáveis entre Netlify e Cloudflare Pages.

## 8. Decisões arquiteturais

- O contrato de mídia pertence a `domain/content` ou `domain/assets`, sem importar React ou Next.js.
- As referências concretas pertencem à camada `site`, enquanto os arquivos físicos ficam em `public`.
- O uso de `next/image` deve ser preservado quando compatível com a versão instalada e com exportação estática. A spec 14 definirá a configuração global necessária, preferindo a solução mais simples e neutra de provedor para assets locais.
- O componente compartilhado de imagem, se criado, deve apenas consolidar acessibilidade e contratos recorrentes; não deve se tornar um wrapper universal com dezenas de opções.
- Não haverá URL remota no contrato padrão. Uma futura necessidade remota exigirá origem permitida, política de segurança, fallback e nova avaliação de build.
- Ícones puramente decorativos devem ser ignorados por tecnologia assistiva. Ícones que comunicam informação precisam de nome acessível no controle ou texto adjacente.
- Logos possuem tratamento semântico conforme contexto: podem ser informativos quando representam o negócio ou decorativos quando o nome já está presente e a repetição não agrega valor.
- Assets privados não pertencem a `public`; esta spec não cria mecanismo alternativo para arquivos privados.

## 9. Estrutura impactada

- `public/brand`: logos e variações aprovadas.
- `public/images`: imagens de conteúdo organizadas por finalidade quando necessário.
- `public/icons`: somente ícones locais realmente utilizados.
- `public/documents`: documentos deliberadamente públicos.
- `src/domain`: contrato consolidado de imagem ou asset.
- `src/site`: referências concretas aos assets do cliente.
- `src/components/ui`: primitive de imagem apenas se houver repetição real.
- Validação de paths e assets quando implementada sem dependência desproporcional.

## 10. Fluxo esperado

### Desenvolvedor que configura um cliente

1. Otimiza e renomeia os arquivos antes de adicioná-los.
2. Coloca cada asset no diretório público correspondente.
3. Registra a referência tipada no módulo de conteúdo ou marca.
4. Informa texto alternativo para imagem informativa ou marca explicitamente como decorativa.
5. Define dimensões ou proporção esperada.
6. Executa validações e corrige paths inexistentes ou arquivos excessivos.

### Aplicação durante build ou runtime

1. Conteúdo e seções recebem referências tipadas.
2. A primitive ou o componente da seção traduz a referência para a API de imagem do Next.js.
3. O build gera saída compatível com hospedagem estática.
4. Imagens não críticas carregam progressivamente; imagens críticas são priorizadas de forma explícita.

### Usuário final

1. Visualiza imagens sem mudanças bruscas de layout.
2. Recebe descrição acessível quando a imagem comunica informação.
3. Continua compreendendo a página quando uma imagem opcional não existe.

## 11. Critérios de aceite

- Dado que uma imagem informativa é configurada, quando o typecheck é executado, então um texto alternativo não vazio é exigido.
- Dado que uma imagem é decorativa, quando renderizada, então ela não repete informação para tecnologia assistiva.
- Dado que uma imagem é exibida, quando a página carrega, então existe dimensão ou proporção conhecida e não ocorre layout shift evidente causado pelo asset.
- Dado que uma imagem opcional é omitida, quando a seção correspondente é renderizada, então o conteúdo textual permanece compreensível e o layout não quebra.
- Dado que um path local não existe, quando a validação ou build aplicável é executado, então a falha é reportada com o path.
- Dado que os diretórios públicos são revisados, então não existem documentos privados, credenciais ou assets demonstrativos não utilizados.
- Dado que a configuração estática da spec 14 é aplicada, quando `npm run build` é executado, então o uso de imagens locais não exige runtime de otimização.
- Dado que uma URL remota é fornecida ao contrato padrão, então ela é rejeitada ou exige decisão explícita fora desta spec.

## 12. Cenários de erro e borda

- Arquivo inexistente, corrompido ou com extensão incorreta.
- Imagem muito pesada para sua posição na página.
- Proporção extrema que distorce o layout.
- Texto alternativo genérico como “imagem” ou duplicação literal do texto adjacente.
- Imagem decorativa anunciada por leitor de tela.
- Imagem crítica configurada com carregamento tardio.
- Todas as imagens marcadas como prioritárias.
- Query string em caminho local sem configuração específica compatível com Next.js 16.
- Logo sem contraste sobre a superfície configurada.
- Documento colocado em `public` apesar de não dever ser público.

## 13. Estratégia de testes

- Testes unitários futuros devem cobrir invariantes do contrato informativo versus decorativo.
- Testes de componentes devem verificar `alt`, dimensões, prioridade e ausência opcional.
- Testes de integração devem renderizar imagens em seções reais e confirmar compatibilidade com o tema.
- Testes end-to-end ou auditorias devem observar CLS e carregamento das imagens críticas.
- Validação manual deve cobrir paths quebrados, imagens ausentes, proporções variadas, leitores de tela e zoom.
- O build estático da spec 14 será o gate definitivo de compatibilidade.

## 14. Definição de pronto

- Diretórios públicos e convenções documentados e aplicados.
- Contrato de asset consolidado e usado pelo conteúdo.
- Semântica informativa e decorativa implementada.
- Dimensões ou proporção obrigatórias conforme o caso.
- Comportamento sem imagem opcional definido.
- Estratégia local compatível com exportação estática preparada.
- Nenhuma imagem remota, pipeline externo ou dependência adicionada.
- Assets demonstrativos não utilizados removidos apenas quando substituídos pelo escopo.
- Lint, typecheck, testes disponíveis e build executados com sucesso.

## 15. Instruções para o Codex

- Ler `AGENTS.md`, arquitetura, guideline e specs 01–04 implementadas.
- Consultar a documentação local de `next/image` e static export para Next.js 16.2.12.
- Implementar apenas contratos, convenções, assets e primitive mínima necessária.
- Não adicionar CDN, loader remoto, CMS, upload ou biblioteca de otimização.
- Não atualizar dependências ou lockfile.
- Preservar Server Components e usar `"use client"` somente se uma interação real exigir, o que não é esperado aqui.
- Preservar TypeScript estrito, CSS Modules e tokens semânticos.
- Não mascarar path inexistente com fallback genérico silencioso.
- Não colocar arquivos privados em `public`.
- Executar lint, typecheck, testes e build conforme disponíveis.
- Revisar o diff e informar ambiguidades e validações não executadas.
- Não afirmar que um comando passou sem executá-lo.
