import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HealthChart = ({ data }) => {
    if (!data || data.length === 0) return (
        <div className="glass-panel p-5 text-center text-text-secondary">
            No history data available
        </div>
    );

    const formattedData = data.map(item => ({
        time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        percent: item.percent,
    })).reverse();

    return (
        <div className="glass-panel p-5 h-[400px]">
            <h3 className="m-0 mb-5 text-text-secondary font-medium">Battery History</h3>
            <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={formattedData}>
                    <defs>
                        <linearGradient id="colorPercent" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis
                        dataKey="time"
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8' }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        domain={[0, 100]}
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8' }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#0f172a',
                            borderColor: 'rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            color: '#f8fafc'
                        }}
                        itemStyle={{ color: '#38bdf8' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="percent"
                        stroke="#38bdf8"
                        fillOpacity={1}
                        fill="url(#colorPercent)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HealthChart;
