const router = require('express').Router();

const {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  toggleFavorites,
  getFavorites,
  deleteFavoriteController,
} = require('../controllers/restaurantControllers');

//products
router.route('/').get(getRestaurants).post(createRestaurant);
router.put('/:id', updateRestaurant);

//add
router.route('/favorites').post(toggleFavorites);
//get
router.post('/favorites/all', getFavorites);
router.delete('/favorites/:id', deleteFavoriteController);


module.exports = router;
