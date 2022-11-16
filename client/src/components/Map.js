import { useCallback, useRef, useEffect, useState } from "react"
import { CloseButton } from "@chakra-ui/react"
import { GoogleMap, useLoadScript } from "@react-google-maps/api"
import { Marker, InfoBox } from "@react-google-maps/api"
import fontawesome from "fontawesome-markers"
import MapStyles from "./MapStyles"

const options = {
    styles: MapStyles,
    disableDefaultUI: true,
    zoomControl: true,
}

const Map = (props) => {
    const { page, searchResults, center, setCenter } = props
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })
    const [zoom, setZoom] = useState(10)
    const [showInfoWindow, setShowInfoWindow] = useState({
        show: false,
        id: null,
    })

    // console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

    const mapContainerStyle = {
        height: "250px",
        width: page === "Explore" ? "75vw" : "100vw",
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

    console.log(searchResults)
    if (loadError) return "Error"
    if (!isLoaded) return "Loading..."
    return (
        <GoogleMap
            className="mt-5"
            id="map"
            mapContainerStyle={mapContainerStyle}
            zoom={zoom}
            center={center}
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
