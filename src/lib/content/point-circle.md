---
title: "Ponto / Círculo"
slug: "point-circle"
order: 6
sketch: "PointCircle"
caption: "Mova o mouse (ponto) para dentro do círculo para testar a colisão!"
---

<script>
	import CodeTabs from '$lib/components/CodeTabs.svelte';
</script>

# PONTO / CÍRCULO

A colisão [Ponto/Ponto](point-point) foi extremamente fácil, mas a partir de agora precisaremos de matemática básica para verificar se os objetos estão se tocando. Testar se um ponto está dentro de um círculo exige relembrar o famoso **Teorema de Pitágoras**:

```text
a² + b² = c²
```

Podemos calcular o comprimento do lado mais longo de um triângulo retângulo (a hipotenusa **c**) dados os comprimentos dos outros dois lados (**a** e **b**):

<CodeTabs>

```javascript
c = Math.sqrt(a * a + b * b);
```

```java
c = sqrt((a * a) + (b * b));
```

```python
c = math.sqrt((a * a) + (b * b))
```

</CodeTabs>

Multiplicamos `a` por ele mesmo, o mesmo para `b`, somamos os dois resultados e tiramos a raiz quadrada do total.

Por que precisamos disso? O Teorema de Pitágoras nos dá a **distância exata entre dois pontos no espaço 2D**! Nesse contexto, **a** e **b** são as distâncias horizontal e vertical entre o ponto e o centro do círculo.

![Triângulo formado entre o ponto e o centro do círculo](images/point-circle.jpg)

Calculamos as distâncias X e Y:

<CodeTabs>

```javascript
let distX = px - cx;
let distY = py - cy;
```

```java
float distX = px - cx;
float distY = py - cy;
```

```python
dist_x = px - cx
dist_y = py - cy
```

</CodeTabs>

Em seguida, encontramos a distância entre o ponto e o centro do círculo usando a fórmula:

<CodeTabs>

```javascript
let distancia = Math.sqrt(distX * distX + distY * distY);
```

```java
float distancia = sqrt((distX * distX) + (distY * distY));
```

```python
distancia = math.sqrt((dist_x ** 2) + (dist_y ** 2))
```

</CodeTabs>

Por exemplo, se o ponto está na coordenada `(10, 10)` e o centro do círculo está em `(40, 50)`, obtemos uma distância exata de `50`.

Você pode estar se perguntando: _"E se a diferença das distâncias resultar em um número negativo?"_ Não se preocupe: como multiplicamos cada valor por ele mesmo (`distX * distX`), mesmo se o resultado da subtração for negativo, a multiplicação tornará o resultado positivo!

Certo, mas como usamos isso para testar a colisão? Se a distância entre o ponto e o centro do círculo for **menor ou igual ao raio (r)** do círculo, significa que eles estão colidindo!

<CodeTabs>

```javascript
function pointCircle(px, py, cx, cy, r) {
  // Obtém a distância entre o ponto e o centro do círculo
  // usando o Teorema de Pitágoras
  let distX = px - cx;
  let distY = py - cy;
  let distancia = Math.sqrt(distX * distX + distY * distY);

  // Se a distância for menor ou igual ao raio do círculo,
  // o ponto está dentro!
  if (distancia <= r) {
    return true;
  }
  return false;
}
```

```java
boolean pointCircle(float px, float py, float cx, float cy, float r) {
  // Obtém a distância entre o ponto e o centro do círculo
  // usando o Teorema de Pitágoras
  float distX = px - cx;
  float distY = py - cy;
  float distancia = sqrt((distX * distX) + (distY * distY));

  // Se a distância for menor ou igual ao raio do círculo,
  // o ponto está dentro!
  if (distancia <= r) {
    return true;
  }
  return false;
}
```

```python
import math

def point_circle(px, py, cx, cy, r):
    # Obtém a distância entre o ponto e o centro do círculo
    # usando o Teorema de Pitágoras
    dist_x = px - cx
    dist_y = py - cy
    distancia = math.sqrt((dist_x ** 2) + (dist_y ** 2))

    # Se a distância for menor ou igual ao raio do círculo,
    # o ponto está dentro!
    if distancia <= r:
        return True
    return False

# Dica Pygame (usando a classe Vector2):
# point = pygame.math.Vector2(px, py)
# center = pygame.math.Vector2(cx, cy)
# hit = point.distance_to(center) <= r
```

</CodeTabs>

> **Dica de Otimização:** O cálculo da raiz quadrada (`sqrt` / `Math.sqrt`) pode ser uma operação computacionalmente custosa dependendo da sua aplicação. É possível otimizar essa função comparando as distâncias ao quadrado: `(distX * distX + distY * distY) <= (r * r)`. Isso elimina o uso da raiz quadrada e resulta na mesma lógica de colisão, o que é excelente se seu jogo realiza milhares de checagens por quadro. Como isso não acontece com frequência, manteremos a fórmula com `sqrt` nos exemplos por pura clareza didática. Mas caso você venha a necessitar, deixo aqui essa dica!

Utilizado em um exemplo completo, podemos alterar a cor do círculo se o ponto estiver dentro dele.

<CodeTabs>

```javascript
// Coordenadas X e Y do mouse
let px, py;

// Coordenadas X e Y do centro do círculo
// e o valor do raio
let cx, cy, r;

function setup() {
  createCanvas(600, 400);
  noCursor();

  strokeWeight(15);

  // Define a posição inicial e o raio do círculo
  cx = width / 2;
  cy = height / 2;
  r = 100;
}

function draw() {
  background(255);

  // Atualiza a posição do mouse
  px = mouseX;
  py = mouseY;

  // ------------------------------------------------
  // Verifica se há colisão entre o ponto e o círculo
  let colidindo = pointCircle(px, py, cx, cy, r);

  if (colidindo) {
    fill(255, 150, 0);
  } else {
    fill(0, 150, 255);
  }
  // ------------------------------------------------

  // Desenha o círculo
  noStroke();
  circle(cx, cy, r * 2);

  // Desenha o ponto
  stroke(0, 150);
  point(px, py);
}

function pointCircle(px, py, cx, cy, r) {
  // Obtém a distância entre o ponto e o centro do círculo
  // usando o Teorema de Pitágoras
  let distX = px - cx;
  let distY = py - cy;
  let distancia = Math.sqrt(distX * distX + distY * distY);

  // Se a distância for menor ou igual ao raio do círculo,
  // o ponto está dentro!
  if (distancia <= r) {
    return true;
  }
  return false;
}
```

```java
// Coordenadas X e Y do mouse
float px, py;

// Coordenadas X e Y do centro do círculo
// e o valor do raio
float cx, cy, r;

void setup() {
  size(600, 400);
  noCursor();

  strokeWeight(15);

  // Define a posição inicial e o raio do círculo
  cx = width / 2;
  cy = height / 2;
  r = 100;
}

void draw() {
  background(255);

  // Atualiza a posição do mouse
  px = mouseX;
  py = mouseY;

  // ------------------------------------------------
  // Verifica se há colisão entre o ponto e o círculo
  boolean colidindo = pointCircle(px, py, cx, cy, r);

  if (colidindo) {
    fill(255, 150, 0);
  }
  else {
    fill(0, 150, 255);
  }
  // ------------------------------------------------

  // Desenha o círculo
  noStroke();
  ellipse(cx, cy, r * 2, r * 2);

  // Desenha o ponto
  stroke(0, 150);
  strokeWeight(15);
  point(px, py);
}

boolean pointCircle(float px, float py, float cx, float cy, float r) {
  // Obtém a distância entre o ponto e o centro do círculo
  // usando o Teorema de Pitágoras
  float distX = px - cx;
  float distY = py - cy;
  float distancia = sqrt((distX * distX) + (distY * distY));

  // Se a distância for menor ou igual ao raio do círculo,
  // o ponto está dentro!
  if (distancia <= r) {
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
pygame.display.set_caption("Ponto / Círculo")
pygame.mouse.set_visible(False)

# Coordenadas X e Y do centro do círculo
# e o valor do raio
cx = LARGURA // 2
cy = ALTURA // 2
r = 100

def point_circle(x1, y1, x2, y2, r):
    # Obtém a distância entre o ponto e o centro do círculo
    # usando o Teorema de Pitágoras
    dist_x = x1 - x2
    dist_y = y1 - y2
    distance = sqrt((dist_x ** 2) + (dist_y ** 2))

    # Se a distância for menor ou igual ao raio do círculo,
    # o ponto está dentro!
    if distance <= r:
        return True
    return False

relogio = pygame.time.Clock()
rodando = True

while rodando:
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            rodando = False

    tela.fill((255, 255, 255))

    # Atualiza a posição do mouse
    px, py = pygame.mouse.get_pos()

    # ------------------------------------------------
    # Verifica se há colisão entre o ponto e o círculo
    colidindo = point_circle(px, py, cx, cy, r)

    if colidindo:
        cor = (255, 150, 0)
    else:
        cor = (0, 150, 255)
    # ------------------------------------------------

    # Desenha o círculo
    pygame.draw.circle(tela, cor, (cx, cy), r)

    # Desenha o ponto
    pygame.draw.circle(tela, (0, 0, 0), (px, py), 7)

    pygame.display.flip()
    relogio.tick(60)

pygame.quit()
```

</CodeTabs>

Este método, utilizando o Teorema de Pitágoras, retornará muitas vezes ao longo dos próximos capítulos. Linguagens e motores gráficos frequentemente possuem funções utilitárias integradas para calcular distâncias (como a função `dist()` no Processing/p5.js, `Math.hypot()` em JavaScript, ou o método `distance_to()` da classe Vector2 no Pygame), caso prefira utilizá-las. Apesar disso, manteremos a matemática explícita em nossos exemplos como referência didática.

---

## O PROBLEMA DA "BALA ATRAVÉS DO PAPEL" (CCD)

Uma ressalva importante: se você tiver um objeto movendo-se a altíssima velocidade em um jogo (como um projétil ou tiro), ele pode às vezes atravessar completamente o alvo sem que a colisão seja acionada!

Esse fenômeno é comumente referido como o problema da _"bala através do papel"_ (_bullet through paper_). Existem diversas soluções para essa questão, e um ótimo ponto de partida é [esta postagem no GameDev.net](http://gamedev.stackexchange.com/questions/22765/how-do-i-check-collision-when-firing-bullet). A técnica padrão da indústria para solucionar esse comportamento é chamada de [Continuous Collision Detection (CCD)](http://en.wikipedia.org/wiki/Collision_detection#A_posteriori_.28discrete.29_versus_a_priori_.28continuous.29) (Detecção de Colisão Contínua).

<div class="callout">
Peço desculpas, mas não achei referências de fácil compreensão em português sobre esse tema, então optei por simplesmente deixar as referências originais.
</div>
