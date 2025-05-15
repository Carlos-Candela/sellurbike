const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    sellerId: {
        type: Schema.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    
}, {timestamps: true});

productSchema.index({
    name: 'text',
    category: 'text',
    description: 'text'
},{
    weights: {
        name: 4,
        category: 3,
        description: 2
    }
})

module.exports = model("products", productSchema);