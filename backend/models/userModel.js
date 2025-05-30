const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        default: '',
    },   
    province: {
        type: String,
        default: '',
    },  
    postalCode: {
        type: String,
        default: '',
    }, 
    city: {
        type: String,
        default: '',
    }, 
    phone: {
        type: String,
        default: '',
    }, 
    password: {
        type: String,
        required: true,
        select:false,
    },
    image: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        default: "pending",
    },
    payment: {
        type: String,
        default: "inactive",
    },
    role: {
        type: String,
        default: "seller",
    },
    method:{
        type: String,
        required: true
    }
},{timestamps: true});

module.exports = model("users", userSchema);