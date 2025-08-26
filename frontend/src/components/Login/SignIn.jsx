import classNames from "classnames/bind";
import styles from "../../assets/css/Login.module.scss";
import Loading from "../Loading";

const cx = classNames.bind(styles);

const SignIn = ({
    handleSignIn,
    switchToSignUp,
    data,
    isPending,
    handleClose,
}) => {
    return (
        <div className={cx("login-wrapper")}>
            <h2>Login</h2>
            <button className={cx("close-btn")} onClick={handleClose}>
                &times;
            </button>
            <form
                onSubmit={(e) => {
                    e.preventDefault(); // chặn reload trang
                    const email = e.target.email.value;
                    const password = e.target.password.value;

                    // ✅ gửi object đúng format
                    handleSignIn({ email, password });
                }}
            >
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

                {/* Hiện lỗi nếu backend trả ERR */}
                {data?.data?.status === "ERR" && (
                    <span className={cx("error")}>{data?.data?.message}</span>
                )}

                <button type="submit" disabled={isPending}>
                    <Loading isLoading={isPending}>Login</Loading>
                </button>

                <div className={cx("bottom")}>
                    <span>Don’t have an account?</span>
                    <span className={cx("switch")} onClick={switchToSignUp}>
                        Sign Up
                    </span>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
