var express = require("express");
var router = express.Router();

var User = require('../models/user');
//const findOrCreate = require('mongoose-find-or-create');
var toTitleCase = function (str) {
	str = str.toLowerCase().split(' ');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(' ');
};

router.put("/", function(req, response) {
  console.log(
    "-------------------get player data route accessed @ " + new Date() + "----------------------------------"
  );
  console.log(req.body);
  var data = req.body;
  var name = toTitleCase(data.name);
  //findOrCreate({query}, {document to insert}, [options], [callback])
	User.find({ name: name }, /* {name: name}, */ (err, result) => {
	if(err){console.log(err);}
    console.log("successful find user by name: ", result);
    response.status(200).send(result);
  });
}); //closes router.put

module.exports = router;
