import React, {useState} from "react"

import NavBar from "../basic/NavBar"
import BottomNavBar from '../basic/BottomNavBar';
import NewRound from "../screens/NewRound"
import ListUsers from "../screens/ListUsers"

//default screens:
const defaultScreens = [
  {
    name: "New Round",
    component: <NewRound />,
    icon: <p>New Round</p>
  },
  {
    name: "List Users",
    component: (props) => <ListUsers {...props} />,
    icon: <p>Listem</p>
  }
]

export default ({children, game, ...props}) => {
  //ideally, an array of screens is passed here: props.screens
  // [{name, screenComponent, icon}]
  if(!props.screens){
    console.log("no screens passed, adding default and child: ", children)
    const thisScreen = {
      component: children,
      name: "Current Screen",
      icon: <p>this icon</p>
    }
    defaultScreens.unshift(thisScreen)
  }
  const [tabIndex, setTabIndex] = useState(0)
  return (
    props.screens ?
    <div>
      <NavBar game={game}/>
      {props.screens[tabIndex].component}
      <BottomNavBar currentTab={tabIndex} tabs={props.screens} onChange={(newIndex) => setTabIndex(newIndex)}/>
    </div>
    :
    <div>
      <NavBar game={game}/>
      {defaultScreens[tabIndex].component}
      <BottomNavBar currentTab={tabIndex} tabs={defaultScreens} onChange={(newIndex) => setTabIndex(newIndex)}/>
    </div>
  )
}
