---
title: "Círculo / Círculo"
slug: "circle-circle"
order: 7
sketch: "CircleCircle"
caption: "Use o mouse para mover o círculo menor e colidir com o círculo maior!"
description: "Como detectar colisões e sobreposições entre dois círculos somando seus raios e medindo a distância entre centros."
image: "images/bounding-circle.jpg"
---

<script>
	import CodeTabs from '$lib/components/CodeTabs.svelte';
</script>

# CÍRCULO / CÍRCULO

A colisão com pontos é ótima, mas raramente os objetos em jogos ocupam apenas um único ponto no espaço. Em seguida, podemos utilizar a mesma aplicação do Teorema de Pitágoras vista no capítulo [Ponto/Círculo](point-circle) para testar se dois círculos estão se tocando.

Primeiro, calculamos a distância entre os centros dos dois círculos:

<CodeTabs>

```javascript
let distX = c1x - c2x;
let distY = c1y - c2y;
let distancia = Math.sqrt(distX * distX + distY * distY);
```

```java
float distX = c1x - c2x;
float distY = c1y - c2y;
float distancia = sqrt((distX*distX) + (distY*distY));
```

```python
import math

dist_x = c1x - c2x
dist_y = c1y - c2y
distancia = math.sqrt(dist_x ** 2 + dist_y ** 2)
```

</CodeTabs>

Para verificar se eles estão colidindo, testamos se a **distância entre os seus centros é menor ou igual à soma de seus raios** (`c1r + c2r`):

<CodeTabs>

```javascript
if (distancia <= c1r + c2r) {
  return true;
}
return false;
```

```java
if (distancia <= c1r + c2r) {
  return true;
}
return false;
```

```python
if distancia <= c1r + c2r:
    return True
return False
```

</CodeTabs>

Utilizado em um exemplo completo, podemos alterar a cor do círculo alvo quando houver colisão:

<CodeTabs>

```javascript
// Posição e raio do círculo 1 (controlado pelo mouse)
let c1x = 0;
let c1y = 0;
let c1r = 30;

// Posição e raio do círculo 2 (círculo alvo)
let c2x = 300;
let c2y = 200;
let c2r = 100;

function setup() {
  createCanvas(600, 400);
  noStroke();
  noCursor();
}

function draw() {
  background(255);

  // Atualiza a posição para as coordenadas do mouse
  c1x = mouseX;
  c1y = mouseY;

  // ------------------------------------------------
  // Verifica se há colisão entre os círculos
  let colidindo = circleCircle(c1x, c1y, c1r, c2x, c2y, c2r);

  // Se houver colisão, altera a cor do círculo alvo
  if (colidindo) {
    fill(255, 150, 0);
  } else {
    fill(0, 150, 255);
  }
  // ------------------------------------------------

  // Desenha o círculo alvo (círculo 2)
  ellipse(c2x, c2y, c2r * 2, c2r * 2);

  // Desenha o círculo controlado pelo mouse (círculo 1)
  fill(0, 150);
  ellipse(c1x, c1y, c1r * 2, c1r * 2);
}

function circleCircle(c1x, c1y, c1r, c2x, c2y, c2r) {
  // Obtém a distância entre os centros dos círculos
  // usando o Teorema de Pitágoras
  let distX = c1x - c2x;
  let distY = c1y - c2y;
  let distancia = Math.sqrt(distX * distX + distY * distY);

  // Se a distância for menor ou igual à soma dos raios,
  // os círculos estão se tocando!
  if (distancia <= c1r + c2r) {
    return true;
  }
  return false;
}
```

```java
// Posição e raio do círculo 1 (controlado pelo mouse)
float c1x = 0;
float c1y = 0;
float c1r = 30;

// Posição e raio do círculo 2 (círculo alvo)
float c2x = 300;
float c2y = 200;
float c2r = 100;

void setup() {
  size(600, 400);
  noStroke();
  noCursor();
}

void draw() {
  background(255);

  // Atualiza a posição para as coordenadas do mouse
  c1x = mouseX;
  c1y = mouseY;

  // ------------------------------------------------
  // Verifica se há colisão entre os círculos
  boolean colidindo = circleCircle(c1x, c1y, c1r, c2x, c2y, c2r);

  // Se houver colisão, altera a cor do círculo alvo
  if (colidindo) {
    fill(255, 150, 0);
  }
  else {
    fill(0, 150, 255);
  }
  // ------------------------------------------------

  // Desenha o círculo alvo (círculo 2)
  ellipse(c2x, c2y, c2r * 2, c2r * 2);

  // Desenha o círculo controlado pelo mouse (círculo 1)
  fill(0, 150);
  ellipse(c1x, c1y, c1r * 2, c1r * 2);
}

boolean circleCircle(float c1x, float c1y, float c1r, float c2x, float c2y, float c2r) {
  // Obtém a distância entre os centros dos círculos
  // usando o Teorema de Pitágoras
  float distX = c1x - c2x;
  float distY = c1y - c2y;
  float distancia = sqrt((distX * distX) + (distY * distY));

  // Se a distância for menor ou igual à soma dos raios,
  // os círculos estão se tocando!
  if (distancia <= c1r + c2r) {
    return true;
  }
  return false;
}
```

```python
import pygame
from math import sqrt
pygame.init()

LARGURA, ALTURA = 600, 400
tela = pygame.display.set_mode((LARGURA, ALTURA))
pygame.display.set_caption("Círculo / Círculo")
pygame.mouse.set_visible(False)

# Posição e raio do círculo 1 (controlado pelo mouse)
c1r = 30

# Posição e raio do círculo 2 (círculo alvo)
c2x = 300
c2y = 200
c2r = 100

def circle_circle(c1x, c1y, c1r, c2x, c2y, c2r):
    # Obtém a distância entre os centros dos círculos
    # usando o Teorema de Pitágoras
    dist_x = c1x - c2x
    dist_y = c1y - c2y
    distancia = sqrt((dist_x ** 2) + (dist_y ** 2))

    # Se a distância for menor ou igual à soma dos raios,
    # os círculos estão se tocando!
    if distancia <= (c1r + c2r):
        return True
    return False

# Superfície com suporte a transparência para o círculo do mouse
# Recurso adicionado aqui mais como uma curiosidade.
superficie_mouse = pygame.Surface((c1r * 2, c1r * 2), pygame.SRCALPHA)
pygame.draw.circle(superficie_mouse, (0, 0, 0, 150), (c1r, c1r), c1r)

relogio = pygame.time.Clock()
rodando = True

while rodando:
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            rodando = False

    tela.fill((255, 255, 255))

    # Atualiza a posição para as coordenadas do mouse
    c1x, c1y = pygame.mouse.get_pos()

    # ------------------------------------------------
    # Verifica se há colisão entre os círculos
    colidindo = circle_circle(c1x, c1y, c1r, c2x, c2y, c2r)

    # Se houver colisão, altera a cor do círculo alvo
    if colidindo:
        cor = (255, 150, 0)
    else:
        cor = (0, 150, 255)
    # ------------------------------------------------

    # Desenha o círculo alvo (círculo 2)
    pygame.draw.circle(tela, cor, (c2x, c2y), c2r)

    # Desenha o círculo controlado pelo mouse (círculo 1)
    tela.blit(superficie_mouse, (c1x - c1r, c1y - c1r))

    pygame.display.flip()
    relogio.tick(60)

pygame.quit()
```

</CodeTabs>

---

## BOUNDING CIRCLES (CÍRCULOS DELIMITADORES)

A colisão **Círculo/Círculo** é amplamente utilizada para criar "círculos delimitadores" (_bounding circles_) em torno de objetos complexos. Embora sacrifique um pouco de precisão perfeita, este tipo de teste é extremamente veloz e serve como uma excelente aproximação inicial.

![Exemplo de Bounding Circle ao redor de um dodecágono](images/bounding-circle.jpg)

<figcaption style="text-align: center; font-size: 0.85rem; color: var(--color-text-muted); margin-top: -0.75rem; margin-bottom: 1.5rem;">Embora inclua algumas áreas que não fazem parte da forma original, um círculo é uma boa aproximação didática para este <a href="https://pt.wikipedia.org/wiki/Dodec%C3%A1gono" target="_blank" rel="external">dodecágono</a>.</figcaption>

> **Por que não elipses?** Você pode estar se perguntando por que estamos falando apenas sobre círculos e não sobre elipses. Embora pareçam simples à primeira vista, a matemática exata para verificar colisão entre elipses é [surpreendentemente complexa](https://web.archive.org/web/20240428215001/https://stackoverflow.com/questions/2945337/how-to-detect-if-an-ellipse-intersectscollides-with-a-circle). Considere isso um excelente desafio avançado para explorar após dominar este livro!
