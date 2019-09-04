"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

class Customers {
  static getModel(sequelize, DataTypes) {
    return sequelize.define('Customers', {
      CustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      CustomerName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: true
      },
      PhoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Credit: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      Status: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      Remarks: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      tableName: 'Customers',
      timestamps: false
    });
  }

}

exports.Customers = Customers;
//# sourceMappingURL=Customers.js.map