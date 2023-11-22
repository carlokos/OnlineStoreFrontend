import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const getTopSellingProducts = () => {
    return axios.get(`${API_URL}products/top-selling`);
};

const getTopUsers = () => {
    return axios.get(`${API_URL}users/top-users`);
}

const getTopCategories = () => {
    return axios.get(`${API_URL}orderDetail/top-categories`);
}

const getMonthlyRevenue = (month, year) => {
    return axios.get(`${API_URL}order/montly-revenue/${month}/${year}`);
};

const getWeeklyRevenue = (month, year) => {
    return axios.get(`${API_URL}order/weekly-revenue/${month}/${year}`);
};

const StatisticsService = {
    getTopSellingProducts,
    getTopUsers,
    getTopCategories,
    getMonthlyRevenue,
    getWeeklyRevenue
};

export default StatisticsService;