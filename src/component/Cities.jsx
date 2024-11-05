import styles from "../component/Cities.module.css";
import { useCitiesContext } from "../contexts/CitiesContext";
import CityItem from "./CityItem";
import Message from "./Message";
import Spinner from "./Spinner";

function Cities() {
  const { cities, isLoading, error } = useCitiesContext();
  console.log(cities);

  if (isLoading) return <Spinner />;

  if (cities.length < 1)
    return (
      <Message message="👏 Add your first city by clicking on a city on the map" />
    );

  if (error) return <Message message={error} />;

  return (
    <ul className={styles.cities}>
      {cities.map((city, index) => (
        <CityItem city={city} key={index} />
      ))}
    </ul>
  );
}

export default Cities;
