/**
 * Deletes one car from the database, the enetity that's going to be deleted is res.locals.car
 * Reloads to /car
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};