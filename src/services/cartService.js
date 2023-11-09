import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const getUserCart = (id) => {
    return axios.get(`${API_URL}cart/${id}`);
}

const updateCart = (cartData) => {
    const { id } = cartData;
    return axios.put(`${API_URL}cart/${id}`, cartData);
}

const deleteCart = (id) => {
    return axios.delete(`${API_URL}cart/${id}`);
}

const addCart = (cartData) => {
    return axios.post(`${API_URL}cart`, cartData);
}

const CartService = {
    getUserCart,
    updateCart,
    deleteCart,
    addCart
}

export default CartService;