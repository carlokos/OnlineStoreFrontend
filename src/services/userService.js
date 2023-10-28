import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const getUsers = () => {
    return axios.get(API_URL + "users");
};

const getUser = (id) => {
    return axios.get(`${API_URL}users/${id}`);
}

const login = (email, password) => {
    return axios.post(`${API_URL}users/login`,
        JSON.stringify({email, password}),
        {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true
        }
    )
};

const signup = (name, subname, email, password) => {
    console.log(name);
    console.log(subname);
    console.log(email);
    console.log(password);
    return axios.post(`${API_URL}users`,
        JSON.stringify({name, subname, password, email}),
        {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true
        }
    )
};

const UserService = {
    getUsers,
    getUser,
    login,
    signup
};

export default UserService;