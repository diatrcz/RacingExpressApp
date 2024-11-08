const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/qm5ea9', { useNewUrlParser: true });

module.exports = mongoose;