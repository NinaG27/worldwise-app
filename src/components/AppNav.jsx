import { NavLink, useLocation } from "react-router-dom";
import styles from "./AppNav.module.css";
import { useCities } from "../context/CitiesContext.jsx";
import { useEffect } from "react";

function AppNav() {
  const { resetCurrentCity } = useCities();
  const location = useLocation();

  useEffect(() => {
    const wasOnCountriesRoute = location.pathname.includes("/countries");

    return () => {
      if (wasOnCountriesRoute) resetCurrentCity();
    };
  }, [location]);

  return (
    <nav className={styles.nav}>
      <ul>
        <NavLink to="cities">Cities</NavLink>
        <NavLink to="countries">Countries</NavLink>
      </ul>
    </nav>
  );
}

export default AppNav;
