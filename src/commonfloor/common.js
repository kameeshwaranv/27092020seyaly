require("dotenv").config();
const jwt = require("jsonwebtoken");

getAccessWebToken = (userName) => {
    return jwt.sign(userName,process.env.ACCESS_TOKEN_SECRET);
}
module.exports = { getAccessWebToken }