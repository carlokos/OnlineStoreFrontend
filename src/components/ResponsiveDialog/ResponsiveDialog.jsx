import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ResponsiveDialog( {open, onClose, onConfirm, title, msg} ) {

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            No
          </Button>
          <Button onClick={onConfirm} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}