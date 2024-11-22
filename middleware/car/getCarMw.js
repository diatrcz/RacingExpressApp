/**
 * Loads a car from the database using the :carid param
 * The result is saved to res.locals.car
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const CarModel = requireOption(objectrepository, 'CarModel');
    const TeamModel = requireOption(objectrepository, 'TeamModel');
    
    return async function (req, res, next) {
        try {
            // Load the car with its team data
            const car = await CarModel.findById(req.params.carid).populate('_team');
            if (!car) {
                return next(new Error('Car not found'));
            }

            // Load all teams for the dropdown
            const teams = await TeamModel.find();
            
            res.locals.car = car;
            res.locals.teams = teams;
            return next();
        } catch (err) {
            return next(err);
        }
    };
};