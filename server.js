var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");

var user = require("./routes/user");
var contract = require("./routes/contract");

var app = express();
var http = require("http").Server(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/user", user);
app.use("/contract", contract);

let port = process.env.PORT || 3001;

http.listen(port, function() {
  console.log("listening on *: " + port);
});
