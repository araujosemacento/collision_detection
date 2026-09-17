---
title: "Linha / Linha"
slug: "line-line"
order: 15
sketch: "LineLine"
caption: "Use o mouse para cruzar as duas linhas!"
description: "Interseção entre dois segmentos de reta usando equações paramétricas e detecção do ponto de cruzamento."
---

<script>
	import CodeTabs from '$lib/components/CodeTabs.svelte';
</script>

# LINHA / LINHA

#### Jeff Thompson

Com este algoritmo você poderá construir sistemas incríveis de colisão para jogos de luta de espadas (para fazer faíscas voarem onde as lâminas se cruzam!) ou mecânicas de *Raycasting* em jogos 2D/3D.

Para verificar se dois segmentos de reta se cruzam, calculamos a distância até o ponto de interseção através das variáveis de proporção `uA` e `uB`:

```javascript
let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
```

Se houver uma colisão, ambos os parâmetros `uA` e `uB` devem estar no intervalo entre `0.0` e `1.0`:

```javascript
if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return true;
}
return false;
```

---

## OBTENDO O PONTO DE INTERSEÇÃO EXATO

Podemos adicionar um recurso extra muito útil: calcular as coordenadas X/Y exatas onde as duas linhas se cruzam. Isso é essencial se você deseja desenhar faíscas ou partículas no ponto do impacto:

```javascript
let intersectionX = x1 + (uA * (x2-x1));
let intersectionY = y1 + (uA * (y2-y1));
```

Abaixo está o exemplo completo em código:

<CodeTabs>

```javascript
function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
  // calcula a distância até o ponto de interseção
  let denom = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1));
  if (denom === 0) return false; // linhas são paralelas ou coincidentes

  let uA = (((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3))) / denom;
  let uB = (((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3))) / denom;

  // se uA e uB estão entre 0 e 1, as linhas se cruzam!
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    // opcional: calcular o ponto exato da colisão
    let intersectionX = x1 + (uA * (x2 - x1));
    let intersectionY = y1 + (uA * (y2 - y1));

    return true;
  }
  return false;
}
```

```java
boolean lineLine(float x1, float y1, float x2, float y2, float x3, float y3, float x4, float y4) {
  // calcula a distância até o ponto de interseção
  float denom = ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
  if (denom == 0) return false;

  float uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / denom;
  float uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / denom;

  // se uA e uB estão entre 0 e 1, as linhas se cruzam!
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return true;
  }
  return false;
}
```

```python
def line_line(x1, y1, x2, y2, x3, y3, x4, y4):
    # calcula a distância até o ponto de interseção
    denom = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1))
    if denom == 0:
        return False  # linhas são paralelas

    uA = (((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3))) / denom
    uB = (((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3))) / denom

    # se uA e uB estão entre 0 e 1, as linhas se cruzam!
    if 0 <= uA <= 1 and 0 <= uB <= 1:
        return True
    return False

# Ponto de interseção exato:
# intersection_x = x1 + (uA * (x2 - x1))
# intersection_y = y1 + (uA * (y2 - y1))
```

</CodeTabs>

> **Atribuição:** Algoritmo baseado na clássica formulação geométrica de **Paul Bourke**, com contribuições de Ibackstrom e discussões de matemática vetorial na comunidade.

