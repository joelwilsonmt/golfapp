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
import axios from 'axios';

const styles = {
  root: {
    background: '#000',
    border: 0,
    color: 'white',
    boxShadow: '0 0px 5px rgba(0, 0, 0, .3)',
    marginBottom: '10px'
  }
};
const holeObject = [];
const createHoleObject = (player, par, holeNumber, strokes, putts, fairwayHit, greensInRegulation) => {
  holeObject.push({
    name: player,
    par: parseInt(par),
    holeNumber: parseInt(holeNumber),
    strokes: strokes,
    putts: putts,
    fairwayHit: fairwayHit,
    greensInRegulation: greensInRegulation
  })
}

function Hole(props) {
  const { classes } = props;
  let players = props.location.state.players;
  
  const [par, setPar] = useState(0);
  const [strokesArray, setStrokes] = useState(Array(players.length).fill(0));
  const [puttsArray, setPutts] = useState(Array(players.length).fill(0));
  const [fairwayHitsArray, setFairwayHits] = useState(Array(players.length).fill(false));
  const [greensInRegulationArray, setGreensInRegulation] = useState(Array(players.length).fill(false));
  const [confirmOpen, toggleConfirmOpen] = useState(false);
  const [confirmClearState, toggleConfirmClearState] = useState(false);
  const [redirect, toggleRedirect] = useState(false);
  const [loading, toggleLoading] = useState(false);

  const clearState = () => {
    setPar(0);
    setStrokes(Array(players.length).fill(0));
    setPutts(Array(players.length).fill(0));
    setFairwayHits(Array(players.length).fill(false));
    setGreensInRegulation(Array(players.length).fill(false));
  }
  const handleStrokes = (strokes, index) => {
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
  const submit = () => {
    //player, par, strokes, putts, fairwayHits, greensInRegulation
    toggleLoading(true);
    players.forEach((player, i) => {
      createHoleObject(player, par, props.match.params.holeNumber, strokesArray[i], puttsArray[i], fairwayHitsArray[i], greensInRegulationArray[i]);
    });
    console.log("hole object after creation: ", holeObject);
    
    holeObject.forEach(async score => {
      console.log("sending this score object to database: ", score);
      props.game.addHole(score);
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
        <Typography variant='body2'>Fairyway Hit? {fairwayHitsArray[i] ? "Yes" : "No"}</Typography>
        <Typography variant='body2'>Greens in Regulation? {greensInRegulationArray[i] ? "Yes" : "No"}</Typography>
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
      {players.map((player, i) => 
      <StickyContainer
      key={i}>
        <Sticky>
        {({style}) => (
        <Typography classes={{root: classes.root}} style={{ ...style, backgroundColor: 'primary', zIndex: 100  }} align="center" variant="h3">{player}</Typography>
        )}
        </Sticky>
      <Counter title="TOTAL STROKES" value={strokesArray[i]} onChange={e => handleStrokes(e, i)}/>
      <Counter title="PUTTS" max={strokesArray[i]-1 > 0 ? strokesArray[i]-1 : 0} value={puttsArray[i]} onChange={e => handlePutts(e, i)}/>
      <SelectBox title="Fairway Hit" checked={fairwayHitsArray[i]} onChange={e => handleFairwayHits(e, i)}/>
      <SelectBox title="Greens In Regulation" checked={greensInRegulationArray[i]} onChange={e => handleGreensInRegulation(e, i)}/>
      </StickyContainer>)}
      <BlockButton title="Submit Scores" onClick={() => toggleConfirmOpen(true)}/>
      <CustomDialog
        open={confirmOpen}
        toggleOpen={toggleConfirmOpen}
        title={`Does this look right?`}
        content={confirm}
        onClick={() => {
          //addToServer();
          toggleConfirmOpen(false);
          submit();
          //props.history.go(-1);
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
