# 🚀 Quick Start Guide

Get the Project Manager app running in 5 minutes!

## 📋 Requirements

- Node.js 16+ ([download](https://nodejs.org))
- MongoDB ([local install](https://docs.mongodb.com/manual/installation/) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

## ⚡ Quick Start (5 min)

### Option 1: Using npm (Recommended for beginners)

```bash
# 1. Navigate to project directory
cd project-manager

# 2. Install all dependencies
npm run install:all

# 3. Start both servers
npm run dev
```

Open your browser:
- Frontend: http://localhost:3000
- API: http://localhost:5000/api

### Option 2: Using Docker

```bash
# Build and run with Docker
docker-compose up --build
```

Then open http://localhost:3000

## 🧪 Test the App

### Demo Accounts (After seeding)

If you haven't seeded the database yet, sign up a new account:

1. Go to http://localhost:3000
2. Click "Sign up"
3. Fill in your details
4. Click "Sign Up"

### Or Seed Demo Data

```bash
cd server
npm run seed
```

Then login with:
- **Email**: admin@example.com
- **Password**: password123

## 📚 Common Tasks

### See all available routes

```bash
# Backend API
GET http://localhost:5000/api/health

# Frontend routes
http://localhost:3000/login
http://localhost:3000/signup
http://localhost:3000/dashboard
http://localhost:3000/projects
http://localhost:3000/tasks
http://localhost:3000/teams
```

### Troubleshooting

**MongoDB connection error?**
```bash
# Start MongoDB locally (Mac with brew)
brew services start mongodb-community

# Or use MongoDB Atlas connection string
# Update MONGODB_URI in .env
```

**Port already in use?**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

**Dependencies not installing?**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules server/node_modules client/node_modules

# Reinstall
npm run install:all
```

## 🎯 What to Try First

1. **Sign up** as a new user
2. **Create a project** (click "New Project")
3. **Add team members** to your project
4. **Create tasks** and assign to team members
5. **Update task status** through drag & drop or dropdown
6. **View dashboard** to see project stats
7. **Logout and login** as different users to see role-based access

## 📖 Learn More

- [Full README](./README.md) - Complete documentation
- [Deployment Guide](./DEPLOYMENT.md) - Deploy to Railway
- [API Documentation](./README.md#-api-endpoints) - All endpoints

## 🆘 Need Help?

### Check logs
```bash
# Terminal shows detailed errors
# Look for stack traces with line numbers
```

### Debug mode
```bash
# Open browser DevTools (F12)
# Check Console tab for frontend errors
# Check Network tab for API calls
```

### Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` in that directory |
| API 404 errors | Ensure backend is running on port 5000 |
| Blank page | Check browser console (F12) for errors |
| "Connection refused" | MongoDB not running or wrong connection string |

## 💡 Tips

- Keep two terminal windows open: one for backend, one for frontend
- Use browser DevTools to inspect API responses
- Check MongoDB Atlas for actual data stored
- Try different user roles to test access control
- Use the demo data seed to quickly populate database

---

**Happy coding!** 🎉

For production deployment, see [DEPLOYMENT.md](./DEPLOYMENT.md)
