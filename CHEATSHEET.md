# 🎯 Deployment Cheat Sheet (Copy & Paste Commands)

Quick reference - just copy the commands and paste them in terminal!

## 🔵 LOCAL SETUP (Run These Commands)

### 1. Navigate to Project
```bash
cd /Users/aditya/Documents/Ethara\ AI/project-manager
```

### 2. Create .env File
```bash
cat > .env << 'EOF'
MONGODB_URI=mongodb://localhost:27017/project-manager
PORT=5000
NODE_ENV=development
JWT_SECRET=dev_secret_key_change_in_production
JWT_EXPIRE=7d
VITE_API_URL=http://localhost:5000/api
EOF
```

### 3. Install Dependencies
```bash
npm run install:all
```

### 4. Start Application
```bash
npm run dev
```

**Then open browser:**
```
http://localhost:3000
```

### 5. Seed Demo Data (Optional)
```bash
cd server
npm run seed
```

**Demo accounts:**
- Email: admin@example.com
- Password: password123

---

## 🟢 GITHUB SETUP (Push Code to GitHub)

**Prerequisites:**
- Create account at https://github.com
- Create repository called `project-manager`

**Then run these commands:**

### 1. Initialize Git
```bash
git init
```

### 2. Add All Files
```bash
git add .
```

### 3. First Commit
```bash
git commit -m "Initial commit"
```

### 4. Add GitHub Remote
```bash
git remote add origin https://github.com/YOUR_USERNAME/project-manager.git
```
(Replace `YOUR_USERNAME` with your GitHub username)

### 5. Push to GitHub
```bash
git branch -M main
git push -u origin main
```

When asked for password:
- Use your GitHub username and password
- Or generate token at github.com/settings/tokens

---

## 🔴 RAILWAY DEPLOYMENT (Go Live)

**Prerequisites:**
- GitHub repo with code
- MongoDB Atlas connection string

**Steps:**

### 1. Go to Railway
```
https://railway.app
```

### 2. Login with GitHub
- Click "Start Free"
- "Continue with GitHub"
- Click "Authorize"

### 3. Create New Project
- Click "New Project"
- "Deploy from GitHub repo"
- Select `project-manager`
- Click "Deploy"

### 4. Add Environment Variables (While Deploying)
In Railway dashboard → "Variables" tab

Add these variables:
```
MONGODB_URI=mongodb+srv://admin:PASSWORD@cluster-name.mongodb.net/project-manager?retryWrites=true&w=majority
```
(Replace with YOUR MongoDB Atlas connection string)

```
JWT_SECRET=production_secret_key_2024
NODE_ENV=production
PORT=3000
```

### 5. Wait for Deployment
- Check "Deployments" tab
- Should see green checkmark
- Takes 3-5 minutes

### 6. Get Your Live URL
- Go to "Settings" → "Domains"
- Copy the `.up.railway.app` URL
- **This is your live app!**

---

## 📊 MongoDB Atlas Setup

**If not done yet:**

### 1. Create Account
```
https://www.mongodb.com/cloud/atlas
Click "Sign Up Free"
```

### 2. Create Cluster
- Click "Create"
- Select "Shared" (Free)
- Choose region
- Click "Create Cluster"
- Wait 5 minutes

### 3. Create User
- Left menu → "Database Access"
- "Add New Database User"
- Username: `admin`
- Password: `MyPassword123` (save it!)
- Click "Add User"

### 4. Allow Network Access
- Left menu → "Network Access"
- "Add IP Address"
- "Allow Access from Anywhere"
- "Confirm"

### 5. Get Connection String
- Left menu → "Databases"
- "Connect"
- "Drivers" → "Node.js"
- Copy connection string
- **Replace PASSWORD with your password**

---

## 🆘 Troubleshooting Commands

### Check if Node Installed
```bash
node --version
npm --version
```

### Check if MongoDB Running (Local)
```bash
mongod --version
```

### Kill Process on Port
```bash
# Port 3000
lsof -ti:3000 | xargs kill -9

# Port 5000
lsof -ti:5000 | xargs kill -9
```

### Test Backend API
```bash
curl http://localhost:5000/api/health
```

### View Git Status
```bash
git status
```

### View Recent Commits
```bash
git log --oneline
```

### Reinstall Dependencies
```bash
rm -rf node_modules server/node_modules client/node_modules
npm run install:all
```

### Clear npm Cache
```bash
npm cache clean --force
```

---

## 📝 Important Files to Remember

### .env File
- **Location:** Project root
- **Contains:** Database connection, secret keys
- **Never commit:** Add to .gitignore

### package.json
- **Defines:** Dependencies and scripts
- **Don't edit:** Unless adding new packages

### server/index.js
- **Backend entry point**
- **Starts API server**

### client/src/main.jsx
- **Frontend entry point**
- **React app starts here**

---

## ✅ Verification Commands

### Local App Running?
```bash
# Open in browser
http://localhost:3000

# Or test API
curl http://localhost:5000/api/health
```

### Code on GitHub?
```bash
# Check remote
git remote -v

# View branches
git branch -a
```

### App Deployed?
```bash
# Go to Railway dashboard
# Check Deployments tab for green checkmark
# Click "View" to see live app
```

---

## 🔄 Update Code After Deployment

**If you make changes:**

```bash
# 1. Make changes in code

# 2. Commit changes
git add .
git commit -m "Description of changes"

# 3. Push to GitHub
git push

# 4. Railway auto-deploys (wait 2-3 min)
```

---

## 🎯 Complete Workflow (Copy & Paste All)

### Local Setup
```bash
cd /Users/aditya/Documents/Ethara\ AI/project-manager
npm run install:all
npm run dev
```

### Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/project-manager.git
git branch -M main
git push -u origin main
```

### Verify
- Open http://localhost:3000 ✅
- Test signup/login ✅
- Check GitHub repo ✅
- Go to Railway and deploy ✅
- Test live URL ✅

---

## 🔑 Key Secrets (Save These!)

```
MongoDB Atlas:
- Username: admin
- Password: [Your password]
- Connection string: mongodb+srv://admin:PASSWORD@...

GitHub:
- Username: [Your username]
- Password: [Your password or token]

Railway:
- JWT_SECRET: production_secret_key_2024
- MongoDB URI: [Your connection string]
```

---

## 📞 When Something Goes Wrong

1. **Check terminal output** - Error message often visible
2. **Check Railway logs** - Deployment → Logs tab
3. **Read error message** - Copy exact error
4. **Search the error** - Google it
5. **Check TROUBLESHOOTING.md** - Common issues

---

## 💡 Quick Tips

- **Bookmark these URLs:**
  - Local: http://localhost:3000
  - Live: https://your-url.railway.app
  - GitHub: https://github.com/YOUR_USERNAME/project-manager
  - Railway: https://railway.app

- **If deployment fails:**
  - Check MongoDB connection string
  - Verify all env variables set
  - Check Railway logs for error

- **If app shows blank page:**
  - Hard refresh: Cmd+Shift+R (Mac)
  - Clear browser cache
  - Check Railway logs

- **If API not working:**
  - Verify PORT=3000 in Railway
  - Check MONGODB_URI is set
  - Verify JWT_SECRET is set

---

**You now have everything you need!** 🚀

Copy commands, run them, and your app will be live!

Questions? Check:
- BEGINNER_GUIDE.md
- DEPLOYMENT_VIDEO.md
- TROUBLESHOOTING.md
