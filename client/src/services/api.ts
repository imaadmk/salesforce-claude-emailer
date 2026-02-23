const API_BASE_URL = '/api';

export interface Opportunity {
  id: string;
  name: string;
  accountName: string;
  accountIndustry: string;
  amount: number;
  stage: string;
  closeDate: string;
  description?: string;
}

export interface OpportunityDetail {
  id: string;
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

export interface GeneratedEmail {
  subject: string;
  body: string;
}

export interface GenerateEmailRequest {
  opportunityId: string;
  customInstructions?: string;
}

class ApiService {
  async getOpportunities(): Promise<Opportunity[]> {
    const response = await fetch(`${API_BASE_URL}/opportunities`);

    if (!response.ok) {
      throw new Error('Failed to fetch opportunities');
    }

    const data = await response.json();
    return data.opportunities;
  }

  async getOpportunityById(id: string): Promise<OpportunityDetail> {
    const response = await fetch(`${API_BASE_URL}/opportunities/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch opportunity details');
    }

    return response.json();
  }

  async generateEmail(request: GenerateEmailRequest): Promise<GeneratedEmail> {
    const response = await fetch(`${API_BASE_URL}/generate-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to generate email');
    }

    return response.json();
  }

  async checkHealth(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  }
}

export default new ApiService();
