const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function auth(req, res, next) {
    const token = req.header("x-auth-token");
    console.log("token : ",token);
    if (!token) return res.status(400).send("Access denied, no token provided");

    try {
        const payload = jwt.verify(token, config.get("mysecretjwtkey"));
        req.user = payload;
        console.log("payload : ", payload);
        next();

    } catch (x) {
        res.status(400).send("Invalid token");
    }



}