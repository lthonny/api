const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require("dotenv").config();


const jwtToken = {
  createToken({ id, email }) {
    const accessToken = jwt.sign({ user_id: id, email }, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    // const refreshToken = jwt.sign({ user_id: id, email }, process.env.JWT_REFRESH_TOKEN, { expiresIn: '30d' });
    return accessToken
    // {
    // accessToken
    // refreshToken
    // }
  },

  veriFyToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET, { expiresIn: '24h' });
    return decoded;
  },
};

const hashPassword = (password) => bcrypt.hashSync(password, 10);
const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = { jwtToken, hashPassword, comparePassword };
