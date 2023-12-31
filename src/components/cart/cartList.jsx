import React from 'react';
import { List, Typography, Paper } from '@mui/material';
import CartCard from './CartCard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartList = ({ cart }) => {
  return (
    <div>
      <Typography variant="h4">
        Shopping Cart <ShoppingCartIcon/>
      </Typography>
      <Paper elevation={3} style={{ minHeight: '400px', maxHeight: '500px', minWidth: '500px', overflowY: "auto" }}>
        <List>
          {cart.map((item) => (
            <CartCard
              key={item.id}
              productId={item.productId}
              id={item.id}
              quantity={item.quantity}
            />
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default CartList;