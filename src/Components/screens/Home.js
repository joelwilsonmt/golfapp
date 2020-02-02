import React from 'react';
import styled from "styled-components"
import {Link} from "react-router-dom";
import MuiButton from '@material-ui/core/Button';

import RecoverGame from './RecoverGame';
import {ProviderContext} from '../../ContextProviders/Provider';
import Frame from '../templates/Frame'

import SaveIcon from '@material-ui/icons/NoteAdd';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import MoodIcon from '@material-ui/icons/Mood';

const StyledButton = styled(MuiButton)`
  width: 100%;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
  width: 100%;
`
const Container = styled.div`
  margin: 20px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10%;
  grid-row-gap: 10%;
`

const Button = ({icon, link, linkText}) => {
  return (
      <StyledLink to={link}>
      <StyledButton
        variant="contained"
        color="primary"
      >
      {icon ? icon : null}
      {linkText}
      </StyledButton>
      </StyledLink>
  )
}

const links = [
  {
    linkText: "Welcome",
    link: "/welcome/",
    icon: <HomeIcon />
  },
  {
    linkText: "Main Menu",
    link: "/",
    icon: <MenuIcon />
  },
  // {
  //   linkText: "Start",
  //   link: "/start/",
  //   icon: <SaveIcon />
  // },
  // {
  //   linkText: "Hole",
  //   link: "/hole/",
  //   icon: <SaveIcon />
  // },
  {
    linkText: "New Round",
    link: "/newround/",
    icon: <SaveIcon />
  },
  {
    linkText: "Users",
    link: "/listusers/",
    icon: <PeopleIcon />
  },
  {
    linkText: "Rounds for Joel",
    link: `/listrounds/${"Joel"}`,
    icon: <MoodIcon />
  }
]

function Home({game}) {
  return (
    <Frame game={game}>
      <Container>
      {links.map(link => {
        return (
          <Button
            linkText={link.linkText}
            link={link.link}
            icon={link.icon}
          />
        )
      })}
    </Container>
  </Frame>
  );
}
// <ProviderContext.Consumer>
//   {game =><RecoverGame game={game}/>}
// </ProviderContext.Consumer>
export default Home;
