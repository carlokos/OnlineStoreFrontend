import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ProductService from '../../services/productService';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { removeFromCart, increaseQuantity, decreaseQuantity, getCart } from './CartLogic';

const CartCard = ({ productId, id }) => {
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await ProductService.getProduct(productId);
                setProductDetails(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProductDetails();
    }, [productId]);

    const getProductQuantity = () => {
        const cart = getCart();
        const cartItem = cart.find(item => item.product_id === productId);
        return cartItem ? cartItem.quantity : 0;
    };

    return (
        <Card style={{ marginBottom: '16px' }}>
            <CardContent>
                {productDetails && (
                    <>
                        <Typography variant="h5" component="div">
                            {productDetails.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Price: ${productDetails.price}
                        </Typography>
                        <IconButton onClick={() => removeFromCart(productId, id)}>
                            <ClearIcon />
                        </IconButton>
                        <IconButton onClick={() => increaseQuantity(productId)}>
                            <ArrowUpwardIcon />
                        </IconButton>
                        {getProductQuantity()}
                        <IconButton onClick={() => decreaseQuantity(productId)}>
                            <ArrowDownwardIcon />
                        </IconButton>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default CartCard;