import express from 'express';
import cors from 'cors';
import path from 'path';
import apiRoutes from './routes/api.routes';
import { serverConfig } from './config/salesforce';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api', apiRoutes);

// Serve static files from React app in production
if (serverConfig.nodeEnv === 'production') {
  const clientBuildPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
} else {
  // Development: show API info
  app.get('/', (req, res) => {
    res.json({
      message: 'Salesforce Claude Emailer API',
      version: '1.0.0',
      endpoints: {
        health: '/api/health',
        opportunities: '/api/opportunities',
        opportunityDetail: '/api/opportunities/:id',
        generateEmail: '/api/generate-email (POST)'
      }
    });
  });
}

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: serverConfig.nodeEnv === 'development' ? err.message : undefined
  });
});

const PORT = serverConfig.port;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${serverConfig.nodeEnv}`);
  console.log(`🔗 API available at http://localhost:${PORT}/api`);
});
