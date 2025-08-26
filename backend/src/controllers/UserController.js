const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isCheckEmail = reg.test(email);

        if (!name || !email || !password || !confirmPassword) {
            return res
                .status(400)
                .json({ status: "ERR", message: "The input is required" });
        } else if (!isCheckEmail) {
            return res
                .status(400)
                .json({ status: "ERR", message: "Email is not valid" });
        } else if (password !== confirmPassword) {
            return res
                .status(400)
                .json({ status: "ERR", message: "Password does not match" });
        }

        const result = await UserService.createUser({ name, email, password });
        return res.status(201).json({ status: "OK", data: result });
    } catch (error) {
        return res.status(500).json({ status: "ERR", message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isCheckEmail = reg.test(email);

        if (!email || !password) {
            return res
                .status(400)
                .json({ status: "ERR", message: "The input is required" });
        } else if (!isCheckEmail) {
            return res
                .status(400)
                .json({ status: "ERR", message: "Email is not valid" });
        }

        const result = await UserService.loginUser(req.body);
        const { refreshToken, ...newResult } = result;
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
        });
        return res.status(201).json({ status: "OK", data: result });
    } catch (error) {
        return res.status(500).json({ status: "ERR", message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const useId = req.params.id;

        if (!useId) {
            return res
                .status(400)
                .json({ status: "ERR", message: "The user id is required" });
        }
        const data = req.body;
        if (!data) {
            return res
                .status(400)
                .json({ status: "ERR", message: "The input is required" });
        }
        console.log("useId", useId);

        const result = await UserService.updateUser(useId, data);
        return res.status(201).json({ status: "OK", data: result });
    } catch (error) {
        return res.status(500).json({ status: "ERR", message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const useId = req.params.id;
        const token = req.headers;
        console.log("token", token);

        if (!useId) {
            return res
                .status(400)
                .json({ status: "ERR", message: "The user id is required" });
        }
        const data = req.body;
        if (!data) {
            return res
                .status(400)
                .json({ status: "ERR", message: "The input is required" });
        }

        const result = await UserService.deleteUser(useId, data);
        return res.status(201).json({ status: "OK", data: result });
    } catch (error) {
        return res.status(500).json({ status: "ERR", message: error.message });
    }
};

const getAllUser = async (req, res) => {
    try {
        const result = await UserService.getAllUser(req.body);
        return res.status(201).json({ status: "OK", data: result });
    } catch (error) {
        return res.status(500).json({ status: "ERR", message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const useId = req.params.id;

        if (!useId) {
            return res
                .status(400)
                .json({ status: "ERR", message: "The user id is required" });
        }

        const result = await UserService.getUserById(useId);
        return res.status(201).json({ status: "OK", data: result });
    } catch (error) {
        return res.status(500).json({ status: "ERR", message: error.message });
    }
};

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res
                .status(400)
                .json({ status: "ERR", message: "The token is required" });
        }

        const result = await JwtService.refreshToken(token);
        return res.status(201).json({ status: "OK", data: result });
    } catch (error) {
        return res.status(500).json({ status: "ERR", message: error.message });
    }
};
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getUserById,
    refreshToken,
};
