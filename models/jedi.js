const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Jedi = db.model('Jedi', {
    name: String,
    age: Number,
    midichlorianCount: Number
});

module.exports = Jedi;
