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
