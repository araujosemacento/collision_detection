---
title: "Polígono / Círculo"
slug: "poly-circle"
order: 19
sketch: "PolyCircle"
caption: "Mova o círculo com o mouse para atingir o polígono!"
description: "Detecção de colisão entre polígonos e círculos testando arestas individuais e inclusão de vértices internos."
---

<script>
	import CodeTabs from '$lib/components/CodeTabs.svelte';
</script>

# POLÍGONO / CÍRCULO

#### Jeff Thompson

Para testar se um círculo colidiu com um polígono, podemos simplificar o problema dividindo-o em uma série de colisões [Linha/Círculo](line-circle), uma para cada aresta do polígono.

Como já cobrimos como iterar pelos vértices de um polígono em loop e o teste [Linha/Círculo](line-circle), a verificação de cada lado se reduz a:

```javascript
let collision = lineCircle(vc.x, vc.y, vn.x, vn.y, cx, cy, r);
if (collision) return true;
```

Essa modularidade é uma das maiores vantagens da computação didática: códigos e conceitos mais sofisticados emergem naturalmente da combinação de peças simples!

---

## O "EDGE CASE": CÍRCULO INTEIRAMENTE DENTRO DO POLÍGONO

Se você testar a versão interativa, notará um comportamento curioso: se você mover o círculo para que ele fique **totalmente dentro** do polígono sem tocar nenhuma das arestas externas, nenhuma colisão será registrada!

Em ciência da computação e jogos, essas situações são chamadas de **Edge Cases** (casos limítrofes / extremos), onde as condições padrão do teste atingem um limite inesperado.

### Isso é um problema em jogos?
Na maioria das vezes, **não**! Imagine que o polígono seja uma nave espacial e o círculo seja um asteroide ou projétil inimigo. Assim que o asteroide toca qualquer borda externa da nave, a colisão é imediatamente registrada e causamos uma explosão. O asteroide nunca chegaria a ficar inteiramente contido no interior da nave sem ter colidido com a carcaça primeiro.

### Como resolver se você precisar detectar o interior?
Caso o seu projeto exija saber se o círculo está totalmente dentro do polígono, basta adicionar um teste extra verificando se o **centro do círculo `(cx, cy)` está dentro do polígono** usando a função [Polígono/Ponto](poly-point):

```javascript
// teste adicional logo antes do return false final
let centerInside = polyPoint(vertices, cx, cy);
if (centerInside) return true;
```

> **Nota de Desempenho:** Colocamos essa verificação adicional por último porque é muito mais provável que as bordas sejam atingidas primeiro. A menos que essa funcionalidade seja estritamente necessária no seu jogo, deixe-a desativada! Ela exige percorrer todos os vértices do polígono uma segunda vez, reduzindo o desempenho.

---

## CÓDIGO COMPLETO MULTILINGUAGEM

<CodeTabs>

```javascript
function polyCircle(vertices, cx, cy, r) {
  // percorre cada um dos vértices e a aresta formada com o próximo
  let next = 0;
  for (let current = 0; current < vertices.length; current++) {
    next = current + 1;
    if (next === vertices.length) next = 0;

    let vc = vertices[current];
    let vn = vertices[next];

    // testa colisão entre o círculo e a aresta da linha
    let collision = lineCircle(vc.x, vc.y, vn.x, vn.y, cx, cy, r);
    if (collision) return true;
  }

  // OPCIONAL: descomente a linha abaixo para testar se o centro do círculo está no interior do polígono
  // let centerInside = polyPoint(vertices, cx, cy);
  // if (centerInside) return true;

  return false;
}
```

```java
boolean polyCircle(PVector[] vertices, float cx, float cy, float r) {
  // percorre cada um dos vértices e a aresta formada com o próximo
  int next = 0;
  for (int current=0; current<vertices.length; current++) {
    next = current+1;
    if (next == vertices.length) next = 0;

    PVector vc = vertices[current];
    PVector vn = vertices[next];

    // testa colisão entre o círculo e a aresta da linha
    boolean collision = lineCircle(vc.x,vc.y, vn.x,vn.y, cx,cy,r);
    if (collision) return true;
  }

  // OPCIONAL: descomente para testar se o centro do círculo está no interior
  // boolean centerInside = polygonPoint(vertices, cx,cy);
  // if (centerInside) return true;

  return false;
}
```

```python
def poly_circle(vertices, cx, cy, r):
    # percorre cada um dos vértices e a aresta formada com o próximo
    next_idx = 0
    for current in range(len(vertices)):
        next_idx = current + 1
        if next_idx == len(vertices):
            next_idx = 0

        vc = vertices[current]
        vn = vertices[next_idx]

        # testa colisão entre o círculo e a aresta da linha
        if line_circle(vc[0], vc[1], vn[0], vn[1], cx, cy, r):
            return True

    # OPCIONAL: descomente para testar se o centro do círculo está no interior
    # if poly_point(vertices, cx, cy):
    #     return True

    return False
```

</CodeTabs>

