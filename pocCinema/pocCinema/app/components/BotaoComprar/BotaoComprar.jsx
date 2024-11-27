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
