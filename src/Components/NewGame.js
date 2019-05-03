import React,  { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import BlockButton from './BlockButton';
import CustomDialog from './CustomDialog';
import Grid from '@material-ui/core/Grid';

function NewGame(props) {
  const [courseNameOpen, toggleCourseName] = useState(false);
  const [courseName, handleCourseName] = useState("");
  const [startOpen, toggleStartOpen] = useState(false);
  const [confirmOpen, toggleConfirmOpen] = useState(false);
  const [thisOne, next] = useState(-1);
  const [playerEntryOpen, togglePlayerEntry] = useState(false);
  const [playerName, changePlayerName] = useState("");
  const [playerNames, pushPlayerNames] = useState([]);
  const [numberPlayers, changeNumberPlayers] = useState(0);
  const players = ['One', 'Two', 'Three', 'Four'];
  const handlePlayerPush = (playerName) => {
    let temp = playerNames;
    temp.push(playerName);
    pushPlayerNames(temp);
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
    <CustomDialog
      open={startOpen}
      title={`Start game with ${numberPlayers} player${numberPlayers === 1 ? "" : "s"}?`}
      toggleOpen={toggleStartOpen}
      onClick={() => {
        toggleStartOpen(false);
        toggleCourseName(true);
      }}
      goButton="Next"
    />
    <CustomDialog
      open={courseNameOpen}
      title={`Enter Course Name:`}
      input
      inputLabel="Course Name"
      handleInput={handleCourseName}
      toggleOpen={toggleCourseName}
      onClick={() => {
        toggleCourseName(false);
        togglePlayerEntry(true);
        next(thisOne+1);
      }}
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
      open={thisOne === i}
      toggleOpen={() => next(-1)}
      title={`Last Player! Enter Player ${i+1}'s Name`}
      onClick={() => {
        next(-1);
        handlePlayerPush(playerName);
        toggleConfirmOpen(true);
      }}
      goButton="Next"
    /> :
    <CustomDialog
      key={i}
      input
      inputLabel={`Player ${i+1}'s Name:`}
      handleInput={changePlayerName}
      open={thisOne === i}
      toggleOpen={() => next(-1)}
      title={`Enter Player ${i+1}'s Name`}
      onClick={() => {
        next(thisOne+1);
        handlePlayerPush(playerName);
      }}
      goButton="Next"
    />) : null}
    <CustomDialog
      open={confirmOpen}
      toggleOpen={toggleConfirmOpen}
      title={`Does this look right?`}
      content={confirm}
      onClick={() => {
        console.log("course before moving on: ", courseName);
        console.log("players: ", playerNames);
      }}
      goButton="Begin!"
      link="/scorecard/"
    />
    <Typography variant='h2'>New Game</Typography>
 
    <Typography variant='h3'>How Many Players?</Typography>

    <Grid container spacing={16}>
    
      {players.map((player, key) =>
        <BlockButton
        width={6}
        key={key+1}
        title={key+1}
        onClick={() => 
          {changeNumberPlayers(key+1);
          toggleStartOpen(true);
          next(-1);}}/>
      )}

      <BlockButton
        width={12}
        title={"More... Not Working Yet"}
      />

    </Grid>
  </div>
  );
}

export default NewGame;
