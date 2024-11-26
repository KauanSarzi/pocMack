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
**Este componente exibe o botão de compra e o total acumulado.**

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

O componente retorna um elemento <header> contendo:
Um título (<h1>) com o nome do filme.
Um parágrafo (<p>) que exibe o horário do filme com o rótulo "Horário:" destacado em negrito usando a tag <strong>.


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

  .bolinha {
    width: 14px; /* Reduz o tamanho da bolinha */
    height: 14px;
  }
}

@media (max-width: 576px) {
  .legenda {
    gap: 12px; /* Diminui o espaço entre os itens */
    font-size: 8px; /* Ajusta o tamanho da fonte */
    flex-direction: ; /* Organiza os itens verticalmente */
    margin-right: 0; /* Remove a margem direita */
    margin-bottom: 8px; /* Ajusta o espaçamento inferior */
  }

  .item {
    gap: 4px; /* Menor espaço entre os ícones e o texto */
  }

  .bolinha {
    width: 12px; /* Bolinhas ainda menores */
    height: 12px;
  }
}
```




## **8. Página Principal (page.tsx)**
**A página principal utiliza os componentes criados para renderizar o filme, os assentos, botão de compra, informaçoes do filme, Cabeçalho, e as legendas**



    if (novosAssentos[index].disponivel) {
      novosAssentos[index].disponivel = false;
      setTotal(total + dadosFilme.preco);
    } else {
      novosAssentos[index].disponivel = true;
      setTotal(total - dadosFilme.preco);
    }

    setAssentos(novosAssentos);
  };

  const comprar = () => alert('Compra realizada com sucesso!');

  const assentosPorLinha = 10;
  const assentosEmGrade = Array.from(
    { length: assentos.length / assentosPorLinha },
    (_, linha) => assentos.slice(linha * assentosPorLinha, (linha + 1) * assentosPorLinha)
  );

  return (
    <div className={styles.container}>
      <Cabecalho filme={dadosFilme.titulo} hora={dadosFilme.horario} />
      <GradeAssentos assentosEmGrade={assentosEmGrade} selecionarAssento={selecionarAssento} />
      <BotaoComprar total={total} onComprar={comprar} />
    </div>
  );
}
2. Componente GradeAssentos
import styles from './GradeAssentos.module.css';
import Assento from '../Assento/Assento';

const GradeAssentos = ({ assentosEmGrade, selecionarAssento }) => (
  <div className={styles.grade}>
    {assentosEmGrade.map((linha, indexLinha) => (
      <div key={indexLinha} className={styles.linha}>
        {linha.map((assento) => (
          <Assento
            key={assento.numero}
            numero={assento.numero}
            disponivel={assento.disponivel}
            onSelect={() => selecionarAssento(assento.numero)}
          />
        ))}
      </div>
    ))}
  </div>
);

export default GradeAssentos;
CSS para o layout responsivo em GradeAssentos.module.css:

.grade {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.linha {
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .linha {
    flex-wrap: wrap;
  }
}
3. Componente Assento
import styles from './Assento.module.css';

const Assento = ({ numero, disponivel, onSelect }) => (
  <button
    className={`${styles.assento} ${disponivel ? styles.livre : styles.ocupado}`}
    onClick={onSelect}
    disabled={!disponivel}
  >
    {numero}
  </button>
);

export default Assento;
CSS do Assento em Assento.module.css:

.assento {
  width: 40px;
  height: 40px;
  margin: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
  text-align: center;
  line-height: 40px;
  transition: transform 0.2s;
}

.assento:hover {
  transform: scale(1.1);
}

.livre {
  background-color: #28a745;
  color: #fff;
}

.ocupado {
  background-color: #6c757d;
  color: #fff;
  cursor: not-allowed;
}
4. Botão Comprar
import styles from './BotaoComprar.module.css';

const BotaoComprar = ({ total, onComprar }) => (
  <button className={styles.botao} onClick={onComprar}>
    Comprar R$ {total.toFixed(2)}
  </button>
);

export default BotaoComprar;
CSS em BotaoComprar.module.css:

.botao {
  width: 100%;
  padding: 1rem;
  background-color: #ff4b5c;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: opacity 0.3s;
}

.botao:hover {
  opacity: 0.8;
}
Media Queries para Responsividade
Adicione as Media Queries ao index.module.css para ajustar o layout:

.container {
  max-width: 1200px;
  margin: auto;
  padding: 1rem;
}

@media (max-width: 768px) {
  .container {
    padding: 0.5rem;
  }
}
Com esta configuração, o layout será responsivo e funcional para dispositivos móveis e desktop, com os assentos sendo exibidos como uma grade dinâmica. O botão "Comprar" calcula o valor total e exibe um alerta após a compra.






Dito por si:
{
  "titulo": "A Forja",
  "sinopse": "Um ano depois de encerrar o ensino médio, o jovem Isaías Wright não tem planos para o futuro e é desafiado por sua mãe solo e um empresário de sucesso a começar a traçar um rumo melhor para sua vida. Ele passa a ser discipulado pelo seu novo mentor, conta com orações de sua mãe e de uma guerreira de orações, Dona Clara, e começa a descobrir o propósito de Deus para sua vida.",
  "dataLancamento": "26 de setembro de 2024 (Brasil)",
  "direcao": "Alex Kendrick",
  "horario": "16:40",
  "preco": 25.0,
  "assentos": [
    {
      "numero": 1,
      "disponivel": true
    },
    {
      "numero": 2,
      "disponivel": true
    },
    {
      "numero": 3,
      "disponivel": true
    },
    {
      "numero": 4,
      "disponivel": true
    },
    {
      "numero": 5,
      "disponivel": true
    },
    {
      "numero": 6,
      "disponivel": true
    },
    {
      "numero": 7,
      "disponivel": true
    },
    {
      "numero": 8,
      "disponivel": true
    },
    {
      "numero": 9,
      "disponivel": true
    },
    {
      "numero": 10,
      "disponivel": true
    },
    {
      "numero": 11,
      "disponivel": true
    },
    {
      "numero": 12,
      "disponivel": true
    },
    {
      "numero": 13,
      "disponivel": true
    },
    {
      "numero": 14,
      "disponivel": true
    },
    {
      "numero": 15,
      "disponivel": true
    },
    {
      "numero": 16,
      "disponivel": true
    },
    {
      "numero": 17,
      "disponivel": true
    },
    {
      "numero": 18,
      "disponivel": true
    },
    {
      "numero": 19,
      "disponivel": true
    },
    {
      "numero": 20,
      "disponivel": true
    },

      "numero": 40,
      "disponivel": true
    },
    {
      "numero": 41,
      "disponivel": true
    },
    {
      "numero": 42,
      "disponivel": true
    },
    {
      "numero": 43,
      "disponivel": true
    },
    {
      "numero": 44,
      "disponivel": true
    },
    {
      "numero": 45,
      "disponivel": true
    },
    {
      "numero": 46,
      "disponivel": true
    },
    {
      "numero": 47,
      "disponivel": true
    },
    {
      "numero": 48,
      "disponivel": true
    },
    {
      "numero": 49,
      "disponivel": true
    },
    {
      "numero": 50,
      "disponivel": true
    },
    {
      "numero": 51,
      "disponivel": true
    },
    {
      "numero": 52,
      "disponivel": true
    },
    {
      "numero": 53,
      "disponivel": true
    },
    {
      "numero": 54,
      "disponivel": true
    },
    {
      "numero": 55,
      "disponivel": true
    },
    {
      "numero": 56,
      "disponivel": true
    },
    {
      "numero": 57,
      "disponivel": true
    },
    {
      "numero": 58,
      "disponivel": true
    },
    {
      "numero": 59,
      "disponivel": true
    },
    {
      "numero": 60,
      "disponive

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
}        descreva esse arquivo
Dito pelo ChatGPT:
Este arquivo define o estilo global do projeto com suporte a modo claro (Light Mode) e modo escuro (Dark Mode), além de incluir configurações específicas para os elementos principais do layout, como grade de assentos, barra da tela, e responsividade.

Descrição do Arquivo
Temas (Light Mode e Dark Mode)
Light Mode (padrão):

Fundo claro (#fbfbfb) e texto escuro (#050f1f).
Define as cores dos assentos:
Selecionado: Roxo (rgb(98, 0, 128)).
Indisponível: Vermelho.
Disponível: Cinza claro (gainsboro).
Dark Mode:

Fundo escuro (#0c081e) e texto claro (#fbfbfb).
Define as cores ajustadas para melhor visibilidade:
Selecionado: Roxo escuro.
Indisponível: Vermelho escuro.
Disponível: Cinza escuro.
A preferência pelo Dark Mode é aplicada automaticamente via @media (prefers-color-scheme: dark).

Estilos Globais
Aplica cores de fundo e texto com transições suaves.
Usa display: flex para centralizar conteúdo na tela.
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: var(--background-color);
  color: var(--text-color);
}
Estrutura da Página
1. containerPai
Agrupa o conteúdo principal.
Configurado para layout em coluna e centralização.
Limita a largura a 400px.
2. containerFilho
Define uma área com elementos em linha (ex.: informações do filme e assentos).
Largura total ajustada para visualização horizontal.
3. grade
Organiza os assentos em uma grade de 8 colunas.
Espaçamento de 8px entre assentos.
Centralizada com largura máxima de 275px.
4. .tela
Representa a barra que simula a tela de cinema.
Largura: 300px com bordas arredondadas.
Centralizada com margens para ajustar a posição relativa à grade.
Responsividade
Configuração para Telas Pequenas (max-width: 425px)
Ajusta o layout para dispositivos móveis:
containerPai e containerFilho:
Organizados em coluna.
Redução de espaçamento e largura total da tela.
.tela:
Largura reduzida para 250px.
Margens ajustadas para centralizar visualmente.
Objetivo do Arquivo
Garante um design consistente em diferentes temas (claro e escuro).
Proporciona um layout responsivo, adaptado a telas menores.
Organiza os elementos principais como:
Assentos (grade): exibidos em grid flexível.
Barra da Tela (.tela): com aparência moderna.
Estrutura Pai/Filho: bem separada e escalável.
Caso precise de ajustes, como incluir novos estilos ou melhorar a responsividade, posso ajudar a expandir!






Dito por si:
import styles from "./Cabecalho.module.css";

const Cabecalho = ({ titulo, horario }) => (
  <header className={styles.cabecalho}>
    <h1>{titulo}</h1>
    <p>
      <strong>Horário:</strong> {horario}
    </p>
  </header>
);

export default Cabecalho;  descreva esse arquivo
Dito pelo ChatGPT:
Este arquivo implementa um componente React chamado Cabecalho, que exibe o título do filme e seu horário. Ele é estilizado com o módulo CSS Cabecalho.module.css.

Descrição do Arquivo
Estrutura do Componente
Props:

titulo: String que representa o nome do filme.
horario: String que indica o horário da sessão do filme.
Retorno JSX:

O componente retorna um elemento <header> contendo:
Um título (<h1>) com o nome do filme.
Um parágrafo (<p>) que exibe o horário do filme com o rótulo "Horário:" destacado em negrito usando a tag <strong>.
Código Explicado
const Cabecalho = ({ titulo, horario }) => (
  <header className={styles.cabecalho}>
    <h1>{titulo}</h1>
    <p>
      <strong>Horário:</strong> {horario}
    </p>
  </header>
);
Uso do styles.cabecalho:

Aplica as classes de estilo definidas no arquivo CSS Module Cabecalho.module.css ao elemento <header>.
Estrutura semântica:

Usa o elemento <header> para marcar semanticamente o cabeçalho da página ou seção.
O uso de <h1> indica o título principal.
A tag <p> com <strong> destaca o texto "Horário".
Objetivo do Componente
Prover um cabeçalho descritivo que mostre:
O nome do filme.
O horário da sessão, de forma destacada e informativa.
Facilitar a reutilização em outras páginas ou partes do projeto.
Possíveis Extensões
Melhorar acessibilidade:

Adicionar atributos como aria-label para indicar propósito.
Flexibilidade de estilos:

Tornar os estilos mais dinâmicos usando props para aplicar diferentes classes com base no contexto.
Personalização adicional:

Permitir exibir informações extras como sala de cinema, data ou classificação indicativa.
Se precisar ajustar algo ou adicionar mais funcionalidades ao componente, estou à disposição!






Dito por si:
import styles from "./InformacoesFilme.module.css";

const InformacoesFilme = ({ sinopse, dataLancamento, direcao }) => (
  <section className={styles.informacoes}>
    <p>
      <strong>sinopse do filme</strong>
    </p>
    {sinopse}
    <p>
      <strong>Data de lançamento</strong>
    </p>{" "}
    {dataLancamento}
    <p>
      <strong>Direção</strong>
    </p>
    {direcao}
  </section>
);
export default InformacoesFilme;  descreva esse arquivo
Dito pelo ChatGPT:
Este arquivo define o componente React InformacoesFilme, que exibe informações detalhadas sobre o filme, como a sinopse, a data de lançamento e o nome do diretor. Ele é estilizado usando um módulo CSS chamado InformacoesFilme.module.css.

Descrição do Arquivo
Estrutura do Componente
Props:

sinopse: String que contém a descrição do enredo do filme.
dataLancamento: String com a data de lançamento do filme.
direcao: String com o nome do diretor ou diretores do filme.
Retorno JSX:

Um elemento <section> que agrupa e apresenta as informações:
Sinopse: Exibida como texto descritivo após o título "sinopse do filme" em negrito.
Data de Lançamento: Mostrada após o título "Data de lançamento" em negrito.
Direção: Listada após o título "Direção" em negrito.
Código Explicado
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
Uso do styles.informacoes:

Aplica as classes de estilo definidas no arquivo InformacoesFilme.module.css à seção principal para personalizar sua aparência.
Exibição de dados dinâmicos:

Os valores passados para as props (sinopse, dataLancamento, e direcao) são exibidos diretamente no conteúdo após seus respectivos títulos.
Uso de estrutura semântica:

<section>: Define semanticamente uma seção de informações relacionadas ao filme.
<p>: Usado para cada título descritivo, como "sinopse do filme" ou "Data de lançamento".
<strong>: Destaca os títulos com fonte em negrito para facilitar a leitura.
Objetivo do Componente
O componente organiza e exibe de forma estruturada as principais informações sobre o filme, permitindo reutilização consistente em diferentes partes da aplicação.

Exemplo de Uso
<InformacoesFilme
  sinopse="Um filme emocionante sobre superação."
  dataLancamento="25 de dezembro de 2024"
  direcao="Diretor Exemplar"
/>
Resultado esperado:

<section class="informacoes">
  <p><strong>sinopse do filme</strong></p>
  Um filme emocionante sobre superação.
  <p><strong>Data de lançamento</strong></p>
  25 de dezembro de 2024
  <p><strong>Direção</strong></p>
  Diretor Exemplar
</section>
Possíveis Extensões
Adicionar mais informações:

Exibir gêneros, elenco principal ou duração do filme.
Melhorar acessibilidade:

Utilizar atributos como aria-label para facilitar a navegação por leitores de tela.
Estilização condicional:

Alterar cores ou layouts com base em props, como destacar filmes com lançamentos futuros.
Se precisar de ajustes ou explicações adicionais, é só dizer!






Dito por si:
import styles from "./Legenda.module.css";

const Legenda = () => {
  return (
    <div className={styles.legenda}>
      <div className={styles.item}>
        <div className={${styles.bolinha} ${styles.disponivel}}></div>
        <span>livre</span>
      </div>
      <div className={styles.item}>
        <div className={${styles.bolinha} ${styles.selecionado}}></div>
        <span>selecionado</span>
      </div>
      <div className={styles.item}>
        <div className={${styles.bolinha} ${styles.indisponivel}}></div>
        <span>indisponível</span>
      </div>
    </div>
  );
};

export default Legenda;   descreva esse arquivo
Dito pelo ChatGPT:
Este arquivo implementa o componente React Legenda, que exibe uma legenda visual para indicar o significado dos diferentes estados dos assentos em um cinema. O componente usa estilos definidos no arquivo de módulo CSS chamado Legenda.module.css.

Descrição do Arquivo
Estrutura do Componente
O componente retorna um elemento <div> com a classe CSS styles.legenda, que contém itens representando os estados dos assentos:

Livre: Representado por uma bolinha estilizada com a classe styles.disponivel.
Selecionado: Representado por uma bolinha estilizada com a classe styles.selecionado.
Indisponível: Representado por uma bolinha estilizada com a classe styles.indisponivel.
Cada estado é descrito visualmente (com uma bolinha colorida) e textualmente (com uma legenda associada).

Código Explicado
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
Estrutura principal:

A legenda é um <div> com classe styles.legenda que organiza os itens em uma estrutura flexível.
Itens individuais:

Cada item é um <div> com classe styles.item, composto por:
Uma bolinha estilizada, gerada por um elemento <div> com classes CSS dinâmicas para cada estado (styles.disponivel, styles.selecionado, ou styles.indisponivel).
Um <span> que exibe o texto descritivo do estado.
Estilização dinâmica:

A classe base styles.bolinha é combinada com classes específicas (styles.disponivel, styles.selecionado, ou styles.indisponivel) para aplicar cores diferentes às bolinhas, dependendo do estado do assento.
Objetivo do Componente
Este componente fornece um guia visual e textual para que os usuários entendam os estados dos assentos na interface do cinema. Ele ajuda a identificar rapidamente:

Quais assentos estão livres.
Quais foram selecionados.
Quais estão indisponíveis.
Exemplo de Uso
<Legenda />
Resultado esperado:

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
Possíveis Extensões
Adaptação Responsiva:

Adicionar media queries ao arquivo CSS para ajustar o layout da legenda em dispositivos móveis.
Personalização de Cores:

Permitir que as cores sejam configuradas dinamicamente via props, em vez de fixadas no arquivo CSS.
Acessibilidade:

Adicionar atributos como aria-label para facilitar a compreensão por leitores de tela.
Animações:

Incluir efeitos como hover ou transições suaves ao selecionar ou desmarcar itens da legenda.
Se precisar de mais explicações ou melhorias, é só avisar!






Dito por si:
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
}   descreva esse arquivo
Dito pelo ChatGPT:
Este arquivo define o componente Home, que serve como a página principal do projeto de um sistema de reserva de assentos de cinema. Ele integra vários componentes menores para criar a interface completa, como o cabeçalho, a grade de assentos, as informações do filme, a legenda, e o botão para finalizar a compra. A funcionalidade adicional inclui suporte a temas claro/escuro baseado na preferência do sistema operacional.

**Estrutura do arquivo***
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

## **6. Dados do Filme (cinema.json)**
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



##**RESULTADO**

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

  




### :family: Integrantes do Projeto


