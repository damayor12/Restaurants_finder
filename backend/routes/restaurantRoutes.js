const router = require('express').Router();

const {getRestaurants} = require('../controllers/restaurantControllers');


//products
router.get('/', getRestaurants);

module.exports = router;
