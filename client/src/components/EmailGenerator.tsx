import { useState } from 'react';
import { OpportunityDetail, GeneratedEmail } from '../services/api';

interface EmailGeneratorProps {
  opportunity: OpportunityDetail | null;
  onGenerate: (customInstructions?: string) => void;
  generatedEmail: GeneratedEmail | null;
  generating: boolean;
}

const EmailGenerator = ({
  opportunity,
  onGenerate,
  generatedEmail,
  generating
}: EmailGeneratorProps) => {
  const [customInstructions, setCustomInstructions] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);

  const handleGenerate = () => {
    onGenerate(customInstructions.trim() || undefined);
  };

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
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!opportunity) {
    return (
      <div className="email-generator">
        <div className="empty-state">
          <h2>Select an Opportunity</h2>
          <p>Choose an opportunity from the list to generate a personalized email.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="email-generator">
      <div className="opportunity-summary">
        <h2>{opportunity.name}</h2>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Company</span>
            <span className="summary-value">{opportunity.account.name}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Industry</span>
            <span className="summary-value">{opportunity.account.industry}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Amount</span>
            <span className="summary-value">{formatAmount(opportunity.amount || 0)}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Stage</span>
            <span className="summary-value">{opportunity.stage}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Close Date</span>
            <span className="summary-value">{formatDate(opportunity.closeDate)}</span>
          </div>
        </div>
      </div>

      <div className="generation-controls">
        <button
          className="toggle-instructions"
          onClick={() => setShowInstructions(!showInstructions)}
        >
          {showInstructions ? '−' : '+'} Custom Instructions (Optional)
        </button>

        {showInstructions && (
          <textarea
            className="custom-instructions"
            placeholder="Add any specific instructions for the email (e.g., 'Focus on cost savings', 'Mention our upcoming webinar', etc.)"
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            rows={3}
          />
        )}

        <button
          className="generate-button"
          onClick={handleGenerate}
          disabled={generating}
        >
          {generating ? (
            <>
              <span className="spinner"></span>
              Generating Email...
            </>
          ) : (
            'Generate Personalized Email'
          )}
        </button>
      </div>

      {generatedEmail && (
        <div className="generated-email-container">
          <h3>Generated Email</h3>
          <div className="email-preview">
            <div className="email-subject">
              <strong>Subject:</strong> {generatedEmail.subject}
            </div>
            <div className="email-body">
              {generatedEmail.body.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="email-actions">
            <button
              className="copy-button"
              onClick={() => {
                const fullEmail = `Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`;
                navigator.clipboard.writeText(fullEmail);
                alert('Email copied to clipboard!');
              }}
            >
              Copy to Clipboard
            </button>
            <button
              className="regenerate-button"
              onClick={handleGenerate}
              disabled={generating}
            >
              Generate Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailGenerator;
