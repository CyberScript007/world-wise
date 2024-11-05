import Spinner from "./Spinner";
import styles from "./SpinnerFullPage.module.css";

function SpinnerFullPage() {
  return (
    <div className={styles.spinner_full_page}>
      <Spinner />
    </div>
  );
}

export default SpinnerFullPage;
