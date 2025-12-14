# Quick Start Guide - Roshni Enterprise

## 🚀 Deploy to Vercel in 5 Minutes

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Production ready"
git push origin main
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repo
4. Click "Deploy" (Vercel auto-detects settings)

### Step 3: Add Environment Variables
In Vercel dashboard, add these variables:

```
MONGO_URI=mongodb+srv://urvashiparmar1603_db_user:falak1603@cluster0.qyibi3z.mongodb.net/roshni_enterprise?retryWrites=true&w=majority
JWT_SECRET=roshni_secret_key_2024
EMAIL_USER=roshnienterprise01022024@gmail.com
EMAIL_PASS=your_gmail_app_password_here
NODE_ENV=production
```

### Step 4: Update CORS (After First Deploy)
1. Get your Vercel URL (e.g., `https://your-project.vercel.app`)
2. Edit `backend/server.js` line 25
3. Replace `'https://your-domain.vercel.app'` with your actual URL
4. Commit and push

### Step 5: Configure MongoDB Atlas
1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Save

### Step 6: Test Your Site
- Visit your Vercel URL
- Test booking form
- Login to admin at `/admin`
- Check `/api/health`

---

## 📋 Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB allows connections from 0.0.0.0/0
- [ ] Gmail App Password generated (not regular password)
- [ ] All environment variables ready

---

## 🔑 Environment Variables Quick Reference

| Variable | Where to Get It |
|----------|----------------|
| `MONGO_URI` | MongoDB Atlas → Connect → Connection String |
| `JWT_SECRET` | Any random 32+ character string |
| `EMAIL_USER` | Your Gmail address |
| `EMAIL_PASS` | Google Account → Security → App Passwords |
| `NODE_ENV` | Set to `production` |

---

## 🎯 Post-Deployment

After deployment:
1. Update CORS with your Vercel URL
2. Test all features
3. Create admin user: `cd backend && node create_admin.js`
4. Share your live URL!

---

## 📱 Your Live URLs

- **Website**: `https://your-project.vercel.app`
- **Admin**: `https://your-project.vercel.app/admin`
- **API Health**: `https://your-project.vercel.app/api/health`

---

## 🆘 Quick Troubleshooting

**Build fails?**
- Check Vercel build logs
- Run `npm run build` locally first

**API not working?**
- Verify all environment variables in Vercel
- Check MongoDB allows 0.0.0.0/0
- Update CORS with your Vercel URL

**Email not sending?**
- Use Gmail App Password, not regular password
- Enable 2-Step Verification on Gmail

---

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)
