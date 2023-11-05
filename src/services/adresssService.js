import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const getUserAdresses = (id) => {
    return axios.get(`${API_URL}addresses/user/${id}`);
};

const updateAddress = (addressData) => {
    const { id } = addressData;
    return axios.put(`${API_URL}addresses/${id}`, addressData); 
}

const deleteAddress = (id) => {
    return axios.delete(`${API_URL}addresses/${id}`);
}

const addAddress = (addressData) => {
    return axios.post(`${API_URL}addresses`, addressData);
}

const AddressService = {
    getUserAdresses,
    updateAddress,
    deleteAddress,
    addAddress
};

export default AddressService;