import React,  { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PopUp from '../basic/PopUp';
import GolfAndGo from '../../images/golf-and-go.jpg';
import Frame from '../templates/Frame'

function NewGame(props) {
  const [open, toggleOpen] = useState(false);
  const password = "59601"
  const width = {width: '100%'}
  return (
    <Frame game={props.game} align="center">
      <PopUp
      toggleOpen={() => toggleOpen(!open)}
      input
      open={open}
      title="Please Enter the Password to Begin"
      content="The password is easy. Think about zipping through our hometown"
      password={password}
      />
    <img style={width} src={GolfAndGo} alt="Golf and Go"/>
    <Typography variant='h1'>406.golf</Typography>
    <Typography variant='h4'>Track you golf scores around Montana for the 2019 summer</Typography>
    <Button
      variant="contained"
      onClick={() => toggleOpen(true)}
      color="primary">
      Get Started
    </Button>
    </Frame>

  );
}

export default NewGame;
