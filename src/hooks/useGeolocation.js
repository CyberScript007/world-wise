import { useState } from "react";

function useGeolocation() {
  const [geoPosition, setGeoPosition] = useState(null);
  const [isLoadingGeo, setIsLoadingGeo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function getLocation() {
    console.log(errorMessage);
    //   check if the geolocation is available in the browser
    if ("geolocation" in navigator) {
      setIsLoadingGeo(true);
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setGeoPosition({
            geoLat: position.coords.latitude,
            geoLng: position.coords.longitude,
          });
          setIsLoadingGeo(false);
        },
        function (error) {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setIsLoadingGeo(false);
              return setErrorMessage(
                "User denied the request for geolocation."
              );

            case error.POSITION_UNAVAILABLE:
              setIsLoadingGeo(false);
              return setErrorMessage("Location information is unavailable.");
            case error.TIMEOUT:
              setIsLoadingGeo(false);
              return setErrorMessage(
                "The request to get user location timed out"
              );
            case error.UNKNOWN_ERROR:
              setIsLoadingGeo(false);
              return setErrorMessage("An unknown error occurred.");
          }
        }
      );
    } else {
      setIsLoadingGeo(false);
      setErrorMessage("Geolocation is not available in this browser.");
    }
  }
  return { geoPosition, errorMessage, getLocation, isLoadingGeo };
}

export default useGeolocation;
