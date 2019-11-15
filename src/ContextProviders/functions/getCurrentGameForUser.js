import axios from "axios"

export default async (name, courseName) => {
  const getCurrentGameForUser = process.env.REACT_APP_BACK_END_SERVER + 'getCurrentGameForUser';
  console.log("current game for user called in provider import", name, " and ", courseName)
  return await axios.put(getCurrentGameForUser, {name: name, courseName: courseName}).then(
    (response) => {
      console.log("user", name, " and returning response: ", response.data)
      return response.data
    })
}
