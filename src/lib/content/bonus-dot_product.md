---
title: "Bônus: Produto Escalar"
slug: "bonus-dot_product"
order: 30
sketch: null
---

<script>
	import CodeTabs from '$lib/components/CodeTabs.svelte';
	import Math from '$lib/components/Math.svelte';
	import CanvasSketch from '$lib/components/CanvasSketch.svelte';
</script>

# PRODUTO ESCALAR
## DOT PRODUCT

No capítulo [Linha / Círculo](line-circle), nós nos deparamos com uma equação meio mágica:

<CodeTabs>

```javascript
let dot = ((cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1)) / pow(len, 2);
```

```java
float dot = ((cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1)) / pow(len, 2);
```

```python
dot = ((cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1)) / (len ** 2)
```

</CodeTabs>

Naquele momento, apenas aceitamos que esse `dot` encontrava o ponto mais próximo da linha em relação ao centro do círculo. Mas **por que** essa fórmula funciona? De onde saíram essas multiplicações? Por que dividimos pelo comprimento ao quadrado (`len²`)?

Se você nunca teve contato com Álgebra Linear, não se preocupe! Vamos desconstruir essa fórmula passo a passo, usando só noções intuitivas de **vetores**, **geometria plana** e **trigonometria do triângulo retângulo**.

---

## 1. O PROBLEMA: A MENOR DISTÂNCIA

Imagina que a gente tem:
1. Uma linha no chão que vai do ponto **A(x1, y1)** até o ponto **B(x2, y2)**.
2. O centro de um círculo flutuando no ponto **C(cx, cy)**.

Queremos saber se o círculo encosta na linha. Para isso, precisamos responder: **qual é o ponto P sobre a linha que está mais próximo de C?**

```
         C (cx, cy) [Centro do círculo]
        /|
       / |
      /  |  (Ângulo reto: 90°)
     /   |
    A----P----------------------B
(x1,y1) [Ponto mais próximo] (x2,y2)
```

Geometricamente, a menor distância entre um ponto qualquer e uma reta é sempre a linha que forma um **ângulo reto (90°)** com ela. Esse ponto de encontro **P** é chamado de **projeção ortogonal** de C sobre a reta.

---

## 2. PENSANDO EM VETORES
### SETAS NO ESPAÇO

Em vez de pensar apenas em coordenadas isoladas, vamos pensar em **vetores**. Um vetor é basicamente uma **seta** que aponta de um lugar para outro, descrito por um deslocamento horizontal (**Δx**) e um vertical (**Δy**).

Temos dois vetores principais partindo do início da linha (**A**):

1. **Vetor da Linha (L)**: A seta que vai de A até B.
   * `L = (x2 - x1, y2 - y1)`
   * O comprimento total dessa linha (`len`) é a hipotenusa calculada por Pitágoras:  
     `len = √( (x2 - x1)² + (y2 - y1)² )`

2. **Vetor até o Círculo (V)**: A seta que vai de A até o centro do círculo C.
   * `V = (cx - x1, cy - y1)`

```
          C (Centro do Círculo)
         ^
        / 
    V  /  
      /   
     / θ 
    A -----------------------> B
                 L (Linha)
```

---

## 3. A TRIGONOMETRIA DA "SOMBRA" PROJEÇÃO ESCALAR

Imagine uma luz no alto, apontando perpendicularmente para a linha AB. O vetor **V** (que vai até o círculo) projeta uma **sombra** no chão que cobre parte da linha AB.

Olhando para o triângulo retângulo formado por A, C e o ponto P:

* A **hipotenusa** é o comprimento do vetor V, denotado pelo módulo de V, `|V|`.
* O **cateto adjacente** ao ângulo **θ** é a distância de A até P (o comprimento da sombra).

Lembrando da definição básica do cosseno no triângulo retângulo:

<Math expr={String.raw`\cos(\theta) = \frac{\text{Cateto Adjacente}}{\text{Hipotenusa}} = \frac{\text{distância } AP}{|\vec{V}|}`} display />

Passando `|V|` para o outro lado da equação, descobrimos o **comprimento exato da sombra**:

<Math expr={String.raw`\text{distância } AP = |\vec{V}| \, \cos(\theta)`} display />

Esse valor numérico é o que se chama na matemática de **Projeção Escalar**.

---

## 4. O TRUQUE: O QUE É O PRODUTO ESCALAR?

Calcular o ângulo **θ** diretamente com funções trigonométricas como `acos()` ou `cos()` no computador é computacionalmente lento.

É aqui que entra o **Produto Escalar** (representado por um ponto `·`).

Por definição matemática, o produto escalar entre dois vetores `V = (Vx, Vy)` e `L = (Lx, Ly)` pode ser calculado de **duas formas equivalentes**:

- ### **Forma 1: Pelas componentes cartesianas (fácil pro computador)**

Basta multiplicar as coordenadas x entre si, as coordenadas y entre si e somar tudo:

<Math expr={String.raw`\vec{V} \cdot \vec{L} = (V_x)(L_x) + (V_y)(L_y)`} display />

Substituindo pelas nossas variáveis do código, temos:

<Math expr={String.raw`\vec{V} \cdot \vec{L} = (cx - x_1)(x_2 - x_1) + (cy - y_1)(y_2 - y_1)`} display />

- ### **Forma 2: Pela geometria (tamanho e ângulo)**

Multiplicando o módulo do vetor V, pelo módulo do vetor L e pelo cosseno do ângulo entre eles:

<Math expr={String.raw`\vec{V} \cdot \vec{L} = |\vec{V}| \, |\vec{L}| \, \cos(\theta)`} display />

<div class="callout">
As duas fórmulas acima produzem <em>exatamente o mesmo resultado numérico</em>! Isso significa que podemos descobrir informações sobre o ângulo e a projeção apenas com somas e multiplicação, sem precisar calcular senos ou cossenos.
</div>

---

## 5. A DEMONSTRAÇÃO

Agora vamos juntar todas as peças para entender a fórmula usada no código de colisão!

### Passo 1: Queremos a proporção do trajeto
Não queremos apenas a distância em pixels de A até P. Queremos saber **que fração do caminho** ao longo da linha AB o ponto P representa. Chamamos essa fração de **t** (ou `dot` no nosso código):

<Math expr={String.raw`t = \frac{\text{distância } AP}{\text{comprimento total } AB} = \frac{|\vec{V}| \, \cos(\theta)}{|\vec{L}|}`} display />

* Se **t = 0**: o ponto mais próximo é o início A.
* Se **t = 1**: o ponto mais próximo é o fim B.
* Se **t = 0.5**: o ponto mais próximo é a metade exata da linha.

Assim por diante... O que significa que se o valor de **t** for menor que **0**, ou maior que **1**, o ponto mais próximo estará **fora** da linha, mesmo que esteja projetado sobre a reta que a contém.

### Passo 2: Multiplicando em cima e embaixo por |L|
Para fazer o produto escalar aparecer no numerador, multiplicamos a fração por `|L|` sobre `|L|` (o que não altera seu valor):

<Math expr={String.raw`t = (\frac{|\vec{V}| \, \cos(\theta)}{|\vec{L}|}) \, (\frac{|\vec{L}|}{|\vec{L}|}) = \frac{|\vec{V}| \, \cos(\theta) \, |\vec{L}|}{|\vec{L}| \, |\vec{L}|}`} display />

Reorganizando o numerador e o denominador, temos:

<Math expr={String.raw`t = \frac{|\vec{V}| \, |\vec{L}| \, \cos(\theta)}{|\vec{L}|^2}`} display />

### Passo 3: Substituição direta
Repara que o numerador é **exatamente a definição geométrica do produto escalar**:

<Math expr={String.raw`|\vec{V}| \, |\vec{L}| \, \cos(\theta) = \vec{V} \cdot \vec{L} = (cx - x_1)(x_2 - x_1) + (cy - y_1)(y_2 - y_1)`} />

<br><br>

E o denominador é o quadrado do comprimento da linha:

<Math expr={String.raw`|\vec{L}|^2 = \text{len}^2`} />

<br><br>

Substituindo tudo, chegamos à fórmula final exata:

<Math expr={String.raw`t = \text{dot} = \frac{(cx - x_1)(x_2 - x_1) + (cy - y_1)(y_2 - y_1)}{\text{len}^2}`} display />

---

## 6. O PORQUÊ DE CADA MODULARIDADE NO CÓDIGO

Agora que entendemos a matemática, vamos analisar a modularidade e o propósito de cada etapa do algoritmo em [Linha / Círculo](line-circle):

### 1. Por que calcular as coordenadas de `closestX` e `closestY`?
Com a proporção `dot` em mãos, encontramos a posição real do ponto P fazendo uma [**interpolação linear**](https://pt.wikipedia.org/wiki/Interpola%C3%A7%C3%A3o_linear) (avançando uma porcentagem `dot` a partir do ponto A):

<CodeTabs>

```javascript
let closestX = x1 + (dot * (x2 - x1));
let closestY = y1 + (dot * (y2 - y1));
```

```java
float closestX = x1 + (dot * (x2-x1));
float closestY = y1 + (dot * (y2-y1));
```

```python
closest_x = x1 + (dot * (x2 - x1))
closest_y = y1 + (dot * (y2 - y1))
```

</CodeTabs>

### 2. Por que testar se o ponto está no segmento (`linePoint` ou `0 ≤ dot ≤ 1`)?
A projeção matemática assume uma reta infinita. Se o círculo estiver muito afastado para além das pontas da linha, a "sombra" do vetor, formado pelo início da linha até o centro do círculo, cai no vazio:

```
  C (Círculo)
  |
  |  (Projeção caiu fora do segmento!)
  v
--P--------- A ------------------------ B -----------
 (dot < 0)  (dot = 0)                 (dot = 1)   (dot > 1)
```

* Se `dot < 0`: o ponto mais próximo na reta está antes de A.
* Se `dot > 1`: o ponto mais próximo na reta está depois de B.
* Se `0 ≤ dot ≤ 1`: o ponto mais próximo está perfeitamente sobre o segmento entre A e B.

### 3. Por que testar a distância contra o raio?
Tendo o ponto mais próximo `P(closestX, closestY)`, medimos a distância euclidiana real entre P e o centro C:

> **distância = √( (closestX - cx)² + (closestY - cy)² )**

Se essa distância for menor ou igual ao raio `r`, confirmamos a colisão, porque o ponto `P` estaria dentro ou tocando a área do círculo!

---

## 7. RESUMO E FUNÇÕES UTILITÁRIAS

> **Em conclusão, o produto escalar nada mais é do que uma forma ultra rápida e elegante de projetar um ponto sobre uma reta sem precisar calcular ângulos nem funções trigonométricas pesadas.**

Ele é a base não apenas para colisões de linha e círculo, mas também para cálculos de reflexão de vetores e física de rebotes em jogos 2D/3D, cones de visão de inimigos em inteligência artificial e detecção avançada de colisões entre polígonos complexos ([*Separating Axis Theorem - SAT*](https://dyn4j.org/2010/01/sat/)).

Embora tenhamos construído a fórmula passo a passo com coordenadas cartesianas para desmistificar a matemática, no desenvolvimento real você não precisa reinventar a roda. Todos os três ecossistemas abordados no livro possuem classes de vetores com funções utilitárias prontas para calcular o produto escalar:

* **p5.js:** através do método [`p5.Vector.dot()`](https://p5js.org/reference/p5.Vector/dot/);
* **Processing:** através do método [`PVector.dot()`](https://processing.org/reference/PVector_dot_.html);
* **Pygame:** através do método [`Vector2.dot()`](https://github.com/Rabbid76/PyGameExamplesAndAnswers/blob/master/documentation/pygame/pygame_math_vector_and_reflection.md#dot-product) disponível no módulo `pygame.math`.

Analise o código da demonstração interativa a seguir, que exemplifica o uso dessas funções:

<CanvasSketch sketchName="DotProduct" caption="Demonstração interativa p5.js do produto escalar e projeção entre dois vetores" />

<CodeTabs>

```javascript
function setup() {
  createCanvas(600, 250);
}

function draw() {
  background(255);

  // Centro / Origem
  let v0 = createVector(width / 4, height / 2);

  // Vetor preto (v1) apontando para a direita
  let v1 = createVector(width / 2, 0);

  // Vetor azul (v2) seguindo o mouse
  let v2 = createVector(mouseX - v0.x, mouseY - v0.y);

  // Calcula a proporção do produto escalar ao longo do segmento (0 a 1)
  let lenSq = v1.magSq();
  let dot = lenSq !== 0 ? v2.dot(v1) / lenSq : 0;
  let onSegment = dot >= 0 && dot <= 1;

  // Ponto de projeção: para na reta ou "cai no vazio" além do canvas
  let px = mouseX;
  let py = onSegment ? v0.y : (mouseY <= v0.y ? height * 2 : -height * 2);

  // Linha tracejada da ponta do vetor até o ponto P (ou caindo fora)
  drawDashedLine(mouseX, mouseY, px, py);

  // Desenha os vetores
  drawArrow(v0, v1, 'black');
  drawArrow(v0, v2, color(0, 150, 255));

  // Desenha o ponto P visível apenas enquanto contido no segmento
  if (onSegment) {
    fill(255, 150, 0);
    noStroke();
    circle(px, py, 8);
    textSize(13);
    textStyle(BOLD);
    text('P', px - 4, py + (mouseY < v0.y ? 16 : -8));
    textStyle(NORMAL);
  }

  // Valor numérico de dot
  noStroke();
  fill(onSegment ? 0 : color(255, 0, 0));
  textSize(16);
  text(`dot = ${dot.toFixed(2)}`, 15, height - 15);
}

// Desenha uma seta entre a base e o vetor
function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

// Desenha uma linha tracejada
function drawDashedLine(x1, y1, x2, y2) {
  push();
  stroke(180);
  strokeWeight(1.5);
  drawingContext.setLineDash([5, 5]);
  line(x1, y1, x2, y2);
  drawingContext.setLineDash([]);
  pop();
}
```

```java
void setup() {
  size(600, 250);
}

void draw() {
  background(255);

  // Centro / Origem
  PVector v0 = new PVector(width / 4.0, height / 2.0);

  // Vetor preto (v1) apontando para a direita
  PVector v1 = new PVector(width / 2.0, 0);

  // Vetor azul (v2) seguindo o mouse
  PVector v2 = new PVector(mouseX - v0.x, mouseY - v0.y);

  // Calcula a proporção do produto escalar ao longo do segmento (0 a 1)
  float lenSq = v1.magSq();
  float dot = lenSq != 0 ? v2.dot(v1) / lenSq : 0;
  boolean onSegment = dot >= 0 && dot <= 1;

  // Ponto de projeção: para na reta ou "cai no vazio" além do canvas
  float px = mouseX;
  float py = onSegment ? v0.y : (mouseY <= v0.y ? height * 2 : -height * 2);

  // Linha tracejada da ponta do vetor até o ponto P (ou caindo fora)
  drawDashedLine(mouseX, mouseY, px, py);

  // Desenha os vetores
  drawArrow(v0, v1, color(0));
  drawArrow(v0, v2, color(0, 150, 255));

  // Desenha o ponto P visível apenas enquanto contido no segmento
  if (onSegment) {
    fill(255, 150, 0);
    noStroke();
    ellipse(px, py, 8, 8);
    fill(0);
    textSize(13);
    text("P", px - 4, py + (mouseY < v0.y ? 16 : -8));
  }

  // Valor numérico de dot
  noStroke();
  fill(onSegment ? color(0) : color(255, 0, 0));
  textSize(16);
  text("dot = " + nf(dot, 1, 2), 15, height - 15);
}

// Desenha uma seta entre a base e o vetor
void drawArrow(PVector base, PVector vec, color myColor) {
  pushMatrix();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  float arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  popMatrix();
}

// Desenha uma linha tracejada
void drawDashedLine(float x1, float y1, float x2, float y2) {
  stroke(180);
  strokeWeight(1.5);
  float d = dist(x1, y1, x2, y2);
  if (d == 0) return;
  for (float i = 0; i < d; i += 10) {
    float startX = lerp(x1, x2, i / d);
    float startY = lerp(y1, y2, i / d);
    float endX = lerp(x1, x2, min((i + 5) / d, 1.0));
    float endY = lerp(y1, y2, min((i + 5) / d, 1.0));
    line(startX, startY, endX, endY);
  }
}
```

```python
import pygame
from pygame.math import Vector2

pygame.init()

LARGURA, ALTURA = 600, 250
tela = pygame.display.set_mode((LARGURA, ALTURA))
pygame.display.set_caption("Demonstração: Produto Escalar")
fonte = pygame.font.SysFont(None, 24)
relogio = pygame.time.Clock()

def desenha_seta(superficie, base, vec, cor):
    fim = base + vec
    pygame.draw.line(superficie, cor, (int(base.x), int(base.y)), (int(fim.x), int(fim.y)), 3)
    if vec.length() > 7:
        norm = vec.normalize()
        p1 = fim
        p2 = fim - norm.rotate(25) * 7
        p3 = fim - norm.rotate(-25) * 7
        pygame.draw.polygon(superficie, cor, [(int(p.x), int(p.y)) for p in (p1, p2, p3)])

def desenha_linha_tracejada(superficie, cor, inicio, fim, dash_len=5):
    dist = inicio.distance_to(fim)
    if dist == 0:
        return
    direcao = (fim - inicio).normalize()
    i = 0
    while i < dist:
        p1 = inicio + direcao * i
        p2 = inicio + direcao * min(i + dash_len, dist)
        pygame.draw.line(superficie, cor, (int(p1.x), int(p1.y)), (int(p2.x), int(p2.y)), 2)
        i += dash_len * 2

while True:
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            pygame.quit()
            raise SystemExit

    tela.fill((255, 255, 255))

    # Centro / Origem
    v0 = Vector2(LARGURA // 4, ALTURA // 2)

    # Vetor preto (v1) apontando para a direita
    v1 = Vector2(LARGURA // 2, 0)

    # Vetor azul (v2) seguindo o mouse
    mouse_x, mouse_y = pygame.mouse.get_pos()
    v2 = Vector2(mouse_x - v0.x, mouse_y - v0.y)

    # Calcula a proporção do produto escalar ao longo do segmento (0 a 1)
    len_sq = v1.length_squared()
    dot = v2.dot(v1) / len_sq if len_sq != 0 else 0
    on_segment = 0 <= dot <= 1

    # Ponto de projeção: para na reta ou "cai no vazio" além do canvas
    px = mouse_x
    py = v0.y if on_segment else (ALTURA * 2 if mouse_y <= v0.y else -ALTURA * 2)

    # Linha tracejada da ponta do vetor até o ponto P (ou caindo fora)
    desenha_linha_tracejada(tela, (180, 180, 180), Vector2(mouse_x, mouse_y), Vector2(px, py))

    # Desenha os vetores
    desenha_seta(tela, v0, v1, (0, 0, 0))
    desenha_seta(tela, v0, v2, (0, 150, 255))

    # Desenha o ponto P visível apenas enquanto contido no segmento
    if on_segment:
        pygame.draw.circle(tela, (255, 150, 0), (int(px), int(py)), 4)
        rotulo_p = fonte.render("P", True, (0, 0, 0))
        offset_y = 8 if mouse_y < v0.y else -20
        tela.blit(rotulo_p, (int(px) - 5, int(py) + offset_y))

    # Valor numérico de dot
    cor_texto = (0, 0, 0) if on_segment else (255, 0, 0)
    texto = fonte.render(f"dot = {dot:.2f}", True, cor_texto)
    tela.blit(texto, (15, ALTURA - 30))

    pygame.display.flip()
    relogio.tick(60)
```

</CodeTabs>
