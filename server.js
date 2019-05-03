var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");

var getUser = require("./routes/getUser");
var updateUser = require("./routes/updateUser");
var contract = require("./routes/contract");

var app = express();
var http = require("http").Server(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/getUser", getUser);
app.use("/updateUser", updateUser);
app.use("/contract", contract);

let port = process.env.PORT || 3001;

// var oracle = require('./oracle-service/src/oracle.js');

http.listen(port, function() {
  console.log("listening on *: " + port);
});
