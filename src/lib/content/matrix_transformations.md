---
title: "Transformações de Matrizes"
slug: "matrix_transformations"
order: 28
sketch: "MatrixTransformations"
caption: "Quadrados rotacionando e colidindo através de transformações de matrizes!"
description: "Detecção de colisão em objetos rotacionados, transladados e escalados usando transformações de matrizes."
---

<script>
	import CodeTabs from '$lib/components/CodeTabs.svelte';
</script>

# TRANSFORMAÇÕES DE MATRIZES

#### Jeff Thompson

Usar formas simples com coordenadas X/Y pré-definidas na tela é ótimo, mas em situações do mundo real e em jogos complexos é muito provável que estejamos utilizando **transformações de matrizes** como `push()`, `pop()`, `translate()` e `rotate()`, e desenhando formas ao redor da origem `(0, 0)`.

O problema é que qualquer transformação, como a rotação ou translação, coloca os vértices na tela em posições totalmente diferentes das coordenadas relativas originais que definimos em código!

Felizmente, o Processing e o p5.js possuem duas funções muito úteis: `screenX()` e `screenY()`. Elas nos permitem enviar uma posição local `(x, y)` em relação ao objeto e receber de volta as coordenadas reais de tela, levando em consideração todas as transformações de matrizes ativas.

Embora pudéssemos atualizar todos os nossos exemplos anteriores para suportar isso, é muito mais simples assumir que todas as formas complexas são **polígonos** e utilizar o algoritmo de colisão [Polígono/Polígono](poly-poly) que já construímos!

---

## CONVERTENDO PONTOS LOCAIS EM COORDENADAS DE TELA

Em vez de definir um polígono usando coordenadas estáticas de tela, nós o definimos ao redor da origem `(0, 0)`. Por exemplo, aqui está um quadrado de `100 x 100` pixels:

```javascript
let square1 = [
  { x: -50, y: -50 },
  { x: 50, y: -50 },
  { x: 50, y: 50 },
  { x: -50, y: 50 }
];
```

Esse quadrado é então desenhado em sua posição usando `translate()` e `rotate()`. A cada quadro, convertemos esses pontos para coordenadas reais de tela enquanto as transformações de matriz estão aplicadas:

```javascript
function pointsToScreenCoords(points) {
  let screenPoints = [];
  for (let i = 0; i < points.length; i++) {
    // percorre todos os pontos e obtém as coordenadas x/y reais na tela
    let x = screenX(points[i].x, points[i].y);
    let y = screenY(points[i].x, points[i].y);
    screenPoints.push({ x: x, y: y });
  }
  return screenPoints;
}
```

Em seguida, enviamos esses pontos transformados para a colisão `polyPoly()` – super simples! Essa técnica funciona perfeitamente com código orientado a objetos e permite manipular objetos transformados no espaço sem precisar usar *bounding boxes* imprecisas.

---

## CÓDIGO COMPLETO MULTILINGUAGEM

<CodeTabs>

```javascript
// dois quadrados definidos em torno da origem (0, 0)
let square1 = [
  { x: -50, y: -50 },
  { x: 50, y: -50 },
  { x: 50, y: 50 },
  { x: -50, y: 50 }
];

let square2 = [
  { x: -100, y: -100 },
  { x: 100, y: -100 },
  { x: 100, y: 100 },
  { x: -100, y: 100 }
];

let angle = 0;

function setup() {
  createCanvas(600, 400);
  noCursor();
}

function draw() {
  background(255);

  // atualiza o ângulo de rotação
  angle += 0.02;

  // move a origem para a posição do primeiro quadrado
  push();
  translate(width / 3, height / 2);
  rotate(angle);

  // converte os quatro pontos do quadrado para coordenadas reais de tela
  let square1Screen = pointsToScreenCoords(square1);

  // desenha o quadrado
  fill(0, 150);
  noStroke();
  beginShape();
  for (let pt of square1) {
    vertex(pt.x, pt.y);
  }
  endShape(CLOSE);
  pop();

  // move a origem para a posição do segundo quadrado
  push();
  translate(width - width / 3, height / 2);
  rotate(angle);

  // obtém as coordenadas de tela para esta forma também
  let square2Screen = pointsToScreenCoords(square2);

  // verifica a colisão entre as formas transformadas
  let hit = polyPoly(square1Screen, square2Screen);
  if (hit) fill(255, 150, 0);
  else fill(0, 150, 255);

  // desenha o segundo quadrado
  beginShape();
  for (let pt of square2) {
    vertex(pt.x, pt.y);
  }
  endShape(CLOSE);
  pop();
}

// função que retorna as coordenadas reais de tela após transformações de matriz
function pointsToScreenCoords(points) {
  let screenPoints = [];
  for (let i = 0; i < points.length; i++) {
    let x = screenX(points[i].x, points[i].y);
    let y = screenY(points[i].x, points[i].y);
    screenPoints.push({ x: x, y: y });
  }
  return screenPoints;
}
```

```java
// dois quadrados definidos como arrays de PVector em torno da origem (0, 0)
PVector[] square1 = {
  new PVector(-50, -50),
  new PVector(50, -50),
  new PVector(50, 50),
  new PVector(-50, 50)
};

PVector[] square2 = {
  new PVector(-100, -100),
  new PVector(100, -100),
  new PVector(100, 100),
  new PVector(-100, 100)
};

float angle = 0;

void setup() {
  size(600, 400);
  noCursor();
}

void draw() {
  background(255);

  // atualiza o ângulo de rotação
  angle += 0.02;

  // move a origem para a posição do primeiro quadrado
  pushMatrix();
  translate(width/3, height/2);
  rotate(angle);

  // converte os quatro pontos do quadrado para coordenadas reais de tela
  PVector[] square1Screen = pointsToScreenCoords(square1);

  // desenha o quadrado
  fill(0, 150);
  noStroke();
  beginShape();
  for (PVector pt : square1) {
    vertex(pt.x, pt.y);
  }
  endShape(CLOSE);
  popMatrix();

  // move a origem para a posição do segundo quadrado
  pushMatrix();
  translate(width-width/3, height/2);
  rotate(angle);

  // obtém as coordenadas de tela para esta forma também
  PVector[] square2Screen = pointsToScreenCoords(square2);

  // verifica a colisão
  boolean hit = polyPoly(square1Screen, square2Screen);
  if (hit) fill(255, 150, 0);
  else fill(0, 150, 255);

  // desenha esta forma também
  beginShape();
  for (PVector pt : square2) {
    vertex(pt.x, pt.y);
  }
  endShape(CLOSE);
  popMatrix();
}

// função que retorna as coordenadas reais de tela após transformações de matriz
PVector[] pointsToScreenCoords(PVector[] points) {
  PVector[] screenPoints = new PVector[points.length];
  for (int i=0; i<points.length; i++) {
    float x = screenX(points[i].x, points[i].y);
    float y = screenY(points[i].x, points[i].y);
    screenPoints[i] = new PVector(x, y);
  }
  return screenPoints;
}
```

```python
import math

# no Pygame / Python puro, transformamos cada ponto usando rotação e translação
def transform_point(px, py, tx, ty, angle):
    cos_a = math.cos(angle)
    sin_a = math.sin(angle)
    rx = px * cos_a - py * sin_a + tx
    ry = px * sin_a + py * cos_a + ty
    return (rx, ry)

def points_to_screen_coords(points, tx, ty, angle):
    return [transform_point(pt[0], pt[1], tx, ty, angle) for pt in points]
```

</CodeTabs>

