---
title: "O Que Você Precisa Saber"
slug: "what_you_should_already_know"
order: 4
sketch: null
description: "Conceitos fundamentais de geometria, vetores, funções trigonométricas e programação necessários para o livro."
---

<script>
	import CodeTabs from '$lib/components/CodeTabs.svelte';
</script>

# O QUE VOCÊ PRECISA SABER

Este livro é escrito utilizando o ecossistema gráfico **p5.js (JavaScript)**, mantendo também o código original em **Processing (Java)** e exemplos equivalentes em **Pygame (Python)**. É necessária muito pouca experiência prévia em programação para acompanhar as explicações, mas conhecimento básico sobre `funções`, `variáveis` e `estruturas condicionais` será muito útil. A lógica dos algoritmos apresentados é facilmente interoperável entre as linguagens, já que todas apresentam estrutura de execução básica muito semelhante.

Ao final, também serão abordados temas um pouco mais avançados, como colisão utilizando código orientado a objetos e matrizes. Estritamente falando, entender Programação Orientada a Objetos (POO) não é necessário para compreender os algoritmos de colisão em si, mas vai ser muito útil para a aplicação desse conteúdo em projetos maiores e mais complexos, onde diversos objetos interagem entre si.

<div class="callout">
<strong>Não está familiarizado com as ferramentas demonstradas aqui? Sem problema!</strong> Se você já utilizou qualquer outra linguagem de programação, acredito que será muito fácil entender os exemplos didáticos e adaptar os algoritmos para a linguagem ou engine de sua preferência.
</div>

---

## VARIÁVEIS

Precisaremos de variáveis para armazenar a posição dos objetos (geralmente `x` e `y`), seus tamanhos (como `largura`, `altura` ou `raio`), a posição do ponteiro do mouse (`mouseX` e `mouseY`) e estados de colisão (`true` ou `false`). Observar como isso funciona dentro dos exemplos ao longo do livro costuma ser bastante intuitivo.

---

## FUNÇÕES

O coração de todos os exemplos de colisão são as **funções**, então é necessário se familiarizar com elas ao longo do livro. Se você nunca criou uma função antes, leia esta seção com atenção. Caso já tenha familiaridade com o conceito, fique à vontade para revisar os exemplos e seguir para o próximo tópico.

Uma função é um bloco de código reutilizável e independente. Elas são usadas para operações que você deseja executar mais de uma vez — como verificar a colisão entre dois objetos.

<div class="callout">
<strong>Curiosidade:</strong> Como já dito, um ótimo exemplo de aplicação disso são as demonstrações de colisão que você irá ver ao longo do livro. Se você tiver interesse em espiar por trás das cortinas e verificar por si próprio as funções utilizadas nas demonstrações, dê uma passada no <a href="https://github.com/araujosemacento/collision_detection/blob/main/src/lib/sketches/index.js" target="_blank" rel="noopener noreferrer">repositório</a> desta adaptação quando sentir que dominou o conceito por trás de <b>funções</b>. Sinta-se à vontade para dar uma olhadinha, só não repare na bagunça.
</div>

Uma função _retorna_ (envia de volta) um valor com determinado tipo de dado (como um texto ou um número). Veja a função simples abaixo que retorna um cumprimento:

<CodeTabs>

```javascript
function cumprimentar() {
  return "Olá!";
}
```

```java
String cumprimentar() {
  return "Olá!";
}
```

```python
def cumprimentar():
    return "Olá!"
```

</CodeTabs>

Observando o código representado na linguagem Java, você pode notar que é necessário informar o tipo de retorno da função, neste caso, `String` (texto). Se uma função não precisa retornar nada (por exemplo, se tudo o que ela faz é desenhar um retângulo na tela), seu tipo de retorno é `void`. Logo, as seções `setup()` e `draw()` do Processing/p5.js são funções que você escreve e são invocadas pelo motor da linguagem, sem enviar nada de volta!

As funções também podem receber **argumentos** (parâmetros de entrada). Um argumento recebe um tipo e um nome (que existe apenas dentro do escopo da função). Múltiplos argumentos são separados por vírgula. Veja uma função que soma dois números:

<CodeTabs>

```javascript
function soma(a, b) {
  return a + b;
}

let resultado = soma(2, 2);
console.log(resultado); // 4
```

```java
float soma(float a, float b) {
  return a + b;
}

float resultado = soma(2, 2);
println(resultado); // 4
```

```python
def soma(a, b):
    return a + b

resultado = soma(2, 2)
print(resultado) # 4
```

</CodeTabs>

Tanto Javascript quanto Python são linguagens dinamicamente tipadas, ou seja, não é necessário informar o tipo de retorno da função, nem mesmo o tipo dos argumentos. Mas não precisamos nos ater muito a explicações pedantes, por enquanto.

Todos os exemplos deste livro são estruturados como funções. Elas recebem parâmetros dos objetos a serem testados (como posição ou tamanho) e retornam um valor booleano (`true` ou `false`) indicando se a colisão está ocorrendo. Elas também podem ser modificadas para retornar a posição exata da colisão, assim como na demonstração de colisão entre [duas linhas](line-line). Tente dar uma olhada nos códigos completos apresentados ao final de cada exemplo, para entender como as funções são estruturadas e invocadas.

---

## FLOATS (PONTO FLUTUANTE)

<div class="callout">
<strong>Usando p5.js ou Pygame?</strong> Sinta-se livre para pular diretamente para o tópico sobre <a href="#estruturas-condicionais-if--else">estruturas condicionais</a>. 
</div>

Você notará que, ao longo deste livro, usamos quase exclusivamente variáveis de ponto flutuante (`float` / números com casas decimais). Isso ocorre por três motivos principais:

1. **Flexibilidade de Tipos**: Números inteiros (`int`) podem ser passados para funções que esperam números decimais sem causar erros, mas o oposto não.

```java
// argumento int -> função float é ok
int a = 1;
funcaoFloat(a);

void funcaoFloat(float f) {
  // Processing automaticamente converte para float
}

// argumento float -> função int não dá certo
float b = 1;
funcaoInt(b);

void funcaoInt(int i) {
  // isso vai causar um erro
}
```

2. **Precisão e Suavidade**: Variáveis `float` nos dão a capacidade de medir com maior precisão e mover objetos de forma mais suave e fluida pela tela, fazendo projetos interativos parecerem mais naturais.

3. **Compatibilidade com Vetores (PVector / Vector2)**: Usar decimais facilita imensamente a transição do uso de posições X/Y separadas para a utilização de vetores geométricos, cujos componentes internos são armazenados em ponto flutuante.

---

<h2 id="estruturas-condicionais-if--else">ESTRUTURAS CONDICIONAIS (IF / ELSE)</h2>

As **estruturas condicionais** (instruções `if` e `else`) são utilizadas para controlar o fluxo de execução de um programa, permitindo que determinado bloco de código seja executado apenas quando uma condição booleana for verdadeira (`true`), e um bloco alternativo seja executado caso ela seja falsa (`false`). Na detecção de colisões, essa estrutura é fundamental para decidir o que deve acontecer no jogo ou aplicação quando dois objetos interagem — como alterar a cor de um elemento, disparar um evento ou inverter o sentido de um movimento.

<CodeTabs>

```javascript
let objeto = {
  cor: null,
};

if (aconteceColisao) {
  objeto.cor = "laranja";
} else {
  objeto.cor = "azul";
}
```

```java
class Objeto {
  String cor = null;
}

Objeto objeto = new Objeto();

if (aconteceColisao) {
  objeto.cor = "laranja";
} else {
  objeto.cor = "azul";
}
```

```python
class Objeto:
  def __init__(self):
    self.cor = None

obj = Objeto()

if acontece_colisao:
    obj.cor = "laranja"
else:
    obj.cor = "azul"
```

</CodeTabs>

Acredito ser seguro dizer que, com esses conceitos básicos alinhados, você está pronto para explorar os algoritmos de colisão! Inclusive, acho que esse foi o capítulo com o maior número de discrepâncias em relação à obra original. Sinto muito por isso, mas espero que as mudanças possam auxiliar na compreensão do conteúdo e tentarei não fazer alterações tão drásticas assim daqui pra frente.
