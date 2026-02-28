# Task Assignment Board - Frontend Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- React 18.x

## Installation Steps

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Configuration
Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start the Development Server
```bash
npm start
```

The application will run on `http://localhost:3000`

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navigation.js          # Main navigation bar
│   │   ├── PrivateRoute.js        # Protected route component
│   │   └── KanbanBoard.js         # Kanban board component
│   ├── pages/
│   │   ├── Login.js               # Login page
│   │   ├── Register.js            # Registration page
│   │   ├── Dashboard.js           # Dashboard/home page
│   │   ├── Projects.js            # Projects listing page
│   │   └── ProjectDetail.js       # Project details with Kanban board
│   ├── services/
│   │   └── api.js                 # API service with axios
│   ├── context/
│   │   └── AuthContext.js         # Authentication context
│   ├── hooks/
│   │   └── useAuth.js             # Custom auth hook
│   ├── App.js                     # Main app component
│   └── index.js                   # React entry point
├── public/
│   └── index.html                 # HTML template
├── package.json
└── .env
```

## Key Features

### Components

1. **Navigation** - Header with auth-aware navigation
2. **PrivateRoute** - Protects routes that require authentication
3. **KanbanBoard** - Three-column Kanban board for task management

### Pages

1. **Login** - User authentication
2. **Register** - New user registration
3. **Dashboard** - Overview with stats and recent tasks
4. **Projects** - Create and manage projects list
5. **ProjectDetail** - View project, create tasks, add members, manage Kanban board

### State Management

- **AuthContext** - Manages user authentication state and provides login/logout functions
- **useAuth hook** - Custom hook to access auth context throughout the app

### API Integration

All API calls are handled through `services/api.js` with:
- Automatic JWT token injection in requests
- Base URL configuration
- Error handling

## Available Routes

- `/` - Redirects to dashboard (requires auth)
- `/login` - Public login page
- `/register` - Public registration page
- `/dashboard` - User dashboard (protected)
- `/projects` - Projects list (protected)
- `/project/:id` - Project detail with Kanban board (protected)

## Features in Detail

### Dashboard
- Total projects count
- Total tasks count
- Completed tasks count
- Recent tasks table

### Projects Page
- Create new project
- View list of all projects
- Delete projects
- Navigate to project details

### Project Detail Page
- View project information
- View project members
- Create new tasks
- Add team members to project
- Interactive Kanban board with three columns:
  - To Do
  - In Progress
  - Completed
- Move tasks between columns
- Update task status
- Delete tasks

## Authentication Flow

1. User registers or logs in
2. JWT token is stored in localStorage
3. Token is automatically sent with each API request
4. Protected routes verify authentication
5. Logout clears token and redirects to login

## Styling

- Bootstrap 5 for responsive design
- React-Bootstrap components
- CSS utilities for custom styling

## Development

### Running in Development Mode
```bash
npm start
```

### Building for Production
```bash
npm build
```

This creates an optimized production build in the `build` folder.

## Common Tasks

### Adding a New Page

1. Create component in `src/pages/`
2. Import in `App.js`
3. Add route in App.js

### Adding a New Component

1. Create component in `src/components/`
2. Import where needed
3. Use with props

### Making API Calls

Use the provided API service:
```javascript
import { projectAPI, taskAPI, authAPI } from '../services/api';

const response = await projectAPI.getAll();
```

## Troubleshooting

### CORS Errors
- Ensure backend is running on port 5000
- Check REACT_APP_API_URL in .env

### Authentication Issues
- Clear localStorage and log in again
- Check JWT token expiration time
- Verify backend is issuing tokens correctly

### API Not Responding
- Start backend: `npm run dev` from backend folder
- Check MongoDB connection
- Verify .env configuration

## Technologies Used

- **React 18** - UI library
- **React Router 6** - Client-side routing
- **Bootstrap 5** - UI framework
- **React-Bootstrap** - Bootstrap components
- **Axios** - HTTP client
- **Context API** - State management
