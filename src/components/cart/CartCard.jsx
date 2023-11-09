import React, { useState, useEffect, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ProductService from '../../services/productService';
import { CartContext } from './ShoppingCartContext';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { removeFromCart, increaseQuantity, decreaseQuantity } from './CartLogic';

const CartCard = ({ productId, id }) => {
    const [productDetails, setProductDetails] = useState(null);
    const [cart, setCart] = useContext(CartContext);

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
        console.log("cartId: ", id);
        console.log("cart: ", cart);
        const cartItem = cart.find(item => item.product_id === productId);
        return cartItem ? cartItem.quantity : 0;
    };

    return (
        <Card>
            <CardContent>
                {productDetails && (
                    <>
                        <Typography variant="h5" component="div">
                            {productDetails.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Price: ${productDetails.price} 
                        </Typography>
                        <IconButton onClick={() => removeFromCart(productId, id, setCart)}>
                            <ClearIcon />
                        </IconButton>
                        <IconButton onClick={() => increaseQuantity(productId, id, setCart)}>
                            <ArrowUpwardIcon />
                        </IconButton>
                        {getProductQuantity()}
                        <IconButton onClick={() => decreaseQuantity(productId, id, setCart)}>
                            <ArrowDownwardIcon />
                        </IconButton>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default CartCard;