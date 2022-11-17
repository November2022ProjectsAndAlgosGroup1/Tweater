const MapStyles = [
    {
        featureType: "all",
        elementType: "labels",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#444444",
            },
        ],
    },
    {
        featureType: "landscape",
        elementType: "all",
        stylers: [
            {
                visibility: "on",
            },
            {
                color: "#e0dfe0",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            {
                color: "#a8a9a8",
            },
            {
                visibility: "on",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "all",
        stylers: [
            {
                saturation: -100,
            },
            {
                lightness: 45,
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
            {
                visibility: "on",
            },
            {
                color: "#5b5b5a",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "all",
        stylers: [
            {
                visibility: "simplified",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "all",
        stylers: [
            {
                color: "#ffffff",
            },
            {
                visibility: "on",
            },
        ],
    },
]

export default MapStyles
