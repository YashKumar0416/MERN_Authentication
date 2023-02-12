const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    img: {
        type: String,
        required:true
    },
    price: {
        type: String,
        required:true
    },
    storage: {
        type: String,
        required:true
    },
    ram: {
        type: String,
        required:true
    },
    processor: {
        type: String,
        required:true
    },
})

module.exports = mongoose.model('product', ProductSchema);