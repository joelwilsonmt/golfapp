import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

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
          <Fab
            onClick={() => props.onChange(parseInt(props.value) - 1)}
            color="primary" aria-label="Remove" >
              <RemoveIcon />
          </Fab>
          <OutlinedInput
            variant="outlined"
            labelWidth={0}
            style={{margin: "0px 10%", width: "25%"}}
            inputProps={{
                style: { textAlign: "center"},
              }}
            onChange={(e) => props.onChange(e.target.value)}
            value={props.value}
            type="number"
            />
          <Fab
            onClick={() => props.onChange(parseInt(props.value) + 1)}
            color="primary" aria-label="Add">
                <AddIcon />
            </Fab>
        </section>
    );
  }

  export default Counter;
