const mongoose = require('mongoose');


const foodSchema = mongoose.Schema({
    name:String,
    coverImage:{
        type:String,
        default:""
    },
    category:   String,
    price:      String,
    discount:   String,
    rate:{
        type:   String,
        default: "5"
    },
    description:String
});

module.exports = mongoose.model('Foods',foodSchema);