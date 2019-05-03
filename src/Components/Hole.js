import React from 'react';
import Counter from './Counter';
import SelectBox from './SelectBox';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBack';


function Hole(props) {
  console.log("hole props: ", props.match);
  return (
    <div id="container">
    <Button 
    onClick={() => props.history.go(-1)}><BackIcon/></Button>
    <Counter title="PAR" max="5"/>
    <Counter title="STROKES"/>
    <Counter title="PUTTS"/>
    <SelectBox title="Fairway Hit"/>
    <SelectBox title="Greens In Regulation"/>
    </div>
  );
}

export default Hole;
