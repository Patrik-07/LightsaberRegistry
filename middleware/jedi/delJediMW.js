/*
 * Törli a jedit, majd átirányítja a usert a /jedi oldalra.
 */
const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
    return function(req, res, next) {
        if (typeof res.locals.jedi === 'undefined') {
            return next();
        }

        res.locals.jedi.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/jedi');
        });
    };
};
