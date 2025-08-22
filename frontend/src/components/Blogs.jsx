import styles from "../assets/css/Blogs.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
const Blogs = ({ props, getBlogTitle }) => {
    const handleClick = () => {
        getBlogTitle(props.title);
        localStorage.setItem(
            "currentBlog",
            JSON.stringify(props.title.trim().replace(/\s+/g, " "))
        );
    };
    return (
        <Link
            to={`/blog/${props.title.trim().replace(/\s+/g, "-")}`}
            className={cx("blog-wrapper")}
            onClick={() => handleClick()}
        >
            <img
                className={cx("blog-image")}
                src={props.image}
                alt={props.title}
            />
            <h2 className={cx("blog-title")}>{props.title}</h2>
            <span className={cx("blog-date")}>{props.date}</span>
            <h3 className={cx("blog-subtitle")}>{props.subtitle}</h3>
            <p className={cx("blog-content")}>{props.content}</p>
            <span className={cx("blog-author")}>
                <FontAwesomeIcon className={cx("author-icon")} icon={faUser} />
                {props.author}
            </span>
            <Link className={cx("blog-link")} to={"/blogs"}>
                Read more
            </Link>
        </Link>
    );
};

export default Blogs;
