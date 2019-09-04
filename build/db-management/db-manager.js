"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DbManager = undefined;

var _config = require("../config");

const sql = require('mssql');

const INVALID_STATEMENT = 'Invalid SQL Statement Specified!';

const DB_CONFIG = _config.configuration.getDbConfiguration();

class DbManager {
  static async executeQuery(statement) {
    if (!statement) {
      throw new Error(INVALID_STATEMENT);
    }

    const pool = await sql.connect(DB_CONFIG);
    const result = await pool.query(statement);
    await sql.close();
    return result;
  }

  static async executePrepareQuery(statement, parameterDefs, parameterValues) {
    if (!statement) {
      throw new Error(INVALID_STATEMENT);
    }

    let result;
    let preparedStatement;

    try {
      const pool = await sql.connect(DB_CONFIG);
      preparedStatement = new sql.PreparedStatement(pool);

      for (let definition of parameterDefs) {
        preparedStatement.input(definition.name, definition.type);
      }

      await preparedStatement.prepare(statement);
      result = await preparedStatement.execute(parameterValues);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await preparedStatement.unprepare();
      await sql.close();
    }

    return result;
  }

}

exports.DbManager = DbManager;
//# sourceMappingURL=db-manager.js.map