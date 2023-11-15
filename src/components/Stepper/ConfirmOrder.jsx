import React from 'react';
import { Typography, Box } from '@mui/material';

const ConfirmOrder = ({ totalPrice }) => {
  return (
    <Box textAlign="center" mt={3}>
      <Typography variant="h5">Precio Total:</Typography>
      <Typography variant="h4">${totalPrice}</Typography>
    </Box>
  );
};

export default ConfirmOrder;