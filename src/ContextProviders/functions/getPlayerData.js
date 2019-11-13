import axios from "axios"

export default async (name) => {
  const getPlayerData = process.env.REACT_APP_BACK_END_SERVER + 'getPlayerData';
  await axios.put(getPlayerData, {name: name}).then(
    (response) => {
      let playerData = response.data[0]
      let games = playerData.games
      console.log("Rounds for ", name, ": ", games)
      console.log("latest game: ", games[games.length-1])
    })
}
