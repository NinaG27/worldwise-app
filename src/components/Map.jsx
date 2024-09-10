import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
  GeoJSON,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
import countriesGeoJSON from "../../data/countries.json";
import { useCountries } from "../context/CountryContext.jsx";

function Map() {
  const { cities } = useCities();
  const { countryData, selectedCountry } = useCountries();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [selectedCountryMap, setSelectedCountryMap] = useState(null);
  const { pathname } = useLocation();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng],
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition],
  );

  useEffect(() => {
    if (selectedCountry && selectedCountry.length > 0) {
      console.log(selectedCountry, "selectedCountry");
      const selectedCountryName = selectedCountry[0]?.cca2;
      if (
        selectedCountryName &&
        pathname === `/app/countries/${selectedCountryName}`
      ) {
        const cca2 = selectedCountry[0]?.cca2;
        setSelectedCountryMap(
          countriesGeoJSON.features.filter(
            (feature) => feature.properties.ISO_A2 === cca2,
          ),
          setMapPosition([
            selectedCountry[0]?.latlng[0],
            selectedCountry[0]?.latlng[1],
          ]),
        );
      }
    }
    return () => {
      setSelectedCountryMap(null);
    };
  }, [pathname, selectedCountry, countryData]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <GeoJSON key={selectedCountryMap} data={selectedCountryMap} />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <DetectClick />
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
