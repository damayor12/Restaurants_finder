const express = require('express');
const connectDB = require('./config/config');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');



require('dotenv').config();

connectDB();
const app = express();

app.use(morgan('tiny'));

app.use(express.json());
app.use(cors());

app.use('/api/users', require('./routes/userRoutes'));

// app.use
app.get('/test', (req, res) => {
  res.send('API is Running');
});



const PORT = process.env.PORT || 5300;

app.listen(PORT, console.log(`Server started on ${PORT}`.green.inverse));
