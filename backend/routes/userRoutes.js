const router = require('express').Router();
const { login, register } = require('../controllers/userControllers'); 


//users
router.route('/').post(register);
router.post('/login', login);




module.exports = router;
