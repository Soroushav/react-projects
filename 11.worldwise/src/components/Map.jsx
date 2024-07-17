import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import Button from "../components/Button";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
function Map() {
  const [mapPosition, setMapPositon] = useState([40, 0]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingGeolocation,
    position: geoLocationPosition,
    getPosition: getGeolocationPosition,
  } = useGeolocation();
  //   useEffect(function change(){
  //     if(Object.keys(currentCity).length === 0) return
  //     setMapPositon([currentCity.position.lat, currentCity.position.lng]);
  //   }, [currentCity])

  //   const navigate = useNavigate();

  const [lat, lng] = useUrlPosition();
  useEffect(
    function () {
      // if((lat === null) && (lng === null))return;
      if (lat && lng){
        setMapPositon([lat, lng]);
      }
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (geoLocationPosition) {
        setMapPositon([geoLocationPosition.lat, geoLocationPosition.lng]);
      }
    },
    [geoLocationPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && <Button type="position" onClick={getGeolocationPosition}>
        {isLoadingGeolocation ? "Loading..." : "Use your Location"}
      </Button>}
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
        {cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]}>
            <Popup>
              {city.emoji} {city.cityName}
            </Popup>
          </Marker>
        ))}
        <ChangeCenter mapPosition={mapPosition} />
        <DetectClick setMapPositon={setMapPositon} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ mapPosition }) {
  const map = useMap();
  map.setView(mapPosition);
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
