import axios from "axios"

export default async (name) => {
  const getCurrentGameForUser = process.env.REACT_APP_BACK_END_SERVER + 'getCurrentGameForUser';
  await axios.put(getCurrentGameForUser, {name: name}).then(
    (response) => {
      console.log("user", name, " and returning response: ", response.data)
      return response.data
      
    })
}
