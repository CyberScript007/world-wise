import { Link } from "react-router-dom";

import styles from "../component/AppLayoutHeader.module.css";

function AppLayoutHeader() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src="./img/logo.png" alt="Header logo" />
      </Link>
    </header>
  );
}

export default AppLayoutHeader;
