import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HealthChart = ({ data }) => {
    if (!data || data.length === 0) return (
        <div className="glass-panel" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No history data available
        </div>
    );

    const formattedData = data.map(item => ({
        time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        percent: item.percent,
    })).reverse();

    return (
        <div className="glass-panel" style={{ padding: '20px', height: '400px' }}>
            <h3 style={{ margin: '0 0 20px 0', color: 'var(--text-secondary)', fontWeight: 500 }}>Battery History</h3>
            <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={formattedData}>
                    <defs>
                        <linearGradient id="colorPercent" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
                    <XAxis
                        dataKey="time"
                        stroke="var(--text-secondary)"
                        tick={{ fill: 'var(--text-secondary)' }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        domain={[0, 100]}
                        stroke="var(--text-secondary)"
                        tick={{ fill: 'var(--text-secondary)' }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--bg-dark)',
                            borderColor: 'var(--glass-border)',
                            borderRadius: '8px',
                            color: 'var(--text-primary)'
                        }}
                        itemStyle={{ color: 'var(--accent-color)' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="percent"
                        stroke="var(--accent-color)"
                        fillOpacity={1}
                        fill="url(#colorPercent)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HealthChart;
