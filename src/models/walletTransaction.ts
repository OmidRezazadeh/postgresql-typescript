import { Model, DataTypes, Sequelize } from "sequelize";
import User from "../models/user";
interface walletTransactionAttributes {
  id: number;
  user_id: number;
  amount: number;
  type: number;
  created_at?: Date;
  updated_at?: Date;
}
class WalletTransaction
  extends Model<walletTransactionAttributes>
  implements walletTransactionAttributes
{
  id!: number;
  user_id!: number;
  amount!: number;
  type!: number;
  created_at?: Date;
  updated_at?: Date;
  static initialize(sequelize: Sequelize) {
    WalletTransaction.init(
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
        modelName: "WalletTransaction",
        sequelize,
        timestamps: false, // Enable timestamps
        underscored: true,
        tableName: "WalletTransactions", // Ensure this matches your actual table name
      }
    );
  }

    
  static associate(model:{
    User:typeof User
}){
    this.belongsTo(User,{
        foreignKey: "user_id",
        as: "user", 
    });
}
}
export default WalletTransaction;