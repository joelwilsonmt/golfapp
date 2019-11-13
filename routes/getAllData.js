var express = require("express");
var router = express.Router();

var User = require('../models/user');

router.put("/", function(req, response) {
  console.log(
    "-------------------getAllData route accessed @ " + new Date() + "----------------------------------"
  );
	User.find((err, result) => {
	if(err){console.log(err);}
    console.log("successful user data returning:", result);
    response.status(200).send(result);
  });
}); //closes router.put

module.exports = router;
