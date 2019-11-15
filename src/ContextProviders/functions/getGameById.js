import axios from "axios"

export default async (gameId) => {
  const getGameById = process.env.REACT_APP_BACK_END_SERVER + 'getGameById';
  console.log("getGameById called in provider for id", gameId)
  return await axios.put(getGameById, {gameId: gameId}).then(
    (response) => {
      console.log("game", gameId, " and returning response: ", response.data)
      return response.data
    })
}
