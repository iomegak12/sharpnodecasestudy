"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomerRouter = undefined;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _customerService = require("../services/customer-service");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CustomerRouter {
  constructor() {
    this.router = _express2.default.Router();
    this.service = new _customerService.CustomerService();
    this.initializeRouting();
  }

  initializeRouting() {
    this.router.get('/', async (request, response) => {
      try {
        const customers = await this.service.getCustomers();
        response.status(_constants.HttpConstants.OK).send(customers);
      } catch (error) {
        console.error(error);
        response.status(_constants.HttpConstants.SERVER_ERROR).send(error);
      }
    });
    this.router.get('/detail/:id', async (request, response) => {
      try {
        const customerId = request.params.id;

        if (!customerId) {
          response.status(_constants.HttpConstants.BAD_REQUEST);
          return;
        }

        const filteredCustomer = await this.service.getCustomerById(parseInt(customerId));

        if (!filteredCustomer) {
          response.status(_constants.HttpConstants.NOT_FOUND);
          return;
        }

        response.status(_constants.HttpConstants.OK).send(filteredCustomer);
      } catch (error) {
        console.error(error);
        response.status(_constants.HttpConstants.SERVER_ERROR).send(error);
      }
    });
  }

  get Router() {
    return this.router;
  }

}

exports.CustomerRouter = CustomerRouter;
//# sourceMappingURL=customer-router.js.map