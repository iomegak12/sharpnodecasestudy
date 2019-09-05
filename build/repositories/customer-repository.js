"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomerRepository = undefined;

var _dbManager = require("../db-management/db-manager");

var _models = require("../models");

const sql = require('mssql');

const ALL_CUSTOMERS_SQL = 'SELECT * FROM Customers';
const CUSTOMER_BY_ID_SQL = 'SELECT * FROM Customers WHERE CustomerId = @customerId';
const INVALID_CUSTOMER_ID = 'Invalid Customer Id Specified!';

class CustomerRepository {
  async getAllCustomers() {
    let customers = [];
    const result = await _dbManager.DbManager.executeQuery(ALL_CUSTOMERS_SQL); // if (result.recordset) {
    //     // result.recordset.forEach(element => {
    //     //     element.__proto__ = new Customer();
    //     // });
    //     customers = result.recordset;
    // }

    return result;
  }

  async getCustomer(id) {
    let filteredCustomer;
    const parameterDefs = [{
      name: 'customerId',
      type: sql.Int
    }];
    const parameterValues = {
      customerId: id
    };
    const result = await _dbManager.DbManager.executePrepareQuery(CUSTOMER_BY_ID_SQL, parameterDefs, parameterValues);

    if (result.recordset) {
      filteredCustomer = result.recordset[0];
      filteredCustomer.__proto__ = new _models.Customer();
    }

    return filteredCustomer;
  }

}

exports.CustomerRepository = CustomerRepository;
//# sourceMappingURL=customer-repository.js.map