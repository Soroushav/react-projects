import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
import {useCities} from "../contexts/CitiesContext"
function CountryList() {
  const {cities, isLoading} = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Please add your first Country by clicking on a city on the map!" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr
  }, []);
  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </div>
  );
}

export default CountryList;
