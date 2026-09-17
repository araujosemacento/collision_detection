---
title: "Linha / Círculo"
slug: "line-circle"
order: 14
sketch: "LineCircle"
caption: "Use o mouse para posicionar o círculo sobre a linha!"
---

<script>
	import CodeTabs from '$lib/components/CodeTabs.svelte';
</script>

# LINHA / CÍRCULO

Para verificar se um círculo está colidindo com um segmento de reta, reutilizamos códigos de exemplos anteriores — uma prática que continuaremos adotando ao longo de todo o resto do livro. A matemática por trás dessas verificações começa a ficar um pouco mais cabeluda, mas vamos simplificar as partes mais difíceis passo a passo.

---

## PASSO A PASSO DO ALGORITMO

### 1. Testar se as extremidades da linha estão dentro do círculo

Primeiro, verificamos se qualquer uma das duas extremidades da linha está contida dentro do círculo. Isso é especialmente provável de acontecer quando a linha é muito menor que o diâmetro do círculo. Para isso, chamamos a função [Ponto/Círculo](point-circle) para ambas as extremidades. Se alguma delas estiver dentro, retornamos `true` imediatamente e pulamos os demais cálculos!

<CodeTabs>

```javascript
let dentro1 = pointCircle(x1, y1, cx, cy, r);
let dentro2 = pointCircle(x2, y2, cx, cy, r);

return dentro1 || dentro2;
```

```java
boolean dentro1 = pointCircle(x1,y1, cx,cy,r);
boolean dentro2 = pointCircle(x2,y2, cx,cy,r);

return dentro1 || dentro2;
```

```python
dentro1 = point_circle(x1, y1, cx, cy, r)
dentro2 = point_circle(x2, y2, cx, cy, r)

return dentro1 or dentro2
```

</CodeTabs>

### 2. Calcular o comprimento da linha

Em seguida, precisamos encontrar o ponto mais próximo da linha em relação ao centro do círculo. Para começar, calculamos o comprimento total da linha (`len`) aplicando o Teorema de Pitágoras:

<CodeTabs>

```javascript
let distX = x1 - x2;
let distY = y1 - y2;
let len = sqrt( (distX*distX) + (distY*distY) );
```

```java
float distX = x1 - x2;
float distY = y1 - y2;
float len = sqrt( (distX*distX) + (distY*distY) );
```

```python
dist_x = x1 - x2
dist_y = y1 - y2
length = math.sqrt( (dist_x * dist_x) + (dist_y * dist_y) )
```

</CodeTabs>

### 3. Calcular a projeção por produto escalar (_Dot Product_)

Depois, calculamos um valor de proporção que chamamos de `dot`. Se você já estudou matemática vetorial, isso equivale a realizar o [**produto escalar**](https://pt.wikipedia.org/wiki/Produto_escalar) (_dot product_) entre dois vetores. Se o termo não for familiar, não se preocupe! Considere esta etapa como uma porção de cálculo vetorial que você pode se alegrar de não ter que resolver à mão:

<CodeTabs>

```javascript
let dot = ((cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1)) / pow(len, 2);
```

```java
float dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / pow(len, 2);
```

```python
dot = ((cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1)) / (length ** 2)
```

</CodeTabs>

<div class="callout">
Caso tenha interesse de entender melhor o conceito de produto escalar, confira o capítulo [Bônus: Produto Escalar](bonus-dot_product).
</div>

### 4. Encontrar as coordenadas do ponto mais próximo

Usamos o valor de `dot` para calcular as coordenadas X e Y do ponto mais próximo da linha em relação ao centro do círculo:

<CodeTabs>

```javascript
let closestX = x1 + dot * (x2 - x1);
let closestY = y1 + dot * (y2 - y1);
```

```java
float closestX = x1 + (dot * (x2-x1));
float closestY = y1 + (dot * (y2-y1));
```

```python
closest_x = x1 + dot * (x2 - x1)
closest_y = y1 + dot * (y2 - y1)
```

</CodeTabs>

### 5. Verificar se o ponto projetado pertence ao segmento de reta

No entanto, essa equação vetorial projeta um ponto ao longo de uma reta imaginária estendida infinitamente em ambas as direções. Ou seja, ela poderia nos dar um ponto situado além das extremidades da linha!

Por isso, verificamos se esse ponto projetado `(closestX, closestY)` realmente pertence ao segmento de reta usando a função [Linha/Ponto](line-point) que criamos anteriormente. Esta é a primeira de muitas vezes em que empilharemos funções anteriores para resolver colisões mais complexas:

<CodeTabs>

```javascript
let naLinha = linePoint(x1, y1, x2, y2, closestX, closestY);
if (!naLinha) return false;
```

```java
boolean naLinha = linePoint(x1, y1, x2, y2, closestX, closestY);
if (!naLinha) return false;
```

```python
na_linha = line_point(x1, y1, x2, y2, closest_x, closest_y)
if not na_linha: return False
```

</CodeTabs>

Se o ponto mais próximo não estiver sobre o segmento de reta que forma nossa linha, podemos retornar `false` de imediato!

### 6. Calcular a distância ao centro e testar contra o raio

Por fim, calculamos a distância euclidiana entre o centro do círculo `(cx, cy)` e o ponto mais próximo encontrado `(closestX, closestY)`, usando o Teorema de Pitágoras:

<CodeTabs>

```javascript
let distX = closestX - cx;
let distY = closestY - cy;
let distancia = Math.sqrt(distX * distX + distY * distY);
```

```java
float distX = closestX - cx;
float distY = closestY - cy;
float distancia = sqrt( (distX*distX) + (distY*distY) );
```

```python
dist_x = closest_x - cx
dist_y = closest_y - cy
distancia = math.sqrt( (dist_x * dist_x) + (dist_y * dist_y) )
```

</CodeTabs>

Se essa distância for menor ou igual ao raio `r` do círculo, confirmamos a colisão! (assim como fizemos em [Ponto/Círculo](point-circle)).

<CodeTabs>

```javascript
if (distancia <= r) {
  return true;
}
return false;
```

```java
if (distance <= r) {
  return true;
}
return false;
```

```python
if distancia <= r:
    return True
return False
```

</CodeTabs>

---

## CÓDIGO COMPLETO

Abaixo está a implementação completa reunindo todas as etapas e incluindo as funções utilitárias aninhadas, a que acabamos de construir e outras duas de capítulos anteriores:

<CodeTabs>

```javascript
let cx = 0;      // posição do círculo (definida pelo mouse)
let cy = 0;
let r = 30;      // raio do círculo

let x1 = 100;    // coordenadas da linha
let y1 = 300;
let x2 = 500;
let y2 = 100;

function setup() {
  createCanvas(600, 400);
  noCursor();

  strokeWeight(15);  // deixa a linha mais fácil de visualizar
}

function draw() {
  background(255);

  cx = mouseX;
  cy = mouseY;

  // verifica se há colisão
  // se colidir, muda a cor da linha
  let colidiu = lineCircle(x1, y1, x2, y2, cx, cy, r);
  if (colidiu) {
    stroke(255, 150, 0, 150);
  } else {
    stroke(0, 150, 255, 150);
  }
  line(x1, y1, x2, y2);

  // desenha o círculo
  fill(0, 150);
  noStroke();
  ellipse(cx, cy, r * 2, r * 2);
}

// LINHA/CÍRCULO
function lineCircle(x1, y1, x2, y2, cx, cy, r) {

  // as extremidades da linha estão dentro do círculo?
  // se estiverem, retorna true imediatamente
  let inside1 = pointCircle(x1, y1, cx, cy, r);
  let inside2 = pointCircle(x2, y2, cx, cy, r);
  if (inside1 || inside2) return true;

  // calcula o comprimento da linha
  let distX = x1 - x2;
  let distY = y1 - y2;
  let len = sqrt((distX * distX) + (distY * distY));

  // calcula o produto escalar (dot product) da linha e do círculo
  let dot = (((cx - x1) * (x2 - x1)) + ((cy - y1) * (y2 - y1))) / pow(len, 2);

  // encontra o ponto mais próximo sobre a linha
  let closestX = x1 + (dot * (x2 - x1));
  let closestY = y1 + (dot * (y2 - y1));

  // esse ponto está realmente no segmento de reta?
  // se estiver, continua; se não, retorna false
  let onSegment = linePoint(x1, y1, x2, y2, closestX, closestY);
  if (!onSegment) return false;

  // desenha um círculo no ponto mais próximo sobre a linha
  fill(255, 0, 0);
  noStroke();
  ellipse(closestX, closestY, 20, 20);

  // calcula a distância até o ponto mais próximo
  distX = closestX - cx;
  distY = closestY - cy;
  let distance = sqrt((distX * distX) + (distY * distY));

  if (distance <= r) {
    return true;
  }
  return false;
}

// PONTO/CÍRCULO
function pointCircle(px, py, cx, cy, r) {

  let distX = px - cx;
  let distY = py - cy;
  let distance = sqrt((distX * distX) + (distY * distY));

  if (distance <= r) {
    return true;
  }
  return false;
}

// LINHA/PONTO
function linePoint(x1, y1, x2, y2, px, py) {

  let d1 = dist(px, py, x1, y1);
  let d2 = dist(px, py, x2, y2);

  let lineLen = dist(x1, y1, x2, y2);

  let buffer = 0.3;

  if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
    return true;
  }
  return false;
}
```

```java
float cx = 0;      // posição do círculo (definida pelo mouse)
float cy = 0;
float r = 30;      // raio do círculo

float x1 = 100;    // coordenadas da linha
float y1 = 300;
float x2 = 500;
float y2 = 100;

void setup() {
  size(600, 400);
  noCursor();

  strokeWeight(15);  // deixa a linha mais fácil de visualizar
}

void draw() {
  background(255);

  cx = mouseX;
  cy = mouseY;

  // verifica se há colisão
  // se colidir, muda a cor da linha
  boolean colidiu = lineCircle(x1, y1, x2, y2, cx, cy, r);
  if (colidiu) {
    stroke(255, 150, 0, 150);
  } else {
    stroke(0, 150, 255, 150);
  }
  line(x1, y1, x2, y2);

  // desenha o círculo
  fill(0, 150);
  noStroke();
  ellipse(cx, cy, r * 2, r * 2);
}

// LINHA/CÍRCULO
boolean lineCircle(float x1, float y1, float x2, float y2, float cx, float cy, float r) {

  // as extremidades da linha estão dentro do círculo?
  // se estiverem, retorna true imediatamente
  boolean inside1 = pointCircle(x1, y1, cx, cy, r);
  boolean inside2 = pointCircle(x2, y2, cx, cy, r);
  if (inside1 || inside2) return true;

  // calcula o comprimento da linha
  float distX = x1 - x2;
  float distY = y1 - y2;
  float len = sqrt((distX * distX) + (distY * distY));

  // calcula o produto escalar (dot product) da linha e do círculo
  float dot = (((cx - x1) * (x2 - x1)) + ((cy - y1) * (y2 - y1))) / pow(len, 2);

  // encontra o ponto mais próximo sobre a linha
  float closestX = x1 + (dot * (x2 - x1));
  float closestY = y1 + (dot * (y2 - y1));

  // esse ponto está realmente no segmento de reta?
  // se estiver, continua; se não, retorna false
  boolean onSegment = linePoint(x1, y1, x2, y2, closestX, closestY);
  if (!onSegment) return false;

  // opcionalmente, desenha um círculo no ponto mais próximo sobre a linha
  fill(255, 0, 0);
  noStroke();
  ellipse(closestX, closestY, 20, 20);

  // calcula a distância até o ponto mais próximo
  distX = closestX - cx;
  distY = closestY - cy;
  float distance = sqrt((distX * distX) + (distY * distY));

  if (distance <= r) {
    return true;
  }
  return false;
}

// PONTO/CÍRCULO
boolean pointCircle(float px, float py, float cx, float cy, float r) {

  float distX = px - cx;
  float distY = py - cy;
  float distance = sqrt((distX * distX) + (distY * distY));

  if (distance <= r) {
    return true;
  }
  return false;
}

// LINHA/PONTO
boolean linePoint(float x1, float y1, float x2, float y2, float px, float py) {

  float d1 = dist(px, py, x1, y1);
  float d2 = dist(px, py, x2, y2);

  float lineLen = dist(x1, y1, x2, y2);

  float buffer = 0.3;

  if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
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
pygame.display.set_caption("Linha / Círculo")
pygame.mouse.set_visible(False)

cx, cy = 0, 0
r = 30              # raio do círculo

x1, y1 = 100, 300   # coordenadas da linha
x2, y2 = 500, 100

espessura = 15      # deixa a linha mais fácil de visualizar

# Superfície com suporte a transparência pro círculo do mouse
superficie_circulo = pygame.Surface((r * 2, r * 2), pygame.SRCALPHA)
pygame.draw.circle(superficie_circulo, (0, 0, 0, 150), (r, r), r)

# LINHA/CÍRCULO
def line_circle(x1, y1, x2, y2, cx, cy, r):
    line_circle.ponto = None

    # as extremidades da linha estão dentro do círculo?
    # se estiverem, retorna True imediatamente
    inside1 = point_circle(x1, y1, cx, cy, r)
    inside2 = point_circle(x2, y2, cx, cy, r)
    if inside1 or inside2:
        return True

    # calcula o comprimento da linha
    dist_x = x1 - x2
    dist_y = y1 - y2
    line_len = math.hypot(dist_x, dist_y)

    # calcula o produto escalar (dot product) da linha e do círculo
    dot = (((cx - x1) * (x2 - x1)) + ((cy - y1) * (y2 - y1))) / (line_len ** 2)

    # encontra o ponto mais próximo sobre a linha
    closest_x = x1 + (dot * (x2 - x1))
    closest_y = y1 + (dot * (y2 - y1))

    # esse ponto está realmente no segmento de reta?
    # se estiver, continua; se não, retorna False
    on_segment = line_point(x1, y1, x2, y2, closest_x, closest_y)
    if not on_segment:
        return False

    # guarda as coordenadas do ponto mais próximo sobre a linha
    line_circle.ponto = (int(closest_x), int(closest_y))

    # calcula a distância até o ponto mais próximo
    dist_x = closest_x - cx
    dist_y = closest_y - cy
    distance = math.hypot(dist_x, dist_y)

    if distance <= r:
        return True
    return False

line_circle.ponto = None

# PONTO/CÍRCULO
def point_circle(px, py, cx, cy, r):
    dist_x = px - cx
    dist_y = py - cy
    distance = math.hypot(dist_x, dist_y)

    if distance <= r:
        return True
    return False

# LINHA/PONTO
def line_point(x1, y1, x2, y2, px, py):
    d1 = math.hypot(px - x1, py - y1)
    d2 = math.hypot(px - x2, py - y2)

    line_len = math.hypot(x2 - x1, y2 - y1)

    buffer = 0.3

    if line_len - buffer <= d1 + d2 <= line_len + buffer:
        return True
    return False

relogio = pygame.time.Clock()

while True:
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            pygame.quit()
            exit()

    tela.fill((255, 255, 255))

    # atualiza o círculo para as coordenadas do mouse
    cx, cy = pygame.mouse.get_pos()

    # verifica se há colisão
    # se colidir, muda a cor da linha
    colidiu = line_circle(x1, y1, x2, y2, cx, cy, r)
    cor = (255, 150, 0) if colidiu else (0, 150, 255)

    # desenha a linha primeiro
    pygame.draw.line(tela, cor, (x1, y1), (x2, y2), espessura)

    # desenha o ponto mais próximo sobre a linha
    if line_circle.ponto:
        pygame.draw.circle(tela, (255, 0, 0), line_circle.ponto, 10)

    # desenha o círculo
    tela.blit(superficie_circulo, (cx - r, cy - r))

    pygame.display.flip()
    relogio.tick(60)
```

</CodeTabs>

---

## VETORES E REFERÊNCIAS

A matemática com linhas se beneficia muito das funcionalidades de vetores de posição (`PVector` no Processing / `Vector2` em engines modernas). Se você deseja se aprofundar em física 2D e vetores, o livro [_Nature of Code_](http://natureofcode.com/book/) de Daniel Shiffman é uma excelente recomendação e uma introdução muito amigável ao conceito.

> **Atribuição:** Algoritmo construído com base na formulação matemática desenvolvida por **Philip Nicoletti** em sua publicação clássica no fórum [_CodeGuru_](https://web.archive.org/web/20210506235615/http://forums.codeguru.com/showthread.php?194400-Distance-between-point-and-line-segment).
