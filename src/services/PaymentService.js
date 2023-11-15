import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const getPaymentMethods = () => {
    return axios.get(API_URL + "payment");
};

const updatePaymentMethod = (PaymentData) => {
    const {id} = PaymentData;
    return axios.put(`${API_URL}payment/${id}`, PaymentData);
}

const deletePaymentMethod = (id) => {
    return axios.delete(`${API_URL}payment/${id}`);
}

const addPaymentMethod = (PaymentData) => {
    return axios.post(`${API_URL}payment`, PaymentData);
};

const PaymentService = {
    getPaymentMethods,
    updatePaymentMethod,
    deletePaymentMethod,
    addPaymentMethod
};

export default PaymentService;