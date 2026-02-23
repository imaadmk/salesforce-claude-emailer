# Salesforce AI Email Generator

An AI-powered web application that generates personalized sales emails using Salesforce opportunity data and Claude AI. Perfect for sales demos and showing the power of AI-enhanced workflows.

## Features

- **Salesforce Integration**: Automatically fetches open opportunities from your Salesforce org
- **AI-Powered Email Generation**: Uses Claude to create contextual, personalized emails
- **Smart Context**: Leverages opportunity details (company, industry, deal size, stage) for relevance
- **Custom Instructions**: Add specific guidance for email tone and content
- **Modern UI**: Clean, responsive interface with Salesforce branding
- **Fast & Reliable**: Built with TypeScript for type safety and reliability

## Demo Workflow

1. Application displays list of open opportunities from Salesforce
2. User selects an opportunity (e.g., "Acme Corp - Enterprise Deal - $250K")
3. Opportunity details are shown with context
4. User clicks "Generate Personalized Email"
5. AI generates a professional, contextual email in seconds
6. User can copy to clipboard or generate variations

## Tech Stack

### Backend
- Node.js + Express + TypeScript
- Salesforce REST API (via JSForce)
- Claude API (Anthropic SDK)
- Username-Password OAuth flow

### Frontend
- React + Vite + TypeScript
- Modern CSS with Salesforce design system colors
- Responsive design

## Quick Start

### Prerequisites

- Node.js 18+ installed
- Salesforce account with API access
- Anthropic API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd salesforce-claude-emailer
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   ```

3. **Configure environment variables**

   Edit `server/.env` with your credentials:
   ```
   SF_USERNAME=your-email@company.com
   SF_PASSWORD=your-salesforce-password
   SF_SECURITY_TOKEN=your-security-token
   SF_LOGIN_URL=https://login.salesforce.com
   ANTHROPIC_API_KEY=your-anthropic-api-key
   ```

   See [docs/SALESFORCE_SETUP.md](docs/SALESFORCE_SETUP.md) for detailed setup instructions.

4. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on http://localhost:3001

2. **Start the frontend** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   Application will open at http://localhost:5173

3. **Test the connection**

   Visit http://localhost:3001/api/health to verify both Salesforce and Claude connections are working.

## Project Structure

```
salesforce-claude-emailer/
├── server/                      # Backend API
│   ├── src/
│   │   ├── config/
│   │   │   └── salesforce.ts    # Configuration management
│   │   ├── services/
│   │   │   ├── salesforce.service.ts  # SF API integration
│   │   │   └── claude.service.ts      # Claude API integration
│   │   ├── routes/
│   │   │   └── api.routes.ts    # API endpoints
│   │   └── server.ts            # Express app
│   ├── .env.example             # Environment template
│   └── package.json
│
├── client/                      # Frontend React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── OpportunityList.tsx    # Browse opportunities
│   │   │   └── EmailGenerator.tsx     # Generate & preview emails
│   │   ├── services/
│   │   │   └── api.ts           # Backend API client
│   │   ├── App.tsx              # Main app component
│   │   └── App.css              # Salesforce-branded styles
│   └── package.json
│
└── docs/
    └── SALESFORCE_SETUP.md      # Detailed setup guide
```

## API Endpoints

- `GET /api/health` - Health check for Salesforce and Claude connections
- `GET /api/opportunities` - List all open opportunities
- `GET /api/opportunities/:id` - Get detailed opportunity information
- `POST /api/generate-email` - Generate personalized email
  ```json
  {
    "opportunityId": "006...",
    "customInstructions": "Focus on cost savings" // optional
  }
  ```

## Configuration

### Salesforce
- Username-password authentication for quick demo setup
- Queries open opportunities with account details
- Customizable SOQL queries in `salesforce.service.ts`

### Claude
- Uses Claude Opus 4 model for best quality
- Engineered prompts for professional sales emails
- Customizable in `claude.service.ts`

## Deployment

**Quick Deploy (5 minutes):** See [QUICKSTART-DEPLOY.md](QUICKSTART-DEPLOY.md)

### Recommended: Railway

Railway is the easiest Heroku alternative with a generous free tier.

**Automated deploy:**
```bash
./deploy-railway.sh
```

**Or manually:**
1. Sign up at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Add environment variables in Railway dashboard
4. Deploy automatically

### Other Options

- **Render**: Free tier, auto-deploys from GitHub
- **Vercel**: Great for React apps, free hobby tier
- **DigitalOcean**: $5/month, very reliable
- **Fly.io**: Free tier with Docker support

**Full deployment guide:** See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions for all platforms.

## Pre-Demo Checklist

Before a live demo:

- [ ] Test health endpoint shows both services connected
- [ ] Verify opportunities are loading from Salesforce
- [ ] Generate a test email and verify quality
- [ ] Test copy-to-clipboard functionality
- [ ] Check responsive design on target device
- [ ] Clear any test/debug emails from previous runs
- [ ] Have backup opportunities ready (in case of slow SF response)

## Customization

### Email Tone & Style
Modify the prompt in `server/src/services/claude.service.ts` to adjust:
- Formality level
- Length (currently ~200 words)
- Structure and format
- Industry-specific language

### Opportunity Filters
Edit SOQL query in `server/src/services/salesforce.service.ts` to:
- Filter by opportunity amount
- Limit to specific stages
- Filter by close date range
- Add custom fields

### UI Branding
Update colors and styles in `client/src/App.css` to match your company branding.

## Troubleshooting

### Salesforce Connection Issues
See [docs/SALESFORCE_SETUP.md](docs/SALESFORCE_SETUP.md) for detailed troubleshooting.

### Claude API Errors
- Verify your API key is correct
- Check you have available credits at console.anthropic.com
- Review rate limits if generating many emails

### CORS Errors
- Ensure Vite proxy is configured correctly in `vite.config.ts`
- Check backend is running on port 3001
- Verify CORS is enabled in `server.ts`

## Future Enhancements

Potential features to add:
- Send emails directly via SendGrid/SendInBlaze
- Save generated emails as Salesforce Tasks
- Multiple tone options (formal, casual, urgent)
- Email template library
- Bulk generation for multiple opportunities
- Integration with Salesforce Lightning

## License

MIT

## Support

For issues or questions:
1. Check [docs/SALESFORCE_SETUP.md](docs/SALESFORCE_SETUP.md)
2. Review server logs for error details
3. Test individual API endpoints
4. Verify credentials and API access

## Credits

Built with:
- [Claude](https://www.anthropic.com/claude) by Anthropic
- [JSForce](https://jsforce.github.io/) for Salesforce integration
- [React](https://react.dev/) and [Vite](https://vitejs.dev/)
