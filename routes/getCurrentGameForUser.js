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
	var courseName = data.courseName
	// TODO: make searchable by name and game id
	// name: name,
	console.log("searching by ", courseName)
	User.find({'games.courseName': courseName}, { name: 1, "games.courseName.$": 1 }, (err, result) => {
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

		//
		// const lastGameIndex = result[0].games.length
		// console.log("successful find user by name: ", result[0].name, "with ", lastGameIndex, "games");
		// const lastPlayedGame = result[0].games[lastGameIndex-1]
		// let game = [{
		// 	name: name,
		// 	holes: lastPlayedGame.holes,
		// 	courseName: lastPlayedGame.courseName
		// }]
		// let playerNames = lastPlayedGame.players
		// playerNames = playerNames.filter(e => e !== name)
		//
		// playerNames.forEach(async (name, i) => {
		// 	await User.find({name: name, 'games.courseName': courseName}, (loopErr, loopResult) => {
		// 		console.log("loop result in server: ", loopResult)
		// 		game.push({name: loopResult[0].name})
		// 		if(game.length === playerNames.length + 1){
		// 			console.log("done looping! sending result: ", game)
		// 				response.status(200).send(game);
		// 				return;
		// 		}
		// 	})
		// })
  });

	// if nothing returns after 10 seconds, 404:
	// setTimeout(function () {
	// 	response.status(404).send("Server Timeout");
	// }, 4000)
}); //closes router.put

module.exports = router;
