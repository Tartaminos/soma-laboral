# Prontidão da Soma Laboral

## Estado atual

A home usa o preset `services` com composição explícita, conteúdo editorial da
Soma Laboral, tema da marca e exportação estática. A spec 19 ativou o domínio,
os canais de contato, a região atendida, a disponibilidade textual e os assets
oficiais. O build de produção é indexável e permanece compatível com hospedagem
estática na Cloudflare Pages.

## Dados e assets ativos

- domínio: `https://somalaboral.com.br`;
- WhatsApp: `+55 19 99746-2703`, normalizado para `5519997462703` nos links;
- Instagram: `somaginasticalaboral`, exibido somente pelo ícone do contato;
- região atendida: `Americana/SP`;
- disponibilidade: `Segunda a sexta, em horário comercial.`;
- logo completo, símbolo recortado e ícones de 16, 32 e 180 pixels derivados
  da marca recebida;
- vídeo do hero em MP4/H.264, 1280 × 720, 30 FPS, 15,67 segundos, sem áudio e
  com 4,22 MB;
- poster do hero em WebP, 1280 × 720;
- seis fotografias WebP na seção “Soma em ação”, com três registros de
  Ginástica Laboral e três de Quick Massage;
- imagem Open Graph WebP, 1200 × 630.

Os derivados WebP não contêm EXIF, GPS nem perfil ICC. Os arquivos originais
com nomes editoriais inadequados foram removidos da área pública depois da
geração e validação dos derivados.

## Registro de revisão

- inspeção visual do export estático realizada em 375, 768 e 1440 CSS px;
- ausência de overflow horizontal coberta por E2E em 320, 375, 768, 1024 e
  1440 CSS px;
- ampliação textual de 200% revisada sem overflow horizontal;
- menu móvel, retorno de foco e navegação interna cobertos por E2E;
- preferência por movimento reduzido coberta por E2E: o vídeo permanece
  pausado no poster;
- ausência de violações sérias ou críticas coberta por axe em Chromium
  desktop e mobile;
- estados de foco usam o token de acento da marca e links visitados preservam o
  tratamento visual da interface;
- o grid externo de 76 rem é compartilhado por header, hero, seções e footer;
- serviços, destaques, mosaico, contato dividido e footer foram revisados nos
  layouts mobile, tablet e desktop;
- lint, typecheck, testes unitários, build de produção, validação do export e
  E2E foram executados com sucesso.

## Verificações externas de publicação

- manter registrado, com o responsável pelo conteúdo, o consentimento de uso
  das pessoas identificáveis nas fotografias e no vídeo;
- confirmar a aceitação de marcas corporativas, crachás e números de prova
  visíveis nas mídias fornecidas;
- realizar smoke final em aparelhos físicos e no domínio publicado depois do
  deploy na Cloudflare Pages.
