import React from 'react';
import Typography from '@material-ui/core/Typography';
import BlockButton from '../basic/BlockButton';
import Frame from '../templates/Frame'

function Start(props) {

  return (
    <Frame game={props.game}>
      <Typography variant="body1">
        Thank you for confirming your humanity! Please choose from the menu below:
      </Typography>

      <BlockButton
      title="New Round"
      link="/newround/"/>

      <BlockButton
      title="Find a Round in Progress"/>

      <BlockButton
      title="Review Past Rounds"/>

  </Frame>
  );
}

export default Start;
