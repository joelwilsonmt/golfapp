import React from 'react';
import {Link} from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GolfCourse from '@material-ui/icons/GolfCourse';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import RecoverGame from './RecoverGame';
import {ProviderContext} from './../ContextProviders/Provider';
require('dotenv').config();

const styles = theme => ({
  overPar: {
    color: 'red',
  },
  underPar: {
    color: 'green',
  }
})


function ScoreCard(props) {
  const {classes} = props;
  const game = props.game;
  const courseName = game.courseName;
  const players = game.players;
  const playerNames = players ? players.map(player => {return player.name}) : null;
  const numberOfHoles = players ? players[0].holes.length : null;
  const playerScores = players ? players.map(player => {
    let totalScore = 0;
    player.holes.forEach(hole => {
      totalScore += hole.strokes ? hole.strokes : 0;
    });
    return totalScore;
  }) : null;
  const styles={
    bold: {
      fontWeight: "bold"
    }
  }
  console.log("number of holes in scorecard: ", numberOfHoles);
  const bottom = {paddingBottom: '10vh'};
  if (!players){
    return (
        <ProviderContext.Consumer>
          {game =><RecoverGame game={game}/>}
        </ProviderContext.Consumer>
    );
  }
  else {
    return (
      <div>
      <Typography align="center" variant="h3">{courseName}</Typography>
      <Typography align="center" variant="h5">Players: {players.map((player, i) => `${player.name} (${playerScores[i]})${i+1 === players.length ? "" : ", "} `)}</Typography>
      <List>
      {players[0].holes.map((hole, i) => 
        <div key={i+1}>
        {Object.getOwnPropertyNames(hole).length > 0 ? 
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <CheckCircle />
            <Typography>Hole {i+1}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Grid container spacing={16}>
          <Grid item xs={12}>
            <Typography variant="h4">Par: {hole.par}</Typography>
          </Grid>
            {players.map(player => {
              return  <Grid item xs={12}>
                <Typography variant="h5" inline>
                  {player.name} 
                  <Typography variant="h5" className={player.holes[i].strokes - hole.par > 0 ? classes.overPar : classes.underPar} inline>
                  {` `}({player.holes[i].strokes - hole.par === 0 ? 'Par' : player.holes[i].strokes - hole.par > 0 ? `+${player.holes[i].strokes - hole.par}` : player.holes[i].strokes - hole.par })
                  </Typography><br/>
                </Typography>
                <Typography style={styles.bold} inline>Strokes:</Typography> <Typography inline>{player.holes[i].strokes}</Typography><br/>
                <Typography style={styles.bold} inline>Putts:</Typography> <Typography inline> {player.holes[i].putts}</Typography><br/>
                {player.holes[i].fairwayHit ? <Typography style={styles.bold}>Fairway Hit</Typography> : null}
                {player.holes[i].greensInRegulation ? <Typography style={styles.bold}>Greens in Regulation</Typography>: null}
              </Grid>
            })}
            <Button
            align="right"
            color="primary"
            variant="contained"
            component={ Link }
            to={{pathname: `/${courseName}/hole/${i+1}`, state: {par: hole.par, players: playerNames, scores: players.map(player => player.holes[i])}}}>
              Edit
            </Button>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        :
        <ListItem button >
          <ListItemIcon>
            <GolfCourse />
          </ListItemIcon>
          <ListItemText primary={<Link to={{pathname: `/${courseName}/hole/${i+1}`, state: {players: playerNames}}}>Hole {i+1}</Link>} />
        </ListItem>}
        {i === players[0].holes.length-1 ? null : <Divider variant="fullWidth"/>}
        </div>
      )}
      </List>
      </div>
    );
  }
}

export default withStyles(styles)(ScoreCard);
