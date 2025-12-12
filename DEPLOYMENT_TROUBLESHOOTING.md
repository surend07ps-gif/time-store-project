# 🛠️ Deployment Troubleshooting Guide

This guide will help you diagnose and fix common issues that might cause your website to not load properly after deployment.

## 🔍 Diagnosing the Problem

### 1. Check if the website is actually deployed

Sometimes there's a delay between deployment and the website going live:

1. Go to your Vercel dashboard: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Find your project ("time-store" or similar)
3. Check the deployment status - it should show "Ready" or "Success"
4. Click on the latest deployment to see detailed logs

### 2. Check browser console for errors

Open your website in a browser and press F12 to open developer tools:

1. Click on the "Console" tab
2. Refresh the page
3. Look for any red error messages
4. Common errors:
   - `404` errors (file not found)
   - `Failed to load resource` messages
   - JavaScript errors

### 3. Check the Network tab

1. Press F12 and go to the "Network" tab
2. Refresh the page
3. Look for failed requests (shown in red)
4. Check if index.html loads correctly

## 🚨 Common Issues and Solutions

### Issue: Blank White Page

**Symptoms**: Website shows a blank white page or only the background color

**Possible Causes and Fixes**:

1. **Routing Issues**:
   - Make sure `vercel.json` exists with proper rewrite rules
   - Check that `BrowserRouter` is properly configured in your React app
   - Ensure `base` is set correctly in `vite.config.ts`

2. **JavaScript Errors**:
   - Check browser console for JavaScript errors
   - Look for missing environment variables
   - Verify all dependencies are properly installed

3. **Missing Assets**:
   - Check if images and CSS files are loading
   - Verify favicon files exist in the public directory

### Issue: 404 Error on Refresh

**Symptoms**: Website works when navigating from homepage, but shows 404 when refreshing any page or accessing directly

**Fix**: 
- Ensure `vercel.json` has proper rewrite rules:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Issue: Website Loads but Content is Missing

**Symptoms**: Layout shows but images, text, or data is missing

**Possible Causes and Fixes**:

1. **Supabase Connection Issues**:
   - Check environment variables in Vercel dashboard
   - Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are set correctly
   - Ensure Supabase database and storage buckets have proper permissions

2. **Environment Variables Not Set**:
   - Go to Vercel project → Settings → Environment Variables
   - Make sure all required variables are added:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_PUBLISHABLE_KEY`
     - `VITE_CONTACT_EMAIL`
     - `VITE_CONTACT_PHONE`
     - `VITE_CONTACT_WHATSAPP`

3. **CORS Issues**:
   - Check browser console for CORS errors
   - Ensure Supabase is configured to allow your domain

## 🔧 How to Redeploy After Making Changes

1. Commit your changes to GitHub:
   ```
   git add .
   git commit -m "Fix deployment issues"
   git push origin main
   ```

2. Vercel will automatically detect the changes and start a new deployment

3. Wait for deployment to complete (usually 1-2 minutes)

4. Check the deployment logs if issues persist

## 🧪 Testing Locally Before Deployment

Always test your fixes locally before deploying:

1. Build your project:
   ```
   npm run build
   ```

2. Preview the build:
   ```
   npm run preview
   ```

3. Open `http://localhost:4173` in your browser
4. Test navigation, images, and all functionality

## 📋 Deployment Checklist

Before deploying, make sure you've completed all these steps:

- [ ] `vercel.json` file exists with proper rewrite rules
- [ ] `vite.config.ts` has correct base path
- [ ] All environment variables are set in Vercel dashboard
- [ ] Favicon files exist in public directory
- [ ] `index.html` has proper meta tags
- [ ] Tested locally with `npm run build` and `npm run preview`
- [ ] Committed all changes to GitHub

## 🆘 If Nothing Else Works

1. **Redeploy from scratch**:
   - Delete the project from Vercel
   - Create a new project and import from GitHub again
   - Make sure to set all environment variables

2. **Check Vercel Logs**:
   - Go to your project in Vercel dashboard
   - Click on the latest deployment
   - Check the build logs and deployment logs for errors

3. **Verify GitHub Repository**:
   - Make sure all files are committed and pushed to GitHub
   - Check that the correct branch is being deployed

4. **Contact Support**:
   - Vercel has excellent support through their dashboard
   - GitHub Discussions for React/Vite related issues

## 📞 Need More Help?

If you're still experiencing issues:

1. Take screenshots of:
   - The error page
   - Browser console (F12 → Console tab)
   - Network tab showing failed requests
   - Vercel deployment logs

2. Share these with someone technical or post in developer forums

3. Try deploying to Netlify as an alternative to see if the issue is Vercel-specific

Remember: Deployment issues are common and usually have simple fixes. Don't get discouraged!