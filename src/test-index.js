import { Customer } from "./models";
import { DbManager } from "./db-management";
import { CustomerService } from "./services/customer-service";

class MainClass {
    static async testMain1() {
        try {
            const startDate = new Date();
            const statement = "SELECT * FROM Customers";
            const result = await DbManager.executeQuery(statement);
            const records = result.recordset;

            records.forEach(element => {
                element.__proto__ = new Customer();
            });

            const endTime = new Date() - startDate;

            console.info('Totally it took %dms', endTime);
            console.log(records[0] instanceof Customer);
        } catch (error) {
            console.error(error);
        }
    }

    static async testMain2() {
        const service = new CustomerService();

        const customers = await service.getCustomers();
        console.dir(customers);

        console.log('.................................');

        const filteredCustomer = await service.getCustomerById(10);
        console.dir(filteredCustomer);
        console.log(filteredCustomer instanceof Customer);
    }
}

MainClass.testMain2()
    .then(() => {
        console.info('Done!');
        process.exit();
    });
