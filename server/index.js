require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const si = require('systeminformation');
const BatteryLog = require('./models/BatteryLog');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
// Get current battery status
app.get('/api/battery/current', async (req, res) => {
    try {
        const battery = await si.battery();
        res.json(battery);
    } catch (error) {
        console.error('Error fetching battery data:', error);
        res.status(500).json({ error: 'Failed to fetch battery data' });
    }
});

// Get battery history (last 24 hours by default)
app.get('/api/battery/history', async (req, res) => {
    try {
        const logs = await BatteryLog.find()
            .sort({ timestamp: -1 })
            .limit(100); // Limit to last 100 entries for now
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

// Manual trigger to log battery status (can be called by a cron job or frontend)
app.post('/api/battery/log', async (req, res) => {
    try {
        const data = await si.battery();
        const log = new BatteryLog({
            percent: data.percent,
            isCharging: data.isCharging,
            timeRemaining: data.timeRemaining,
            acConnected: data.acConnected,
            cycleCount: data.cycleCount,
            capacity: {
                current: data.currentCapacity,
                max: data.maxCapacity,
                designed: data.designedCapacity,
            },
            voltage: data.voltage,
        });
        await log.save();
        res.json({ message: 'Battery status logged', log });
    } catch (error) {
        console.error('Error logging battery data:', error);
        res.status(500).json({ error: 'Failed to log data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
