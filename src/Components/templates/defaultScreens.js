import React from "react"
import ListUsers from "../screens/ListUsers"
import NewRound from "../screens/NewRound"


export default [
  {
    name: "List Users",
    component: <ListUsers />,
    icon: <p>Users</p>
  },
  {
    name: "New Round",
    component: <NewRound />,
    icon: <p>New Round</p>
  }
]
