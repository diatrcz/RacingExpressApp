const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Car = db.model('Car', {
    numberOf: Number,
    chassis: String,
    powerUnit: String,
    _team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }
});

module.exports = Car;