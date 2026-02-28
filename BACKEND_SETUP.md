# Task Assignment Board - Backend Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task_assignment_board
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

### 3. MongoDB Setup (Local)
```bash
# If you have MongoDB installed locally
mongod

# Or use MongoDB Atlas
# Create a cluster on MongoDB Atlas and get your connection string
# Replace MONGODB_URI in .env with your Atlas connection string
```

### 4. Start the Backend Server
```bash
# Development mode with nodemon
npm run dev

# Or production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/users` - Get all users (protected)
- `GET /api/auth/users/:id` - Get user by ID (protected)

### Projects
- `POST /api/projects` - Create project (protected)
- `GET /api/projects` - Get all projects (protected)
- `GET /api/projects/:id` - Get project by ID (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `POST /api/projects/:id/members` - Add member to project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Tasks
- `POST /api/tasks` - Create task (protected)
- `GET /api/tasks` - Get all tasks (protected)
- `GET /api/tasks/project/:projectId` - Get tasks by project (protected)
- `GET /api/tasks/:id` - Get task by ID (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `PATCH /api/tasks/:id/status` - Update task status (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

## Testing with Postman

See `POSTMAN_COLLECTION.json` for complete API testing guide.

## Project Structure
```
backend/
├── config/
│   └── database.js         # MongoDB connection
├── controllers/
│   ├── authController.js   # Authentication logic
│   ├── projectController.js # Project logic
│   └── taskController.js   # Task logic
├── middleware/
│   └── auth.js             # JWT middleware
├── models/
│   ├── User.js             # User schema
│   ├── Project.js          # Project schema
│   └── Task.js             # Task schema
├── routes/
│   ├── authRoutes.js       # Auth endpoints
│   ├── projectRoutes.js    # Project endpoints
│   └── taskRoutes.js       # Task endpoints
├── server.js               # Main server file
├── package.json            # Dependencies
└── .env                    # Environment variables
```
