import Map from "../components/Map";
import SideBar from "../components/SideBar";
import User from "../components/User";
import styles from "./AppLayout.module.css";
import { useCountries } from "../context/CountryContext.jsx";

function AppLayout() {
  const { selectedCountry } = useCountries();
  return (
    <div className={styles.app}>
      <User />
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
