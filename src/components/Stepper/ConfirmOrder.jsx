import React, {useState, useEffect} from 'react';
import { Typography, Box } from '@mui/material';
import { getTotalPrice } from '../cart/CartLogic'; 

const ConfirmOrder = () => {
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    const fetchTotalPrice = async () => {
      const price = await getTotalPrice();
      setTotalPrice(price);
    };

    fetchTotalPrice();
  }, []);

  return (
    <Box textAlign="center" mt={3}>
      <Typography variant="h5">Total amount:</Typography>
      <Typography variant="h4">$ {totalPrice}</Typography>
    </Box>
  );
};

export default ConfirmOrder;