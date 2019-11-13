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

router.put("/", (req, response) => {
  console.log(
    "------------------- getCurrentGameForUser route accessed @ " + new Date() + "----------------------------------"
  );
  console.log(req.body);
  var data = req.body;
  var name = toTitleCase(data.name);
	User.find({ name: name }, (err, result) => {
		if(err)
			{
				console.log(err);
			}

		const lastGameIndex = result[0].games.length
		console.log("successful find user by name: ", result[0].name, "with ", lastGameIndex, "games");
		const lastPlayedGame = result[0].games[lastGameIndex-1]
		let game = [{
			name: name,
			holes: lastPlayedGame.holes,
			courseName: lastPlayedGame.courseName
		}]
		let playerNames = lastPlayedGame.players
		playerNames = playerNames.filter(e => e !== name)
		console.log("player names before loop: ", playerNames)
		playerNames.forEach(async (name, i) => {
			await User.find({name: name}, (loopErr, loopResult) => {
				if(loopErr){console.log("error in looping through current user's other players for game data: ", loopErr)}
				const lastIndex = loopResult[0].games.length
				// console.log("successful find user by name: ", loopResult[0].name, "with ", lastIndex, "games");
				const lastGame = loopResult[0].games[lastIndex-1]
				console.log("these should be in order: ", i)
				game.push({
					name: loopResult[0].name,
					holes: lastGame.holes,
					courseName: lastGame.courseName
				})

				if(game.length === playerNames.length + 1){
					console.log("done looping! sending result: ", game)
					  response.status(200).send(game);
						return;
				}
			})
			// TODO: ADD TIMEOUT 404 RESPONSE
		})
  });

	// if nothing returns after 10 seconds, 404:
	// setTimeout(function () {
	// 	response.status(404).send("Server Timeout");
	// }, 4000)
}); //closes router.put

module.exports = router;
