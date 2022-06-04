/*
 * Törli a fénykardot, majd átirányítja a usert a /lightsaber:jediID oldalra.
 */
const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
    return function(req, res, next) {
        if (typeof res.locals.lightsaber === 'undefined') {
            return next();
        }

        res.locals.lightsaber.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect(`/lightsaber/${res.locals.jedi._id}`);
        });
    };
};
