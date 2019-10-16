import React,  { useState } from 'react';
import {Link, Redirect} from "react-router-dom";
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
import { StickyContainer, Sticky } from 'react-sticky';
import axios from 'axios';

import Loading from './Loading';
import CustomDialog from './CustomDialog';
import RecoverGame from './RecoverGame';
import {ProviderContext} from './../ContextProviders/Provider';
require('dotenv').config();

const styles = theme => ({
  overPar: {
    color: 'red',
  },
  underPar: {
    color: 'green',
  },
  stickyHeader: {
    zIndex: 100,
    backgroundColor: '#fff',
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    padding: "5px 0",
    marginBottom: 0
  }
})


function ScoreCard(props) {
  const {classes} = props;
  const game = props.game;
  const courseName = game.courseName;
  const players = game.players;
  const [open, toggleOpen] = useState(true);
  const [loading, toggleLoading] = useState(false);
  const [redirect, toggleRedirect] = useState(false);
  console.log("players loaded in scorecard: ", players);
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
  const submitScores = () => {
    toggleLoading(true);
    const finishRoundRoute = process.env.REACT_APP_BACK_END_SERVER + 'finishRound';
    playerNames.forEach(async (name, i) => {
      // await axios.put(finishRoundRoute, {name: name, courseName: courseName})
      // .then(res => {
      //   console.log("finish round route access complete, result: ", res);
      //   //redirect to game review
        if(i === playerNames.length-1){
          toggleLoading(false);
          toggleRedirect(true);
        }
      //});

    })
  }
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
      <StickyContainer>
        <Loading open={loading}/>
        <Sticky>
          {({style}) => (
            <div className={classes.stickyHeader} style={{...style, zIndex: 100}}>
              <Typography align="center" variant="h4">{courseName}</Typography>
              <Typography align="center" variant="h5">Players: {players.map((player, i) => `${player.name} (${playerScores[i]})${i+1 === players.length ? "" : ", "} `)}</Typography>
            </div>
          )}
        </Sticky>
      <List>
      {players[0].holes.map((hole, i) =>
        <div key={i+1}>


        {Object.getOwnPropertyNames(hole).length > 0 ?
        (
          <ExpansionPanel dense="true">
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={16}>
              <Grid item xs={4}>
                <CheckCircle />
              </Grid>
              <Grid item xs={8}>
                <Typography>Hole {i+1}</Typography>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Grid container spacing={16}>
          <Grid item xs={12}>
            <Typography variant="h5">Par: {hole.par}</Typography>
          </Grid>
            {players.map((player, j) => {
              return  <Grid key={j} item xs={6}>
                <Typography variant="h5" inline>
                  {player.name}
                </Typography>
                <Typography variant="h5" className={player.holes[i].strokes - hole.par > 0 ? classes.overPar : classes.underPar} inline>
                {` `}({player.holes[i].strokes - hole.par === 0 ? 'Par' : player.holes[j].strokes - hole.par > 0 ? `+${player.holes[i].strokes - hole.par}` : player.holes[i].strokes - hole.par })
                </Typography>
                <br/>
                <Typography style={styles.bold} inline>Strokes:</Typography>
                <Typography inline>{player.holes[i].strokes}</Typography>
                <br/>
                <Typography style={styles.bold} inline>Putts:</Typography>
                <Typography inline> {player.holes[i].putts}</Typography>
                <br/>
                {player.holes[i].fairwayHit ? <Typography style={styles.bold}>Fairway Hit</Typography> : null}
                {player.holes[i].greensInRegulation ? <Typography style={styles.bold}>Greens in Regulation</Typography>: null}
              </Grid>
            })}
            <Button
            fullWidth
            color="primary"
            variant="contained"
            component={ Link }
            to={{pathname: `/${courseName}/hole/${i+1}`, state: {par: hole.par, players: playerNames, scores: players.map(player => player.holes[i])}}}>
              Edit
            </Button>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
        :
        <ListItem dense button component={Link} to={{pathname: `/${courseName}/hole/${i+1}`, state: {players: playerNames}}}>
          <Grid container spacing={16}>
            <Grid item xs={4}>
              <GolfCourse />
            </Grid>
            <Grid item xs={8}>
              <ListItemText primary={`Hole ${i+1}`} />
            </Grid>
          </Grid>
        </ListItem>
        }
        {i === players[0].holes.length-1 ? null : <Divider variant="fullWidth"/>}
        </div>
      )}
      </List>
      {players[0].holes[players[0].holes.length-1].strokes ? <CustomDialog
        open={open}
        title={`Round Complete!`}
        toggleOpen={toggleOpen}
        onClick={() => {
          toggleOpen(false);
          submitScores();
        }}
        onCancel={() => toggleOpen(false)}
        goButton="Submit"
        cancelButton="Edit"
      /> : null}
      <Button
        fullWidth
        disabled={players[0].holes[players[0].holes.length-1].strokes ? false : true}
        onClick={() => toggleOpen(true)}
        color="primary"
        variant="contained"
        >
        Submit
      </Button>
      {redirect ? <Redirect to={{ pathname: `/roundreview/` }} /> : null}
      </StickyContainer>
    );
  }
}

export default withStyles(styles)(ScoreCard);
