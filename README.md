<h1 align="center">POC 1 - Flexbox</h1> 

<p align="center">Nessa primeira POC (Prova de Conceito) vamos mostrar como o Flexbox, por se tratar de uma forma de layout flexivel e responsivo ajuda a programar com facilidade no CSS</p>

<h3 align="center">Conteúdos do projeto</h3> 
<p align="center">👇🏼Os nossos tópicos👇🏼</p>
<p align="center">
 <a>Conteúdos</a> •
 <a>Pré-requisitos</a> • 
 <a>Colocando para funcionar</a> • 
 <a>Por trás</a> • 
 <a>O projeto</a> • 
 <a>Contribuidores</a>
</p>

<h4 align="center"> 
	✅Projeto Finalizado
</h4>

<h3 align="left">Pré-requisitos para rodar o código</h3> 
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
GitHub (https://github.com/), Node.js (https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como VSCode (https://code.visualstudio.com/)


<h3 align="left">Colocando para funcionar 🎲</h3> 

```bash
# Clone este repositório
$ git clone https://github.com/KauanSarzi/pocMack.git
# Acesse a pasta do projeto no terminal/cmd
$ pocMack
# Vá para a pasta server
$ README.md
# Instale as dependências
$ npm install
# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server

```
<h3 align="left">Por trás do projeto</h3>
<p>Feito através de um código HTML e CSS, o projeto apresenta uma página que contém exemplos das principais propriedades do Flexbox. Nosso objetivo é mostrar como cada elemento pode se adequadr a diferentes tipos de projetos </p>

<h3 align="left">O Projeto</h3>
<h4 align="left">Aqui você vai encontrar a explicação de cada flebox existente</h4>
<h4>1) justify-content</h4>
<p>Tem como função alinhar os itens no eixo principal (geralmente na horizontal). Exemplo:</p>
	<ol>flex-start: alinha os itens no início do container.</ol>
 	<ol>flex-end: alinha os itens no final do container.</ol>
  	<ol>center: alinha os itens no centro do container.</ol>
   	<ol>space-between: distribui os itens com espaço igual entre eles.</ol>
    	<ol>space-around: distribui os itens com espaço igual ao redor deles.</ol>
<h4>2) align-items</h4>
<p>Tem como função alinhar os itens ao longo do eixo transversal (geralmente vertical). Exemplo:</p>
	<ol>flex-start: alinha os itens no início do eixo transversal.</ol>
 	<ol>flex-end: alinha os itens no final do eixo transversal.</ol>
  	<ol>center: alinha os itens no centro do eixo transversal.</ol>
   	<ol>baseline: alinha os itens com base na linha de texto.</ol>
    	<ol>stretch: estica os itens para preencher o eixo transversal.</ol>
<h4>3) align-self</h4>
<p>Tem como função fazer um item específico se alinhar de forma diferente dos outros itens no container. Exemplo:</p>
	<ol>flex-start: alinha o iten no início do eixo transversal.</ol>
 	<ol>flex-end: alinha o iten no final do eixo transversal.</ol>
  	<ol>center: alinha o iten no centro do eixo transversal.</ol>
<h4>4) flex-direction</h4>
<p>Tem como função definir a direção do eixo principal. Exemplo:</p>
	<ol>row: alinha os itens em uma linha horizontal.</ol>
 	<ol>row-reverse: alinha os itens em uma linha horizontal, mas na ordem inversa.</ol>
  	<ol>column: alinha os itens em uma coluna vertical.</ol>
   	<ol>column-reverse: alinha os itens em uma coluna vertical, mas na ordem inversa.</ol>
<h4>5) order</h4>
<p>Tem como função controlar a ordem dos itens no container. Exemplo:</p>
	<ol>order: 1: o item aparece primeiro.</ol>
 	<ol>order: 2: o item aparece em segundo.</ol>
  	<ol>order: 3: o item aparece em terceiro lugar.</ol>
<h4>6) flex-wrap</h4>
<p>Tem como função decidir se os itens devem quebrar para a próxima linha quando não há espaço. Exemplo:</p>
	<ol>nowrap: os itens permanecem em uma única linha.</ol>
 	<ol>wrap: os itens quebram para a próxima linha se necessário.</ol>
  	<ol>wrap-reverse: as linhas são empilhadas na direção oposta.</ol>

<h3>Contribuidores</h3>


![https://github.com/freitasszz](https://avatars.githubusercontent.com/u/179886040?v=4) <br> <sub> Gabriel Freitas </sub> | ![https://github.com/KauanSarzi](https://avatars.githubusercontent.com/u/179622009?v=4) <br> <sub> Kauan Sarzi </sub> | ![https://github.com/Liminha300](https://avatars.githubusercontent.com/u/179885175?v=4) <br> <sub> Ricardo Kawamuro </sub> |
| --- | --- | --- |
| [Gabriel Freitas](https://github.com/freitasszz) | [Kauan Sarzi](https://github.com/KauanSarzi) | [Ricardo Kauamuro](https://github.com/Liminha300) | 

<h3>Licença📝</h3>
Esse projeto está autorizado pelo MIT

<h1 align="center">POC 3 - Media Queries</h1>

<p>Este projeto demonstra como utilizar Media Queries em CSS para criar uma experiência responsiva e adaptável em diferentes dispositivos e condições de uso, como impressão e orientações de tela. Abaixo, são explicados os principais conceitos e como as media queries são aplicadas no projeto.</p>

<h2>Estrutura do Projeto</h2>
<p>O projeto consiste em uma página HTML que exibe um menu de navegação, uma galeria de imagens, e uma seção de texto explicando sobre Whey Protein. O comportamento da página muda conforme o dispositivo ou modo em que está sendo exibida (ex.: smartphone, tablet, desktop, ou modo de impressão).</p>

<h2>Linguagens Utilizadas:</h2>

<li>HTML: Estrutura básica do conteúdo da página.</li>
<li>CSS: Estilização e responsividade.</li>

<h2>Como Funciona a Responsividade</h2>
<p>A responsividade da página é controlada pelas Media Queries, que permitem adaptar o layout da página de acordo com as características do dispositivo, como largura da tela e orientação. Aqui estão os principais casos de uso:</p>

<h3>1. Quebra de Larguras de Tela (Breakpoints)</h3>
<p>As media queries são usadas para ajustar o layout da página com base na largura da tela, criando uma experiência otimizada para diferentes dispositivos, como smartphones, tablets e desktops.</p>

<h3>2. Orientação do Dispositivo (Landscape e Portrait)</h3>
<p>As media queries também permitem ajustar o layout com base na orientação da tela.</p>

<h3>3. Modo de Impressão</h3>
<p>Outra aplicação importante das media queries é ajustar o layout quando a página for impressa.</p>

<h2>Conclusão</h2>
<p>Este projeto é um exemplo de como usar media queries para adaptar o layout de uma página web a diferentes tamanhos de tela, orientações e modos de exibição, como impressão. A técnica é essencial para criar uma experiência fluida e responsiva em dispositivos variados, desde smartphones até desktops.</p>



