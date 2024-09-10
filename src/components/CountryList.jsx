import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../context/CitiesContext";
import { useCountries } from "../context/CountryContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  const { countries } = useCountries();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first country by clicking on a city on a map" />
    );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={countries.indexOf(country)} />
      ))}
    </ul>
  );
}

export default CountryList;
