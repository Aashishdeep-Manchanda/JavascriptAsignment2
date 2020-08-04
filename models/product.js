const mongoose = require('mongoose');

//Create the product Schema
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String
    }
});

//Create, instantiate and export the schema
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;