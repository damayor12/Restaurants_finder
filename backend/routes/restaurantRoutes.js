const router = require('express').Router();

const {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  toggleFavorites,
  getFavorites,
  createDetailsComment,
  getDetails,
} = require('../controllers/restaurantControllers');

//api/restaurants
router.post('/all', getRestaurants);
router.post('/', createRestaurant);
router.put('/:id', updateRestaurant);
router.post('/:id/comment', createDetailsComment);
router.get('/:id/details', getDetails);

//api/restaurants/favorites
router.route('/favorites').post(toggleFavorites);

router.post('/favorites/all', getFavorites);

module.exports = router;
