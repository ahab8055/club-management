const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.use("/api", require("./controller/auth"));

app.use("/views/css", express.static(__dirname + "/views/css"));
app.use("/views/js", express.static(__dirname + "/views/js"));
app.use("/views/partials", express.static(__dirname + "/views/partials"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.listen(8080, (req, res) => {
  console.log("App is Running");
});
