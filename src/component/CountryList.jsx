import CountryItem from "./CountryItem";

import styles from "../component/CountryList.module.css";
import Spinner from "./Spinner";
import { useCitiesContext } from "../contexts/CitiesContext";
import Message from "./Message";

function CountryList() {
  const { cities, isLoading, error } = useCitiesContext();

  if (isLoading) return <Spinner />;

  if (error)
    return (
      <Message
        message={
          "😯 There is no country to display maybe you're accesing wrong API url."
        }
      />
    );

  const countries = cities.reduce((arr, cur) => {
    if (!arr.map((el) => el.country).includes(cur.country)) {
      return [...arr, { country: cur.country, emoji: cur.emoji }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.country_list}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}

export default CountryList;
