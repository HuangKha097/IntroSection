const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// ✅ bật cors cho frontend (5173)
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// gắn routes
routes(app);

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log(" Connected to MongoDB");
    })
    .catch((error) => {
        console.error(" Error connecting to MongoDB:", error);
    });

app.listen(port, () => {
    console.log(` Server running on port ${port}`);
});
