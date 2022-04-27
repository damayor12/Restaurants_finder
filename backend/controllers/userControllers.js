const asyncHandler = require('express-async-handler');
const User = require('../models/UsersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST api/users/
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res.status(400);
      throw new Error('Invalid inputs');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(401);
      throw new Error('User already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const Hashpassword = await bcrypt.hash(password, salt);
    const user = await User.create({ email, password: Hashpassword, name });
  
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    }
  } catch (error) {
   
    res.status(500).send({ message: error.message || 'Error registering user' });
  }
}

// POST api/users/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      bcrypt.compare(password, userExists.password);
      
      const { _id } = userExists;
      res.json({
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        isAdmin: userExists.isAdmin,
        token: jwt.sign({ _id }, process.env.SECRET, { expiresIn: '10d' }),
      });
    } else {
      res.status(400);
      throw new Error('User does not exist');
      
    }
  } catch (error) {
   
    res.status(500).send({ error: error.message });
  }
};

module.exports = { login, register };
