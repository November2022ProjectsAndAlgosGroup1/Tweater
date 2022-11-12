// const Restaurant = require('../models/all.model')

// module.exports = {
//     addRestaurant: async (req, res) => {
//         Restaurant.create(req.body)
//             .then(newRestaurant = res.json(newRestaurant))
//             .catch((error) => res.status(400).json(error))
//     },
//     findRestaurant: async (req, res) => {
//         Restaurant.findOne({ _id: req.params.id })
//             .populate('tweat')
//             .then(oneRestaurant => res.json(oneRestaurant))
//             .catch((error) => res.status(400).json(error))
//     },
//     findAllRestaurants: async (req, res) => {
//         Restaurant.find()
//             .populate('tweat')
//             .then(allRestaurants => {
//                 console.log(allRestaurants)
//                 res.json(allRestaurants)
//             })
//             .catch((error) => {
//                 console.log('failed to find all Restaurants')
//                 res.status(400).json(error)
//             })
//     },
//     updateRestaurant: async (req, res) => {
//         Restaurant.findOneAndUpdate(
//             { _id: req.params.id },
//             req.body,
//             { new: true, runValidators: true }
//         )
//             .then(updatedRestaurant => res.json(updatedRestaurant))
//             .catch((error) => res.status(400).json(error))
//     },
//     deleteRestaurant: async (req, res) => {
//         Restaurant.deleteOne({ _id: req.params.id })
//             .then(result => res.json(result))
//             .catch((error) => res.status(400).json(error))
//     },
// }