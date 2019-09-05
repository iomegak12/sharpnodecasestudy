const MIN_POOL = 1;
const MAX_POOL = 600;
const DEFAULT_PORT = 9090;

class GlobalConfiguration {
    constructor() {
        this.dbServerName = process.env.DB_SERVER;
        this.dbName = process.env.DB_NAME;
        this.userName = process.env.DB_USER;
        this.serverPort = process.env.SERVER_PORT || DEFAULT_PORT;

        const encodedPassword = process.env.DB_PASSWORD;
        const buffer = Buffer.from(encodedPassword, 'base64');

        this.password = buffer.toString('ascii');
    }

    getDbConfiguration() {
        const dbConfig = {
            user: this.userName,
            password: this.password,
            server: this.dbServerName,
            database: this.dbName,
            encrypt: true,
            pool: {
                min: MIN_POOL,
                max: MAX_POOL,
                idleTimeoutMillis: 3000
            }
        };

        return dbConfig;
    }

    getHostConfiguration() {
        return {
            serverPort: this.serverPort
        };
    }
}

const configuration = new GlobalConfiguration();

export {
    configuration
};
