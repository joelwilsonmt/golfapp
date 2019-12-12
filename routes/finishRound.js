var express = require("express");
var router = express.Router();

var User = require('../models/user');

router.put("/", (req, response) => {
  console.log(
    "------------------- finishRound route accessed @ " + new Date() + "----------------------------------"
  );
  console.log(req.body);
  var data = req.body;
  var gameId = data.gameId;
	console.log("searching by ", gameId)
	//{ name: 1, "games.gameId.$": 1 }
	User.find({'games.gameId': gameId}, { name: 1, "games.gameId.$": 1 }, (err, results) => {
		var serverReturn = []
		if(err)
			{
				console.log(err);
			}
			console.log("finish round rounds: ", results[0].games)
		// sets all participants' games to active: false:
		results.forEach(async (result, index) => {
			console.log("searching by game id in loop: ", result.games[0].gameId)
			await User.findOne({name: result.name, 'games.gameId': result.games[0].gameId}, { name: 1, "games.gameId.$": 1 }, (error, res) => {
				console.log("find one result in loop: ", res)
				if(err){console.log("findone loop err: ", err)}
				res.games[0].active = false;
				console.log("active before save: ", res.games[0].active)
				res.save()
				serverReturn.push(res)
				if(index === results.length - 1){
					response.status(200).send(serverReturn);
				}
			})
		})
  });
}); //closes router.put

module.exports = router;
