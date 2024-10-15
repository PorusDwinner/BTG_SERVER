const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoute');
const messageRoutes = require('./routes/messageRoute');
const sessionRoutes = require('./routes/sessionRoute');
const bodyParser = require('body-parser');

require('dotenv').config();
const port = process.env.PORT || 3002;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended : true }));

// CONNECT TO DB => START SERVER IF CONNECTION SUCCESFULL
mongoose.connect(process.env.URI)
.then(res => {
    app.listen(port);
    console.log(`DB Connected`);
    console.log(`Server live on ${port}`);
})
.catch (err => console.log(`Db connection failed : ${err}`));

app.use(authRoutes);
app.use(messageRoutes);
app.use(sessionRoutes);
