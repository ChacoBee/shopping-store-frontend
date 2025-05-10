import axios from "axios";

export const axiosJwt = axios.create();

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/user/sign-in`, data);
    return res.data
}

export const signupUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/user/sign-up`, data);
    return res.data
}

export const getDetailUser = async (id, access_token) => {
    try {
        const res = await axiosJwt.get(`${process.env.REACT_APP_BACKEND_API_URL}/user/get-details/${id}`, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getAllUser = async (access_token) => {
    try {
        const res = await axiosJwt.get(`${process.env.REACT_APP_BACKEND_API_URL}/user/getAll/`, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async(id, access_token) => {
    try {
        const res = await axiosJwt.delete(`${process.env.REACT_APP_BACKEND_API_URL}/user/delete-user/${id}`, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }   
}

export const refreshToken = async () => {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_API_URL}/user/refresh-token`,
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const logoutUser = async () => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/user/log-out`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (id, data, access_token) => {
    try {
        const res = await axiosJwt.put(`${process.env.REACT_APP_BACKEND_API_URL}/user/update-user/${id}`, data, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

