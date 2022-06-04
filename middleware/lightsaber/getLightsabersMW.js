/*
 * Lekérdezi az adatbázisból a fénykardokat.
 */
const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
    const LightsaberModel = requireOption(objectRepository, 'LightsaberModel');

    return function(req, res, next) {
        if (typeof res.locals.jedi === 'undefined') {
            return next();
        }

        LightsaberModel.find({ _owner: res.locals.jedi._id }, (err, lightsabers) => {
            if (err) {
                return next(err);
            }

            res.locals.lightsabers = lightsabers;
            return next();
        });
    };
};
