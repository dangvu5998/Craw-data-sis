db.students.find({}, {_id:0, __v: 0}).toArray()
.forEach((student) => printjson(student))