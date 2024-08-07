import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();

  function handleDelete(e){
    e.preventDefault();
    deleteCity(city.id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${(city.id === currentCity.id) ? styles["cityItem--active"] : ""}`}
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
      >
        <span className={styles.emoji}>{city.emoji}</span>
        <span className={styles.name}>{city.cityName}</span>
        <span className={styles.date}>{formatDate(city.date)}</span>
        <button className={styles.deleteBtn} onClick={handleDelete}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
