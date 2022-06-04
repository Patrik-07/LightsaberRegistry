/*
 * Template-be rendereli az adatokat (jedik, fénykardok lista).
 */
const requireOption = require('./requireOption');

module.exports = function(objectrepository, viewName) {
    return function(req, res) {
        res.render(viewName);
    };
};
