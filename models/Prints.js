const mongoose = require('mongoose');

const PrintsSchema = mongoose.Schema({
    checkOut:[ Array]
});

const Prints = mongoose.model("Prints", PrintsSchema)

module.exports = Prints