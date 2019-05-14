import React, { useState }  from 'react';
import {Link} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/ListAlt';
import Button from '@material-ui/core/Button';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Home(props) {

  const [open, toggleDrawer] = useState(false);

  const { classes } = props;
  return (
    <div>
    <Drawer open={open} onClose={() => toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => toggleDrawer(false)}
            onKeyDown={() => toggleDrawer(false)}
          >
          <Paper>
            <MenuList>
              <MenuItem className={classes.menuItem}>
                <ListItemIcon className={classes.icon}>
                  <HomeIcon />
                </ListItemIcon>
                <Link underline="none" to="/">Home</Link>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <ListItemIcon className={classes.icon}>
                  <ListIcon />
                </ListItemIcon>
                <Link to="/scorecard/">ScoreCard</Link>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <Button onClick={() => localStorage.clear()}>
                  Clear Local Storage
                </Button>
              </MenuItem>
              </MenuList>
          </Paper>
          </div>
    </Drawer>
    <AppBar position="static">
        <Toolbar>
        <IconButton onClick={() => toggleDrawer(!open)} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon/>
          </IconButton>
          Golf App
        </Toolbar>
      </AppBar>
      </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
