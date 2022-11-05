var fs = require("fs");
var students = [];
var programs = [];

module.exports.initialize = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/students.JSON", (err, data) => {
      if (err) reject("Unable to read the file");
      students = JSON.parse(data);
    });
    fs.readFile("./data/programs.JSON", (err, data) => {
      if (err) reject("Unable to read the file");
      programs = JSON.parse(data);
    });
    resolve();
  });
};

module.exports.getAllStudents = () => {
  return new Promise((resolve, reject) => {
    if (students.length > 0) resolve(students);
    else reject("No results");
  });
};

module.exports.getPrograms = () => {
  return new Promise((resolve, reject) => {
    if (programs.length > 0) resolve(programs);
    else reject("No results");
  });
};

module.exports.addStudent = (studentData) => {
  return new Promise((resolve, reject) => {
    if (typeof studentData.isInternationalStudent === undefined)
      studentData.isInternationalStudent = false;
    else studentData.isInternationalStudent = true;
    var id = [], newID;
    students.forEach((id) => {
      id.push(parseInt(id.studentID));
    });
    newID = Math.max(id) + 1;
    newID = toString(newID);
    studentData.studentID = newID;
    students.push(studentData);
  });
};

module.exports.getStudentsByStatus = (status) => {
  return new Promise((resolve, reject) => {
    var statStu = students.filter((studentData) => {
      return studentData.status === status;
    });
    if (statStu.length > 0) resolve(statStu);
    else reject("No Results Returned");
  });
};

module.exports.getStudentsByProgramCode = (programCode) => {
  return new Promise((resolve, reject) => {
    var studentData = students.filter((studentData) => {
      return studentData.program === programCode;
    });
    if (studentData.length > 0) resolve(studentData);
    else reject("No results");
  });
};

module.exports.getStudentsByExpectedCredential = (credential) => {
  return new Promise((resolve, reject) => {
    var studentData = students.filter((studentData) => {
      return studentData.expectedCredential === credential;
    });
    if (studentData.length > 0) resolve(studentData);
    else reject("No Results Returned");
  });
};

module.exports.getStudentById = (studentID) => {
  return new Promise((resolve, reject) => {
    var studentID = students.filter((studentData) => {
      return studentData.studentID === studentID;
    });
    if (studentID.length > 0) resolve(studentID[0]);
    else reject("No Results Returned");
  });
};

module.exports.updateStudent = (studentData) => {
  return new Promise((resolve, reject) => {
    students.forEach((studentData) => {
      if (studentData.studentID === studentData.studentID) {
        studentData.studentID = studentData.studentID;
        studentData.firstName = studentData.firstName;
        studentData.lastName = studentData.lastName;
        studentData.program = studentData.program;
        studentData.expectedCredential = studentData.expectedCredential;
        studentData.status = studentData.status;
        studentData.isInternationalStudent = studentData.isInternationalStudent;
        resolve();
      }
      else{
        reject("Student not found");
      }
    });
  });
};