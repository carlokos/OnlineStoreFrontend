import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const getCategories = () => {
    return axios.get(API_URL + "categories");
};

const getCategory = (id) => {
    return axios.get(`${API_URL}categories/${id}`);
}

const CategoryService = {
    getCategories,
    getCategory
};

export default CategoryService;