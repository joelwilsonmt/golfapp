import React from 'react';
import {Link} from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GolfCourse from '@material-ui/icons/GolfCourse';


function ScoreCard(props) {
  let holes = [];
  for (var i = 0; i < 18; i++){
    holes.push(<li>Hole {i+1}</li>);
  }
  return (
    <List>
    {holes.map((hole, i) => 
      <ListItem key={i+1} button>
        <ListItemIcon>
          <GolfCourse />
        </ListItemIcon>
        <ListItemText primary={<Link to={`/hole/${i+1}`}>{hole}</Link>} />
      </ListItem>)}
    </List>
  );
}

export default ScoreCard;
