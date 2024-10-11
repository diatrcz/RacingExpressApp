const renderMw = require('../middleware/renderMw');

const getTeamsMw = require('../middleware/team/getTeamsMw');
const getTeamMw = require('../middleware/team/getTeamMw');
const saveTeamMw = require('../middleware/team/saveTeamMw');
const delTeamMw = require('../middleware/team/delTeamMw');

const getCarsMw = require('../middleware/car/getCarsMw');
const getCarMw = require('../middleware/car/getCarMw');
const saveCarMw = require('../middleware/car/saveCarMw');
const delCarMw = require('../middleware/car/delCarMw');

module.exports = function(app) {
    const objRepo = {};

    app.use('/team',
        getTeamsMw(objRepo),
        renderMw(objRepo, 'index')
    );
    app.get('/team/:teamid',
        getTeamMw(objRepo),
        renderMw(objRepo, 'team-detals')
    );
    app.use('/team/edit/:teamid',
        getTeamMw(objRepo),
        saveTeamMw(objRepo),
        renderMw(objRepo, 'edit-team')
    );
    app.use('/team/add',
        saveTeamMw(objRepo),
        renderMw(objRepo, 'add-team')
    );
    app.get('/team/del/:teamid',
        getTeamMw(objRepo),
        getCarsMw(objRepo),
        delTeamMw(objRepo)
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
        saveCarMw(objRepo),
        renderMw(objRepo, 'add-car')
    );
    app.get('/car/del/:carid',
        getCarMw(objRepo),
        delCarMw(objRepo)
    );
};
