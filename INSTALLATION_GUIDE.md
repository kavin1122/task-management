# Installation & Setup Commands

Complete step-by-step commands to get the project running.

## Prerequisites Check
```bash
# Check Node.js version (should be v14 or higher)
node --version

# Check npm version
npm --version

# Check if MongoDB is installed (optional for local setup)
mongod --version
```

## Full Installation Walkthrough

### Step 1: Navigate to Project Directory
```bash
cd "C:\Users\BALRAJ\Desktop\Task Management"
```

### Step 2: Backend Installation

#### 2.1 Install Backend Dependencies
```bash
cd backend
npm install
```

This will install:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- validator
- nodemon (dev dependency)

#### 2.2 Configure Backend Environment
```bash
# File: backend\.env
```
Content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task_assignment_board
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

#### 2.3 Start Backend Server
```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

Expected output:
```
Server is running on port 5000
MongoDB connected successfully
```

### Step 3: MongoDB Setup (Choose One)

#### Option A: Local MongoDB
```bash
# Windows - Install MongoDB Community Edition
# Visit: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

# Then start MongoDB service
mongod

# Or if MongoDB is installed as a service
net start MongoDB

# Verify connection
mongo
```

#### Option B: MongoDB Atlas (Cloud)
```bash
# 1. Go to https://www.mongodb.com/cloud/atlas
# 2. Create a free account
# 3. Create a cluster
# 4. Get connection string
# 5. Update backend/.env:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task_assignment_board?retryWrites=true&w=majority
```

### Step 4: Frontend Installation

#### 4.1 Open New Terminal and Install Frontend
```bash
cd frontend
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- axios
- bootstrap
- react-bootstrap
- react-beautiful-dnd
- react-scripts

#### 4.2 Configure Frontend Environment
```bash
# File: frontend\.env
```
Content:
```
REACT_APP_API_URL=http://localhost:5000/api
```

#### 4.3 Start Frontend Development Server
```bash
npm start
```

Expected output:
```
Compiled successfully!
You can now view task-assignment-board in the browser.

Local:            http://localhost:3000
```

## Running the Complete Application

### Terminal 1: MongoDB (if using local)
```bash
mongod
```

### Terminal 2: Backend
```bash
cd backend
npm run dev
```

### Terminal 3: Frontend
```bash
cd frontend
npm start
```

Now you can access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Backend Root: http://localhost:5000

## Sample User Registration via Terminal

### Using curl (Windows PowerShell)
```powershell
$body = @{
    name = "Priyadharshini"
    email = "priyadharshini@example.com"
    password = "password123"
    role = "admin"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body
```

### Using curl (Git Bash)
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Priyadharshini",
    "email": "priyadharshini@example.com",
    "password": "password123",
    "role": "admin"
  }'
```

## Creating Sample Data

### 1. Register Test Users
```bash
# User 1
POST http://localhost:5000/api/auth/register
{
  "name": "Priyadharshini",
  "email": "priyadharshini@example.com",
  "password": "password123"
}

# User 2
POST http://localhost:5000/api/auth/register
{
  "name": "Mahalakshmi",
  "email": "mahalakshmi@example.com",
  "password": "password123"
}

# User 3
POST http://localhost:5000/api/auth/register
{
  "name": "Balraj",
  "email": "balraj@example.com",
  "password": "password123"
}

# User 4
POST http://localhost:5000/api/auth/register
{
  "name": "Kavin",
  "email": "kavin@example.com",
  "password": "password123"
}

# User 5
POST http://localhost:5000/api/auth/register
{
  "name": "Tharun G",
  "email": "tharun@example.com",
  "password": "password123"
}
```

### 2. Login and Get Token
```bash
POST http://localhost:5000/api/auth/login
{
  "email": "priyadharshini@example.com",
  "password": "password123"
}
```
Save the token from response for further requests.

### 3. Create Project
```bash
POST http://localhost:5000/api/projects
Header: Authorization: Bearer {TOKEN}
{
  "title": "E-commerce Platform",
  "description": "Build a full-stack e-commerce platform"
}
```

### 4. Create Tasks
```bash
POST http://localhost:5000/api/tasks
Header: Authorization: Bearer {TOKEN}
{
  "title": "Design Homepage",
  "description": "Create responsive homepage",
  "projectId": "{PROJECT_ID}",
  "assignedTo": "{USER_ID}",
  "priority": "high",
  "deadline": "2026-03-31"
}
```

## Troubleshooting Installation

### npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -r node_modules

# Reinstall
npm install
```

### Port Already in Use
```bash
# Change PORT in .env
PORT=5001  # Instead of 5000

# Or kill process using port
# Windows - Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID {PID} /F
```

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongod

# Or verify connection string in .env
# For local: mongodb://localhost:27017/task_assignment_board
# For Atlas: mongodb+srv://user:pass@cluster.mongodb.net/...
```

### CORS Error in Frontend
```bash
# Check backend .env and restart backend
# Ensure REACT_APP_API_URL is correct

# Also check frontend .env
REACT_APP_API_URL=http://localhost:5000/api
```

## Quick Start Commands Summary

```bash
# Backend
cd backend && npm install
# Edit .env with MongoDB URI
npm run dev

# Frontend (new terminal)
cd frontend && npm install
npm start

# MongoDB (if local)
mongod
```

## Environment Variables Reference

### Backend (.env)
```
PORT=5000                           # Server port
MONGODB_URI=mongodb://localhost:27017/task_assignment_board  # DB connection
JWT_SECRET=your_secret_key          # JWT signing key
JWT_EXPIRE=7d                       # Token expiration
NODE_ENV=development                # Environment
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api  # Backend API URL
```

## Verification Steps

After installation, verify everything works:

```bash
# 1. Check Backend
curl http://localhost:5000/api
# Should return: {"message":"Task Assignment Board API",...}

# 2. Check Frontend
# Open browser: http://localhost:3000
# Should show login page

# 3. Register a user in frontend
# Should work without errors

# 4. Login with created user
# Should redirect to dashboard

# 5. Create a project
# Should appear in projects list

# 6. Create a task in project
# Should appear in Kanban board
```

## NPM Scripts Reference

### Backend
```bash
npm run dev    # Start with nodemon (development)
npm start      # Start production server
```

### Frontend
```bash
npm start      # Start development server
npm build      # Create production build
npm test       # Run tests
```

## Full System Architecture

```
┌─────────────┐         ┌──────────────┐         ┌──────────────┐
│             │         │              │         │              │
│  Frontend   │◄────────►  Backend     │◄────────►  MongoDB     │
│  React 3000 │  HTTP   │  Express 5000│  Mongoose │  27017      │
│             │         │              │         │              │
└─────────────┘         └──────────────┘         └──────────────┘
     (UI)                  (API)                  (Database)
```

## Getting Help

If you encounter issues:
1. Check the README.md
2. Review BACKEND_SETUP.md
3. Review FRONTEND_SETUP.md
4. Check error messages in terminal
5. Verify .env files
6. Restart all services
