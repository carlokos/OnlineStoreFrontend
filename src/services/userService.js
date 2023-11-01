import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const getUsers = () => {
    return axios.get(API_URL + "users");
};

const getUser = (id) => {
    return axios.get(`${API_URL}users/${id}`);
}

const login = (email, password) => {
    return axios.post(`${API_URL}auth/login`,
        JSON.stringify({email, password}),
        {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true
        }
    )
};

const signup = (name, subname, email, password) => {
    return axios.post(`${API_URL}auth/register`,
        JSON.stringify({name, subname, password, email}),
        {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true
        }
    )
};

const loadCurrentUser = (token) => {
    return axios.get(`${API_URL}users/current`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

const UserService = {
    getUsers,
    getUser,
    login,
    signup,
    loadCurrentUser
};

export default UserService;