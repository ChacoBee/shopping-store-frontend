import axios from "axios";

export const getAllProduct = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/product/getAll-product`);
        return res.data;
    } catch (error) {
        throw error;
    }
}