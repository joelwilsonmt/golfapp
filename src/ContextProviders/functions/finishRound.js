import axios from "axios"

export default async (gameId) => {
  console.log("game to finish in finishround function: ", gameId)
  const finishRound = process.env.REACT_APP_BACK_END_SERVER + 'finishRound';
  await axios.put(finishRound, {gameId: gameId}).then(
    (response) => {
      console.log("finishRound server response ", response)
      // return allPlayers
      // response.data = entire database
    })
}
