
import { Model, DataTypes, Sequelize } from "sequelize";
import User from "./user";
import CartItem from "./cartItem";
interface CartAttributes {
  id?: number;
  user_id: number;
  address: string;
  amount: number;
  status:number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
class Cart extends Model<CartAttributes> implements CartAttributes {
  id!: number;
  user_id!: number;
  amount!: number;
  address!: string;
  status!:number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  static initialize(sequelize: Sequelize) {
    Cart.init({
      id: {
        type: DataTypes.INTEGER, // Define id as an integer
        autoIncrement: true, // Enable auto-increment
        primaryKey: true, // Define it as primary key
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
      status:{
        type: DataTypes.INTEGER,
        defaultValue:0,
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
    tableName:'Cart',
    paranoid:true,
    createdAt: 'created_at', // Map createdAt to created_at column
    updatedAt: 'updated_at', // Map updatedAt to updated_at column
    deletedAt:'deleted_at', // Map deletedAt to deleted_at
  }
  )
  };
  static associate(models:{
    User:typeof User;
    CartItem:typeof CartItem;
  }){
    this.belongsTo(User,{
      foreignKey:"user_id",
      as:"user"
    });
    this.hasMany(CartItem,{
      foreignKey:"cart_id",
      as:"CartItem"
    }); 
  }
}
export default Cart;