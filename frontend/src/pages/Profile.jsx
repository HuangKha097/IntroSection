import React from "react";
import styles from "../assets/css/Profile.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const Profile = () => {
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
                            />
                        </label>
                        <label htmlFor="name">
                            Username
                            <input
                                name="name"
                                type="text"
                                placeholder="Name"
                                className={cx("profile-name")}
                            />
                        </label>
                        <label htmlFor="email">
                            Email
                            <input
                                type="email"
                                placeholder="Email"
                                className={cx("profile-email")}
                            />
                        </label>
                        <label htmlFor="password">
                            Password
                            <input
                                type="password"
                                placeholder="Password"
                                className={cx("profile-password")}
                            />
                        </label>
                        <div className={cx("profile-btn")}>
                            <button className={cx("profile-btn-delete")}>
                                Delete Account
                            </button>
                            <button className={cx("profile-btn-update")}>
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
