import React,  { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import BlockButton from '../basic/BlockButton';
import CustomDialog from '../basic/CustomDialog';
import Loading from '../basic/Loading';
import Grid from '@material-ui/core/Grid';
import { Redirect } from "react-router-dom";
import axios from 'axios';
require('dotenv').config();

function NewRound(props) {
  useEffect(() => {
      props.game.clearLocalStorage();
  }, [])
  const [startOpen, toggleStartOpen] = useState(false);
  const [moreOpen, toggleMoreOpen] = useState(false);
  const [courseNameOpen, toggleCourseNameOpen] = useState(false);
  const [playerEntryOpen, togglePlayerEntry] = useState(false);
  const [confirmOpen, toggleConfirmOpen] = useState(false);
  const [holeEntryOpen, toggleHoleEntryOpen] = useState(false);
  const [loading, toggleLoading] = useState(false);


  const [courseName, handleCourseName] = useState("");
  const [playerNames, changePlayerNames] = useState([]);
  const [numberPlayers, changeNumberPlayers] = useState(0);
  const [numberHoles, changeNumberHoles] = useState(0);

  const [dialogIndex, nextDialog] = useState(-1);
  const [redirect, toggleRedirect] = useState(false);

  const clearState = () => {
    changePlayerNames([]);
    handleCourseName("");
    changeNumberPlayers(0);
    toggleHoleEntryOpen(false);
    toggleStartOpen(false);
    toggleCourseNameOpen(false);
    togglePlayerEntry(false);
    toggleConfirmOpen(false);
    toggleMoreOpen(false);
  }
  const handlePlayerNameChange = (name, index) => {
    changePlayerNames(previousNames => {
      return [...previousNames.slice(0, index), name, ...previousNames.slice(index+1)];
    });
  }
  const addToServer = async () => {
    toggleLoading(true);
    // generate gameId:
    const gameId = Math.floor((Math.random() * 100000) + 1).toString()
    const userRoute = process.env.REACT_APP_BACK_END_SERVER + 'user';
    playerNames.forEach(async (name, i) => {
    console.log("sending " + name + " and gameId " + gameId + " to database");
    await axios.put(userRoute, {
      gameId: gameId,
      name: name,
      courseName: courseName,
      players: playerNames,
      active: true,
      holes: numberHoles
    }).then(
      (res) => {
        res.data.holes = numberHoles;
        //set users and course in provider:
        props.game.setCourse(courseName);
        props.game.setGameId(gameId);
        props.game.addUsers(res.data);

        if(i === playerNames.length-1){
          toggleLoading(false);
          toggleRedirect(true);
        }
      });
    });
  }
  const confirm = <div>
  <Typography variant='body1'>Course: {courseName}</Typography>
  <Typography variant='body1'>Holes: {numberHoles}</Typography>
  <Typography inline variant='body2'>Player{numberPlayers === 1 ? "" : "s"}: </Typography>
    {playerNames.map((player, key) =>
      <Typography inline variant='body2' key={key}>{player}{key+1 === playerNames.length ? null : ', '}</Typography>
      )}
  </div>;
  const holeSelect = <Grid container spacing={16}>
      <BlockButton
      width={6}
      title="9 Holes"
      onClick={() =>
        {changeNumberHoles(9);
        togglePlayerEntry(true);
        nextDialog(dialogIndex+1);}
      }/>
      <BlockButton
      width={6}
      title="18 Holes"
      onClick={() =>
        {changeNumberHoles(18)
        togglePlayerEntry(true);
        nextDialog(dialogIndex+1);}
      }/>
    </Grid>

  return (
    <div>
      <Typography align="center" variant='h2' gutterBottom>New Round</Typography>
      <Typography align="center" variant='h3' gutterBottom>How Many Players?</Typography>
      <Grid container spacing={16}>
        {Array(...Array(4)).map((number, key) =>
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
          title={"More..."}
          onClick={() =>
            {toggleMoreOpen(true);
            nextDialog(-1);
            }
          }
        />
      </Grid>

    {/*-------------------------------------------------start dialogs---------------------------------------------*/}
    <Loading open={loading}/>
    <CustomDialog
      open={moreOpen}
      title={`Select number of players`}
      toggleOpen={toggleMoreOpen}
      input
      inputLabel="Number of Players"
      handleInput={(e) => changeNumberPlayers(parseInt(e))}
      inputValue={Number.isNaN(numberPlayers) ? "" : numberPlayers === 0 ? "" : numberPlayers}
      onClick={() => {
        toggleMoreOpen(false);
        toggleStartOpen(true);
      }}
      onCancel={clearState}
      goButton="Next"
    />
    <CustomDialog
      open={startOpen}
      title={`Start round with ${numberPlayers} player${numberPlayers === 1 ? "" : "s"}?`}
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
        toggleHoleEntryOpen(true);
      }}
      onCancel={clearState}
      goButton="Next"
    />
    <CustomDialog
      open={holeEntryOpen}
      title={`Number of Holes?`}
      content={holeSelect}
      toggleOpen={toggleHoleEntryOpen}
      onCancel={clearState}
      noActions
    />
    {playerEntryOpen ?
    Array(...Array(numberPlayers)).map((player, i) =>
    i+1 === numberPlayers ?
    <CustomDialog
      key={i}
      input
      inputLabel={`Player ${i+1}'s Name:`}
      handleInput={e => handlePlayerNameChange(e, i)}
      inputValue={playerNames[i]}
      open={dialogIndex === i}
      toggleOpen={() => nextDialog(-1)}
      title={`Enter Player ${i+1}'s Name`}
      onClick={() => {
        nextDialog(-1);
        toggleConfirmOpen(true);
      }}
      onCancel={clearState}
      goButton="Next"
      back
      goBack={() => nextDialog(dialogIndex-1)}
    /> :
    <CustomDialog
      key={i}
      input
      inputLabel={`Player ${i+1}'s Name:`}
      handleInput={e => handlePlayerNameChange(e, i)}
      inputValue={playerNames[i]}
      open={dialogIndex === i}
      toggleOpen={() => nextDialog(-1)}
      title={`Enter Player ${i+1}'s Name`}
      onClick={() => {
        nextDialog(dialogIndex+1);
      }}
      onCancel={clearState}
      goButton="Next"
      back
      goBack={() => {nextDialog(dialogIndex-1)}
      }
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
      back
      goBack={() => {
        toggleConfirmOpen(false);
        nextDialog(numberPlayers-1);
      }}
    />


    {redirect ? <Redirect to={{ pathname: `/scorecard/${courseName}` }} /> : null}
  </div>
  );
}

export default NewRound;
