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

router.put("/", function(req, res) {
  console.log(
    "------------------- finish round route accessed @ " + new Date() + "----------------------------------"
  );
  console.log(req.body);
  var data = req.body;
  var name = toTitleCase(data.name);
  //findOrCreate({query}, {document to insert}, [options], [callback])
  User.findOrCreate({ name: name }, {appendToArray: false, saveOptions: {validateBeforeSave: false}},
    (err, result) => {
	    if(err){console.log(err);}
      console.log("successful find user by name: ", result.name, "completing course ", data.courseName);
      for (var i = 0; i < result.games.length; i++){
        if(result.games[i].courseName === data.courseName && result.games[i].active === true){
          console.log("found by course name ", result.games[i].courseName, " with active status");
          result.games[i].active = false;
          result.save();
          res.status(200).send(result);
        }
      }
  });
}); //closes router.put

module.exports = router;
