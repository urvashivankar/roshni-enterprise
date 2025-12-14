# Deployment Guide - Roshni Enterprise

This guide will walk you through deploying the Roshni Enterprise website to Vercel.

## Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **MongoDB Atlas Account** - For the database (if not already set up)

---

## Step 1: Prepare MongoDB Atlas

### 1.1 Create/Configure MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (if you haven't already)
3. Create a database user with password
4. **Important**: Whitelist all IPs for Vercel
   - Go to Network Access
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This is required for Vercel serverless functions

### 1.2 Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `roshni_enterprise`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/roshni_enterprise?retryWrites=true&w=majority
```

---

## Step 2: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Production ready deployment"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/roshni-enterprise.git

# Push to GitHub
git push -u origin main
```

---

## Step 3: Deploy to Vercel

### 3.1 Import Project

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the configuration

### 3.2 Configure Build Settings

Vercel should automatically detect the settings from `vercel.json`, but verify:

- **Framework Preset**: Other
- **Root Directory**: `./`
- **Build Command**: `cd frontend && npm run build`
- **Output Directory**: `frontend/dist`
- **Install Command**: `cd frontend && npm install && cd ../backend && npm install`

### 3.3 Configure Environment Variables

Click on "Environment Variables" and add the following:

#### Required Variables:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `MONGO_URI` | Your MongoDB connection string | `mongodb+srv://user:pass@cluster0.xxx.mongodb.net/roshni_enterprise?retryWrites=true&w=majority` |
| `JWT_SECRET` | A secure random string (32+ characters) | `your_super_secure_random_jwt_secret_key_here_32chars` |
| `EMAIL_USER` | Gmail address for notifications | `roshnienterprise01022024@gmail.com` |
| `EMAIL_PASS` | Gmail App Password (not regular password) | `xxxx xxxx xxxx xxxx` |
| `NODE_ENV` | Set to `production` | `production` |

#### How to Generate Gmail App Password:

1. Go to your Google Account settings
2. Security → 2-Step Verification (enable if not enabled)
3. App passwords → Generate new app password
4. Select "Mail" and "Other (Custom name)"
5. Copy the 16-character password
6. Use this in `EMAIL_PASS` (without spaces)

### 3.4 Deploy

1. Click "Deploy"
2. Wait for the build to complete (2-5 minutes)
3. Vercel will provide you with a deployment URL

---

## Step 4: Update CORS Configuration

After your first deployment, you'll have a Vercel URL like:
```
https://your-project-name.vercel.app
```

1. Go to your GitHub repository
2. Edit `backend/server.js`
3. Find the CORS configuration (around line 25)
4. Replace `'https://your-domain.vercel.app'` with your actual Vercel URL
5. Commit and push:
   ```bash
   git add backend/server.js
   git commit -m "Update CORS with production URL"
   git push
   ```
6. Vercel will automatically redeploy

---

## Step 5: Test Your Deployment

### 5.1 Test Frontend
- Visit your Vercel URL
- Check all pages load correctly
- Test navigation
- Check mobile responsiveness

### 5.2 Test Booking System
1. Fill out the booking form
2. Submit a test booking
3. Check if you receive an email notification
4. Verify the booking appears in the admin dashboard

### 5.3 Test Admin Dashboard
1. Go to `/admin`
2. Login with your admin credentials
3. Check if bookings are displayed
4. Test status updates

### 5.4 Check API Health
Visit: `https://your-vercel-url.vercel.app/api/health`

Should return:
```json
{
  "status": "ok",
  "timestamp": "2024-12-14T...",
  "environment": "production"
}
```

---

## Step 6: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to configure DNS
5. Update CORS in `backend/server.js` to include your custom domain

---

## Troubleshooting

### Build Fails

**Check Vercel logs:**
1. Go to Vercel dashboard
2. Click on the failed deployment
3. Check the build logs for errors

**Common issues:**
- Missing dependencies: Run `npm install` locally first
- TypeScript errors: Run `npm run build` locally to catch errors
- Environment variables: Ensure all required variables are set

### API Not Working

**Check:**
1. Environment variables are set correctly in Vercel
2. MongoDB Atlas allows connections from 0.0.0.0/0
3. CORS configuration includes your Vercel URL
4. Check Vercel function logs for errors

### Database Connection Issues

**Verify:**
1. MongoDB connection string is correct
2. Database user has correct permissions
3. IP whitelist includes 0.0.0.0/0
4. Database name is correct in connection string

### Email Not Sending

**Check:**
1. Gmail App Password is correct (not regular password)
2. 2-Step Verification is enabled on Gmail
3. `EMAIL_USER` and `EMAIL_PASS` are set in Vercel
4. Check Vercel function logs for email errors

---

## Monitoring

### Vercel Dashboard
- Monitor deployment status
- View function logs
- Check analytics
- Monitor bandwidth usage

### MongoDB Atlas
- Monitor database connections
- Check query performance
- View storage usage

---

## Updating Your Site

After making changes:

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push
```

Vercel will automatically detect the push and redeploy!

---

## Security Checklist

- ✅ All sensitive data in environment variables
- ✅ `.env` files in `.gitignore`
- ✅ CORS properly configured
- ✅ JWT secret is secure and random
- ✅ MongoDB connection uses authentication
- ✅ Gmail uses App Password, not regular password
- ✅ HTTPS enabled (automatic with Vercel)

---

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check MongoDB Atlas logs
3. Test API endpoints using `/api/health`
4. Verify all environment variables are set
5. Check browser console for frontend errors

---

## Production URLs

After deployment, your site will be available at:

- **Main Site**: `https://your-project.vercel.app`
- **Admin Login**: `https://your-project.vercel.app/admin`
- **API Health**: `https://your-project.vercel.app/api/health`

---

**Congratulations! Your website is now live! 🎉**
