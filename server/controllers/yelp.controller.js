const axios = require("axios")
const dotenv = require("dotenv").config()

module.exports = {
    getNearbyRestaurants: async (req, res) => {
        console.log(req.body)
        const yelpBaseURL = "https://api.yelp.com/v3/businesses"
        const location = req.body.location
        const config = {
            headers: {
                Authorization: "Bearer " + process.env.YELP_API_KEY,
            },
            params: {
                term: "restaurants",
                sort_by: "review_count",
            },
        }

        const CallYelp = async (
            config,
            location,
            // latitude,
            // longitude,
            radius,
            limit
        ) => {
            // requestConfig.params.latitude = latitude
            // requestConfig.params.longitude = longitude
            config.params.location = location
            config.params.radius = radius
            config.params.limit = limit

            const nearbyBusinesses = await axios
                .get(yelpBaseURL + "/search", config)
                .then((response) => {
                    res.status(200).json(response.data.businesses)
                })
                .catch((err) => console.log(err))
            return nearbyBusinesses
        }

        await CallYelp(config, location, 8046, 20)
        // console.log(getNearbyRestaurants(config, 35.933500, -78.837290, 8046, 1))
        // console.log(getNearbyRestaurants(config, "Portland", 8046, 1))
    },
}
