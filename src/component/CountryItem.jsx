import styles from "../component/CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.country_item}>
      <span>{country.emoji}</span>
      <h4>{country.country}</h4>
    </li>
  );
}

export default CountryItem;
