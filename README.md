# 📊 Project Manager - Full Stack Web App

A comprehensive project management application with role-based access control, task tracking, and team collaboration features.

## ✨ Key Features

- **Authentication**: Secure Signup/Login with JWT
- **Project Management**: Create, update, delete projects with team members
- **Task Tracking**: Create tasks, assign to team members, track status
- **Dashboard**: Overview of projects, tasks, completion status, and overdue items
- **Team Management**: Create teams and add members
- **Role-Based Access**: Admin and Member roles with different permissions
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express** - REST API
- **MongoDB** - NoSQL Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React 18** - UI Library
- **React Router** - Routing
- **Axios** - HTTP Client
- **Vite** - Build tool
- **CSS3** - Styling

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd project-manager
```

2. **Install dependencies**
```bash
npm run install:all
```

3. **Configure environment variables**

Create a `.env` file in the root directory:
```
MONGODB_URI=mongodb://localhost:27017/project-manager
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
VITE_API_URL=http://localhost:5000/api
```

4. **Start development servers**
```bash
npm run dev
```

This will start:
- Backend API on `http://localhost:5000`
- Frontend on `http://localhost:3000`

## 🚀 Deployment to Railway

### Prerequisites
- Railway.app account
- GitHub repository

### Steps

1. **Push code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Railway**
- Go to [railway.app](https://railway.app)
- Click "New Project"
- Select "Deploy from GitHub repo"
- Authorize GitHub and select your repository

3. **Configure Environment Variables**
- Go to Project Settings
- Add these variables:
  - `MONGODB_URI`: Your MongoDB Atlas connection string
  - `JWT_SECRET`: A secure random string
  - `NODE_ENV`: production

4. **Build & Deploy**
- Railway will automatically detect the project type
- Frontend will be built and served from the same server
- API will be available at the Railway domain

5. **Set up MongoDB**
- If using MongoDB Atlas:
  - Create a cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
  - Get the connection string
  - Add to Railway environment variables

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/members` - Add member to project

### Tasks
- `GET /api/tasks/project/:projectId` - Get tasks for project
- `GET /api/tasks/user/assigned` - Get user's assigned tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Teams
- `GET /api/teams` - Get all teams
- `POST /api/teams` - Create team
- `GET /api/teams/:id` - Get team details
- `POST /api/teams/:id/members` - Add member to team
- `DELETE /api/teams/:id/members/:userId` - Remove member

## 💾 Database Schema

### User
```
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'Admin' | 'Member',
  createdAt: Date
}
```

### Project
```
{
  title: String,
  description: String,
  owner: ObjectId (User),
  members: [{ userId, role }],
  status: 'Active' | 'On Hold' | 'Completed',
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Task
```
{
  title: String,
  description: String,
  projectId: ObjectId (Project),
  assignedTo: ObjectId (User),
  status: 'Todo' | 'In Progress' | 'Done' | 'Overdue',
  priority: 'Low' | 'Medium' | 'High',
  dueDate: Date,
  createdBy: ObjectId (User),
  createdAt: Date,
  updatedAt: Date
}
```

### Team
```
{
  name: String,
  description: String,
  owner: ObjectId (User),
  members: [{ userId, joinedAt }],
  createdAt: Date
}
```

## 🔐 Role-Based Access Control

### Admin
- Create/Update/Delete projects
- Add/Remove members from projects
- Assign tasks
- View all project information

### Member
- View projects they're part of
- Create/Update tasks assigned to them
- Update task status
- View team information

## 🧪 Testing

Create test accounts:
1. Sign up as Admin user
2. Sign up as Member user
3. Admin creates a project
4. Admin adds Member to project
5. Member can view and update tasks


## 📝 Project Structure

```
project-manager/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Task.js
│   │   └── Team.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── tasks.js
│   │   └── teams.js
│   ├── middleware/
│   │   └── auth.js
│   ├── index.js
│   └── package.json
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Tasks.jsx
│   │   │   └── Teams.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ProjectContext.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── api.js
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🤝 Contributing

Feel free to fork this repository and submit pull requests.

## 📄 License

MIT License - feel free to use this project for your needs.

## 📞 Support

If you face any issues, please create an issue in the repository.

---

**Made with ❤️ by Aditya**
