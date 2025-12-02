import React from 'react';

const BatteryGauge = ({ percent, isCharging }) => {
    const radius = 80;
    const stroke = 12;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percent / 100) * circumference;

    const getColor = (p) => {
        if (p > 50) return 'var(--success)';
        if (p > 20) return 'var(--warning)';
        return 'var(--danger)';
    };

    const color = getColor(percent);

    return (
        <div className="glass-panel" style={{
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        }}>
            <h3 style={{ margin: '0 0 20px 0', color: 'var(--text-secondary)', fontWeight: 500 }}>Current Charge</h3>
            <div style={{ position: 'relative', width: radius * 2, height: radius * 2 }}>
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}
                >
                    <circle
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth={stroke}
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <circle
                        stroke={color}
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{
                            strokeDashoffset,
                            transition: 'stroke-dashoffset 0.5s ease-in-out',
                            filter: `drop-shadow(0 0 8px ${color})`
                        }}
                        strokeLinecap="round"
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                </svg>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                        {percent}%
                    </div>
                    {isCharging && (
                        <div style={{
                            color: 'var(--warning)',
                            fontSize: '1.5rem',
                            marginTop: '5px',
                            animation: 'pulse 2s infinite'
                        }}>
                            ⚡ Charging
                        </div>
                    )}
                </div>
            </div>
            <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default BatteryGauge;
