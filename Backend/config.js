require('dotenv').config();

const config = {
    // API_BASE_URL: process.env.MONGODB_URL,
    // PORT: process.env.PORT 
    API_BASE_URL: "mongodb://root:toor@10.4.20.161:8284",
    PORT: 5000
}

module.exports = config