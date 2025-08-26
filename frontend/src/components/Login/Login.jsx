import React, { useState } from "react";
import styles from "../../assets/css/Login.module.scss";
import classNames from "classnames/bind";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import * as UserService from "../../services/UserService";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { jwtDecode } from "jwt-decode";

const cx = classNames.bind(styles);

const Login = ({ handleClose }) => {
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState("signin"); // signin | signup
    const [isPending, setIsPending] = useState(false);
    const [response, setResponse] = useState(null);

    // tải user sau khi login thành công
    const loadUserAndSave = async (token) => {
        const decoded = jwtDecode(token);
        const userId = decoded?.id;
        const res = await UserService.getUserById(userId, token);
        if (res?.data?.data) {
            dispatch(setUser({ user: res.data.data, accessToken: token }));
        }
    };

    // xử lý login
    const handleSignIn = async (values) => {
        try {
            setIsPending(true);
            const res = await UserService.loginUser(values);
            setResponse(res);

            if (res?.status === "OK" && res?.data?.accessToken) {
                const token = res.data.accessToken;
                localStorage.setItem("access_token", token);
                await loadUserAndSave(token);
                alert("Đăng nhập thành công!");
                handleClose();
            }
        } catch (err) {
            console.error("Login error:", err);
        } finally {
            setIsPending(false);
        }
    };

    // xử lý register
    const handleSignUp = async (values) => {
        try {
            setIsPending(true);
            const res = await UserService.signUp(values);
            setResponse(res);

            if (res?.status === "OK") {
                alert("Đăng ký thành công, hãy đăng nhập!");
                setShowForm("signin");
            }
        } catch (err) {
            console.error("SignUp error:", err);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className={cx("container")}>
            <div className={cx("wrapper")}>
                {showForm === "signin" ? (
                    <SignIn
                        handleSignIn={handleSignIn}
                        switchToSignUp={() => setShowForm("signup")}
                        data={response}
                        isPending={isPending}
                        handleClose={handleClose}
                    />
                ) : (
                    <SignUp
                        handleSignUp={handleSignUp}
                        switchToSignIn={() => setShowForm("signin")}
                        data={response}
                        isPending={isPending}
                        handleClose={handleClose}
                    />
                )}
            </div>
        </div>
    );
};

export default Login;
