import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const getProducts = () => {
    return axios.get(API_URL + "products");
};

const getProduct = (id) => {
    return axios.get(`${API_URL}products/${id}`);
}

const getProductsByCategory = (id) => {
    return axios.get(`${API_URL}products/category/${id}`);
}

const ProductService = {
    getProducts,
    getProduct,
    getProductsByCategory
};

export default ProductService;