const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost/c89q11', { useNewUrlParser: true }
);

module.exports = mongoose;
