import axios from "axios";
export const axiosJwt = axios.create();

export const getAllProduct = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/product/getAll-product`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const createProduct = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/product/create`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
}