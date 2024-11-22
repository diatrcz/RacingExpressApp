/**
 * Loads all cars from the database
 * The result is saved to res.locals.cars
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const CarModel = requireOption(objectrepository, 'CarModel');
    
    return async function (req, res, next) {
        try {
            const cars = await CarModel.find().populate('_team');
            res.locals.cars = cars;
            return next();
        } catch (err) {
            return next(err);
        }
    };
};