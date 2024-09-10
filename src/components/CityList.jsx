import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../context/CitiesContext";
import Error from "./Error.jsx";

function CityList() {
  const { cities, isLoading, error } = useCities();

  if (isLoading) return <Spinner />;
  if (error) return <Error error={error} />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on a map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
