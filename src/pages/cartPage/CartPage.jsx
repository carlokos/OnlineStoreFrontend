import React, { useEffect, useState, useContext } from "react";
import CartList from "../../components/cart/cartList";
import CartService from "../../services/cartService";
import UserService from "../../services/userService";
import { CartContext } from "../../components/cart/ShoppingCartContext";

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [userId, setUserId] = useState(null);
    const localCart = localStorage.getItem('cart');
    const [, updateCartContext] = useContext(CartContext);

    useEffect(() => {
        const fetchUserCart = async () => {
            try {
                const token = localStorage.getItem('token');
                const userData = await UserService.loadCurrentUser(token);

                if (userData.data) {
                    const userId = userData.data.id;
                    setUserId(userId);

                    const response = await CartService.getUserCart(userId);
                    console.log(response.data);
                    setCart(response.data);

                    // Actualizar el contexto con el nuevo estado del carrito
                    updateCartContext(response.data);
                }
            } catch (error) {
                console.error("Error fetching user cart: ", error);
            }
        };

        fetchUserCart();
    }, [updateCartContext]);

    return (
        <div>
            <CartList cart={cart} />
        </div>
    )
};

export default CartPage;