---
title: "Ponto / Retângulo"
slug: "point-rect"
order: 9
sketch: "PointRect"
caption: "Mova o ponteiro do mouse para dentro do retângulo!"
description: "Algoritmo de teste de inclusão de ponto em retângulo usando coordenadas cartesianas (Bounding Box)."
image: "images/rect-bounding-box.jpg"
---

<script>
	import CodeTabs from '$lib/components/CodeTabs.svelte';
</script>

# PONTO / RETÂNGULO

Agora as coisas começam a esquentar, já que checar colisões com objetos circulares é bastante direto. A distância do centro até a borda é a mesma em todas as direções. Já com retângulos, o processo é um pouco mais detalhado.

Imagine um retângulo definido por sua posição superior esquerda `(rx, ry)` e dimensões de largura e altura `(rw, rh)`:

<CodeTabs>

```javascript
let rx = 10; // posição X (canto superior esquerdo)
let ry = 10; // posição Y
let rw = 30; // largura (width)
let rh = 30; // altura (height)
```

```java
float rx = 10;  // posição X (canto superior esquerdo)
float ry = 10;  // posição Y
float rw = 30;  // largura (width)
float rh = 30;  // altura (height)
```

```python
rx = 10  # posição X (canto superior esquerdo)
ry = 10  # posição Y
rw = 30  # largura (width)
rh = 30  # altura (height)
```

</CodeTabs>

Para testar se um ponto `(px, py)` está contido dentro do retângulo, precisamos verificar quatro condições em conjunto:

- O X do ponto está à **DIREITA** da borda esquerda? (`px >= rx`)
- O X do ponto está à **ESQUERDA** da borda direita? (`px <= rx + rw`)
- O Y do ponto está **ABAIXO** da borda superior? (`py >= ry`)
- O Y do ponto está **ACIMA** da borda inferior? (`py <= ry + rh`)

Se **todas** as quatro afirmações forem verdadeiras simultaneamente, o ponto está dentro do retângulo! Primeiramente, vamos pensar sobre testar o lado esquerdo do retângulo. Se o valor de x do ponto for maior ou igual ao valor de x do lado esquerdo do retângulo, então o ponto está à direita do lado esquerdo do retângulo:

<CodeTabs>

```javascript
if (px >= rx) {
  // px está à direita do lado esquerdo
}
```

```java
if (px >= rx) {
  // px está à direita do lado esquerdo
}
```

```python
if px >= rx:
    # px está à direita do lado esquerdo
```

</CodeTabs>

Até aqui tudo bem, mas não é muito intuitivo, né? Veja o diagrama abaixo. Ele coloca em perspectiva o lado esquerdo do retângulo e as relações entre os quatro valores que o definem (`rx, ry, rw e rh`):

![Borda esquerda e limites do retângulo](images/rect-bounding-box.jpg)

Então, se quisermos verificar o lado direito, precisamos saber sua posição no eixo X, que é a soma do seu lado esquerdo (`rx`) e sua largura (`rw`):

<CodeTabs>

```javascript
let ladoDireito = rx + rw;

if (px <= ladoDireito) {
  // px está à esquerda do lado direito
}
```

```java
float ladoDireito = rx + rw;

if (px <= ladoDireito) {
  // px está à esquerda do lado direito
}
```

```python
lado_direito = rx + rw

if px <= lado_direito:
    # px está à esquerda do lado direito
```

</CodeTabs>

Assim sucessivamente, até termos como verificar se um ponto está dentro do retângulo. Vamos escrever a função:

<CodeTabs>

```javascript
function pointRect(px, py, rx, ry, rw, rh) {
  // O ponto está dentro dos limites do retângulo?
  if (
    px >= rx && // à direita da borda esquerda E
    px <= rx + rw && // à esquerda da borda direita E
    py >= ry && // abaixo da borda superior E
    py <= ry + rh // acima da borda inferior
  ) {
    return true;
  }
  return false;
}
```

```java
boolean pointRect(float px, float py, float rx, float ry, float rw, float rh) {
  // O ponto está dentro dos limites do retângulo?
  if (px >= rx &&        // à direita da borda esquerda E
      px <= rx + rw &&   // à esquerda da borda direita E
      py >= ry &&        // abaixo da borda superior E
      py <= ry + rh) {   // acima da borda inferior
        return true;
  }
  return false;
}
```

```python
def point_rect(px, py, rx, ry, rw, rh):
    # O ponto está dentro dos limites do retângulo?
    if (px >= rx and        # à direita da borda esquerda E
        px <= rx + rw and   # à esquerda da borda direita E
        py >= ry and        # abaixo da borda superior E
        py <= ry + rh):     # acima da borda inferior
        return True
    return False

# Dica Pygame (usando a classe Rect nativa):
# rect = pygame.Rect(rx, ry, rw, rh)
# hit = rect.collidepoint(px, py)
```

</CodeTabs>

Se todas as condições forem verdadeiras, confirmamos uma colisão. Note que as condições do `if` foram escritas em linhas separadas para facilitar a leitura. Isso vai do seu gosto pessoal, mas será um padrão mantido nos exemplos para facilitar o entendimento.

Utilizado em um exemplo completo, podemos alterar a cor do retângulo quando o ponto estiver dentro dele:

<CodeTabs>

```javascript
// Posição do ponto (controlado pelo mouse)
let px = 0;
let py = 0;

// Posição e dimensões do retângulo
let rx = 200;
let ry = 100;
let rw = 200;
let rh = 200;

function setup() {
  createCanvas(600, 400);
  noCursor();

  strokeWeight(15);
}

function draw() {
  background(255);

  // Atualiza a posição para as coordenadas do mouse
  px = mouseX;
  py = mouseY;

  // ------------------------------------------------
  // Verifica se há colisão entre o ponto e o retângulo
  let colidindo = pointRect(px, py, rx, ry, rw, rh);

  // Se houver colisão, altera a cor do retângulo
  if (colidindo) {
    fill(255, 150, 0);
  } else {
    fill(0, 150, 255);
  }
  // ------------------------------------------------

  // Desenha o retângulo
  noStroke();
  rect(rx, ry, rw, rh);

  // Desenha o ponto
  stroke(0);
  point(px, py);
}

function pointRect(px, py, rx, ry, rw, rh) {
  // O ponto está dentro dos limites do retângulo?
  if (
    px >= rx && // à direita da borda esquerda E
    px <= rx + rw && // à esquerda da borda direita E
    py >= ry && // abaixo da borda superior E
    py <= ry + rh // acima da borda inferior
  ) {
    return true;
  }
  return false;
}
```

```java
// Posição do ponto (controlado pelo mouse)
float px = 0;
float py = 0;

// Posição e dimensões do retângulo
float rx = 200;
float ry = 100;
float rw = 200;
float rh = 200;

void setup() {
  size(600, 400);
  noCursor();

  strokeWeight(15);
}

void draw() {
  background(255);

  // Atualiza a posição para as coordenadas do mouse
  px = mouseX;
  py = mouseY;

  // ------------------------------------------------
  // Verifica se há colisão entre o ponto e o retângulo
  boolean colidindo = pointRect(px, py, rx, ry, rw, rh);

  // Se houver colisão, altera a cor do retângulo
  if (colidindo) {
    fill(255, 150, 0);
  }
  else {
    fill(0, 150, 255);
  }
  // ------------------------------------------------

  // Desenha o retângulo
  noStroke();
  rect(rx, ry, rw, rh);

  // Desenha o ponto
  stroke(0);
  point(px, py);
}

boolean pointRect(float px, float py, float rx, float ry, float rw, float rh) {
  // O ponto está dentro dos limites do retângulo?
  if (px >= rx &&        // à direita da borda esquerda E
      px <= rx + rw &&   // à esquerda da borda direita E
      py >= ry &&        // abaixo da borda superior E
      py <= ry + rh) {   // acima da borda inferior
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
pygame.display.set_caption("Ponto / Retângulo")
pygame.mouse.set_visible(False)

# Posição e dimensões do retângulo
rx = 200
ry = 100
rw = 200
rh = 200

# Raio do ponto desenhado pelo mouse
raio_ponto = 7

def point_rect(px, py, rx, ry, rw, rh):
    # O ponto está dentro dos limites do retângulo?
    if (px >= rx and        # à direita da borda esquerda E
        px <= rx + rw and   # à esquerda da borda direita E
        py >= ry and        # abaixo da borda superior E
        py <= ry + rh):     # acima da borda inferior
        return True
    return False

relogio = pygame.time.Clock()
rodando = True

while rodando:
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            rodando = False

    tela.fill((255, 255, 255))

    # Atualiza a posição para as coordenadas do mouse
    px, py = pygame.mouse.get_pos()

    # ------------------------------------------------
    # Verifica se há colisão entre o ponto e o retângulo
    colidindo = point_rect(px, py, rx, ry, rw, rh)

    # Se houver colisão, altera a cor do retângulo
    if colidindo:
        cor = (255, 150, 0)
    else:
        cor = (0, 150, 255)
    # ------------------------------------------------

    # Desenha o retângulo
    pygame.draw.rect(tela, cor, (rx, ry, rw, rh))

    # Desenha o ponto
    pygame.draw.circle(tela, (0, 0, 0), (px, py), raio_ponto)

    pygame.display.flip()
    relogio.tick(60)

pygame.quit()
```

</CodeTabs>
