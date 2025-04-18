# Interaction Application

## Live Demo
**Check out the live application here: [https://interaction-application.onrender.com/](https://interaction-application.onrender.com/)**

A real-time video interaction application built with MERN stack (MongoDB, Express, React, Node.js) and Socket.IO.

## Features

- User authentication
- Real-time messaging
- Room creation and management
- Video call functionality
- Typing indicators

## Technologies Used

- **Frontend**: React, Redux Toolkit, Socket.IO Client
- **Backend**: Node.js, Express, Socket.IO
- **Database**: MongoDB
- **Authentication**: JWT

## Installation

### Prerequisites

- Node.js (v14 or later)
- MongoDB Atlas account

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/nirajkumaryadav/Interaction-Application.git
   cd Interaction-Application
   ```

2. Install dependencies:
   ```
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the server directory using `.env.example` as a template
   - Add your MongoDB connection string and other required variables

4. Start the development server:
   ```
   npm start
   ```

## Project Structure

```
interaction-app/
├── client/           # React frontend
├── server/           # Express backend
│   ├── controllers/  # Route controllers
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── utils/        # Utility functions
│   └── index.js      # Server entry point
└── package.json      # Root package.json for scripts
```

## Usage

1. Register a new account or login with existing credentials
2. Create a new room or join an existing one
3. Chat with other users in the room
4. Start video calls with users in the same room
