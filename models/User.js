const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    citizenshipno: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        enum: ["male", "female", "other"]
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    isAdmin:{
        default: false
    }
})

module.exports = User = mongoose.model('users', UserSchema);