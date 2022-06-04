const authMW = require('../middleware/auth/authMW');
const checkPassMW = require('../middleware/auth/checkPassMW');
const logoutMW = require('../middleware/auth/logoutMW');

const renderMW = require('../middleware/renderMW');

const delJediMW = require('../middleware/jedi/delJediMW');
const getJedisMW = require('../middleware/jedi/getJedisMW');
const getJediMW = require('../middleware/jedi/getJediMW');
const saveJediMW = require('../middleware/jedi/saveJediMW');

const delLightsaberMW = require('../middleware/lightsaber/delLightsaberMW');
const getLightsabersMW = require('../middleware/lightsaber/getLightsabersMW');
const getLightsaberMW = require('../middleware/lightsaber/getLightsaberMW');
const saveLightsaberMW = require('../middleware/lightsaber/saveLightsaberMW');

const JediModel = require('../models/jedi');
const LightsaberModel = require('../models/lightsaber');

module.exports = function(app) {
    const objRepo = {
        JediModel: JediModel,
        LightsaberModel: LightsaberModel
    };

    app.use(
        '/jedi/new',
        authMW(objRepo),
        saveJediMW(objRepo),
        renderMW(objRepo, 'jediSet')
    );
    app.use(
        '/jedi/edit/:jediID',
        authMW(objRepo),
        getJediMW(objRepo),
        saveJediMW(objRepo),
        renderMW(objRepo, 'jediSet')
    );
    app.get(
        '/jedi/del/:jediID',
        authMW(objRepo),
        getJediMW(objRepo),
        delJediMW(objRepo)
    );
    app.get(
        '/jedi',
        authMW(objRepo),
        getJedisMW(objRepo),
        renderMW(objRepo, 'jediView')
    );

    app.use(
        '/lightsaber/:jediID/new',
        authMW(objRepo),
        getJediMW(objRepo),
        saveLightsaberMW(objRepo),
        renderMW(objRepo, 'lightsaberSet')
    );
    app.get(
        '/lightsaber/:jediID/del/:lightsaberID',
        authMW(objRepo),
        getJediMW(objRepo),
        getLightsaberMW(objRepo),
        delLightsaberMW(objRepo),
        renderMW(objRepo, 'lightsaberSet')
    );
    app.get(
        '/lightsaber/:jediID',
        authMW(objRepo),
        getJediMW(objRepo),
        getLightsabersMW(objRepo),
        renderMW(objRepo, 'lightsaberView')
    );

    app.use('/logout', logoutMW(objRepo));

    app.use('/', checkPassMW(objRepo), renderMW(objRepo, 'index'));
};
