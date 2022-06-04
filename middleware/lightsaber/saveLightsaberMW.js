/*
 * Hasonlóan működik, mint a saveJediMW.
 * Ha nincs postparaméterben elküldve a lightsaberhez tartozó adat,
 * akkor next hívás, amúgy, ha van akkor megpróbálja elmenteni.
 * Hiba esetén, állapot mentése változokba, majd next.
 * Sikeres mentéskor pedig átirányít a /lightsaber/:jediID oldalra.
 */
const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
    const LightsaberModel = requireOption(objectRepository, 'LightsaberModel');

    return function(req, res, next) {
        console.log(req.body.hilt)
        console.log(req.body.color)
        console.log( req.body.length)
        if (
            typeof req.body.hilt === 'undefined' ||
            typeof req.body.color === 'undefined' ||
            typeof req.body.length === 'undefined' ||
            typeof res.locals.jedi === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.lightsaber === 'undefined') {
            res.locals.lightsaber = new LightsaberModel();
        }

        res.locals.lightsaber.hilt = req.body.hilt;
        res.locals.lightsaber.color = req.body.color;
        res.locals.lightsaber.length = req.body.length;
        res.locals.lightsaber._owner = res.locals.jedi._id;

        res.locals.lightsaber.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect(`/lightsaber/${res.locals.jedi._id}`);
        });
    };
};
