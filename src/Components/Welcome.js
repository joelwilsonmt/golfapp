import React,  { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PopUp from './PopUp';

function NewGame(props) {
  const [open, toggleOpen] = useState(false);
  const password = "59601"
  return (
    <div>

      <PopUp 
      toggleOpen={() => toggleOpen(!open)} 
      input
      open={open} 
      title="Please Enter the Password to Begin"
      content="The password is easy. Think about zipping through our hometown"
      password={password}
      />

      <Typography variant='h1'>406 Golf</Typography>
      <Typography variant='h2'>Welcome</Typography>
      <Typography variant='body1'>Track you golf scores around Montana for the 2019 summer</Typography>
      <Button
        variant="contained" 
        onClick={() => toggleOpen(true)}
        color="primary">
        Get Started
      </Button>
    </div>

  );
}

export default NewGame;
