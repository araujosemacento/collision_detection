---
title: "Colisão Orientada a Objetos"
slug: "object_oriented_collision"
order: 27
sketch: "ObjectOrientedCollision"
caption: "Mova o círculo (objeto) com o mouse para testar a colisão contra o array de retângulos!"
description: "Arquitetura de classes e objetos para gerenciar dezenas de colisões simultâneas de forma limpa e modular."
---

<script>
	import CodeTabs from '$lib/components/CodeTabs.svelte';
</script>

# COLISÃO ORIENTADA A OBJETOS

#### Jeff Thompson

Parabéns! Você passou por uma quantidade enorme de algoritmos de detecção de colisão. No entanto, estes exemplos foram elaborados como demonstrações simples de como cada conceito funciona. Combiná-los em projetos maiores e jogos completos exige migrar para uma abordagem **Orientada a Objetos (POO)**. (Para uma introdução excelente sobre programação orientada a objetos em artes interativas e jogos, consulte o livro [*Nature of Code*](http://natureofcode.com/book/) de Daniel Shiffman).

Por que utilizar Orientação a Objetos? Imagine que temos um círculo e uma coleção de retângulos na tela. Poderíamos tentar armazenar posições, tamanhos e estados de colisão em variáveis separadas para cada um, mas isso rapidamente se tornaria confuso e impraticável. Em vez disso, definir classes como `Circle` e `Rectangle` oferece um controle infinitamente maior e mais flexível.

---

## ESTRUTURA DAS CLASSES

Encapsulamos o estado e o comportamento dentro dos próprios objetos. A classe `Rectangle`, por exemplo, armazena uma variável `hit` para registrar se foi atingida e mudar sua cor no método `display()`:

<CodeTabs>

```javascript
class CircleObj {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  // atualiza a posição para o mouse
  update() {
    this.x = mouseX;
    this.y = mouseY;
  }

  // desenha o círculo
  display() {
    fill(0, 150);
    noStroke();
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}

class RectObj {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.hit = false; // está sendo atingido?
  }

  // método interno para verificar colisão usando circleRect
  checkCollision(circle) {
    this.hit = circleRect(circle.x, circle.y, circle.r, this.x, this.y, this.w, this.h);
  }

  // desenha o retângulo mudando a cor se houver colisão
  display() {
    fill(this.hit ? [255, 150, 0] : [0, 150, 255]);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }
}
```

```java
class Circle {
  float x, y, r;

  Circle(float _x, float _y, float _r) {
    x = _x;
    y = _y;
    r = _r;
  }

  // atualiza a posição para o mouse
  void update() {
    x = mouseX;
    y = mouseY;
  }

  // desenha o círculo
  void display() {
    fill(0, 150);
    noStroke();
    ellipse(x, y, r*2, r*2);
  }
}

class Rectangle {
  float x, y, w, h;
  boolean hit = false; // está sendo atingido?

  Rectangle(float _x, float _y, float _w, float _h) {
    x = _x;
    y = _y;
    w = _w;
    h = _h;
  }

  // método interno para verificar colisão com o círculo
  void checkCollision(Circle c) {
    hit = circleRect(c.x, c.y, c.r, x, y, w, h);
  }

  // desenha o retângulo mudando a cor se houver colisão
  void display() {
    if (hit) fill(255,150,0);
    else fill(0,150,255);
    noStroke();
    rect(x, y, w, h);
  }
}
```

```python
import pygame

class Circle:
    def __init__(self, x, y, r):
        self.x = x
        self.y = y
        self.r = r

    def update(self):
        self.x, self.y = pygame.mouse.get_pos()

    def draw(self, surface):
        pygame.draw.circle(surface, (0, 0, 0, 150), (int(self.x), int(self.y)), int(self.r))

class Rectangle:
    def __init__(self, x, y, w, h):
        self.rect = pygame.Rect(x, y, w, h)
        self.hit = False

    def check_collision(self, circle):
        self.hit = circle_rect(circle.x, circle.y, circle.r, 
                               self.rect.x, self.rect.y, self.rect.width, self.rect.height)

    def draw(self, surface):
        color = (255, 150, 0) if self.hit else (0, 150, 255)
        pygame.draw.rect(surface, color, self.rect)
```

</CodeTabs>

---

## LOOP PRINCIPAL DE VERIFICAÇÃO

No loop principal de renderização, criamos um único objeto `Circle` e um array com múltiplos objetos `Rectangle`. Iteramos sobre a lista chamando o método de verificação de cada um:

<CodeTabs>

```javascript
function draw() {
  background(255);

  // atualiza e desenha o círculo principal
  circle.update();

  // percorre o array de retângulos verificando colisão e desenhando
  for (let r of rects) {
    r.checkCollision(circle);
    r.display();
  }

  circle.display();
}
```

```java
void draw() {
  background(255);
  
  // percorre a lista de retângulos verificando colisão e desenhando
  for (Rectangle r : rects) {
    r.checkCollision(circle);
    r.display();
  }
  
  circle.update();
  circle.display();
}
```

```python
while running:
    surface.fill((255, 255, 255))
    circle.update()

    # percorre a lista de retângulos verificando colisão
    for r in rects:
        r.check_collision(circle)
        r.draw(surface)

    circle.draw(surface)
```

</CodeTabs>

> **Dica de Organização:** Conforme o projeto cresce, coloque todas as suas funções geométricas utilitárias em um módulo separado (por exemplo, `CollisionFunctions` ou `collisions.js`). Isso mantém suas classes limpas e focadas na lógica dos objetos!

