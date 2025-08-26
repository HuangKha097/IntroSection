const jwt = require("jsonwebtoken");

const generalAccessToken = (payLoad) => {
    console.log(payLoad);

    const accessToken = jwt.sign(payLoad, process.env.ACCESS_TOKEN, {
        expiresIn: "1h",
    });
    return accessToken;
};

const generalRefreshToken = (payLoad) => {
    const refreshToken = jwt.sign(payLoad, process.env.REFRESH_TOKEN, {
        expiresIn: "1d",
    });
    return refreshToken;
};

const refreshToken = async (token) => {
    try {
        const refreshToken = jwt.sign(
            token,
            process.env.REFRESH_TOKEN,
            async (err, user) => {
                if (err) {
                    return res.status(404).json({
                        status: "ERR",
                        message: "The authentication failed",
                    });
                }
                console.log("user", user);
                const { payload } = user;
                const accessToken = await generalAccessToken({
                    id: payload?.id,
                    isAdmin: payload?.isAdmin,
                });
                console.log(accessToken);
            }
        );
        return {
            status: "OK",
            message: "Refresh token successfully",
            data: refreshToken,
        };
    } catch (error) {
        throw error;
    }
};
console.log("ACCESS_TOKEN:", process.env.ACCESS_TOKEN);
console.log("REFRESH_TOKEN:", process.env.REFRESH_TOKEN);

module.exports = { generalAccessToken, generalRefreshToken, refreshToken };
