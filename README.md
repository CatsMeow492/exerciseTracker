# Exercise Tracker

A RESTful API built with Node.js, Express, and MongoDB as part of the FreeCodeCamp curriculum. This API allows users to create, track, and retrieve exercise logs.

## Features

- Create new users
- Add exercises for a user
- Retrieve a user's exercise log with optional filters (date range and limit)
- Get a list of all users

## API Endpoints

### Create a new user

`POST /api/users`

Request body:
{
"username": "your_username"
}


Response:


### Add an exercise for a user

`POST /api/users/:userId/exercises`

URL parameters:

- `userId`: User ID

Request body:

{
"description": "exercise_description",
"duration": exercise_duration_in_minutes,
"date": "YYYY-MM-DD" (optional)
}

### Create a new user

`POST /api/users`

Request body:

{
"username": "your_username"
}

makefile
Copy code

Response:

{
"username": "your_username",
"_id": "generated_user_id"
}

bash
Copy code

### Add an exercise for a user

`POST /api/users/:userId/exercises`

URL parameters:

- `userId`: User ID

Request body:

{
"description": "exercise_description",
"duration": exercise_duration_in_minutes,
"date": "YYYY-MM-DD" (optional)
}

makefile
Copy code

Response:

{
"_id": "user_id",
"username": "username",
"date": "exercise_date",
"duration": exercise_duration,
"description": "exercise_description"
}


### Get a user's exercise log

`GET /api/users/:userId/logs?from=YYYY-MM-DD&to=YYYY-MM-DD&limit=number`

URL parameters:

- `userId`: User ID
- `from`: Start date for the log (optional)
- `to`: End date for the log (optional)
- `limit`: Maximum number of records to return (optional)

Response:

{
"_id": "user_id",
"username": "username",
"count": number_of_exercises,
"log": [
{
"description": "exercise_description",
"duration": exercise_duration,
"date": "exercise_date"
},
...
]
}


### Get a list of all users

`GET /api/users`

Response:

[
{
"username": "username",
"_id": "user_id"
},
...
]


## Problem Description
Exercise Tracker
Build a full stack JavaScript app that is functionally similar to this: https://exercise-tracker.freecodecamp.rocks. Working on this project will involve you writing your code using one of the following methods:

Clone this GitHub repo and complete your project locally.
Use our Replit starter project to complete your project.
Use a site builder of your choice to complete the project. Be sure to incorporate all the files from our GitHub repo.
If you use Replit, follow these steps to set up the project:

Start by importing the project on Replit.
Next, you will see a .replit window.
Select Use run command and click the Done button.
When you are done, make sure a working demo of your project is hosted somewhere public. Then submit the URL to it in the Solution Link field. Optionally, also submit a link to your project's source code in the GitHub Link field.

Your responses should have the following structures.

Exercise:

{
  username: "fcc_test",
  description: "test",
  duration: 60,
  date: "Mon Jan 01 1990",
  _id: "5fb5853f734231456ccb3b05"
}
User:

{
  username: "fcc_test",
  _id: "5fb5853f734231456ccb3b05"
}
Log:

{
  username: "fcc_test",
  count: 1,
  _id: "5fb5853f734231456ccb3b05",
  log: [{
    description: "test",
    duration: 60,
    date: "Mon Jan 01 1990",
  }]
}
Hint: For the date property, the toDateString method of the Date API can be used to achieve the expected output.
## Dependencies
1.) Express
2.) Mongoose
3.) Cors
4.) Body-parser
5.) Dotenv

## Setup
1.) Clone the repo
2.) Install all the dependencies
3.) Set up environment variables:
        Create a `.env` file in the project root directory and add your MongoDB connection string.
4.) Run the app
        `node server.js`
        The server will start on port 3000 or the port specified in the `PORT` environment variable.

## License

This project is licensed under the MIT License.


