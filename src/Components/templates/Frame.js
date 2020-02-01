import React, {useState} from "react"
import styled from "styled-components"

import NavBar from "../basic/NavBar"
import BottomNavBar from '../basic/BottomNavBar';
import NewRound from "../screens/NewRound"
import ListUsers from "../screens/ListUsers"

const Container = styled.div`
  height: 100vh;
  position: relative;
`
const Header = styled(NavBar)`
  position: absolute;
  top: 0;
`
const Footer = styled(BottomNavBar)`
  position: absolute;
  bottom: 0;
`

export default ({children, game, homeName, homeIcon, defaultHome, ...props}) => {
  //ideally, an array of screens is passed here: props.screens
  // [{name, screenComponent, icon}]
  //default screens:
  // const child = children ? {
  //   name: "Home",
  //   icon: <p>Home</p>,
  //   component: children
  // } : null
  // const defaultScreens = [
  //   {
  //     name: "New Round",
  //     component: <NewRound noFrame game={game} />,
  //     icon: <p>New Round</p>
  //   },
  //   {
  //     name: "List Users",
  //     component: <ListUsers noFrame game={game} />,
  //     icon: <p>Listem</p>
  //   }
  // ]
  // if(child){defaultScreens.unshift(child)}

  const [screens, setScreens] = useState(props.screens)
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <Container>
      <Header game={game}/>
      {props.tabs ? props.tabs[tabIndex].component : children}
      {props.tabs ?
        <Footer currentTab={tabIndex} tabs={props.tabs} onChange={setTabIndex}/>
        :
        null
      }
    </Container>
  )
}
// {tabIndex === 0 && children ? children : screens[tabIndex].component}
// <Footer currentTab={tabIndex} tabs={screens} onChange={(newIndex) => setTabIndex(newIndex)}/>
