import { useCallback, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import { Icon } from "@chakra-ui/react";
import { FaMapMarker } from "react-icons/fa";
import MapStyles from "./MapStyles";

const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = (props) => {
  const { page, markers, center } = props;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  const mapContainerStyle = {
    height: "500px",
    width: page === "Explore" ? "75vw" : "100vw",
  };

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const MarkerIcon = () => {
    return <Icon as={FaMapMarker} />;
  };

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  return (
    <GoogleMap
      className="mt-5"
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={center}
      options={options}
      onLoad={onMapLoad}
      zIndex="0"
    >
      {markers &&
        markers.map((marker, i) => (
          <div key={marker.id}>
            <Marker
              key={marker.id}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
              name={marker.name}
              icon={{
                url: MarkerIcon(),
                scaledSize: new window.google.maps.Size(40, 40),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
            />
          </div>
        ))}
    </GoogleMap>
  );
};

export default Map;
