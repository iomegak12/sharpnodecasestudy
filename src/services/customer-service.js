import { CustomerRepository } from "../repositories";

const INVALID_CUSTOMER_ID = 'Invalid Customer Id Specified!';

class CustomerService {
    constructor() {
        this.repository = new CustomerRepository();
    }

    async getCustomers() {
        let customers = await this.repository.getAllCustomers();

        return customers;
    }
    
    async getCustomerById(id) {
        if(!id) {
            throw new Error(INVALID_CUSTOMER_ID);
        }

        let filteredCustomer = await this.repository.getCustomer(id);

        return filteredCustomer;
    }
}

export {
    CustomerService
};
