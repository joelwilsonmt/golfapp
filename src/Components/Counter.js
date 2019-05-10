import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';

function Counter(props) {
    if(props.value < 0){
        props.onChange(0);
    }
    if(props.value > props.max){
        props.onChange(props.max);
    }
    return (
        <section style={{ justifySelf: "center", textAlign: "center" }}>
          <h1 style={{ color: "#444" }}>{props.title}</h1>
          <Button 
          variant="contained" 
          onClick={() => props.onChange(parseInt(props.value) - 1)}
          color="primary">
            -
          </Button>
         
          <OutlinedInput
            variant="outlined"
            labelWidth={0}
            style={{margin: "0px 10px"}}
            inputProps={{
                style: { textAlign: "center"},
              }}
            onChange={(e) => props.onChange(e.target.value)}
            value={props.value}
            type="number"
            />
          <Button 
          variant="contained" 
          onClick={() => props.onChange(parseInt(props.value) + 1)}
          color="primary">
            +
          </Button>
        </section>
    );
  }

  export default Counter;