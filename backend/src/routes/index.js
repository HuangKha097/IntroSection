const userRouter = require("./UserRouter");

function routes(app) {
    // gắn router User vào prefix /api
    app.use("/api", userRouter);
}

module.exports = routes;
