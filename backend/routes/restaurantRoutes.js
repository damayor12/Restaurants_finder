const router = require('express').Router();

const {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  addFavoriteController,
  getFavoritesController
} = require('../controllers/restaurantControllers');


//products
router.route('/').get(getRestaurants).post(createRestaurant)
router.put('/:id', updateRestaurant)

router.route('/favorites').post(addFavoriteController).get(getFavoritesController)


module.exports = router;
