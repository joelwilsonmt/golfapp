import React,  { useState } from 'react';
import {Redirect, Link} from "react-router-dom";
import axios from "axios"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Loading from './Loading';
import Typography from '@material-ui/core/Typography';


const RecoverGame = (props) => {
  let store = JSON.parse(localStorage.getItem('game'));
  console.log("store recovered from localstorage: ", store);
  const [open, toggleOpen] = useState(store ? true : false);
  const [redirect, toggleRedirect] = useState(false);
  const [loading, toggleLoading] = useState(false);
  const recover = async () => {
    toggleOpen(false);
    toggleLoading(true);
    // THIS WORKS TO LOAD FROM LOCALSTORAGE: 
    // props.game.recoverGame(store)
    // toggleRedirect(true)



    // TODO: WHY ISN'T THIS ASYNCING THE GAME VALUE?
    const game = await props.game.getCurrentGameForUser("Joel")
    console.log("get current game result: ", game) //UNDEFINED??!?
    // await props.game.recoverGame(game)
    // toggleRedirect(true)



  }
  if(!store){
    return null;
  }
  else {
  return (
      [<Loading key={0} open={loading}/>,
      <Dialog key={1}
      open={open}
      onClose={() => toggleOpen(false)}
      onBackdropClick={() => toggleOpen(false)}
      aria-labelledby="form-dialog-title"
      fullScreen
      >
        <DialogTitle id="form-dialog-title">
        It Looks Like You've Got a Round in Progress:
        </DialogTitle>
        <DialogContent>
        <Typography gutterBottom variant="h4">Course: {store[0].courseName} </Typography>
        <Typography gutterBottom variant="h5">Players: {store.map((player, i) => <span key={i}>{player.name}{i+1 === store.length ? "" : ", "}</span>)} </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            component={ Link }
            to={`/newround/`}>
            Start new round
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => recover()}>
              Resume Round
          </Button>
        </DialogActions>
        {redirect ? <Redirect to={{ pathname: `/scorecard/${store[0].courseName}` }} /> : null}
      </Dialog>]
    );
  }
}

export default RecoverGame;
