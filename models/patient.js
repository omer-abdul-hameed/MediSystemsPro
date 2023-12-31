// Require the Mongoose package
const mongoose = require('mongoose');

// Create a schema to define the properties of the patients collection

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  sex: {
    type: String,
    enum: ['Male', 'Female', 'Other','Prefer not to say'],
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  ssn: {
    type: String,
    required: true
  },
  maritalStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed'],
    required: true
  },
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  checkedIn: {
    type: Boolean,
    default: false
  },
  allergies: {
    type: String,
    default: 'NKDA'
  },
  doctors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  }]
});

// Export the schema as a Monogoose model. 
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('Patient', patientSchema);