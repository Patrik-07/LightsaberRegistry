/*
 * Ha nincs postparaméterben elküldve a jedikhez tartozó adat,
 * akkor next hívás, amúgy, ha van akkor megpróbálja elmenteni.
 * Hiba esetén, állapot mentése változokba, majd next.
 * Sikeres mentéskor pedig átirányít a /jedi oldalra.
 */
const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
    const JediModel = requireOption(objectRepository, 'JediModel');

    return function(req, res, next) {
        if (
            typeof req.body.name === 'undefined' ||
            typeof req.body.age === 'undefined' ||
            typeof req.body.midichlorianCount === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.jedi === 'undefined') {
            res.locals.jedi = new JediModel();
        }

        res.locals.jedi.name = req.body.name;
        res.locals.jedi.age = req.body.age;
        res.locals.jedi.midichlorianCount = req.body.midichlorianCount;

        res.locals.jedi.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/jedi');
        });
    };
};
