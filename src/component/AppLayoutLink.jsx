import { NavLink } from "react-router-dom";

import styles from "../component/AppLayoutLink.module.css";

function AppLayoutLink() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppLayoutLink;
