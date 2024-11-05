import { Outlet } from "react-router-dom";
import AppLayoutHeader from "./AppLayoutHeader";
import AppLayoutLink from "./AppLayoutLink";
import Footer from "./Footer";

import styles from "../component/AppLayoutDetails.module.css";

function AppLayoutDetails() {
  return (
    <section className={styles.app_layout_details}>
      <section>
        <AppLayoutHeader />
        <AppLayoutLink />
        <Outlet />
      </section>
      <Footer />
    </section>
  );
}

export default AppLayoutDetails;
