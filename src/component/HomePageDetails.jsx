import { Link } from "react-router-dom";

import styles from "../component/HomePageDetails.module.css";

function HomePageDetails() {
  return (
    <section className={styles.home_page_details}>
      <h1 className={styles.heading1}>
        You travel the world. <br /> WorldWise keeps track of your adventures.
      </h1>
      <h2 className={styles.heading2}>
        A world map that tracks your footsteps into every city you can think of.
        Never forget your wonderful experiences, and show your friends how you
        have wandered the world.
      </h2>
      <Link to="/login">
        <button className={`btn btn--green ${styles.btn_start_tracking}`}>
          start tracking now
        </button>
      </Link>
    </section>
  );
}

export default HomePageDetails;
