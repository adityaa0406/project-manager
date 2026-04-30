# 🆘 Troubleshooting Guide

Common issues and their solutions.

## 🚀 Startup Issues

### Issue: "Cannot find module" error
**Causes**: Dependencies not installed, wrong directory
**Solutions**:
```bash
# Install all dependencies
npm run install:all

# Or install in specific directory
cd server && npm install
cd ../client && npm install

# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules server/node_modules client/node_modules
npm run install:all
```

### Issue: Port already in use
**Causes**: Another process using port 3000 or 5000
**Solutions**:
```bash
# Mac/Linux - Kill process on port
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9

# Windows - Find process using port
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different ports
PORT=5001 npm run server:dev
```

### Issue: MongoDB connection error
**Error**: "MongooseError: Cannot connect to MongoDB"
**Causes**: MongoDB not running, wrong connection string
**Solutions**:
```bash
# Start MongoDB (Mac with Homebrew)
brew services start mongodb-community

# Start MongoDB (Windows)
# Go to Services and start MongoDB

# Check connection string in .env
MONGODB_URI=mongodb://localhost:27017/project-manager

# Or use MongoDB Atlas
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/project-manager
```

## 💻 Development Issues

### Issue: Changes not reflecting
**Causes**: Cache, hot reload not working
**Solutions**:
```bash
# Hard refresh browser
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)

# Clear browser cache
DevTools → Application → Clear Storage

# Restart development server
# Stop (Ctrl+C) and restart npm run dev
```

### Issue: API returning 404
**Causes**: Wrong endpoint, route not registered
**Solutions**:
```bash
# Test endpoint with curl
curl http://localhost:5000/api/health

# Check server console for route registration
# Should see all routes printed on startup

# Verify route file is imported in index.js
app.use('/api/auth', require('./routes/auth'));
```

### Issue: API returning 401 Unauthorized
**Causes**: Missing token, invalid token
**Solutions**:
```javascript
// Check token in localStorage
console.log(localStorage.getItem('token'));

// Re-login to get new token
// Or manually add token to request
const token = localStorage.getItem('token');
headers: {
  'Authorization': `Bearer ${token}`
}
```

### Issue: Authentication not working
**Error**: "Invalid credentials" even with correct email/password
**Solutions**:
```bash
# Check user exists in database
# MongoDB: db.users.find()

# Verify password hashing is working
# Check bcryptjs version in package.json

# Clear all users and re-signup
# Or seed fresh demo data
cd server && npm run seed
```

## 🎨 Frontend Issues

### Issue: Blank page or 404
**Causes**: Frontend not built, not served correctly
**Solutions**:
```bash
# Rebuild frontend
cd client && npm run build

# Check if index.html exists
ls -la client/dist/

# Verify server is serving static files
# Should see public folder in server directory
```

### Issue: Styling not showing
**Causes**: CSS files not loaded, import missing
**Solutions**:
```javascript
// Check CSS is imported in component
import './ComponentName.css';

// Verify CSS file exists in same directory
ls -la src/pages/

// Check for CSS errors in browser DevTools
// Open Console tab for any errors
```

### Issue: Form not submitting
**Causes**: Validation error, API error, event not prevented
**Solutions**:
```javascript
// Check console for errors
console.log('Form data:', formData);

// Verify form has proper onSubmit
<form onSubmit={handleSubmit}>

// Check API response
// F12 → Network tab → watch requests
```

## 🔐 Authentication Issues

### Issue: "Unauthorized" on protected route
**Causes**: Not logged in, token expired
**Solutions**:
```bash
# Login again to get new token
# Token expires after 7 days

# Check token in localStorage
localStorage.getItem('token')

# Verify JWT_SECRET matches
# Check .env JWT_SECRET value
```

### Issue: Can't access project/task as member
**Causes**: Not added to project, wrong permissions
**Solutions**:
```javascript
// Admin must add you to project first
// Or create project as admin

// Check your role
// Should be "Member" or "Admin"
console.log(user.role);
```

### Issue: Password not hashing correctly
**Causes**: bcryptjs not installed, pre-save hook not running
**Solutions**:
```bash
# Check bcryptjs is installed
npm list bcryptjs

# Reinstall if needed
npm install bcryptjs@^2.4.3

# Verify pre-save hook in User.js
userSchema.pre('save', async function(next) {
```

## 📊 Database Issues

### Issue: Can't connect to MongoDB Atlas
**Causes**: Wrong connection string, whitelist not set
**Solutions**:
```
# Connection string format
mongodb+srv://username:password@cluster-name.mongodb.net/database?retryWrites=true&w=majority

# Steps:
1. Create MongoDB Atlas account
2. Create cluster (free tier OK)
3. Create database user (NOT account user)
4. Click "Connect" → "Drivers"
5. Copy connection string
6. Update password in connection string
7. Add to .env MONGODB_URI
8. In Atlas → Network Access → Allow 0.0.0.0/0
```

### Issue: "Cannot insert duplicate" error
**Causes**: Unique index violation (email already exists)
**Solutions**:
```bash
# Delete user with duplicate email
# From MongoDB Compass or:
db.users.deleteOne({ email: "duplicate@example.com" })

# Or clear entire collection
db.users.deleteMany({})

# Re-signup with different email
```

### Issue: No data showing
**Causes**: Database empty, wrong database name
**Solutions**:
```bash
# Seed demo data
cd server && npm run seed

# Check MongoDB connection
# Open MongoDB Compass
# Verify you're in correct database

# Check collections exist
db.projects.find()
db.tasks.find()
db.users.find()
```

## 🚢 Deployment Issues

### Issue: Build fails on Railway
**Causes**: Dependencies missing, build script wrong
**Solutions**:
```bash
# Test build locally first
npm run build

# Check all dependencies in package.json
# Verify build script works locally

# Railway logs: Check build output
# Look for actual error message
```

### Issue: App shows blank page after deploy
**Causes**: Frontend not built, env vars not set
**Solutions**:
1. Check Railway logs for errors
2. Verify MONGODB_URI is set
3. Verify JWT_SECRET is set
4. Check frontend build completed
5. Verify static files in public folder

### Issue: API calls get 403 Forbidden
**Causes**: CORS issue, JWT not sent
**Solutions**:
```javascript
// In production, use relative URLs
const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';

// Token should be in localStorage
const token = localStorage.getItem('token');
if (!token) redirect to login;
```

## 🔧 Development Tools

### Debugging with DevTools
```javascript
// Network tab
// Monitor API requests
// Check response status

// Console tab
// Check for JavaScript errors
// Log variables: console.log(data)

// Application tab
// View localStorage
// Check cookies
// View indexed DB
```

### MongoDB Compass (GUI)
1. Download from mongodb.com/products/compass
2. Connect with connection string
3. Browse collections
4. View/edit documents
5. Run queries

### Postman (API Testing)
1. Download from postman.com
2. Import PostmanCollection.json
3. Set up environment variables
4. Test API endpoints
5. Check responses

## 📝 Logging

### Enable detailed logging
```javascript
// In server/index.js
console.log('🚀 Server starting...');
console.log('📊 Connecting to:', process.env.MONGODB_URI);
console.log('🔐 JWT_SECRET set:', !!process.env.JWT_SECRET);
```

### Check frontend logs
```javascript
// Browser Console (F12)
// Look for errors
// Check network requests
// Monitor component lifecycle
```

## 🆘 Still Stuck?

1. **Check error messages carefully**
   - Read full error text
   - Note the file and line number
   - Search error online

2. **Google the error**
   - Copy exact error message
   - Search on Stack Overflow
   - Check GitHub issues

3. **Isolate the problem**
   - Test one feature at a time
   - Create minimal reproduction
   - Verify each component works

4. **Check documentation**
   - README.md
   - QUICKSTART.md
   - RBAC.md
   - DEPLOYMENT.md

5. **Review recent changes**
   - What did you change last?
   - Revert and test
   - Make one change at a time

## 💡 Pro Tips

- Use `console.log()` liberally during development
- Keep browser DevTools open while coding
- Use breakpoints to pause execution
- Test API endpoints with Postman/curl first
- Check `.env` file frequently (common mistakes)
- Seed fresh demo data if stuck
- Restart servers if nothing works

## 📞 Getting Help

If all else fails:
1. Check all documentation files
2. Review the code comments
3. Search error message online
4. Create a minimal test case
5. Ask for help with error details

---

Remember: Most issues have simple solutions. Read error messages carefully!
