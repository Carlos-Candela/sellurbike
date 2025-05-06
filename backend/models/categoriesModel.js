const {Schema, model} = require('mongoose');

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
});

module.exports = model("categories", adminSchema);