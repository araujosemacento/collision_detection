---
title: "Retângulo / Retângulo"
slug: "rect-rect"
order: 10
sketch: "RectRect"
caption: "Mova o retângulo menor com o mouse para colidir com o retângulo maior!"
description: "Detecção de colisão entre retângulos alinhados aos eixos (AABB) através do teste das quatro bordas."
image: "images/rect-rect.jpg"
---

<script>
	import CodeTabs from '$lib/components/CodeTabs.svelte';
</script>

# RETÂNGULO / RETÂNGULO

Passar do capítulo [Ponto/Retângulo](point-rect) para a colisão entre dois retângulos é um passo simples, mas as instruções `if` começam a ficar bem mais longas. Vamos considerar dois retângulos, `r1` e `r2`, com posições e tamanhos definidos da mesma forma que o último exemplo. As perguntas que precisamos responder são:

- A borda **direita** de `r1` passou da borda **esquerda** de `r2`?
- A borda **esquerda** de `r1` está antes da borda **direita** de `r2`?
- A borda **superior** de `r1` está acima da borda **inferior** de `r2`?
- A borda **inferior** de `r1` passou da borda **superior** de `r2`?

Com certeza não é nem um pouco intuitivo<img src="emotiguy.png" alt="emotiguy triste e pensativo" class="inline-emoji"/>. Talvez essa imagem ajude um pouco:

![Teste de sobreposição entre dois retângulos](images/rect-rect.jpg)

Primeiro, testamos a borda direita de `r1` em relação à borda esquerda de `r2`:

<CodeTabs>

```javascript
let r1RightEdge = r1x + r1w;
if (r1RightEdge >= r2x) {
  // a borda direita de r1 passou da borda esquerda de r2
}
```

```java
float r1RightEdge = r1x + r1w;
if (r1RightEdge >= r2x) {
    // a borda direita de r1 passou da borda esquerda de r2
}
```

```python
r1_right_edge = r1x + r1w
if r1_right_edge >= r2x:
    # a borda direita de r1 passou da borda esquerda de r2
```

</CodeTabs>

Expandindo essa mesma ideia para as quatro bordas simultaneamente, temos a função completa:

<CodeTabs>

```javascript
function rectRect(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
  // as bordas de um retângulo estão tocando o outro?
  if (
    r1x + r1w >= r2x && // borda direita de r1 passou da esquerda de r2
    r1x <= r2x + r2w && // borda esquerda de r1 antes da direita de r2
    r1y + r1h >= r2y && // borda inferior de r1 passou da superior de r2
    r1y <= r2y + r2h
  ) {
    // borda superior de r1 antes da inferior de r2
    return true;
  }
  return false;
}
```

```java
boolean rectRect(float r1x, float r1y, float r1w, float r1h, float r2x, float r2y, float r2w, float r2h) {
  // as bordas de um retângulo estão tocando o outro?
  if (r1x + r1w >= r2x &&    // borda direita de r1 passou da esquerda de r2
      r1x <= r2x + r2w &&    // borda esquerda de r1 antes da direita de r2
      r1y + r1h >= r2y &&    // borda inferior de r1 passou da superior de r2
      r1y <= r2y + r2h) {    // borda superior de r1 antes da inferior de r2
        return true;
  }
  return false;
}
```

```python
def rect_rect(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h):
    # as bordas de um retângulo estão tocando o outro?
    if (r1x + r1w >= r2x and    # borda direita de r1 passou da esquerda de r2
        r1x <= r2x + r2w and    # borda esquerda de r1 antes da direita de r2
        r1y + r1h >= r2y and    # borda inferior de r1 passou da superior de r2
        r1y <= r2y + r2h):      # borda superior de r1 antes da inferior de r2
        return True
    return False

# Dica Pygame (usando o método nativo colliderect):
# rect1 = pygame.Rect(r1x, r1y, r1w, r1h)
# rect2 = pygame.Rect(r2x, r2y, r2w, r2h)
# hit = rect1.colliderect(rect2)
```

</CodeTabs>

Enquanto os códigos parecem simples, já que a matemática aqui se resume a somas e comparações, esta é uma das colisões mais confusas pra alguém que está aprendendo sobre as detecções. Com a prática, dá pra pegar o jeito de visualizar isso na sua cabeça. Mas é óbvio que usar uma função reutilizável torna a checagem muito mais fácil! No meio tempo, mapear as intersecções em um pedaço de papel pode ajudar muito na hora de codificar.

Aqui está o exemplo completo:

<CodeTabs>

```javascript
let s1x = 0; // posição do quadrado (move com o mouse)
let s1y = 0;
let s1w = 30; // e dimensões
let s1h = 30;

let s2x = 200; // o mesmo para o segundo quadrado
let s2y = 100;
let s2w = 200;
let s2h = 200;

function setup() {
  createCanvas(600, 400);
  noCursor();

  noStroke();
}

function draw() {
  background(255);

  // atualiza o quadrado para as coordenadas do mouse
  s1x = mouseX;
  s1y = mouseY;

  // verifica se há colisão
  // se colidir, muda a cor do retângulo
  let colisao = rectRect(s1x, s1y, s1w, s1h, s2x, s2y, s2w, s2h);
  if (colisao) {
    fill(255, 150, 0);
  } else {
    fill(0, 150, 255);
  }
  rect(s2x, s2y, s2w, s2h);

  // desenha o outro quadrado
  fill(0, 150);
  rect(s1x, s1y, s1w, s1h);
}

// RETÂNGULO/RETÂNGULO
function rectRect(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
  // as bordas de um retângulo estão tocando o outro?

  if (
    r1x + r1w >= r2x && // borda direita de r1 passou da esquerda de r2
    r1x <= r2x + r2w && // borda esquerda de r1 antes da direita de r2
    r1y + r1h >= r2y && // borda inferior de r1 passou da superior de r2
    r1y <= r2y + r2h
  ) {
    // borda superior de r1 antes da inferior de r2
    return true;
  }
  return false;
}
```

```java
float s1x = 0; // posição do quadrado (move com o mouse)
float s1y = 0;
float s1w = 30; // e dimensões
float s1h = 30;

float s2x = 200; // o mesmo para o segundo quadrado
float s2y = 100;
float s2w = 200;
float s2h = 200;

void setup() {
  size(600, 400);
  noCursor();

  noStroke();
}

void draw() {
  background(255);

  // atualiza o quadrado para as coordenadas do mouse
  s1x = mouseX;
  s1y = mouseY;

  // verifica se há colisão
  // se colidir, muda a cor do retângulo
  boolean colisao = rectRect(s1x, s1y, s1w, s1h, s2x, s2y, s2w, s2h);
  if (colisao) {
    fill(255, 150, 0);
  } else {
    fill(0, 150, 255);
  }
  rect(s2x, s2y, s2w, s2h);

  // desenha o outro quadrado
  fill(0, 150);
  rect(s1x, s1y, s1w, s1h);
}

// RETÂNGULO/RETÂNGULO
boolean rectRect(float r1x, float r1y, float r1w, float r1h, float r2x, float r2y, float r2w, float r2h) {

  // as bordas de um retângulo estão tocando o outro?

  if (
    r1x + r1w >= r2x && // borda direita de r1 passou da esquerda de r2
    r1x <= r2x + r2w && // borda esquerda de r1 antes da direita de r2
    r1y + r1h >= r2y && // borda inferior de r1 passou da superior de r2
    r1y <= r2y + r2h
  ) {
    // borda superior de r1 antes da inferior de r2
    return true;
  }
  return false;
}
```

```python
import pygame
pygame.init()

LARGURA, ALTURA = 600, 400
tela = pygame.display.set_mode((LARGURA, ALTURA))
pygame.display.set_caption("Retângulo / Retângulo")
pygame.mouse.set_visible(False)

r1_w, r1_h = 30, 30        # dimensões do primeiro retângulo
r2_w, r2_h = 200, 200      # dimensões do segundo retângulo

r1_x, r1_y = 0, 0          # posição inicial do primeiro retângulo
r2_x, r2_y = 200, 100      # posição inicial do segundo retângulo

def rect_rect(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h):
    # as bordas de um retângulo estão tocando o outro?

    if (
        r1x + r1w >= r2x and # borda direita de r1 passou da esquerda de r2
        r1x <= r2x + r2w and # borda esquerda de r1 antes da direita de r2
        r1y + r1h >= r2y and # borda inferior de r1 passou da superior de r2
        r1y <= r2y + r2h    # borda superior de r1 antes da inferior de r2
    ):
        return True
    return False

while True:
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            pygame.quit()
            exit()

    r1_x, r1_y = pygame.mouse.get_pos()

    # Converte as posições e dimensões em objetos Rect
    rect1 = pygame.Rect(r1_x, r1_y, r1_w, r1_h)
    rect2 = pygame.Rect(r2_x, r2_y, r2_w, r2_h)

    tela.fill((255, 255, 255))

    colisao = rect_rect(r1_x, r1_y, r1_w, r1_h, r2_x, r2_y, r2_w, r2_h)

    if colisao:
        pygame.draw.rect(tela, (255, 150, 0), rect2)
    else:
        pygame.draw.rect(tela, (0, 150, 255), rect2)

    # Desenha o primeiro retângulo
    pygame.draw.rect(tela, (0, 0, 0), rect1)

    pygame.display.flip()
```

</CodeTabs>

> **Nota sobre Modos de Desenho:** Este algoritmo assume o padrão de desenho a partir do canto superior esquerdo (`rectMode(CORNER)`). Caso queira desenhar retângulos a partir do centro (`rectMode(CENTER)`), a matemática do algoritmo precisará ser ajustada adaptando as bordas.

---

## AABB (AXIS-ALIGNED BOUNDING BOX)

Este algoritmo pressupõe que os retângulos **não estão rotacionados** no espaço (conhecido na computação gráfica como **AABB** - _Axis-Aligned Bounding Box_). Essa é a base do sistema de colisão de quase todos os jogos 2D clássicos como _Super Mario_, jogos de plataforma e _Top-Down Shooters_!

![Exemplo de Bounding Box retangular em objeto complexo](images/bounding-box.jpg)

Assim como no caso dos [Círculos Delimitadores](circle-circle), a colisão Retângulo/Retângulo é muito usada para desenhar "caixas delimitadoras" (_bounding boxes_) em torno de sprites complexos. No entanto, o que você ganha em desempenho computacional pode perder em precisão visual.

Se você já jogou um game e gritou frustrado _"Eu com certeza acertei aquele tiro!"_, você provavelmente vivenciou caixas delimitadoras que não se ajustavam perfeitamente à silhueta do personagem. Encontrar o equilíbrio ideal entre precisão matemática rigorosa e o que parece justo e divertido pro jogador é a chave de um bom design de jogos!
