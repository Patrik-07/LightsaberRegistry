/*
 * Ellenőrzi, hogy a user be van-e jelentkezve.
 * Ha be van, next, ha nincs akkor átirányítja
 * a /?error endpointra.
 */
const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
    return function(req, res, next) {
        if (typeof req.session.login === 'undefined' || req.session.login !== true) {
            return res.redirect('/');
        }
        next();
    };
};
