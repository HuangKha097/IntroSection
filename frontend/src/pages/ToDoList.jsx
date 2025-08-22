import React, { useState, useEffect } from "react";
import styles from "../assets/css/ToDoList.module.scss";
import classNames from "classnames/bind";
import ToDoCard from "../components/ToDoCard";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const ToDoList = () => {
    const [worksList, setWorksList] = useState([]); // chứa danh sách công việc
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        date: new Date().toISOString().slice(0, 10),
        timetodo: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddWork = (e) => {
        e.preventDefault(); // tránh reload form
        e.preventDefault();
        const updatedWorks = [...worksList, formData];
        setWorksList(updatedWorks);

        localStorage.setItem("works", JSON.stringify(updatedWorks));
        // reset form
        setFormData({
            title: "",
            content: "",
            date: new Date().toISOString().slice(0, 10),
            timetodo: "",
        });
    };

    // Khi mount component -> lấy dữ liệu
    useEffect(() => {
        const savedWorks = localStorage.getItem("works");
        if (savedWorks) {
            setWorksList(JSON.parse(savedWorks));
        }
    }, []);
    console.log(worksList);

    return (
        <div className={cx("container")}>
            <div className={cx("content")}>
                <div className={cx("todo-list-wrapper")}>
                    <h2>To Do List</h2>
                    <form htmlFor="input-todo" onSubmit={handleAddWork}>
                        <span></span>
                        <input
                            name="title"
                            value={formData.title}
                            type="text"
                            id="input-todo"
                            placeholder="Title work"
                            required
                            onChange={handleChange}
                        />

                        <input
                            name="content"
                            value={formData.content}
                            type="text"
                            id="input-todo"
                            placeholder="Content work"
                            required
                            onChange={handleChange}
                        />

                        <input
                            name="timetodo"
                            value={formData.timetodo}
                            type="text"
                            id="input-todo"
                            placeholder="Time to do work"
                            required
                            onChange={handleChange}
                        />
                        <button className={cx("add-btn")} type="submit">
                            Add
                        </button>
                    </form>
                    <div className={cx("action-btn")}>
                        <button className={cx("add-btn")}>Active</button>
                        <button className={cx("edit-btn")}>Inactive</button>
                        <button className={cx("delete-btn")}>All</button>
                    </div>
                    <div className={cx("todo-list")}>
                        {worksList.map((work, index) => (
                            <ToDoCard key={index} props={work} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;
