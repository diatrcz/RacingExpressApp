/**
 * Using POST params update or save a team to the database
 * If res.locals.team is there, it's an update otherwise this middleware creates an entity
 * If it's an update it redirects to /team/:teamid otherwise it redirects to /team
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};
