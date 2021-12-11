const dotenv = require('dotenv').config();

module.exports = {
    EMAIL: process.env.EMAIL || "",
    PASSWORD: process.env.PASSWORD || "",
    PORT: process.env.PORT || 3000
}