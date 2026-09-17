---
title: "Triângulo / Ponto"
slug: "tri-point"
order: 24
sketch: "TriPoint"
caption: "Mova o ponteiro do mouse para dentro do triângulo!"
description: "Detecção de ponto dentro de triângulo comparando a soma das áreas dos subtriângulos internos."
image: "images/tri-point.jpg"
---

<script>
	import CodeTabs from '$lib/components/CodeTabs.svelte';
</script>

# TRIÂNGULO / PONTO

#### Jeff Thompson

Para testar se um ponto está dentro de um triângulo, comparamos a **área do triângulo original** com a **soma das áreas de três pequenos triângulos** criados entre o ponto e os cantos do triângulo.

O diagrama abaixo ilustra a formação desses três sub-triângulos quando o ponto está dentro ou fora do triângulo:

![Pontos fora e dentro de um triângulo formando três subtriângulos](images/tri-point.jpg)

Calculamos a área do triângulo original usando a fórmula do determinante (variante da Fórmula de Heron):

```javascript
let areaOrig = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));
```

Em seguida, calculamos a área dos 3 sub-triângulos formados entre o ponto `(px, py)` e cada par de vértices:

```javascript
let area1 = Math.abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py));
let area2 = Math.abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py));
let area3 = Math.abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py));
```

Se somarmos as três áreas e o resultado for exatamente igual à área original (`area1 + area2 + area3 === areaOrig`), sabemos que o ponto está contido dentro do triângulo!

<CodeTabs>

```javascript
function triPoint(x1, y1, x2, y2, x3, y3, px, py) {
  // calcula a área do triângulo original
  let areaOrig = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));

  // calcula a área dos 3 triângulos formados com o ponto
  let area1 = Math.abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py));
  let area2 = Math.abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py));
  let area3 = Math.abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py));

  // se a soma das 3 áreas for igual à área original, há colisão!
  // nota: usamos margem de erro (0.01) para compensar a precisão de decimais
  if (Math.abs((area1 + area2 + area3) - areaOrig) < 0.01) {
    return true;
  }
  return false;
}
```

```java
boolean triPoint(float x1, float y1, float x2, float y2, float x3, float y3, float px, float py) {
  // calcula a área do triângulo original
  float areaOrig = abs( (x2-x1)*(y3-y1) - (x3-x1)*(y2-y1) );

  // calcula a área dos 3 triângulos formados com o ponto
  float area1 =    abs( (x1-px)*(y2-py) - (x2-px)*(y1-py) );
  float area2 =    abs( (x2-px)*(y3-py) - (x3-px)*(y2-py) );
  float area3 =    abs( (x3-px)*(y1-py) - (x1-px)*(y3-py) );

  // se a soma das 3 áreas for igual à área original, há colisão!
  if (area1 + area2 + area3 == areaOrig) {
    return true;
  }
  return false;
}
```

```python
def tri_point(x1, y1, x2, y2, x3, y3, px, py):
    # calcula a área do triângulo original
    area_orig = abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1))

    # calcula a área dos 3 triângulos formados com o ponto
    area1 = abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py))
    area2 = abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py))
    area3 = abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py))

    # se a soma das 3 áreas for igual à área original, há colisão!
    if abs((area1 + area2 + area3) - area_orig) < 0.01:
        return True
    return False
```

</CodeTabs>

> **Atribuição:** Algoritmo baseado em discussões clássicas na comunidade YoYo Games e debates de precisão matemática no fórum GameDev.net.

