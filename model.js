const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  studentId: {type: Number, required: true, unique: true, index:true},
  priName: { type: String, required: true},
  surName: { type: String },
  midName: { type: String },
  birth: { type: Date },
  class: { type: String, index:true },
  eduProgram:  { type: String }
})

module.exports = mongoose.model('Student', studentSchema);
module.exports.studentSchema = studentSchema;