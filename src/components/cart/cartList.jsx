import React from 'react';
import { List, Typography, Paper } from '@mui/material';
import CartCard from './CartCard';

const CartList = ( {cart} ) => {  
  return (
    <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <List>
        {cart.map((item) => (
          <CartCard
            key={item.id}
            productId={item.product_id}
            id={item.id}
            quantity={item.quantity}
          />
        ))}
      </List>
    </Paper>
  );
};

export default CartList;