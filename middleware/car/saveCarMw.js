/**
 * Using POST params update or save a car to the database
 * If res.locals.car is there, it's an update otherwise this middleware creates an entity
 * Redirects to /cars after success
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const CarModel = requireOption(objectrepository, 'CarModel');
    const TeamModel = requireOption(objectrepository, 'TeamModel');
    
    return async function (req, res, next) {
        // For GET requests, load teams for the dropdown
        if (req.method === 'GET') {
            try {
                const teams = await TeamModel.find();
                res.locals.teams = teams;
                return next();
            } catch (err) {
                return next(err);
            }
        }

        // Handle POST request
        if (
            typeof req.body.numberOf === 'undefined' ||
            typeof req.body.chassis === 'undefined' ||
            typeof req.body.powerUnit === 'undefined' ||
            typeof req.body._team === 'undefined'
        ) {
            return next();
        }

        let car;
        
        if (typeof res.locals.car !== 'undefined') {
            // Editing existing car
            car = res.locals.car;
        } else {
            // Creating new car
            car = new CarModel();
        }

        // Update car properties
        car.numberOf = req.body.numberOf;
        car.chassis = req.body.chassis;
        car.powerUnit = req.body.powerUnit;
        car._team = req.body._team;

        try {
            await car.save();
            return res.redirect('/car');
        } catch (err) {
            return next(err);
        }
    };
};