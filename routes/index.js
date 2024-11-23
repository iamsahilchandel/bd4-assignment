const express = require('express');
const {
  getAllRestaurants,
  getRestaurantsById,
  getRestaurantsByCuisine,
  getRestaurantsByFilter,
  getRestaurantsSortedByRating,
} = require('../controllers/restaurants');
const {
  getAllDishes,
  getDishesById,
  getDishesByFiler,
  getDishesSortedByPrice,
} = require('../controllers/dishes');

const router = express.Router();

/**
 * Declare all routes here
 */

router.get('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'app is up and running' });
});

router.get('/restaurants', getAllRestaurants);
router.get('/restaurants/details/:id', getRestaurantsById);
router.get('/restaurants/cuisine/:cuisine', getRestaurantsByCuisine);
router.get('/restaurants/filter', getRestaurantsByFilter);
router.get('/restaurants/sort-by-rating', getRestaurantsSortedByRating);

router.get('/dishes', getAllDishes);
router.get('/dishes/details/:id', getDishesById);
router.get('/dishes/filter', getDishesByFiler);
router.get('/dishes/sort-by-price', getDishesSortedByPrice);

module.exports = router;
