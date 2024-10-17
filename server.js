const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoute');
const messageRoutes = require('./routes/messageRoute');
const sessionRoutes = require('./routes/sessionRoute');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT || 3002;

const app = express();
app.use(cors({
  origin: process.env.URL, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// CONNECT TO DB => START SERVER IF CONNECTION SUCCESFULL
mongoose.connect(process.env.URI)
  .then(res => {
    console.log(`DB Connected`);
    app.listen(port, () => {
      console.log(`Server live on ${port}`);
    });
  })
  .catch(err => console.log(`Db connection failed : ${err}`));

app.use(authRoutes);
app.use(messageRoutes);
app.use(sessionRoutes);
