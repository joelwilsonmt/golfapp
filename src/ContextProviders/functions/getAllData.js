import axios from "axios"

export default async () => {
  const getAllData = process.env.REACT_APP_BACK_END_SERVER + 'getAllData';
  await axios.put(getAllData).then(
    (response) => {
      let allPlayers = response.data.map(player => player.name)
      console.log("GET ALL DATA NEEDS TO BE REWRITTEN ", allPlayers)
      return allPlayers
      // response.data = entire database
    })
}
