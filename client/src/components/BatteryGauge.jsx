import React from 'react';

const BatteryGauge = ({ percent, isCharging }) => {
    const radius = 80;
    const stroke = 12;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percent / 100) * circumference;

    const getColor = (p) => {
        if (p > 50) return '#4ade80'; // success
        if (p > 20) return '#fbbf24'; // warning
        return '#f87171'; // danger
    };

    const color = getColor(percent);

    return (
        <div className="glass-panel p-6 flex flex-col items-center justify-center relative">
            <h3 className="m-0 mb-4 text-text-secondary font-medium">Current Charge</h3>
            <div className="relative w-48 h-48">
                <svg
                    viewBox={`0 0 ${radius * 2} ${radius * 2}`}
                    className="transform -rotate-90 overflow-visible w-full h-full"
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
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
                    <div className="text-3xl font-bold text-text-primary">
                        {percent}%
                    </div>
                    {isCharging && (
                        <div className="text-warning text-lg mt-1 animate-pulse font-medium">
                            ⚡
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BatteryGauge;
