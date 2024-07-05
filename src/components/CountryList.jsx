/* eslint-disable react/prop-types */
import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';
import { useCities } from '../context/CitiesContext'

function CountryList() {

    const { cities, isLoading } = useCities();
    
    if (isLoading) return <Spinner />;

    if (!cities.length)
        return (
            <Message message='Add your first country by clicking on a city on a map' />
        );

    const countrySet = new Set();
    const countries = cities.reduce((array, city) => {
        if (!countrySet.has(city.country)) {
            countrySet.add(city.country);
            return [...array, { country: city.country, emoji: city.emoji }];
        } else {
            return array;
        }
    }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map(country => (
                <CountryItem
                    country={country}
                    key={countries.indexOf(country)}
                />
            ))}
        </ul>
    );
}

export default CountryList;
