/**
 * Loads all teams from the database
 * The result is saved to res.locals.teams
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const TeamModel = requireOption(objectrepository, 'TeamModel');
    
    return async function (req, res, next) {
        try {
            const teams = await TeamModel.find().sort({ fullName: 1 });
            res.locals.teams = teams;
            return next();
        } catch (err) {
            return next(err);
        }
    };
};