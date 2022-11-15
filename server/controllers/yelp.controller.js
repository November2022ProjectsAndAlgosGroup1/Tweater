const axios = require('axios')
const dotenv = require('dotenv').config()

console.log(process.env)

const yelpBaseURL = "https://api.yelp.com/v3/businesses"

const config = {
    headers: {
        Authorization:
            "Bearer " + process.env.YELP_API_KEY
    },
    params: {
        term: "restaurants",
        sort_by: "review_count",
    }
}

const getNearbyRestaurants = async (
    requestConfig, 
    location,
    // latitude, 
    // longitude, 
    radius, 
    limit) => 
    {
        // requestConfig.params.latitude = latitude
        // requestConfig.params.longitude = longitude
        requestConfig.params.location = location
        requestConfig.params.radius = radius
        requestConfig.params.limit = limit

        const nearbyBusinesses = await axios.get(yelpBaseURL+"/search", requestConfig)
            .then((response) => {console.log(response.data.businesses)})
            .catch((err) => console.log(err))
        return nearbyBusinesses
    }

// console.log(getNearbyRestaurants(config, 35.933500, -78.837290, 8046, 1))
console.log(getNearbyRestaurants(config, "Portland", 8046, 1))