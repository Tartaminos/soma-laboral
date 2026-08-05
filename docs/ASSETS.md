# Assets públicos

Tudo em `public` é publicamente acessível. Não coloque credenciais, contratos
privados, dados pessoais desnecessários ou documentos internos nesse diretório.

## Organização

- `public/brand`: logos e marcas;
- `public/images`: imagens editoriais;
- `public/icons`: ícones locais realmente usados;
- `public/documents`: arquivos deliberadamente públicos.

Use nomes descritivos em `kebab-case`, sem espaços ou sufixos como `final-final`.
Otimize arquivos antes do commit e escolha dimensões adequadas ao uso.

Referências de imagem usam o contrato em `src/domain/assets.ts`. Imagens
informativas exigem `decorative: false`, alt text significativo, largura e
altura. Imagens redundantes usam `decorative: true` e recebem alt vazio na
renderização. URLs remotas não são aceitas pelo contrato inicial.

Imagens opcionais podem ser omitidas; a seção deve continuar compreensível.
Somente mídia crítica no primeiro viewport deve usar `priority`.

## Imagens de portfólio

Use somente imagens cujo direito de publicação e autorização adequada tenham
sido confirmados pelo responsável pelo site. Fotografias de clientes, rostos,
crianças, placas, endereços, documentos ou qualquer dado identificável exigem
avaliação editorial e autorização específica antes da inclusão.

Arquivos em `public` podem ser acessados por qualquer pessoa que conheça ou
descubra sua URL. Remova metadados desnecessários antes do commit, inclusive
localização EXIF e informações do dispositivo quando aplicáveis. O template não
implementa gestão de consentimento; essa responsabilidade permanece com o
cliente e com quem publica o conteúdo.

Otimize as imagens para o tamanho de exibição, preserve largura e altura reais
no contrato e prefira formatos adequados à web. O portfólio aceita proporções
horizontais, verticais e quadradas sem exigir recorte uniforme.
