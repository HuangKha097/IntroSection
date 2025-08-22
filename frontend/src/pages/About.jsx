import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import React from "react";
import className from "classnames/bind";
import styles from "../assets/css/About.module.scss";

const cx = className.bind(styles);
const About = () => {
    return (
        <div className={cx("container")}>
            <div className={cx("content")}>
                <div className={cx("about-wrapper")}>
                    <h2>Contact Us</h2>
                    <div className={cx("social")}>
                        <a
                            href="https://www.facebook.com/hoang.kha.36441"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon
                                icon={faFacebook}
                                className={cx("fab fa-facebook-f")}
                            />
                            Hoang Kha
                        </a>
                        <a
                            href="https://google.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon
                                icon={faGoogle}
                                className={cx("fab fa-google")}
                            />
                            quachhoangkha097@gmail.com
                        </a>
                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon
                                icon={faInstagram}
                                className={cx("fab fa-instagram")}
                            />
                            @qhkowf
                        </a>
                        <a
                            href="https://www.github.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon
                                icon={faGithub}
                                className={cx("fab fa-github")}
                            />
                            @huangkha097
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
