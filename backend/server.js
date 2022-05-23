const express = require('express');
const connectDB = require('./config/config');
const cors = require('cors');
const path = require('path')
const morgan = require('morgan');
const colors = require('colors');



require('dotenv').config({ path: __dirname + '/../.env.development' });

connectDB();
const app = express();

app.use(morgan('tiny'));

app.use(express.json());
app.use(cors());



app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/restaurants', require('./routes/restaurantRoutes'));

// app.use
app.get('/test', (req, res) => {
  res.send('API is Running');
});



const PORT = process.env.PORT || 5300;

app.listen(PORT, console.log(`Server started on ${PORT}`.green.inverse));
