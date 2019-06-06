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
    "-------------------user route accessed @ " + new Date() + "----------------------------------"
  );
  console.log(req.body);
  var data = req.body;
  var name = toTitleCase(data.name);
  //findOrCreate({query}, {document to insert}, [options], [callback])
	User.findOrCreate({ name: name }, {name: name}, (err, result) => {
	if(err){console.log(err);}
    console.log("successful find user by name: ", result, "pushing course to user games");
    console.log("user games before push: ", result.games);
    var date = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    const newGame = {
      courseName: data.courseName,
      active: data.active,
			players: data.players,
      holes: Array(data.holes).fill({}),
      date: date,
      formattedDate: date.toLocaleString('en-US', options)
    }
    result.games.push(newGame);
    console.log("user games after push: ", result.games);
    result.markModified('games');
    result.save();
    res.status(200).send(result);
  });
}); //closes router.put

module.exports = router;
