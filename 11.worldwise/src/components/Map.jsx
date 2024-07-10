import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './Map.module.css';


function Map() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    return (
        <div className={styles.mapContainer} onClick={() => navigate('form')}>
            <h1>Map</h1>
            <h2>lat: {lat} , lng: {lng}</h2>
            <button onClick={()=> setSearchParams({lat:20, lng:15})}>Change position</button>
        </div>
    )
}

export default Map

