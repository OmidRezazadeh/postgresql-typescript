
import { Model, DataTypes, Sequelize } from "sequelize";
import User from "./user";

interface CartAttributes {
  id: number;
  user_id: number;
  address: string;
  amount: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
class Cart extends Model<CartAttributes> implements CartAttributes {
  id!: number;
  user_id!: number;
  amount!: number;
  address!: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  static initialize(sequelize: Sequelize) {
    Cart.init({
      id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      user_id:{
        type: DataTypes.INTEGER,
      },
      amount:{
        type: DataTypes.INTEGER,
      },
      address:{
        type: DataTypes.STRING,
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
      deleted_at: {
        allowNull: true,
        type: DataTypes.DATE,

      },
    },
  {
    modelName:'Cart',
    sequelize,
    timestamps:true,
    underscored:true,
    tableName:'Carts',
    paranoid:true,
    createdAt: 'created_at', // Map createdAt to created_at column
    updatedAt: 'updated_at', // Map updatedAt to updated_at column
    deletedAt:'deleted_at', // Map deletedAt to deleted_at
  }
  )
  };
  static associate(models:{
    User:typeof User
  }){
    this.belongsTo(User,{
      foreignKey:"user_id",
      as:"user"
    });
    
  }
}
