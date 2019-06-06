var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");

var user = require("./routes/user");
var hole = require("./routes/hole");
var finishRound = require("./routes/finishRound");

var app = express();
var http = require("http").Server(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/user", user);
app.use("/hole", hole);
app.use("/finishRound", finishRound);

let port = process.env.PORT || 3001;

http.listen(port, function() {
  console.log("listening on *: " + port);
});
