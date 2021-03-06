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
        this.router.get('/all', async (request, response) => {
            try {
                const customers = [
                    { "CustomerId": 1, "CustomerName": "Mellicent Maine", "Address": "Jiuchenggong", "Email": "mmaine0@cnbc.com", "PhoneNumber": "867-732-9747", "Credit": 18902, "Status": false, "Remarks": "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\r\n\r\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\r\n\r\nIn congue. Etiam justo. Etiam pretium iaculis justo." }, 
                    { "CustomerId": 2, "CustomerName": "Andrew Medcalfe", "Address": "Oltinko’l", "Email": "amedcalfe1@wired.com", "PhoneNumber": "191-733-8748", "Credit": 48665, "Status": false, "Remarks": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\r\n\r\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." }, 
                    { "CustomerId": 3, "CustomerName": "Winifred Gillogley", "Address": "Estevan", "Email": "wgillogley2@squidoo.com", "PhoneNumber": "962-239-5228", "Credit": 19762, "Status": false, "Remarks": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\r\n\r\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\r\n\r\nPhasellus in felis. Donec semper sapien a libero. Nam dui." }
                ];

                response.status(HttpConstants.OK).send(customers);
            } catch (error) {
                console.error(error);

                response.status(HttpConstants.SERVER_ERROR).send(error);
            }
        });

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