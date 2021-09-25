const mongoose = require('mongoose');

const ProductsSchema = mongoose.Schema({
    product:{
        type:String,
        require: true
    },
    price:{
        type:String,
    },
    productImage:{
        type:String,
    },
    // countInStock:{
    //     type:Number,
    // },
});

const Products = mongoose.model("Products", ProductsSchema)

module.exports = Products