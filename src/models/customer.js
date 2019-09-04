import { ObjectFormatter } from "../utilities";

class Customer {
    constructor(CustomerId, CustomerName, Address,
        Email, Phone, Credit, Status, Remarks) {
        [
            this.CustomerId, this.CustomerName,
            this.Address, this.Email, this.Phone,
            this.Credit, this.Status, this.Remarks
        ] = arguments;
    }

    toString() {
        return ObjectFormatter.format(this);
    }
}

export {
    Customer
};
