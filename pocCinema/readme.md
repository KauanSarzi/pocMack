# POC6 - Aplicação em Nextjs

#   **Descrição Geral**
**O projeto é um sistema de reserva de assentos para cinemas que permite:**
 
- Selecionar e reservar assentos.
- Alternar automaticamente entre modo Light e Dark com base na preferência do sistema operacional.
- Exibir informações sobre o filme selecionado.
- Calcular o total da compra.

#   **Estrutura do Projeto**
```
/app
├── /components
│   ├── /Assento
│   │   ├── Assento.jsx        // Componente para os assentos
│   │   └── Assento.module.css // Estilos específicos para o componente de assentos
│   ├── /BotaoComprar
│   │   ├── BotaoComprar.jsx   // Componente do botão de compra
│   │   └── BotaoComprar.module.css // Estilos do botão
│   ├── /Cabecalho
│   │   ├── Cabecalho.jsx      // Componente do cabeçalho com título e horário
│   │   └── Cabecalho.module.css // Estilos do cabeçalho
│   ├── /InformacoesFilme
│   │   ├── InformacoesFilme.jsx // Componente para informações do filme
│   │   └── InformacoesFilme.module.css // Estilos das informações do filme
│   ├── /Legenda
│   │   ├── Legenda.jsx        // Componente da legenda
│   │   └── Legenda.module.css // Estilos da legenda
│── globals.css            // Estilos globais do projeto
│── cinema.json            // Dados do filme (assentos, título, sinopse, etc.)          
├── layout.js                  // Layout padrão do projeto
├── page.jsx                   // Página principal (Home) renderiza


```
#  **Descrição dos Arquivos**
## 1. **Estilos Globais (globals.css)**
**Define os temas Light e Dark, aplicando estilos dinâmicos com variáveis CSS. A alternância ocorre automaticamente**
**Responsividade dos elementos da pagina estilizados no proprio globals.css**

Exemplo de código:
```
/* Tema padrão (Light Mode) */
:root {
  --background-color: #fbfbfb;
  --text-color: #050f1f;
  --corselecionado: rgb(98, 0, 128);
  --corindisponivel: red;
  --corlivre: gainsboro;
}

/* Tema Dark Mode */
.dark {
  --background-color: #0c081e;
  --text-color: #fbfbfb;
  --corselecionado: rgb(49, 1, 63);
  --corindisponivel: rgb(173, 15, 15);
  --corlivre: rgb(110, 110, 110);
}

/* Aplica o Dark Mode automaticamente com base na preferência do sistema */
@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #0c081e;
    --text-color: #fbfbfb;
    --corselecionado: rgb(49, 1, 63);
    --corindisponivel: rgb(137, 0, 0);
    --corlivre: rgb(110, 110, 110);
  }
}

/* Estilo Global */
body {
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: Arial, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}
}
```

## ** ELEMENTOS RESPONSIVOS NO GLOBALS.CSS**
````
.containerFilho {
  display: flex;
  flex-direction: row;
  gap: 30px;
  padding: 0;
  width: 100vh;
}

.containerPai {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 400px;
}

.main-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.grade {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  margin-top: 20px;
  width: 100%;
  max-width: 275px;
  margin: 0 auto;
  padding: 0;
  gap: 8px;
  justify-content: center;
}

.grade::after {
  content: "";
  grid-column: span 2;
}

.grade > :nth-last-child(4) {
  grid-column-start: 3;
}

.tela {
  background-color: #bababa; /* Cor da tela */
  width: 300px; /* Ajuste da largura */
  height: 10px; /* Altura reduzida para parecer mais com uma "barra" */
  display: flex;
  justify-content: center; /* Centraliza o texto horizontalmente */
  align-items: center; /* Centraliza o texto verticalmente */
  margin-right: 380px; /* Centraliza a barra horizontalmente na página */
  margin-top: 50px;
  border-radius: 5px; /* Bordas arredondadas para um visual mais moderno */
}

h6 {
  font-weight: 400; /* Peso da fonte médio */
  font-size: 12px; /* Tamanho menor para parecer com a imagem */
  text-transform: lowercase; /* Para deixar o texto em minúsculo como na imagem */
  margin-top: -20px; /* Alinhamento acima da barra */
  position: relative; /* Necessário para o ajuste de posição */
}

@media (max-width: 425px) {
  .containerPai {
    grid-template-columns: 1fr; /* Continua com uma única coluna */
    gap: 15px; /* Reduz o espaço entre os itens */
    width: 100%;
    padding: 0;
  }

  .tela {
    margin-top: 20px; /* Ajusta espaço entre a grade e a "tela" */
    margin-left: 380px;
    margin-bottom: 20px; /* Dá mais espaço para outros elementos */
    width: 250px;
  }

  .containerFilho {
    grid-template-columns: 1fr; /* Continua com uma única coluna */
    gap: 10px; /* Reduz o espaço entre os itens */
    width: 100%;
  }
}
````



## **2. Componente de Assento (Assento.jsx e Assento.module.css)**
**O componente Assento renderiza cada assento, permitindo sua seleção ou bloqueio, com base na disponibilidade. Ele utiliza classes CSS dinâmicas.**

Props:
- reservado (boolean): Indica se o assento já está reservado.
- onSelect (função): Callback para atualizar o estado de seleção no componente pai.
- 
Exemplo de código:
```
import React, { useState } from "react";
import styles from "./Assento.module.css";

function Assento({ reservado, onSelect }) {
  const [selecionado, setSelecionado] = useState(false);

  const reservarAssento = () => {
    if (!reservado) {
      const novoEstado = !selecionado;
      setSelecionado(!selecionado);
      onSelect(novoEstado);
    }
  };

  return (
    <div
      className={`${styles.assento} ${
        reservado ? styles.reservado : selecionado ? styles.selecionado : ""
      }`}
      onClick={reservarAssento}
    />
  );
}

export default Assento;

```

**CSS associado:**

```
.assento {
  width: 25px;
  height: 25px;
  background-color: var(--corlivre);
  border: 1px solid #343434;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.selecionado {
  background-color: var(--corselecionado);
}

.reservado {
  background-color: var(--corindisponivel);
  cursor: not-allowed;
}
```

## **3. Botão de Compra (BotaoComprar.jsx e BotaoComprar.module.css)**
Este componente exibe o botão de compra e o total acumulado.

Props:
- total (número): Preço total dos assentos selecionados.
- compra (função): Callback que exibe um alerta ao realizar a compra.
  
Exemplo de código:
```
import React from "react";
import styles from "./BotaoComprar.module.css";

function BotaoComprar({ total }) {
  const comprar = () => {
    alert("Compra realizada com sucesso!");
  };
  return (
    <div className={styles.divBotao}>
      <button onClick={comprar} className={styles.botao}>
        Comprar
        <span className={styles.preco}>R$ {total.toFixed(2)}</span>
      </button>
    </div>
  );
}

export default BotaoComprar;


```

**CSS associado(com responsividade inclusa):**

```
.botao {
  background-color: var(--corindisponivel);
  color: var(--text-color);
  justify-content: center;
  border: none;
  height: 70px;
  width: 260px;
  font-size: large;
  border-radius: 15px;
  cursor: pointer;
}

.divBotao {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 100px;
}

.botao:hover {
  background-color: var(--corindisponivel);
}

.preco {
  margin-left: 8px;
  font-size: 1rem;
}

@media (max-width: 425px) {
  .divBotao {
    margin-right: 100px;
  }
}

```

## **4. Cabecalho (Cabecalho.jsx e Cabecalho.module.css)**
**O componente Cabecalho exibe o título do filme e seu horário. Ele é estilizado com o módulo CSS Cabecalho.module.css.**

Props:
titulo: String que representa o nome do filme.
horario: String que indica o horário da sessão do filme.

O componente retorna um elemento ```header``` contendo:
Um título com o nome do filme.
Um parágrafo  que exibe o horário do filme com o rótulo "Horário:" destacado em negrito usando a tag .


Exemplo de código:

```
import styles from "./Cabecalho.module.css";

const Cabecalho = ({ titulo, horario }) => (
  <header className={styles.cabecalho}>
    <h1>{titulo}</h1>
    <p>
      <strong>Horário:</strong> {horario}
    </p>
  </header>
);

export default Cabecalho;
```


**CSS associado***
```
.cabecalho {
  text-align: center;
  margin-bottom: 1.5rem;
}

.cabecalho h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
```

## **5. Informaçoes do filme (InformacoesFilme.jsx e InformacoesFilme.module.css)**
**Este arquivo define o componente React InformacoesFilme, que exibe informações detalhadas sobre o filme, como a sinopse, a data de lançamento e o nome do diretor. Ele é estilizado usando um módulo CSS chamado InformacoesFilme.module.css.**
Props:

sinopse: String que contém a descrição do enredo do filme.
dataLancamento: String com a data de lançamento do filme.
direcao: String com o nome do diretor ou diretores do filme.
Retorno JSX:

Um elemento <section> que agrupa e apresenta as informações:
Sinopse: Exibida como texto descritivo após o título "sinopse do filme" em negrito.
Data de Lançamento: Mostrada após o título "Data de lançamento" em negrito.
Direção: Listada após o título "Direção" em negrito.


Exemplo de codigo:
```
const InformacoesFilme = ({ sinopse, dataLancamento, direcao }) => (
  <section className={styles.informacoes}>
    <p>
      <strong>sinopse do filme</strong>
    </p>
    {sinopse}
    <p>
      <strong>Data de lançamento</strong>
    </p>
    {dataLancamento}
    <p>
      <strong>Direção</strong>
    </p>
    {direcao}
  </section>
);
```

**CSS associado(com responsividade)

```
.informacoes {
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 350px;
}
.informacoes h6 {
  font-size: 17px;
  font-weight: bold;
}

@media (max-width: 600px) {
  /* Oculta a seção de informações do filme */
  .informacoes {
    display: none; /* Esconde no modo celular */
  }
}

@media (max-width: 576px) {
  
    .informacoes {
      display: flex;
      flex-direction: column;
      flex: 1;
      max-width: 100px;
    }
}
```

## **7. Legendas (Legenda.jsx e Legenda.module.css)**
**Este arquivo implementa o componente React Legenda, que exibe uma legenda visual para indicar o significado dos diferentes estados dos assentos em um cinema. O componente usa estilos definidos no arquivo de módulo CSS chamado Legenda.module.css.**
**Estrutura do componente**

O componente retorna um elemento <div> com a classe CSS styles.legenda, que contém itens representando os estados dos assentos:

Livre: Representado por uma bolinha estilizada com a classe styles.disponivel.
Selecionado: Representado por uma bolinha estilizada com a classe styles.selecionado.
Indisponível: Representado por uma bolinha estilizada com a classe styles.indisponivel.
Cada estado é descrito visualmente (com uma bolinha colorida) e textualmente (com uma legenda associada).

Exemplo de codigo: 
```
// /app/components/Legenda.jsx
import styles from "./Legenda.module.css";

const Legenda = () => {
  return (
    <div className={styles.legenda}>
      <div className={styles.item}>
        <div className={`${styles.bolinha} ${styles.disponivel}`}></div>
        <span>livre</span>
      </div>
      <div className={styles.item}>
        <div className={`${styles.bolinha} ${styles.selecionado}`}></div>
        <span>selecionado</span>
      </div>
      <div className={styles.item}>
        <div className={`${styles.bolinha} ${styles.indisponivel}`}></div>
        <span>indisponível</span>
      </div>
    </div>
  );
};

export default Legenda;

```

***CSS associado (com responsividade)**

```

.legenda {
  display: flex;
  justify-content: center;
  gap: 16px;
  list-style-type: none;
  padding: 0;
  margin-right: 370px;
  margin-bottom: 12px;
}

.legenda {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 8px;
  padding: 8px 0;
  font-size: 10px;
}
.bolinha {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color); /* Texto branco para combinar com fundo escuro */
}

.disponivel {
  background-color: var(--corlivre);
}

.selecionado {
  background-color: var(--corselecionado);
}

.indisponivel {
  background-color: var(--corindisponivel);
}

@media (max-width: 768px) {
  .legenda {
    gap: 16px; /* Menor espaço entre os itens */
    font-size: 8px; /* Fonte menor para melhor visualização em dispositivos menores */
  }

  .item {
    gap: 6px; /* Ajusta o espaço entre os ícones e o texto */
  }

  .bolinh

<div class="legenda">
  <div class="item">
    <div class="bolinha disponivel"></div>
    <span>livre</span>
  </div>
  <div class="item">
    <div class="bolinha selecionado"></div>
    <span>selecionado</span>
  </div>
  <div class="item">
    <div class="bolinha indisponivel"></div>
    <span>indisponível</span>
  </div>
</div>
```

## **8.Pagina (page.tsx)**


**Estrutura do arquivo***
<br>
React e Hooks:

useState: Gerencia o estado do preço total dos assentos selecionados.
useEffect: Configura o comportamento dinâmico do tema com base na preferência de cor do sistema operacional.

Componentes personalizados:

Cabecalho: Exibe o título e o horário do filme.
Assento: Renderiza cada assento na grade, com interatividade para seleção.
BotaoComprar: Exibe o botão para finalizar a compra e mostra o total acumulado.
InformacoesFilme: Mostra detalhes como a sinopse, data de lançamento e direção do filme.
Legenda: Exibe uma legenda visual com os significados dos estados dos assentos.

Dados:

dadosFilme: Importa um JSON com as informações sobre o filme (assentos, título, horário, preço, etc.).

CSS:

Inclui o arquivo global de estilos para configurar a aparência da página.

Exemplo de código:

```
"use client";
import React, { useState, useEffect } from "react";
import Cabecalho from "./components/Cabecalho/Cabecalho";
import Assento from "./components/Assento/Assento";
import BotaoComprar from "./components/BotaoComprar/BotaoComprar";
import InformacoesFilme from "./components/InformacoesFilme/InformacoesFilme";
import Legendas from "./components/Legenda/Legenda";
import dadosFilme from "./cinema.json";
import "./globals.css";

export default function Home() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    document.body.classList.toggle("dark", prefersDark);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (e: MediaQueryListEvent) => {
      document.body.classList.toggle("dark", e.matches);
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  const handleSelect = (isSelected) => {
    setTotal((prev) =>
      isSelected ? prev + dadosFilme.preco : prev - dadosFilme.preco
    );
  };

  return (
    <main className="containerPai">
      <Cabecalho titulo={dadosFilme.titulo} horario={dadosFilme.horario} />

      <article className="containerFilho">
        <section className="grade">
          {dadosFilme.assentos.map((assento) => (
            <Assento
              key={assento.id}
              reservado={assento.reservado}
              onSelect={handleSelect}
            />
          ))}
        </section>

        <InformacoesFilme
          sinopse={dadosFilme.sinopse}
          dataLancamento={dadosFilme.dataLancamento}
          direcao={dadosFilme.direcao}
        />
      </article>

      <div className="tela">
        <h6>tela</h6>
      </div>

      <Legendas />

      <BotaoComprar total={total} />
    </main>
  );
}

```

## **9. Dados do Filme (cinema.json)**
**O arquivo JSON contém as informações do filme e o estado inicial dos assentos.**

Exemplo:

```
{
  "titulo": "A Forja",
  "horario": "16:40",
  "preco": 25.0,
  "lugares": [
    { "id": 1, "reservado": false },
    { "id": 2, "reservado": true }
  ]
}
```



## **RESULTADO**

![Captura de tela 2024-11-26 195115](https://github.com/user-attachments/assets/fc28b1df-ef2b-42f4-ad65-e625fbd55f0d)

## 🚀  **Como Testar**
**1. Inicie o servidor:**

```
npm run dev
```
**2. Acesse http://localhost:3000.**

**3. Verifique:**
- Seleção de assentos.
- Alteração entre modos Light e Dark.
- Exibição do preço total e funcionalidade do botão de compra.

  




