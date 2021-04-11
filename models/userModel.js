const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:     String,
        required: true,
        unique:   true
    },
    email:{
        type:     String,
        required: true,
        unique:   true
    },
    password:{
        type:     String,
        required: true,
    },
    fullName:{
        type:     String,
        required: true,
    },
    phoneNumber:{
        type:     String,
        required: true,
    },
    image:{
        type:String,
        default:""
    },
});

module.exports = mongoose.model('Users',userSchema);