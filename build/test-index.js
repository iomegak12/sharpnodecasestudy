"use strict";

var _models = require("./models");

var _dbManagement = require("./db-management");

var _customerService = require("./services/customer-service");

class MainClass {
  static async testMain1() {
    try {
      const startDate = new Date();
      const statement = "SELECT * FROM Customers";
      const result = await _dbManagement.DbManager.executeQuery(statement);
      const records = result.recordset;
      records.forEach(element => {
        element.__proto__ = new _models.Customer();
      });
      const endTime = new Date() - startDate;
      console.info('Totally it took %dms', endTime);
      console.log(records[0] instanceof _models.Customer);
    } catch (error) {
      console.error(error);
    }
  }

  static async testMain2() {
    const service = new _customerService.CustomerService();
    const customers = await service.getCustomers();
    console.dir(customers);
    console.log('.................................');
    const filteredCustomer = await service.getCustomerById(10);
    console.dir(filteredCustomer);
    console.log(filteredCustomer instanceof _models.Customer);
  }

}

MainClass.testMain2().then(() => {
  console.info('Done!');
  process.exit();
});
//# sourceMappingURL=test-index.js.map