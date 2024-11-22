/**
 * Using POST params update or save a team to the database
 * If res.locals.team is there, it's an update otherwise this middleware creates an entity
 * If it's an update it redirects to /team/:teamid otherwise it redirects to /team
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const TeamModel = requireOption(objectrepository, 'TeamModel');
    
    return async function (req, res, next) {
        // For GET requests, just continue to render
        if (req.method === 'GET') {
            return next();
        }

        // Handle POST request
        if (
            typeof req.body.fullName === 'undefined' ||
            typeof req.body.base === 'undefined' ||
            typeof req.body.teamChief === 'undefined' ||
            typeof req.body.firstEntry === 'undefined' ||
            typeof req.body.championships === 'undefined' ||
            typeof req.body.highestfinish === 'undefined' ||
            typeof req.body.polePositions === 'undefined' ||
            typeof req.body.fastestLaps === 'undefined'
        ) {
            return next();
        }

        let team;
        
        if (typeof res.locals.team !== 'undefined') {
            // Editing existing team
            team = res.locals.team;
        } else {
            // Creating new team
            team = new TeamModel();
        }

        // Update team properties
        team.fullName = req.body.fullName;
        team.base = req.body.base;
        team.teamChief = req.body.teamChief;
        team.firstEntry = parseInt(req.body.firstEntry);
        team.championships = parseInt(req.body.championships);
        team.highestfinish = req.body.highestfinish;
        team.polePositions = parseInt(req.body.polePositions);
        team.fastestLaps = parseInt(req.body.fastestLaps);

        try {
            await team.save();
            return res.redirect('/team');
        } catch (err) {
            return next(err);
        }
    };
};
