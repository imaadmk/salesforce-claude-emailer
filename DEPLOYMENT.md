# Deployment Guide

Since Heroku has changed, here are the best modern alternatives for deploying your Salesforce AI Email Generator.

## Option 1: Railway (Recommended - Easiest)

Railway is the closest Heroku replacement with a generous free tier.

### Steps:

1. **Sign up at [railway.app](https://railway.app)**

2. **Create a new project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account and select your repository

3. **Set environment variables**
   In Railway dashboard → Variables, add:
   ```
   SF_USERNAME=your-email@company.com
   SF_PASSWORD=your-password
   SF_SECURITY_TOKEN=your-token
   SF_LOGIN_URL=https://login.salesforce.com
   ANTHROPIC_API_KEY=sk-ant-xxxxx
   NODE_ENV=production
   PORT=3001
   ```

4. **Deploy**
   - Railway will automatically detect the build and start commands
   - Your app will be live at `https://your-app.railway.app`

### Railway CLI Deploy:
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

---

## Option 2: Render

Free tier with automatic deploys from GitHub.

### Steps:

1. **Sign up at [render.com](https://render.com)**

2. **Create a new Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: salesforce-emailer
     - **Environment**: Node
     - **Build Command**: `npm run install:all && npm run build`
     - **Start Command**: `npm run start:production`
     - **Plan**: Free

3. **Add environment variables** in Render dashboard

4. **Deploy** - Render automatically deploys on push to main

---

## Option 3: Vercel (Best for Frontend-Heavy Apps)

Vercel is optimized for React/Next.js but can handle the backend too.

### Steps:

1. **Sign up at [vercel.com](https://vercel.com)**

2. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   cd salesforce-claude-emailer
   vercel
   ```

3. **Follow prompts**
   - Link to GitHub repo (optional)
   - Set up project
   - Add environment variables

4. **Configure vercel.json** (already created below)

---

## Option 4: DigitalOcean App Platform

$5/month but very reliable and scalable.

### Steps:

1. **Sign up at [digitalocean.com](https://www.digitalocean.com/products/app-platform)**

2. **Create App**
   - Connect GitHub repository
   - DigitalOcean auto-detects Node.js
   - Set build command: `npm run install:all && npm run build`
   - Set run command: `npm run start:production`

3. **Add environment variables**

4. **Deploy** - $5/month for basic tier

---

## Option 5: Fly.io

Great for Docker-based deployments, generous free tier.

### Steps:

1. **Install Fly CLI**
   ```bash
   curl -L https://fly.io/install.sh | sh
   fly auth signup
   ```

2. **Initialize and deploy**
   ```bash
   cd salesforce-claude-emailer
   fly launch
   ```

3. **Set secrets**
   ```bash
   fly secrets set SF_USERNAME=your-email@company.com
   fly secrets set SF_PASSWORD=your-password
   fly secrets set SF_SECURITY_TOKEN=your-token
   fly secrets set ANTHROPIC_API_KEY=sk-ant-xxxxx
   ```

4. **Deploy**
   ```bash
   fly deploy
   ```

---

## Quick Comparison

| Platform | Free Tier | Ease of Use | Best For |
|----------|-----------|-------------|----------|
| **Railway** | Yes (500hrs) | ⭐⭐⭐⭐⭐ | Quick demos, Heroku refugees |
| **Render** | Yes | ⭐⭐⭐⭐ | Production apps |
| **Vercel** | Yes | ⭐⭐⭐⭐⭐ | Frontend-first apps |
| **DigitalOcean** | No ($5/mo) | ⭐⭐⭐ | Scalable production |
| **Fly.io** | Yes (limited) | ⭐⭐⭐ | Docker lovers |

---

## Pre-Deployment Checklist

Before deploying, make sure:

- [ ] `.env` file is NOT committed (check `.gitignore`)
- [ ] All environment variables are documented
- [ ] Build scripts work locally:
  ```bash
  npm run build
  NODE_ENV=production npm run start:production
  ```
- [ ] Test the production build locally
- [ ] Health check endpoint works: `/api/health`

---

## Testing Production Build Locally

```bash
# Build everything
npm run build

# Start in production mode
cd server
NODE_ENV=production npm start
```

Then visit `http://localhost:3001` - you should see the React app served by the Express server.

---

## Environment Variables Reference

All platforms need these environment variables:

```
SF_USERNAME=your-salesforce-email@company.com
SF_PASSWORD=your-salesforce-password
SF_SECURITY_TOKEN=your-security-token-from-email
SF_LOGIN_URL=https://login.salesforce.com
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
NODE_ENV=production
PORT=3001
```

---

## Custom Domain Setup

### Railway:
Settings → Domains → Generate Domain or Add Custom Domain

### Render:
Settings → Custom Domains → Add Custom Domain

### Vercel:
Project Settings → Domains → Add Domain

---

## Monitoring & Logs

### Railway:
- View logs in real-time: Dashboard → Deployments → Logs
- Or CLI: `railway logs`

### Render:
- Dashboard → Logs tab
- Automatic log retention

### Vercel:
- Dashboard → Deployments → View Logs
- Or CLI: `vercel logs`

---

## Cost Estimates

### For a demo/small production app:

- **Railway**: Free for 500 hours/month (~$5/month after)
- **Render**: Free tier available (spins down after inactivity)
- **Vercel**: Free for hobby projects
- **DigitalOcean**: $5/month minimum
- **Fly.io**: Free tier covers small apps

### API Costs (separate from hosting):
- Claude API: ~$0.03 per email generated
- Salesforce API: Free (counts against org limits)

**Example**: 100 emails/day = $3/month in AI costs

---

## Troubleshooting

### Build fails:
```bash
# Test locally first
npm run install:all
npm run build
```

### Can't connect to Salesforce:
- Check environment variables are set
- Test with `/api/health` endpoint
- Verify IP isn't blocked in Salesforce

### Frontend not loading:
- Ensure `NODE_ENV=production` is set
- Check build output includes client files
- Verify server serves static files (see server.ts)

---

## Recommended Setup for Demos

**Use Railway** because:
- Fastest setup (5 minutes)
- Free tier is generous
- Easy to share URLs
- Good performance
- Simple to update (just `git push`)

---

## Next Steps After Deployment

1. Test all features on deployed URL
2. Share demo link with stakeholders
3. Monitor usage and costs
4. Set up custom domain (optional)
5. Configure auto-deploy on git push
6. Add monitoring/alerting (optional)

---

## Support

Each platform has great documentation:
- Railway: [docs.railway.app](https://docs.railway.app)
- Render: [render.com/docs](https://render.com/docs)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- DigitalOcean: [docs.digitalocean.com](https://docs.digitalocean.com/products/app-platform/)
- Fly.io: [fly.io/docs](https://fly.io/docs)
