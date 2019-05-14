import React,  { useState } from 'react';
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
import RestoreIcon from '@material-ui/icons/Restore';
import MapIcon from '@material-ui/icons/Map';


import Map from './Map';
import RecoverGame from './RecoverGame';
import {ProviderContext} from './../ContextProviders/Provider';
import BottomNavBar from './BottomNavBar';
require('dotenv').config();


function ScoreCard(props) {
  const [tab, switchTab] = useState("ScoreCard");
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

  const tabs = [{
    name: "ScoreCard",
    icon: <RestoreIcon />
  },
  {
    name: "Map",
    icon: <MapIcon />
  }];
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
      {tab === "ScoreCard" ? <div>
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
            <Typography>Par: {hole.par}</Typography>
          </Grid>
            {players.map(player => {
              return  <Grid item xs={12}>
                <Typography variant="h5">{player.name}</Typography>
                <Typography style={styles.bold} inline>Strokes:</Typography> <Typography inline>{player.holes[i].strokes}</Typography><br/>
                <Typography style={styles.bold} inline>Putts:</Typography> <Typography inline> {player.holes[i].putts}</Typography><br/>
                <Typography style={styles.bold} inline>Fairway Hit?</Typography> <Typography inline> {player.holes[i].fairwayHit ? "Yes" : "No"}</Typography><br/>
                <Typography style={styles.bold} inline>Greens in Regulation?</Typography> <Typography inline> {player.holes[i].greensInRegulation ? "Yes" : "No"}</Typography>
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
      </List></div> : null}
      {tab === "Map" ? <Map/> : null}
      <BottomNavBar currentTab={tab} tabs={tabs} onChange={switchTab}/>
      </div>
    );
  }
}

export default ScoreCard;
