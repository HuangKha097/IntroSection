import React, { useEffect, useState } from "react";
import styles from "../assets/css/DetailBlog.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
const DetailBlog = ({ props }) => {
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        });
    }, []);
    console.log(showScroll);

    return (
        <div className={cx("container")}>
            <div className={cx("content")}>
                <div className={cx("blog-wrapper")}>
                    <h1 className={cx("blog-title")}>{props.title}</h1>
                    <img src={props.image} alt={props.title} />
                    <span className={cx("blog-date")}>{props.date}</span>
                    <h3 className={cx("blog-subtitle")}>{props.subtitle}</h3>
                    <p className={cx("blog-content")}>{props.content}</p>
                    <span className={cx("blog-author")}>
                        <FontAwesomeIcon
                            className={cx("author-icon")}
                            icon={faUser}
                        />
                        {props.author}
                    </span>
                </div>
            </div>
            {showScroll && (
                <button
                    className={cx("scroll-to-top")}
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 15.75l7.5-7.5 7.5 7.5"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default DetailBlog;
