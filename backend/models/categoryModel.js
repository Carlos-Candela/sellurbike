const {Schema, model} = require('mongoose');

const adminSchema = new Schema({
    name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    }
});

module.exports = model("categories", adminSchema);