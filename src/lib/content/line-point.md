---
title: "Linha / Ponto"
slug: "line-point"
order: 13
sketch: "LinePoint"
caption: "Use o mouse para posicionar o ponto sobre o segmento de reta!"
description: "Verificação de colisão entre ponto e segmento de reta medindo distâncias com margem de tolerância."
image: "images/line-point.jpg"
---

<script>
	import CodeTabs from '$lib/components/CodeTabs.svelte';
</script>

# LINHA / PONTO

Até agora, nossas colisões foram compostas por lógica básica e adições simples. A colisão com linhas é um pouco mais delicada, a menos que as aulas de geometria do ensino médio ainda estejam bem frescas na sua memória.

<div class="callout">
<strong>Nota conceitual:</strong> Tecnicamente, o que chamamos aqui de linha é um <a href="https://pt.wikipedia.org/wiki/Reta#Segmento_de_reta"><em>segmento de reta</em></a> (definido por dois pontos). Mas por simplicidade didática, nos referiremos a ele ao longo do livro usando o termo genérico <em>linha</em>.
</div>

Uma linha é definida por dois conjuntos de coordenadas X/Y `(x1, y1)` e `(x2, y2)`. Podemos encontrar o comprimento total da linha usando o bom e velho Teorema de Pitágoras, mas como esse será um truque recorrente daqui pra frente, vamos trapacear um pouqinho e usar funções prontas das linguagens:

<CodeTabs>

```javascript
let lineLen = dist(x1, y1, x2, y2);
// ou Math.hypot(x2 - x1, y2 - y1) em javascript puro
```

```java
float lineLen = dist(x1, y1, x2, y2);
// ou Math.hypot(x2 - x1, y2 - y1) em java puro
// se atente ao fato que a função hypot() retorna
// números de tipo [double] e não [float]!
```

```python
line_len = pygame.math.Vector2(x1, y1).distance_to((x2, y2))
# ou usando a biblioteca [math] nativa do python
# import math
# line_len = math.hypot(x2 - x1, y2 - y1)
```

</CodeTabs>

Também precisamos calcular a distância entre o ponto de teste `(px, py)` e cada uma das duas extremidades da linha:

<CodeTabs>

```javascript
let d1 = Math.hypot(px - x1, py - y1);
let d2 = Math.hypot(px - x2, py - y2);
```

```java
float d1 = (float)Math.hypot(px - x1, py - y1);
float d2 = (float)Math.hypot(px - x2, py - y2);
```

```python
d1 = math.hypot(px - x1, py - y1)
d2 = math.hypot(px - x2, py - y2)
```

</CodeTabs>

Se o ponto estiver situado sobre a linha, a soma das duas distâncias (`d1 + d2`) será igual ao comprimento total da linha (`lineLen`)! Pode não fazer sentido de imediato, mas observando o diagrama abaixo isso fica mais claro:

![Triângulos formados entre um ponto e uma linha](images/line-point.jpg)

Se "deitarmos" os segmentos de reta que formam as distâncias `d1` e `d2` sobre a linha, eles se sobrepõem! Mostrando que sua soma `d1 + d2` será maior que o comprimento da linha `lineLen`.

Entretanto, como os números de ponto flutuante em computação têm alta precisão decimal, exigir uma igualdade exata (`d1 + d2 === lineLen`) tornaria a colisão rígida e quase impossível de ser acionada manualmente. Essa situação é muito similar à que vimos no capítulo <a href="point-point">Ponto/Ponto</a>, onde podemos adicionar uma pequena margem de tolerância (_buffer_) pra checar se `d1 + d2` está mais ou menos dentro do alcance:

<CodeTabs>

```javascript
let buffer = 0.1;
// quanto maior o valor, mais tolerante
// e menos precisa será a colisão
```

```java
float buffer = 0.1;
// quanto maior o valor, mais tolerante
// e menos precisa será a colisão
```

```python
buffer = 0.1
# quanto maior o valor, mais tolerante
# e menos precisa será a colisão
```

</CodeTabs>

Verificamos se `d1 + d2` está dentro dessa margem de tolerância ao redor de `lineLen`. Tente experimentar com valores maiores e menores de `buffer` até chegar no ponto certo:

<CodeTabs>

```javascript
let colisao = d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer ? true : false;
```

```java
boolean colisao = d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer ? true : false;
```

```python
colisao = True if line_len - buffer <= d1 + d2 <= line_len + buffer else False
```

</CodeTabs>

<div class="callout">
<strong>Nota sobre o operador ternário:</strong> A estrutura <code>condição ? verdadeiro : falso</code> (ou <code>verdadeiro if condição else falso</code> em Python) é chamada de <em><b>operador ternário</b></em>. Trata-se de uma forma concisa de escrever uma condicional <code>if/else</code> em uma única linha para retornar ou atribuir um valor.
</div>

Abaixo temos o exemplo completo, combinando todas as etapas anteriores:

<CodeTabs>

```javascript
let px = 0;     // posição do ponto (definida pelo mouse)
let py = 0;

let x1 = 100;   // linha definida por dois pontos
let y1 = 300;
let x2 = 500;
let y2 = 100;

function setup() {
  createCanvas(600, 400);
  noCursor();

  strokeWeight(15);  // deixa as formas mais fáceis de visualizar
}

function draw() {
  background(255);

  // atualiza o ponto para as coordenadas do mouse
  px = mouseX;
  py = mouseY;

  // verifica se há colisão
  // se colidir, muda a cor da linha
  let colidiu = linePoint(x1, y1, x2, y2, px, py);
  if (colidiu) {
    stroke(255, 150, 0, 150);
  } else {
    stroke(0, 150, 255, 150);
  }

  line(x1, y1, x2, y2);

  // desenha o ponto
  stroke(0, 150);
  point(px, py);
}

// LINHA/PONTO
function linePoint(x1, y1, x2, y2, px, py) {

  // calcula a distância do ponto até as duas extremidades da linha
  let d1 = dist(px, py, x1, y1);
  let d2 = dist(px, py, x2, y2);

  // calcula o comprimento total da linha
  let lineLen = dist(x1, y1, x2, y2);

  // margem de tolerância pra não perder o ponto por causa da precisão do número de ponto flutuante
  let buffer = 0.3;

  // se a soma das duas distâncias for igual 
  // ao comprimento da linha (com o buffer),
  // o ponto está sobre a linha!
  if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
    return true;
  }
  return false;
}
```

```java
float px = 0;     // posição do ponto (definida pelo mouse)
float py = 0;

float x1 = 100;   // linha definida por dois pontos
float y1 = 300;
float x2 = 500;
float y2 = 100;

void setup() {
  size(600, 400);
  noCursor();

  strokeWeight(15);  // deixa as formas mais fáceis de visualizar
}

void draw() {
  background(255);

  // atualiza o ponto para as coordenadas do mouse
  px = mouseX;
  py = mouseY;

  // verifica se há colisão
  // se colidir, muda a cor da linha
  boolean colidiu = linePoint(x1, y1, x2, y2, px, py);
  if (colidiu) {
    stroke(255, 150, 0, 150);
  } else {
    stroke(0, 150, 255, 150);
  }
  line(x1, y1, x2, y2);

  // desenha o ponto
  stroke(0, 150);
  point(px, py);
}

// LINHA/PONTO
boolean linePoint(float x1, float y1, float x2, float y2, float px, float py) {
  // calcula a distância do ponto até as duas extremidades da linha
  float d1 = dist(px, py, x1, y1);
  float d2 = dist(px, py, x2, y2);

  // calcula o comprimento total da linha
  float lineLen = dist(x1, y1, x2, y2);

  // margem de tolerância pra não perder o ponto por causa da precisão do número de ponto flutuante
  float buffer = 0.3;

  // se a soma das duas distâncias for igual
  // ao comprimento da linha (com o buffer),
  // o ponto está sobre a linha!
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
pygame.display.set_caption("Linha / Ponto")
pygame.mouse.set_visible(False)

px, py = 0, 0       # posição do ponto (definida pelo mouse)

x1, y1 = 100, 300   # linha definida por dois pontos
x2, y2 = 500, 100

espessura = 15      # deixa as formas mais fáceis de visualizar
raio_ponto = espessura / 2

def line_point(x1, y1, x2, y2, px, py):
    # calcula a distância do ponto até as duas extremidades da linha
    d1 = math.hypot(px - x1, py - y1)
    d2 = math.hypot(px - x2, py - y2)

    # calcula o comprimento total da linha
    line_len = math.hypot(x2 - x1, y2 - y1)

    # margem de tolerância pra não perder o ponto por causa da precisão do número de ponto flutuante
    buffer = 0.3

    # se a soma das duas distâncias for igual
    # ao comprimento da linha (com o buffer),
    # o ponto está sobre a linha!
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

    # atualiza o ponto para as coordenadas do mouse
    px, py = pygame.mouse.get_pos()

    # verifica se há colisão
    # se colidir, muda a cor da linha
    colidiu = line_point(x1, y1, x2, y2, px, py)
    cor = (255, 150, 0) if colidiu else (0, 150, 255)

    # desenha a linha
    pygame.draw.line(tela, cor, (x1, y1), (x2, y2), espessura)

    # desenha o ponto
    pygame.draw.circle(tela, (0, 0, 0), (px, py), raio_ponto)

    pygame.display.flip()
    relogio.tick(60)
```

</CodeTabs>

> **Atribuição:** Algoritmo baseado em contribuições de [**MrRoy**](http://stackoverflow.com/a/17693146/1167783) e [**Rabbid76**](https://stackoverflow.com/a/66625025) no StackOverflow.
