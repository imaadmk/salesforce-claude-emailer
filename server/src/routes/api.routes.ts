import { Router, Request, Response } from 'express';
import salesforceService from '../services/salesforce.service';
import claudeService from '../services/claude.service';

const router = Router();

// Health check endpoint
router.get('/health', async (req: Request, res: Response) => {
  try {
    const salesforceConnected = await salesforceService.testConnection();
    const claudeConnected = await claudeService.testConnection();

    res.json({
      status: 'ok',
      salesforce: salesforceConnected ? 'connected' : 'disconnected',
      claude: claudeConnected ? 'connected' : 'disconnected'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get all opportunities
router.get('/opportunities', async (req: Request, res: Response) => {
  try {
    const opportunities = await salesforceService.getOpportunities();
    res.json({ opportunities });
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    res.status(500).json({
      error: 'Failed to fetch opportunities',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get single opportunity by ID
router.get('/opportunities/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const opportunity = await salesforceService.getOpportunityById(id);
    res.json(opportunity);
  } catch (error) {
    console.error('Error fetching opportunity:', error);
    res.status(404).json({
      error: 'Opportunity not found',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Generate personalized email
router.post('/generate-email', async (req: Request, res: Response) => {
  try {
    const { opportunityId, customInstructions } = req.body;

    if (!opportunityId) {
      return res.status(400).json({
        error: 'Missing required field: opportunityId'
      });
    }

    // Fetch opportunity details
    const opportunity = await salesforceService.getOpportunityById(opportunityId);

    // Generate email using Claude
    const email = await claudeService.generateEmail({
      opportunity,
      customInstructions
    });

    res.json(email);
  } catch (error) {
    console.error('Error generating email:', error);
    res.status(500).json({
      error: 'Failed to generate email',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
