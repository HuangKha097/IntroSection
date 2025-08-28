import React, { useState } from "react";
import styles from "../assets/css/Profile.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import * as UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/userSlice";

const cx = classNames.bind(styles);
const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.userInfo);
    const [isUpdate, setIsUpdate] = useState(false);

    const handleUpdate = () => {
        setIsUpdate((prev) => !prev);
    };

    // de thay doi thong tin input, neu khong co input bi khoa khong nhap duoc
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [form, setForm] = useState({
        id: user?.data._id || "",
        avatar: user?.data.avatar || "",
        username: user?.data.name || "",
        email: user?.data.email || "",
        password: user?.data.password || "",
    });

    const handleUpdateUser = async (id, values) => {
        try {
            const result = await UserService.updateUser(id, values);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const result = await UserService.deleteUser(id);
            localStorage.removeItem("access_token"); // xoá token khỏi localStorage
            dispatch(clearUser()); // xoá user trong Redux
            navigate("/"); // điều hướng về home
            alert("Delete user successfully");
            console.log(result);
        } catch (error) {
            console.log(error);
        }
        console.log("id", id);
    };
    console.log("user", form);
    console.log("isUpdate", isUpdate);

    return (
        <div className={cx("container")}>
            <div className={cx("content")}>
                <div className={cx("profile-wrapper")}>
                    <h2>Profile</h2>
                    <form action="" className={cx("profile-form")}>
                        <img src="" alt="" className={cx("profile-image")} />
                        <label htmlFor="avatar">
                            <input
                                name="avatar"
                                accept="image/*"
                                type="file"
                                className={cx("profile-input")}
                                disabled={!isUpdate}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="username">
                            Username
                            <input
                                value={form.username}
                                name="username"
                                type="text"
                                placeholder="Name"
                                className={cx("profile-name")}
                                disabled={!isUpdate}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="email">
                            Email
                            <input
                                value={form.email}
                                name="email"
                                type="email"
                                placeholder="Email"
                                className={cx("profile-email")}
                                disabled={!isUpdate}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="password">
                            Old Password
                            <input
                                type="password"
                                placeholder="Password"
                                className={cx("profile-password")}
                                name="password"
                                disabled
                            />
                        </label>
                        <label htmlFor="password">
                            New Password
                            <input
                                type="password"
                                placeholder="Password"
                                className={cx("profile-password")}
                                disabled
                            />
                        </label>
                        <div className={cx("profile-btn")}>
                            <button
                                type="button"
                                className={cx("profile-btn-delete")}
                                onClick={() => {
                                    if (
                                        window.confirm(
                                            "Bạn có muốn xoá tài khoản?"
                                        )
                                    ) {
                                        handleDeleteUser(form.id);
                                    }
                                }}
                            >
                                Delete Account
                            </button>
                            <div className={cx("profile-btn-group")}>
                                {isUpdate && (
                                    <button
                                        type="button"
                                        className={cx("profile-btn-save")}
                                        onClick={() => {
                                            if (
                                                window.confirm(
                                                    "Bạn có muốn lưu thay đổi?"
                                                )
                                            ) {
                                                handleUpdateUser(form.id, {
                                                    avatar: form.avatar,
                                                    name: form.username,
                                                    email: form.email,
                                                });
                                            }
                                        }}
                                    >
                                        Save
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className={cx("profile-btn-update")}
                                    onClick={() => handleUpdate()}
                                >
                                    {isUpdate ? "Cancel" : "Update"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
