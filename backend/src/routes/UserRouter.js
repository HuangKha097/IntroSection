const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
    authMiddleware,
    authUserMiddleware,
} = require("../middleware/authMiddleware");

router.post("/register", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", userController.deleteUser);
router.get("/get-all-users", authMiddleware, userController.getAllUser);
router.get(
    "/get-user-by-id/:id",
    authUserMiddleware,
    userController.getUserById
);
router.post("/refresh-token", userController.refreshToken);
router.get("/weather/:city", userController.getWeatherController);
module.exports = router;
