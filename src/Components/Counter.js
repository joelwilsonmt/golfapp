import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';

function Counter(props) {
    const [numberUnits, changeNumberUnits] = useState(0);
    if(numberUnits < 0){
        changeNumberUnits(0);
    }
    if(numberUnits > props.max){
        changeNumberUnits(props.max);
    }
    return (
        <section style={{ justifySelf: "center", textAlign: "center" }}>
          <h1 style={{ color: "#444" }}>{props.title}</h1>
          <Button 
          variant="contained" 
          onClick={() => changeNumberUnits(parseInt(numberUnits) - 1)}
          color="primary">
            -
          </Button>
         
          <OutlinedInput
            variant="outlined"
            style={{width: "150px", margin: "0px 10px"}}
            inputProps={{
                style: { textAlign: "center"},
              }}
            onChange={(e) => changeNumberUnits(e.target.value)}
            value={numberUnits}
            type="number"
            />
          <Button 
          variant="contained" 
          onClick={() => changeNumberUnits(parseInt(numberUnits) + 1)}
          color="primary">
            +
          </Button>
        </section>
    );
  }

  export default Counter;