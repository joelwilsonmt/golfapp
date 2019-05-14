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
      title="New Round"
      link="/newround/"/>

      <BlockButton
      title="Find a Round in Progress"/>

      <BlockButton
      title="Review Past Rounds"/>

    </div>
  );
}

export default Start;
