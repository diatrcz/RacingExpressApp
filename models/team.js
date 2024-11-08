const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Team = db.model('Team', {
    fullName: String,
    base: String,
    teamChief: String,
    firstEntry: Number,
    championships: Number,
    highestfinish: String,
    polePositions: Number,
    fastestLaps: Number
});

module.exports = Team;