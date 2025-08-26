// App.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ToDoList from "./pages/ToDoList";
import About from "./pages/About";
import Blog from "./pages/Blog";
import DetailBlog from "./pages/DetailBlog";
import Profile from "./pages/Profile";
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
        setIsOpenLogin((prev) => !prev); // toggle login popup
    };

    const handleGetBlogTitle = (title) => {
        setBlogTitle(title);
    };

    return (
        <Router>
            <Navbar handleOpenLogin={handleOpenLogin} />

            {/* ✅ render popup login khi state mở */}
            {isOpenLogin && <Login handleClose={handleOpenLogin} />}

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
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
};

export default App;
