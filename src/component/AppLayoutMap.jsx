import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "../component/AppLayoutMap.module.css";
import { useEffect, useState } from "react";
import { useCitiesContext } from "../contexts/CitiesContext";
import Button from "./Button";
import useGeolocation from "../hooks/useGeolocation";
import useSearchParameter from "../hooks/useSearchParameter";
import User from "./User";
import { useAuthenticateContext } from "../contexts/AuthenticateContext";

function AppLayoutMap() {
  const [mapPosition, setMapPosition] = useState([40.47, -3.71]);
  const { geoPosition, getLocation, isLoadingGeo } = useGeolocation();
  const [lat, lng] = useSearchParameter();
  const { cities } = useCitiesContext();
  const { isAuthenticated } = useAuthenticateContext();

  useEffect(
    function () {
      if (!lat && !lng) return;
      setMapPosition([lat, lng]);
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (!geoPosition) return;
      const { geoLat, geoLng } = geoPosition;

      setMapPosition([geoLat, geoLng]);
    },
    [geoPosition]
  );

  return (
    <section className={styles.app_layout_map}>
      {!geoPosition && (
        <Button onClick={getLocation} type="location">
          {isLoadingGeo ? "Loading..." : "use your location"}
        </Button>
      )}
      <User />
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
        />
        {cities.map((city, index) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={index}
            >
              <Popup>
                <span>{city.emoji}</span> <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <CenterMapViewToPosition position={mapPosition} />
        <AddEventMap />
      </MapContainer>
    </section>
  );
}

function CenterMapViewToPosition({ position }) {
  const map = useMap();
  map.setView(position, map.getZoom());
  return null;
}

function AddEventMap() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}

export default AppLayoutMap;
