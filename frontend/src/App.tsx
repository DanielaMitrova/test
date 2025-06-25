import { useState, useEffect } from 'react';
import './App.css';
import { ComputedSection } from './types';
import SectionComponent from './components/SectionComponent';

function App() {
  const [data, setData] = useState<ComputedSection | null>(null);
  const [totalSum, setTotalSum] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/computed-data');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const computedData: ComputedSection = await response.json();
      setData(computedData);
      setTotalSum(computedData.computedSum);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDataUpdate = (updatedData: ComputedSection) => {
    setData(updatedData);
    setTotalSum(updatedData.computedSum);
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>{data?.name || 'Financial Report'}</h1>
        <div className="total-sum">
          <strong>Total Sum: ${totalSum.toLocaleString()}</strong>
        </div>
      </header>
      <main className="App-main">
        {data && (
          <SectionComponent 
            section={data} 
            onDataUpdate={handleDataUpdate}
            level={0}
          />
        )}
      </main>
    </div>
  );
}

export default App;
