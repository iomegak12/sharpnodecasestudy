import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import { CustomerRouter } from '../routing/customer-router';

const INVALID_PORT_NUMBER = 'Invalid Port Number Specified!';
const CUSTOMER_SERVICE_URL = '/api/customers';

class CustomerServiceHost {
    constructor(portNumber) {
        if (!portNumber) {
            throw new Error(INVALID_PORT_NUMBER);
        }

        this.portNumber = portNumber;
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.customerRouter = new CustomerRouter();

        this.initializeApplication();
    }

    initializeApplication() {
        this.app.use(this.applyCors);
        this.app.use(bodyParser.json());
        this.app.use(CUSTOMER_SERVICE_URL, this.customerRouter.Router);
    }

    applyCors(request, response, next) {
        response.header('Access-Control-Allow-Credentials', 'true');
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', '*');
        response.header('Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        next();
    }

    start() {
        const promise = new Promise((resolve, reject) => {
            this.httpServer.listen(this.portNumber, () => resolve());
        });

        return promise;
    }

    stop() {
        const promise = new Promise((resolve, reject) => {
            this.httpServer.close(() => resolve());
        });

        return promise;
    }
}

export {
    CustomerServiceHost
};
