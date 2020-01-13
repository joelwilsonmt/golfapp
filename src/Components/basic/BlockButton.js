import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';

function BlockButton(props) {
    return (
      <Grid item xs={props.width} style={{ justifySelf: "center", textAlign: "center" }}>
          {props.link ?
          <Button
            fullWidth
            variant="contained"
            onClick={props.onClick}
            color="primary"
            component={ Link }
            to={props.link}>
              {props.title}
          </Button>
          :
          <Button
            fullWidth
            variant="contained"
            onClick={props.onClick}
            color="primary">
            {props.title}
          </Button>}
      </Grid>
    );
  }

  export default BlockButton;
