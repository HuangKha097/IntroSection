import "../src/assets/css/reset.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/assets/css/index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
