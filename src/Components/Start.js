import React from 'react';
import Typography from '@material-ui/core/Typography';
import BlockButton from './BlockButton';

function Start(props) {

  return (
    <div>
      <Typography variant="body1">
        Thank you for confirming your humanity! Please choose from the menu below:
      </Typography>

      <BlockButton
      title="New Game"
      link="/newgame/"/>

      <BlockButton
      title="Find a Game in Progress"/>

      <BlockButton
      title="Review Past Games"/>

    </div>
  );
}

export default Start;
