---
title: "Polígono / Linha"
slug: "poly-line"
order: 21
sketch: "PolyLine"
caption: "Mova a linha com o mouse para atingir o polígono regular de 16 lados!"
---

<script>
	import CodeTabs from '$lib/components/CodeTabs.svelte';
</script>

# POLÍGONO / LINHA

#### Jeff Thompson

Verificar se uma linha está colidindo com um polígono é um processo muito parecido com o exemplo [Linha/Retângulo](line-rect). Percorremos cada aresta do polígono e realizamos uma verificação [Linha/Linha](line-line).

---

## CONSTRUÇÃO E ALGORITMO

### 1. Criando um Polígono Regular (Hexadecágono)
Em nosso exemplo, criamos um polígono regular perfeito de 16 lados (um **hexadecágono**). Podemos gerar os vértices distribuindo pontos igualmente ao redor de uma circunferência usando funções trigonométricas simples (`cos` e `sin`):

```javascript
let vertices = [];
let numSides = 16;
let angle = (Math.PI * 2) / numSides;

for (let i = 0; i < numSides; i++) {
  let a = angle * i;
  let x = 300 + Math.cos(a) * 100; // centro em X=300, raio=100
  let y = 200 + Math.sin(a) * 100; // centro em Y=200, raio=100
  vertices.push({ x, y });
}
```

### 2. O Loop de Teste e Interrupção Antecipada (*Short-Circuit*)
Percorremos os vértices em loop para extrair as coordenadas `(x3, y3)` do vértice atual e `(x4, y4)` do próximo vértice, formando uma linha para cada aresta:

```javascript
let x3 = vertices[current].x;
let y3 = vertices[current].y;
let x4 = vertices[next].x;
let y4 = vertices[next].y;
```

Passamos essa aresta para a função de colisão [Linha/Linha](line-line). Se qualquer uma das arestas do polígono cruzar a linha testada `(x1, y1) -> (x2, y2)`, retornamos `true` **imediatamente**:

```javascript
let hit = lineLine(x1, y1, x2, y2, x3, y3, x4, y4);
if (hit) {
  return true; // interrupção imediata! economiza processamento das demais arestas
}
```

Essa interrupção antecipada (*early return*) economiza um tempo de processamento valioso, evitando calcular as interseções das arestas restantes do polígono assim que a primeira colisão for detectada.

---

## CÓDIGO COMPLETO MULTILINGUAGEM

<CodeTabs>

```javascript
function polyLine(vertices, x1, y1, x2, y2) {
  // percorre cada um dos vértices e a aresta com o próximo
  let next = 0;
  for (let current = 0; current < vertices.length; current++) {
    next = current + 1;
    if (next === vertices.length) next = 0;

    // extrai as coordenadas da aresta atual do polígono
    let x3 = vertices[current].x;
    let y3 = vertices[current].y;
    let x4 = vertices[next].x;
    let y4 = vertices[next].y;

    // realiza a comparação Linha/Linha
    let hit = lineLine(x1, y1, x2, y2, x3, y3, x4, y4);
    if (hit) {
      return true; // colisão confirmada! interrompe a busca
    }
  }

  return false;
}
```

```java
boolean polyLine(PVector[] vertices, float x1, float y1, float x2, float y2) {
  // percorre cada um dos vértices e a aresta com o próximo
  int next = 0;
  for (int current=0; current<vertices.length; current++) {
    next = current+1;
    if (next == vertices.length) next = 0;

    // extrai as coordenadas da aresta atual do polígono
    float x3 = vertices[current].x;
    float y3 = vertices[current].y;
    float x4 = vertices[next].x;
    float y4 = vertices[next].y;

    // realiza a comparação Linha/Linha
    boolean hit = lineLine(x1, y1, x2, y2, x3, y3, x4, y4);
    if (hit) {
      return true; // colisão confirmada! interrompe a busca
    }
  }

  return false;
}
```

```python
def poly_line(vertices, x1, y1, x2, y2):
    # percorre cada um dos vértices e a aresta com o próximo
    next_idx = 0
    for current in range(len(vertices)):
        next_idx = current + 1
        if next_idx == len(vertices):
            next_idx = 0

        # extrai as coordenadas da aresta atual do polígono
        x3, y3 = vertices[current]
        x4, y4 = vertices[next_idx]

        # realiza a comparação Linha/Linha
        if line_line(x1, y1, x2, y2, x3, y3, x4, y4):
            return True # colisão confirmada! interrompe a busca

    return False
```

</CodeTabs>

