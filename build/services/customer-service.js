"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomerService = undefined;

var _repositories = require("../repositories");

const INVALID_CUSTOMER_ID = 'Invalid Customer Id Specified!';

class CustomerService {
  constructor() {
    this.repository = new _repositories.CustomerRepository();
  }

  async getCustomers() {
    let customers = await this.repository.getAllCustomers();
    return customers;
  }

  async getCustomerById(id) {
    if (!id) {
      throw new Error(INVALID_CUSTOMER_ID);
    }

    let filteredCustomer = await this.repository.getCustomer(id);
    return filteredCustomer;
  }

}

exports.CustomerService = CustomerService;
//# sourceMappingURL=customer-service.js.map