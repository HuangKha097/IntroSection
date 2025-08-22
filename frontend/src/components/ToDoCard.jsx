import React from "react";
import styles from "../assets/css/ToDoCard.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const ToDoCard = ({ props }) => {
    return (
        <>
            <div className={cx("todo-card-wrapper")}>
                <h3 className={cx("todo-card-title")}>{props.title}</h3>
                <span className={cx("todo-card-date")}>{props.date}</span>
                <p className={cx("todo-card-content")}>{props.content}</p>
                <span className={cx("todo-card-time")}>{props.timetodo}</span>
                <div className={cx("todo-card-bottom")}>
                    <label htmlFor="checkbox" className={cx("switch")}>
                        <input type="checkbox" id="checkbox" />
                        <span className={cx("slider")}></span>
                    </label>
                    <button className={cx("todo-card-remove")}>Remove</button>
                </div>
            </div>
        </>
    );
};

export default ToDoCard;
