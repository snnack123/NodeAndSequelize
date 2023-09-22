const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'database',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: false
    },
    production: {
        username: 'root',
        password: null,
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: false
    }
};
