# Deployment Guide for Railway

## Prerequisites
- GitHub account with repository
- Railway account (free tier available)
- MongoDB Atlas account (free tier available)

## Step 1: Prepare MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (M0 free tier)
4. Create a database user with username and password
5. Whitelist your IP address or allow all (0.0.0.0/0)
6. Get your connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/project-manager?retryWrites=true&w=majority
   ```

## Step 2: Prepare Your Code

1. Initialize Git repository:
```bash
cd project-manager
git init
git add .
git commit -m "Initial commit"
```

2. Create GitHub repository and push:
```bash
git remote add origin https://github.com/your-username/project-manager.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy on Railway

1. Go to [railway.app](https://railway.app)
2. Sign up or login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Authorize GitHub and select your repository
5. Railway will automatically detect it's a Node.js project

## Step 4: Configure Environment Variables

In Railway Dashboard:
1. Go to your project → Project Settings
2. Add these variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/project-manager?retryWrites=true&w=majority
   NODE_ENV=production
   JWT_SECRET=[Generate a random secure string]
   JWT_EXPIRE=7d
   PORT=3000
   ```

## Step 5: Build Configuration

Railway should automatically:
1. Detect package.json and install dependencies
2. Run the build script
3. Run `npm start` to start the server

The build process will:
- Install server dependencies
- Install client dependencies
- Build React frontend
- Move frontend build to server/public folder

## Step 6: First Deployment

1. Click "Deploy" in Railway
2. Wait for build to complete (takes 2-5 minutes)
3. Once deployed, you'll get a URL like: https://project-manager.up.railway.app
4. Test the application:
   - Sign up a new account
   - Create a project
   - Add tasks
   - Check dashboard

## Step 7: Configure Custom Domain (Optional)

1. In Railway Dashboard → Project Settings
2. Go to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Troubleshooting

### Build Fails
- Check that all dependencies are in package.json
- Ensure build script in root package.json runs correctly locally
- Check logs in Railway dashboard

### App doesn't load
- Check MongoDB connection string in environment variables
- Ensure JWT_SECRET is set
- Check server logs for errors

### Frontend shows 404
- Verify client build completed (check logs)
- Ensure Express is serving static files correctly
- Check that dist folder exists in server/public

## Monitoring & Updates

1. **View Logs**: Railway Dashboard → Logs
2. **Monitor Performance**: Railway Dashboard → Monitoring
3. **Update Code**: Push to GitHub, Railway auto-deploys
4. **Scale**: Go to Project Settings → Instance Type

## Cost Optimization

Railway free tier includes:
- $5 credit per month
- Limited to 1 shared CPU, 512MB RAM

For production:
- Consider upgrading instance type
- Monitor bandwidth usage
- Enable autoscaling if needed

## Next Steps

After successful deployment:
1. Share the live URL
2. Gather feedback
3. Monitor usage and performance
4. Make improvements based on user feedback

---

For more Railway documentation: [docs.railway.app](https://docs.railway.app)
