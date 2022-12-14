const Sequelize = require("sequelize");

var sequelize = new Sequelize(
  "dazmdtmo",
  "dazmdtmo",
  "Q2WbiGnr28cuagYAmAj_-KzZ2hnMVBmo",
  {
    host: "peanut.db.elephantsql.com",
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
      ssl: { rejectUnathorization: false },
    },
    query: { raw: true },
  }
);

var Student = sequelize.define("Student", {
  studentID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  addressStreet: Sequelize.STRING,
  addressCity: Sequelize.STRING,
  addressState: Sequelize.STRING,
  addressPostal: Sequelize.STRING,
  isInternationalStudent: Sequelize.BOOLEAN,
  program: Sequelize.STRING,
  expectedCredential: Sequelize.STRING,
  status: Sequelize.STRING,
  registrationDate: Sequelize.STRING,
});

var Program = sequelize.define("Program", {
  programCode: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  programName: Sequelize.STRING,
});

Program.hasMany(Student, { forgeinKey: "program" });

module.exports.initialize = function () {
  return new Promise((resolve, reject) => {
    sequelize
      .sync()
      .then(() => resolve())
      .catch(() => reject("unable to sync the database"));
  });
};

module.exports.getAllStudents = function () {
  return new Promise((resolve, reject) => {
    Student.findAll()
      .then((data) => resolve(data))
      .catch(() => reject("no results returned"));
  });
};

module.exports.getInternationalStudents = function () {
  return new Promise((resolve, reject) => {
    Student.findAll({
      where: {
        isInternationalStudent: true,
      },
    })
      .then((data) => resolve(data))
      .catch(() => reject("no results returned"));
  });
};

module.exports.getPrograms = function () {
  return new Promise((resolve, reject) => {
    Program.findAll()
      .then((data) => resolve(data))
      .catch(() => reject("no results returned"));
  });
};

module.exports.addStudent = function (studentData) {
  return new Promise((resolve, reject) => {
    studentData.isInternationalStudent = studentData.isInternationalStudent
      ? true
      : false;
    for (prop in studentData) {
      if (prop.trim() == "") {
        prop = null;
      }
    }
    console.log(studentData);
    Student.create({
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      email: studentData.email,
      phone: studentData.phone,
      addressStreet: studentData.addressStreet,
      addressCity: studentData.addressCity,
      addressState: studentData.addressState,
      addressPostal: studentData.addressPostal,
      isInternationalStudent: studentData.isInternationalStudent,
      program: studentData.program,
      expectedCredential: studentData.credential,
      status: studentData.status,
      registrationDate: studentData.registrationDate,
    })
      .then(() => resolve())
      .catch(() => "unable to create student");
  });
};

module.exports.getStudentsByStatus = function (time) {
  var enroll;
  if (time == "Full%20Time") {
    enroll = "Full Time";
  } else {
    enroll = "Part Time";
  }
  return new Promise((resolve, reject) => {
    Student.findAll({
      where: {
        status: enroll,
      },
    })
      .then((data) => resolve(data))
      .catch(() => reject("no results returned"));
  });
};

module.exports.getStudentsByProgramCode = function (programCode) {
  return new Promise((resolve, reject) => {
    Student.findAll({
      where: {
        program: programCode,
      },
    })
      .then((data) => resolve(data))
      .catch(() => reject("no results returned"));
  });
};

module.exports.getStudentsByExpectedCredential = function (credential) {
  return new Promise((resolve, reject) => {
    Student.findAll({
      where: {
        expectedCredential: credential,
      },
    })
      .then((data) => resolve(data))
      .catch(() => reject("no results returned"));
  });
};

module.exports.getStudentById = function (sid) {
  return new Promise((resolve, reject) => {
    Student.findAll({
      where: {
        studentID: sid,
      },
    })
      .then((data) => resolve(data))
      .catch(() => reject("no results returned"));
  });
};

module.exports.updateStudent = function (studentData) {
  console.log(studentData);
  return new Promise((resolve, reject) => {
    studentData.isInternationalStudent = studentData.isInternationalStudent
      ? true
      : false;
    for (prop in studentData) {
      if (prop.trim() == "") {
        prop = null;
      }
    }
    Student.update(
      {
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        email: studentData.email,
        phone: studentData.phone,
        addressStreet: studentData.addressStreet,
        addressCity: studentData.addressCity,
        addressState: studentData.addressState,
        addressPostal: studentData.addressPostal,
        isInternationalStudent: studentData.isInternationalStudent,
        program: studentData.program,
        expectedCredential: studentData.credential,
        status: studentData.status,
        registrationDate: studentData.registrationDate,
      },
      {
        where: {
          studentID: studentData.studentID,
        },
      }
    )
      .then(() => resolve())
      .catch(() => reject("unable to update student"));
  });
};

module.exports.addProgram = function (programData) {
  console.log("fere");
  return new Promise((resolve, reject) => {
    for (prop in programData) {
      if (prop.trim() == "") {
        prop = null;
      }
    }
    Program.create({
      programCode: programData.programCode,
      programName: programData.programName,
    })
      .then(() => resolve())
      .catch(() => reject("unable to create program"));
  });
};

module.exports.updateProgram = function (programData) {
  return new Promise((resolve, reject) => {
    for (prop in programData) {
      if (prop.trim() == "") {
        prop = null;
      }
    }
    Program.update(
      {
        programName: programData.programName,
      },
      {
        where: {
          programCode: programData.programCode,
        },
      }
    )
      .then(() => resolve())
      .catch(() => reject("could not update program"));
  });
};

module.exports.getProgramByCode = function (pcode) {
  return new Promise((resolve, reject) => {
    Program.findAll({
      where: {
        programCode: pcode,
      },
    })
      .then((data) => resolve(data[0]))
      .catch(() => reject("unable to update program"));
  });
};

module.exports.deleteProgramByCode = function (pcode) {
  return new Promise((resolve, reject) => {
    Program.destroy({
      where: {
        programCode: pcode,
      },
    })
      .then(() => resolve())
      .catch(() => reject("unable to delete program"));
  });
};

module.exports.deleteStudentById = function (id) {
  return new Promise((resolve, reject) => {
    Student.destroy({
      where: {
        studentID: id,
      },
    })
      .then(() => resolve())
      .catch(() => reject("could not delete student"));
  });
};