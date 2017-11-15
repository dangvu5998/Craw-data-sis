
const mongoose = require('mongoose');
const { getStudentsById, driver } = require( './getdata');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);
const Student = require('./model');


var startId = process.argv[2]
var endId = process.argv[3]
if(startId && endId) {
  getStudentsById(startId, endId)
  .then(function(data) {
    driver.quit();
    var students = data.students;
    return students.forEach(student => {
      var dateParts = student.birth.split('.');
      new Student({
        studentId: parseInt(student.idStudent),
        priName: student.priName,
        surName: student.surName,
        midName: student.midName,
        birth: new Date(dateParts[2], dateParts[1]-1, dateParts[0]),
        class: student.class,
        eduProgram: student.eduProgram
      }).save(err =>{if(err) console.error(student)});
    })
  })
  .then(() => mongoose.connection.close());
}