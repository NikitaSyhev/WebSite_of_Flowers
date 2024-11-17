const mysql = require('mysql2');

class Database {
    constructor() {
        this.config = require('./config');
    }

    connect () {
        this.connection = mysql.createConnection({
            host: this.config.host,
            port: this.config.port,
            database: this.config.database,
            user: this.config.user,
            password: this.config.password,
        })
    }
    closeConnection() {
        this.connection.end();
        this.connection =null;
    }
}

module.exports = Database;