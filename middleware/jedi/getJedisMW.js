/*
 * Lekérdezi az adatbázisból a jedi lovagokat.
 */
const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
    const JediModel = requireOption(objectRepository, 'JediModel');

    return function(req, res, next) {
        JediModel.find({}, (err, jedis) => {
            if (err) {
                return next(err);
            }

            res.locals.jedis = jedis;
            return next();
        });
    };
};
