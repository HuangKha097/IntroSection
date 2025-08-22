import React, { useState } from "react";
import styles from "../assets/css/Login.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const Login = ({ close }) => {
    const [showPopup, setShowPopup] = useState("login");

    const handleShowPopup = (popup) => {
        setShowPopup(popup);
    };

    return (
        <div className={cx("container")}>
            {showPopup === "login" && (
                <>
                    (
                    <div className={cx("login-wrapper")}>
                        <button className={cx("close-btn")} onClick={close}>
                            &times;
                        </button>
                        <h2>Login</h2>
                        <form>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                id="email"
                                autoComplete="off"
                                required
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                id="password"
                                autoComplete="off"
                                required
                            />
                            <label>
                                <input
                                    className={cx("checkbox")}
                                    type="checkbox"
                                    value="remember-me"
                                    name="remember-me"
                                />
                                Remember me
                            </label>

                            <button type="submit">Login</button>
                        </form>
                        <div className={cx("bottom")}>
                            <span>Forgot your password?</span>
                            <span onClick={() => handleShowPopup("register")}>
                                Don't have an account?
                            </span>
                        </div>
                    </div>
                    )
                </>
            )}
            {showPopup === "register" && (
                <div className={cx("register-wrapper")}>
                    <button className={cx("close-btn")} onClick={close}>
                        &times;
                    </button>
                    <h2>Register</h2>
                    <form>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            id="name"
                            autoComplete="off"
                            required
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            id="email"
                            autoComplete="off"
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            id="password"
                            autoComplete="off"
                            required
                        />

                        <label htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirm-password"
                            id="confirm-password"
                            autoComplete="off"
                            required
                        />

                        <button type="submit">Register</button>
                    </form>
                    <div className={cx("bottom")}>
                        <span>Forgot your password?</span>
                        <span onClick={() => handleShowPopup("login")}>
                            Already have an account?
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
