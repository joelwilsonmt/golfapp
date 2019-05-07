import React,  { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import BlockButton from './BlockButton';
import CustomDialog from './CustomDialog';
import Loading from './Loading';
import Grid from '@material-ui/core/Grid';
import { Redirect } from "react-router-dom";
import axios from 'axios';
require('dotenv').config();

function NewGame(props) {
  const [startOpen, toggleStartOpen] = useState(false);
  const [courseNameOpen, toggleCourseNameOpen] = useState(false);
  const [playerEntryOpen, togglePlayerEntry] = useState(false);
  const [confirmOpen, toggleConfirmOpen] = useState(false);
  const [loading, toggleLoading] = useState(false);


  const [courseName, handleCourseName] = useState("");
  const [playerName, changePlayerName] = useState("");
  const [playerNames, pushPlayerNames] = useState([]);
  const [numberPlayers, changeNumberPlayers] = useState(0);

  const [dialogIndex, nextDialog] = useState(-1);
  const [redirect, toggleRedirect] = useState(false);

  const clearState = () => {
    changePlayerName("");
    handleCourseName("");
    pushPlayerNames([""]);
    toggleStartOpen(false);
    toggleCourseNameOpen(false);
    togglePlayerEntry(false);
    toggleConfirmOpen(false);
    console.log("state cleared, coursename: ", courseName);
    console.log("state cleared, players: ", playerNames);
  }
  const handlePlayerPush = (playerName) => {
    let temp = playerNames;
    temp.push(playerName);
    pushPlayerNames(temp);
  }
  const addToServer = async () => {
    toggleLoading(true);
    const userRoute = process.env.REACT_APP_BACK_END_SERVER + 'user';
    playerNames.forEach(async (name, i) => {
    console.log("sending " + name + " to database");
    await axios.put(userRoute, {
      name: name,
      courseName: courseName,
      active: true
    }).then(
      (res) => {
        props.game.addUsers(res.data);
        props.game.setCourse(courseName);
        if(i === playerNames.length-1){
          toggleLoading(false); 
          toggleRedirect(true);
        }
      });
    });
  }
  const confirm = <div>
  <Typography variant='body1'>Course: {courseName}</Typography>
  <Typography inline variant='body2'>Player{numberPlayers === 1 ? "" : "s"}: </Typography>
    {playerNames.map((player, key) =>
      <Typography inline variant='body2' key={key}>{player}{key+1 === playerNames.length ? null : ', '}</Typography>
      )}
  </div>

  return (
    <div>
      <Typography align="center" variant='h2'>New Game</Typography>
      <Typography align="center" variant='h3'>How Many Players?</Typography>
      <Grid container spacing={16}>
        {Array(...Array(4)).map((player, key) =>
          <BlockButton
          width={6}
          key={key+1}
          title={key+1}
          onClick={() => 
            {changeNumberPlayers(key+1);
            toggleStartOpen(true);
            nextDialog(-1);}}/>
        )}
        <BlockButton
          width={12}
          title={"More... Not Working Yet"}
        />
      </Grid>

    {/*-------------------------------------------------start dialogs---------------------------------------------*/}  
    <Loading open={loading}/>
    <CustomDialog
      open={startOpen}
      title={`Start game with ${numberPlayers} player${numberPlayers === 1 ? "" : "s"}?`}
      toggleOpen={toggleStartOpen}
      onClick={() => {
        toggleStartOpen(false);
        toggleCourseNameOpen(true);
      }}
      onCancel={clearState}
      goButton="Next"
    />
    <CustomDialog
      open={courseNameOpen}
      title={`Enter Course Name:`}
      input
      inputLabel="Course Name"
      handleInput={handleCourseName}
      inputValue={courseName}
      toggleOpen={toggleCourseNameOpen}
      onClick={() => {
        toggleCourseNameOpen(false);
        togglePlayerEntry(true);
        nextDialog(dialogIndex+1); //sets dialog to 0
      }}
      onCancel={clearState}
      goButton="Next"
    />
    {playerEntryOpen ?
    Array(...Array(numberPlayers)).map((player, i) =>
    i+1 === numberPlayers ? 
    <CustomDialog
      key={i}
      input
      inputLabel={`Player ${i+1}'s Name:`}
      handleInput={changePlayerName}
      inputValue={playerNames[i]}
      open={dialogIndex === i}
      toggleOpen={() => nextDialog(-1)}
      title={`Last Player! Enter Player ${i+1}'s Name`}
      onClick={() => {
        nextDialog(-1);
        handlePlayerPush(playerName);
        toggleConfirmOpen(true);
      }}
      onCancel={clearState}
      goButton="Next"
    /> :
    <CustomDialog
      key={i}
      input
      inputLabel={`Player ${i+1}'s Name:`}
      handleInput={changePlayerName}
      inputValue={playerNames[i]}
      open={dialogIndex === i}
      toggleOpen={() => nextDialog(-1)}
      title={`Enter Player ${i+1}'s Name`}
      onClick={() => {
        nextDialog(dialogIndex+1);
        handlePlayerPush(playerName);
      }}
      onCancel={clearState}
      goButton="Next"
    />) : null}
    <CustomDialog
      open={confirmOpen}
      toggleOpen={toggleConfirmOpen}
      title={`Does this look right?`}
      content={confirm}
      onClick={() => {
        addToServer();
      }}
      onCancel={clearState}
      goButton="Begin!"
      
    />
    

    {redirect ? <Redirect to={{ pathname: `/scorecard/${courseName}` }} /> : null}
  </div>
  );
}

export default NewGame;
