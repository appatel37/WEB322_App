/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Aryan Pareshbhai Patel Student ID: 133889212 Date: 04/11/2022
*
*  Online (Cyclic) Link: https://cheerful-school-uniform-lion.cyclic.app/
*
********************************************************************************/

var express = require("express");

var app = express();

var path = require("path");

var data = require("./data-service");

var multer = require("multer");

var fs = require("fs");

var exphbs = require("express-handlebars");

var { equal } = require("assert");

var HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    helpers: {
      navLink: (url, options) => {
        return (
          "<li" +
          (url == app.locals.activeRoute ? ' class="active" ' : "") +
          '><a href="' +
          url +
          '">' +
          options.fn(this) +
          "</a></li>"
        );
        equal: f;
      },
      equal: (lvalue, rvalue, options) => {
        if (arguments.length < 3)
          throw new error("Handlebars Helper equal needs 2 parameters");
        if (lvalue != rvalue) {
          return options.inverse(this);
        } else {
          return options.fn(this);
        }
      },
    },
  })
);

app.set("view engine", ".hbs");

var onHTTPStart=() => {
  console.log("Express http server listening on port " + HTTP_PORT);
}

var storage = multer.diskStorage({
  destination: "./public/images/uploaded",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

app.use(function (req, res, next) {
  let route = req.baseUrl + req.path;
  app.locals.activeRoute = route == "/" ? "/" : route.replace(/\/$/, "");
  next();
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/students", (req, res) => {
  if (req.query.status) {
    data
      .getStudentsByStatus(req.query.status)
      .then((data) => {
        res.render("students", { students: data });
      })
      .catch((error) => {
        res.json({ Message: "error" });
      });
  } else if (req.query.program) {
    data
      .getStudentsByProgramCode(req.query.program)
      .then((data) => {
        res.render("students", { students: data });
      })
      .catch((error) => {
        res.json({ Message: "error" });
      });
  } else if (req.query.credential) {
    data
      .getStudentsByExpectedCredential(req.query.credential)
      .then((data) => {
        res.render("students", { students: data });
      })
      .catch((error) => {
        res.json({ Message: "error" });
      });
  } else {
    data
      .getAllStudents()
      .then((data) => {
        res.render("students", { students: data });
      })
      .catch((error) => {
        res.render("students", { message: "no results" });
      });
  }
});

app.post("/student/update", (req, res) => {
  data
    .updateStudent(req.body)
    .then(res.redirect("/students"))
    .catch((error) => {
      console.log("error", error);
    });
});

app.get("/programs", (req, res) => {
  data
    .getPrograms()
    .then((data) => {
      res.render("programs", { programs: data });
    })
    .catch((error) => {
      res.json({ Message: "error" });
    });
});

app.get("/students/add", (req, res) => {
  res.render("addStudent");
});

app.get("/images/add", (req, res) => {
  res.render("addImage");
});

app.post("/images/add", upload.single("imageFile"), (req, res) => {
  res.redirect("/images");
});

app.get("/images", (req, res) => {
  fs.readdir("./public/images/uploaded", (error, data) => {
    if (error) console.log("error in reading the directory.");
    else {
      res.render("images", { images: data });
    }
  });
});

app.get("/student/:studentId", (req, res) => {
  data
    .getStudentById(req.params.studentId)
    .then((data) => {
      res.render("student", { student: data });
    })
    .catch((error) => {
      res.render("student", { message: "no results" });
    });
});

app.use((req, res) => {
  res
    .status(404)
    .send(
      "Error 404. Page not found."
    );
});

data
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, onHTTPStart);
  })
  .catch((error) => {
    console.log("error");
  });