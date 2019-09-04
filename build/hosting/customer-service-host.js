"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomerServiceHost = undefined;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _customerRouter = require("../routing/customer-router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const INVALID_PORT_NUMBER = 'Invalid Port Number Specified!';
const CUSTOMER_SERVICE_URL = '/api/customers';

class CustomerServiceHost {
  constructor(portNumber) {
    if (!portNumber) {
      throw new Error(INVALID_PORT_NUMBER);
    }

    this.portNumber = portNumber;
    this.app = (0, _express2.default)();
    this.httpServer = _http2.default.createServer(this.app);
    this.customerRouter = new _customerRouter.CustomerRouter();
    this.initializeApplication();
  }

  initializeApplication() {
    this.app.use(this.applyCors);
    this.app.use(_bodyParser2.default.json());
    this.app.use(CUSTOMER_SERVICE_URL, this.customerRouter.Router);
  }

  applyCors(request, response, next) {
    response.header('Access-Control-Allow-Credentials', 'true');
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
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

exports.CustomerServiceHost = CustomerServiceHost;
//# sourceMappingURL=customer-service-host.js.map