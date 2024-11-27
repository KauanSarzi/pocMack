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
