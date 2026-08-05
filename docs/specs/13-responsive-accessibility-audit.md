# 1. Título

Auditoria de responsividade e acessibilidade

**Status:** Aprovada para implementação

## 2. Contexto

Acessibilidade e responsividade devem estar presentes em cada spec visual, mas a aplicação completa também precisa de uma auditoria transversal. Problemas de headings, âncoras, foco, contraste, reflow e conteúdo longo só aparecem quando tema, primitives, seções, compositor e presets funcionam juntos.

A auditoria não substitui a responsabilidade das implementações anteriores; ela identifica e corrige lacunas sistêmicas antes do deploy estático.

## 3. Objetivo

Auditar e corrigir a primeira versão completa para atender, dentro do escopo, à WCAG 2.2 nível AA e funcionar de forma robusta em celulares pequenos, tablets, notebooks, monitores amplos, zoom e diferentes quantidades de conteúdo.

## 4. Escopo

- Auditar os três presets em sua composição padrão.
- Auditar semântica, landmarks, headings e ordem de leitura.
- Auditar navegação por teclado, foco visível, foco não oculto e menu mobile.
- Auditar contraste de texto, controles, bordas essenciais e indicadores de foco.
- Auditar links, nomes acessíveis, imagens informativas e decorativas.
- Auditar reflow, zoom, aumento de fonte, orientação e overflow horizontal.
- Auditar áreas de toque e espaçamento entre alvos interativos.
- Auditar preferência de movimento reduzido.
- Auditar conteúdo longo, coleções de tamanhos diferentes e ausência de imagens opcionais.
- Executar axe via Playwright nos estados críticos.
- Executar validações manuais que automação não cobre.
- Corrigir defeitos encontrados dentro dos módulos responsáveis, sem criar camada paralela de patches globais.
- Documentar checklist e resultados da auditoria.

## 5. Fora do escopo

- Certificação legal ou auditoria externa formal.
- Conformidade com critérios AAA como requisito geral.
- Compatibilidade com navegadores obsoletos fora do suporte da versão instalada.
- Testes em toda combinação de dispositivo físico existente.
- Tradução para múltiplos idiomas.
- Reformulação visual completa ou novo design system.
- Funcionalidades futuras como formulários, pagamentos e autenticação.
- Adição de biblioteca visual para corrigir problemas que CSS e HTML nativo resolvem.

## 6. Requisitos funcionais

- Deve existir exatamente um `main` por página e landmarks apropriados para header, navegação e footer.
- A hierarquia de headings deve representar a estrutura do conteúdo e não o tamanho visual.
- Links de salto para o conteúdo principal devem ser considerados e implementados quando melhorarem navegação repetitiva.
- Todos os controles devem ser alcançáveis e operáveis por teclado em ordem lógica.
- Foco deve ser visível, contrastante e não ficar totalmente oculto por conteúdo fixo.
- Menu mobile deve anunciar estado aberto ou fechado, possuir nome acessível e devolver foco de forma previsível quando aplicável.
- Links devem possuir nomes compreensíveis fora do contexto visual imediato.
- Imagens informativas devem possuir alt adequado; decorativas devem ser ignoradas por tecnologia assistiva.
- O layout deve reflow sem rolagem horizontal de página em 320 CSS px, salvo componente deliberadamente bidimensional e acessível, inexistente no escopo inicial.
- Conteúdo deve permanecer utilizável com zoom de 200% e aumento de espaçamento de texto compatível com critérios aplicáveis.
- Alvos interativos devem atender ao tamanho mínimo de WCAG 2.2 AA ou às exceções previstas, priorizando área confortável para toque.
- Cor não pode ser o único meio de comunicar estado.
- Movimento não essencial deve respeitar `prefers-reduced-motion`.
- Nenhum preset pode depender de imagem opcional para manter contexto ou compreensão.

## 7. Requisitos não funcionais

- Meta mínima: WCAG 2.2 níveis A e AA aplicáveis.
- Abordagem mobile-first e breakpoints limitados, baseados no conteúdo.
- Correções devem ocorrer no componente, seção, token ou contrato responsável, não em CSS global crescente.
- Automação complementa, mas não substitui análise manual.
- Não adicionar dependências além das aprovadas na spec 12 sem necessidade comprovada.
- Não usar `tabIndex` positivo, remoção de outline sem substituto ou ARIA redundante.
- Preferir HTML nativo a ARIA.
- Manter baixo JavaScript e Server Components por padrão.
- A auditoria deve ser reproduzível por checklist e fixtures conhecidas.

## 8. Decisões arquiteturais

- Defeitos transversais de tema, primitive ou seção devem ser corrigidos na origem. Não criar arquivo global de exceções por preset.
- A matriz de auditoria inicial usará larguras representativas de 320, 375, 768, 1024 e 1440 CSS px, além de orientação paisagem e zoom de 200%. Esses valores são cenários de validação, não breakpoints obrigatórios.
- Axe será executado nos três presets e no estado aberto do menu mobile. Violações devem ser analisadas; suppressions só serão permitidas para falso positivo documentado e mínimo.
- Contraste deverá ser medido nas combinações reais de tokens e estados, não apenas na paleta isolada.
- Conteúdo adversarial será representado por fixtures: nome comercial longo, títulos multilinha, muitas navegações, listas com 1 e muitos itens, descrições extensas e imagens ausentes.
- Não criar versão mobile separada da árvore de componentes.
- Breakpoint específico para corrigir um único texto deve ser evitado; preferir layout fluido e limites de conteúdo.
- Problemas encontrados fora do escopo devem ser registrados, não escondidos.

## 9. Estrutura impactada

- Testes Playwright e axe da spec 12.
- Fixtures de auditoria para os três presets.
- Componentes, seções, CSS Modules, tokens e composição que apresentarem defeitos.
- Estilos globais apenas quando a responsabilidade for realmente transversal, como foco base e redução de movimento.
- Documento de checklist e resultados de auditoria.
- Configurações de teste somente quando necessárias para executar os cenários.

## 10. Fluxo esperado

### Desenvolvedor

1. Executa testes automatizados nos três presets.
2. Navega pelas páginas apenas com teclado.
3. Verifica leitores de tela pelo menos nos fluxos e landmarks principais.
4. Valida matriz de larguras, zoom, orientação e conteúdo adversarial.
5. Mede contraste dos estados reais.
6. Corrige o defeito no módulo responsável.
7. Reexecuta o cenário e registra resultado.

### Aplicação durante build ou runtime

1. Renderiza HTML semântico no servidor.
2. CSS responde ao conteúdo e ao espaço disponível.
3. A única interação cliente relevante preserva foco e estado acessível.
4. Preferências de movimento são respeitadas.

### Usuário final

1. Consegue perceber, compreender, navegar e operar o conteúdo por diferentes meios de entrada.
2. Usa a página com zoom, fonte maior e tela estreita sem perder funcionalidade.
3. Recebe conteúdo equivalente quando imagens são decorativas ou opcionais.

## 11. Critérios de aceite

- Dado qualquer preset padrão, quando axe é executado na home, então não há violações críticas ou sérias não justificadas.
- Dado o menu mobile aberto, quando o teste automatizado e a navegação por teclado são executados, então estado, foco, ordem e fechamento são previsíveis.
- Dado um viewport de 320 CSS px, quando cada preset é renderizado, então não existe overflow horizontal da página.
- Dado zoom de 200%, quando navegação, headings, cards e contato são usados, então conteúdo e controles permanecem visíveis e operáveis.
- Dado conteúdo adversarial, quando as páginas são renderizadas, então não há corte por altura fixa, sobreposição ou perda de ação.
- Dado uma imagem opcional ausente, quando a seção é auditada, então mantém sentido e ordem de leitura.
- Dado foco em cada controle, quando medido visualmente, então o indicador é visível, contrastante e não totalmente oculto.
- Dado que a auditoria termina, quando o diff é revisado, então as correções estão nos módulos responsáveis e não em patches específicos por preset.

## 12. Cenários de erro e borda

- Header fixo cobre o foco ou destino de âncora.
- Menu mobile mantém foco em conteúdo oculto.
- Navegação extensa quebra layout.
- Título longo causa overflow ou cobre imagem.
- Card com descrição grande força alturas inconsistentes ou corte.
- Contraste passa no estado normal e falha em hover ou focus.
- Texto alternativo repete legenda ou nome adjacente.
- Link “saiba mais” perde sentido fora de contexto.
- Conteúdo some quando CSS ou imagem falha.
- Zoom muda navegação para estado inacessível.
- `overflow-x: hidden` mascara elemento maior que viewport.
- Suppression do axe usada sem falso positivo demonstrado.

## 13. Estratégia de testes

- Unitários: validadores de heading, navegação ou contratos apenas quando houver função pura real.
- Componentes: menu mobile, ações, imagens e estados opcionais.
- Integração: landmarks, headings e navegação na composição final.
- E2E: teclado, menu, âncoras, reflow e smoke axe nos três presets.
- Manual: leitor de tela, contraste, foco, zoom, espaçamento de texto, orientação, conteúdo longo e preferência de movimento.
- Lighthouse ou ferramenta equivalente pode apoiar a auditoria, mas score isolado não substitui critérios concretos.
- Resultados e limitações devem ser documentados sem declarar conformidade além do que foi verificado.

## 14. Definição de pronto

- Três presets auditados com matriz definida.
- Axe executado nos estados críticos e violações analisadas.
- Teclado, foco, headings, landmarks, imagens e links validados.
- Reflow a 320 CSS px e zoom de 200% validados.
- Conteúdo adversarial e imagens ausentes testados.
- Contraste e movimento reduzido verificados.
- Defeitos corrigidos na origem sem dependências desnecessárias.
- Checklist e resultados documentados.
- Lint, typecheck, testes, E2E e build executados com sucesso.

## 15. Instruções para o Codex

- Ler `AGENTS.md`, arquitetura, guideline e specs 01–12 implementadas.
- Consultar WCAG 2.2 e documentação oficial das ferramentas de teste.
- Auditar os três presets e corrigir defeitos no módulo responsável.
- Não criar CSS global específico por preset, versão mobile separada ou dependência visual nova.
- Não adicionar suppressions de axe sem falso positivo reproduzível e documentado.
- Preservar HTML nativo, TypeScript estrito, Server Components, CSS Modules e tokens.
- Manter `"use client"` na menor fronteira possível.
- Executar todos os testes automatizados e validações manuais descritas.
- Revisar o diff e registrar limitações reais.
- Não afirmar conformidade ou sucesso de comando sem evidência de execução.
