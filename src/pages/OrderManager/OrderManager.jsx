import React, { useEffect, useState } from 'react';
import OrderTable from '../../components/Order/OrderTable';
import OrderService from '../../services/OrderService';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderService.getAllOrders();
        setOrders(response.data);
      } catch (error) {
        console.log("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Box
      className="container-fluid d-flex justify-content-center align-items-center vw-100"
      sx={{ padding: 2 }}
    >
      <Paper elevation={3} sx={{ padding: 2, width: '100%' }}>
        <OrderTable orders={orders} />
      </Paper>
    </Box>
  );
};

export default OrderManager;
