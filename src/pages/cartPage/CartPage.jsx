import React, { useEffect, useState } from "react";
import CartList from "../../components/cart/cartList";
import UserService from "../../services/userService";
import { getCart } from "../../components/cart/CartLogic";
import { Button, Paper } from '@mui/material';
import DialogStepper from "../../components/Stepper/Stepper";
import { addListener, quitListener } from "../../components/cart/cartListener";
import CartService from "../../services/cartService";
import Cookies from "js-cookie";

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [userId, setUserId] = useState();
    const [showStepper, setShowStepper] = useState(false);

    useEffect(() => {
        const handleCartUpdate = () => {
            setCart(getCart());
        };
        addListener('CART_UPDATED', handleCartUpdate);

        const fetchUserCart = async () => {
            try {
                const token = localStorage.getItem('token');
                const userData = await UserService.loadCurrentUser(token);

                if (userData.data) {
                    const userId = userData.data.id;
                    setUserId(userId);
                    
                    const response = await CartService.getUserCart(userId);
                    Cookies.remove('cart');
                    Cookies.set('cart', JSON.stringify(response.data), { expires: 7 });
                    setCart(response.data);
                }
            } catch (error) {
                console.error("Error fetching user cart: ", error);
            }
        };
        
        fetchUserCart();

        return () => {
            quitListener('CART_UPDATED', handleCartUpdate);
        };
    }, []);

    const handleCheckoutClick = () => {
        setShowStepper(true);
    };

    const handleCloseStepper = () => {
        setShowStepper(false);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vw-100 vh-100">
            <CartList cart={cart} style={{ margin: '16px' }}/>
            <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
                <Button variant="contained" color="success" onClick={handleCheckoutClick}>
                    Checkout
                </Button>
            </Paper>

            {showStepper && (
                <DialogStepper open={showStepper} onClose={handleCloseStepper} user_id={userId} />
            )}
        </div>
    );
};

export default CartPage;