import Anthropic from '@anthropic-ai/sdk';
import { claudeConfig } from '../config/salesforce';

interface OpportunityData {
  name: string;
  account: {
    name: string;
    industry: string;
  };
  amount: number;
  stage: string;
  closeDate: string;
  description?: string;
}

interface EmailGenerationRequest {
  opportunity: OpportunityData;
  customInstructions?: string;
}

interface EmailResponse {
  subject: string;
  body: string;
}

class ClaudeService {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic({
      apiKey: claudeConfig.apiKey
    });
  }

  async generateEmail(request: EmailGenerationRequest): Promise<EmailResponse> {
    const { opportunity, customInstructions } = request;

    const prompt = this.buildPrompt(opportunity, customInstructions);

    const message = await this.client.messages.create({
      model: 'claude-opus-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const responseText = message.content[0].type === 'text'
      ? message.content[0].text
      : '';

    return this.parseEmailResponse(responseText);
  }

  private buildPrompt(opportunity: OpportunityData, customInstructions?: string): string {
    const formattedAmount = opportunity.amount
      ? `$${opportunity.amount.toLocaleString()}`
      : 'Not specified';

    const formattedDate = new Date(opportunity.closeDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `You are an expert sales professional writing a personalized email to a prospect.

Opportunity Details:
- Company: ${opportunity.account.name}
- Industry: ${opportunity.account.industry}
- Deal: ${opportunity.name}
- Amount: ${formattedAmount}
- Stage: ${opportunity.stage}
- Close Date: ${formattedDate}
${opportunity.description ? `- Description: ${opportunity.description}` : ''}

Write a professional, personalized sales email that:
1. References their specific situation and industry
2. Acknowledges the deal stage (avoid being too pushy if early stage)
3. Provides value and next steps
4. Is concise (under 200 words)
5. Has a compelling subject line
6. Uses a professional but friendly tone

${customInstructions ? `\nCustom instructions from rep: ${customInstructions}\n` : ''}

Return your response in this exact format:

SUBJECT: [subject line]

BODY:
[email body]

Do not include any other text or explanations outside this format.`;
  }

  private parseEmailResponse(response: string): EmailResponse {
    const lines = response.trim().split('\n');

    let subject = '';
    let bodyLines: string[] = [];
    let inBody = false;

    for (let line of lines) {
      if (line.startsWith('SUBJECT:')) {
        subject = line.replace('SUBJECT:', '').trim();
      } else if (line.startsWith('BODY:')) {
        inBody = true;
      } else if (inBody && line.trim()) {
        bodyLines.push(line);
      } else if (inBody && !line.trim() && bodyLines.length > 0) {
        bodyLines.push(''); // Preserve paragraph breaks
      }
    }

    const body = bodyLines.join('\n').trim();

    if (!subject || !body) {
      throw new Error('Failed to parse email response from Claude');
    }

    return { subject, body };
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.client.messages.create({
        model: 'claude-opus-4-20250514',
        max_tokens: 10,
        messages: [
          {
            role: 'user',
            content: 'Hi'
          }
        ]
      });
      return true;
    } catch (error) {
      console.error('Claude API connection failed:', error);
      return false;
    }
  }
}

export default new ClaudeService();
