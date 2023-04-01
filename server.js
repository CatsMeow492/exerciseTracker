// Import required modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// import env variables
require('dotenv').config();
const mongoUri = process.env.MONGODB_URI;
const User = require('./models/user.model');
const Exercise = require('./models/exercise.model');

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
    res.sendFile(__dirname + '/views/index.html')
  });
// Add a new user
app.post('/api/users', (req, res) => {
    const username = req.body.username;

    try {
        const newUser = new User({ username });
        newUser.save();
        res.json({ username: newUser.username, _id: newUser._id });
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
});

app.post('/api/users/:userId/exercises', async (req, res) => {
    const userId = req.params.userId;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = req.body.date ? new Date(req.body.date) : new Date();
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(400).json('Error: User not found');
      }
  
      const newExercise = new Exercise({
        username: user.username,
        description,
        duration,
        date,
      });
  
      await newExercise.save();
  
      res.json({
        _id: user._id,
        username: user.username,
        date: newExercise.date.toDateString(),
        duration: newExercise.duration,
        description: newExercise.description,
      });
    } catch (error) {
      res.status(400).json('Error: ' + error);
    }
  });

  // Get a users exercise log
app.get('/api/users/:userId/logs', async (req, res) => {
    const userId = req.params.userId;
    const fromDate = req.query.from ? new Date(req.query.from) : new Date(0);
    const toDate = req.query.to ? new Date(req.query.to) : new Date();
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    try {
        const user = await User.findById(userId);
        // If user not found, return error
        if (!user) {
            return res.status(400).json('Error: User not found');
        }

        const log = await Exercise.find({
            username: user.username,
            date: { $gte: fromDate, $lte: toDate },
        }).limit(limit);

        const response = {
            _id: user._id,
            username: user.username,
            count: log.length,
            log: log.map((exercise) => ({
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date.toDateString(),
            })),
        };
        res.json(response);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Start the server
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
  })
