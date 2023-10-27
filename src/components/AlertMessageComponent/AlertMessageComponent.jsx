import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import './AlertMessageComponent.css';
import Slide from '@mui/material/Slide';

const AlertMessageComponent = ({ message, severity }) => {
  const [state, setState] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal} = state;
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide {...props} direction="down" ref={ref} />;
  });

  return (
    <Box className="portal-container" sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        autoHideDuration={3000}
        key={vertical + horizontal}
      >
        <Alert severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AlertMessageComponent;
