import { Model, DataTypes, Sequelize } from "sequelize";
import User from "../models/user";
import WalletTransaction from "./walletTransaction";
interface transactionAttributes {
  id: number;
  user_id: number;
  amount: number;
  type: number;
  transaction_result:string;
  wallet_transaction_id: number;
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
  wallet_transaction_id!: number;
  amount!: number;
  type!: number;
  created_at?: Date;
  updated_at?: Date;
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
        wallet_transaction_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Transactions",
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

  static associate(model: { User: typeof User; WalletTransaction: typeof WalletTransaction}) {
    this.belongsTo(User, {
      foreignKey: "user_id",
      as: "user",
    });
    this.belongsTo(WalletTransaction, { as: 'wallet_transaction', foreignKey: 'wallet_transaction_id' });
  }
}
export default Transaction;
