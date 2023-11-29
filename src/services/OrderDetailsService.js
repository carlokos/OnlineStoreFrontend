import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const getOrderDetail = (id) => {
    return axios.get(`${API_URL}orderDetail/${id}`);
}

const getAllOrderDetails = (id) => {
    return axios.get(`${API_URL}orderDetail/order/${id}`);
}

const updateOrderDetail = (orderData) => {
    const {id} = orderData;
    return axios.put(`${API_URL}orderDetail/${id}`, orderData);
}

const deleteOrderDetail = (id) => {
    return axios.delete(`${API_URL}orderDetail/${id}`);
}

const getOrderCount = (id) => {
    return axios.get(`${API_URL}orderDetail/count/${id}`);
}

const getTotalOrderPrice = (id) => {
    return axios.get(`${API_URL}orderDetail/totalOrderPrice/${id}`);
}

const getTotalPrice = (id) => {
    return axios.get(`${API_URL}orderDetail/totalPrice/${id}`);
}

const addOrderDetail = async (orderId, cart) => {
    const orderDetailsData = cart.map((cartItem) => ({
        orderId: orderId,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
    }));

    return axios.post(`${API_URL}orderDetail`, orderDetailsData);
};

const OrderDetailsService = {
    getOrderDetail,
    getAllOrderDetails,
    updateOrderDetail,
    deleteOrderDetail,
    addOrderDetail,
    getOrderCount,
    getTotalOrderPrice,
    getTotalPrice
};

export default OrderDetailsService;