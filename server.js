// Import required modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// import env variables
require('dotenv').config();
const mongoUri = process.env.MONGODB_URI;

// Initialize app and set up port
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB database
const uri = mongoUri;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to Exercise Tracker API');
});

// Add more routes here

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
