import React, { useState, useEffect } from "react";
import OrderDetailsService from "../../../services/OrderDetailsService";
import OrderDetailCard from "./OrderDetailsCard";
import { Dialog, DialogTitle, DialogContent, List, ListItem } from "@mui/material";

function OrderDetailsListDialog({ order, IsOpen, onClose }) {
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await OrderDetailsService.getAllOrderDetails(order.id);
                setOrderDetails(response.data);
            } catch (error) {
                console.error("Error fetching user orders:", error);
            }
        };

        fetchOrderDetails();
    }, []);

    return (
        <Dialog open={IsOpen} onClose={onClose}>
            <DialogTitle>Order details</DialogTitle>
            <DialogContent>
                <List style={{ maxHeight: "800px", overflowY: "auto" }}>
                    {orderDetails.map((item) => (
                        <ListItem key={item.id}>
                            <OrderDetailCard orderDetail={item} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    )
}

export default OrderDetailsListDialog;