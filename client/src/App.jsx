import React, { useEffect, useState } from 'react';
import BatteryGauge from './components/BatteryGauge';
import HealthChart from './components/HealthChart';

function App() {
  const [battery, setBattery] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const currentRes = await fetch('http://localhost:5000/api/battery/current');
      if (!currentRes.ok) throw new Error('Failed to fetch battery status');
      const currentData = await currentRes.json();
      setBattery(currentData);

      const historyRes = await fetch('http://localhost:5000/api/battery/history');
      if (historyRes.ok) {
        const historyData = await historyRes.json();
        setHistory(historyData);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Loading battery status...</div>;
  if (error) return <div style={{ padding: 20, color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Windows Battery Status</h1>

      {battery && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <BatteryGauge percent={battery.percent} isCharging={battery.isCharging} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', width: '100%' }}>
            <div style={cardStyle}>
              <h4>Status</h4>
              <p>{battery.isCharging ? 'Charging' : 'Discharging'}</p>
              <p>{battery.acConnected ? 'AC Connected' : 'On Battery'}</p>
            </div>
            <div style={cardStyle}>
              <h4>Time Remaining</h4>
              <p>{battery.timeRemaining ? `${battery.timeRemaining} min` : 'Calculating...'}</p>
            </div>
            <div style={cardStyle}>
              <h4>Health</h4>
              <p>Designed: {battery.designedCapacity} mWh</p>
              <p>Max: {battery.maxCapacity} mWh</p>
              <p>Cycles: {battery.cycleCount}</p>
            </div>
          </div>

          <HealthChart data={history} />
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  background: '#fff',
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  textAlign: 'center'
};

export default App;
