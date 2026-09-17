---
title: "Polígono / Retângulo"
slug: "poly-rect"
order: 20
sketch: "PolyRect"
caption: "Mova o retângulo com o mouse para atingir o polígono!"
description: "Como testar colisão entre polígonos convexos ou côncavos e retângulos checando arestas e contenção interna."
---

<script>
	import CodeTabs from '$lib/components/CodeTabs.svelte';
</script>

# POLÍGONO / RETÂNGULO

#### Jeff Thompson

Assim como nos exemplos anteriores, verificar a colisão entre um polígono e um retângulo exige apenas estender funções que já construímos. Neste caso, testamos se qualquer uma das arestas do polígono está colidindo com qualquer uma das quatro arestas do retângulo.

---

## PASSO A PASSO DO ALGORITMO

### 1. Testando as Arestas do Polígono contra o Retângulo
Percorremos os vértices do polígono em loop para formar cada aresta `(vc, vn)` e chamamos a função [Linha/Retângulo](line-rect) para cada uma delas:

```javascript
let collision = lineRect(vc.x, vc.y, vn.x, vn.y, rx, ry, rw, rh);
if (collision) return true;
```

A função [Linha/Retângulo](line-rect), por sua vez, testa a linha da aresta contra os 4 lados do retângulo. Se qualquer aresta do polígono cruzar o retângulo, a colisão é confirmada imediatamente e interrompemos o loop!

### 2. O "Edge Case": Retângulo Inteiramente DENTRO do Polígono
Assim como na colisão com círculos, pode ocorrer a situação limite em que o retângulo fica **inteiramente contido no interior do polígono** sem que suas bordas se cruzem.

Se o seu projeto exigir a detecção dessa condição, podemos testar se o canto superior esquerdo do retângulo `(rx, ry)` (um ponto) está contido dentro do polígono usando a função [Polígono/Ponto](poly-point):

```javascript
let inside = polyPoint(vertices, rx, ry);
if (inside) return true;
```

> **Nota de Desempenho:** Essa verificação interior deve ser mantida desativada a menos que seja estritamente necessária no seu jogo. Ela exige percorrer novamente todos os vértices do polígono, reduzindo a taxa de quadros (FPS) do seu jogo.

---

## CÓDIGO COMPLETO MULTILINGUAGEM

<CodeTabs>

```javascript
function polyRect(vertices, rx, ry, rw, rh) {
  // percorre cada um dos vértices e a aresta com o próximo
  let next = 0;
  for (let current = 0; current < vertices.length; current++) {
    next = current + 1;
    if (next === vertices.length) next = 0;

    let vc = vertices[current];
    let vn = vertices[next];

    // 1. Testa a aresta do polígono contra os 4 lados do retângulo
    let collision = lineRect(vc.x, vc.y, vn.x, vn.y, rx, ry, rw, rh);
    if (collision) return true;

    // 2. OPCIONAL: testa se o retângulo está inteiramente DENTRO do polígono
    let inside = polyPoint(vertices, rx, ry);
    if (inside) return true;
  }

  return false;
}
```

```java
boolean polyRect(PVector[] vertices, float rx, float ry, float rw, float rh) {
  // percorre cada um dos vértices e a aresta com o próximo
  int next = 0;
  for (int current=0; current<vertices.length; current++) {
    next = current+1;
    if (next == vertices.length) next = 0;

    PVector vc = vertices[current];
    PVector vn = vertices[next];

    // 1. Testa a aresta do polígono contra os 4 lados do retângulo
    boolean collision = lineRect(vc.x,vc.y,vn.x,vn.y, rx,ry,rw,rh);
    if (collision) return true;

    // 2. OPCIONAL: testa se o retângulo está inteiramente DENTRO do polígono
    boolean inside = polygonPoint(vertices, rx,ry);
    if (inside) return true;
  }

  return false;
}
```

```python
def poly_rect(vertices, rx, ry, rw, rh):
    # percorre cada um dos vértices e a aresta com o próximo
    next_idx = 0
    for current in range(len(vertices)):
        next_idx = current + 1
        if next_idx == len(vertices):
            next_idx = 0

        vc = vertices[current]
        vn = vertices[next_idx]

        # 1. Testa a aresta do polígono contra os 4 lados do retângulo
        if line_rect(vc[0], vc[1], vn[0], vn[1], rx, ry, rw, rh):
            return True

        # 2. OPCIONAL: testa se o retângulo está inteiramente DENTRO do polígono
        if poly_point(vertices, rx, ry):
            return True

    return False
```

</CodeTabs>

