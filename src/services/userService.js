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
        JSON.stringify({ email, password }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    )
};

const updateUser = (userData) => {
    const { id } = userData;
    return axios.put(`${API_URL}users/${id}`, userData);
}

const updatePassword = (id, password) => {
    return axios.put(`${API_URL}users/password/${id}`, password);
};

const signup = (name, subname, email, password) => {
    return axios.post(`${API_URL}auth/register`,
        JSON.stringify({ name, subname, password, email }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    )
};

const newAdmin = (adminData) => {
    return axios.post(`${API_URL}auth/newAdmin`, adminData)
}

const loadCurrentUser = (token) => {
    try {
        return axios.get(`${API_URL}users/current`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    } catch (error) {
        return null;
    }
}

const loadUserRoles = (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return axios.get(`${API_URL}auth/roles`, config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}

const UserService = {
    getUsers,
    getUser,
    login,
    signup,
    loadCurrentUser,
    updateUser,
    updatePassword,
    loadUserRoles,
    newAdmin
};

export default UserService;