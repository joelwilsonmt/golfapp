import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Loading = (props) => {
  return (
    <Dialog
    open={props.open}
    disableEscapeKeyDown
    disableBackdropClick
    aria-labelledby="form-dialog-title"
    fullWidth
    >
      <DialogTitle id="form-dialog-title">Loading</DialogTitle>
      <DialogContent>
        <img style={{width: "100%"}} src="https://i.giphy.com/media/fxOkhf5sUiK5ST3gWC/giphy.webp" alt="loading"/>
      </DialogContent>
    </Dialog>
  );
}

export default Loading;
