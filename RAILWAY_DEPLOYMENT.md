# Railway Deployment Guide

## Problem Fixed
Railway was trying to use Bun with an outdated lockfile, causing the deployment to fail with:
```
error: lockfile had changes, but lockfile is frozen
```

## Solution Applied
Configured Railway to use npm instead of Bun by creating:
1. `nixpacks.toml` - Forces Railway to use npm
2. `railway.json` - Railway-specific configuration
3. `Procfile` - Defines the start command
4. Updated `package.json` preview script to work with Railway's PORT variable

## Deployment Steps

### Option 1: Deploy via Railway Dashboard (Recommended)

1. **Push your changes to Git:**
   ```bash
   git add .
   git commit -m "Configure Railway deployment with npm"
   git push origin main
   ```

2. **In Railway Dashboard:**
   - Go to your project
   - Click "Settings" → "Environment"
   - Add environment variable (if needed):
     - `NODE_VERSION` = `20`
   
3. **Redeploy:**
   - Railway will automatically detect the changes and redeploy
   - Or manually trigger: "Deployments" → "Deploy"

### Option 2: Deploy via Railway CLI

```bash
# Install Railway CLI (if not installed)
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Deploy
railway up
```

## Important Notes

### Git LFS for 3D Model
Your `sofa_and_lamp.glb` file (254MB) is stored in Git LFS. Railway should handle this automatically, but if the model doesn't appear:

1. **Check Railway Logs:**
   ```bash
   railway logs
   ```

2. **Verify the file exists in deployment:**
   - Check if `/public/sofa_and_lamp.glb` is in the build output

3. **Alternative: Use External CDN**
   If Git LFS doesn't work on Railway, host the GLB file on:
   - Cloudinary
   - AWS S3
   - Vercel Blob
   - Railway Volumes (for persistent storage)

### Environment Variables
Railway automatically provides:
- `PORT` - The port your app should listen on
- `RAILWAY_ENVIRONMENT` - Current environment (production/staging)

### Build Configuration
The build process:
1. Install dependencies: `npm install`
2. Build the app: `npm run build`
3. Start preview server: `npm run preview`

### Troubleshooting

**If deployment still fails:**

1. **Check build logs in Railway dashboard**
2. **Verify Node version:**
   - Add `NODE_VERSION=20` in Railway environment variables

3. **If you want to use Bun instead:**
   - Delete `nixpacks.toml`, `railway.json`, and `Procfile`
   - Update bun.lockb:
     ```bash
     # Locally (if you have Bun installed)
     bun install
     git add bun.lockb
     git commit -m "Update bun lockfile"
     git push
     ```

4. **Check if the 3D model loads:**
   - Open browser console on deployed site
   - Look for model loading errors
   - Check Network tab for 404 errors on `sofa_and_lamp.glb`

### Performance Tips

1. **Enable compression** - Railway automatically handles this
2. **Optimize the GLB file** - 254MB is quite large:
   ```bash
   npx gltf-transform optimize input.glb output.glb --compress
   ```
3. **Use CDN for static assets** - Consider Railway's CDN or Cloudflare

## Verification

After deployment:
1. Visit your Railway URL
2. Open DevTools (F12)
3. Check Console for model loading messages
4. Check Network tab for the GLB file request
5. Verify the 3D sofa appears and animates correctly

## Railway vs Vercel

Both platforms are configured now:
- **Vercel**: Uses `vercel.json` with Git LFS enabled
- **Railway**: Uses `nixpacks.toml` with npm

You can deploy to both and see which works better for your large 3D model file.
