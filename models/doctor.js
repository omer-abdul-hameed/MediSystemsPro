// Require the Mongoose package
const mongoose = require('mongoose');

// Create a schema to define the properties of the doctors collection
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['MD', 'DO'],
    required: true
  },
  school: {
    type: String,
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
  availability: {
    type: Boolean,
    default: true
  }
});

// Export the schema as a Mongoose model
module.exports = doctorSchema;
// module.exports = mongoose.model('Doctor', doctorSchema);
