import styles from "../assets/css/Blog.module.scss";
import classNames from "classnames/bind";

import { Link } from "react-router-dom";
import datablog from "../assets/data/blog.json";
import Blogs from "../components/Blogs";

const cx = classNames.bind(styles);
const Blog = ({ getBlogTitle }) => {
    return (
        <div className={cx("container")}>
            <div className={cx("content")}>
                <div className={cx("blog-wrapper")}>
                    <h2>Blog</h2>
                    <div className={cx("blog-list")}>
                        {datablog.map((item, index) => (
                            <Blogs
                                key={index}
                                props={item}
                                getBlogTitle={getBlogTitle}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
