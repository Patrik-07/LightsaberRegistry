/*
 * Hasonlóan működik, mint a getJediMW,
 * csak egy másik postparaméterrel, változóval.
 * Tehát postparaméterben levő ID segítségével kéri le
 * az adatbázisban levő adatokat,
 * ezeket egy objectbe (res.locals) mentjük,
 * majd ezt kirendereljük.
 */
const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
    const LightsaberModel = requireOption(objectRepository, 'LightsaberModel');

    return function(req, res, next) {
        LightsaberModel.findOne(
            {
                _id: req.params.lightsaberID
            },
            (err, lightsaber) => {
                if (err || !lightsaber) {
                    return next(err);
                }

                res.locals.lightsaber = lightsaber;
                return next();
            }
        );
    };
};
