/**
 * Deletes one car from the database, the enetity that's going to be deleted is res.locals.car
 * Reloads to /car
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const CarModel = requireOption(objectrepository, 'CarModel');
    
    return async function (req, res, next) {
        if (typeof res.locals.car === 'undefined') {
            return next();
        }

        try {
            await res.locals.car.deleteOne();
            res.redirect('/car');
        } catch (err) {
            next(err);
        }
    };
};