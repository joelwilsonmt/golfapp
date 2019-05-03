import React, { useState } from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function SelectBox(props) {
    const [checked, changeCheck] = useState(false);    
    return (
        <section style={{ justifySelf: "center", textAlign: "center" }}>
          
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={() => changeCheck(!checked)}
                color="primary"
              />
            }
            label={props.title}
          />
        </section>
    );
  }

  export default SelectBox;