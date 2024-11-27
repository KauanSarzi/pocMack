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
export default InformacoesFilme;
