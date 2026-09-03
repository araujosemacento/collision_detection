---
title: "Círculo / Retângulo"
slug: "circle-rect"
order: 11
sketch: "CircleRect"
caption: "Mova o círculo com o mouse para colidir com o retângulo!"
---

<script>
	import CodeTabs from '$lib/components/CodeTabs.svelte';
</script>

# CÍRCULO / RETÂNGULO

Este último exemplo dessa seção combina o código de [círculos](circle-point) e [retângulos](point-rect) vistos anteriormente. Temos um círculo na posição `(cx, cy)` com raio `r` e um retângulo na posição `(rx, ry)` com largura `rw` e altura `rh`.

Nosso algoritmo primeiro testa qual borda do retângulo está mais próxima do centro do círculo e, em seguida, verifica a colisão aplicando o Teorema de Pitágoras.

Para começar, criamos variáveis temporárias (`testX` e `testY`) para guardar as coordenadas das bordas mais próximas do retângulo. Inicialmente, atribuímos a elas a própria posição do centro do círculo:

<CodeTabs>

```javascript
let testX = cx;
let testY = cy;
```

```java
float testX = cx;
float testY = cy;
```

```python
test_x = cx
test_y = cy
```

</CodeTabs>

Em seguida, realizamos os quatro testes condicionais:

- Se o centro do círculo estiver à **ESQUERDA** do retângulo, testamos contra a borda **esquerda** (`rx`).
- Se o centro do círculo estiver à **DIREITA** do retângulo, testamos contra a borda **direita** (`rx + rw`).
- Se o centro do círculo estiver **ACIMA** do retângulo, testamos contra a borda **superior** (`ry`).
- Se o centro do círculo estiver **ABAIXO** do retângulo, testamos contra a borda **inferior** (`ry + rh`).

Em código, esses testes são estruturados assim:

<CodeTabs>

```javascript
if (cx < rx)         testX = rx;        // borda esquerda
else if (cx > rx+rw) testX = rx+rw;     // borda direita

if (cy < ry)         testY = ry;        // borda superior
else if (cy > ry+rh) testY = ry+rh;     // borda inferior
```

```java
if (cx < rx)         testX = rx;        // borda esquerda
else if (cx > rx+rw) testX = rx+rw;     // borda direita

if (cy < ry)         testY = ry;        // borda superior
else if (cy > ry+rh) testY = ry+rh;     // borda inferior
```

```python
if cx < rx:
    test_x = rx         # borda esquerda
elif cx > rx + rw:
    test_x = rx + rw    # borda direita

if cy < ry:
    test_y = ry         # borda superior
elif cy > ry + rh:
    test_y = ry + rh    # borda inferior
```

</CodeTabs>

Agora que descobrimos quais coordenadas de borda estão mais próximas, usamos o Teorema de Pitágoras entre o centro do círculo `(cx, cy)` e o ponto encontrado `(testX, testY)`:

<CodeTabs>

```javascript
let distX = cx - testX;
let distY = cy - testY;
let distance = Math.sqrt((distX * distX) + (distY * distY));
```

```java
float distX = cx - testX;
float distY = cy - testY;
float distance = sqrt( (distX*distX) + (distY*distY) );
```

```python
dist_x = cx - test_x
dist_y = cy - test_y
distance = math.sqrt((dist_x ** 2) + (dist_y ** 2))
```

</CodeTabs>

Por fim, comparamos essa distância com o raio do círculo: se `distance <= radius`, ocorreu uma colisão!

<CodeTabs>

```javascript
let cx = 0;     // posição do circulo (definida pelo mouse)
let cy = 0;
let r = 30;     // raio do circulo

let rx = 200;   // posição do retangulo
let ry = 100;
let rw = 200;   // e as dimensões
let rh = 200;

function setup() {
  createCanvas(600, 400);
  noCursor();

  noStroke();
}

function draw() {
  background(255);

  // atualiza as coordenadas do circulo
  cx = mouseX;
  cy = mouseY;

  // verifica se há colisão
  // se colidir, muda a cor do retangulo
  let colidiu = circleRect(cx, cy, r, rx, ry, rw, rh);
  if (colidiu) {
    fill(255, 150, 0);
  } else {
    fill(0, 150, 255);
  }
  rect(rx, ry, rw, rh);

  // desenha o círculo
  fill(0, 150);
  ellipse(cx, cy, r*2, r*2);
}

// CÍRCULO/RETÂNGULO
function circleRect(cx, cy, r, rx, ry, rw, rh) {

  // variáveis temporárias pra definir as bordas pra realização do cálculo de teste
  let testX = cx;
  let testY = cy;

  // verificando as bordas
  if (cx < rx) testX = rx;                // borda esquerda
  else if (cx > rx + rw) testX = rx + rw; // borda direita

  if (cy < ry) testY = ry;                // borda superior
  else if (cy > ry + rh) testY = ry + rh; // borda inferior

  // aplicando o Teorema de Pitágoras pra calcular a distância
  let distX = cx - testX;
  let distY = cy - testY;
  let distance = sqrt((distX * distX) + (distY * distY));

  // se a distância for menor ou igual ao raio, ocorreu uma colisão!
  if (distance <= r) {
    return true;
  }
  return false;
}
```

```java
float cx = 0;     // posição do círculo (definida pelo mouse)
float cy = 0;
float r = 30;     // raio do círculo

float rx = 200;   // posição do retângulo
float ry = 100;
float rw = 200;   // e as dimensões
float rh = 200;

void setup() {
  size(600, 400);
  noCursor();

  noStroke();
}

void draw() {
  background(255);

  // atualiza as coordenadas do círculo
  cx = mouseX;
  cy = mouseY;

  // verifica se há colisão
  // se colidir, muda a cor do retângulo
  boolean colidiu = circleRect(cx, cy, r, rx, ry, rw, rh);
  if (colidiu) {
    fill(255, 150, 0);
  } else {
    fill(0, 150, 255);
  }
  rect(rx, ry, rw, rh);

  // desenha o círculo
  fill(0, 150);
  ellipse(cx, cy, r*2, r*2);
}

// CÍRCULO/RETÂNGULO
boolean circleRect(float cx, float cy, float r, float rx, float ry, float rw, float rh) {

  // variáveis temporárias pra definir as bordas pra realização do cálculo de teste
  float testX = cx;
  float testY = cy;

  // verificando as bordas
  if (cx < rx) testX = rx;                // borda esquerda
  else if (cx > rx + rw) testX = rx + rw; // borda direita

  if (cy < ry) testY = ry;                // borda superior
  else if (cy > ry + rh) testY = ry + rh; // borda inferior

  // aplicando o Teorema de Pitágoras pra calcular a distância
  float distX = cx - testX;
  float distY = cy - testY;
  float distance = sqrt((distX * distX) + (distY * distY));

  // se a distância for menor ou igual ao raio, ocorreu uma colisão!
  if (distance <= r) {
    return true;
  }
  return false;
}
```

```python
import pygame, math
pygame.init()

LARGURA, ALTURA = 600, 400
tela = pygame.display.set_mode((LARGURA, ALTURA))
pygame.display.set_caption("Círculo / Retângulo")
pygame.mouse.set_visible(False)

cx, cy = 0, 0                         # posição do círculo (definida pelo mouse)
r = 30                                # raio do círculo

rx, ry, rw, rh = 200, 100, 200, 200   # posição e dimensões do retângulo

def circle_rect(cx, cy, r, rx, ry, rw, rh):
    # variáveis temporárias pra definir as bordas pra realização do cálculo de teste
    test_x = cx
    test_y = cy

    # verificando as bordas
    if cx < rx: test_x = rx               # borda esquerda
    elif cx > rx + rw: test_x = rx + rw   # borda direita

    if cy < ry: test_y = ry               # borda superior
    elif cy > ry + rh: test_y = ry + rh   # borda inferior

    # aplicando o Teorema de Pitágoras pra calcular a distância
    dist_x = cx - test_x
    dist_y = cy - test_y
    distance = math.sqrt((dist_x ** 2) + (dist_y ** 2))

    # se a distância for menor ou igual ao raio, ocorreu uma colisão!
    if distance <= r:
        return True
    return False

while True:
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            pygame.quit()
            exit()
    
    # atualiza as coordenadas do círculo
    cx, cy = pygame.mouse.get_pos()

    tela.fill((255, 255, 255))

    # verifica se há colisão
    # se colidir, muda a cor do retângulo
    colidiu = circle_rect(cx, cy, r, rx, ry, rw, rh)
    if colidiu:
        cor = (255, 150, 0)
    else:
        cor = (0, 150, 255)
    
    # desenha o retângulo
    pygame.draw.rect(tela, cor, (rx, ry, rw, rh))
    
    # desenha o círculo
    pygame.draw.circle(tela, (0, 0, 0), (int(cx), int(cy)), int(r))
    
    pygame.display.flip()

```

</CodeTabs>

> **Atribuição:** Este algoritmo didático é baseado na solução clássica desenvolvida por [**Matt Worden**](https://web.archive.org/web/20250512153550/https://vband3d.tripod.com/visualbasic/tut_mixedcollisions.htm).

