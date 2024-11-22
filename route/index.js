const renderMw = require('../middleware/renderMw');

const getTeamsMw = require('../middleware/team/getTeamsMw');
const getTeamMw = require('../middleware/team/getTeamMw');
const saveTeamMw = require('../middleware/team/saveTeamMw');
const delTeamMw = require('../middleware/team/delTeamMw');

const getCarsMw = require('../middleware/car/getCarsMw');
const getCarMw = require('../middleware/car/getCarMw');
const saveCarMw = require('../middleware/car/saveCarMw');
const delCarMw = require('../middleware/car/delCarMw');

module.exports = function(app, objRepo) {  // Accept objRepo as parameter
    app.use('/team/add',
        getTeamsMw(objRepo),
        saveTeamMw(objRepo),
        renderMw(objRepo, 'add-team')
    );

    app.use('/team/edit/:teamid',
        getTeamMw(objRepo),
        saveTeamMw(objRepo),
        renderMw(objRepo, 'edit-team')
    );

    app.get('/team/del/:teamid',
        getTeamMw(objRepo),
        getCarsMw(objRepo),
        delTeamMw(objRepo)
    );

    app.get('/team/:teamid',
        getTeamMw(objRepo),
        getCarsMw(objRepo), // Add this to show team's cars in detail view
        renderMw(objRepo, 'team-details')  // Fix typo in template name
    );

    // General team list route should be last
    app.get('/team',
        getTeamsMw(objRepo),
        renderMw(objRepo, 'index')
    );

    app.get('/car',
        getCarsMw(objRepo),
        renderMw(objRepo, 'cars')
    );
    app.use('/car/edit/:carid',
        getCarMw(objRepo),
        saveCarMw(objRepo),
        renderMw(objRepo, 'edit-car')
    );
    app.use('/car/add',
        getTeamsMw(objRepo),  
        saveCarMw(objRepo),
        renderMw(objRepo, 'add-car')
    );
    app.get('/car/del/:carid',
        getCarMw(objRepo),
        delCarMw(objRepo)
    );
};