import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const getDeliveryMethods = () => {
    return axios.get(API_URL + "delivery");
};

const updateDeliveryMethod = (DeliveryData) => {
    const {id} = DeliveryData;
    return axios.put(`${API_URL}delivery/${id}`, DeliveryData);
}

const deleteDeliveryMethod = (id) => {
    return axios.delete(`${API_URL}delivery/${id}`);
}

const addDeliveryMethod = (DeliveryData) => {
    return axios.post(`${API_URL}delivery`, DeliveryData);
};

const DeliveryService = {
    getDeliveryMethods,
    updateDeliveryMethod,
    deleteDeliveryMethod,
    addDeliveryMethod
};

export default DeliveryService;