# Role-Based Access Control Guide

This guide explains how role-based access control (RBAC) is implemented in the Project Manager application.

## 📋 Overview

The application has two primary roles:
- **Admin**: Full control over projects and team management
- **Member**: Limited access, can update assigned tasks

## 👤 User Roles

### Admin Role
An Admin has the following permissions:

1. **Project Management**
   - Create new projects
   - Edit project details
   - Delete projects
   - Add/remove team members from projects
   - Change project status

2. **Task Management**
   - Create tasks in their projects
   - Assign tasks to team members
   - Update any task status
   - Delete tasks they created

3. **Team Management**
   - Create teams
   - Add members to teams
   - Remove members from teams
   - View all team details

### Member Role
A Member has the following permissions:

1. **Project Management**
   - View projects they're assigned to
   - Cannot create/delete projects
   - Cannot add members to projects

2. **Task Management**
   - View tasks assigned to them
   - Update status of assigned tasks
   - Cannot assign tasks to others
   - Cannot delete tasks (only creator/assignee can)

3. **Team Management**
   - View teams they're in
   - Cannot create teams
   - Cannot manage team members

## 🔑 Authentication & Authorization

### JWT Tokens
- Users receive a JWT token upon login
- Token includes: User ID and Role
- Token expires after 7 days (configurable)
- Token must be sent in Authorization header for all API requests

```
Authorization: Bearer <token>
```

### Middleware Protection
All protected routes use the `auth` middleware:

```javascript
// Protect a route
router.get('/protected', auth, (req, res) => {
  // req.userId and req.role available
});
```

### Admin-Only Routes
Some routes require Admin role:

```javascript
router.post('/admin-only', auth, adminOnly, (req, res) => {
  // Only admins can access
});
```

## 📊 Access Control Matrix

| Resource | Admin | Member | Guest |
|----------|-------|--------|-------|
| View Projects | Own + Assigned | Assigned | ❌ |
| Create Project | ✅ | ❌ | ❌ |
| Update Project | Own | ❌ | ❌ |
| Delete Project | Own | ❌ | ❌ |
| Add Members | Own Project | ❌ | ❌ |
| Create Task | ✅ | ❌ | ❌ |
| Update Task | Any | Assigned | ❌ |
| Assign Task | ✅ | ❌ | ❌ |
| View Team | Member | Member | ❌ |
| Create Team | ✅ | ❌ | ❌ |

## 🔐 Security Best Practices

### Implemented
- Passwords hashed with bcryptjs
- JWT tokens with expiration
- CORS enabled for specific origins
- Input validation on all endpoints
- MongoDB injection prevention with Mongoose

### Recommended for Production
```javascript
// Add to .env
JWT_SECRET=use_a_strong_random_string_at_least_32_chars
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

## 🧪 Testing RBAC

### Scenario 1: Admin Creates Project
1. Login as Admin
2. Go to Projects page
3. Click "New Project"
4. Fill details and submit
5. Project appears in list with Admin permissions

### Scenario 2: Add Member to Project
1. Admin creates a project
2. Member signs up separately
3. Admin goes to project
4. Admin clicks "Add Member"
5. Selects the member user
6. Member can now see and access the project

### Scenario 3: Member Updates Task
1. Admin creates a task and assigns to member
2. Member logs in
3. Member goes to "My Tasks"
4. Member changes task status
5. Status updates successfully
6. Admin can see the updated status

### Scenario 4: Permission Denied
1. Member tries to delete a project
2. Gets 403 Forbidden error
3. Action is not allowed

## 🔧 Modifying Roles

To add a new role, modify:

1. **User.js** - Add to role enum:
```javascript
role: {
  type: String,
  enum: ['Admin', 'Member', 'Manager'], // Add new role
  default: 'Member',
}
```

2. **auth.js** - Add new middleware:
```javascript
const managerOnly = (req, res, next) => {
  if (req.role !== 'Manager') {
    return res.status(403).json({ message: 'Manager access required' });
  }
  next();
};
```

3. **Routes** - Use new middleware:
```javascript
router.post('/manager-route', auth, managerOnly, handler);
```

## 📚 API Endpoints by Role

### Anyone (Public)
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/health`

### Admin
- `POST /api/projects` - Create
- `PUT /api/projects/:id` - Update
- `DELETE /api/projects/:id` - Delete
- `POST /api/projects/:id/members` - Add member
- `POST /api/tasks` - Create
- `DELETE /api/tasks/:id` - Delete
- `POST /api/teams` - Create
- `DELETE /api/teams/:id/members/:userId` - Remove member

### Member (Assigned to project/task)
- `GET /api/projects` - View assigned
- `GET /api/tasks/user/assigned` - View assigned
- `PUT /api/tasks/:id` - Update assigned task
- `GET /api/teams` - View teams

## 🛡️ Frontend Permission Checks

```jsx
// Check role before showing UI
{user?.role === 'Admin' && (
  <button onClick={deleteProject}>Delete</button>
)}

// Redirect if unauthorized
useEffect(() => {
  if (!user) navigate('/login');
  if (user.role !== 'Admin') navigate('/dashboard');
}, [user, navigate]);
```

## 📞 Troubleshooting

### "Invalid token" error
- Token may have expired
- Re-login to get new token
- Check token format in Authorization header

### "Admin access required" error
- Your user role is not Admin
- Ask an Admin to change your role
- Or create a new admin account

### Can't add members to project
- You must be the project owner
- Or have Admin role
- Member doesn't exist in system yet

---

For more details, see the main [README.md](./README.md)
