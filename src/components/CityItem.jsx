import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';
import { useCities } from '../context/CitiesContext';

/* eslint-disable react/prop-types */
function CityItem({ city }) {
    const { currentCity, deleteCity, isLoading } = useCities();

    const formatDate = date =>
        new Intl.DateTimeFormat('en', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long',
        }).format(new Date(date));

    const { cityName, emoji, date, id, position } = city;

    function handleDelete(e) {
        e.preventDefault();
        deleteCity(city.id);
    }

    return (
        <li>
            <Link
                className={`${styles.cityItem} ${
                    id === currentCity.id ? styles['cityItem--active'] : ''
                }`}
                to={`${id}?lat=${position.lat}&lng=${position.lng}`}
            >
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.time}>({formatDate(date)})</time>
                <button
                    className={`${styles.deleteBtn} ${
                        isLoading ? styles.loading : ''
                    }`}
                    onClick={handleDelete}
                >
                    &times;
                </button>
            </Link>
        </li>
    );
}

export default CityItem;
