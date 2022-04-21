const router = require('express').Router();

const {getRestaurants, createRestaurant } = require('../controllers/restaurantControllers');


//products
router.route('/').get(getRestaurants).post(createRestaurant);


module.exports = router;
