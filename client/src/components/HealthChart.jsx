import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HealthChart = ({ data }) => {
    if (!data || data.length === 0) return <p>No history data available</p>;

    const formattedData = data.map(item => ({
        time: new Date(item.timestamp).toLocaleTimeString(),
        percent: item.percent,
    })).reverse();

    return (
        <div style={{ width: '100%', height: 300 }}>
            <h3>Battery History</h3>
            <ResponsiveContainer>
                <LineChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="percent" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HealthChart;
