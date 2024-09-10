import { useParams } from "react-router-dom";
import styles from "./Country.module.css";
import BackBtn from "./BackBtn";
import { useCountries } from "../context/CountryContext";
import Spinner from "./Spinner.jsx";
import { useEffect } from "react";
import Error from "./Error.jsx";

function Country() {
  const { country } = useParams();
  const { selectedCountry, setSelectedCountryWithInfo, isLoading, error } =
    useCountries();

  useEffect(() => {
    setSelectedCountryWithInfo(country);
  }, [country]);

  if (isLoading) return <Spinner />;
  if (error) return <Error error={error} />;
  if (!selectedCountry || selectedCountry.length === 0) return;

  return (
    <div className={styles.country}>
      <div className={styles.row}>
        <h6>Country name</h6>
        <h3>{selectedCountry[0]?.name?.official || ""}</h3>
        <h6>Capital city</h6>
        <h3>{selectedCountry[0]?.capital[0]}</h3>
        <h6>Population</h6>
        <h3>
          {new Intl.NumberFormat().format(selectedCountry[0]?.population)}
        </h3>
        <h6>Currencies used</h6>
        <h3>
          {selectedCountry[0]?.currencies
            ? Object.keys(selectedCountry[0].currencies).map((key) => key)
            : "No currencies available"}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${selectedCountry[0].name.official.replaceAll(" ", "_")}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackBtn />
      </div>
    </div>
  );
}

export default Country;
