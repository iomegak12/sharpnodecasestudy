import express from 'express';
import { CustomerService } from '../services/customer-service';
import { HttpConstants } from '../constants';

class CustomerRouter {
    constructor() {
        this.router = express.Router();
        this.service = new CustomerService();

        this.initializeRouting();
    }

    initializeRouting() {
        this.router.get('/', async (request, response) => {
            try {
                const customers = await this.service.getCustomers();

                response.status(HttpConstants.OK).send(customers);
            } catch (error) {
                console.error(error);

                response.status(HttpConstants.SERVER_ERROR).send(error);
            }
        });

        this.router.get('/detail/:id', async (request, response) => {
            try {
                const customerId = request.params.id;

                if (!customerId) {
                    response.status(HttpConstants.BAD_REQUEST);

                    return;
                }

                const filteredCustomer =
                    await this.service.getCustomerById(parseInt(customerId));

                if (!filteredCustomer) {
                    response.status(HttpConstants.NOT_FOUND);

                    return;
                }

                response.status(HttpConstants.OK).send(filteredCustomer);
            } catch (error) {
                console.error(error);

                response.status(HttpConstants.SERVER_ERROR).send(error);
            }
        });
    }

    get Router() {
        return this.router;
    }
}

export {
    CustomerRouter
}