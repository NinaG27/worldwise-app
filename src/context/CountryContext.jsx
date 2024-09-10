import { createContext, useContext, useReducer } from "react";
import { useCities } from "./CitiesContext";
import { useEffect } from "react";

const CountryContext = createContext();

const initialState = {
  countries: [],
  selectedCountry: null,
  isLoading: false,
  error: "",
  countryData: {},
};

const BASE_URL = "https://restcountries.com/v3.1";

function reducer(state, action) {
  switch (action.type) {
    case "loading": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "countries/get":
      const countrySet = new Set();
      const countries = action.payload.reduce((array, city) => {
        if (!countrySet.has(city.country)) {
          countrySet.add(city.country);
          return [
            ...array,
            {
              country: city.country,
              emoji: city.emoji,
              cca3: city.countryCode,
            },
          ];
        } else {
          return array;
        }
      }, []);
      return {
        ...state,
        countries: countries,
      };
    case "countries/getCountryInfo":
      return {
        ...state,
        isLoading: false,
        countryData: action.payload,
      };
    case "country/selected":
      return {
        ...state,
        selectedCountry: action.payload,
        isLoading: false,
        error: "",
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
  }
}

function CountryProvider({ children }) {
  const [
    { countries, selectedCountry, countryData, isLoading, error },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { cities } = useCities();

  useEffect(() => {
    dispatch({ type: "countries/get", payload: cities });
  }, [cities]);

  async function setSelectedCountryWithInfo(country) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}/alpha?codes=${country}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error();
      }
      dispatch({ type: "country/selected", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error fetching country data",
      });
    }
  }

  return (
    <CountryContext.Provider
      value={{
        countries,
        selectedCountry,
        countryData,
        isLoading,
        error,
        setSelectedCountryWithInfo,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

function useCountries() {
  const context = useContext(CountryContext);
  if (context === undefined)
    throw new Error("CountryContext used outside of Country Context provider");

  return context;
}

export { CountryProvider, useCountries };
