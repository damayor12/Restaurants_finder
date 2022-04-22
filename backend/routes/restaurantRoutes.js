const router = require('express').Router();

const {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
} = require('../controllers/restaurantControllers');


//products
router.route('/').get(getRestaurants).post(createRestaurant)
router.put('/:id', updateRestaurant)


module.exports = router;
