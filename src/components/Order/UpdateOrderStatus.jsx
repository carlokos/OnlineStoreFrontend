import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const UpdateOrderStatus = ({ open, onClose, order, onUpdateOrder }) => {
  const [updatedOrder, setUpdatedOrder] = useState({
    ...order,
    orderStatus: order.orderStatus || '',
    paymentStatus: order.paymentStatus || '',
  });

  const handleUpdateClick = () => {
    onUpdateOrder(updatedOrder);
    onClose();
  };

  const handleOrderStatusChange = (e) => {
    setUpdatedOrder((prevOrder) => ({
      ...prevOrder,
      orderStatus: e.target.value,
    }));
  };

  const handlePaymentStatusChange = (e) => {
    setUpdatedOrder((prevOrder) => ({
      ...prevOrder,
      paymentStatus: e.target.value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Order Status</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <Select
            value={updatedOrder.orderStatus}
            onChange={handleOrderStatusChange}
            displayEmpty
          >
            <MenuItem value="pending payment">Pending Payment</MenuItem>
            <MenuItem value="pending shipment">Pending Shipment</MenuItem>
            <MenuItem value="shipped">Shipped</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <Select
            value={updatedOrder.paymentStatus}
            onChange={handlePaymentStatusChange}
            displayEmpty
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUpdateClick} color="primary">
          Update
        </Button>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateOrderStatus;
