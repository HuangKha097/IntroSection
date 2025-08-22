import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import ToDoList from "./pages/ToDoList";
import About from "./pages/About";
import Blog from "./pages/Blog";
import DetailBlog from "./pages/DetailBlog";
import datablog from "./assets/data/blog.json";
const App = () => {
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [getBlogTitle, setBlogTitle] = useState("");
    const detailBlog = datablog.find(
        (item) =>
            item.title === getBlogTitle ||
            item.title === JSON.parse(localStorage.getItem("currentBlog"))
    );

    const handleOpenLogin = () => {
        setIsOpenLogin(!isOpenLogin);
    };

    const handleGetBlogTitle = (title) => {
        setBlogTitle(title);
    };
    console.log(getBlogTitle);
    console.log(JSON.parse(localStorage.getItem("currentBlog")));

    return (
        <Router>
            <Navbar handleOpenLogin={handleOpenLogin} />
            {isOpenLogin && <Login close={handleOpenLogin} />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todo" element={<ToDoList />} />
                <Route path="/about" element={<About />} />
                <Route
                    path="/blogs"
                    element={<Blog getBlogTitle={handleGetBlogTitle} />}
                />
                <Route
                    path="/blog/:id"
                    element={<DetailBlog props={detailBlog} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
