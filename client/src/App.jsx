import React, { useEffect, useState } from 'react';
import BatteryGauge from './components/BatteryGauge';
import HealthChart from './components/HealthChart';
import Footer from './components/Footer';
import { FiPhone, FiMail, FiGlobe } from "react-icons/fi";


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
    <div className="min-h-screen w-full flex justify-center items-center p-5 bg-gradient-to-b from-bg-dark to-black">
      <div className="w-full max-w-lg glass-panel p-8 rounded-2xl shadow-xl border border-white/10 backdrop-blur-xl">

        {/* Icon */}
        <div className="text-6xl mb-4 animate-bounce">⚠️</div>

        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-danger mb-2">
          Connection Failed
        </h2>

        <p className="text-text-secondary mb-6 text-base">
          The app couldn’t reach the local backend server.
        </p>

        {/* TROUBLESHOOTING SECTION */}
        <div className="text-left bg-black/40 p-5 rounded-xl mb-6 text-sm text-text-secondary border border-white/10 shadow-lg space-y-3">

          <p className="font-semibold text-text-primary text-lg">
            Troubleshooting Guide
          </p>

          <ul className="list-disc pl-5 space-y-2 leading-relaxed">
            <li>
              Enable{" "}
              <span className="font-medium text-text-primary">
                “Local Network Access”
              </span>{" "}
              for the website.
            </li>
            <li>
              Make sure your system’s local backend tool is running correctly.
            </li>
            <li>
              No worries — the app is{" "}
              <span className="font-semibold text-text-primary">100% safe</span>.
            </li>
          </ul>

          {/* Local Network Access Guide */}
          <div className="mt-2 p-4 bg-black/30 rounded-lg border border-white/10">
            <p className="font-semibold text-text-primary mb-2 text-base">
              How to Enable Local Network Access:
            </p>
            <ol className="list-decimal pl-5 space-y-1 leading-relaxed">
              <li>
                Click the{" "}
                <span className="text-text-primary font-medium">🔒 lock icon</span>{" "}
                next to the website URL.
              </li>
              <li>Open <span className="font-medium">Site settings</span>.</li>
              <li>
                Find{" "}
                <span className="font-medium text-text-primary">
                  “Local Network Access”
                </span>{" "}
                and set it to <span className="font-medium">Allow</span>.
              </li>
            </ol>

            <p className="mt-2 text-xs text-text-secondary/80">
              This safely allows the browser to scan battery data from your device.
            </p>
          </div>

          {/* CONTACT SECTION */}
          <div className="pt-3 border-t border-white/10 space-y-3">
            <p className="font-semibold text-text-primary text-base">Need Help?</p>

            <div className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition">
              <FiPhone className="text-accent" />
              <a href="tel:8144129955" className="hover:underline">
                +91 81441 29955
              </a>
            </div>

            <div className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition">
              <FiMail className="text-accent" />
              <a
                href="mailto:mrpatraofficial@gmail.com"
                className="hover:underline"
              >
                mrpatraofficial@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition">
              <FiGlobe className="text-accent" />
              <a
                href="https://mrpatra.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                www.mrpatra.vercel.app
              </a>
            </div>
          </div>
        </div>

        {/* RETRY BUTTON */}
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-accent hover:bg-accent-glow text-bg-dark font-bold py-3 rounded-full text-lg transition-all mt-2 shadow-lg"
        >
          Retry Connection
        </button>
      </div>
    </div>
  );
  

  return (
    <div className="max-w-[1200px] mx-auto py-10 px-5 min-h-screen flex flex-col">
      <header className="mb-10 text-center">
        <h1 className="glow-text text-4xl m-0 md:text-5xl font-bold">Windows Battery Status </h1>
        <p className="text-text-secondary mt-2">Real-time Windows Battery Telemetry</p>
      </header>

      <div className="flex-grow">
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

            {/* Battery Insights */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <div className="glass-panel p-6">
                <h3 className="m-0 mb-4 text-text-secondary font-medium">Battery Insights</h3>
                <div className="flex items-start gap-4">
                  <div className="text-3xl bg-white/5 p-3 rounded-xl">
                    {battery.isCharging ? '⚡' : battery.percent < 20 ? '⚠️' : '💡'}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary mb-1">
                      {battery.isCharging
                        ? 'Charging in Progress'
                        : battery.percent < 20
                          ? 'Low Battery Warning'
                          : 'Battery Status Normal'}
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {battery.isCharging
                        ? 'Your device is currently plugged in. For optimal battery health, consider unplugging once it reaches 80% unless you are performing intensive tasks.'
                        : battery.percent < 20
                          ? 'Your battery level is critical. Please plug in your charger immediately to prevent data loss or shutdown.'
                          : 'Your battery is operating within normal parameters. To extend lifespan, try to keep the charge between 20% and 80%.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <HealthChart data={history} />
            </div>

          </div>
        )}
      </div>

      <Footer />
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
