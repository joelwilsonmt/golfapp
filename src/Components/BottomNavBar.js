import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const styles = {
  root: {
    width: "100vw",
    bottom: 0,
    position: "absolute"
  },
};

function BottomNavBar(props) {
  const { classes } = props;
  return (
    <BottomNavigation
      value={props.currentTab}
      onChange={(e, value) => props.onChange(value)}
      showLabels
      className={classes.root}
    >
    {props.tabs.map(tab =>
      <BottomNavigationAction value={tab.name} label={tab.name} icon={tab.icon} />
    )}
    </BottomNavigation>
  );
}

BottomNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNavBar);
