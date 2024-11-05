import Navbar from "../component/Navbar";
import HomePageDetails from "../component/HomePageDetails";

import styles from "../pages/HomePage.module.css";

function HomePage() {
  return (
    <section className={styles.homePage}>
      <Navbar />
      <HomePageDetails />
    </section>
  );
}

export default HomePage;
