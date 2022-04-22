const router = require('express').Router();

const {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  addFavoriteController,
  getFavoritesController,
  deleteFavoriteController
} = require('../controllers/restaurantControllers');

//products
router.route('/').get(getRestaurants).post(createRestaurant);
router.put('/:id', updateRestaurant);

router.route('/favorites').post(addFavoriteController);
router.post('/favorites/all', getFavoritesController);
router.delete('/favorites/:id', deleteFavoriteController);


module.exports = router;
