/**
 * Deletes one team from the database, the enetity that's going to be deleted is res.locals.team
 * The command is only successful if there are no cars registered to said team in the database
 * Reloads to /team
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};