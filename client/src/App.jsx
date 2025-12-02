import React, { useEffect, useState } from "react";
import BatteryGauge from "./components/BatteryGauge";
import HealthChart from "./components/HealthChart";
import Footer from "./components/Footer";
import { FiPhone, FiMail, FiGlobe } from "react-icons/fi";

function App() {
  const [battery, setBattery] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const currentRes = await fetch(
        "http://localhost:5000/api/battery/current"
      );
      if (!currentRes.ok) throw new Error("Failed to fetch battery status");
      const currentData = await currentRes.json();
      setBattery(currentData);

      const historyRes = await fetch(
        "http://localhost:5000/api/battery/history"
      );
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

  /* ------------------------- LOADING STATE ------------------------- */

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-text-primary">
        <div className="glow-text">Loading System Data...</div>
      </div>
    );

  /* ------------------------- ERROR STATE ------------------------- */

  if (error)
    return (
      <div className="min-h-screen w-full flex justify-center items-center p-5 bg-gradient-to-b from-bg-dark to-black">
        <div className="w-full max-w-4xl glass-panel p-6 rounded-3xl shadow-xl border border-white/10 backdrop-blur-xl flex flex-col md:flex-row gap-6">

          {/* LEFT SECTION — ICON + HEADER */}
          <div className="md:w-1/3 flex flex-col justify-center items-center text-center md:text-left">
            <div className="text-7xl mb-4 animate-bounce">⚠️</div>
            <h2 className="text-3xl font-extrabold text-danger mb-2">
              Connection Failed
            </h2>
            <p className="text-text-secondary text-base">
              Unable to reach your local backend server.
            </p>

            {/* RETRY BUTTON */}
            <button
              onClick={() => {
                window.open("chrome://settings/content", "_blank");
              }}
              className="bg-accent hover:bg-accent-glow text-bg-dark font-bold py-2 px-6 rounded-full transition-all mt-6 shadow-lg"
            >
              Retry Connection
            </button>
            <div className="text-xs text-text-secondary mt-2">
              Chrome does not allow opening permission popups automatically.
              After clicking Retry, scroll to
              <span className="text-text-primary font-medium">“Local Network Access”</span>
              and enable it manually.
            </div>

          </div>

          {/* RIGHT SECTION — TROUBLESHOOTING */}
          <div className="md:w-2/3 bg-black/40 p-6 rounded-2xl text-sm text-text-secondary border border-white/10 shadow-lg space-y-4">
            <h3 className="font-bold text-text-primary text-lg">
              Troubleshooting Guide
            </h3>

            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
              <li>
                Enable{" "}
                <span className="font-medium text-text-primary">
                  “Local Network Access”
                </span>{" "}
                for this website.
              </li>
              <li>Ensure your local battery backend tool is running.</li>
              <li>
                The app is{" "}
                <span className="font-semibold text-text-primary">100% safe</span> and
                reads only battery information.
              </li>
            </ul>

            {/* Local Network Access Guide */}
            <div className="p-4 bg-black/30 rounded-xl border border-white/10">
              <p className="font-semibold text-text-primary mb-2 text-base">
                How to Enable Local Network Access:
              </p>
              <ol className="list-decimal pl-5 space-y-1 leading-relaxed">
                <li>
                  Click the{" "}
                  <span className="font-medium text-text-primary">🔒 lock icon</span>{" "}
                  beside the website URL.
                </li>
                <li>Open <span className="font-medium">Site settings</span>.</li>
                <li>
                  Enable{" "}
                  <span className="font-medium text-text-primary">
                    “Local Network Access”
                  </span>{" "}
                  as shown in the popup.
                </li>
              </ol>
              <p className="mt-2 text-xs text-text-secondary/80">
                This allows the browser to access system battery telemetry safely.
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
        </div>
      </div>
    );

  /* ------------------------- SUCCESS UI ------------------------- */

  return (
    <div className="max-w-[1200px] mx-auto py-10 px-5 min-h-screen flex flex-col">
      <header className="mb-10 text-center">
        <h1 className="glow-text text-4xl m-0 md:text-5xl font-bold">
          Windows Battery Status
        </h1>
        <p className="text-text-secondary mt-2">
          Real-time Windows Battery Telemetry
        </p>
      </header>

      <div className="flex-grow">
        {battery && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Main Gauge */}
            <div className="col-span-1">
              <BatteryGauge
                percent={battery.percent}
                isCharging={battery.isCharging}
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 col-span-1 lg:col-span-1">
              <StatCard
                label="Status"
                value={battery.isCharging ? "Charging" : "Discharging"}
                icon={battery.isCharging ? "⚡" : "🔋"}
                color={
                  battery.isCharging ? "text-warning" : "text-text-primary"
                }
              />
              <StatCard
                label="Power Source"
                value={battery.acConnected ? "AC Power" : "Battery"}
                icon="🔌"
              />
              <StatCard
                label="Time Remaining"
                value={
                  battery.timeRemaining
                    ? `${battery.timeRemaining} min`
                    : "Calculating..."
                }
                icon="⏳"
              />
              <StatCard
                label="Voltage"
                value={`${battery.voltage} V`}
                icon="⚡"
              />
            </div>

            {/* Health */}
            <div className="glass-panel p-6 flex flex-col justify-around col-span-1">
              <h3 className="m-0 mb-5 text-text-secondary font-medium">
                Battery Health
              </h3>
              <HealthRow
                label="Designed Capacity"
                value={`${battery.designedCapacity} mWh`}
              />
              <HealthRow
                label="Max Capacity"
                value={`${battery.maxCapacity} mWh`}
              />
              <HealthRow label="Cycle Count" value={battery.cycleCount} />

              <div className="mt-5 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent shadow-[0_0_10px_var(--accent-color)]"
                  style={{
                    width: `${(battery.maxCapacity / battery.designedCapacity) * 100
                      }%`,
                  }}
                />
              </div>

              <div className="text-right mt-1 text-sm text-text-secondary">
                Health:{" "}
                {Math.round(
                  (battery.maxCapacity / battery.designedCapacity) * 100
                )}
                %
              </div>
            </div>

            {/* Insights */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <div className="glass-panel p-6">
                <h3 className="m-0 mb-4 text-text-secondary font-medium">
                  Battery Insights
                </h3>
                <div className="flex items-start gap-4">
                  <div className="text-3xl bg-white/5 p-3 rounded-xl">
                    {battery.isCharging
                      ? "⚡"
                      : battery.percent < 20
                        ? "⚠️"
                        : "💡"}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary mb-1">
                      {battery.isCharging
                        ? "Charging in Progress"
                        : battery.percent < 20
                          ? "Low Battery Warning"
                          : "Battery Status Normal"}
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {battery.isCharging
                        ? "Your device is charging. For long-term battery health, unplug around 80% unless needed."
                        : battery.percent < 20
                          ? "Battery is critically low. Plug in now to avoid shutdown."
                          : "Battery is healthy. Keep charge between 20%–80% for best lifespan."}
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
    <div className={`text-xl font-semibold ${color || "text-text-primary"}`}>
      {value}
    </div>
  </div>
);

const HealthRow = ({ label, value }) => (
  <div className="flex justify-between mb-3 border-b border-white/5 pb-2">
    <span className="text-text-secondary">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default App;
