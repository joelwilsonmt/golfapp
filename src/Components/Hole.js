import React,  { useState } from 'react';
import Counter from './Counter';
import SelectBox from './SelectBox';
import BlockButton from './BlockButton';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import CustomDialog from './CustomDialog';
import Loading from './Loading';
import { StickyContainer, Sticky } from 'react-sticky';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import Redo from '@material-ui/icons/Replay';


import Camera from './Camera';
import Image from './Image'


const styles = {
  root: {
    background: '#000',
    border: 0,
    color: 'white',
    boxShadow: '0 0px 5px rgba(0, 0, 0, .3)',
    marginBottom: '10px'
  },
  center: {
    justifyContent: "center",
    textAlign: "center"
  }
};


function Hole(props) {
  const { classes } = props;
  let players = props.location.state.players;
  let scores = props.location.state.scores;
  let emptyNumberArray = scores ? scores.map(score => score.strokes) : Array(players.length).fill(0);
  let emptyBooleanArray = scores ? scores.map(score => score.strokes) : Array(players.length).fill(false);
  let emptyStringArray = scores ? scores.map(score => score.strokes) : Array(players.length).fill('');
  const [par, setPar] = useState(props.location.state.par ? props.location.state.par : 0);
  const [strokesArray, setStrokes] = useState(emptyNumberArray);
  const [puttsArray, setPutts] = useState(emptyNumberArray);
  const [fairwayHitsArray, setFairwayHits] = useState(emptyBooleanArray);
  const [greensInRegulationArray, setGreensInRegulation] = useState(emptyBooleanArray);
  const [picturesArray, setPictures] = useState(emptyStringArray);
  const [confirmOpen, toggleConfirmOpen] = useState(false);
  const [confirmClearState, toggleConfirmClearState] = useState(false);
  const [loading, toggleLoading] = useState(false);
  const [picture, setPicture] = useState('');
  const [cameraOpen, toggleCamera] = useState(false);
  console.log("picture array: ", picturesArray);
  const clearState = () => {
    setPar(0);
    setStrokes(Array(players.length).fill(0));
    setPutts(Array(players.length).fill(0));
    setFairwayHits(Array(players.length).fill(false));
    setGreensInRegulation(Array(players.length).fill(false));
    setPictures(Array(players.length).fill(''));
  }
  const handleStrokes = (strokes, index) => {
    console.log("index of strokes ", index);
    setStrokes(previousStrokes => {
      return [...previousStrokes.slice(0, index), strokes, ...previousStrokes.slice(index+1)];
    });
  }
  const handlePutts = (putts, index) => {
    setPutts(previousPutts => {
      return [...previousPutts.slice(0, index), putts, ...previousPutts.slice(index+1)];
    });
  }
  const handleFairwayHits = (fairwayHit, index) => {
    setFairwayHits(previousFairwayHits => {
      return [...previousFairwayHits.slice(0, index), fairwayHit, ...previousFairwayHits.slice(index+1)];
    });
  }
  const handleGreensInRegulation = (greensInRegulation, index) => {
    setGreensInRegulation(previousGreensInRegulation => {
      return [...previousGreensInRegulation.slice(0, index), greensInRegulation, ...previousGreensInRegulation.slice(index+1)];
    });
  }
  const handlePictures = (picture, index) => {
    console.log("index of picture: ", index);
    setPictures(previousPictures => {
      return [...previousPictures.slice(0, index), picture, ...previousPictures.slice(index+1)];
    });
  }
  const holeObject = [];
  const createHoleObject = (player, par, holeNumber, strokes, putts, fairwayHit, greensInRegulation, picture) => {
    holeObject.push({
      name: player,
      par: parseInt(par),
      holeNumber: parseInt(holeNumber),
      strokes: strokes,
      putts: putts,
      fairwayHit: fairwayHit,
      greensInRegulation: greensInRegulation,
      picture: picture
    })
  }
  const submit = () => {
    //player, par, strokes, putts, fairwayHits, greensInRegulation
    toggleLoading(true);
    players.forEach((player, i) => {
      createHoleObject(player, par, props.match.params.holeNumber, strokesArray[i], puttsArray[i], fairwayHitsArray[i], greensInRegulationArray[i], picturesArray[i]);
    });
    holeObject.forEach(async (score, i) => {
      console.log("sending this score object to database: ", score);
      await props.game.addHole(score);
      toggleLoading(false);
      if(i === players.length-1){
        console.log("going to previous screen...");
        props.history.go(-1);
      }
    });//closes holeObject.foreach

  }//closes submit function
  //create dialogue "Does this look right? With score stuff"
  const confirm = <div align="center">
    <Typography variant='h4'>Hole #{props.match.params.holeNumber}</Typography>
    <Typography variant='h5'>Par {par}</Typography>
    {players.map((player, i) =>
      <div key={i} >
        <Typography variant='h6'>Player: {player}</Typography>
        <Typography variant='body2'>Strokes: {strokesArray[i]}</Typography>
        <Typography variant='body2'>Putts: {puttsArray[i]}</Typography>
        {fairwayHitsArray[i] ? <Typography variant='body2'>Fairyway Hit</Typography> : null}
        {greensInRegulationArray[i] ? <Typography variant='body2'>Green in Regulation</Typography> : null}
        {picturesArray[i] ? <Image src={picturesArray[i]}/> : null}
      </div>
    )}
  </div>
  return (
    <div>
      <Loading open={loading}/>
      <Button
      variant="outlined"
      style={{float: "left"}}
      onClick={() => props.history.go(-1)}>
        <BackIcon/>
      </Button>
      <Button
      variant="contained"
      color="error"
      style={{float: "right"}}
      onClick={() => toggleConfirmClearState(true)}>
        CLEAR
      </Button>
      <Typography align="center" variant="h3">Hole #{props.match.params.holeNumber}</Typography>
      <Counter title="PAR" max="5" value={par} onChange={setPar}/>

      {/*------------------------------start player map----------------------------*/}

      {players.map((player, i) => {
        return <StickyContainer
          key={i}>
        <Sticky>
        {({style}) => (
        <Typography classes={{root: classes.root}} style={{ ...style, zIndex: 100  }} align="center" variant="h3">{player}</Typography>
        )}
        </Sticky>

      <Counter title="TOTAL STROKES" value={strokesArray[i]} onChange={e => handleStrokes(e, i)}/>
      <Counter title="PUTTS" max={strokesArray[i]-1 > 0 ? strokesArray[i]-1 : 0} value={puttsArray[i]} onChange={e => handlePutts(e, i)}/>
      <SelectBox title="Fairway Hit" checked={fairwayHitsArray[i]} onChange={e => handleFairwayHits(e, i)}/>
      <SelectBox title="Green In Regulation" checked={greensInRegulationArray[i]} onChange={e => handleGreensInRegulation(e, i)}/>

    {/*------------------------------------camera stuff--------------------------*/}
        <div align="center">
          {picturesArray[i] ?
            <Fab
              variant="extended"
              color="primary"
              aria-label="Retake"
              onClick={() => {
                console.log("i when retake photo clicked: ", i);
                handlePictures('', i);
                toggleCamera(true);}}>
              <Redo style={{marginRight: 10}} />
              Retake Photo
            </Fab>
            :
            <Fab onClick={() => {
              console.log("i on fab click: ", i);
              handlePictures('', i);
              toggleCamera(true);}}
              color="primary" aria-label="Photo">
            <PhotoCamera />
          </Fab>}
        </div>
          <Dialog
            key={i}
            open={cameraOpen}
            fullScreen
            onEntered={() => {
              console.log("i on dialog entry: ", i);
            }}
          >
          <Camera
            onTakePhoto={(pic) => {
              handlePictures(pic, i)}}
            picture={picturesArray[i]}
            />
          <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              console.log("i on dialog cancel: ", i);
              toggleCamera(false);
            }}
            >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={picturesArray[i] ? false : true}
            onClick={() => toggleCamera(false)}
            >
            Submit
          </Button>

        </DialogActions>
        </Dialog>
        {/*-------------------------------end camera stuff-------------------------------*/}
      </StickyContainer>})/*---------------------------closes map--------------------------------*/}
      <BlockButton title="Submit Scores" onClick={() => toggleConfirmOpen(true)}/>
      <CustomDialog
        open={confirmOpen}
        toggleOpen={toggleConfirmOpen}
        title={`Does this look right?`}
        content={confirm}
        onClick={() => {
          toggleConfirmOpen(false);
          submit();
        }}
        onCancel={() => toggleConfirmOpen(false)}
        goButton="Submit"
      />
      <CustomDialog
        open={confirmClearState}
        toggleOpen={toggleConfirmClearState}
        title={`Do you really want to clear?`}
        onClick={() => {
          clearState();
          toggleConfirmClearState(false);
        }}
        onCancel={() => toggleConfirmClearState(false)}
        goButton="Clear"
      />
    </div>
  );
}

export default withStyles(styles)(Hole);
