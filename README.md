

<h3>Contribuidores</h3>


![https://github.com/freitasszz](https://avatars.githubusercontent.com/u/179886040?v=4) <br> <sub> Gabriel Freitas </sub> | ![https://github.com/KauanSarzi](https://avatars.githubusercontent.com/u/179622009?v=4) <br> <sub> Kauan Sarzi </sub> | ![https://github.com/Liminha300](https://avatars.githubusercontent.com/u/179885175?v=4) <br> <sub> Ricardo Kawamuro </sub> |
| --- | --- | --- |
| [Gabriel Freitas](https://github.com/freitasszz) | [Kauan Sarzi](https://github.com/KauanSarzi) | [Ricardo Kauamuro](https://github.com/Liminha300) | 

<h3>Licença📝</h3>
Esse projeto está autorizado pelo MIT

<h1 align="center">POC 4 - Localização por IP </h1>

<p>Este projeto é uma POC (Prova de Conceito) que permite ao usuário buscar informações de geolocalização com base em seu endereço IP. Ao clicar no botão "Buscar Localização", o site faz uma requisição à API ipify para obter o IP do usuário e, em seguida, utiliza o serviço da API ipstack para buscar a localização geográfica correspondente, exibindo os dados na tela.</p>

<h2>Funcionalidades</h2>
<li>Busca do endereço IP público do visitante.</li>
<li>Exibição da localização (Cidade, País, Latitude, e Longitude) com base no IP.</li>

<h2>Tecnologias Utilizadas</h2>

<li>HTML5: Estrutura da página.</li>
<li>CSS3: Estilização da interface.</li>
<li>JavaScript (ES6): Lógica para buscar o IP e os dados de geolocalização usando APIs.</li>

<h2>Estrutura do Projeto</h2>

<h3>HTML</h3>
<p>O arquivo index.html define a estrutura da página com os seguintes elementos:</p>
<li>Um botão para acionar a busca de localização.</li>
<li>Um card que exibe o endereço IP, cidade, país, latitude e longitude do usuário.</li>

<h3>CSS</h3>
<p>A estilização básica é aplicada diretamente no arquivo HTML, com destaque para:</p>
<li>Centralização do conteúdo e ajuste do layout.</li>

<h3>JavaScript</h3>
<p>O arquivo id.js contém a lógica da aplicação:</p>
<li>API ipify: Utilizada para obter o IP público do usuário.</li>
<li>API ipstack: Utilizada para converter o IP em dados de geolocalização.</li>
<li>Utilização de fetch para realizar chamadas assíncronas às APIs.</li>

<h2>Como Funciona</h2>

<p>1.O usuário clica no botão "Buscar Localização".</p>
<p>2.O JavaScript faz uma requisição à API ipify para obter o IP público.</p>
3.Com o IP em mãos, uma segunda requisição é feita à API ipstack usando uma chave de acesso (access_key), retornando os dados de localização.
4.As informações de endereço IP, cidade, país, latitude e longitude são exibidas no card.



