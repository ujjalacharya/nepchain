const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    assignedWard: {
        type: Number,
        required: true
    },
    isSuperAdmin: {
        default: false
    }
})

module.exports = Admin = mongoose.model('admin', UserSchema);