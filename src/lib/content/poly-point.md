---
title: "Polígono / Ponto"
slug: "poly-point"
order: 18
sketch: "PolyPoint"
caption: "Mova o mouse (ponto) para dentro do polígono!"
description: "Algoritmo Ray Casting (Jordan Curve) para determinar se um ponto está dentro de um polígono arbitrário."
image: "images/poly-point.jpg"
---

<script>
	import CodeTabs from '$lib/components/CodeTabs.svelte';
</script>

# POLÍGONO / PONTO

#### Jeff Thompson

Colisões entre círculos e retângulos são fantásticas e quase sempre faz sentido simplificar a colisão de formas complexas usando caixas delimitadoras (*bounding boxes*) e círculos delimitadores. No entanto, existem aplicações em que precisamos de precisão exata. Felizmente, a maioria dos exemplos restantes reutiliza ideias que já cobrimos, mesmo que sua aplicação pareça mais sofisticada.

Neste exemplo, testaremos se um ponto está dentro de um polígono complexo de qualquer formato. Definimos nosso polígono através de uma lista de pontos X/Y chamados de **vértices**.

---

## ESTRUTURA E PASSO A PASSO

### 1. Definindo os Vértices
Para armazenar os cantos do polígono, usamos um array de pontos ou vetores. Por exemplo, um trapézio distorcido com 4 vértices:

```javascript
let vertices = [
  { x: 200, y: 100 },
  { x: 400, y: 130 },
  { x: 350, y: 300 },
  { x: 250, y: 300 }
];
```

### 2. O Loop `current` e `next`
Para testar o polígono, precisamos percorrer cada aresta (linha entre dois vértices). Usamos uma variável `current` no loop e uma variável `next` que aponta para o próximo vértice da lista. Se `next` atingir o final do array, ele retorna para `0` para fechar o polígono:

```javascript
let next = 0;
for (let current = 0; current < vertices.length; current++) {
    // pega o próximo vértice da lista; se chegar ao fim, volta para 0
    next = current + 1;
    if (next === vertices.length) next = 0;

    let vc = vertices[current]; // c de "current" (atual)
    let vn = vertices[next];    // n de "next" (próximo)
}
```

### 3. O Teste de Cruzamento de Raio (Teorema da Curva de Jordan)
O algoritmo baseia-se no **Teorema da Curva de Jordan** (*Ray-Casting*). Traçamos um raio horizontal imaginário partindo do ponto `(px, py)` em direção ao infinito à direita:

![Diagrama do ponto em relação às coordenadas Y do polígono](images/poly-point.jpg)

Realizamos duas verificações condicionais combinadas dentro da instrução `if`:

```javascript
if (((vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py)) &&
    (px < (vn.x - vc.x) * (py - vc.y) / (vn.y - vc.y) + vc.x)) {
    collision = !collision;
}
```

- **A primeira parte** `((vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py))` testa se o ponto está entre as coordenadas Y dos dois vértices da aresta. (Shorthand equivalente: `(vc.y > py) !== (vn.y > py)`).
- **A segunda parte** `px < (vn.x - vc.x) * (py - vc.y) / (vn.y - vc.y) + vc.x` calcula a interseção X do raio horizontal com a aresta do polígono.

### 4. Inversão do Estado Booleano
Diferente dos testes anteriores (onde atribuíamos `true` ou `false` diretamente), a cada cruzamento confirmado do raio com uma aresta, **invertemos** o estado da variável booleana (`collision = !collision`):
- Se o raio cruzar as arestas um número **ímpar** de vezes, a variável terminará como `true` (ponto **DENTRO**).
- Se cruzar um número **par** de vezes, terminará como `false` (ponto **FORA**).

---

## CÓDIGO COMPLETO MULTILINGUAGEM

<CodeTabs>

```javascript
function polyPoint(vertices, px, py) {
  let collision = false;

  // percorre cada um dos vértices e o próximo vértice da lista
  let next = 0;
  for (let current = 0; current < vertices.length; current++) {
    next = current + 1;
    if (next === vertices.length) next = 0;

    let vc = vertices[current];    // vértice atual (current)
    let vn = vertices[next];       // próximo vértice (next)

    // compara posições e inverte o estado da variável 'collision'
    if (((vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py)) &&
        (px < (vn.x - vc.x) * (py - vc.y) / (vn.y - vc.y) + vc.x)) {
      collision = !collision;
    }
  }
  return collision;
}
```

```java
boolean polyPoint(PVector[] vertices, float px, float py) {
  boolean collision = false;

  // percorre cada um dos vértices e o próximo vértice da lista
  int next = 0;
  for (int current=0; current<vertices.length; current++) {
    next = current+1;
    if (next == vertices.length) next = 0;

    PVector vc = vertices[current];    // vértice atual (current)
    PVector vn = vertices[next];       // próximo vértice (next)

    // compara posições e inverte o estado da variável 'collision'
    if (((vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py)) &&
         (px < (vn.x-vc.x)*(py-vc.y) / (vn.y-vc.y)+vc.x)) {
            collision = !collision;
    }
  }
  return collision;
}
```

```python
def poly_point(vertices, px, py):
    collision = False
    next_idx = 0

    # percorre cada um dos vértices e o próximo vértice da lista
    for current in range(len(vertices)):
        next_idx = current + 1
        if next_idx == len(vertices):
            next_idx = 0

        vc = vertices[current]
        vn = vertices[next_idx]

        # compara posições e inverte o estado da variável 'collision'
        if (((vc[1] >= py and vn[1] < py) or (vc[1] < py and vn[1] >= py)) and
            (px < (vn[0] - vc[0]) * (py - vc[1]) / (vn[1] - vc[1]) + vc[0])):
            collision = not collision

    return collision
```

</CodeTabs>

> **Nota de Desempenho:** Esta função foi projetada para aceitar qualquer número de vértices. No entanto, quanto mais vértices você testar, mais lento será o cálculo. Em um jogo completo com dezenas de objetos complexos, equilibre a necessidade de precisão exata com a velocidade de execução!

> **Atribuição:** Algoritmo adaptado de respostas da comunidade no StackOverflow por **nirg** e **Pranav**.


