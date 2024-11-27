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
