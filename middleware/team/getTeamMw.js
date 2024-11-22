/**
 * Loads a team from the database using the :teamid param
 * The result is saved to res.locals.team
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const TeamModel = requireOption(objectrepository, 'TeamModel');
    
    return async function (req, res, next) {
        try {
            const team = await TeamModel.findById(req.params.teamid);
            if (!team) {
                return next(new Error('Team not found'));
            }
            res.locals.team = team;
            return next();
        } catch (err) {
            return next(err);
        }
    };
};