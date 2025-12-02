import React from 'react';

const BatteryGauge = ({ percent, isCharging }) => {
    const getColor = (p) => {
        if (p > 50) return '#4caf50'; // Green
        if (p > 20) return '#ff9800'; // Orange
        return '#f44336'; // Red
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h3>Battery Level</h3>
            <div style={{
                width: '200px',
                height: '100px',
                border: '4px solid #333',
                borderRadius: '10px',
                position: 'relative',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f0f0f0'
            }}>
                <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${percent}%`,
                    background: getColor(percent),
                    transition: 'width 0.5s ease-in-out',
                    borderRadius: '6px',
                    opacity: 0.8
                }} />
                <span style={{ zIndex: 1, fontSize: '2em', fontWeight: 'bold', color: '#333' }}>
                    {percent}%
                </span>
                {isCharging && (
                    <span style={{
                        position: 'absolute',
                        right: '-30px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '2em'
                    }}>
                        ⚡
                    </span>
                )}
            </div>
        </div>
    );
};

export default BatteryGauge;
