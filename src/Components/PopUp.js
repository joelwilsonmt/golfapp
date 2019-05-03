import React,  { useState } from 'react';
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const PopUp = (props) => {
  const [disabled, toggleDisabled] = useState(true);
  const confirmPassword = (password) => {
    if(password === props.password){
      toggleDisabled(false);
    }
    else {
      toggleDisabled(true);
    }
  }
  return (
    <Dialog
    open={props.open}
    onClose={() => props.toggleOpen(false)}
    onBackdropClick={() => props.toggleOpen(false)}
    aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.content}
        </DialogContentText>
        {props.input ? 
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          onChange={(e) => {
            confirmPassword(e.target.value);
          }}/> 
        : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.toggleOpen(false)} color="primary">
          Cancel
        </Button>
        <Button
        disabled={disabled}
        onClick={console.log("go button clicked, make this 'authorize' in provider")}
        color="primary"
        variant="contained"
        component={ Link }
        to="/start/">
          Go
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PopUp;
