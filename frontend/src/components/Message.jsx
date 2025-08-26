// Message.jsx
import { message } from "antd";

export const successMessage = (msg) => {
    message.success(msg);
};

export const errorMessage = (msg) => {
    message.error(msg);
};
