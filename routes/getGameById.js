var express = require("express");
var router = express.Router();

var User = require('../models/user');

router.put("/", (req, response) => {
  console.log(
    "------------------- getGameById route accessed @ " + new Date() + "----------------------------------"
  );
  console.log(req.body);
  var data = req.body;
  var gameId = data.gameId;
	console.log("searching by ", gameId)
	User.find({'games.gameId': gameId}, { name: 1, "games.gameId.$": 1 }, (err, result) => {
		if(err)
			{
				console.log(err);
			}
			console.log(result[0].games[0])
			var game = []
			result.forEach(r => {
				game.push({
					name: r.name,
					... r.games[0]._doc
				})
			})
			response.status(200).send(game);
  });
}); //closes router.put

module.exports = router;
