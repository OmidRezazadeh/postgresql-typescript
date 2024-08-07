import { Model, DataTypes, Sequelize } from "sequelize";

interface CartItemAttributes {
  id: number;
  product_id: number;
  quantity: number;
  cart_id:number
  amount: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
class CartItem extends Model<CartItemAttributes> implements CartItemAttributes {
  id!: number;
  product_id!: number;
  amount!: number;
  cart_id!: number;
  quantity!:number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  static initialize(sequelize: Sequelize) {
    CartItem.init({
      id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      product_id:{
        type: DataTypes.INTEGER,
      },
      amount:{
        type: DataTypes.INTEGER,
      },
      quantity:{
        type: DataTypes.INTEGER,
      },
      cart_id:{
        type: DataTypes.INTEGER,
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
    modelName:'CartItem',
    sequelize,
    timestamps:true,
    underscored:true,
    tableName:'CartItems',
    paranoid:true,
    createdAt: 'created_at', // Map createdAt to created_at column
    updatedAt: 'updated_at', // Map updatedAt to updated_at column
    deletedAt:'deleted_at', // Map deletedAt to deleted_at
  }
  
  )

  }
}
