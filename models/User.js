const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// (citizenshipno, firstname, middlename, lastname, gender, dob, grandfathers name, fathers name, mothers name, street, ward, municipality, district, country)

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
        enum: ["male", "female"]
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
    bloodgroup: {
        type: String
    }
})

module.exports = User = mongoose.model('users', UserSchema);