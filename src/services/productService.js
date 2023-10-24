import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const getProducts = () => {
    return axios.get(API_URL + "products");
};

const getProduct = (id) => {
    return axios.get(`${API_URL}products/${id}`);
}

const ProductService = {
    getProducts,
    getProduct
};

export default ProductService;