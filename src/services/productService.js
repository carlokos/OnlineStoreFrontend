import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const getProducts = () => {
    return axios.get(API_URL + "products");
};

const getProduct = (id) => {
    return axios.get(`${API_URL}products/${id}`);
}

const getFirstProductImage = async(id) => {
    try {
        const response = await axios.get(`${API_URL}products/firstImage/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const getProductsByCategory = (id) => {
    return axios.get(`${API_URL}products/category/${id}`);
}

const deleteProduct = (id) => {
    return axios.delete(`${API_URL}products/${id}`);
}

const updateProduct = (productData) => {
    const { id } = productData;
    return axios.put(`${API_URL}products/${id}`, productData);
};

const addProduct = (productData) => {
    console.log(productData);
    return axios.post(`${API_URL}products`, productData);
};

const ProductService = {
    getProducts,
    getProduct,
    getProductsByCategory,
    getFirstProductImage,
    deleteProduct,
    updateProduct,
    addProduct
};

export default ProductService;