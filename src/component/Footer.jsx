import styles from "../component/footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
    </footer>
  );
}

export default Footer;
