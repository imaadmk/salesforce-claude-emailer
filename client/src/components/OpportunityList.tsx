import React from 'react';
import { Opportunity } from '../services/api';

interface OpportunityListProps {
  opportunities: Opportunity[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  loading: boolean;
}

const OpportunityList: React.FC<OpportunityListProps> = ({
  opportunities,
  selectedId,
  onSelect,
  loading
}) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="opportunity-list">
        <div className="loading">Loading opportunities...</div>
      </div>
    );
  }

  if (opportunities.length === 0) {
    return (
      <div className="opportunity-list">
        <div className="empty-state">
          No open opportunities found. Check your Salesforce connection.
        </div>
      </div>
    );
  }

  return (
    <div className="opportunity-list">
      <h2>Open Opportunities</h2>
      <div className="opportunities">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className={`opportunity-card ${selectedId === opp.id ? 'selected' : ''}`}
            onClick={() => onSelect(opp.id)}
          >
            <div className="opportunity-header">
              <h3>{opp.name}</h3>
              <span className="amount">{formatAmount(opp.amount || 0)}</span>
            </div>
            <div className="opportunity-details">
              <div className="detail-row">
                <span className="label">Account:</span>
                <span className="value">{opp.accountName}</span>
              </div>
              <div className="detail-row">
                <span className="label">Industry:</span>
                <span className="value">{opp.accountIndustry}</span>
              </div>
              <div className="detail-row">
                <span className="label">Stage:</span>
                <span className="value stage-badge">{opp.stage}</span>
              </div>
              <div className="detail-row">
                <span className="label">Close Date:</span>
                <span className="value">{formatDate(opp.closeDate)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpportunityList;
