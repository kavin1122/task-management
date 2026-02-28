# Quick Reference & Getting Started

## 📁 Project Structure Summary

```
Task Assignment Board/
├── backend/                    # Node.js + Express API
│   ├── models/                # Mongoose schemas
│   ├── controllers/           # Business logic
│   ├── routes/               # API endpoints
│   ├── middleware/           # Auth & validation
│   ├── config/              # Database config
│   ├── server.js            # Main entry point
│   ├── package.json
│   └── .env
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service
│   │   ├── context/         # State management
│   │   ├── hooks/           # Custom hooks
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── .env
│
└── Documentation Files
    ├── README.md                      # Main project overview
    ├── INSTALLATION_GUIDE.md          # Detailed setup steps
    ├── BACKEND_SETUP.md              # Backend configuration
    ├── FRONTEND_SETUP.md             # Frontend configuration
    ├── API_TESTING_GUIDE.md          # API testing procedures
    ├── ARCHITECTURE.md               # System design & best practices
    ├── POSTMAN_COLLECTION.json       # API testing collection
    └── QUICK_REFERENCE.md            # This file
```

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js installed
- MongoDB running (MongoDB Atlas or local)

### Step 1: Backend
```bash
cd backend
npm install
npm run dev
```
✅ Backend running on http://localhost:5000

### Step 2: Frontend (New Terminal)
```bash
cd frontend
npm install
npm start
```
✅ Frontend opens at http://localhost:3000

### Step 3: Test
1. Go to http://localhost:3000
2. Click "Register"
3. Create an account
4. Create a project
5. Create a task

## 📚 Documentation Files Explained

| File | Purpose | Read When |
|------|---------|-----------|
| README.md | Full project overview | First time setup |
| INSTALLATION_GUIDE.md | Step-by-step setup | Detailed installation help |
| BACKEND_SETUP.md | Backend configuration | Backend issues |
| FRONTEND_SETUP.md | Frontend configuration | Frontend issues |
| API_TESTING_GUIDE.md | API endpoint testing | Testing API endpoints |
| ARCHITECTURE.md | System design & patterns | Understanding design |
| POSTMAN_COLLECTION.json | Postman API collection | Testing with Postman |

## 🔧 Environment Configuration

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task_assignment_board
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🔐 Default Test Credentials

After first run, register these users:

| Name | Email | Password | Role |
|------|-------|----------|------|
| Priyadharshini | priyadharshini@example.com | password123 | admin |
| Mahalakshmi | mahalakshmi@example.com | password123 | member |
| Balraj | balraj@example.com | password123 | member |
| Kavin | kavin@example.com | password123 | member |
| Tharun G | tharun@example.com | password123 | member |

## 🌐 Important URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Web application |
| Backend API | http://localhost:5000/api | REST API |
| MongoDB | localhost:27017 | Database (local) |
| MongoDB Compass | mongodb://localhost:27017 | DB visualization tool |

## 📊 Database Models

### User
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `role` - admin or member

### Project
- `title` - Project name
- `description` - Project details
- `createdBy` - Creator user ID
- `members` - Array of user IDs

### Task
- `title` - Task name
- `description` - Task details
- `projectId` - Associated project
- `assignedTo` - User assigned
- `status` - todo / inprogress / completed
- `priority` - low / medium / high
- `deadline` - Due date

## 🔄 Application Flow

```
1. User visits http://localhost:3000
   ↓
2. Redirects to /login (if not authenticated)
   ↓
3. User can register or login
   ↓
4. JWT token stored in localStorage
   ↓
5. User navigates to dashboard
   ↓
6. Can create projects, create tasks, manage team
   ↓
7. Tasks displayed in Kanban board
   ↓
8. User can update task status by moving between columns
```

## 🧪 Quick API Testing

### Using Frontend
1. Register user
2. Create project
3. Open project detail
4. Create task
5. Drag task between status columns

### Using Postman
1. Import `POSTMAN_COLLECTION.json`
2. Register user (copy token)
3. Use token in "Authorization" header
4. Test endpoints

### Using curl
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'
```

## 🐛 Common Issues & Solutions

### Issue: Backend won't start
```bash
# Solution 1: Check port
netstat -ano | findstr :5000

# Solution 2: Restart backend
npm run dev

# Solution 3: Clear cache
npm cache clean --force
```

### Issue: Frontend won't connect to backend
```bash
# Check:
1. Is backend running on port 5000?
2. Is REACT_APP_API_URL correct in frontend/.env?
3. Did you restart frontend after changing .env?
```

### Issue: MongoDB connection error
```bash
# Check:
1. Is mongod running?
2. Is connection string correct in .env?
3. Network access if using Atlas?
```

### Issue: "Token invalid" errors
```bash
# Solution:
1. Login again to get fresh token
2. Check JWT_SECRET in backend .env
3. Verify token expiration time
```

## 📱 Frontend Features

### Pages
- **Login** - User authentication
- **Register** - New user signup
- **Dashboard** - Overview & statistics
- **Projects** - Project management
- **Project Detail** - Kanban board & task management

### Components
- **Navigation** - Header with user menu
- **KanbanBoard** - Three-column task board
- **PrivateRoute** - Protected routes

## 🎯 API Endpoints Quick Reference

### Authentication
```
POST   /api/auth/register      - Create user
POST   /api/auth/login         - Login user
GET    /api/auth/users         - Get all users
GET    /api/auth/users/:id     - Get user
```

### Projects
```
POST   /api/projects           - Create
GET    /api/projects           - Get all
GET    /api/projects/:id       - Get one
PUT    /api/projects/:id       - Update
DELETE /api/projects/:id       - Delete
POST   /api/projects/:id/members - Add member
```

### Tasks
```
POST   /api/tasks              - Create
GET    /api/tasks              - Get all
GET    /api/tasks/project/:id  - Get by project
GET    /api/tasks/:id          - Get one
PUT    /api/tasks/:id          - Update
PATCH  /api/tasks/:id/status   - Update status
DELETE /api/tasks/:id          - Delete
```

## 🔑 Key Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | v14+ | JavaScript runtime |
| Express | 4.18+ | Web framework |
| React | 18.x | Frontend framework |
| MongoDB | 5.x+ | Database |
| Mongoose | 7.x | ORM |
| JWT | - | Authentication |
| Bootstrap | 5.x | UI framework |

## 📝 Development Commands

### Backend
```bash
npm install         # Install dependencies
npm run dev        # Start with nodemon
npm start          # Start production
```

### Frontend
```bash
npm install        # Install dependencies
npm start          # Start dev server
npm build          # Build production
npm test           # Run tests
```

## 🎓 Learning Path

1. **First**: Read `README.md`
2. **Then**: Follow `INSTALLATION_GUIDE.md`
3. **Explore**: Try creating projects/tasks via frontend
4. **Test**: Read `API_TESTING_GUIDE.md` and test endpoints
5. **Learn**: Review `ARCHITECTURE.md` for design patterns
6. **Develop**: Modify code and add features

## 💾 Backup & Version Control

### Important Directories to Backup
- `backend/.env` - Database credentials
- `frontend/.env` - API configuration

### Git Setup
```bash
# Initialize git
git init

# Create .gitignore (template provided)
# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Full stack MERN app"
```

## 🚀 Ready to Deploy?

### Before Deployment
- [ ] Change JWT_SECRET to strong value
- [ ] Update MongoDB connection (use Atlas)
- [ ] Test all features
- [ ] Fix any bugs
- [ ] Optimize images
- [ ] Update REACT_APP_API_URL to production API

### Deployment Platforms
- **Backend**: Heroku, Railway, Render
- **Frontend**: Vercel, Netlify, gh-pages
- **Database**: MongoDB Atlas (free tier available)

## 📞 Support

### If You Get Stuck

1. **Check Logs**
   - Frontend: Browser console (F12)
   - Backend: Terminal logs

2. **Read Documentation**
   - API issue: `API_TESTING_GUIDE.md`
   - Setup issue: `INSTALLATION_GUIDE.md`
   - Design question: `ARCHITECTURE.md`

3. **Debug Checklist**
   - Is backend running?
   - Is frontend pointing to correct API URL?
   - Is MongoDB connected?
   - Do you have valid JWT token?
   - Are all env variables set?

## ✅ Setup Verification Checklist

- [ ] Node.js installed
- [ ] MongoDB running/configured
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] .env files created correctly
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can register user
- [ ] Can login with user
- [ ] Can create project
- [ ] Can create task
- [ ] Task appears in Kanban board

## 🎉 You're All Set!

Once all items are checked, your Task Assignment Board is ready to use!

### Next Steps
1. Create sample projects and tasks
2. Test all features
3. Read through the architecture
4. Explore the code
5. Add your own features
6. Deploy to production

### Questions or Issues?
Refer to the appropriate documentation file or check the browser/terminal logs for error messages.

---

**Happy coding! 🎊**

