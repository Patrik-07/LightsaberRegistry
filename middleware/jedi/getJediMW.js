/*
 * Postparaméterben levő ID segítségével kéri le
 * az adatbázisban levő adatokat,
 * ezeket egy objectbe (res.locals) mentjük,
 * majd ezt kirendereljük.
 */
const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
    const JediModel = requireOption(objectRepository, 'JediModel');

    return function(req, res, next) {
        JediModel.findOne({ _id: req.params.jediID }, (err, jedi) => {
            if (err || !jedi) {
                return next(err);
            }

            res.locals.jedi = jedi;
            return next();
        });
    };
};
