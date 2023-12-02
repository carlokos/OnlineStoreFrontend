import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const getImage = (name) => {
    return axios.get(`${API_URL}image/${name}`);
};

const uploadImage = (file, productId) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("productId", productId);

    return axios.post(`${API_URL}image`, formData);
}

const ImageService = {
    getImage,
    uploadImage
};

export default ImageService;