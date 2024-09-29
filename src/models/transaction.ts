import { Model, DataTypes, Sequelize } from "sequelize";
import User from "../models/user";
import Cart from "./cart";

interface transactionAttributes {
  id?: number;  // Make this optional
  user_id: number;
  amount: number;
  type: number;
  transaction_result:string;
  cart_id: number;
  created_at?: Date;
  updated_at?: Date;

}

class Transaction
  extends Model<transactionAttributes>
  implements transactionAttributes
{
  id!: number;
  user_id!: number;
  transaction_result!:string;
  cart_id!: number;
  amount!: number;
  type!: number;
  created_at?: Date;
  updated_at?: Date;
  static PAYMENT_GATEWAY_TYPE_ZIBAL: number = 1; 
  static PAYMENT_GATEWAY_TYPE_ZARINPAL: number = 2;
  static initialize(sequelize: Sequelize) {
    Transaction.init(
      {
        id: {
          type: DataTypes.INTEGER, // Define id as an integer
          autoIncrement: true, // Enable auto-increment
          primaryKey: true, // Define it as primary key
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
        },

        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        transaction_result:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        cart_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Cart",
            key: "id",
          },
        },
        type: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        created_at: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },

      {
        createdAt: 'created_at', // Map createdAt to created_at column
        updatedAt: 'updated_at', // Map updatedAt to updated_at column
        deletedAt:'deleted_at', // Map deletedAt to deleted_at
        modelName: "Transaction",
        sequelize,
        timestamps: false, // Enable timestamps
        underscored: true,
        tableName: "Transactions", // Ensure this matches your actual table name
      }
    );
  }

  static associate(model: { User: typeof User; Cart: typeof Cart}) {
    this.belongsTo(User, {
      foreignKey: "user_id",
      as: "user",
    });
    this.belongsTo(Cart, { as: 'Cart', foreignKey: 'cart_id' });
  }
}
export default Transaction;
