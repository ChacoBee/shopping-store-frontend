import axios from "axios";
import { axiosJwt } from "./UserService";

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

export const getDetailsProduct = async (id) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/product/get-details/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const updateProduct = async (id, access_token, data) => {
    try {
        const res = await axiosJwt.put(`${process.env.REACT_APP_BACKEND_API_URL}/product/update/${id}`, data, {
            headers: {
                token: `Bearer ${access_token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const deleteProduct = async (id, access_token) => {
    try {
        const res = await axiosJwt.delete(`${process.env.REACT_APP_BACKEND_API_URL}/product/delete/${id}`,  {
            headers: {
                token: `Bearer ${access_token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const deleteManyProduct = async (data, access_token) => {
    try {
        const res = await axiosJwt.post(`${process.env.REACT_APP_BACKEND_API_URL}/product/delete-many`, data,  {
            headers: {
                token: `Bearer ${access_token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};