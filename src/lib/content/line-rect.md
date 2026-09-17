---
title: "Linha / Retângulo"
slug: "line-rect"
order: 16
sketch: "LineRect"
caption: "Mova a linha com o mouse para atingir o retângulo!"
description: "Teste de colisão entre segmento de reta e retângulo verificando a interseção com as quatro arestas."
image: "images/line-rect.jpg"
---

<script>
	import CodeTabs from '$lib/components/CodeTabs.svelte';
</script>

# LINHA / RETÂNGULO

Como verificar se uma linha colide com um retângulo? Basta reutilizar a função [Linha/Linha](line-line) que acabamos de aprender e testar a linha contra cada um dos **quatro lados do retângulo**:

1. Lado esquerdo: `(rx, ry)` até `(rx, ry + rh)`
2. Lado direito: `(rx + rw, ry)` até `(rx + rw, ry + rh)`
3. Lado superior: `(rx, ry)` até `(rx + rw, ry)`
4. Lado inferior: `(rx, ry + rh)` até `(rx + rw, ry + rh)`

Se a linha cruzar **qualquer um** dos quatro lados, há colisão!

![Divisão de um retângulo em quatro linhas](images/line-rect.jpg)

<CodeTabs>

```javascript
function lineRect(x1, y1, x2, y2, rx, ry, rw, rh) {
  let left =   lineLine(x1, y1, x2, y2, rx, ry, rx, ry + rh);
  let right =  lineLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
  let top =    lineLine(x1, y1, x2, y2, rx, ry, rx + rw, ry);
  let bottom = lineLine(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh);

  if (left || right || top || bottom) {
    return true;
  }
  return false;
}
```

```java
boolean lineRect(float x1, float y1, float x2, float y2, float rx, float ry, float rw, float rh) {
  boolean left =   lineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh);
  boolean right =  lineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh);
  boolean top =    lineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry);
  boolean bottom = lineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);

  if (left || right || top || bottom) {
    return true;
  }
  return false;
}
```

```python
def line_rect(x1, y1, x2, y2, rx, ry, rw, rh):
    left =   line_line(x1, y1, x2, y2, rx, ry, rx, ry + rh)
    right =  line_line(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh)
    top =    line_line(x1, y1, x2, y2, rx, ry, rx + rw, ry)
    bottom = line_line(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh)

    if left or right or top or bottom:
        return True
    return False

# Dica Pygame (método clipline nativo do Rect):
# rect = pygame.Rect(rx, ry, rw, rh)
# hit = bool(rect.clipline((x1, y1), (x2, y2)))
```

</CodeTabs>

## LINE OF SIGHT (CAMPOS DE VISÃO)

Este algoritmo também é frequentemente utilizado para calcular **Line of Sight** (linha de visão). Traçar uma linha entre o jogador e um inimigo e verificar se ela colide com obstáculos retangulares determina se o inimigo consegue ver o jogador ou se a visão está bloqueada.

![Exemplo de Linha de Visão bloqueada por obstáculo](images/line-of-sight.jpg)
