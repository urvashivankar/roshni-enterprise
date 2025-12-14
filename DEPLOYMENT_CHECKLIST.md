# 🚀 Vercel Deployment Checklist

Use this checklist to ensure a smooth deployment to Vercel.

## ☑️ Pre-Deployment

### Code Preparation
- [ ] All code changes committed
- [ ] Frontend builds successfully (`cd frontend && npm run build`)
- [ ] No console errors in development
- [ ] All features tested locally

### GitHub
- [ ] Code pushed to GitHub repository
- [ ] Repository is accessible
- [ ] Main/master branch is up to date

### MongoDB Atlas
- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] Network Access configured (0.0.0.0/0 - Allow from Anywhere)
- [ ] Connection string copied and ready

### Gmail Configuration
- [ ] 2-Step Verification enabled on Gmail
- [ ] App Password generated (16 characters)
- [ ] App Password copied and ready

---

## ☑️ Vercel Deployment

### Import Project
- [ ] Logged into Vercel
- [ ] Clicked "Add New Project"
- [ ] Imported GitHub repository
- [ ] Vercel detected configuration

### Environment Variables
Set these in Vercel dashboard:

- [ ] `MONGO_URI` - MongoDB connection string
- [ ] `JWT_SECRET` - Secure random string (32+ chars)
- [ ] `EMAIL_USER` - Gmail address
- [ ] `EMAIL_PASS` - Gmail App Password (16 chars)
- [ ] `NODE_ENV` - Set to "production"

### Deploy
- [ ] Clicked "Deploy"
- [ ] Waited for build to complete
- [ ] No build errors
- [ ] Deployment successful
- [ ] Copied deployment URL

---

## ☑️ Post-Deployment

### Update CORS
- [ ] Opened `backend/server.js` in editor
- [ ] Updated line 25 with actual Vercel URL
- [ ] Committed changes
- [ ] Pushed to GitHub
- [ ] Vercel automatically redeployed

### Testing

#### Frontend Tests
- [ ] Homepage loads correctly
- [ ] All sections visible (Hero, Services, Pricing, etc.)
- [ ] Navigation works
- [ ] Mobile menu works
- [ ] WhatsApp button works
- [ ] All links work

#### Booking System
- [ ] Booking form displays
- [ ] Can select service
- [ ] Can select date and time
- [ ] Can enter customer details
- [ ] Form submits successfully
- [ ] Confirmation dialog appears
- [ ] Email notification received

#### Admin Dashboard
- [ ] Can access `/admin` page
- [ ] Login form displays
- [ ] Can login with credentials
- [ ] Dashboard loads
- [ ] Bookings display correctly
- [ ] Can update booking status

#### API Tests
- [ ] `/api/health` returns success
- [ ] `/api/bookings` works (POST)
- [ ] `/api/auth/login` works (POST)

### Performance
- [ ] Page loads quickly
- [ ] No console errors
- [ ] Images load properly
- [ ] Animations work smoothly

---

## ☑️ Optional Enhancements

### Custom Domain
- [ ] Domain purchased
- [ ] Added to Vercel project
- [ ] DNS configured
- [ ] SSL certificate active
- [ ] Updated CORS with custom domain

### Monitoring
- [ ] Checked Vercel Analytics
- [ ] Reviewed function logs
- [ ] Monitored MongoDB connections
- [ ] Set up error alerts

---

## 🎉 Launch

- [ ] All tests passed
- [ ] Shared URL with stakeholders
- [ ] Documented any issues
- [ ] Celebrated successful deployment! 🎊

---

## 📝 Deployment Information

Fill this out after deployment:

**Deployment Date**: _______________

**Vercel URL**: _______________

**Custom Domain** (if any): _______________

**Admin Credentials**:
- Username: _______________
- Password: _______________ (keep secure!)

**MongoDB Cluster**: _______________

**Gmail Account**: _______________

---

## 🆘 Troubleshooting

If something doesn't work:

1. **Check Vercel Logs**
   - Go to Vercel dashboard
   - Click on deployment
   - View function logs

2. **Verify Environment Variables**
   - All 5 variables set correctly
   - No typos in values
   - No extra spaces

3. **Check MongoDB**
   - IP whitelist includes 0.0.0.0/0
   - Connection string is correct
   - Database user has permissions

4. **Test API Directly**
   - Visit `/api/health`
   - Should return JSON with status "ok"

5. **Browser Console**
   - Open Developer Tools
   - Check Console for errors
   - Check Network tab for failed requests

---

## 📚 Resources

- [QUICKSTART.md](./QUICKSTART.md) - Quick deployment guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide
- [README.md](./README.md) - Project documentation

---

**Good luck with your deployment! 🚀**
