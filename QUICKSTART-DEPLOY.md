# Quick Deploy Guide (5 Minutes)

The fastest way to deploy your app since Heroku is gone.

## Recommended: Railway (Easiest)

### Option A: Automated Script

```bash
cd salesforce-claude-emailer
./deploy-railway.sh
```

The script will:
1. Install Railway CLI if needed
2. Log you in to Railway
3. Prompt for your credentials
4. Set all environment variables
5. Deploy your app

### Option B: Manual Deploy (Web UI)

1. **Go to [railway.app](https://railway.app) and sign up**

2. **Click "New Project" → "Deploy from GitHub repo"**

3. **Connect your GitHub account and select this repo**

4. **Add environment variables** (Settings → Variables):
   ```
   SF_USERNAME=your-email@company.com
   SF_PASSWORD=your-password
   SF_SECURITY_TOKEN=your-token
   SF_LOGIN_URL=https://login.salesforce.com
   ANTHROPIC_API_KEY=sk-ant-xxxxx
   NODE_ENV=production
   PORT=3001
   ```

5. **Done!** Railway auto-deploys and gives you a URL

### Option C: CLI Only

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
cd salesforce-claude-emailer
railway init

# Set environment variables
railway variables set SF_USERNAME="your-email@company.com"
railway variables set SF_PASSWORD="your-password"
railway variables set SF_SECURITY_TOKEN="your-token"
railway variables set SF_LOGIN_URL="https://login.salesforce.com"
railway variables set ANTHROPIC_API_KEY="sk-ant-xxxxx"
railway variables set NODE_ENV="production"
railway variables set PORT="3001"

# Deploy
railway up

# Open in browser
railway open
```

---

## Alternative: Render (Also Easy)

1. **Go to [render.com](https://render.com) and sign up**

2. **Click "New +" → "Web Service"**

3. **Connect GitHub repository**

4. **Configure:**
   - Build Command: `npm run install:all && npm run build`
   - Start Command: `npm run start:production`

5. **Add environment variables** (same as above)

6. **Deploy** - Render gives you a `.onrender.com` URL

---

## Alternative: Vercel (Frontend Focused)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd salesforce-claude-emailer
vercel

# Follow prompts and add environment variables
```

---

## Testing Your Deployed App

Once deployed, test these URLs:

```bash
# Health check
curl https://your-app.railway.app/api/health

# Should return:
# {"status":"ok","salesforce":"connected","claude":"connected"}
```

Visit `https://your-app.railway.app` in browser to use the app.

---

## Cost Summary

### Hosting:
- **Railway**: FREE for first 500 hours/month (≈ $5/month after)
- **Render**: FREE tier (sleeps after 15 min inactivity)
- **Vercel**: FREE for hobby projects

### API Usage:
- **Claude API**: ~$0.03 per email
- **Salesforce API**: FREE (counts against org limits)

**Example**: 100 emails/day = ~$3/month in AI costs

---

## Troubleshooting

### Build fails:
Test locally first:
```bash
npm run build
cd server && NODE_ENV=production npm start
```

### Can't connect to Salesforce:
- Check environment variables are set correctly
- Visit `/api/health` to see connection status
- Verify credentials in Salesforce

### App doesn't load:
- Ensure `NODE_ENV=production` is set
- Check logs: `railway logs` or in Render dashboard
- Verify all environment variables are present

---

## Next Steps

1. ✅ Deploy the app
2. 🧪 Test all features on production URL
3. 🔗 Share link with your team
4. 📊 Monitor usage (Railway/Render dashboards)
5. 🎨 Add custom domain (optional)

For detailed deployment options, see `DEPLOYMENT.md`
