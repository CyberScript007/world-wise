import { Link } from "react-router-dom";
import styles from "../component/CityItem.module.css";
import { formatDate } from "../component/formatDate";
import { useCitiesContext } from "../contexts/CitiesContext";
import { convertFlagEmoji } from "../component/convertFlagEmoji";

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCitiesContext();
  const { cityName, date, emoji, id, position } = city;

  return (
    <li className={styles.city_item}>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.city_item_link} ${
          id === currentCity?.id ? styles.city_item_active : ""
        }`}
      >
        <div className={styles.city_item_details}>
          <span>{convertFlagEmoji(emoji)}</span>
          <h4>{cityName}</h4>
        </div>
        <div className={styles.city_item_content}>
          <time>({formatDate(date)})</time>
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteCity(id);
            }}
          >
            &times;
          </button>
        </div>
      </Link>
    </li>
  );
}

export default CityItem;
