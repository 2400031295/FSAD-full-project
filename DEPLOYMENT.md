# Deployment Guide: Vercel + Render

## Frontend Deployment (Vercel)

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/assignment-hub.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up and click "New Project"
   - Import your GitHub repository
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Leave environment variables empty for now
   - Click "Deploy"

3. **Get your Vercel URL** (e.g., `https://assignment-hub.vercel.app`)

## Backend Deployment (Render.com)

1. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Sign up or login
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Name: `assignment-hub-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm run start:backend`
   - Plan: `Free`
   - Click "Create Web Service"

2. **Get your Render backend URL** (e.g., `https://assignment-hub-backend.onrender.com`)

## Update Frontend API URL

1. **In Vercel Dashboard** (for your deployed frontend):
   - Project Settings → Environment Variables
   - Add new variable:
     ```
     VITE_API_URL=https://assignment-hub-backend.onrender.com
     ```
   - Redeploy the project

2. **Update API calls in frontend code**:
   - Change `/api` calls to use the full URL in production
   - This is already configured in `vite.config.ts`

## Verify Deployment

- Frontend: `https://assignment-hub.vercel.app`
- Backend: `https://assignment-hub-backend.onrender.com/api/status`

**Note**: Free tier on Render may have cold start delays (first request takes 30-50 seconds after inactivity).
