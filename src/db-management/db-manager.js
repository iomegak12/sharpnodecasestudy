import { configuration } from "../config";
import { Customers } from '../schemas';

const DB_CONFIG = configuration.getDbConfiguration();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(DB_CONFIG.database, DB_CONFIG.user, DB_CONFIG.password, {
    host: DB_CONFIG.server,
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true
        }
    },
    pool: {
        min: DB_CONFIG.pool.min,
        max: DB_CONFIG.pool.max,
        acquire: 30000,
        idle: DB_CONFIG.pool.idleTimeoutMillis
    }
});


const CustomerModel = Customers.getModel(sequelize, Sequelize);

class DbManager {
    // static async executeQuery(statement) {
    //     if (!statement) {
    //         throw new Error(INVALID_STATEMENT)
    //     }

    //     await sql.connect(DB_CONFIG);
    //     const result = await sql.query(statement);

    //     return result;
    // }

    static async executeQuery() {
        let results = await CustomerModel.findAll();

        // let filteredCustomer = await CustomerModel.findOne({customerId: 1});

        return results;
    }

    // static async executePrepareQuery(statement, parameterDefs, parameterValues) {
    //     if (!statement) {
    //         throw new Error(INVALID_STATEMENT)
    //     }

    //     let result;
    //     let preparedStatement;

    //     try {
    //         const pool = await sql.connect(DB_CONFIG);
    //         preparedStatement = new sql.PreparedStatement(pool);

    //         for (let definition of parameterDefs) {
    //             preparedStatement.input(definition.name, definition.type);
    //         }

    //         await preparedStatement.prepare(statement);

    //         result = await preparedStatement.execute(parameterValues);
    //     } catch (error) {
    //         console.error(error);

    //         throw error;
    //     } finally {
    //         await preparedStatement.unprepare();
    //         await sql.close();
    //     }

    //     return result;
    // }
}

export {
    DbManager
};