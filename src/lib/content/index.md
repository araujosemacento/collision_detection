---
title: "Detecção de Colisão"
slug: "index"
order: 1
sketch: "Introduction"
caption: "Use o mouse para mover o círculo e colidir com as formas caindo!"
description: "Livro interativo sobre algoritmos de detecção de colisão 2D em jogos com p5.js, Processing (Java) e Pygame (Python)."
---

# DETECÇÃO DE COLISÃO

#### Adaptado e traduzido a partir da obra de **Jeff Thompson**.

A colisão entre objetos é a base de grande parte das experiências em jogos e interfaces de usuário. Tacos de beisebol colidem com bolas, zumbis trombam com paredes, e o Mario pousa em plataformas e pisa em tartarugas. Até mesmo algo tão simples quanto clicar em um botão (um retângulo) com o ponteiro do mouse (um ponto) é uma colisão.

Este livro explica os algoritmos por trás dessas colisões utilizando formas geométricas básicas como círculos, retângulos e linhas, para que você possa implementá-los em seus próprios projetos.

<div class="callout">
<strong>ATUALIZAÇÃO:</strong> Este site foi atualizado e traduzido para o português (PT-BR), com suporte a dispositivos móveis e renderização interativa em <code>p5.js</code>. O conteúdo aqui exposto não é de minha autoria, todos os créditos referentes ao conteúdo original do livro podem ser encontrados na seção de <a href = thanks>Agradecimentos</a>.
</div>

Pronto para começar? Vá direto para o [Sumário do Livro](table_of_contents)...

## O QUE É COBERTO AQUI?

Este livro cobre colisões entre pontos, círculos, retângulos, linhas, polígonos e triângulos. Esses exemplos foram projetados para serem o mais legíveis e compreensíveis possível. Existem certamente métodos mais rápidos e eficientes para detectar tais colisões, mas a intenção deste livro é ser amigável e ensinar os princípios com o mínimo de matemática necessária.

Cada seção inclui a explicação do algoritmo de colisão e um exemplo interativo construído com **p5.js**. Você pode acessar o código original no [repositório do autor](https://github.com/jeffThompson/CollisionDetection), assim como as adaptações realizadas para esta versão, disponibilizadas na íntegra ao fim de cada capítulo.

<div class="callout">
<strong>NOTA:</strong> Os exemplos interativos foram projetados primordialmente para uso com mouse no computador, mas não devem apresentar problemas de funcionamento em dispositivos móveis. Caso se sinta frustrado com a experiência em telas sensíveis ao toque, tente acessar o site em um computador desktop.
</div>

## O QUE NÃO É COBERTO?

Como em qualquer livro, existe muito mais material útil do que aquele que está sendo coberto nessa obra. Assuntos não discutidos foram deixados de fora principalmente porque a matemática fica bastante complexa. O espaço tridimensional (3D) não é abordado. Elipses, que parecem simples à primeira vista, são na verdade muito difíceis de calcular colisões exatas.

## NAVEGAÇÃO

Hora de escrever código! Clique no link ao final de cada página ou nas setas do cabeçalho para avançar para o próximo capítulo. O link entre as setas no topo te leva de volta à lista completa de capítulos.
