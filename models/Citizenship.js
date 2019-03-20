const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CitizenshipSchema = new Schema({
user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
},
 citizenshipno:{
  type: String,
  required: true
 },
 firstname:{
  type: String,
  required: true
 },
 middlename:{
  type: String,
  required: true
 },
 lastname:{
  type: String,
  required: true
 },
 gender:{
  type: String,
  enum: ["male", "female", "other"],
  required: true
 },
 dob:{
  type: String,
  required: true
 },
 grandfathersname:{
  type: String,
  required: true
 },
 fathersname:{
  type: String,
  required: true
 },
 mothersname:{
  type: String,
  required: true
 },
 street:{
  type: String,
  required: true
 },
 ward:{
  type: String,
  required: true
 },
 municipality:{
  type: String,
  required: true
 },
 district:{
  type: String,
  required: true
 },
 cardissuer:{
  type: String,
  required: true
 },
 image:{
  type: String,
  required: false
 },
 approved: {
  type: Boolean,
  default: false
 }
});

module.exports = Citizenship = mongoose.model("citizenships", CitizenshipSchema);