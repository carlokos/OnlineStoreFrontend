import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import OrderDetailsService from '../../services/OrderDetailsService';
import OrderDetailsListDialog from './orderDetailsList/OrderDetailsListDialog';

const OrderCard = ({ order, admin }) => {
    const [count, setCount] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await OrderDetailsService.getOrderCount(order.id);
                setCount(response.data);
            } catch (error) {
                console.error("Error fetching user orders:", error);
            }
        };

        fetchCount();
    }, []);

    const handleOnClick = () => {
        if (admin) {
            console.log("Admin access");
        } else {
            setIsOpen(true);
        }
    }

    return (
        <>
            <Card onClick={handleOnClick}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Status: {order.orderStatus}
                    </Typography>
                    <div>
                        <Typography variant="body2" color="textSecondary" component="span">
                            Articles: {count}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="body2" color="textSecondary" component="span">
                            Price: ${order.totalPrice}
                        </Typography>
                    </div>
                </CardContent>
            </Card>

            {isOpen && (
                <OrderDetailsListDialog
                    order={order}
                    IsOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default OrderCard;