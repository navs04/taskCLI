# TaskCLI

A terminal-inspired full-stack task manager built with the MERN stack. TaskCLI allows users to create, complete, and delete tasks through a clean developer-focused interface while persisting data in MongoDB.

## Features

* Create new tasks
* Mark tasks as completed
* Delete tasks
* Persistent cloud storage with MongoDB Atlas
* RESTful API built with Express and Node.js
* Real-time frontend-backend communication using Fetch API
* Terminal-inspired UI with custom styling
* Fully deployed frontend and backend

## Tech Stack

### Frontend

* React
* JavaScript (ES6+)
* HTML5
* CSS3
* Vite

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Vercel
* Render

## Project Structure

taskCLI/
├── client/
│ ├── src/
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
│
├── server/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── package.json
│
└── README.md

## Installation & Setup

### Clone the repository

git clone https://github.com/navs04/taskCLI.git

### Navigate into the project

cd taskcli

### Install frontend dependencies

cd client
npm install

### Install backend dependencies

cd ../server
npm install

### Environment variables

Create a .env file inside the server directory and add:

MONGO_URI=your_mongodb_connection_string

### Start backend

npm run dev

### Start frontend

cd ../client
npm run dev

## Live Demo

Frontend: https://react-todo-app-iota-three.vercel.app/

Backend API: https://react-todo-app-3rlg.onrender.com/api/todos

## Future Improvements

* User authentication
* Due dates and reminders
* Drag-and-drop task ordering

## Author

Navya Bhatia

GitHub: https://github.com/navs04

## License

This project is open source and available under the MIT License.
