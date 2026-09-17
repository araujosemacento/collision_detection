---
title: "Desafios: Seção 2"
slug: "section_2_challenges"
order: 12
sketch: null
description: "Exercícios práticos e problemas de física 2D envolvendo detecção de colisão com retângulos e círculos."
image: "images/challenge.jpg"
---

# SEÇÃO 2: DESAFIOS

![Ilustração de Desafio](images/challenge.jpg)

Tente estes desafios práticos pra modificar os exemplos que criamos até agora:

1. **Gradiente de Proximidade**: Você consegue fazer com que um objeto mude de cor gradualmente conforme o mouse se aproxima? Dica: use a função `map()` do p5.js para converter a distância em um intervalo útil (ex: de 0 a 255). Você também pode usar `lerpColor()` para criar transições de cores suaves.
2. **Desenho pelo Centro**: Nossos exemplos usam a posição padrão de retângulo pelo canto superior esquerdo (`CORNER`). Como a função [Retângulo/Retângulo](rect-rect) mudaria se o retângulo fosse definido a partir do seu centro (`rectMode(CENTER)`)?
3. **Crie Pong**: Com a colisão [Círculo/Retângulo](circle-rect) dominada, você já tem tudo o que é necessário para construir um jogo clássico de [**Pong**](https://pt.wikipedia.org/wiki/Pong)! Tente criar um exemplo simples com dois retângulos como raquetes e um circulo como a bola.
