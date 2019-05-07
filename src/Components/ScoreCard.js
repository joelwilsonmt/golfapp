import React from 'react';
import {Link} from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GolfCourse from '@material-ui/icons/GolfCourse';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

function ScoreCard(props) {
  let holes = [];
  for (var i = 0; i < 18; i++){
    holes.push(<Typography variant="body1">Hole {i+1}</Typography>);
  }
  const courseName = props.game.courseName;
  const game = props.game.game;
  console.log("game in scorecard: ", game);
  // const players = game.forEach(person => {
  //   return person.name;
  // });
  // console.log("players in scoredcard: ", players);
  return (
    <div>
    <Typography align="center" variant="h3">{courseName}</Typography>
    <List>
    {holes.map((hole, i) => 
      <div key={i+1}><ListItem button >
        <ListItemIcon>
          <GolfCourse />
        </ListItemIcon>
        <ListItemText primary={<Link to={`/hole/${i+1}`}>{hole}</Link>} />
      </ListItem>
      {i === holes.length-1 ? null : <Divider variant="fullWidth"/>}
      </div>
    )}
    </List>
    </div>
  );
}

export default ScoreCard;
