import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useCitiesContext } from "../contexts/CitiesContext";
import { formatDate } from "./formatDate";
import ButtonBack from "./ButtonBack";
import styles from "../component/CityDetails.module.css";
import Spinner from "./Spinner";

function CityDetails() {
  const { currentCity, getCity, isLoading } = useCitiesContext();

  const { id } = useParams();

  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );

  if (isLoading) return <Spinner />;

  if (!currentCity) return;

  const { cityName, country, date, emoji, notes } = currentCity;

  return (
    <article className={styles.cityDetails}>
      <div>
        <h4>city name</h4>
        <p className={styles.cityItem}>
          <span>{emoji}</span> {cityName}
        </p>
      </div>
      <div>
        <h4>you went to {cityName} on</h4>
        <p>{formatDate(date)}</p>
      </div>
      {notes && (
        <div>
          <h4>your notes</h4>
          <p>{notes}</p>
        </div>
      )}
      <div>
        <h4>learn more</h4>
        <a
          href={`https://en.wikipedia.org/wiki/${country}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {country} on Wikipedia →
        </a>
      </div>
      <div>
        <ButtonBack />
      </div>
    </article>
  );
}

export default CityDetails;
