/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Aryan Pareshbhai Patel Student ID: 133889212 Date: 30/09/2022
*
*  Online (Cyclic) Link: 
*
********************************************************************************/

var exp = require("express");
var app = exp();
var jsonData = require("./data-service.js");
var path = require("path");
const { json } = require("body-parser");
var HTTP_PORT = process.env.PORT || 8080;

app.use(exp.static("public/css"));

function onStart() {
  console.log("Server listening on port " + HTTP_PORT);
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/about.html"));
});

app.get("/students", (req, res) => {
  jsonData
    .getAllStudents()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ Message: "Error" });
    });
});

app.get("/intlstudents", (req, res) => {
  jsonData
    .getInternationalStudents()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ Message: "Error" });
    });
});

app.get("/programs", (req, res) => {
  jsonData
    .getAllStudents()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ Message: "Error" });
    });
});

app.use((req, res) => {
  res.status(404).send("Page not found.");
});

jsonData
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, onStart);
  })
  .catch((err) => {
    console.log("Error");
  });