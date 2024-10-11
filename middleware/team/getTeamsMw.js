/**
 * Loads all teams from the database
 * The result is saved to res.locals.teams
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};