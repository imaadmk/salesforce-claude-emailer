import jsforce from 'jsforce';
import { salesforceConfig } from '../config/salesforce';

interface Opportunity {
  Id: string;
  Name: string;
  AccountId: string;
  Account?: {
    Name: string;
    Industry: string;
  };
  Amount: number;
  StageName: string;
  CloseDate: string;
  Description?: string;
}

class SalesforceService {
  private conn: jsforce.Connection | null = null;

  async connect(): Promise<void> {
    if (this.conn) {
      return; // Already connected
    }

    this.conn = new jsforce.Connection({
      loginUrl: salesforceConfig.loginUrl
    });

    const passwordWithToken = salesforceConfig.password + salesforceConfig.securityToken;

    await this.conn.login(salesforceConfig.username, passwordWithToken);
    console.log('Connected to Salesforce successfully');
  }

  async getOpportunities(): Promise<any[]> {
    await this.connect();

    if (!this.conn) {
      throw new Error('Salesforce connection not established');
    }

    const query = `
      SELECT Id, Name, AccountId, Account.Name, Account.Industry,
             Amount, StageName, CloseDate, Description
      FROM Opportunity
      WHERE IsClosed = false
      ORDER BY CloseDate ASC
      LIMIT 50
    `;

    const result = await this.conn.query<Opportunity>(query);

    return result.records.map(record => ({
      id: record.Id,
      name: record.Name,
      accountName: record.Account?.Name || 'Unknown',
      accountIndustry: record.Account?.Industry || 'Not specified',
      amount: record.Amount,
      stage: record.StageName,
      closeDate: record.CloseDate,
      description: record.Description || ''
    }));
  }

  async getOpportunityById(id: string): Promise<any> {
    await this.connect();

    if (!this.conn) {
      throw new Error('Salesforce connection not established');
    }

    const query = `
      SELECT Id, Name, AccountId, Account.Name, Account.Industry,
             Amount, StageName, CloseDate, Description
      FROM Opportunity
      WHERE Id = '${id}'
      LIMIT 1
    `;

    const result = await this.conn.query<Opportunity>(query);

    if (result.records.length === 0) {
      throw new Error('Opportunity not found');
    }

    const record = result.records[0];

    return {
      id: record.Id,
      name: record.Name,
      account: {
        name: record.Account?.Name || 'Unknown',
        industry: record.Account?.Industry || 'Not specified'
      },
      amount: record.Amount,
      stage: record.StageName,
      closeDate: record.CloseDate,
      description: record.Description || ''
    };
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.connect();
      return true;
    } catch (error) {
      console.error('Salesforce connection failed:', error);
      return false;
    }
  }
}

export default new SalesforceService();
