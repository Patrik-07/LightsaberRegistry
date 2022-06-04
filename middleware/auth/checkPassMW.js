/*
 * Megnézi, hogy van-e beérkezett postparaméter,
 * ha igen, akkor ha egyezik a jelszóval akkor
 * login session-el, amúgy átirányítja a usert.
 */
const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
    return function(req, res, next) {
        if (typeof req.body.password === 'undefined') {
            return next();
        }

        if (req.body.password === 'c89q11') {
            req.session.login = true;
            return req.session.save(err => res.redirect('/jedi'));
        }

        res.locals.error = 'Wrong password!';
        return next();
    };
};
