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
    "------------------- hole route accessed @ " + new Date() + "----------------------------------"
  );
  console.log(req.body);
  var data = req.body;
  var name = toTitleCase(data.name);
  //findOrCreate({query}, {document to insert}, [options], [callback])
  User.findOrCreate({ name: name }, {appendToArray: false, saveOptions: {validateBeforeSave: false}},
    (err, result) => {
	    if(err){console.log(err);}
      console.log("successful find user by name: ", result.name, "amending hole ", data.holeNumber);
      for (var i = 0; i < result.games.length; i++){
        if(result.games[i].gameId === data.gameId && result.games[i].active === true){
          console.log("found by gameId", result.games[i].gameId, " with active status");
          var holeObj = {
						modified: data.modified,
            par: data.par,
            strokes: data.strokes,
            putts: data.putts,
            fairwayHit: data.fairwayHit,
            greensInRegulation: data.greensInRegulation,
            picture: data.picture
          }
					console.log("picture in hole object on server:  ", holeObj.picture)
					console.log("length: ", holeObj.picture.length)
					console.log("and date modded: ", holeObj.modified)
          result.games[i].holes[data.holeNumber-1] = holeObj;
          result.markModified('holes');
          result.save();
          res.status(200).send(result);
        }
      }
  });
}); //closes router.put

module.exports = router;
