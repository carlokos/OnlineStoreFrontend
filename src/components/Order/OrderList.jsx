import React, { useState, useEffect } from "react";
import { List, ListItem } from "@mui/material";
import OrderService from '../../services/OrderService';
import OrderCard from "./OrderCard";

function OrderList({ user_id }) {
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await OrderService.getOrders(user_id);
        setUserOrders(response.data);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    fetchUserOrders();
  }, []);

  return (
    <List style={{ maxHeight: "500px", overflowY: "auto" }}>
      {userOrders.map((order) => (
        <ListItem key={order.id}>
          <OrderCard
            order={order}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default OrderList;