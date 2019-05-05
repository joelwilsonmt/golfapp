import React from 'react';
import Counter from './Counter';
import SelectBox from './SelectBox';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';

function Hole(props) {
  return (
    <div id="container">
    <Button 
    variant="outlined" 
    onClick={() => props.history.go(-1)}>
      <BackIcon/>
    </Button>
    <Typography align="center" variant="h3">Hole #{props.match.params.holeNumber}</Typography>
    <Counter title="PAR" max="5"/>
    <Counter title="STROKES"/>
    <Counter title="PUTTS"/>
    <SelectBox title="Fairway Hit"/>
    <SelectBox title="Greens In Regulation"/>
    </div>
  );
}

export default Hole;
