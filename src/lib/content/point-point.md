---
title: "Ponto / Ponto"
slug: "point-point"
order: 5
sketch: "PointPoint"
caption: "Mova o mouse sobre o ponto azul alvo para testar a colisão!"
description: "Aprenda o algoritmo mais simples de colisão 2D: testando a igualdade exata de coordenadas entre dois pontos."
---

<script>
	import CodeTabs from '$lib/components/CodeTabs.svelte';
</script>

# PONTO / PONTO

#### Jeff Thompson

A colisão mais simples de testar é entre dois pontos. Para verificar se dois pontos estão se tocando, simplesmente checamos se suas coordenadas X e Y são exatamente iguais!

```text
x1 == x2  E  y1 == y2
```

Encapsulamos esse código em uma função para torná-lo reutilizável. Como argumentos, passamos as coordenadas X/Y de ambos os pontos. A função retorna um valor booleano `true` ou `false`, dependendo da ocorrência ou não da colisão:

<CodeTabs>

```javascript
function pointPoint(x1, y1, x2, y2) {
  // Os dois pontos estão exatamente no mesmo local?
  if (x1 === x2 && y1 === y2) {
    return true;
  }
  return false;
}
```

```java
boolean pointPoint(float x1, float y1, float x2, float y2) {
  // Os dois pontos estão exatamente no mesmo local?
  if (x1 == x2 && y1 == y2) {
    return true;
  }
  return false;
}
```

```python
def point_point(x1, y1, x2, y2):
    # Os dois pontos estão exatamente no mesmo local?
    if x1 == x2 and y1 == y2:
        return True
    return False

# Dica Pygame (usando a classe nativa Vector2):
# p1 = pygame.math.Vector2(x1, y1)
# p2 = pygame.math.Vector2(x2, y2)
# hit = (p1 == p2)
```

</CodeTabs>

Observe o atalho de retorno utilizado no código: poderíamos ter especificado explicitamente um bloco `else { return false; }`, assim como no [capítulo teórico anterior](what_you_should_already_know#estruturas-condicionais-if--else), mas a estrutura acima produz exatamente o mesmo resultado! É um padrão comum pensar em `return false;` como o valor padrão a ser enviado de volta, a menos que as condições de colisão dentro do `if` sejam atendidas.

<div class="callout">
<strong>COMPLEXIDADE NA PONTARIA:</strong> Você notou que é meio difícil acionar essa colisão pixel a pixel (consegue adivinhar o porquê?). Este é um problema de precisão rígida que encorajo você a solucionar nos <a href="section_1_challenges">Desafios da Seção 1</a>.
</div>

O exemplo acima pode ser implementado nas diferentes linguagens apresentadas abaixo. Escolha a opção com a qual tiver mais familiaridade e utilize o ambiente de sua preferência para executar, interagir ou modificar o código à vontade.

Para facilitar o entendimento para aqueles completamente novatos nos conceitos aqui expostos, inserimos `comentários` expositivos explicando o que a maior parte dos trechos de código faz, mas caso isso lhe incomode, não se preocupe! Nos próximos capítulos, a quantidade de comentários será limitada apenas ao necessário para contextualizar a implementação do algoritmo de colisão.

<CodeTabs>

```javascript
// Coordenadas X e Y do mouse
let px, py;

// Coordenadas X e Y do ponto alvo
let alvoX, alvoY;

function setup() {
  // Criação da tela
  createCanvas(600, 400);

  // Remove o cursor padrão do sistema
  noCursor();

  // Aumento da espessura dos pontos
  // para facilitar a interação
  strokeWeight(15);

  // Define a posição X do ponto alvo
  // como metade da largura da tela
  alvoX = width / 2;

  // Define a posição Y do ponto alvo
  // como metade da altura da tela
  alvoY = height / 2;
}

function draw() {
  // Atualiza a posição do mouse
  px = mouseX;
  py = mouseY;

  //------------------------------------------------
  // Verifica se há uma colisão entre os pontos
  // se houver, o plano de fundo se torna laranja
  // caso contrário, permanece branco

  // Note que chamamos a função pointPoint declarada
  // mais abaixo no código e armazenamos o resultado
  let colidindo = pointPoint(px, py, alvoX, alvoY);

  if (colidindo) {
    background(255, 150, 0);
  } else {
    background(255);
  }
  //------------------------------------------------

  //------------------------------------------------
  // Desenhamos os pontos na tela
  stroke(0, 150, 255);
  point(alvoX, alvoY);

  stroke(0, 150);
  point(px, py);
  //------------------------------------------------
}

// É aqui que a mágica acontece,
// onde a colisão é de fato verificada
function pointPoint(x1, y1, x2, y2) {
  // Os dois pontos estão no mesmo local?
  if (x1 === x2 && y1 === y2) {
    return true;
  }
  return false;
}

// Não se frustre caso não consiga acionar a colisão.
// É bem mais difícil do que parece!

// Dica: A demonstração do site utiliza uma zona de
// colisão maior do que o ponto em si. Isso foi feito
// propositalmente para facilitar a interação.

// Em breve você entenderá como também implementar
// um "buffer" ao redor do ponto.
```

```java
// Coordenadas X e Y do mouse
float px, py;

// Coordenadas X e Y do ponto alvo
float alvoX, alvoY;

void setup() {
  // Criação da tela
  size(600, 400);

  // Remove o cursor padrão do sistema
  noCursor();

  // Aumento da espessura dos pontos
  // para facilitar a interação
  strokeWeight(15);

  // Define a posição X do ponto alvo
  // como metade da largura da tela
  alvoX = width / 2;

  // Define a posição Y do ponto alvo
  // como metade da altura da tela
  alvoY = height / 2;
}

void draw() {
  // Atualiza a posição do mouse
  px = mouseX;
  py = mouseY;

  //------------------------------------------------
  // Verifica se há uma colisão entre os pontos
  // se houver, o plano de fundo se torna laranja
  // caso contrário, permanece branco

  // Note que chamamos a função pointPoint declarada
  // mais abaixo no código e armazenamos o resultado
  boolean colidindo = pointPoint(px, py, alvoX, alvoY);

  if (colidindo) {
    background(255, 150, 0);
  } else {
    background(255);
  }
  //------------------------------------------------

  //------------------------------------------------
  // Desenhamos os pontos na tela
  stroke(0, 150, 255);
  point(alvoX, alvoY);

  stroke(0, 150);
  point(px, py);
  //------------------------------------------------
}

// É aqui que a mágica acontece,
// onde a colisão é de fato verificada
boolean pointPoint(float x1, float y1, float x2, float y2) {

  // Os dois pontos estão no mesmo local?
  if (x1 == x2 && y1 == y2) {
    return true;
  }
  return false;
}

// Não se frustre caso não consiga acionar a colisão.
// É bem mais difícil do que parece!

// Dica: A demonstração do site utiliza uma zona de
// colisão maior do que o ponto em si. Isso foi feito
// propositalmente para facilitar a interação.

// Em breve você entenderá como também implementar
// um "buffer" ao redor do ponto.
```

```python
# Importa a biblioteca Pygame
import pygame

# Inicialização do Pygame
pygame.init()

# Largura e altura da tela
LARGURA, ALTURA = 600, 400

# Criação da tela e definição do título
tela = pygame.display.set_mode((LARGURA, ALTURA))
pygame.display.set_caption("Ponto / Ponto")

# Remove o cursor padrão do sistema
pygame.mouse.set_visible(False)

# Raio dos pontos (em Pygame desenhamos
# um círculo para simular a espessura do ponto)
raio_ponto = 7

# Define a posição do ponto alvo como o centro da tela
alvo_x = LARGURA // 2
alvo_y = ALTURA // 2

# Diferente do JavaScript ou do Java, em Python a função
# point_point precisa ser declarada antes de ser chamada.
# Caso contrário, um erro será gerado.
def point_point(x1, y1, x2, y2):
    # Os dois pontos estão no mesmo local?
    if x1 == x2 and y1 == y2:
        return True
    return False

# Loop principal da aplicação
relogio = pygame.time.Clock()
rodando = True

while rodando:
    # Trata os eventos do sistema (como fechar a janela)
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            rodando = False

    # Atualiza a posição X e Y do mouse
    px, py = pygame.mouse.get_pos()

    #------------------------------------------------
    # Verifica se há uma colisão entre os pontos
    # Se houver, o plano de fundo se torna laranja
    # Caso contrário, permanece branco

    # Note que chamamos a função point_point declarada
    # e armazenamos o resultado
    colidindo = point_point(px, py, alvo_x, alvo_y)

    if colidindo:
        tela.fill((255, 150, 0))
    else:
        tela.fill((255, 255, 255))
    #------------------------------------------------

    #------------------------------------------------
    # Desenhamos os pontos na tela
    # Ponto alvo (azul)
    pygame.draw.circle(tela, (0, 150, 255), (alvo_x, alvo_y), raio_ponto)

    # Ponto do mouse (preto)
    pygame.draw.circle(tela, (0, 0, 0), (px, py), raio_ponto)
    #------------------------------------------------

    # Atualiza a tela e limita a 60 FPS
    pygame.display.flip()
    relogio.tick(60)

# Encerra o Pygame
pygame.quit()

# Não se frustre caso não consiga acionar a colisão.
# É bem mais difícil do que parece!

# Dica: A demonstração do site utiliza uma zona de
# colisão maior do que o ponto em si. Isso foi feito
# propositalmente para facilitar a interação.

# Em breve você entenderá como também implementar
# um "buffer" ao redor do ponto.
```

</CodeTabs>

Parabéns, você acabou de estudar sua primeira função de detecção de colisão! Essa estrutura básica (demonstração interativa, explicação teórica, matemática didática e o código multilinguagem do exemplo) estará presente na maioria dos capítulos deste livro.
