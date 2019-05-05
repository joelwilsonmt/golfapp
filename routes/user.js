var express = require("express");
var router = express.Router();

var User = require('../models/user');
//const findOrCreate = require('mongoose-find-or-create');


router.put("/", function(req, res) {
  console.log(
    "-------------------user route accessed @ " + new Date() + "----------------------------------"
  );
  console.log(req.body);
  var data = req.body;

  //findOrCreate({query}, {document to insert}, [options], [callback])
	User.findOrCreate({ name: data.name }, {name: data.name.toLowerCase()}, (err, result) => {
	if(err){console.log(err);}
    console.log("successful find user by name: ", data.name);
    res.status(200).send(result);
  });
}); //closes router.put

module.exports = router;
