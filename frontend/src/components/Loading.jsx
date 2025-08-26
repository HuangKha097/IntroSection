import { Spin } from "antd";
import React from "react";

const Loading = ({ isLoading, children }) => {
    // Nếu đang loading → chỉ hiển thị vòng xoay
    if (isLoading) {
        return <Spin size="small" />;
    }
    // Nếu không loading → hiển thị children (chữ Login)
    return children;
};

export default Loading;
