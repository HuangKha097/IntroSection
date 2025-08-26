import classNames from "classnames/bind";
import styles from "../../assets/css/Login.module.scss";
import Loading from "../Loading";

const cx = classNames.bind(styles);

const SignUp = ({
    handleSignUp,
    switchToSignIn,
    data,
    isPending,
    handleClose,
}) => {
    return (
        <div className={cx("register-wrapper")}>
            <h2>Register</h2>
            <button className={cx("close-btn")} onClick={handleClose}>
                &times;
            </button>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const name = e.target.name.value;
                    const email = e.target.email.value;
                    const password = e.target.password.value;
                    const confirmPassword = e.target["confirm-password"].value;

                    handleSignUp({ name, email, password, confirmPassword });
                }}
            >
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

                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirm-password"
                    id="confirm-password"
                    autoComplete="off"
                    required
                />

                {/* Hiện lỗi nếu backend trả ERR */}
                {data?.data?.status === "ERR" && (
                    <span className={cx("error")}>{data?.data?.message}</span>
                )}

                <button type="submit" disabled={isPending}>
                    <Loading isLoading={isPending}>Register</Loading>
                </button>

                <div className={cx("bottom")}>
                    <span className={cx("switch")} onClick={switchToSignIn}>
                        Already have an account?
                    </span>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
