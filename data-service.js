var students, programs;
var fs = require("fs");

module.exports.initialize = function () {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/students.JSON", (err, data) => {
      if (err) reject("File not read");
      students = JSON.parse(data);
      resolve();
    });
    fs.readFile("./data/programs.JSON", (err, data) => {
      if (err) reject("File not read");
      students = JSON.parse(data);
      resolve();
    });
  });
};

module.exports.getAllStudents = function () {
  return new Promise((resolve, reject) => {
    if (students.length > 0) resolve(students);
    else reject("No results returned");
  });
};

module.exports.getInternationalStudents = function () {
  return new Promise((resolve, reject) => {
    const internationalStu = students.filter((stud) => {
      return stud.isInternationalStudent === true;
    });
    if (internationalStu.length > 0) resolve(internationalStu);
    else reject("No results returned");
  });
};

module.exports.getPrograms = function () {
  return new Promise((resolve, reject) => {
    if (programs.length > 0) resolve(programs);
    else reject("No results returned");
  });
};