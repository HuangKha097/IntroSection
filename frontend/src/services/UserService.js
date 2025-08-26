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

// 🟢 Lấy user theo id (cần token)
export const getUserById = async (id, token) => {
    const res = await axios.get(`${API_URL}/get-user-by-id/${id}`, {
        headers: { token: `Bearer ${token}` }, // ✅ backend đang check req.headers.token
    });
    return res; // res.data = { status, data: user }
};
