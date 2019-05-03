import React,  { useState } from 'react';
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const CustomDialog = (props) => {
  const [input, setInput] = useState("");
  return (
    <Dialog
    open={props.open}
    onClose={() => props.toggleOpen(false)}
    onBackdropClick={() => props.toggleOpen(false)}
    aria-labelledby="form-dialog-title"
    fullWidth
    >
      <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        {props.content}
        {props.input ? 
        <TextField
          autoFocus
          margin="dense"
          value={input}
          id={props.inputId}
          label={props.inputLabel}
          type="text"
          onChange={(e) => {
            props.handleInput(e.target.value);
            setInput(e.target.value);
          }}/> 
        : null}
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={() => props.toggleOpen(false)} 
          color="primary">
            {props.cancelButton ? props.cancelButton : "Cancel"}
        </Button>
        {props.link ?
        <Button
          disabled={props.disabled}
          onClick={props.onClick}
          color="primary"
          variant="contained"
          component={ Link }
          to={props.link}>
            {props.goButton ? props.goButton : "Go"}
        </Button>
        :
        <Button
          disabled={props.disabled}
          color="primary"
          variant="contained"
          onClick={props.onClick}>
            {props.goButton ? props.goButton : "Go"}
        </Button>}
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;
