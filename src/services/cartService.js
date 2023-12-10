import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const getUserCart = (id) => {
    console.log("se obtiene el carrito");
    return axios.get(`${API_URL}cart/${id}`);
}

const updateCart = (cartData) => {
    const { id } = cartData;
    return axios.put(`${API_URL}cart/${id}`, cartData);
}

const addQuantityToCart = (userId, productId, quantity) => {
    return axios.put(`${API_URL}cart/${userId}/${productId}?quantity=${quantity}`);
}

const deleteCart = (id) => {
    console.log(id);
    return axios.delete(`${API_URL}cart/${id}`);
}

const addCart = (cartData) => {
    return axios.post(`${API_URL}cart`, cartData);
}

const clearUserCart = (id) => {
    return axios.delete(`${API_URL}cart/user/${id}`);
}

const CartService = {
    getUserCart,
    updateCart,
    addQuantityToCart,
    deleteCart,
    addCart,
    clearUserCart
}

export default CartService;