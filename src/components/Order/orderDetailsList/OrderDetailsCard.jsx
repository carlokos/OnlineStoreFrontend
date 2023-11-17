import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ProductService from '../../../services/productService';
import OrderDetailsService from '../../../services/OrderDetailsService';

const OrderDetailCard = ({ orderDetail }) => {
    const [price, setPrice] = useState(0);
    const [product, setProduct] = useState();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await ProductService.getProduct(orderDetail.productId);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching user orders:", error);
            }
        };

        fetchProduct();
    }, []);

    useEffect(() => {
        const fetchPrice = async () => {
            try{
                const response = await OrderDetailsService.getTotalPrice(orderDetail.id);
                setPrice(response.data);
            } catch (error){
                console.log("error getting order Detail total price: ", error);
            }
        };

        fetchPrice();
    }, []);

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Product: {product && product.title ? product.title : "Loading..."}
                </Typography>
                <div>
                    <Typography variant="body2" color="textSecondary" component="span">
                        Product price: ${product ? product.price : "Loading..."}
                    </Typography>
                </div>
                <div>
                    <Typography variant="body2" color="textSecondary" component="span">
                        Quantity: {orderDetail.quantity}
                    </Typography>
                </div>
                <div>
                    <Typography variant="body2" color="textSecondary" component="span" fontWeight="bold">
                        Total amount: ${price}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderDetailCard;