const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const db = require('./app/models/index.js');
const cors = require('cors');

dotenv.config();

db.sequelize.authenticate()
    .then(() => console.log('Connection to database has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error));

// Define the Express app
const app = express();

// Middlewares section
app.use(cors()); // This line is using cors middleware which allows your server to accept requests from different origins.
app.use(express.json()); // This line is using express.json middleware which allows your server to parse JSON data from client requests in the body of the request.
app.use(express.urlencoded({ extended: false })); // It parses incoming requests with URL-encoded payloads and is based on body-parser. This means it can parse incoming request bodies, providing you access to `req.body` that you can use in your routes.
app.use(morgan('dev')); // This line is using morgan middleware which logs requests to the console.

module.exports = app;