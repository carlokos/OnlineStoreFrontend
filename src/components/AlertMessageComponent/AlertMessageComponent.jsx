import { Alert, Snackbar } from '@mui/material';
import React, {useState} from 'react';
import Box from '@mui/material/Box';
import './AlertMessageComponent.css';
import Slide from '@mui/material/Slide';

const AlertMessageComponent = ({ message, severity, open, onClose }) => {
  const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal} = state;
  
  const handleClose = () => {
    onClose();
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
