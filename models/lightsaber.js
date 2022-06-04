const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Lightsaber = db.model('Lightsaber', {
    hilt: String,
    color: String,
    length: Number,
    _owner: {
        type: Schema.Types.ObjectId,
        ref: 'Jedi'
    }
});

module.exports = Lightsaber;
