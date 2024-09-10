import { Link } from "react-router-dom";
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  const { cca3, emoji, country: countryName } = country;

  return (
    <Link className={styles.countryItem} to={`/app/countries/${cca3}`}>
      <li>
        <span>{emoji}</span>
        <h3>{countryName}</h3>
      </li>
    </Link>
  );
}

export default CountryItem;
