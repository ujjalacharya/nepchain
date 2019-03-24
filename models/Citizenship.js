const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CitizenshipSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  citizenshipno: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  middlename: {
    type: String
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  grandfathersname: {
    type: String,
    required: true
  },
  fathersname: {
    type: String,
    required: true
  },
  mothersname: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  ward: {
    type: String,
    required: true
  },

  isApproved: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isCalled: {
      type: Boolean,
      default: false
  },
  municipality: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  cardissuer: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  }
});

module.exports = Citizenship = mongoose.model(
  "citizenships",
  CitizenshipSchema
);
