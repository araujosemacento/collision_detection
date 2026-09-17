---
title: "Outros Exemplos de Triângulo"
slug: "where_are_the_other_triangle_examples"
order: 25
sketch: null
description: "Como reutilizar os algoritmos de polígonos para colisões entre triângulos, retângulos, círculos e linhas."
image: "images/where-are-other-triangle-examples.jpg"
---

# ONDE ESTÃO OS OUTROS EXEMPLOS DE TRIÂNGULO?

![Triângulo com ponto de interrogação](images/where-are-other-triangle-examples.jpg)

Você pode estar se perguntando onde estão os outros exemplos de colisão para triângulos (Triângulo/Círculo, Triângulo/Retângulo, Triângulo/Linha, Triângulo/Triângulo).

A resposta: **nós já os fizemos!**

O menor número de lados que um polígono pode ter é três. Portanto, todo o código da [Seção 4 sobre Polígonos](poly-point) funciona perfeitamente para triângulos! Basta definir seu triângulo como um polígono com 3 vértices (`PVector` ou objetos `{x, y}`).
