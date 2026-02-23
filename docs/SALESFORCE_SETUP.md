# Salesforce Setup Guide

This guide will walk you through setting up Salesforce credentials for the AI Email Generator.

## Prerequisites

- Salesforce account with API access
- Administrator or user with API permissions

## Step 1: Enable API Access

1. Log in to your Salesforce account
2. Click on your profile picture (top right) → **Settings**
3. In the left sidebar, go to **Personal** → **Advanced User Details**
4. Verify that **"API Enabled"** is checked
   - If you don't see this option, you may need administrator help to enable it

## Step 2: Get Your Security Token

The security token is an automatically generated key that must be appended to your password when logging in via API.

### To Reset Your Security Token:

1. In Salesforce, click your profile picture → **Settings**
2. In the left sidebar, go to **Personal** → **Reset My Security Token**
3. Click **Reset Security Token**
4. Check your email (the one associated with your Salesforce account)
5. You'll receive an email with the subject "Your new Salesforce security token"
6. **Save this token** - you'll need it for the `.env` file

### Important Notes:
- The security token is case-sensitive
- If you change your password, your security token will reset automatically
- Keep this token secure - don't share it publicly

## Step 3: Gather Your Credentials

You'll need three pieces of information:

1. **Username**: Your Salesforce login email (e.g., `john.doe@company.com`)
2. **Password**: Your Salesforce password
3. **Security Token**: The token from Step 2

## Step 4: Determine Your Login URL

- **Production/Developer Edition**: `https://login.salesforce.com`
- **Sandbox**: `https://test.salesforce.com`
- **Custom Domain**: If your company uses a custom domain (e.g., `https://mycompany.my.salesforce.com`), use that

## Step 5: Configure the Application

1. Navigate to the `server` directory in the project
2. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Open the `.env` file and fill in your credentials:
   ```
   SF_USERNAME=your-email@company.com
   SF_PASSWORD=your-salesforce-password
   SF_SECURITY_TOKEN=your-security-token-from-email
   SF_LOGIN_URL=https://login.salesforce.com
   ```

4. Add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your-anthropic-api-key
   ```

### Example `.env` File:
```
SF_USERNAME=john.doe@acme.com
SF_PASSWORD=MySecurePass123
SF_SECURITY_TOKEN=AbCdEfGhIjKlMnOpQrSt
SF_LOGIN_URL=https://login.salesforce.com

ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx

PORT=3001
NODE_ENV=development
```

## Step 6: Test Your Connection

After configuring the `.env` file:

1. Start the server:
   ```bash
   cd server
   npm install
   npm run dev
   ```

2. Test the health endpoint:
   ```bash
   curl http://localhost:3001/api/health
   ```

3. You should see:
   ```json
   {
     "status": "ok",
     "salesforce": "connected",
     "claude": "connected"
   }
   ```

## Troubleshooting

### "Invalid username, password, security token; or user locked out"

**Causes:**
- Incorrect username, password, or security token
- Security token needs to be appended to password (the app does this automatically)
- Your IP address may not be whitelisted (if your org has IP restrictions)

**Solutions:**
1. Double-check your credentials in the `.env` file
2. Reset your security token and try again
3. Verify you're using the correct login URL (production vs sandbox)
4. Check with your Salesforce administrator about IP restrictions

### "API is not enabled for your organization"

**Solution:**
Contact your Salesforce administrator to enable API access for your user profile.

### "Couldn't resolve host name"

**Cause:**
Incorrect `SF_LOGIN_URL`

**Solution:**
Verify you're using the correct URL:
- Production: `https://login.salesforce.com`
- Sandbox: `https://test.salesforce.com`

### No Opportunities Showing Up

**Possible Causes:**
1. You have no open opportunities in Salesforce
2. Your user doesn't have permission to view opportunities

**Solutions:**
1. Create test opportunities in Salesforce
2. Check your Salesforce profile permissions
3. Try querying directly in Salesforce Developer Console:
   ```sql
   SELECT Id, Name, Amount, StageName
   FROM Opportunity
   WHERE IsClosed = false
   LIMIT 10
   ```

## Security Best Practices

1. **Never commit the `.env` file** to version control
   - The `.gitignore` file already excludes it
2. **Use a dedicated Salesforce user** for API access if possible
3. **Regularly rotate your security token**
4. **Use environment-specific credentials** (dev, staging, production)
5. **Monitor API usage** in Salesforce Setup → System Overview

## Getting an Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Navigate to **API Keys** section
4. Click **Create Key**
5. Copy the key and add it to your `.env` file
6. **Never share your API key** - it provides access to your Anthropic account

## Additional Resources

- [Salesforce API Documentation](https://developer.salesforce.com/docs/apis)
- [JSForce Library Documentation](https://jsforce.github.io/)
- [Anthropic API Documentation](https://docs.anthropic.com/)

## Need Help?

If you're still having issues:
1. Check the server logs for detailed error messages
2. Verify all credentials are correct (no extra spaces)
3. Test your Salesforce credentials in Workbench: https://workbench.developerforce.com/
4. Reach out to your Salesforce administrator for API access issues
