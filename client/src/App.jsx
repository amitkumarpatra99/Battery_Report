import React, { useEffect, useState } from 'react';
import BatteryGauge from './components/BatteryGauge';
import HealthChart from './components/HealthChart';
import './App.css';

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
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--text-primary)' }}>
      <div className="glow-text">Loading System Data...</div>
    </div>
  );

  if (error) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--danger)' }}>
      <div className="glass-panel" style={{ padding: '20px' }}>Error: {error}</div>
    </div>
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 className="glow-text" style={{ fontSize: '2.5rem', margin: 0 }}>System Energy Monitor</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>Real-time Windows Battery Telemetry</p>
      </header>

      {battery && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>

          {/* Main Gauge */}
          <div style={{ gridColumn: 'span 1' }}>
            <BatteryGauge percent={battery.percent} isCharging={battery.isCharging} />
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <StatCard
              label="Status"
              value={battery.isCharging ? 'Charging' : 'Discharging'}
              icon={battery.isCharging ? '⚡' : '🔋'}
              color={battery.isCharging ? 'var(--warning)' : 'var(--text-primary)'}
            />
            <StatCard
              label="Power Source"
              value={battery.acConnected ? 'AC Power' : 'Battery'}
              icon="🔌"
            />
            <StatCard
              label="Time Remaining"
              value={battery.timeRemaining ? `${battery.timeRemaining} min` : 'Calculating...'}
              icon="⏳"
            />
            <StatCard
              label="Voltage"
              value={`${battery.voltage} V`}
              icon="⚡"
            />
          </div>

          {/* Health Stats */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
            <h3 style={{ margin: '0 0 20px 0', color: 'var(--text-secondary)', fontWeight: 500 }}>Battery Health</h3>
            <HealthRow label="Designed Capacity" value={`${battery.designedCapacity} mWh`} />
            <HealthRow label="Max Capacity" value={`${battery.maxCapacity} mWh`} />
            <HealthRow label="Cycle Count" value={battery.cycleCount} />
            <div style={{ marginTop: '20px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{
                width: `${(battery.maxCapacity / battery.designedCapacity) * 100}%`,
                height: '100%',
                background: 'var(--accent-color)',
                boxShadow: '0 0 10px var(--accent-color)'
              }} />
            </div>
            <div style={{ textAlign: 'right', marginTop: '5px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Health: {Math.round((battery.maxCapacity / battery.designedCapacity) * 100)}%
            </div>
          </div>

          {/* Chart */}
          <div style={{ gridColumn: '1 / -1' }}>
            <HealthChart data={history} />
          </div>

        </div>
      )}
    </div>
  );
}

const StatCard = ({ label, value, icon, color }) => (
  <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{icon}</div>
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{label}</div>
    <div style={{ fontSize: '1.2rem', fontWeight: 600, color: color || 'var(--text-primary)' }}>{value}</div>
  </div>
);

const HealthRow = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
    <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
    <span style={{ fontWeight: 500 }}>{value}</span>
  </div>
);

export default App;
