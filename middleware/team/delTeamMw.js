/**
 * Deletes one team from the database, the enetity that's going to be deleted is res.locals.team
 * The command is only successful if there are no cars registered to said team in the database
 * Reloads to /team
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const TeamModel = requireOption(objectrepository, 'TeamModel');
    const CarModel = requireOption(objectrepository, 'CarModel');
    
    return async function (req, res, next) {
        if (typeof res.locals.team === 'undefined') {
            return next();
        }

        try {
            // Explicitly check for cars associated with this specific team
            const carCount = await CarModel.countDocuments({ _team: res.locals.team._id });
            
            if (carCount > 0) {
                console.log(`Cannot delete team: ${carCount} cars are still associated`);
                return res.redirect(`/team/${res.locals.team._id}`);
            }

            // If no cars are associated, proceed with deletion
            await res.locals.team.deleteOne();
            return res.redirect('/team');
            
        } catch (err) {
            return next(err);
        }
    };
};