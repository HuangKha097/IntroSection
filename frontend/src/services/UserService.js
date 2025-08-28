import axios from "axios";

const API_URL = "http://localhost:3001/api";

// 🟢 Đăng nhập
export const loginUser = async (data) => {
    const res = await axios.post(`${API_URL}/sign-in`, data, {
        headers: { "Content-Type": "application/json" },
    });
    return res.data; // { status: "OK", accessToken, refreshToken, data: {...} }
};

// 🟢 Đăng ký
export const signUp = async (data) => {
    const res = await axios.post(`${API_URL}/register`, data, {
        headers: { "Content-Type": "application/json" },
    });
    return res.data;
};

// 🟢 Cập nhật user
export const updateUser = async (id, data) => {
    const res = await axios.put(`${API_URL}/update-user/${id}`, data, {
        headers: { "Content-Type": "application/json" },
    });
    return res.data;
};

// 🟢 Xóa user
export const deleteUser = async (id) => {
    const res = await axios.delete(`${API_URL}/delete-user/${id}`, {
        headers: { "Content-Type": "application/json" },
    });
    return res;
};

// 🟢 Lấy user theo id (cần token)
export const getUserById = async (id, token) => {
    const res = await axios.get(`${API_URL}/get-user-by-id/${id}`, {
        headers: { token: `Bearer ${token}` }, // ✅ backend đang check req.headers.token
    });
    return res; // res.data = { status, data: user }
};

// Lay thong tin thoi tiet
export const getWeather = async (city) => {
    const res = await axios.get(`${API_URL}/weather/${city}`);
    return res;
};
