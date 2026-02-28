# API Testing Guide & Sample Data

Complete guide for testing the Task Assignment Board API.

## Tools for API Testing

### Option 1: Postman (Recommended)
- Download: https://www.postman.com/downloads/
- Import: `POSTMAN_COLLECTION.json`
- Easy to use GUI

### Option 2: Thunder Client
- VS Code Extension
- Similar to Postman but lighter

### Option 3: curl (Command Line)
- Built into most systems
- Great for scripting

### Option 4: Frontend Application
- Use the React UI directly

## Testing Workflow

### 1. Start All Services

Terminal 1:
```bash
cd backend
npm run dev
```

Terminal 2 (if using local MongoDB):
```bash
mongod
```

Terminal 3:
```bash
cd frontend
npm start
```

## Complete API Test Cases

### TEST 1: User Registration

**Endpoint:** `POST http://localhost:5000/api/auth/register`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Priyadharshini",
  "email": "priyadharshini@example.com",
  "password": "password123",
  "role": "admin"
}
```

**Expected Response:** Status 201
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Priyadharshini",
    "email": "priyadharshini@example.com",
    "role": "admin"
  }
}
```

**Save:** Copy the token for next requests

---

### TEST 2: User Login

**Endpoint:** `POST http://localhost:5000/api/auth/login`

**Request Body:**
```json
{
  "email": "priyadharshini@example.com",
  "password": "password123"
}
```

**Expected Response:** Status 200
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Priyadharshini",
    "email": "priyadharshini@example.com",
    "role": "admin"
  }
}
```

---

### TEST 3: Get All Users

**Endpoint:** `GET http://localhost:5000/api/auth/users`

**Request Headers:**
```
Authorization: Bearer {YOUR_TOKEN}
Content-Type: application/json
```

**Expected Response:** Status 200
```json
{
  "message": "Users retrieved successfully",
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Priyadharshini",
      "email": "priyadharshini@example.com",
      "role": "admin",
      "createdAt": "2026-02-24T10:00:00.000Z"
    }
  ]
}
```

---

### TEST 4: Create Project

**Endpoint:** `POST http://localhost:5000/api/projects`

**Request Headers:**
```
Authorization: Bearer {YOUR_TOKEN}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "E-commerce Platform",
  "description": "Build a full-stack e-commerce platform with React and Node.js",
  "members": []
}
```

**Expected Response:** Status 201
```json
{
  "message": "Project created successfully",
  "project": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "E-commerce Platform",
    "description": "Build a full-stack e-commerce platform with React and Node.js",
    "createdBy": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Priyadharshini"
    },
    "members": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Priyadharshini"
      }
    ],
    "createdAt": "2026-02-24T10:00:00.000Z"
  }
}
```

**Save:** Copy the project `_id` for task creation

---

### TEST 5: Get All Projects

**Endpoint:** `GET http://localhost:5000/api/projects`

**Request Headers:**
```
Authorization: Bearer {YOUR_TOKEN}
```

**Expected Response:** Status 200
```json
{
  "message": "Projects retrieved successfully",
  "projects": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "E-commerce Platform",
      "description": "Build a full-stack e-commerce platform...",
      "createdBy": { ... },
      "members": [ ... ],
      "createdAt": "2026-02-24T10:00:00.000Z"
    }
  ]
}
```

---

### TEST 6: Get Project by ID

**Endpoint:** `GET http://localhost:5000/api/projects/{PROJECT_ID}`

**Replace:** {PROJECT_ID} with actual project ID

**Request Headers:**
```
Authorization: Bearer {YOUR_TOKEN}
```

**Expected Response:** Status 200 (same as individual project object)

---

### TEST 7: Add Member to Project

First, create another user:

**Register User 2:**
```json
POST http://localhost:5000/api/auth/register
{
  "name": "Mahalakshmi",
  "email": "mahalakshmi@example.com",
  "password": "password123"
}
```

**Save:** Copy the new user ID

**Now Add Member:**

**Endpoint:** `POST http://localhost:5000/api/projects/{PROJECT_ID}/members`

**Request Headers:**
```
Authorization: Bearer {YOUR_TOKEN}
Content-Type: application/json
```

**Request Body:**
```json
{
  "memberId": "507f1f77bcf86cd799439013"
}
```

**Expected Response:** Status 200
```json
{
  "message": "Member added to project",
  "project": {
    // ... project object with new member
  }
}
```

---

### TEST 8: Create Task

**Endpoint:** `POST http://localhost:5000/api/tasks`

**Request Headers:**
```
Authorization: Bearer {YOUR_TOKEN}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Design Homepage",
  "description": "Create responsive homepage with Bootstrap",
  "projectId": "507f1f77bcf86cd799439012",
  "assignedTo": "507f1f77bcf86cd799439013",
  "priority": "high",
  "deadline": "2026-03-31"
}
```

**Expected Response:** Status 201
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439014",
    "title": "Design Homepage",
    "description": "Create responsive homepage with Bootstrap",
    "projectId": { ... },
    "assignedTo": { ... },
    "status": "todo",
    "priority": "high",
    "deadline": "2026-03-31T00:00:00.000Z",
    "createdAt": "2026-02-24T10:00:00.000Z"
  }
}
```

**Save:** Copy task `_id` for status updates

---

### TEST 9: Get All Tasks

**Endpoint:** `GET http://localhost:5000/api/tasks`

**Request Headers:**
```
Authorization: Bearer {YOUR_TOKEN}
```

**Expected Response:** Status 200
```json
{
  "message": "Tasks retrieved successfully",
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "title": "Design Homepage",
      // ... rest of task object
    }
  ]
}
```

---

### TEST 10: Get Tasks by Project

**Endpoint:** `GET http://localhost:5000/api/tasks/project/{PROJECT_ID}`

**Request Headers:**
```
Authorization: Bearer {YOUR_TOKEN}
```

**Expected Response:** Status 200 (array of tasks for that project)

---

### TEST 11: Update Task Status (Kanban Movement)

**Endpoint:** `PATCH http://localhost:5000/api/tasks/{TASK_ID}/status`

**Request Headers:**
```
Authorization: Bearer {YOUR_TOKEN}
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "inprogress"
}
```

**Valid statuses:** `todo`, `inprogress`, `completed`

**Expected Response:** Status 200
```json
{
  "message": "Task status updated successfully",
  "task": {
    // ... task object with status: "inprogress"
  }
}
```

---

### TEST 12: Update Full Task

**Endpoint:** `PUT http://localhost:5000/api/tasks/{TASK_ID}`

**Request Headers:**
```
Authorization: Bearer {YOUR_TOKEN}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Update: Design Homepage",
  "description": "Create responsive homepage with Bootstrap 5",
  "priority": "medium",
  "status": "inprogress"
}
```

**Expected Response:** Status 200 (updated task object)

---

### TEST 13: Update Project

**Endpoint:** `PUT http://localhost:5000/api/projects/{PROJECT_ID}`

**Request Headers:**
```
Authorization: Bearer {YOUR_TOKEN}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "E-commerce Platform v2",
  "description": "Updated description with new features"
}
```

**Expected Response:** Status 200 (updated project object)

---

### TEST 14: Delete Task

**Endpoint:** `DELETE http://localhost:5000/api/tasks/{TASK_ID}`

**Request Headers:**
```
Authorization: Bearer {YOUR_TOKEN}
```

**Expected Response:** Status 200
```json
{
  "message": "Task deleted successfully"
}
```

---

### TEST 15: Delete Project

**Endpoint:** `DELETE http://localhost:5000/api/projects/{PROJECT_ID}`

**Request Headers:**
```
Authorization: Bearer {YOUR_TOKEN}
```

**Expected Response:** Status 200
```json
{
  "message": "Project deleted successfully"
}
```

---

## Error Test Cases

### Invalid Token
```
GET http://localhost:5000/api/projects
Authorization: Bearer invalid.token.here
```

**Expected Response:** Status 403
```json
{
  "message": "Invalid or expired token"
}
```

---

### Missing Required Fields
```
POST http://localhost:5000/api/auth/register
{
  "name": "Test User"
  // missing email and password
}
```

**Expected Response:** Status 400
```json
{
  "message": "Please provide all required fields"
}
```

---

### Duplicate Email
```
POST http://localhost:5000/api/auth/register
{
  "name": "Another User",
  "email": "priyadharshini@example.com",  // already exists
  "password": "password123"
}
```

**Expected Response:** Status 400
```json
{
  "message": "User already exists"
}
```

---

### Invalid Credentials
```
POST http://localhost:5000/api/auth/login
{
  "email": "priyadharshini@example.com",
  "password": "wrongpassword"
}
```

**Expected Response:** Status 400
```json
{
  "message": "Invalid credentials"
}
```

---

## Sample Data Creation Script

Create file: `sample-data.js` in backend directory

```javascript
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');

async function createSampleData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    
    // Create users
    const users = await User.create([
      { name: 'Priyadharshini', email: 'priyadharshini@example.com', password: 'password123', role: 'admin' },
      { name: 'Mahalakshmi', email: 'mahalakshmi@example.com', password: 'password123', role: 'member' },
      { name: 'Balraj', email: 'balraj@example.com', password: 'password123', role: 'member' },
      { name: 'Kavin', email: 'kavin@example.com', password: 'password123', role: 'member' },
      { name: 'Tharun G', email: 'tharun@example.com', password: 'password123', role: 'member' },
    ]);
    
    // Create projects
    const project = await Project.create({
      title: 'E-commerce Platform',
      description: 'Build full-stack e-commerce platform',
      createdBy: users[0]._id,
      members: users.map(u => u._id)
    });
    
    // Create tasks
    await Task.create([
      {
        title: 'Design Homepage',
        description: 'Create responsive homepage',
        projectId: project._id,
        assignedTo: users[1]._id,
        status: 'todo',
        priority: 'high'
      },
      {
        title: 'Setup Backend API',
        description: 'Create REST API endpoints',
        projectId: project._id,
        assignedTo: users[2]._id,
        status: 'inprogress',
        priority: 'high'
      },
      {
        title: 'Database Schema',
        description: 'Design MongoDB schemas',
        projectId: project._id,
        assignedTo: users[3]._id,
        status: 'completed',
        priority: 'medium'
      }
    ]);
    
    console.log('Sample data created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating sample data:', error);
    process.exit(1);
  }
}

createSampleData();
```

Run with:
```bash
node sample-data.js
```

---

## Performance Testing Tips

1. **Test with multiple concurrent requests** to verify server handling
2. **Monitor response times** - should be < 200ms for most endpoints
3. **Check database indexes** for query optimization
4. **Load test** with tools like JMeter or Artillery

---

## Debugging Tips

1. **Check browser console** for Frontend errors
2. **Check terminal logs** for Backend errors
3. **Use Postman console** to see request/response details
4. **Test with different browsers** to identify compatibility issues
5. **Use MongoDB Compass** to verify data in database

---

## Common HTTP Status Codes

| Code | Meaning | Common Reason |
|------|---------|--------------|
| 200 | OK | Successful GET/PUT/PATCH |
| 201 | Created | Successful POST |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | No/invalid token |
| 403 | Forbidden | Not authorized |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Backend error |

