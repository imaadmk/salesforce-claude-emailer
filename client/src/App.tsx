import { useState, useEffect } from 'react';
import OpportunityList from './components/OpportunityList';
import EmailGenerator from './components/EmailGenerator';
import apiService, { Opportunity, OpportunityDetail, GeneratedEmail } from './services/api';
import './App.css';

function App() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityDetail | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [generatedEmail, setGeneratedEmail] = useState<GeneratedEmail | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    loadOpportunities();
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const loadOpportunities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getOpportunities();
      setOpportunities(data);
    } catch (err) {
      setError('Failed to load opportunities. Check your Salesforce connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOpportunity = async (id: string) => {
    try {
      setSelectedId(id);
      setGeneratedEmail(null);
      const detail = await apiService.getOpportunityById(id);
      setSelectedOpportunity(detail);
    } catch (err) {
      setError('Failed to load opportunity details.');
      console.error(err);
    }
  };

  const handleGenerateEmail = async (customInstructions?: string) => {
    if (!selectedId) return;

    try {
      setGenerating(true);
      setError(null);
      const email = await apiService.generateEmail({
        opportunityId: selectedId,
        customInstructions
      });
      setGeneratedEmail(email);
    } catch (err) {
      setError('Failed to generate email. Check your API configuration.');
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Salesforce AI Email Generator</h1>
          <p>Powered by Claude</p>
        </div>
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className="app-content">
        <div className="left-panel">
          <OpportunityList
            opportunities={opportunities}
            selectedId={selectedId}
            onSelect={handleSelectOpportunity}
            loading={loading}
          />
        </div>
        <div className="right-panel">
          <EmailGenerator
            opportunity={selectedOpportunity}
            onGenerate={handleGenerateEmail}
            generatedEmail={generatedEmail}
            generating={generating}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
