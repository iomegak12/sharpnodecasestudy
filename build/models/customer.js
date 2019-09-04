"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Customer = undefined;

var _utilities = require("../utilities");

class Customer {
  constructor(CustomerId, CustomerName, Address, Email, Phone, Credit, Status, Remarks) {
    [this.CustomerId, this.CustomerName, this.Address, this.Email, this.Phone, this.Credit, this.Status, this.Remarks] = arguments;
  }

  toString() {
    return _utilities.ObjectFormatter.format(this);
  }

}

exports.Customer = Customer;
//# sourceMappingURL=customer.js.map