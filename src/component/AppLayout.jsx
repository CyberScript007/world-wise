import AppLayoutDetails from "./AppLayoutDetails";
import AppLayoutMap from "./AppLayoutMap";

import styles from "../component/AppLayout.module.css";

function AppLayout() {
  return (
    <main className={styles.app_layout}>
      <AppLayoutDetails />
      <AppLayoutMap />
    </main>
  );
}

export default AppLayout;
