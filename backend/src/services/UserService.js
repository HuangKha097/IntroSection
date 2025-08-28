const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const JwtService = require("./JwtService");

const axios = require("axios");

const createUser = async (newUser) => {
    try {
        const { name, email, password } = newUser;

        // check email tồn tại trước
        const checkUser = await User.findOne({ email: email });
        if (checkUser) {
            return { status: "ERR", message: "Email already exists" };
        }
        const hashPassword = await bcrypt.hash(password, 10);
        console.log("hashPassword", hashPassword);

        // tạo user mới
        const createdUser = await User.create({
            name,
            email,
            password: hashPassword,
            confirmPassword: hashPassword,
        });

        return { status: "OK", data: createdUser };
    } catch (error) {
        throw error;
    }
};

const loginUser = async (userLogin) => {
    try {
        const { email, password } = userLogin;

        // check email tồn tại trước
        const checkUser = await User.findOne({ email: email });
        if (checkUser === null) {
            return { status: "ERR", message: "Email does not exist" };
        }
        const comparePassword = bcrypt.compareSync(
            password,
            checkUser.password
        );

        console.log("comparePassword", comparePassword);

        if (!comparePassword) {
            return { status: "ERR", message: "Password or email is incorrect" };
        }
        const accessToken = await JwtService.generalAccessToken({
            id: checkUser._id,
            isAdmin: checkUser.isAdmin,
        });
        const refreshToken = await JwtService.generalRefreshToken({
            id: checkUser._id,
            isAdmin: checkUser.isAdmin,
        });
        console.log(accessToken);
        console.log(refreshToken);

        return {
            status: "OK",
            accessToken,
            refreshToken,
            data: {
                name: checkUser.name,
            },
        };
    } catch (error) {
        throw error;
    }
};

const updateUser = async (id, data) => {
    try {
        // check email tồn tại trước
        const checkUser = await User.findOne({ _id: id });
        if (checkUser === null) {
            return { status: "ERR", message: "User does not exist" };
        }
        const updateUser = await User.findOneAndUpdate({ _id: id }, data, {
            new: true,
        });

        console.log("checkUser", updateUser);

        return { status: "OK", data: updateUser };
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        // check email tồn tại trước
        const checkUser = await User.findOne({ _id: id });
        if (checkUser === null) {
            return { status: "ERR", message: "User does not exist" };
        }
        const deleteUser = await User.findOneAndDelete({ _id: id });

        console.log("checkUser", checkUser);

        return {
            status: "OK",
            message: "Delete user successfully",
            data: deleteUser,
        };
    } catch (error) {
        throw error;
    }
};

const getAllUser = async () => {
    try {
        const allUser = await User.find();
        return { status: "OK", data: allUser };
    } catch (error) {
        throw error;
    }
};

const getUserById = async (id) => {
    try {
        // check email tồn tại trước
        const checkUser = await User.findOne({ _id: id });
        if (checkUser === null) {
            return { status: "ERR", message: "User does not exist" };
        }

        return {
            status: "OK",
            message: "Get user successfully",
            data: checkUser,
        };
    } catch (error) {
        throw error;
    }
};

const getWeather = async (city) => {
    try {
        // B1: gọi Geo API để lấy lat/lon trong VN
        const geoResponse = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${city},VN&limit=1&appid=${process.env.WEATHER_KEY}`
        );

        if (!geoResponse.data.length) {
            throw new Error("City not found in Vietnam");
        }

        const { lat, lon, name } = geoResponse.data[0];

        // B2: gọi Weather API với lat/lon
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_KEY}&units=metric`
        );

        return {
            city: name,
            ...weatherResponse.data,
        };
    } catch (error) {
        throw error;
    }
};
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getUserById,
    getWeather,
};
