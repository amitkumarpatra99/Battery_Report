const mongoose = require('mongoose');

const BatteryLogSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    percent: Number,
    isCharging: Boolean,
    timeRemaining: Number, // in minutes
    acConnected: Boolean,
    cycleCount: Number,
    capacity: {
        current: Number,
        max: Number,
        designed: Number,
    },
    voltage: Number,
    temperature: Number,
});

module.exports = mongoose.model('BatteryLog', BatteryLogSchema);
