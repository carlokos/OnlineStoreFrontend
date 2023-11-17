import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const getOrders = (id) => {
    return axios.get(`${API_URL}order/${id}`);
}

const updateOrder = (orderData) => {
    const {id} = orderData;
    return axios.put(`${API_URL}order/${id}`, orderData);
}

const deleteOrder = (id) => {
    return axios.delete(`${API_URL}order/${id}`);
}

const addOrder = async (orderData) => {
    const response = await axios.post(`${API_URL}order`, orderData);
    return response.data.id;
};

const OrderService = {
    getOrders,
    updateOrder,
    deleteOrder,
    addOrder
};

export default OrderService;