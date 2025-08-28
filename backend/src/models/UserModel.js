const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        avatar: { type: String, default: "" },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        accessToken: {
            type: String,
            default: "",
        },
        refreshToken: {
            type: String,
            default: "",
        },
    },
    {
        // thoi gian tao va cap nhat
        timestamps: true,
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
