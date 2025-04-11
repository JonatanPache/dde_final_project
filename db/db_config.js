database = {
    host: process.env.DB_HOST ?? 'mysql',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'wserver',
    database: process.env.DB_NAME || 'puzmage'
};

module.exports = {
    database
};