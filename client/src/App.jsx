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
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen text-text-primary">
      <div className="glow-text">Loading System Data...</div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen text-danger">
      <div className="glass-panel p-5">Error: {error}</div>
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto py-10 px-5">
      <header className="mb-10 text-center">
        <h1 className="glow-text text-4xl m-0 md:text-5xl font-bold">System Energy Monitor</h1>
        <p className="text-text-secondary mt-2">Real-time Windows Battery Telemetry</p>
      </header>

      {battery && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Main Gauge */}
          <div className="col-span-1">
            <BatteryGauge percent={battery.percent} isCharging={battery.isCharging} />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 col-span-1 lg:col-span-1">
            <StatCard
              label="Status"
              value={battery.isCharging ? 'Charging' : 'Discharging'}
              icon={battery.isCharging ? '⚡' : '🔋'}
              color={battery.isCharging ? 'text-warning' : 'text-text-primary'}
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
          <div className="glass-panel p-6 flex flex-col justify-around col-span-1">
            <h3 className="m-0 mb-5 text-text-secondary font-medium">Battery Health</h3>
            <HealthRow label="Designed Capacity" value={`${battery.designedCapacity} mWh`} />
            <HealthRow label="Max Capacity" value={`${battery.maxCapacity} mWh`} />
            <HealthRow label="Cycle Count" value={battery.cycleCount} />
            <div className="mt-5 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent shadow-[0_0_10px_var(--accent-color)]"
                style={{ width: `${(battery.maxCapacity / battery.designedCapacity) * 100}%` }}
              />
            </div>
            <div className="text-right mt-1 text-sm text-text-secondary">
              Health: {Math.round((battery.maxCapacity / battery.designedCapacity) * 100)}%
            </div>
          </div>

          {/* Chart */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <HealthChart data={history} />
          </div>

        </div>
      )}
    </div>
  );
}

const StatCard = ({ label, value, icon, color }) => (
  <div className="glass-panel p-5 flex flex-col justify-center">
    <div className="text-2xl mb-2">{icon}</div>
    <div className="text-text-secondary text-sm">{label}</div>
    <div className={`text-xl font-semibold ${color || 'text-text-primary'}`}>{value}</div>
  </div>
);

const HealthRow = ({ label, value }) => (
  <div className="flex justify-between mb-3 border-b border-white/5 pb-2">
    <span className="text-text-secondary">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default App;
