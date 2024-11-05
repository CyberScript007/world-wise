import { Link, NavLink } from "react-router-dom";

import styles from "../component/Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link to="/">
        <img src="img/logo.png" alt="logo" className={styles.nav__logo} />
      </Link>
      <ul className={styles.nav__list}>
        <li>
          <NavLink to="/pricing" className={styles.nav__link}>
            pricing
          </NavLink>
        </li>
        <li>
          <NavLink to="/product" className={styles.nav__link}>
            product
          </NavLink>
        </li>
        <li>
          <Link
            to="/login"
            className={`btn--green ${styles.btn_login} ${styles.nav__link}`}
          >
            login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
