import axios from "axios"
import { useCallback, useRef, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { CloseButton } from "@chakra-ui/react"
import { GoogleMap, useLoadScript } from "@react-google-maps/api"
import Geocode from "react-geocode"
import { Marker, InfoBox } from "@react-google-maps/api"
import fontawesome from "fontawesome-markers"
import MapStyles from "./MapStyles"

const options = {
    styles: MapStyles,
    disableDefaultUI: true,
    zoomControl: true,
}

const Map = (props) => {
    const [location, setLocation] = useState({})
    const [geocode, setGeocode] = useState({})
    const { searchResults, setSearchResults, center, setCenter } = props
    const { pathname } = useLocation()
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })

    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)

    const [zoom, setZoom] = useState(10)
    const [showInfoWindow, setShowInfoWindow] = useState({
        show: false,
        id: null,
    })
    const mapContainerStyle = {
        height: "380px",
        width: pathname === "/explore" ? "75vw" : "100vw",
    }

    const mapRef = useRef()
    const onMapLoad = useCallback((map) => {
        mapRef.current = map
    }, [])

    useEffect(() => {
        const zoomControl = () => {
            const timer = setTimeout(() => {
                setZoom(12)
            }, 800)
            return () => clearTimeout(timer)
        }
        searchResults && zoomControl()
    }, [searchResults])

    const handleClick = (marker) => {
        setCenter({
            lat: marker.coordinates.latitude,
            lng: marker.coordinates.longitude,
        })
        setZoom(15)
        setShowInfoWindow({
            show: true,
            id: marker.id,
        })
    }

    const handleClose = () => {
        setShowInfoWindow({ show: false, id: null })
    }

    useEffect(() => {
        const getLocation = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                Geocode.fromLatLng(
                    position && position.coords.latitude,
                    position.coords.longitude
                )
                    .then((response) => {
                        getLocalBusinesses(
                            response.results[0].formatted_address
                        )
                    })
                    .catch((error) => console.log(error))
            })
        }

        const getLocalBusinesses = (location) => {
            axios
                .post("http://localhost:8000/api/yelp", {
                    location: location,
                })
                .then((res) => {
                    console.log(res)
                    setSearchResults(res.data)
                })
                .catch((err) => console.log(err))
        }
        if (pathname.includes("/explore") && searchResults.length === 0) {
            getLocation()
        }
    }, [pathname, setSearchResults, searchResults])

    if (loadError) return "Error"
    if (!isLoaded) return "Loading..."
    return (
        <GoogleMap
            className="mt-5"
            id="map"
            mapContainerStyle={mapContainerStyle}
            zoom={zoom}
            center={!center ? { lat: 51.509865, lng: -0.118092 } : center}
            options={options}
            onLoad={onMapLoad}
            zIndex="0"
        >
            {searchResults &&
                searchResults.map((marker, i) => (
                    <div key={marker.id}>
                        <>
                            <Marker
                                key={marker.id}
                                position={{
                                    lat: marker.coordinates.latitude,
                                    lng: marker.coordinates.longitude,
                                }}
                                name={marker.name}
                                icon={{
                                    path: fontawesome.STAR,
                                    scale: 0.35,
                                    strokeWeight: 0.5,
                                    strokeColor: "grey",
                                    strokeOpacity: 1,
                                    //Change fill color based on rating
                                    fillColor:
                                        marker.rating >= 4.5
                                            ? "green"
                                            : "yellow",
                                    fillOpacity: 1,
                                }}
                                onClick={() => handleClick(marker)}
                            />
                            <InfoBox
                                key={marker.id + i}
                                position={{
                                    lat: marker.coordinates.latitude,
                                    lng: marker.coordinates.longitude,
                                }}
                                visible={
                                    showInfoWindow.id === marker.id &&
                                    showInfoWindow.show
                                }
                            >
                                <div className="infoBox-inner">
                                    <CloseButton
                                        onClick={() => handleClose()}
                                    />
                                    <h3>{marker.name}</h3>
                                </div>
                            </InfoBox>
                        </>
                    </div>
                ))}
        </GoogleMap>
    )
}

export default Map
