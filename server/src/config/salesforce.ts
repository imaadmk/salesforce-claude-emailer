import dotenv from 'dotenv';

dotenv.config();

export const salesforceConfig = {
  username: process.env.SF_USERNAME || '',
  password: process.env.SF_PASSWORD || '',
  securityToken: process.env.SF_SECURITY_TOKEN || '',
  loginUrl: process.env.SF_LOGIN_URL || 'https://login.salesforce.com'
};

export const claudeConfig = {
  apiKey: process.env.ANTHROPIC_API_KEY || ''
};

export const serverConfig = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development'
};
